<---! 人员资质服务运营 --->


<template>
  <scPageContainer title="人员资质服务运营">
    <div class="condition-items" @keyup.enter="queryEvent">
      <div>
        <label>W3账号</label>
        <aui-user
          ref="account"
          :op="userOp"
          class="l"
        ></aui-user>
      </div>
      <div>
        <label>调用系统</label>
        <aui-Dropdown ref="callSystem" :op="systemIdOp" class="l"></aui-Dropdown>
      </div>
      <div>
        <label>区域</label>
        <aui-Dropdown ref="area" :op="RegionsOp" class="l"></aui-Dropdown>
      </div>
      <div>
        <label>开始时间</label>
        <aui-datepicker ref="invokeTimeStart" :op="startDateOp" class="m" />
        <span class="seperator">-</span>
        <aui-datepicker ref="invokeTimeEnd" :op="endDateOp" class="m" />
      </div>
      <div>
        <label>校验场景</label>
        <aui-Dropdown ref="scenario" :op="VerificationScenarioOp" class="l"></aui-Dropdown>
      </div>
      <div>
        <label>返回结果</label>
        <aui-Dropdown ref="resultMessage" :op="ReturnResultOp" class="l"></aui-Dropdown>
      </div>
      <div>
        <label>资质校验结果</label>
        <aui-Dropdown ref="accountResultMessage" :op="accountResultMessageOp" class="l"></aui-Dropdown>
      </div>
      <div></div>
      <div></div>
    </div>
    <div class="search-btn-group">
      <aui-button  hue="primary" @click="queryEvent">查询</aui-button>
      <aui-button  plain="primary"  @click="resetEvent">重置</aui-button>
    </div>
    <aui-button hue="primary" @click="exportNew">导出</aui-button>
    <aui-button hue="primary" @click="viewStatistics">总览统计</aui-button>
    <aui-button class="frozenPerson" hue="primary" @click="gotoBlaciList()">运维冻结策略</aui-button>
    <aui-grid ref="grid" :op="gridOp" />
    <a id="downlink"></a>
    <!--导出-->
    <scExport ref="scExport" :initdata="exportinitData" @scDialogBoxEvent="exportBoxAddEvent"></scExport>
  </scPageContainer>
</template>

<script>
import { Button, Input, Grid, Datepicker, Dropdown,User } from '@aurora/ui'
import StringUtil from '../../utils/stringUtil'
import urlList from '../../store/api/urlList.js'
import DateExtend from '../../utils/date.prototype.js'
const formConditions = [
  'account',
  'callSystem',
  'area',
  'invokeTimeStart',
  'invokeTimeEnd',
  'scenario',
  'resultMessage',
  'accountResultMessage'
]
export default {
  components: {
    AuiButton: Button,
    AuiInput: Input,
    AuiGrid: Grid,
    AuiDatepicker: Datepicker,
    AuiDropdown: Dropdown,
    AuiUser: User
  },
  data() {
    return {
      userOp: {
        validation: { required: true },
        valueField: 'userAccount',
        isdetail: true
      },
      exportinitData: {
        visible: false,
        saveEventClose: false
      },
      exportobj: {},
      systemIdOp: {
        novalid: true,
        textField: 'valueDes',
        valueField: 'value',
        value: '',
        dataset: {
          value: []
        },
        onBeforeBindData: function(op, data) {
          for (var i = 0; i < data.length; i++) {
            if (typeof data[0] === 'string') {
              var el = data.shift()
              data.push({
                text: el
              })
            }
          }
        }
      },
      tempPunishLevelOp: {
        multi: true,
        textField: 'text',
        valueField: 'value',
        dataset: {
          value: [
            {
              value: '1级',
              text: '1级'
            },
            {
              value: '2级',
              text: '2级'
            },
            {
              value: '3级',
              text: '3级'
            },
            {
              value: '4级',
              text: '4级'
            }
          ]
        }
      },
      RegionsOp: {
        textField: 'text',
        valueField: 'value',
        dataset: {
          value: [
            {
              value: '0',
              text: '普通区域'
            },
            {
              value: '1',
              text: '红区机要区'
            }
          ]
        }
      },
      VerificationScenarioOp: {
        textField: 'subValueDes',
        valueField: 'subValue',
        dataset: {
          api: {
            url: urlList.ServerDraw.getConfigUrl,
            params: {
              params: {
                module: 'personIntelligence',
                subModule: 'verificationScenario'
              }
            },
            resDataProLogic: data => {
              return data
            }
          }
        }
      },

      ReturnResultOp: {
        textField: 'text',
        valueField: 'value',
        dataset: {
          value: [
            {
              value: '0',
              text: '资质不符合'
            },
            {
              value: '1',
              text: '资质符合'
            }
          ]
        }
      },
      accountResultMessageOp: {
        textField: 'text',
        valueField: 'value',
        dataset: {
          value: [
            {
              value: '0',
              text: '资质不符合'
            },
            {
              value: '1',
              text: '资质符合'
            },
            {
              value: '2',
              text: '资质提醒'
            },
            {
              value: '3',
              text: '资质警示'
            }
          ]
        }
      },
      formVal: {},
      gridOp: {
        dataset: {
          api: {
            name: 'business.getgence'
          }
        },
        showPager: true,
        pagerOp: {
          pageSizes: [10, 20, 50],
          pageVO: {
            curPage: 1,
            pageSize: 10
          }
        },
        showTip: true,
        allowSort: true,
        showTipOverflow: true,
        columns: [
          {
            header: '校验ID',
            width: 120,
            content: '{{~renderUtil.nullFilter(taskId)}}'
          },
          {
            header: 'W3账号',
            width: 120,
            content: '{{~renderUtil.nullFilter(account)}}'
          },
          {
            header: '姓名',
            width: 80,
            content: '{{~renderUtil.nullFilter(name)}}'
          },
          {
            header: '部门',
            width: 180,
            content: '{{~renderUtil.nullFilter(dept)}}'
          },
          {
            header: '调用系统',
            width: 200,
            content: '{{~renderUtil.callSystemFilter(callSystem)}}'
          },
          {
            header: '系统id',
            width: 160,
            content: '{{~renderUtil.nullFilter(appId)}}'
          },
          {
            header: '账号',
            width: 120,
            content: '{{~renderUtil.nullFilter(accountInfo)}}'
          },
          {
            header: '区域',
            width: 90,
            content: '{{~renderUtil.areaFifter(area)}}'
          },
          {
            header: '调用人',
            width: 110,
            content: '{{~renderUtil.nullFilter(userAccount)}}'
          },
          {
            header: '开始时间',
            width: 160,
            content: '{{~renderUtil.nullFilter(invokeTime)}}'
          },
          {
            header: '完成时间',
            width: 160,
            content: '{{~renderUtil.nullFilter(responseTime)}}'
          },
          {
            header: '校验场景',
            width: 160,
            content: '{{~renderUtil.scenarioFilter(scenario)}}'
          },
          {
            header: '返回结果',
            width: 100,
            content: '{{~renderUtil.resultMessageFilter(resultMessage)}}'
          },
          {
            header: '资质校验结果',
            width: 200,
            content: '{{~renderUtil.accountResultMessageFilter(accountResultMessage)}}'
          },
          {
            header: '返回详情',
            width: 200,
            content: '{{~renderUtil.nullFilter(complexResponse)}}'
          },
          {
            header: '返回描述',
            width: 120,
            content: '{{~renderUtil.nullFilter(resultDescription)}}'
          },
          {
            header: '提醒标签',
            width: 120,
            content: '{{~renderUtil.nullFilter(tipCode)}}'
          },
          {
            header: '提醒场景',
            width: 120,
            content: '{{~renderUtil.nullFilter(tipScenario)}}'
          },
          {
            header: '提醒描述',
            width: 120,
            content: '{{~renderUtil.expireDay(#data)}}'
          },
          {
            header: '警示描述',
            width: 120,
            content: '{{~renderUtil.isChangedPersonDoApply(#data)}}'
          }
        ],
        renderUtil: {
          expireDay(data){
            var expireDay = data.expireDay
            if(expireDay!==null&&expireDay!=''&&expireDay!=undefined){
              return data.expireDay;
            }
            return '';
          },
          isChangedPersonDoApply(data){
            var isChangedPersonDoApply = data.isChangedPersonDoApply;
            if(isChangedPersonDoApply!==null&&isChangedPersonDoApply!=''&&isChangedPersonDoApply!=undefined){
              return data.isChangedPersonDoApply
            }
            return ''
          },
          nullFilter(data) {
            return StringUtil.convertNull(data)
          },
          areaFifter(area) {
            let mapper = {
              0: '普通区域',
              1: '红区机要区'
            }
            return mapper[area]
          },
          callSystemFilter: callSystem => {
            let mapper = {}
            if (this.systemIdOp.callSystemObj) {
              mapper = this.systemIdOp.callSystemObj
            } else {
              mapper = {
                'com.huawei.bpit.qo.ispp': 'ISPP',
                'com.huawei.so.iam.iam': 'IAM',
                'com.huawei.so.system_id': 'SID',
                'com.huawei.so.authorization': 'AUTH',
                'com.huawei.so.iam.pam': 'EID',
                'app_000000030989': 'SCAM',
                'com.huawei.so.auth.auth': 'AUTH',
                'com.huawei.security.systemoperationsecurity.operationsecurityaccess':
                  '堡垒机'
              }
            }

            let arr = Object.keys(mapper)
            if (arr.includes(callSystem)) {
              return mapper[callSystem]
            } else {
              return callSystem
            }
          },
          scenarioFilter(scenario) {
            let mapper = {
              0: '未启用资质检查',
              1: '应急备案人员',
              2: '只校验IT安全认证考试信息',
              3: '机要人员或红区机要区',
              4: '关键系统特权',
              5: '非关键系统',
              6: '业务放行',
              7: '关键系统普通权限',
              8: '服务超时',
              9: '工号不合法',
              10: '运维权限受控',
              11: '特定人员变更受控'
            }
            return mapper[scenario]
          },
          resultMessageFilter(resultMessage) {
            let mapper = {
              0: '资质不符合',
              1: '资质符合'
            }
            return mapper[resultMessage]
          },
          accountResultMessageFilter(accountResultMessage) {
            let mapper = {
              0: '资质不符合',
              1: '资质符合',
              2: '资质提醒',
              3: '资质警示'
            }
            return mapper[accountResultMessage]
          }
        }
      },
      exportCount: 0,
      startDateOp: {
        value: new DateExtend().dateAdd('d', -7).format('yyyy-MM-dd'),
        cascadeDom: '#end_date',
        dateFormat: 'yyyy-MM-dd'
      },
      endDateOp: {
        value: new Date(),
        id: 'end_date',
        dateFormat: 'yyyy-MM-dd'
      }
    }
  },
  created() {
    this.getConfigData()
    this.getData()
  },
  methods: {
    gotoBlaciList(){
      let routeData = this.$router.resolve({ path:'/PersonIntelligenceServe/qualificationsBlackList'});
      window.open(routeData.href, '_blank');
    },
    // 调用基础数据
    getData() {

      this.$service.business.getgence = args => {
        return new Promise((resolve, reject) => {
          var param = this.getFormVal()
          this.$service.network
            .get(`services/qualificationsLog/findlist/page/${args.pageVO.pageSize}/${args.pageVO.curPage}?params=${encodeURIComponent(JSON.stringify(param))}`,this.getFormVal())
            .then(response => {
              this.exportCount = response.data.pageVO.totalRows
              resolve(response.data)
            })
            .catch(reject)
        })
      }
    },
    // 获取调用系统ConfigData
    async getConfigData() {

      await this.$service.network
        .get(`${urlList.PersonIntelligenceServ.getAllSystemUrl}`)
        .then(({ data }) => {
          this.systemIdOp.dataset.value = [...data]
          let newArr = Object.assign([], this.systemIdOp.dataset.value)

          let mapper = {}
          if (newArr.length) {
            newArr.forEach(val => {
              let keyVal = val.value
              mapper[keyVal] = val.valueDes
            })
          }
          this.systemIdOp.callSystemObj = mapper
          // 拿到数据在重新渲染一次
          this.$refs['callSystem'] &&
            this.$refs['callSystem'].widget.reInit(this.systemIdOp)
        })
    },
    queryEvent() {
      let params = this.getFormVal()
      this.exportobj = this.getFormVal()
      return new Promise(() => {
        this.$refs.grid.widget.search(params)
      })
    },
    resetEvent() {
      formConditions.forEach(key => {
        this.$refs[key].widget.setValue('')
      })
      this.$refs['invokeTimeStart'].widget.setValue(
        new DateExtend().dateAdd('d', -7).format('yyyy-MM-dd')
      )
      this.$refs['invokeTimeEnd'].widget.setValue(new Date())
      this.queryEvent()
    },
    getFormVal() {
      const params = {}
      formConditions.forEach(key => {
        const val = this.$refs[key].widget.getValue().trim()
        val && (params[key] = val)
      })
      if (params.tempPunishLevelList) {
        params.tempPunishLevelList = params.tempPunishLevelList.split(',')
      }
      ;['invokeTimeStart', 'invokeTimeEnd'].forEach(key => {
        if (this.$refs[key].widget.getValue()) {
          params[key] = params[key].split(' ')[0].replaceAll('-', '/')
        }
      })
      return params
    },
    // 导出
    exportBoxAddEvent() {
      this.$refs.scExport.externalOperationsEvent({
        type: 'changeVisible',
        value: false
      })
    },
    exportNew() {
      if (this.exportCount > 50000) {
        this.$haeCommon.topBox({
          content: '无法操作！因导出记录已超出50000条，请输入相应的查询条件筛选后再次导出。',
          style: 'warning',
          closeTime: 4000
        })
        return
      }
      this.$service.network
        .post(
          'services/asynchronousExport2/qualification/export',
          this.exportobj
        )
        .then(res => {
          const excelId = res.data.result
          this.$refs.scExport.externalOperationsEvent({
            type: 'changeVisible',
            value: true,
            excelId: excelId
            // title: title
          })
        })
    },
    // 总览统计
    viewStatistics() {
      this.$router.push({
        name: 'operationOverview'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/search-common.less';

/deep/.hae-input .input-btn .hae-icon.icon-close {
  width: 15px;
}

.condition-items {
  & > div {
    min-width: 420px;

    .l {
      width: 258px;
    }

    label {
      width: 122px;
    }

    .m {
      width: 126px;
    }
  }
}

.frozenPerson {
  /deep/.hae-btn {
    max-width: 200px;
  }
}
</style>

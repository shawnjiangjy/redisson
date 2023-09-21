<template>
  <div class="mb60">
    <div class="bgTitle">IT人员风险总览</div>
    <div class="bgColor">
      <aui-row class="mt10">
        <aui-col :span="7" class="col7Style">
          <div class="borderRadius">
            <div class="bgWrite scenario">部门分布图</div>
            <div class="radioStyle">
              <aui-selectgroup
                v-model="radioValue"
                :op="opForRadio"
              ></aui-selectgroup>
            </div>
            <myEchart ref="Misqualification" style="height:280px"></myEchart>
          </div>
        </aui-col>
        <aui-col :span="5" class="col5Style">
          <div class="borderRadius">
            <div class="bgWrite scenario">风险原因分布图</div>
            <myEchart ref="vfScenario" style="height:310px"></myEchart>
          </div>
        </aui-col>
      </aui-row>
    </div>
    <div class="bgWrite mt10">
      <div class="bgWrite scenario">
        详情与处置进展
        <aui-button
          class="button-left"
          hue="primary"
          @click="queryNoDeclareRecords"
          >无异动反馈记录</aui-button
        >
      </div>
      <div class="mt20 hangx clearFix">
        <div>
          <span class="laber">工号</span>
          <aui-input
            ref="w3Account"
            placeholder="请输入工号精确查询，如00123456"
            v-model="employeeId"
            class="inputStyle"
          />
        </div>
        <div>
          <span class="laber">申报人</span>
          <aui-input
            ref="hrAccount"
            placeholder="请输入关键字精确查询"
            v-model="declarePerson"
            class="inputStyle"
          />
        </div>
        <div>
          <div class="noWrap">
            <span class="laber">申报时间</span>
            <aui-datepicker
              v-model="creatStart"
              :op="opStart"
              class="timeStyle"
            ></aui-datepicker>
            <span class="to">-</span>
            <aui-datepicker
              v-model="creatEnd"
              :op="opEnd"
              class="timeStyle"
            ></aui-datepicker>
          </div>
        </div>
        <div>
          <span class="laber">业务主管</span>
          <aui-input
            ref="businessDirector"
            placeholder="请输入工号精确查询，如00123456"
            v-model="businessDirector"
            class="inputStyle"
          />
        </div>
        <div>
          <span class="laber">申报状态</span>
          <aui-dropdown
                  ref="declareStatus"
                  :op="declareStatusOp"
                  style="width:49%"
                  class="custom-dropdown-style"
          ></aui-dropdown>
        </div>
        <div>
          <span class="laber">考核周期</span>
          <aui-dropdown
                  ref="assessmentCycle"
                  :op="assessmentCycleOp"
                  style="width:49%"
                  class="custom-dropdown-style"
          ></aui-dropdown>
        </div>
        <div>
          <span class="laber">考核类型</span>
          <aui-dropdown
                  ref="assessmentType"
                  :op="assessmentTypeOp"
                  style="width:49%"
                  class="custom-dropdown-style"
          ></aui-dropdown>
        </div>
        <div>
          <span class="laber">流程状态</span>
          <aui-dropdown
                  ref="processStatus"
                  :op="processStatusOp"
                  style="width:49%"
                  class="custom-dropdown-style"
          ></aui-dropdown>
        </div>
      </div>
      <div class="btns">
        <aui-button class="button-left" hue="primary" @click="queryEvent"
          >查询</aui-button
        >
        <aui-button plain="true" @click="resetEvent">重置</aui-button>
      </div>
      <div class="review-btns">
        <aui-button class="button-left commit" hue="primary" @click="commitBusinessDirector"
          >提交主管审视</aui-button
        >
        <aui-button class="notice" plain="true" @click="noticeBusinessDirector">通知主管审视</aui-button>
      </div>
      <div class="tableBox">
        <aui-grid ref="warngrid" :op="alignOp" class="iconStyle"></aui-grid>
      </div>
    </div>
    <aui-dialog-box
      key="visibleOpinion"
      v-model="visibleOpinion"
      :dragable="true"
      :title="titleOpinion"
      width="70%"
    >
      <div>
        <!-- textarea -->
        <div class="submitBox">
          <aui-textarea v-model="textareaValue" :op="textOp"></aui-textarea>
        </div>
      </div>
    </aui-dialog-box>

    <aui-dialog-box
      :title="dialogTitle"
      v-model="dialogVisible"
      class="dialogBox-style Trustliet"
      width="70%"
      @close="handlecolse"
    >
      <component :is="dialogContents" :item="tempItem" />
    </aui-dialog-box>

    <!-- 提交主管审视对话框 -->
      <aui-dialog-box
        v-model="commitdialog"
        :dragable="true"
        title="请确认"
        width="30%"
        @close="handleClose"
      >
        <div>
          <span style="display:inline-block;">本次需审视的人员共{{commitNumber}}人，提交之后对应主管{{businessDirectorShow}}
          在IT人员风险审视页面查即可看到审视中人员清单，请确认是否提交审视？</span>
        </div>
        <span slot="footer" class="hae-toolbar">
          <aui-button hue="primary" @click="doCommit">确 定</aui-button>
          <aui-button @click="handleClose">取 消</aui-button>
        </span>
      </aui-dialog-box>
      <!-- 通知主管审视对话框 -->
      <aui-dialog-box
        v-model="noticedialog"
        :dragable="true"
        title="请确认"
        width="30%"
        @close="handleClose"
      >
        <div>
          <span style="display:inline-block;">即将给对应主管 {{businessDirectorNotice}}推送应用号通知消息，请确认是否推送？</span>
        </div>
        <span slot="footer" class="hae-toolbar">
          <aui-button hue="primary" @click="doNotice">确 定</aui-button>
          <aui-button @click="handleClose">取 消</aui-button>
        </span>
      </aui-dialog-box>
  </div>
</template>

<script>
import {
  Button,
  Datepicker,
  Col,
  Row,
  Input,
  Grid,
  Textarea,
  DialogBox,
  User,
  Selectgroup,
  Dropdown
} from '@aurora/ui'
import myEchart from '@/components/echart'
import { Pieoption, Baroption } from '@/assets/js/echartsOption'
import { createdTip } from '@/assets/js/public.js'
import { tipArr } from './itPersonel.js'
import noDeclareRecords from './noDeclareRecords'

let pieOp = new Pieoption()
let barOp = new Baroption()
export default {
  components: {
    myEchart,
    auiCol: Col,
    auiRow: Row,
    AuiButton: Button,
    AuiInput: Input,
    AuiGrid: Grid,
    AuiUser: User,
    AuiTextarea: Textarea,
    AuiDatepicker: Datepicker,
    AuiDialogBox: DialogBox,
    AuiSelectgroup: Selectgroup,
    noDeclareRecords,
    AuiDropdown: Dropdown
  },

  props: {},

  data() {
    return {
      businessDirectorShow: '',
      businessDirectorNotice: '',
      businessDirectors:[],
      commitNumber:0,
      commitdialog: false,
      noticedialog: false,
      totalFlag: true,
      processStatusOp: {
        textField: 'processStatus',
        valueField: 'processStatus',
        placeHolder: '--请选择--',
        value: '',
        multi:true,
        dataset: {
          api: {
            url: 'services/hrDeclare/getProcessStatus',
            resDataProLogic: data => {
              return data
            }
          }
        },
        onChange: value => {
          this.formData.processStatus = value
        }
      },
      assessmentTypeOp: {
        alwaysLoad: true,
        textField: 'assessmentType',
        valueField: 'assessmentType',
        placeHolder: '--请选择--',
        value: '',
        multi:true,
        dataset: {
          api: {
            url: 'services/hrDeclare/getAssessmentType',
            resDataProLogic: data => {
              return data
            }
          }
        },
        onChange: value => {
          this.formData.assessmentType = value
        }
      },
      assessmentCycleOp: {
        alwaysLoad: true,
        textField: 'assessmentCycle',
        valueField: 'assessmentCycle',
        placeHolder: '--请选择--',
        value: '',
        multi:true,
        dataset: {
          api: {
            url: 'services/hrDeclare/getAssessmentCycle',
            resDataProLogic: data => {
              return data
            }
          }
        },
        onChange: value => {
          this.formData.assessmentCycle = value
        }
      },
      declareStatusOp: {
        alwaysLoad: true,
        textField: 'valueDes',
        valueField: 'value',
        placeHolder: '--请选择--',
        value: '',
        multi:true,
        dataset: {
          api: {
            url: 'services/selectOptionConfig/getConfig',
            params: {
              params: {
                module: 'itPersonnelView',
				        submodule:'declareStatus'
              }
            },
            resDataProLogic: data => {
              return data
            }
          }
        },
        onChange: value => {
          this.formData.declareStatus = value
        }
      },
      formData: {
        name: '',
        userOp: '',
        businessDirector: '',
        assessmentCycle: '',
        assessmentType: '',
        declareStatus: '',
        processStatus:''
      },
      creatStart: '', // 申报开始时间
      creatEnd: '', // 申报开始时间
      businessDirector: '', // 业务主管
      assessmentCycle: '', // 审视周期
      assessmentType: '', // 考核类型
      declareStatus: '', // 申报状态
      processStatus:'',
      opStart: {
        // 申报开始时间
        cascadeDom: '#end_date',
        dateFormat: 'yyyy-MM-dd'
      },
      opEnd: {
        // 申报结束时间
        id: 'end_date',
        dateFormat: 'yyyy-MM-dd'
      },
      userOp: {
        textarea: false,
        value: ''
      },
      hrOp: {
        textarea: false,
        value: ''
      },
      declarePerson: '', // 申报人
      employeeId: '', // 工号
      radioValue: 0, // 默认值
      opForRadio: {
        mode: 'radio',
        textField: 'title',
        valueField: 'value',
        dataset: {
          value: [
            {
              title: '二级部门',
              value: 2
            },
            {
              title: '三级部门',
              value: 3
            },
            {
              title: '最小部门',
              value: 0
            }
          ]
        },
        onChange: value => {
          this.getBarData(value) // 默认最小部门
        }
      },
      alignOp: {
        name: 'overGrid',
        seqHeader: '序号',

        onlyScroll: true,

        pagerOp: {
          pageSizes: [10, 20, 50, 100],
          pageVO: {
            curPage: 1,
            pageSize: 10
          }
        },

        wrapHeader: true,
        showTip: true,
        dataset: {
          api: {
            name: 'business.hrDeclare'
          }
        },
        renderUtil: {
          nationChangeFun: data => {
            return this.isFun('1', data)
          },
          bonusDissatisfiedFun: data => {
            return this.isFun('2', data)
          },
          badRelationshipsFun: data => {
            return this.isFun('3', data)
          },
          economicPressuresFun: data => {
            return this.isFun('4', data)
          },
          declareState: data => {
            let obj = {
              TBR: '待审视',
              REVIEWED: '已审视',
              REVIEWING: '审视中'
            }
            return obj[data] || ''
          },
          declareDetail: data => {
            this.textareaValue = ''
            let content =
              data === 'REVIEWED' ? '<a eno="gridDetail">查看</<a>' : ''
            return content
          }
        },
        onComplete: (grid) => {
          grid.setEvent('gridDetail', (target, grid) => {
            this.visibleOpinion = true
            this.titleOpinion = '审视详情'
            const rowData = grid.getRowData(grid.getCellRow(target))
            this.textareaValue = rowData.detail || ''
          })
        },
        columns: [
          {
            multi: true,
            columnType: 'select',
            width: 80
          },
          {
            field: 'name',
            width: 90,
            header: '姓名',
            sortable: true
          },
          {
            field: 'workNo',
            header: '工号',
            width: 100,
            showTip: true
          },
          {
            field: 'fullDeptName',
            header: '部门',
            width: 120,
            showTip: true
          },
          {
            field: 'nationChange',
            headHtml:
              '国籍变动 <i class="hae-icon icon-help-l Change_of_nationality"></i>',
            width: 130,
            showTip: true,
            content: '{{:~renderUtil.nationChangeFun(cause)}}'
          },
          {
            field: 'bonusDissatisfied',
            headHtml:
              '对绩效、奖金、长期激励、升级极为不满 <i class="hae-icon icon-help-l dissatisfaction"></i>',
            width: 200,
            showTip: true,
            content: '{{:~renderUtil.bonusDissatisfiedFun(cause)}}'
          },
          {
            field: 'badRelationships',
            headHtml:
              '与主管或多个同事争执 <i class="hae-icon icon-help-l disputed"></i>',
            width: 140,
            showTip: true,
            content: '{{:~renderUtil.badRelationshipsFun(cause)}}'
          },
          {
            field: 'economicPressure',
            headHtml:
              '家庭重大变故或经济压力 <i class="hae-icon icon-help-l extrinsicFactors"></i>',
            width: 145,
            showTip: true,
            content: '{{:~renderUtil.economicPressuresFun(cause)}}'
          },
          {
            field: 'unclearCause',
            headHtml: '其它 <i class="hae-icon icon-help-l other"></i>',
            width: 100,
            showTip: true
          },
          {
            field: 'assessmentCycle',
            headHtml: '考核周期',
            width: 110,
            showTip: true
          },
          {
            field: 'assessmentType',
            headHtml: '考核类型',
            width: 110,
            showTip: true
          },
          {
            field: 'processStatus',
            headHtml: '流程状态',
            sortable: false,
            width: 110,
            showTip: true
          },
          {
            field: 'businessDirector',
            headHtml: '业务主管',
            width: 110,
            showTip: true
          },
          {
            field: 'declarePerson',
            header: '申报人',
            width: 110,
            showTip: true
          },
          {
            field: 'declareTime',
            header: '申报时间',
            width: 150,
            showTip: true
          },
          {
            field: 'declareStatus',
            header: '申报状态',
            width: 110,
            showTip: true,
            content: '{{:~renderUtil.declareState(declareStatus)}}'
          },
          {
            header: '审视详情',
            width: 110,
            content: '{{:~renderUtil.declareDetail(declareStatus)}}'
          }
        ]
      },
      visibleOpinion: false,
      // 审视详情弹框
      titleOpinion: '',
      textareaValue: '',
      textOp: {
        maxLength: 2000,
        width: '100%',
        height: '240px',
        disabled: true
      },
      dialogContents: '',
      tempItem: {},
      dialogVisible: false,
      dialogTitle: ''
    }
  },

  mounted() {
    createdTip(tipArr)
    this.$refs.Misqualification.drawChartNew(barOp)
    this.$refs.vfScenario.drawChartNew(pieOp)

    Promise.all([this.getPieReason(), this.getPieData()]).then(res => {
      let reaonArr = res[0]
      let reasonData = res[1]

      let mapper = {
        1: 'nationChange',
        2: 'bonusDissatisfied',
        3: 'badRelationships',
        4: 'economicPressure'
      }
      let dataRes = []

      let arrValid = ['undefined', null, '0', 0]
      let totolRes = reasonData.total || 0
      let totalPerson = reasonData.totalPerson || 0
      let flag = arrValid.includes(totolRes)

      dataRes = reaonArr.map(itme => {
        let newObj = {}
        let key = mapper[itme.value]

        let valueRes = reasonData[key] || 0

        newObj = {
          value: valueRes || 0,
          name: itme.valueDes,
          total: totolRes,
          percent: flag ? 0 : (valueRes / totolRes).toFixed(4)
        }

        return newObj
      })
      let unclearCauseCount = reasonData.unclearCauseCount || 0
      dataRes.push({
        value: unclearCauseCount,
        name: '其它',
        total: totolRes,
        percent: flag ? 0 : (unclearCauseCount / totolRes).toFixed(4)
      })
      let params = {
        array: dataRes,
        total: (totalPerson || 0) + '\n\n 总人数'
      }

      pieOp.setPieData(params)
      this.$refs.vfScenario.drawChartNew(pieOp)
    })
  },
  created() {
    this.$service.business.hrDeclare = args => {
      return new Promise(resolve => {
        let formData = this.formData
        let params = JSON.stringify(formData)
        this.$service.network
          .get(
            'services/hrDeclare/findHandlingAndProgressPageList/page/' +
              `${args.pageVO.pageSize}/${
                args.pageVO.curPage
              }?params=${encodeURIComponent(params)}`
          )
          .then(data => {
            resolve(data.data)
          })
      })
    }
  },
  methods: {
    // 数据去重
    distinct(originData, fn) {
      var distinctObj = {}
      var distinctData = originData.reduce((item, next) => {
        var key = fn(next)
        distinctObj[key] ? '' : (distinctObj[key] = true && item.push(next))
        return item
      }, [])
      return distinctData
    },
    doCommit() {
      this.commitdialog = false
      let datas = this.getGridWidget().getSelectedRecords()
      this.$service.network.post('services/hrDeclare/commitBusinessDirector', datas).then(res => {
        if (res.data.state) {
          this.$haeCommon.topBox({
            content: res.data.message || '提交成功',
            style: 'successful'
          })
          this.queryEvent()
        } else {
          this.$haeCommon.topBox({
            content: res.data.message || '提交失败',
            style: 'error'
          })
        }
      })
    },
    doNotice() {
      let _this = this
      _this.noticedialog = false
      _this.$service.network.post('services/hrDeclare/noticeBusinessDirector', _this.businessDirectors).then(res => {
        if (res.data.state) {
          _this.$haeCommon.topBox({
            content: res.data.message || '通知主管成功',
            style: 'successful'
          })
          _this.businessDirectors = []
        } else {
          _this.$haeCommon.topBox({
            content: res.data.message || '通知主管失败',
            style: 'error'
          })
          _this.businessDirectors = []
        }
      })
    },
    // 关闭处理
    handleClose() {
      this.commitdialog = false
      this.noticedialog = false
      this.businessDirectorShow = ''
      this.businessDirectorNotice = ''
      this.commitNumber = 0
      this.businessDirectors = []
    },
    getGridWidget() {
      return this.$refs.warngrid.widget
    },
    commitBusinessDirector() {
      let datas = this.getGridWidget().getSelectedRecords()
      if(datas.length == 0) {
        this.$haeCommon.topBox({
          content: '请选择要提交的数据！',
          style: 'error'
        })
        return
      }
      for(var i=0; i<datas.length; i++){
        if (datas[i].declareStatus !='TBR') {
          this.$haeCommon.topBox({
            content: '只能提交申报状态为待审视状态的数据',
            style: 'error'
          })
          return
        }
      }
      var workNoUnique = this.distinct(datas, d => {
        return d.workNo
      })
      var businessDirectorUnique = this.distinct(datas, d => {
        return d.businessDirector
      })
      var _this = this
      _this.$service.network.post('services/hrDeclare/getBusinessDirectorNames', businessDirectorUnique).then(res => {
        if (res.data.state) {
          var names = res.data.result
          for(var i=0; i<businessDirectorUnique.length; i++){
            _this.businessDirectorShow+= names[businessDirectorUnique[i].businessDirector.toUpperCase()]+" "+businessDirectorUnique[i].businessDirector+ ";"
          }
          _this.commitdialog = true
          _this.commitNumber = workNoUnique.length
        } else {
          _this.$haeCommon.topBox({
            content: '提交失败',
            style: 'error'
          })
        }
      })
    },
    noticeBusinessDirector() {
      let datas = this.getGridWidget().getSelectedRecords()
      if(datas.length == 0) {
        this.$haeCommon.topBox({
          content: '请先选择数据！',
          style: 'error'
        })
        return
      }
      for(var i=0; i<datas.length; i++){
        if (datas[i].declareStatus !='REVIEWING') {
          this.$haeCommon.topBox({
            content: '只能提交申报状态为审视中的数据',
            style: 'error'
          })
          return
        }
      }
      // 业务主管工号去重
      var bds = this.distinct(datas, d => {
        return d.businessDirector
      })
      var _this = this
      _this.$service.network.post('services/hrDeclare/getBusinessDirectorNames', bds).then(res => {
        if (res.data.state) {
          var names = res.data.result
          for(var i=0; i<bds.length; i++){
            _this.businessDirectors.push(names[bds[i].businessDirector.toUpperCase()+'_w3c'])
            _this.businessDirectorNotice+= names[bds[i].businessDirector.toUpperCase()]+" "+bds[i].businessDirector+ ";"
          }
          _this.noticedialog = true
        } else {
          _this.$haeCommon.topBox({
            content: '提交失败',
            style: 'error'
          })
        }
      })
    },
    getBarData(deptcode) {
      this.$service.network
        .get(`services/statisticHrDeclare/groupByDept/${deptcode}`)
        .then(({ data }) => {
          if (data.state) {
            let data1 = {}
            let res = data.result
            data1.x = res.map(val => {
              return val.dept
            })
            data1.y = res.map(val => {
              return val.num
            })
            barOp.setSeriesData(data1)
            this.$refs.Misqualification.drawChartNew(barOp)
          }
        })
    },
    getPieData() {
      return new Promise(resolve => {
        this.$service.network
          .get('services/statisticHrDeclare/calcCause')
          .then(({ data }) => {
            let res = data.result
            resolve(res)
          })
      })
    },

    getPieReason() {
      let params = JSON.stringify({
        module: 'changedCause'
      })
      return new Promise(resolve => {
        this.$service.network
          .get(
            `services/selectOptionConfig/getConfig?params=${encodeURIComponent(
              params
            )}`
          )
          .then(({ data }) => {
            resolve(data)
          })
      })
    },
    resetEvent() {
      this.formData = {
        workNo: '',
        declarePerson: '',
        declareTimeEnd: '',
        declareTimeStart: '',
        businessDirector:'',
        assessmentCycle:'',
        assessmentType:'',
        declareStatus:'',
        processStatus:''
      }
      this.declarePerson = ''
      this.employeeId = ''
      this.creatStart = ''
      this.creatEnd = ''
      this.businessDirector = ''
      this.$refs.assessmentCycle.widget.setValue(null)
      this.$refs.declareStatus.widget.setValue(null)
      this.$refs.assessmentType.widget.setValue(null)
      this.$refs.processStatus.widget.setValue(null)
      this.$refs.warngrid.widget.search({
        data: this.formData
      })
    },
    queryEvent() {
      // 工号
      this.formData.workNo = this.employeeId.toUpperCase()
      // 申报人工号
      this.formData.declarePerson = this.declarePerson.toUpperCase()
      // 业务主管
      this.formData.businessDirector = this.businessDirector.toUpperCase()
      // 处理时间
      let creatStart = this.creatStart
        ? this.creatStart.split(' ')[0] +' 00:00:00'
        : ''
      let creatEnd = this.creatEnd
        ? this.creatEnd.split(' ')[0] + ' 23:59:59'
        : ''
      this.formData.declareTimeStart = creatStart
      this.formData.declareTimeEnd = creatEnd
      this.$refs.warngrid.widget.search({
        data: this.formData
      })
    },
    isFun(params, cause) {
      let content = '否'
      if (cause && cause.indexOf(params) > -1) {
        content = '是'
      }
      return content
    },
    queryNoDeclareRecords() {
      this.tempItem = 'data'
      this.dialogTitle = '无异动反馈记录'
      this.dialogVisible = true
      this.dialogContents = 'noDeclareRecords'
    },
    handlecolse() {
      this.tempItem = 'close'
      this.dialogContents = ''
    }
  }
}
</script>

<style lang="less" scoped>
.bgTitle {
  font-size: 16px;
  padding: 10px 20px;
  font-weight: bolder;
}
.bgColor {
  background-color: #eff3f7;
  border-radius: 5px;
}
.borderRadius {
  border-radius: 5px;
  overflow: hidden;
}

.mt10 {
  margin-top: 10px;
}
.mt20 {
  margin-top: 20px;
}

.bgWrite {
  background: #ffffff;
}

.scenario {
  padding: 20px 0 0 20px;
}
.col7Style {
  padding: 0;
  margin: 10px 0;
}
.col5Style {
  padding: 0 0 0 10px;
  margin: 10px 0;
}
.hangx {
  > div {
    float: left;
    width: 33%;
    text-align: center;
    min-width: 350px;
    margin-top: 10px;
  }
  .laber {
    width: 70px;
    padding-right: 10px;
    display: inline-block;
    text-align: right;
  }
}
.btns {
  text-align: center;
  padding: 20px 0 30px 0;
}
.radioStyle {
  padding: 0px 20px;
  line-height: 30px;
  background: #fff;
  text-align: right;
}
.timeStyle {
  width: 130px;
}
.to {
  width: 10px;
}
.mb60 {
  margin-bottom: 40px !important;
}
.hae-grid {
  padding-bottom: 10px;
}

.clearFix::after,
.clearFix::before {
  clear: both;
  display: block;
  content: '';
}
.review-btns{
  border-top: 10px solid #eff3f7;
}
.commit {
  margin-top: 12px;
  margin-left: 10px;
  border-radius: 8px;
}
/deep/.notice > .hae-btn  {
  border-radius: 8px;
}
/deep/.commit > .hae-btn  {
  border-radius: 8px;
}
</style>

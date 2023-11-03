<template>
  <scPageContainer title="运维人员冻结配置">
    <div class="condition-items" @keyup.enter="queryEvent">
      <div>
        <label>工号</label>
        <aui-user
          ref="employeNumber"
          :op="userOp"
          class="l"
        ></aui-user>
      </div>
      <div>
        <label>生效日期</label>
        <aui-datepicker ref="validStartDateFrom" :op="validStartDateFromOp" class="m" />
        <span class="seperator">-</span>
        <aui-datepicker ref="validStartDateTo" :op="validStartDateToOp" class="m" />
      </div>
      <div>
        <label>失效日期</label>
        <aui-datepicker ref="validDeadDateFrom" :op="validDeadDateFromOp" class="m" />
        <span class="seperator">-</span>
        <aui-datepicker ref="validDeadDateTo" :op="validDeadDateToOp" class="m" />
      </div>
      <div></div>
      <div></div>
    </div>
    <div class="search-btn-group">
      <aui-button hue="primary" @click="queryEvent">查询</aui-button>
      <aui-button plain="true" @click="resetEvent">重置</aui-button>
    </div>
    <aui-button v-show='false' hue="primary" @click="openAddDialog()">新增</aui-button>
    <aui-button hue="primary" @click="exportNew">导出</aui-button>
      <aui-dialog-box
      :title="dialogTitle"
      v-model="dialogVisible"
      :width="dialogTitle === '风险配置' ? '60%' : '500px'"
      class="dialogBox-style"
      @close="closeDialog"
    >
      <component
        :is="dialogContent"
        :item="tempItem"
        @done="onOperationDone"
        @cancel="closeDialog"
      />
    </aui-dialog-box>
    <aui-grid ref="grid" :op="gridOp" />
    <a id="downlink"></a>
    <!--导出-->
    <scExport ref="scExport" :initdata="exportinitData" @scDialogBoxEvent="exportBoxAddEvent"></scExport>
  </scPageContainer>
</template>

<script>
import { Button, Input, Grid, Datepicker,User,DialogBox} from '@aurora/ui'
import StringUtil from '../../utils/stringUtil'
import qualificationsBlackListEdit from './qualificationsBlackListEdit'
import qualificationsBlackListAdd from './qualificationsBlackListAdd'
const formConditions = [
  'employeNumber',
  'validStartDateFrom',
  'validStartDateTo',
  'validDeadDateFrom',
  'validDeadDateTo'
]
export default {
  components: {
    AuiButton: Button,
    AuiInput: Input,
    AuiGrid: Grid,
    AuiDatepicker: Datepicker,
    AuiUser: User,
    qualificationsBlackListEdit,
    qualificationsBlackListAdd,
    AuiDialogBox: DialogBox
  },
  data() {
    return {
      dialogTitle:'',
      dialogVisible:false,
      dialogContent:'',
      tempItem: {},
      userOp: {
        validation: { required: true },
        valueField: 'employeeNumber',
        isdetail: true
      },
      hasPermit: {
        // 用户权限标识 默认无
        update: this.$service.privilege.check('Service$Occ.QualificationsBlackListService$saveOrUpdate') || false,
        delete: this.$service.privilege.check('Service$Occ.QualificationsBlackListService$delete') || false
      },
      exportinitData: {
        visible: false,
        saveEventClose: false
      },
      exportobj: {},
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
            header: '操作',
            hidden: false,
            cssName: 'table-text-left-style',
            width: 60,
            content: '{{:~renderUtil.setTableOptBtn()}}'
          },
          {
            header: '工号',
            width: 75,
            content: '{{~renderUtil.nullFilter(employeNumber)}}'
          },
          {
            header: '姓名',
            width: 75,
            content: '{{~renderUtil.nullFilter(name)}}'
          },
          {
            header: '部门',
            width: 300,
            content: '{{~renderUtil.nullFilter(dept)}}'
          },
          {
            header: '生效日期',
            width: 65,
            content: '{{~renderUtil.nullFilter(validStartDate)}}'
          },
          {
            header: '失效日期',
            width: 65,
            content: '{{~renderUtil.nullFilter(validDeadDate)}}'
          },
          {
            header: '更新人',
            width: 80,
            content: '{{~renderUtil.nullFilter(updatePerson)}}'
          },
          {
            header: '更新时间',
            width: 100,
            content: '{{~renderUtil.nullFilter(updateTime)}}'
          }
        ],
        renderUtil: {
          nullFilter(data) {
            return StringUtil.convertNull(data)
          },
          setTableOptBtn: data => {
            let content = ''
            if (this.hasPermit.update){
              content +=
              '<a class="hae-icon icon-edit table-opt-btn-syle" eno="editItem"></a>&nbsp;&nbsp;'
            }
            if (this.hasPermit.delete){
              content +=
              '<a class="hae-icon icon-del table-opt-btn-syle" eno="deleteItem"></a>'
            }
            return content
          },
        },
        onComplete: (grid) => {
          grid.setEvent('editItem', (target, grid) => {
            const rowData = grid.getRowData(grid.getCellRow(target))
            this.openEditDialog(rowData)
          })
          grid.setEvent('deleteItem', (target, grid) => {
            const rowData = grid.getRowData(grid.getCellRow(target))
            this.openDeleteDialog(rowData.id)
          })
        }
      },
      exportCount: 0,
      validStartDateFromOp: {
        cascadeDom: '#valid_start_date_to',
        dateFormat: 'yyyy-MM-dd'
      },
      validStartDateToOp: {
        id: 'valid_start_date_to',
        dateFormat: 'yyyy-MM-dd'
      },
      validDeadDateFromOp: {
        cascadeDom: '#valid_dead_date_to',
        dateFormat: 'yyyy-MM-dd'
      },
      validDeadDateToOp: {
        id: 'valid_dead_date_to',
        dateFormat: 'yyyy-MM-dd'
      }
    }
  },
  created() {
    if(!this.hasPermit.update && !this.hasPermit.delete){
      this.gridOp.columns[0].hidden = true
    }
    this.getData()
  },
  methods: {
    async onOperationDone() {
      this.$refs.grid.widget.search()
      this.closeDialog()
    },
    closeDialog() {
      this.dialogVisible = false
      this.dialogContent = ''
    },
    openEditDialog(data) {
      this.tempItem = data
      this.dialogTitle = '黑名单配置'
      this.dialogVisible = true
      this.dialogContent = 'qualificationsBlackListEdit'
    },
    openAddDialog(data) {
      this.tempItem = data
      this.dialogTitle = '黑名单配置'
      this.dialogVisible = true
      this.dialogContent = 'qualificationsBlackListAdd'
    },
    openDeleteDialog(id) {
      this.$haeCommon.alert({
        title: '请确认',
        content: '确认删除吗?',
        fun: bool => {
          bool && this.deleteItem(id)
        }
      })
    },
    deleteItem(id) {
      this.$service.network
        .delete(`services/qualificationsBlackList/delete/${id}`)
        .then(res => {
          if (res.status === 200) {
            this.$haeCommon.topBox({
              content: '删除成功',
              style: 'successful'
            })
            this.queryEvent()
          } else {
            this.$haeCommon.topBox({
              content: '操作失败，请重试！',
              style: 'error'
            })
          }
        })
    },
    // 调用基础数据
    getData() {
      this.$service.business.getgence = args => {
        return new Promise((resolve, reject) => {
          var param = this.getFormVal()
          this.$service.network
            .get(`services/qualificationsBlackList/findlist/page/${
              args.pageVO.pageSize
            }/${args.pageVO.curPage}?params=${encodeURIComponent(
              JSON.stringify(param)
            )}`
            )
            .then(response => {
              this.exportCount = response.data.pageVO.totalRows
              resolve(response.data)
            })
            .catch(reject)
        })
      }
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
      this.queryEvent()
    },
    getFormVal() {
      let _this =this
      const params = {}
      formConditions.forEach(key => {
        const val = _this.$refs[key].widget.getValue().trim()
        if(val){
          params[key] = val
        }
      })
      let arr = ['validStartDateFrom','validStartDateTo','validDeadDateFrom','validDeadDateTo']
      arr.forEach(key => {
        if (_this.$refs[key].widget.getValue()) {
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
      this.exportobj = this.getFormVal()
      this.$service.network
        .post(
          'services/asynchronousExport2/qualificationBlackList/export',
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
</style>

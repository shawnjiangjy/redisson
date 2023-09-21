<template>
  <div>
    <scPageContainer title="信息安全培训详情">
      <div class="condition-items" @keyup.enter="queryEvent">
        <div>
          <label>姓名</label>
          <aui-input ref="name" :show-clear-btn="true" class="l" />
        </div>
        <div>
          <label>工号</label>
          <aui-input ref="employeeId" placeholder="请输入工号精确查询，如00123456" :show-clear-btn="true" class="l" />
        </div>
        <div>
          <label>部门</label>
          <aui-input ref="dept" class="l"></aui-input>
        </div>
        <div>
          <label>培训方式</label>
          <aui-dropdown ref="learningMethod" :op="learningMop" class="l" />
        </div>

        <div>
          <label>培训日期</label>
          <aui-datepicker ref="trainStartTime" :op="startDateOp" class="m" />
          <span class="seperator">-</span>
          <aui-datepicker ref="trainendTime" :op="endDateOp" class="m"></aui-datepicker>
        </div>
        <div>
          <label>操作人</label>
          <aui-input ref="operator" class="l"></aui-input>
        </div>
        <div>
          <label>操作时间</label>
          <aui-datepicker ref="operateStartTime" :op="startoperarDateOp" class="m" />
          <span class="seperator">-</span>
          <aui-datepicker ref="operateEndTime" :op="endoperarDateOp" class="m"></aui-datepicker>
        </div>

        <div>
          <div>
            <label>培训组织</label>
            <aui-dropdown ref="trainOrgan" :op="trainOrganOp" v-model="trainOrganVal" class="l" />
          </div>
        </div>

        <div></div>
      </div>
      <div class="search-btn-group">
        <aui-button hue="primary" @click="queryEvent">查询</aui-button>
        <aui-button plain="true" @click="resetEvent">重置</aui-button>
      </div>
      <aui-row :gutter="10" :flex="true" align="middle" justify-content class="newbtn">
        <div id="dial" style="margin:0 12px">
          <aui-button hue="primary" @click="openEditDialog()">新增</aui-button>
        </div>
        <aui-button class="btn-group" hue="primary" @click="popImport">导入</aui-button>

        <aui-button plain="true" style="margin-left:12px" @click="exportNew">导出</aui-button>

        <aui-button plain="true" style="margin:0 12px" @click="showOffLine">签到表附件</aui-button>
      </aui-row>
      <!--导出-->
      <scExport ref="scExport" :initdata="exportinitData" @scDialogBoxEvent="exportBoxAddEvent"></scExport>
      <!-- 表格 -->
      <aui-grid ref="grid" :op="gridOp" />

      <!-- 新增 -->
      <aui-dialog-box
        :title="dialogTitle"
        v-model="dialogVisible"
        class="dialogBox-style"
        width="450px"
        @close="closeDialog"
      >
        <component
          :is="dialogContent"
          :item="tempItem"
          @done="onOperationDone"
          @cancel="closeDialog"
        />
      </aui-dialog-box>
    </scPageContainer>
    <a id="downlink"></a>
    <input
      id="imFile"
      type="file"
      style="display: none"
      :accept="accpet"
      @change="getFileName(this)"
    />
    <!-- 扫描件 -->
    <scDialogBox ref="scDialogBox" :initdata="initData" @scDialogBoxEvent="scDialogBoxAddEvent">
      <component
        ref="scans"
        :is="componentType"
        :jump-name="jumpName"
        :configuration-param="configurationParam"
      ></component>
    </scDialogBox>
    <!-- 导入 -->
    <scDialogBox
      ref="importScDialogBox"
      :initdata="importDialogBoxInitdata"
      @scDialogBoxEvent="importDialogBoxEvent"
    >
      <div style="margin-bottom: 14px;margin-left: 22%;">
        <label style="margin-right:3px;">导入模板:</label>
        <a :href="mockUrl" download="安全培训-导入">下载导入模板</a>
      </div>
      <div style="margin-left: 22%;">
        <label>导入文件:</label>
        &nbsp;
        <aui-button
          ref="uploadFile"
          :op="uploadBtnOp"
          hue="primary"
          class="btn-group"
          @click="uploadFile"
        >点击上传</aui-button>
        <span>
          <aui-button v-if="!showUpload" :op="iconBtnOp" class="btn-group" @click="reSelect"></aui-button>
        </span>
      </div>
    </scDialogBox>
  </div>
</template>

<script>
import {
  Fileupload,
  Popupload,
  Textarea,
  Button,
  Row,
  Dropdown,
  Input,
  Col,
  User,
  Datepicker,
  DialogBox,
  Grid
} from '@aurora/ui'
import addNewMan from './addNewMan'
import scans from './scans.vue'
import FileUpload from '../../components/file/file-upload-safeTrain.vue'
import DateExtend from '../../utils/date.prototype.js'
var XLSX = require('xlsx')
var taskUrl = 'safeTrain.import'
var taskTemplateUrl = 'safeTrain.templateImport'
export default {
  components: {
    FileUpload,
    AuiFileupload: Fileupload,
    AuiButton: Button,
    AuiRow: Row,
    AuiDropdown: Dropdown,
    AuiInput: Input,
    AuiCol: Col,
    AuiUser: User,
    AuiDatepicker: Datepicker,
    AuiDialogBox: DialogBox,
    AuiTextarea: Textarea,
    AuiPopupload: Popupload,
    addNewMan: addNewMan,
    AuiGrid: Grid,
    scans: scans
  },
  data() {
    var vm = this
    return {
      accpet: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
      application/vnd.ms-excel, application/vnd.ms-excel.sheet.macroEnabled.12`,
      exportinitData: {
        visible: false,
        saveEventClose: false
      },
      exportobj: {},
      popupFlag: true,
      componentType: 'scans',
      configurationParam: {},
      initData: {
        visible: false,
        title: '签到表',
        width: '1000px',
        saveEventClose: false
      },
      jumpName: '',
      opUpload: {
        filters: {
          // max_file_count: 1
        },
        onBeforeUpload: (up, file) => {
          let operator = vm.$service.base.getEnvInfoSync().user.employeeNumber
          var prefix = 'http://localhost.huawei.com:60010/'
          if (location.host.indexOf('localhost') < 0) {
            prefix =
              '{wcm_domain_gateway}com.huawei.bpit.qo.ispp:{wcm_sub_app_id}'
          }
          if (file.name.indexOf('xlsx') > 0) {
            up.settings.url =
              prefix +
              `{wcm_context}/servlet/upload?ulType=safeTrainSyncImport&excelType=${taskUrl}&
              riskType=0&operator=${operator}`
          } else {
            up.settings.url =
              prefix +
              `{wcm_context}/servlet/upload?ulType=safeTrainSyncImport&excelType=${taskTemplateUrl}&riskType=0
              &operator=${operator}`
          }
        },
        onUploaded: function(up, file, info) {
          if (info && info.response) {
            let result = JSON.parse(info.response)
            if (result.state) {
              vm.topBox('导入成功', 3000, 'successful')
              vm.queryEvent()
              up.destroy()
            } else {
              vm.topBox('导入失败:' + result.message, 4000, 'error')
            }
          }
        }
      },
      queryobj: {},
      conditions: [
        'name',
        'employeeId',
        'dept',
        'learningMethod',
        'trainStartTime',
        'trainendTime',
        'operator',
        'operateStartTime',
        'operateEndTime',
        'trainOrgan'
      ],
      excelIdFlag: true,
      gridOp: {
        dataset: {
          api: {
            name: 'business.getTrain'
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
            header: '姓名',
            field: 'name',
            width: 100,
            content: '{{:~renderUtil.nullFilter(name)}}'
          },
          {
            header: '工号',
            field: 'employeeId',
            width: 130,
            content: '{{:~renderUtil.toUpperCase(employeeId)}}'
          },
          {
            header: '部门',
            field: 'dept',
            width: 380,
            content: '{{:~renderUtil.nullFilter(dept)}}'
          },
          {
            header: '培训方式',
            width: 120,
            field: 'learningMethod',
            content: '{{:~renderUtil.modelTypeFormatter(learningMethod)}}'
          },
          {
            header: '培训日期',
            field: 'trainDate',
            width: 120,
            content: '{{:~renderUtil.nullFilter(trainDate)}}'
          },
          {
            header: '签到表附件名',
            field: 'attachmentName',
            width: 160,
            content: '{{:~renderUtil.jumpAttach(attachmentName)}}'
          },
          // 下拉框
          {
            header: '培训组织',

            width: 120,
            content: '{{:~renderUtil.trainingOrganization(trainOrgan)}}'
          },
          {
            header: '是否已培训',
            field: 'isTraining',
            width: 110,
            content: '{{:~renderUtil.isTrainings(isTraining)}}'
          },
          {
            header: '操作人',
            field: 'operator',
            width: 150,
            content: '{{:~renderUtil.nullFilter(operator).toUpperCase()}}'
          },
          {
            header: '操作时间',
            field: 'operateTime',
            width: 160,
            content: '{{:~renderUtil.nullFilter(operateTime)}}'
          },
          {
            header: '更新人',
            field: 'lastUpdatePerson',
            content:
              '{{:~renderUtil.nullFilter(lastUpdatePerson).toUpperCase()}}'
          },
          {
            header: '最新更新时间',
            field: 'lastUpdateTime',
            content: '{{:~renderUtil.nullFilter(lastUpdateTime)}}'
          },
          {
            header: '备注',
            field: 'remark',
            content: '{{:~renderUtil.nullFilter(remark)}}'
          },
          {
            header: '操作',
            content: '{{:~renderUtil.setOperations(#data)}}',
            width: 100
          }
        ],

        renderUtil: {
          modelTypeFormatter(learningMethod) {
            const mapper = {
              1: '现场培训',
              2: '线上会议',
              3: '线下学习',
              4: '自学',
              5: '其它'
            }
            return mapper[learningMethod]
          },
          isTrainings(isTraining) {
            const mapper = {
              1: '是',
              2: '否',
              3: '休假',
              4: '转岗',
              5: '其它'
            }
            return mapper[isTraining]
          },
          nullFilter(data) {
            return data === null ||
              data === undefined ||
              String.prototype.trim.call(data).toUpperCase() === 'NULL'
              ? ''
              : data
          },
          toUpperCase(data) {
            return String(data).toUpperCase()
          },
          setOperations() {
            return (
              '<a eno="editItem"  title="编辑" class="table-opt-btn-syle hae-icon icon-edit ">' +
              '</a><a eno="deleteItem"  title="删除" class="hae-icon icon-del"></a>'
            )
          },
          jumpAttach(data) {
            return `<a  eno="jumpItem">${data}</a>`
          },
          trainingOrganization(trainOrgan) {
            if (trainOrgan !== null && trainOrgan !== '') {
              return trainOrgan == 1 ? '业务方' : '信管办'
            }
          }
        },
        onComplete: (grid) => {
          grid.setEvent('editItem', (target, grid) => {
            const rowData = grid.getRowData(grid.getCellRow(target))
            rowData.trainOrgan = rowData.trainOrgan || '' // 后端修改后，在修改此处
            let uuid = this.$service.base.getEnvInfoSync().user.userUid
            rowData.trainOrgan = rowData.trainOrgan || '' // 后端修改后，在修改此处
            if (rowData.uuid != uuid) {
              this.$haeCommon.tipBox({
                title: '提示',
                content: '只能操作自己创建的数据?'
              })
              return
            }
            this.openEditDialog(rowData)
          })
          // 动态参数传递 添加时间戳保证触发watch
          grid.setEvent('jumpItem', (target, grid) => {
            const rowData = grid.getRowData(grid.getCellRow(target))
            this.jumpName = `${rowData.attachmentName};${new Date().getTime()}`
            this.showOffLine()
          })
          grid.setEvent('deleteItem', (target, grid) => {
            const rowData = grid.getRowData(grid.getCellRow(target))
            let uuid = this.$service.base.getEnvInfoSync().user.userUid
            if (rowData.uuid != uuid) {
              this.$haeCommon.tipBox({
                title: '提示',
                content: '只能操作自己创建的数据!'
              })
              return
            }
            this.openDeleteDialog(rowData)
          })
        }
      },
      startDateOp: {
        showClearBtn: false,
        cascadeDom: '#end_date',
        dateFormat: 'yyyy-MM-dd'
      },
      endDateOp: {
        showClearBtn: false,
        id: 'end_date',
        dateFormat: 'yyyy-MM-dd'
      },
      startoperarDateOp: {
        showClearBtn: false,
        cascadeDom: '#end1_date',
        dateFormat: 'yyyy-MM-dd'
      },
      endoperarDateOp: {
        showClearBtn: false,
        id: 'end1_date',
        dateFormat: 'yyyy-MM-dd'
      },
      // 模型类型
      learningMop: {
        dataset: {
          value: [
            {
              text: '现场培训',
              value: '1'
            },
            {
              text: '线上会议',
              value: '2'
            },
            {
              text: '线下学习',
              value: '3'
            },
            {
              text: '自学',
              value: '4'
            },
            {
              text: '其它',
              value: '5'
            }
          ]
        }
      },
      trainOrganVal: '', // 培训组织
      trainOrganOp: {
        // 后期需要修改
        dataset: {
          value: [
            {
              text: '信管办',
              value: 0
            },
            {
              text: '业务方',
              value: 1
            }
          ]
        }
      },
      dialogVisible: false,
      dialogTitle: '',
      dialogContent: '',
      tempItem: {},
      importDialogBoxInitdata: {
        title: '',
        visible: false
      },
      mockUrl: this.ajaxurl + 'static/safeTrain.xlsm',
      showUpload: true,
      imFile: '',
      uploadBtnOp: {
        type: 'button',
        css: {
          btn: 'btn-icon' // 按钮的样式
        },
        hue: 'primary'
      },
      iconBtnOp: {
        type: 'link',
        css: {
          icon: 'hae-icon icon-del'
        }
      }
    }
  },

  created() {
    // 获取employeeId参数
    var url = window.location.href
    var num = url.indexOf('?')
    var employeeId = ''
    if (num != -1) {
      url = url.substr(num+1);
      employeeId = url.replace('employeeId=','')
    }
    let that = this
    this.$service.business.getTrain = args => {
      return new Promise((resolve) => {
        var param = this.getFormVal()
        if (employeeId && that.excelIdFlag) {
          param.employeeId = employeeId
          that.$refs['employeeId'].widget.setValue(employeeId)
        }
        this.$service.network
          .get(
            `services/securityTrain/findList/page/${args.pageVO.pageSize}/${
              args.pageVO.curPage
            }?params=${encodeURIComponent(JSON.stringify(param))}`,
            this.getFormVal()
          )
          .then(res => {
            this.exportCount = res.data.pageVO.totalRows
            resolve(res.data)
          })
      })
    }
  },
  mounted() {
    // 导出功能，页面添加一个导出节点，点击页面导出按钮的时候，给导出节点添加上属性，并触发click功能，实现一个模拟点击节点的功能从而实现导出。
    this.imFile = document.getElementById('imFile')
    this.outFile = document.getElementById('downlink')
  },
  methods: {
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
          'services/asynchronousExport/securityTrain/export',
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

    permitCheck() {
      var check = false
      let role = this.$service.base.getEnvInfoSync().user.currentRole.roleName
      const arr = ['System Admin', '信管办安全管理员']
      arr.map(item => {
        if (role.indexOf(item) != -1) {
          check = true
        }
        return item
      })
      return check
    },
    handleClick() {
      if (this.popupFlag) {
        this.$refs.fileupload.widget.popup()
      }
    },
    showOffLine() {
      this.$refs.scDialogBox.noShowBtn()
      this.$refs.scDialogBox.externalOperationsEvent({
        type: 'changeVisible',
        value: true
        // title: title
      })
    },
    scDialogBoxAddEvent() {
      this.$refs.scDialogBox.externalOperationsEvent({
        type: 'changeVisible',
        value: false
        // title: title
      })
      this.$refs.scans.onClearByFilter()
    },
    checkDate(lStartDate, lEndDate) {
      if (lStartDate != '' && lStartDate !== null) {
        if (lEndDate == '' || lEndDate === null) {
          this.$ui.alert({
            content: '请选择完整时间段！'
          })
          return false
        }
      }
      if (lEndDate != '' && lEndDate !== null) {
        if (lStartDate == '' || lStartDate === null) {
          this.$ui.alert({
            content: '请选择完整时间段！'
          })
          return false
        }
      }
      if (lStartDate > lEndDate) {
        this.$ui.alert({
          content: '开始时间不能大于结束时间！'
        })
        return false
      }
      return true
    },
    queryEvent() {
      let startTime = this.$refs.trainStartTime.widget.getValue()
      let endTime = this.$refs.trainendTime.widget.getValue()
      let time = startTime === null ? '' : startTime
      let timeTwo = endTime === null ? '' : endTime
      if (!this.checkDate(time, timeTwo)) {
        return
      }

      this.exportobj = this.getFormVal()
      this.exportobj.trainEndTime = this.exportobj.trainendTime
      this.$refs.grid.widget.search()
    },
    resetEvent() {
      this.conditions.forEach(key => {
        this.$refs[key].widget.setValue('')
      })
      this.excelIdFlag = false

      this.queryEvent()
    },

    getFormVal() {
      const params = {}
      this.conditions.forEach(key => {
        params[key] =
          this.$refs[key].widget.getValue().trim() == 'null'
            ? ''
            : this.$refs[key].widget.getValue().trim()
      })
      ;['operateStartTime', 'operateEndTime'].forEach(key => {
        if (this.$refs[key].widget.getValue()) {
          params[key] = params[key].split(' ')[0].replaceAll('-', '/')
        }
      })
      if (params['trainStartTime']) {
        params['trainStartTime'] =
          params['trainStartTime'].split(' ')[0] + ' 00:00:00'
      }
      if (params['trainendTime']) {
        params['trainendTime'] =
          params['trainendTime'].split(' ')[0] + ' 23:59:59'
      }
      return params
    },
    openEditDialog(data) {
      this.tempItem = data
      this.dialogTitle = data ? '编辑' : '新增'
      // this.dialogTitle = '新增'
      this.dialogContent = 'addNewMan'
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      this.dialogContent = ''
    },

    onOperationDone() {
      this.closeDialog()
      this.queryEvent()
    },
    openDeleteDialog({ id}) {
      this.$haeCommon.alert({
        title: '请确认',
        content: '确认删除吗?',
        textRight: '没有',
        fun: bool => {
          bool && this.deleteItem(id)
        }
      })
    },
    deleteItem(id) {
      this.$service.network
        .post(`services/securityTrain/deleteOne/${id}`)
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
    pageJumpCache(moduleName, operation, searchVal) {
      // let descriptionval =''+operation.
      var warningParams = {
        operator: this.$service.base.getEnvInfoSync().user.userAccount,
        module: moduleName,
        operation: operation,
        detail: searchVal
        // operationTime:new Date().toLocaleString('chinese',{hour12:false}).replace(new RegExp('/',"g"),'-')
      }
      var param = {
        $service: this.$service,
        args: warningParams
      }
      this.$store.dispatch('pageJumpCache', param)
    },
    getFileName: function() {
      this.fullscreenLoading = true
      let obj = this.imFile
      if (!obj.files) {
        this.fullscreenLoading = false
        return
      }
      var f = obj.files[0]
      this.fileName = f.name
      this.$refs['uploadFile'].widget.reInit({
        text: f.name,
        type: 'link',
        hue: 'primary'
      })
      this.$refs['uploadFile'].widget.disable()
      this.file = f
      this.showUpload = false
    },
    importFile: function(f) {
      // 导入excel
      var reader = new FileReader()
      let $t = this
      reader.onload = function(e) {
        var data = e.target.result
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), {
            // 手动转化
            type: 'base64'
          })
        } else {
          $t.wb = XLSX.read(data, {
            type: 'binary',
            cellDates: true
          })
        }
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]], {
          raw: false
        })
        $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    newFunction(key, id, da, name, dept, remark, uuid) {
      if (key === 'ID') {
        id = da[key]
      }
      if (key.indexOf('姓名') != -1) {
        name = da[key]
      }
      if (key.indexOf('部门') != -1) {
        dept = da[key]
      }
      if (key.indexOf('备注') != -1) {
        remark = da[key]
      }
      if (key.indexOf('操作人ID') != -1) {
        uuid = da[key]
      }
      return { id, name, dept, remark, uuid}
    },
    analyzeData: function(data) {
      if (data.length === 0) {
        this.topBox('请填写完必填信息之后再导入', 3000, 'error')
      }
      // 此处可以解析导入数据
      var imports = []
      for (let da of data) {
        let id = '',
          employeeId = '',
          name = '',
          dept = '',
          LearnMethod = '',
          TrainDate = '',
          TrainorNo = '',
          w3Account = '',
          updateMan = '',
          remark = '',
          attachmentName = '',
          trainOrgan = '',
          uuid = ''
        Object.keys(da).forEach(key=>{
          if (key.indexOf('工号') != -1) {
            if (da[key] == '') {
              this.topBox('工号必填', 3000, 'error')
              return
            }
            let str = String(da[key])
            let rule = /^(WX|KF|GW|wx|kf|gw|00)\d{5,8}$|^\d{5,8}$|^(WX|KF|GW|wx|kf|00|gw)\d{5,8}$/
            if (!rule.test(str)) {
              this.topBox('工号格式错误', 3000, 'error')
              return
            }
            employeeId = da[key]
          }
          ;({ id, name, dept, remark, uuid } = this.newFunction(
            key,
            id,
            da,
            name,
            dept,
            remark,
            uuid
          ))
          if (key.indexOf('培训方式') != -1) {
            if (da[key] == '') {
              this.topBox('请填写完必填信息之后再导入', 3000, 'error')
              return
            }
            LearnMethod = da[key]
          }
          if (key.indexOf('是否已培训') != -1) {
            if (da[key] == '') {
              this.topBox('请填写完必填信息之后再导入', 3000, 'error')
              return
            }
            TrainorNo = da[key]
          }
          if (key.indexOf('培训日期') != -1) {
            if (da[key] == '') {
              this.topBox('请填写完必填信息之后再导入', 3000, 'error')
              return
            }
            if (!this.checkDateFormat(da[key])) {
              this.topBox(
                '培训日期填写的日期格式错误，正确日期格式为：<span style="color:red">2020/09/27或者2020-09-27<span>',
                3000,
                'error',
                true
              )
              return
            }
            TrainDate = da[key]
          }
          if (key.indexOf('签到表附件名') != -1) {
            if (da[key] == '') {
              this.topBox('请填写完必填信息之后再导入', 3000, 'error')
              return
            }
            attachmentName = da[key]
          }
          if (key.indexOf('培训组织') != -1) {
            let arr = ['业务方', '信管办']
            if (!arr.includes(da[key])) {
              this.topBox('请填写业务方或信管办之后再导入', 3000, 'error')
              return
            }
            trainOrgan = da[key] === '业务方' ? 1 : 0
          }
        })
        if (trainOrgan === '') {
          this.topBox('请填写完培训组织之后再导入', 3000, 'error')
          return
        }
        var importObj = {
          id: id,
          employeeId: employeeId,
          name: name,
          dept: dept,
          learningMethod: LearnMethod,
          trainDate: this.replaceAll(TrainDate),
          isTraining: TrainorNo,
          w3Account: w3Account,
          updateMan: updateMan,
          operationDate: new DateExtend().format('yyyy-MM-dd HH:mm:ss'),
          attachmentName: attachmentName,
          trainOrgan: trainOrgan,
          remark: remark,
          operator: this.$service.base.getEnvInfoSync().user.employeeNumber,
          lastUpdatePerson: this.$service.base.getEnvInfoSync().user
            .employeeNumber,
          operateTime: new DateExtend().format('yyyy-MM-dd HH:mm:ss'),
          lastUpdateTime: new DateExtend().format('yyyy-MM-dd HH:mm:ss'),
          escalatePerson: this.$service.base.getEnvInfoSync().user.userAccount,
          updateDate: new DateExtend().format('yyyy-MM-dd HH:mm:ss'),
          uuid: uuid
        }
        imports.push(importObj)
      }
      // 解析为后台对应的实体对象
      return imports
    },
    replaceAll(str) {
      return str.replace(/-/g, '-')
    },

    // 弹窗组件
    topBox: function(content, time, style, isHtml) {
      this.$haeCommon.topBox({
        content: content || '',
        closeTime: time || 1000,
        style: style || 'successful',
        isHtml: isHtml || false
      })
    },

    dealFile: function(data) {
      // 先根据工号查一遍，如果查出来工号则提示一下，如果点击确认，则提交到后台做数据更新
      this.imFile.value = ''
      this.fullscreenLoading = false

      if (data.length <= 0) {
        this.errorDialog = true
        this.errorMsg = '请导入正确信息'
      } else {
        data.forEach(el => {
          el.lastUpdatePerson = el.lastUpdatePerson.toUpperCase()
          el.operator = el.operator.toUpperCase()
        })
        this.excelData = data
        var args = data
        let doImport = true
        if (doImport) {
          return new Promise((resolve, reject) => {
            this.$service.network
              .post('services/securityTrain/importSecurityTrainInfo', args)
              .then(data => {
                if (data && data.data && data.data.state) {
                  this.topBox('导入成功', 1000, 'successful')
                  this.queryEvent()
                } else {
                  this.topBox('导入失败:' + data.data.message, 3000, 'error')
                }
                resolve(data.result)
              })
              .catch(reject)
          })
        }
      }
    },

    // 导入框显示
    popImport: function() {
      this.$refs.importScDialogBox.externalOperationsEvent({
        class: 'importPop',
        type: 'changeVisible',
        title: '信息安全培训记录导入',
        width: '50',
        value: true
      })
      setTimeout(() => {
        this.reSelect()
      })
    },
    checkDateFormat(date) {
      if (!date) {
        return false
      }
      var matchDateTime = date.match(/^(\d{4})(-)(\d{1,2})\2(\d{1,2})$/)
      var matchDate = date.match(/^(\d{4})(\/)(\d{1,2})\2(\d{1,2})$/)
      if (matchDateTime === null && matchDate === null) {
        return false
      }
      return true
    },
    uploadFile: function() {
      // 点击导入按钮
      this.pageJumpCache('信息安全培训详情', '信息安全培训详情导入')
      this.imFile.click()
    },
    // 重新选择文件后初始化按钮
    reSelect: function() {
      this.imFile.value = ''
      this.showUpload = true
      this.$refs['uploadFile'].widget.reInit({
        text: '点击上传',
        type: 'button',
        attr: {
          hue: 'primary'
        }
      })
      this.$refs['uploadFile'].widget.enable()
    },
    importDialogBoxEvent(opt) {
      if (opt.type === 'saveEvent') {
        this.importFile(this.file)
      }
      if (opt.type === 'closeEvent') {
        this.showUpload = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/search-common.less';

.condition-items {
  & > div {
    .l {
      width: 224px;
    }

    label {
      width: 136px;
    }

    .m {
      width: 107px;
    }

    .seperator {
      flex-grow: 1;
      text-align: center;
    }
  }
}

/deep/.icon-del {
  margin-left: 16px !important;
}
</style>

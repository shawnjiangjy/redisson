<template>
  <div>
    <scPageContainer title="机要人员权限审视详情">
      <div class="mgb-8 searchCon">
        <aui-row
          :gutter="10"
          :flex="true"
          align="middle"
        >
          <aui-col :span="4">
            <span>人员</span>
            <aui-user
              ref="w3Account"
              :op="userOp"
              v-model="formData.employeeNumber"
              class="custom-input-style"
            ></aui-user>
          </aui-col>
          <aui-col :span="4">
            <span>部门</span>
            <aui-dept ref="deptFullName" v-model="formData.dept" :op="op"></aui-dept>
          </aui-col>
          <aui-col :span="4">
            <span>审视状态</span>
            <aui-dropdown
              v-model="formData.reviewStatus"
              ref="reviewStatus"
              :op="reviewStatusOp"
              :show-clear-btn="true"
            />
          </aui-col>
        </aui-row>
        <aui-row
          :gutter="10"
          :flex="true"
          align="middle"
          class="marginTop10"
        >
          <aui-col :span="4">
            <span>直接主管</span>
            <aui-user
              ref="businessDirector"
              :op="businessDirectorOp"
              v-model="formData.businessDirector"
              class="custom-input-style"
            ></aui-user>
          </aui-col>
          <aui-col :span="4">
            <span>审视周期</span>
            <aui-dropdown
              v-model="formData.reviewPeriodList"
              ref="reviewPeriodList"
              :op="reviewListOp"
              :show-clear-btn="true"
            />
          </aui-col>
        </aui-row>
        <div class="btns marginTop30">
          <aui-button
            class="button-left"
            hue="primary"
            @click="queryEvent"
          >查询</aui-button>
          <aui-button
            plain="true"
            @click="resetEvent"
          >重置</aui-button>
        </div>
      </div>
      <div>
        <aui-row :gutter="10" :flex="true" align="middle" justify-content>
          <aui-col style="width: 20%;  padding: 0px;">
            <aui-row :flex="true">
              <aui-button class="btn-group" hue="primary" @click="add">新增</aui-button>
              <aui-button class="btn-group" hue="primary" @click="popImport">导入</aui-button>
              <aui-button class="btn-group" hue="primary" @click="exportNew">导出</aui-button>
              <aui-button class="btn-group" hue="primary" @click="notice">通知主管审视</aui-button>
            </aui-row>
          </aui-col>
        </aui-row>
      </div>
      <aui-grid
        ref="warngrid"
        :op="alignOp"
        class="iconStyle"
      ></aui-grid>
      <scDialogBox
        ref="scDialogBoxCfg"
        :initdata="initData"
        @scDialogBoxEvent="scDialogBoxEvent"
      >
        <component
          ref="confidentialAccessReviewCfg"
          :is="componentType"
          :configuration-param="configurationParam"
          :check-params = "checkParams"
        ></component>
      </scDialogBox>
      <!--导出-->
      <scExport ref="scExport" :initdata="exportinitData" @scDialogBoxEvent="exportBoxAddEvent"></scExport>
      <import-component ref="importComponent" :module ="module"
      :module-msg="moduleMsg" :has-permit="true" :mock-url="mockUrl"
      @dealImportData="dealData"></import-component>
    </scPageContainer>
  </div>
</template>
<script>
import {
  Hae,
  Button,
  Grid,
  Input,
  Row,
  Dropdown,
  Dept,
  Col,
  User
} from '@aurora/ui'
import confidentialAccessReviewCfg from './confidentialAccessReviewCfg.vue'
import importComponent from './importComponent.vue'
export default {
  components: {
    AuiButton: Button,
    AuiGrid: Grid,
    AuiRow: Row,
    AuiDropdown: Dropdown,
    AuiCol: Col,
    AuiInput: Input,
    AuiUser: User,
    AuiDept: Dept,
    confidentialAccessReviewCfg: confidentialAccessReviewCfg,
    importComponent: importComponent
  },
  data () {
    let vm = this
    return {
      checkMap: {
        '*工号': 'employeeNumber',
        '*光驱刻录权限': 'cdBomBurnPermission',
        '*Email外发权限': 'emailSendingPermission',
        '*USB不加密写权限（支持填写多个，多个以英文逗号分隔）': 'usbUnencryptedWritePermission',
        '*Proxy权限（支持填写多个，多个以英文逗号分隔）': 'proxyPermission',
        '*移动端邮件权限': 'mobileEmailPermission',
        '*移动端附件权限': 'mobileAttachPermission',
        '*welink富媒体权限（espace 附件）': 'welinkMediaPermission',
        '*是否禁用移动端云盘权限': 'disableCloudDiskPermissions',
        '*直接主管（请填写W3账号，如：y00123456）': 'businessDirector',
        '*审视周期(如：2022H1)': 'reviewPeriod'
      },
      objMap:{
        '*工号': 'employeeNumber',
        '*光驱刻录权限': 'cdBomBurnPermission',
        '*Email外发权限': 'emailSendingPermission',
        '*USB不加密写权限（支持填写多个，多个以英文逗号分隔）': 'usbUnencryptedWritePermission',
        '*Proxy权限（支持填写多个，多个以英文逗号分隔）': 'proxyPermission',
        '*移动端邮件权限': 'mobileEmailPermission',
        '*移动端附件权限': 'mobileAttachPermission',
        '*welink富媒体权限（espace 附件）': 'welinkMediaPermission',
        '*是否禁用移动端云盘权限': 'disableCloudDiskPermissions',
        '*直接主管（请填写W3账号，如：y00123456）': 'businessDirector',
        '*审视周期(如：2022H1)': 'reviewPeriod'
      },
      module:'机要人员审视',
      moduleMsg:'机要人员审视导入',
      mockUrl: this.ajaxurl + 'static/confidentialAccessReview.xlsm',
      configurationParam: {
        optType: 'newAdd'
      },
      componentType: 'confidentialAccessReviewCfg',
      initData: {
        visible: false,
        title: '机要岗位权限详情',
        width: '650px',
        saveEventClose: false
      },
      reviewStatusOp: {
        textField: 'text',
        valueField: 'value',
        placeHolder: '--请选择--',
        value: '',
        multi:true,
        dataset: {
          value: [
            {
              text: '待启动',
              value: '0'
            },
            {
              text: '待审视',
              value: '1'
            },
            {
              text: '已审视',
              value: '2'
            }
          ]
        },
        onChange: value => {
          this.formData.reviewStatus = value
        }
      },
      reviewListOp: {
        textField: 'reviewPeriod',
        valueField: 'reviewPeriod',
        placeHolder: '--请选择--',
        value: '',
        multi:true,
        dataset: {
          api: {
            name: 'business.getReviewPeriodList'
          }
        },
        onChange: value => {
          this.formData.reviewPeriodList = value
        }
      },
      op: {
        onConfirm: function() {
          var depts = vm.$refs['deptFullName'].widget.getSelected()
          var dept = ''
          if (depts !== '' && depts !== null && depts !== undefined) {
            depts.sort((a, b) => {
              return a.level - b.level
            })
            let deptArr = depts.map(x => x.deptName)
            dept = deptArr.join('/')
          }
          vm.formData.dept = dept
        }
      },
      exportobj: {},
      exportinitData: {},
      userOp: {
        valueField:'employeeNumber',
        textarea: false,
        value: ''
      },
      businessDirectorOp: {
        valueField:'userAccount',
        textarea: false,
        value: ''
      },
      exportCount: 0,
      formData: {
        employeeNumber: '',
        dept: '',
        reviewStatus: '',
        businessDirector: '',
        deleteFlag:'N',
        reviewPeriodList:''
      },
      alignOp: {
        // 设置无分页模式的滚动加载
        onlyScroll: true,
        pagerOp: {
          pageSizes: [10, 20, 50, 100],
          pageVO: {
            curPage: 1,
            pageSize: 10
          }
        },
        showTipOverflow: true,
        dataset: {
          api: {
            name: 'business.getConfidentialAccessReview'
          }
        },
        columns: [
          {
            multi: true,
            columnType: 'select'
          },
          {
            frozen: true,
            btns:[
              {
                onClick: function(value) {
                  vm.editor(value)
                },
                title: '编辑',
                type: 'link',
                css: {
                  icon: 'hae-icon icon-edit'
                }
              },
              {
                onClick: function(value) {
                  vm.delete(value)
                },
                title: '删除',
                type: 'link',
                css: {
                  icon: 'hae-icon icon-del'
                }
              },
            ],
            headCss: 'text-left',
            width: 80,
            columnType: 'operate',
            freezable: false // 取消对操作列的冻结
          },
          {
            field: 'name',
            header: '姓名',
            width: 120,
            frozen: true,
            showTip: true
          },
          {
            field: 'employeeNumber',
            header: '工号',
            width: 120,
            showTip: true,
            frozen: true
          },
          {
            field: 'dept',
            header: '部门',
            width: 160,
            frozen: true,
            showTip: true
          },
          {
            field: 'cdBomBurnPermission',
            header: '光驱刻录权限',
            width: 120,
            showTip: true,
            content: '{{:~renderUtil.standard(#data,cdBomBurnPermission,"cdBomBurnPermissionStandard")}}'
          },
          {
            field: 'usbUnencryptedWritePermission',
            header: 'USB不加密写权限',
            width: 160,
            showTip: true,
            content: '{{:~renderUtil.standardMulti(#data,usbUnencryptedWritePermission,'+
            '"usbUnencryptedWritePermissionStandard")}}'
          },
          {
            field: 'emailSendingPermission',
            header: 'Email外发权限',
            width: 180,
            content: '{{:~renderUtil.standard(#data,emailSendingPermission,'+
            '"emailSendingPermissionStandard")}}'
          },
          {
            field: 'proxyPermission',
            header: 'Proxy权限',
            width: 160,
            showTip: true,
            content: '{{:~renderUtil.standardMulti(#data,proxyPermission,"proxyPermissionStandard")}}'
          },
          {
            field: 'mobileEmailPermission',
            header: '移动端邮件权限',
            width: 160,
            showTip: true,
            content: '{{:~renderUtil.standard(#data,mobileEmailPermission,"mobileEmailPermissionStandard")}}'
          },
          {
            field: 'mobileAttachPermission',
            header: '移动端附件权限',
            width: 160,
            content: '{{:~renderUtil.standard(#data,mobileAttachPermission,"mobileAttachPermissionStandard")}}'
          },
          {
            field: 'welinkMediaPermission',
            header: 'welink富媒体权限（espace 附件）',
            width: 280,
            content: '{{:~renderUtil.standard(#data,welinkMediaPermission,"welinkMediaPermissionStandard")}}'
          },
          {
            field: 'disableCloudDiskPermissions',
            header: '是否禁用移动端云盘权限',
            width: 200,
            showTip: true,
            content: '{{:~renderUtil.standard(#data,disableCloudDiskPermissions,'+
            '"disableCloudDiskPermissionsStandard")}}'
          },
          {
            field: 'businessDirector',
            header: '直接主管',
            width: 120,
            showTip: true
          },
          {
            field: 'reviewPeriod',
            header: '审视周期',
            width: 160,
            showTip: true
          },
          {
            field: 'deptConfidentialOwner',
            header: '是否仍在本部门承担机要岗位',
            width: 220,
            showTip: true
          },
          {
            field: 'confidentialCategory',
            header: '机要岗位类别',
            width: 160,
            showTip: true
          },
          {
            field: 'confidentialDescription',
            header: '机要岗位描述',
            width: 160,
            showTip: true
          },
          {
            field: 'confidentialPositonPercent',
            header: '机要工作量占比（%）',
            width: 180,
            showTip: true
          },
          {
            field: 'permissionReviewOptions',
            header: '权限审视意见',
            width: 160,
            showTip: true
          },
          {
            field: 'reviewStatus',
            header: '审视状态',
            width: 160,
            showTip: true,
            content: '{{~renderUtil.getReviewStatus(reviewStatus)}}'
          },
          {
            field: 'completeReviewTime',
            header: '审视完成时间',
            width: 160,
            showTip: true
          },
          {
            field: 'currentDealer',
            header: '当前处理人',
            width: 160,
            showTip: true
          }
        ],
        renderUtil:{
          getReviewStatus:status=>{
            if(status == '0'){
              return '待启动'
            }
            if(status == '1'){
              return '待审视'
            }
            if(status == '2'){
              return '已审视'
            }
            return ''
          },
          standardMulti:(data,value,key)=>{
            if(value == undefined || value === null||value == ''){
              return ''
            }
            let out = []
            const arr = value.split(',')
            for(let index = 0;index<arr.length;index++){
              let node = arr[index]
              if(data.standard && data.standard[key][index]){
                out.push(node)
              }else{
                out.push(`<span style ="display:inline-block;background-color:red;color:white;
            line-height: 22px;">${node}</span>`)
              }
            }
            return '<div>'+out.join(',')+'</div>'
          },
          standard:(data,value,key)=>{
            if(value == undefined || value === null||value == ''){
              return ''
            }
            if(data.standard && data.standard[key]){
              return value
            }
            return `<div><span style ="display:inline-block;background-color:red;color:white;
            line-height: 22px;">${value}</span></div>`
          }
        }
      }
    }
  },
  created () {
    this.$service.business.getConfidentialAccessReview = args => {
      let _this = this
      _this.exportobj = JSON.parse(JSON.stringify(_this.formData))
      return new Promise(resolve => {
        if ( _this.formData.reviewPeriodList.length > 0 && typeof _this.formData.reviewPeriodList === 'string') {
          _this.formData.reviewPeriodList = _this.formData.reviewPeriodList.split(',')
        } else if ( _this.formData.reviewPeriodList.length == 0 ) {
          _this.formData.reviewPeriodList = new Array()
        }
        let param = JSON.stringify(_this.formData)
        this.$store.dispatch('getConfidentialAccessReviewData',{ $service: _this.$service,args,param})
          .then(data => {
            let result = data.data.result||[]
            result.forEach(res=>{
              if(res.employeeNumber!=undefined&&res.employeeNumber!==null&&res.employeeNumber!=''){
                // 工号小写
                res.employeeNumber = res.employeeNumber.toLowerCase()
              }
              if(res.businessDirector!=undefined&&res.businessDirector!==null&&res.businessDirector!=''){
                // 域账号格式
                res.businessDirector = res.businessDirector.toUpperCase().replace(/( |^)[A-Z]/g,(a)=>a.toLowerCase())
              }
            })
            resolve(data.data)
            this.exportCount = data.data.pageVO.totalRows
          })
      })
    }
    this.$service.business.getReviewPeriodList = args => {
      let _this = this
      return new Promise(resolve => {
        this.$store.dispatch('getReviewPeriodListData',{ $service: _this.$service})
          .then(data => {
            resolve(data.data.result)
          })
      })
    }
  },
  methods: {
    // 导出
    exportBoxAddEvent() {
      this.$refs.scExport.externalOperationsEvent({
        type: 'changeVisible',
        value: false
      })
    },
    editor(data){
      this.configurationParam.optType = 'edit'
      this.addModule(true, data, '机要岗位权限详情编辑')
    },
    delete(data){
      Hae.confirm('是否确认删除？', (bool) => {
        if (bool) {
          this.delAjax(data)
        }
      })
    },
    delAjax(data){
      let _this = this
      let param = {
        id:data.id
      }
      this.$store.dispatch('deleteConfidentialAccessReview',{ $service: _this.$service,param}).then(res => {
        if (res && res.data &&res.data.state) {
          this.$haeCommon.topBox({
            content: '删除成功',
            style: 'successful',
            onClose: function() {
              _this.queryEvent()
            }
          })
        } else {
          this.$haeCommon.topBox({
            content: '删除失败',
            style: 'error'
          })
        }
      })
    },
    scDialogBoxEvent (opt) {
      if (opt.type == 'closeEvent') {
        this.componentType = ''
      }
      if (opt.type == 'saveEvent') {
        this.$refs.confidentialAccessReviewCfg.layerEvent(() => {
          this.addModule(false)
          this.queryEvent()
        })
      }
      // 保存 取消
    },

    // 导出
    exportNew () {
      if (this.exportCount > 50000) {
        this.$haeCommon.topBox({
          content: '无法操作！因导出记录已超出50000条，请输入相应的查询条件筛选后再次导出。',
          style: 'warning',
          closeTime: 4000
        })
        return
      }
      let param = this.exportobj
      if ( param.reviewPeriodList.length > 0 ) {
        param.reviewPeriodList = param.reviewPeriodList.split(',')
      } else {
        param.reviewPeriodList = new Array()
      }
      this.$store.dispatch('exportConfidentialAccessReview', { $service: this.$service,param})
        .then(res => {
          const excelId = res.data.result
          this.$refs.scExport.externalOperationsEvent({
            type: 'changeVisible',
            value: true,
            excelId: excelId
          })
        })
    },
    // 绑定查询
    queryEvent () {
      this.exportobj = JSON.parse(JSON.stringify(this.formData))
      this.$refs.warngrid.widget.search({
        data: this.formData
      })
    },
    resetEvent () {
      this.formData = {
        employeeNumber: '',
        dept: '',
        reviewStatus: '',
        businessDirector: '',
        deleteFlag:'N'
      }
      this.exportobj = JSON.parse(JSON.stringify(this.formData))
      this.$refs.warngrid.widget.search({
        data: this.formData
      })
    },
    addModule (status, data, title) {
      this.componentType = 'confidentialAccessReviewCfg'
      var moduleOpt = {
        type: 'changeVisible',
        value: status
      }
      if (title) {
        moduleOpt.title = title
      }
      if (data) {
        this.configurationParam.id = data.id
        this.configurationParam.employeeNumber = data.employeeNumber
        this.configurationParam.cdBomBurnPermission = data.cdBomBurnPermission
        this.configurationParam.emailSendingPermission = data.emailSendingPermission
        this.configurationParam.usbUnencryptedWritePermission = data.usbUnencryptedWritePermission
        this.configurationParam.proxyPermission = data.proxyPermission
        this.configurationParam.mobileEmailPermission = data.mobileEmailPermission
        this.configurationParam.mobileAttachPermission = data.mobileAttachPermission
        this.configurationParam.welinkMediaPermission = data.welinkMediaPermission
        this.configurationParam.disableCloudDiskPermissions = data.disableCloudDiskPermissions
        this.configurationParam.businessDirector = data.businessDirector
        this.configurationParam.reviewPeriod = data.reviewPeriod
        this.configurationParam.reviewStatus = data.reviewStatus
      }
      // 显示配置页面
      this.$refs.scDialogBoxCfg.externalOperationsEvent(moduleOpt)
    },
    add(){
      this.configurationParam.optType = 'newAdd'
      this.addModule(true)
    },
    // 导入框显示
    popImport: function() {
      this.$refs.importComponent.show()
    },
    checkParams(checkMap,checkObj){
      let access = true
      Object.keys(checkMap).forEach(key=>{
        if(access&&(checkObj[key]==''||checkObj[key] === null || checkObj[key] === undefined)) {
          this.$haeCommon.topBox({
            content: '请填写' + key + '信息',
            style: 'warning'
          })
          access = false
        }
      })
      return access
    },
    analyzeData(data){
      let _this = this
      let imports = []
      let getMap = this.objMap
      getMap.id = 'id'
      getMap['工号'] = 'employeeNumber'
      getMap['直接主管'] = 'businessDirector'
      getMap['审视周期'] = 'reviewPeriod'
      for (let da of data) {
        if(!_this.checkParams(_this.checkMap,da)){
          return []
        }
        let importEle = {}
        Object.keys(getMap).forEach(key=>{
          if(importEle[getMap[key]]==''||importEle[getMap[key]]==undefined||importEle[getMap[key]]===null){
            importEle[getMap[key]] = da[key]
          }
        })
        // 导入的数据初始状态为待启动
        importEle.reviewStatus = '0'
        importEle.deleteFlag = 'N'
        imports.push(importEle)
      }
      return imports
    },
    dealData(importData){
      let data = this.analyzeData(importData)
      // 先根据工号查一遍，如果查出来工号则提示一下，如果点击确认，则提交到后台做数据更新
      if (data.length <= 0) {
        this.errorDialog = true
        this.errorMsg = '请导入正确信息'
      } else {
        var param = data
        this.$store
          .dispatch('addConfidentialAccessReview', {
            $service: this.$service,
            param
          })
          .then(data => {
            if (data && data.data && data.data.state) {
              this.topBox('导入成功', 3000, 'successful')
              this.queryEvent()
            } else {
              this.topBox('导入失败:' + data.data.message, 3000, 'error')
            }
          })
        // 数据添加到后台数据库中 并显示在列表上
      }
    },
    // 弹窗组件
    topBox: function(content, time, style) {
      this.$haeCommon.topBox({
        content: content || '',
        closeTime: time || 3000,
        style: style || 'successful'
      })
    },
    getNoticeMsg(datas){
      let set = new Set(datas.map(item=>item.employeeNumber))
      let tMap = new Map()
      let distinctDatas = datas.filter((data)=>!tMap.has(data.businessDirector)&&tMap.set(data.businessDirector,1))
      let businessDirectors = ''
      for(let data of distinctDatas){
        if(data.businessDirectorName===null&&data.businessDirectorNumber===null){
          businessDirectors+=data.businessDirector+'、'
        }else{
          businessDirectors+=(data.businessDirectorName+' '+data.businessDirectorNumber)+'、'
        }
      }
      businessDirectors = businessDirectors.substring(0,businessDirectors.length-1)
      let msg = `本次需审视的机要人员共${set.size}人,即将给对应主管${businessDirectors}推送应用号通知消息，请确认是否推送?`
      if(set.size==0){
        msg = '请选择数据'
      }
      return msg
    },
    noticeStatusCheck(datas){
      let statusCheck = datas.some(item=>{
        if(item.reviewStatus =='1'||item.reviewStatus =='2'){
          return true
        }else {
          return false
        }
      })
      return statusCheck
    },
    noticeCheck(datas){
      let empty = datas.some(item=>{
        if(item.businessDirector ===null||item.businessDirector ==''||item.businessDirector==undefined){
          return true
        }else{
          return false
        }
      })
      return empty
    },
    notice:function(){
      let param = this.$refs.warngrid.widget.getSelectedRecords()
      if(this.noticeStatusCheck(param)){
        this.topBox('只有待启动状态的数据可以被通知主管审视', 3000, 'warning')
        return
      }
      if(this.noticeCheck(param)){
        this.topBox('直接主管不能为空', 3000, 'error')
        return
      }
      Hae.confirm(this.getNoticeMsg(param), (bool) => {
        if (bool) {
          this.$store.dispatch('noticeConfidentialAccessReview', {
            $service: this.$service,
            param}).then(data => {
            if (data && data.data && data.data.state) {
              this.topBox('通知成功', 3000, 'successful')
              this.queryEvent()
            } else {
              this.topBox('通知失败:' + data.data.message, 3000, 'error')
            }
          })
        }
      })

    }
  }
}
</script>

<style lang="less" scoped>
.lastTime {
  float: right;
  margin-right: 200px;
}
.marginTop10 {
  margin-top: 15px;
}
.marginTop30 {
  margin-top: 30px;
}
.custom-input-style {
  margin-right: 10px;
  width: calc(70% - 20px);
}
.hae-col {
  span {
    width: 30%;
    // min-width: 60px;
    padding-right: 5px;
    text-align: right;
    display: inline-block;
  }
}
.createTime /deep/ .hae-input {
  width: calc(35% - 25px);
}
.createTime {
  .to {
    width: 10px;
    margin: 0 auto;
  }
}
.btn-group {
  margin: 0 8px;
}
.btns {
  text-align: center;
}

</style>

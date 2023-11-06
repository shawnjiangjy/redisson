<template>
  <div>
    <scPageContainer title="机要人员权限审视">
      <div class="mgb-8 searchCon" style="padding-top:20px;padding-bottom:15px;background:#fff;">
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
            <aui-dept ref="deptFullName" v-model="formData.dept" :op="op" style="width:200px"></aui-dept>
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
      <div style="margin-top:12px;position:relative;">
        <aui-panel :op="panelOp">
          <aui-row>
            <aui-col :span="9" class="guide-content">
                <aui-row class="row-content">
                  <aui-col :span="12">
                    <div class="guide-title">IT机要岗位人员的权限要求</div>（注：机要岗位可以开通Proxy基础权限和openproxy权限）
                  </aui-col>
                </aui-row>
                <aui-row  :gutter="0.01" v-for="(item, index) in data1" :key="index"  >
                  <aui-col  v-for="(colItem, index) in item.col" :key="index"
                  :class="`${colItem.class}`" :span="Number(`${colItem.span}`)">
                    <div>{{colItem.field}}</div>
                  </aui-col>
                </aui-row>
                <aui-row class="row-content">
                  <div class="guide-title">IT机要岗位人员的标准权限样本</div>
                </aui-row>
                <aui-row :gutter="0.01" v-for="(item, index) in data2" :key="index"  >
                  <aui-col  v-for="(colItem, index) in item.col" :key="index"
                  :class="`${colItem.class}`" :span="Number(`${colItem.span}`)">
                    <div>{{colItem.field}}</div>
                  </aui-col>
                </aui-row>
                <aui-row class="row-content">
                  <div class="guide-title">权限说明</div>
                  <div>1、移动端邮件权限：指邮件的移动端权限。true代表有移动端权限，false代表无移动端权限。通俗来说，若无权限，打开welink，点开邮件页面没有邮件。</div>
                  <div>2、移动端附件权限：在移动端权限开启的情况下，default代表无附件权限，mobileiron代表有附件权限。即有移动端邮件权限的前提下，若无附件权限，则不能打开附件。</div>
                  <div>3、移动端云盘权限：指手机、pad这些移动设备的welink———云空间的上传、查看、下载权限。</div>
                </aui-row>
            </aui-col>
            <aui-col :span="3" class="guide-right">
              <aui-row >
                <div class="guide-title">温馨提示：如需要调整权限，请员工提交下述流程进行相关权限关闭</div>
              </aui-row>
              <aui-row class="guide-right-detail">
                1、email和proxy权限开通与变更流程链接：
                <a href="http://w3.huawei.com/eso/hidm/basicApp/basicOffice.do?method=basicOffice&catalogId=10137"
                 target="_blank" >
                点击进入</a>
              </aui-row>
              <aui-row class="guide-right-detail">
                2、USB端口权限开通与变更流程链接
                <a href="http://security.huawei.com/SpesWEB/portPolicyApply.do?method=create"
                target="_blank" >点击进入</a>
              </aui-row>
              <aui-row class="guide-right-detail">
                3、移动端邮件及附件权限开通域变更流程链接：
                <a href=
                "http://w3.huawei.com/eso/hidm/anyoffice/anyofficePrivilegeApply.do?method=showApply&catalogId=10364"
                target="_blank">
                点击进入</a>
              </aui-row>
              <aui-row class="guide-right-detail">
                4、移动端云盘权限取消：
                一般华为研发用户和合作方用户是没有权限的，没办法申请，华为非研发用户默认开通权限，若需取消权限可以找对应接口人在后台设置
              </aui-row>
            </aui-col>
          </aui-row>
        </aui-panel>
      </div>
      <div style="margin-top:13px;background:#fff;">
        <aui-row :gutter="10" :flex="true" align="middle" justify-content>
          <aui-col style="width: 20%;  padding: 0px;">
            <aui-row :flex="true">
              <aui-button class="btn-group" hue="primary" @click="submit">提交</aui-button>
              <aui-button class="btn-group" hue="primary" @click="dispatch">转派处理</aui-button>
            </aui-row>
          </aui-col>
        </aui-row>
        <aui-grid
          ref="warngrid"
          :op="alignOp"
          class="iconStyle resetGridLineHeight"
        ></aui-grid>
      </div>
      <scDialogBox
        ref="scDialogBoxCfg"
        :initdata="initData"
        @scDialogBoxEvent="scDialogBoxEvent"
      >
        <component
          ref="confidentialAnnouncement"
          :is="componentType"
        ></component>
      </scDialogBox>
      <scDialogBox
        ref="dispatch"
        :initdata="dispatchInitData"
        @scDialogBoxEvent="dispatchScDialogBoxEvent"
      >
        <component
          @query="queryEvent"
          @close="closeDispatch"
          ref="confidentialDispatch"
          :is="dispatchComponentType"
        ></component>
      </scDialogBox>
    </scPageContainer>
    <select style="display:none" id = "confidentialDescriptionSelect1">
      <option value="红区业务系统的IT管理员">红区业务系统的IT管理员</option>
      <option value="机要数据库的IT管理员">机要数据库的IT管理员</option>
      <option value="工会系统的IT管理员">工会系统的IT管理员</option>
      <option value="薪酬系统的IT管理员">薪酬系统的IT管理员</option>
      <option value="网络安全监控人员">服务器/网络安全监控人员</option>
      <option value="安全渗透测试人员">安全渗透测试人员</option>
    </select>
    <select style="display:none" id = "confidentialDescriptionSelect2">
      <option value="AD的IT管理员">AD的IT管理员</option>
      <option value="LDAP的IT管理员">LDAP的IT管理员</option>
      <option value="SCAM的IT管理员">SCAM的IT管理员</option>
      <option value="运维通道的IT管理员">运维通道的IT管理员</option>
      <option value="IT帐号权限操作人员">IT帐号权限操作人员</option>
      <option value="支撑VIP的IT服务人员">支撑VIP的IT服务人员</option>
      <option value="离线备份人员">离线备份人员</option>
    </select>
  </div>
</template>
<script>
import {
  $,
  Panel,
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
import confidentialAnnouncement from './confidentialAnnouncement.vue'
import confidentialDispatch from './confidentialDispatch.vue'
import DateExtend from '../../utils/date.prototype.js'
export default {
  components: {
    AuiPanel: Panel,
    AuiButton: Button,
    AuiGrid: Grid,
    AuiRow: Row,
    AuiDropdown: Dropdown,
    AuiCol: Col,
    AuiInput: Input,
    AuiUser: User,
    AuiDept: Dept,
    confidentialAnnouncement: confidentialAnnouncement,
    confidentialDispatch:confidentialDispatch
  },
  data () {
    let vm = this
    return {
      tempOptions1:[],
      tempOptions2:[],
      data1:[
        {
          col:[
            {
              field:'信息出口权限及例外审批规则',
              class:'text-middle-4 meta-col',
              span: 3
            },
            {
              field:'邮件外发',
              class:'text-middle-1 meta-col',
              span: 1
            },
            {
              field:'Proxy附加权限',
              class:'text-middle-2 meta-col',
              span: 1
            },
            {
              field:'USB不加密写/光驱写权限',
              class:'text-middle-3 meta-col',
              span: 2
            },
            {
              field:'WeLink邮件',
              class:'text-middle-1 meta-col',
              span: 1
            },
            {
              field:'云盘',
              class:'text-middle-1 meta-col',
              span: 1
            },
            {
              field:'WeLink消息模块收发文件',
              class:'text-middle-4 meta-col',
              span: 2
            },
          ]
        },
        {
          col:[
            {
              field:'IT机要岗位加强要求',
              class:'text-middle-4 meta-col',
              span: 3
            },
            {
              field:'不允许',
              class:'text-middle-1',
              span: 1
            },
            {
              field:'不允许',
              class:'text-middle-2',
              span: 1
            },
            {
              field:'不允许',
              class:'text-middle-3',
              span: 2
            },
            {
              field:'不允许',
              class:'text-middle-1',
              span: 1
            },
            {
              field:'不允许',
              class:'text-middle-1',
              span: 1
            },
            {
              field:'不允许',
              class:'text-middle-4',
              span: 2
            },
          ]
        },
        {
          col:[
            {
              field:'IT机要岗位例外审批',
              class:'text-middle-4 meta-col',
              span: 3
            },
            {
              field:'业务主管审批',
              class:'text-middle-1',
              span: 1
            },
            {
              field:'业务主管审批',
              class:'text-middle-2',
              span: 1
            },
            {
              field:'业务主管审批',
              class:'text-middle-3',
              span: 2
            },
            {
              field:'业务主管审批',
              class:'text-middle-1',
              span: 1
            },
            {
              field:'业务主管审批',
              class:'text-middle-1',
              span: 1
            },
            {
              field:'二级部门主管审批',
              class:'text-middle-4',
              span: 2
            },
          ]
        }
      ],
      data2:[
        {
          col:[
            {
              field:'光驱刻录权限',
              class:'text-middle-1 meta-col',
              span: 1
            },
            {
              field:'USB权限',
              class:'text-middle-5 meta-col',
              span: 2
            },
            {
              field:'Email外发权限',
              class:'text-middle-2 meta-col',
              span: 1
            },
            {
              field:'Proxy权限',
              class:'text-middle-4 meta-col',
              span: 2
            },
            {
              field:'移动端邮件权限',
              class:'text-middle-5 meta-col',
              span: 2
            },
            {
              field:'移动端附件权限',
              class:'text-middle-5 meta-col',
              span: 1
            },
            {
              field:'移动端云盘权限是否禁用',
              class:'text-middle-3 meta-col',
              span: 2
            },
          ]
        },
        {
          col:[
            {
              field:'禁止',
              class:'text-middle-1',
              span: 1
            },
            {
              field:'USB加密写、只读',
              class:'text-middle-5',
              span: 2
            },
            {
              field:'（无）',
              class:'text-middle-2',
              span: 1
            },
            {
              field:'Default_Proxy_Access_365',
              class:'text-middle-4',
              span: 2
            },
            {
              field:'FALSE',
              class:'text-middle-5',
              span: 2
            },
            {
              field:'Default',
              class:'text-middle-5',
              span: 1
            },
            {
              field:'是',
              class:'text-middle-3',
              span: 2
            },
          ]
        }
      ],
      componentType: 'confidentialAnnouncement',
      dispatchComponentType:'confidentialDispatch',
      initData: {
        visible: false,
        closeBtnVisible:false,
        title: '',
        width: '960px',
        saveEventClose: false
      },
      dispatchInitData:{
        visible: false,
        title: '转派人员',
        width: '550px',
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
      userOp: {
        valueField:'employeeNumber',
        textarea: false,
        value: ''
      },
      formData: {
        employeeNumber: '',
        dept: '',
        reviewStatus: '1',
        currentDealer: this.$service.base.getEnvInfoSync().user.userAccount,
        deleteFlag:'N'
      },
      panelOp: {
        headHtml:'机要岗位权限审视操作指导 &nbsp; (点击查看)',
        expand: false,
        onCollapse:(panel)=>{
          panel.getHead()[0].innerHTML =
           '<span class="panel-icon hae-icon icon-chevron-down">'+
           '</span><h3 class="panel-title">机要岗位权限审视操作指导 &nbsp; (点击查看)</h3>'
        },
        onExpand:(panel)=>{
          panel.getHead()[0].innerHTML =
          '<span class="panel-icon hae-icon icon-chevron-down">'+
          '</span><h3 class="panel-title">机要岗位权限审视操作指导 &nbsp; (点击隐藏)</h3>'
        }
      },
      alignOp: {
        // 设置无分页模式的滚动加载
        height:500,
        onlyScroll: true,
        editMode: true,
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
            field: 'name',
            header: '姓名',
            width: 80,
            editable: false,
            frozen: true,
            showTip: true
          },
          {
            field: 'employeeNumber',
            header: '工号',
            editable: false,
            width: 90,
            frozen: true,
            showTip: true
          },
          {
            field: 'dept',
            header: '部门',
            editable: false,
            width: 100,
            frozen: true,
            showTip: true
          },
          {
            field: 'reviewStatus',
            header: '审视状态',
            editable: false,
            width: 90,
            showTip: true,
            frozen: true,
            content: '{{~renderUtil.getReviewStatus(reviewStatus)}}'
          },
          {
            field: 'deptConfidentialOwner',
            headHtml: `<div><span style="padding-right:15px"><span style="color:red">*</span>是否仍在本部门承担机要岗位
            </span></div><div><select style="width:190px" id='deptConfidentialOwnerSelect'><option value="">
            </option><option value="是">
            是</option><option value="否">否</option>
            <option value="已转岗">已转岗</option></select></div>`,
            type: 'dropdown',
            width: 250,
            showTip: true,
            format: {
              valueField: 'value',
              textField: 'text',
              dataset: {
                value: [
                  { text: '是', value: '是' },
                  { text: '否', value: '否' },
                  { text: '已转岗', value: '已转岗' }
                ]
              }
            }
          },
          {
            field: 'confidentialCategory',
            headHtml: `<div>
            <span style="padding-right:15px"><span style="color:red">*</span>机要岗位类别
            </span>
            <button style="border: 1px solid rgb(209,209,209);
            border-radius:10px;background-color:grey;line-height:12px;width:18px;">
            <span title="类别1：公司业务核心/关键信息资产的IT系统；
类别2：其他承载绝密和机密信息资产的IT公共基础设施系统。
"  style="margin-left:-2px;color:white;line-height:10px;">?</span></button></div>
            <div><select style="width:125px" id='confidentialCategorySelect'>
            <option value=""></option>
            <option value="类别1">类别1</option><option value="类别2">类别2</option>
            </select></div>`,
            type: 'dropdown',
            width: 190,
            showTip: true,
            format: {
              valueField: 'value',
              textField: 'text',
              dataset: {
                api:{
                  name:'business.getConfidentialCategory'
                }
              }
            },
            editorOp: {
              id: 'confidentialCategory',
              editable: true,
              afterTrigger: ['confidentialDescription']
            }
          },
          {
            field: 'confidentialDescription',
            headHtml: `<div><span style="padding-right:15px"><span style="color:red">*</span>机要岗位描述</span></div>
            <div><select style="width:185px"  id='confidentialDescriptionSelect'>
            <option value=""></option>
            <option value="红区业务系统的IT管理员">红区业务系统的IT管理员</option>
            <option value="机要数据库的IT管理员">机要数据库的IT管理员</option>
            <option value="工会系统的IT管理员">工会系统的IT管理员</option>
            <option value="薪酬系统的IT管理员">薪酬系统的IT管理员</option>
            <option value="网络安全监控人员">服务器/网络安全监控人员</option>
            <option value="安全渗透测试人员">安全渗透测试人员</option>
            </select></div>`,
            type: 'dropdown',
            width: 245,
            editorOp: {
              id: 'confidentialDescription',
              editable: true,
              trigger: ['confidentialCategory'],
              conf: {
                cascade: {
                  trigger: '#confidentialCategory',
                  name: 'confidentialCategory'
                },
                valueField: 'value',
                textField: 'text',
                dataset: {
                  api: {
                    name: 'business.getConfidentialDescription'
                  }
                }
              }
            },
            showTip: true
          },
          {
            headHtml: `<div><span style="padding-right:15px">
            <span style="color:red">*</span>机要工作量占比（%）</span></div><div>
            <input id= 'confidentialPositonPercentInput' type="text" style="line-height:17px;width:130px">
            </input></div>`,
            field: 'confidentialPositonPercent',
            width: 190,
            showTip: true
          },
          {
            field: 'permissionReviewOptions',
            headHtml:'<span style="color:red">*</span>权限审视意见',
            type: 'editorBy',
            width: 160,
            showTip: true
          },
          {
            field: 'cdBomBurnPermission',
            header: '光驱刻录权限',
            editable: false,
            width: 120,
            showTip: true,
            content: '{{:~renderUtil.standard(#data,cdBomBurnPermission,"cdBomBurnPermissionStandard")}}'
          },
          {
            field: 'usbUnencryptedWritePermission',
            header: 'USB权限',
            editable: false,
            width: 160,
            showTip: true,
            content: '{{:~renderUtil.standardUSBAndProxy(#data,usbUnencryptedWritePermission,"usbUnencryptedWritePermissionStandard")}}'
          },
          {
            field: 'emailSendingPermission',
            header: 'Email外发权限',
            editable: false,
            width: 180,
            content: '{{:~renderUtil.standard(#data,emailSendingPermission,'+
            '"emailSendingPermissionStandard")}}'
          },
          {
            field: 'proxyPermission',
            header: 'Proxy权限',
            editable: false,
            width: 160,
            showTip: true,
            content: '{{:~renderUtil.standardUSBAndProxy(#data,proxyPermission,"proxyPermissionStandard")}}'
          },
          {
            field: 'mobileEmailPermission',
            header: '移动端邮件权限',
            editable: false,
            width: 160,
            showTip: true,
            content: '{{:~renderUtil.standard(#data,mobileEmailPermission,"mobileEmailPermissionStandard")}}'
          },
          {
            field: 'mobileAttachPermission',
            header: '移动端附件权限',
            editable: false,
            width: 160,
            content: '{{:~renderUtil.standard(#data,mobileAttachPermission,"mobileAttachPermissionStandard")}}'
          },
          {
            field: 'welinkMediaPermission',
            headHtml: `<div><span style="padding-right:15px">welink富媒体权限</span></div>
            <div><span style="display:inline-block;text-align:center">（espace 附件）</span></div>`,
            editable: false,
            width: 160,
            content: '{{:~renderUtil.standard(#data,welinkMediaPermission,"welinkMediaPermissionStandard")}}'
          },
          {
            field: 'disableCloudDiskPermissions',
            headHtml: `<div><span style="padding-right:15px">移动端云盘权限</span></div>
            <div><span style="padding-left:15px">是否禁用</span></div>`,
            editable: false,
            width: 145,
            showTip: true,
            content: '{{:~renderUtil.standard(#data,disableCloudDiskPermissions,'+
            '"disableCloudDiskPermissionsStandard")}}'
          },
          {
            field: 'currentDealer',
            header: '当前处理人',
            editable: false,
            width: 160,
            showTip: true
          },
          {
            field: 'completeReviewTime',
            header: '审视完成时间',
            editable: false,
            width: 160,
            showTip: true
          }
        ],
        onBeforeEdit: (cellValue, rowData, td, col) => {
          // 已审视时，权限审视意见不允许编辑
          if (rowData.reviewStatus == '2' && col.field =='permissionReviewOptions') {
            return false
          }
          // 已审视时，是否仍在本部门承担机要岗位 不允许编辑
          if (rowData.reviewStatus == '2' && col.field =='deptConfidentialOwner') {
            return false
          }
          // 已审视时，机要岗位描述 不允许编辑
          if (rowData.reviewStatus == '2' && col.field =='confidentialDescription') {
            return false
          }
          // 已审视时，机要岗位类别 不允许编辑
          if (rowData.reviewStatus == '2' && col.field =='confidentialCategory') {
            return false
          }
          // 机要工作量占比（%） 不允许编辑
          if (rowData.reviewStatus == '2' && col.field =='confidentialPositonPercent') {
            return false
          }
          return true
        },
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
          standard:(data,value,key)=>{
            if(value == undefined || value === null||value == ''){
              return ''
            }
            if(data.standard && data.standard[key]){
              return value
            }
            return  `<div><span style ="display:inline-block;background-color:red;color:white;
            line-height: 22px;">${value}<span></div>`
          },
          // USB、Proxy不满足标准值时标红
          standardUSBAndProxy: (data, value, key) => {
            if (value === undefined || value === null || value === '') {
              return ''
            }
            let out = []
            const arr = value.split(',')
            for (let index = 0; index < arr.length; index++) {
              let node = arr[index]
              if (data.standard && data.standard[key][index]) {
                out.push(node)
              } else {
                out.push(`<span style ="display:inline-block;background-color:red;color:white;
            line-height: 22px;">${node}</span>`)
              }
            }
            return '<div>' + out.join(',') + '</div>'
          }
        },
        onRender:()=>{
          // 增加行高
          try{
            this.adaptGrid()
          }catch(e){
            // empty
          }
          // 设置选中状态
          var grid = vm.$refs.warngrid.widget
          let dataSet = grid.getDataset().data
          for(var index = 0;index<dataSet.length;index++){
            if(dataSet[index].reviewStatus=='1'){
              let row = grid.getRow(index)
              grid.rowSelected(row,true,false)
            }
          }
        },
        onComplete:()=>{
          // 增加行高
          try{
            this.adaptGrid()
          }catch(e){
            // empty
          }
          [{node:'deptConfidentialOwnerSelect',cell:'deptConfidentialOwner',event:'change'},
            {node:'confidentialDescriptionSelect',cell:'confidentialDescription',event:'change'},
            {node:'confidentialPositonPercentInput',cell:'confidentialPositonPercent',event:'input'}].forEach(item=>{
            // 设置 是否仍在本部门承担机要岗位、机要岗位描述、机要工作量占比（%）表格行居中
            $('#'+String(item.node)).on(item.event,(e)=>{
              var grid = vm.$refs.warngrid.widget
              var list = grid.getDataset().data
              for(var index = 0;index<list.length;index++){
                // 给对应列添加数据并渲染对应列 只能批量渲染待审视的数据
                if(list[index].reviewStatus=='1'){
                  list[index][item.cell] = e.currentTarget.value
                  var row = grid.getRow(index)
                  var td = grid.getRowCell(row, item.cell)
                  var col = grid.getColumnOp(td)
                  var rowData = grid.getRowData(index)
                  grid.renderCell(td, col, e.currentTarget.value, true, rowData)
                }
              }
            })
          })

          $('#confidentialCategorySelect').change((e)=>{
            var grid = this.$refs.warngrid.widget
            var list = grid.getDataset().data
            for(var index = 0;index<list.length;index++){
              // 给对应列添加数据并渲染对应列
              if(list[index].reviewStatus=='1'){
                list[index].confidentialCategory = e.currentTarget.value
                var row = grid.getRow(index)
                var td = grid.getRowCell(row, 'confidentialCategory')
                var col = grid.getColumnOp(td)
                var rowData = grid.getRowData(index)
                grid.renderCell(td, col, e.currentTarget.value, true, rowData)
              }
            }
            // 下面是关联到描述框，给描述框赋值的操作
            if(this.tempOptions1.length == 0 ) {
              this.tempOptions1 = document.querySelectorAll('#confidentialDescriptionSelect1 option')
            }
            if(this.tempOptions2.length == 0) {
              this.tempOptions2 = document.querySelectorAll('#confidentialDescriptionSelect2 option')
            }
            if(e.currentTarget.value=='类别1'){
              parent.replaceChildren(...this.tempOptions1)
            }
            if(e.currentTarget.value=='类别2'){
              parent.replaceChildren(...this.tempOptions2)
            }
          })
        }
      }
    }
  },
  created () {
    Hae.EditorFactory.define('editorBy', {
      publics: {
        build: function(container) {
          $('<textarea  style="height:70px" '+
          'placeholder="标红的权限不符合权限要求，请反馈需要保留或取消的权限以及对应原因" '+
          'cols="20"/>').appendTo(container)
          return container
        }
      }
    })
    this.$service.business.getConfidentialCategory = () =>{
      return [
        { text: '类别1', value: '类别1' },
        { text: '类别2', value: '类别2' }
      ]
    }
    this.$service.business.getConfidentialDescription =args=>{
      if(args&&args.confidentialCategory =='类别1'){
        return [
          { text: '红区业务系统的IT管理员', value: '红区业务系统的IT管理员' },
          { text: '机要数据库的IT管理员', value: '类别2' },
          { text: '工会系统的IT管理员', value: '工会系统的IT管理员' },
          { text: '薪酬系统的IT管理员', value: '薪酬系统的IT管理员' },
          { text: '网络安全监控人员', value: '网络安全监控人员' },
          { text: '安全渗透测试人员', value: '安全渗透测试人员' }
        ]
      }else{
        return [
          { text: 'AD的IT管理员', value: 'AD的IT管理员' },
          { text: 'LDAP的IT管理员', value: 'LDAP的IT管理员' },
          { text: 'SCAM的IT管理员', value: 'SCAM的IT管理员' },
          { text: '运维通道的IT管理员', value: '运维通道的IT管理员' },
          { text: 'IT帐号权限操作人员', value: 'IT帐号权限操作人员' },
          { text: '支撑VIP的IT服务人员', value: '支撑VIP的IT服务人员' },
          { text: '离线备份人员', value: '离线备份人员' }
        ]
      }

    }

    this.$service.business.getConfidentialAccessReview = () => {
      let _this = this
      return new Promise(resolve => {
        let param = JSON.stringify(_this.formData)
        try{
          this.$store.dispatch('getCurrentConfidentialAccessReviewData',{ $service: _this.$service,param})
            .then(data => {
              let result = data.data.result||[]
              result.forEach(res=>{
                // 此处做页面工号域账号的大小写转换显示是为了 适应导出数据以后再导入以后 aui-user组件做人员回选
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
            })
        }catch(e){
          // empty
        }
      })
    }
  },
  mounted(){
    this.$refs.scDialogBoxCfg.externalOperationsEvent({
      type: 'changeVisible',
      value: true
    })
  },
  methods: {
    adaptGrid(){
      $('.resetGridLineHeight .grid-tbody .grid-row .grid-cell').css('line-height', 80 +'px')
      $('div[name="deptConfidentialOwner"]').css('margin-top',28+'px')
      // 设置机要岗位类别 表格行居中
      $('div[name="confidentialCategory"]').css('margin-top',25+'px')
      $('div[name="confidentialDescription"]').css('margin-top',25+'px')
      $('div[name="confidentialPositonPercent"]').css('margin-top',25+'px')
    },
    newSubmitCheck(datas,grid){
      // 用于记录机要人员这一项没填的数据行的索引
      var _indexArray=[];
      // 记录deptConfidentialOwner值为'是的元素的下标'
      var deptConfidentialOwnerIsYes =[];
      var reviewList = datas.filter(function(data,_index){
        if(data.deptConfidentialOwner == '是'){
          deptConfidentialOwnerIsYes.push(_index);
        }
        if(data.deptConfidentialOwner ===null||
        data.deptConfidentialOwner ==''||
        data.deptConfidentialOwner==undefined ){
        // data.deptConfidentialOwner==undefined || data.deptConfidentialOwner === '否'){
          _indexArray.push(_index);
          return true
        }
      })
      // 必填项校验不通过，页面滚动到第一条机要人员为空的数据行
      if(reviewList.length>0){
        let row = grid.getRow(_indexArray[0])
        grid.getRowCell(row, 'deptConfidentialOwner')[0].scrollIntoView(true)
        return true
      }
      for(let index = 0;index<deptConfidentialOwnerIsYes.length;index++){
        let item = datas[deptConfidentialOwnerIsYes[index]];
        if(item.deptConfidentialOwner == '是'){
          if(item.confidentialCategory ===null||
          item.confidentialCategory ==''||
          item.confidentialCategory==undefined){
            let row = grid.getRow(deptConfidentialOwnerIsYes[index])
            grid.getRowCell(row, 'confidentialCategory')[0].scrollIntoView(true)
            return true
          }
          if(item.confidentialDescription ===null||
          item.confidentialDescription ==''||
          item.confidentialDescription==undefined){
            let row = grid.getRow(deptConfidentialOwnerIsYes[index])
            grid.getRowCell(row, 'confidentialDescription')[0].scrollIntoView(true)
            return true
          }
          if(item.confidentialPositonPercent ===null||
          item.confidentialPositonPercent ==''||
          item.confidentialPositonPercent==undefined){
            let row = grid.getRow(deptConfidentialOwnerIsYes[index])
            grid.getRowCell(row, 'confidentialPositonPercent')[0].scrollIntoView(true)
            return true
          }
          if(item.permissionReviewOptions ===null||
          item.permissionReviewOptions ==''||
          item.permissionReviewOptions==undefined){
            let row = grid.getRow(deptConfidentialOwnerIsYes[index])
            grid.getRowCell(row, 'permissionReviewOptions')[0].scrollIntoView(true)
            return true
          }
        }
      }
      return false
    },

    submitCheck(datas,grid){
      for(let index = 0;index<datas.length;index++){
        let item = datas[index]
        item.reviewStatus = '2'
        let currentTime = new DateExtend().format('yyyy-MM-dd HH:mm:ss')
        item.completeReviewTime = currentTime
        let deptConfidentialOwner = item.deptConfidentialOwner
        if (deptConfidentialOwner === null ||
        deptConfidentialOwner === '' ||
        deptConfidentialOwner === undefined || deptConfidentialOwner === '否') {
          let row = grid.getRow(index)
          grid.getRowCell(row, 'deptConfidentialOwner')[0].scrollIntoView(true)
          return true
        }
        if (deptConfidentialOwner === '是') {
          if (item.confidentialCategory === null ||
          item.confidentialCategory === '' ||
          item.confidentialCategory === undefined) {
            let row = grid.getRow(index)
            grid.getRowCell(row, 'confidentialCategory')[0].scrollIntoView(true)
            return true
          }
          if (item.confidentialDescription === null ||
          item.confidentialDescription ==''||
          item.confidentialDescription==undefined){
            let row = grid.getRow(index)
            grid.getRowCell(row, 'confidentialDescription')[0].scrollIntoView(true)
            return true
          }
          if (item.confidentialPositonPercent === null ||
          item.confidentialPositonPercent === '' ||
          item.confidentialPositonPercent === undefined) {
            let row = grid.getRow(index)
            grid.getRowCell(row, 'confidentialPositonPercent')[0].scrollIntoView(true)
            return true
          }
          if(item.permissionReviewOptions ===null||
          item.permissionReviewOptions ==''||
          item.permissionReviewOptions==undefined){
            let row = grid.getRow(index)
            grid.getRowCell(row, 'permissionReviewOptions')[0].scrollIntoView(true)
            return true
          }
        }
      }
      // 滚动到为空数据的行
      return false
    },
    getSubmitMsg(datas){
      let set = new Set(datas.map(item=>item.employeeNumber))
      let tMap = new Map()
      let distinctDatas = datas.filter((data)=>!tMap.has(data.employeeNumber)&&tMap.set(data.employeeNumber,1))
      let employeeNumbers = ''
      for(let data of distinctDatas){
        employeeNumbers+=data.employeeNumber+'、'
      }
      employeeNumbers = employeeNumbers.substring(0,employeeNumbers.length-1)
      let msg = `请确认已审视机要人员：${employeeNumbers}的权限详情`
      if(set.size==0){
        msg = '请选择数据'
      }
      return msg
    },
    submit:function(){
      var grid = this.$refs.warngrid.widget
      let param = grid.getSelectedRecords()
      for(let data of param){
        data.reviewStatus = '2'
        data.completeReviewTime = new DateExtend().format('yyyy-MM-dd HH:mm:ss')
      }

      // 参数校验
      if(this.newSubmitCheck(param,grid)){
        this.topBox('请填写必填项，若暂时不提交该机要人员的审视意见，请在复选框处去掉勾选', 4000, 'error')
        return true;
      }
      Hae.confirm(this.getSubmitMsg(param), (bool) => {
        if (bool) {
          this.$store
            .dispatch('addConfidentialAccessReview', {
              $service: this.$service,
              param
            })
            .then(res => {
              let resonse = res.data
              if (resonse && resonse.state) {
                this.topBox(resonse.result || '操作成功', 1000, 'successful')
                this.queryEvent()
              } else {
                this.topBox(resonse.result || '操作失败', 2000, 'error')
              }
            })
        }
      })
    },
    closeDispatch(){
      this.$refs.dispatch.externalOperationsEvent({
        type: 'changeVisible',
        value: false
      })
    },
    checkDispatch(datas){
      var reviewList = datas.filter(data=>data.reviewStatus=='2')
      if(reviewList.length>0){
        return true
      }
      return false
    },
    dispatch(){
      var grid = this.$refs.warngrid.widget
      let param = grid.getSelectedRecords()
      if(param===null||param.length==0){
        this.topBox('请选择转派数据', 3000, 'warning')
        return
      }
      // 看下是否有已审视的数据
      if(this.checkDispatch(param)){
        this.topBox('已审视状态的数据无需转派处理', 3000, 'warning')
        return
      }
      Hae.confirm(this.getDispatchMsg(param), (bool) => {
        if (bool) {
          // 打开转派人员页面
          this.$refs.dispatch.externalOperationsEvent({
            type: 'changeVisible',
            value: true
          })
        }
      })
    },
    scDialogBoxEvent (opt) {
      if (opt.type == 'closeEvent') {
        this.componentType = ''
      }
      if (opt.type == 'saveEvent') {
        this.$refs.scDialogBoxCfg.externalOperationsEvent({
          type: 'changeVisible',
          value: false
        })
      }
      // 保存 取消
    },
    getDispatchMsg(datas){
      let set = new Set(datas.map(item=>item.employeeNumber))
      let msg = `您正在将清单中的${set.size}个机要人员的权限详情转派他人审视,请确认?`
      if(set.size==0){
        msg = '请选择数据'
      }
      return msg
    },
    dispatchScDialogBoxEvent (opt){
      if (opt.type == 'closeEvent') {
        this.componentType = ''
      }
      var grid = this.$refs.warngrid.widget
      let param = grid.getSelectedRecords()
      if (opt.type == 'saveEvent') {
        this.$refs.confidentialDispatch.dispatchTo(param)
      }
    },
    // 绑定查询
    queryEvent () {
      this.$refs.warngrid.widget.search({
        data: this.formData
      })

    },
    resetEvent () {
      this.formData = {
        employeeNumber: '',
        dept: '',
        reviewStatus: '1',
        currentDealer: this.$service.base.getEnvInfoSync().user.userAccount,
        deleteFlag:'N'
      }
      this.$refs.warngrid.widget.search({
        data: this.formData
      })
    },
    // 弹窗组件
    topBox: function(content, time, style) {
      this.$haeCommon.topBox({
        content: content || '',
        closeTime: time || 3000,
        style: style || 'successful'
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .page-container-style{
  background: #eeeaea;
}
/deep/ .page-container-style .page-container-title{
  background: #fff;
  margin-bottom:0;
  padding-top:10px;
}
/deep/ .hae-grid .grid-head thead .grid-innercell{
  height: 56px;
}
/deep/ .grid-thead span:not(.hae-icon){
  height: 40px;
  line-height: 28px;
}
.hae-panel{
  border-bottom:0;
}
/deep/ .hae-panel .panel-head{
  margin-bottom:5px;
  background: #fff;
}
/deep/ .hae-panel .panel-head h3{
  color:#169def;
}
/deep/ .hae-panel .panel-body{
  background: #fff;
}
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
    min-width: 60px;
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
.headerTip {
  margin-left:-2px;
  color:white;
  line-height:10px;
}

.titleconent {
  border: 1px solid #ccc;
}

.rowdisplay {
  display: flex;
}

.bordercol {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.bottomborder {
  border-bottom: 0.1px solid #ccc;
}
.text-middle {
  border: 0.1px solid grey;
  padding-top: 5px;
  padding-bottom: 5px;
  display: inline-block;
  align-items: center;
  text-align: center;
}
.text-middle-4:extend(.text-middle) {

}
.text-middle-3:extend(.text-middle) {

}
.text-middle-5:extend(.text-middle) {

}
.text-middle-2:extend(.text-middle) {

}
.text-middle-1:extend(.text-middle) {

}
.meta-col{
  background-color: #c2c0c0;
}
.guide-title{
  display: inline-block;
  font-size: 13px;
  font-weight: 800;
}
.guide-content{
  height: 325px;
  border:1px solid #eaeaea;
  padding-top:5px;
  padding-bottom:5px;
}
.guide-right{
  height: 325px;
  border:1px solid #EAEAEA;
  padding-top:5px;
  padding-bottom:5px;
}
.guide-right-detail{
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: 500;
}
.row-content{
  margin-top:10px;
  margin-bottom: 10px;
}
</style>

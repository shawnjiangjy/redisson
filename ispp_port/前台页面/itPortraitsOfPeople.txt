<template>
  <div>
    <scPageContainer style="width: 100%;float:left" v-show="flag" title="IT人员档案">
      <div v-show="flag" class="relativeInfoMenuContainler">
        <p class="title">相关权限信息</p>
        <!--<aui-tree-menu class="relativeInfoMenu1" :op="relativeInfoMenu"></aui-tree-menu>-->
        <ul>
          <li>
              <a style="margin-left:20%" href="#/itPortraitsOfPeople/permissionQuery" target="_blank">权限明细</a>
          </li>
          <li style="margin-top:5%">
              <a style="margin-left:20%" href="#/operationPersonnelCountDay/operationPersonnelCountDayDetail" target="_blank">运维人员变化趋势</a>
          </li>
        </ul>
      </div>
      <div style="width: 85%;">
        <div class="condition-group" @keyup.enter="queryEvent">
          <div class="group-items">
            <div>
              <label>姓名</label>
              <aui-input ref="employeeName" :show-clear-btn="true" place-holder="请输入姓名" class="l" />
            </div>
            <div>
              <label>工号</label>
              <aui-user ref="employeeId" :op="opForMulti" :show-clear-btn="true" class="l"></aui-user>
            </div>
            <div class="temp-holder" />
            <div class="temp-holder" />
          </div>
        </div>
        <div v-show="advancedSearch">
          <div class="condition-group" @keyup.enter="queryEvent">
            <div class="group-title">
              <span>资质</span>
            </div>
            <div class="group-items">
              <div>
                <label>在职状态</label>
                <aui-selectgroup ref="jobStatus" :op="jobStatusOp" class="l" />
              </div>
              <div>
                <label>人员类别</label>
                <aui-selectgroup ref="employeeType" :op="employeeTypeOp" class="l" />
              </div>
              <div>
                <label>部门</label>
                <!-- <aui-input ref="deptAllName" :show-clear-btn="true" place-holder="请输入" class="l" /> -->
                <aui-dept
                  ref="deptAllName"
                  v-model="deptValue"
                  :op="op"
                  :auto-select="true"
                  style="width:200px;"
                ></aui-dept>
              </div>
              <div>
                <label>产品领域</label>
                <aui-dropdown
                  ref="productDomain"
                  :op="productDomainOp"
                  :show-clear-btn="true"
                  place-holder="请输入"
                  class="l"
                />
              </div>
              <div>
                <label>人员角色</label>
                <aui-dropdown ref="employeeRoles" :op="roleSignOp" place-holder="请选择" class="l" />
              </div>
              <div>
                <label>信用积分</label>
                <aui-dropdown ref="itCreditValueSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="itCreditValue" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div v-show="hiddenflag">
                <label>风险项</label>
                <aui-dropdown ref="riskCondition" :op="riskConditionOp" place-holder="请选择" class="l" />
              </div>
              <div v-show="hiddenflag">
                <label>风险数</label>
                <aui-dropdown ref="totalRiskCntSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="totalRiskCnt" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
                <label>违规行为</label>
                <aui-dropdown
                  ref="illegalActions"
                  :op="illegalActionsOp"
                  place-holder="请选择"
                  class="l"
                />
              </div>
              <div>
                <label>违规总次数</label>
                <aui-dropdown ref="illegalCountSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="illegalCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
                <label>服务年限</label>
                <aui-dropdown ref="entryAgeLimitSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="entryAgeLimit" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div v-show="hiddenflag">
                <label>任职级别</label>
                <aui-dropdown ref="positionLevel" :op="positionLevelOp" place-holder="请选择" class="l" />
              </div>
              <div>
                <label>IT安全认证通过天数</label>
                <aui-dropdown ref="itExamPassDaySelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="itExamPassDay" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
                <label>安全意识教育天数</label>
                <aui-dropdown ref="itSafeTeachDaySelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="itSafeTeachDay" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
              <label>资质</label>
              <aui-selectgroup ref="qualificationStatus" :op="qualificationOp" class="l" />
            </div>
              <div v-show="hiddenflag">
                <label>职级</label>
                <aui-dropdown ref="employeeLevel" :op="employeeLevelOp" place-holder="请选择" class="l" />
              </div>
              <div class="temp-holder"></div>
            </div>
          </div>
          <div class="condition-group" @keyup.enter="queryEvent">
            <div class="group-title">
              <span>权限</span>
            </div>
            <div class="group-items">
              <div v-show="hiddenflag">
                <label>拥有特权的系统数</label>
                <aui-dropdown ref="sysByAuthCountSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="sysByAuthCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div v-show="hiddenflag">
                <label>拥有特权的账号数</label>
                <aui-dropdown ref="accByAuthCountSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="accByAuthCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div v-show="hiddenflag">
                <label>特权资源池账号数</label>
                <aui-dropdown ref="totalCountSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="totalCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div v-show="hiddenflag">
                <label>HIS特权系统数</label>
                <aui-dropdown ref="appCountSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="appCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div v-show="hiddenflag">
                <label>审批人人数</label>
                <aui-dropdown
                  ref="sidAndEidLeaderCountSelect"
                  :op="selectOp"
                  place-holder="运算"
                  class="s"
                />
                <aui-input
                  ref="sidAndEidLeaderCount"
                  :show-clear-btn="true"
                  class="m"
                  place-holder="值"
                />
              </div>
              <div>
                <label>有关键系统权限</label>
                <aui-selectgroup ref="isKeySysAuth" :op="ynOp" class="l" />
              </div>
              <div></div>
              <div></div>
              <div class="temp-holder"></div>
            </div>
          </div>
          <div class="condition-group" @keyup.enter="queryEvent" v-show="hiddenflag">
            <div class="group-title">
              <span>操作</span>
            </div>
            <div class="group-items">
              <div>
                <label>特权申请次数</label>
                <aui-dropdown ref="eidCountSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="eidCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
                <label>变更申请次数</label>
                <aui-dropdown
                  ref="devopsCountByChangeSelect"
                  :op="selectOp"
                  place-holder="运算"
                  class="s"
                />
                <aui-input
                  ref="devopsCountByChange"
                  :show-clear-btn="true"
                  class="m"
                  place-holder="值"
                />
              </div>
              <div>
                <label>事件处理次数</label>
                <aui-dropdown
                  ref="devopsCountByEventSelect"
                  :op="selectOp"
                  place-holder="运算"
                  class="s"
                />
                <aui-input
                  ref="devopsCountByEvent"
                  :show-clear-btn="true"
                  class="m"
                  place-holder="值"
                />
              </div>
              <div>
                <label>例行工作处理次数</label>
                <aui-dropdown
                  ref="devopsCountByWorkSelect"
                  :op="selectOp"
                  place-holder="运算"
                  class="s"
                />
                <aui-input ref="devopsCountByWork" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
                <label>操作次数</label>
                <aui-dropdown ref="operationCountSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="operationCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
                <label>运维通道登录次数</label>
                <aui-dropdown ref="logonCountSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="logonCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
                <label>FTP下载文件数</label>
                <aui-dropdown
                  ref="ftpDownloadCountSelect"
                  :op="selectOp"
                  place-holder="运算"
                  class="s"
                />
                <aui-input ref="ftpDownloadCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
                <label>云平台操作次数</label>
                <aui-dropdown
                  ref="operServiceCountSelect"
                  :op="selectOp"
                  place-holder="运算"
                  class="s"
                />
                <aui-input ref="operServiceCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
              <div>
                <label>应用层操作次数</label>
                <aui-dropdown ref="operAppCountSelect" :op="selectOp" place-holder="运算" class="s" />
                <aui-input ref="operAppCount" :show-clear-btn="true" class="m" place-holder="值" />
              </div>
            </div>
          </div>
        </div>
        <div class="dflex search-btn-group">
          <aui-button class="button-left" hue="primary" @click="queryEvent">查询</aui-button>
          <aui-button plain="true" @click="resetEvent">重置</aui-button>
          <div class="advanced-search" @click="advancedSearch = !advancedSearch">
            <span>高级搜索</span>
            <i :class="{ expanded: advancedSearch }" class="hae-icon icon-chevron-down" />
          </div>
          <!-- <span @click="$router.push('/itPortraitsOfPeople/safaTrain')">go</span> -->
        </div>
        <aui-row
          :gutter="10"
          :flex="true"
          align="middle"
          justify-content=""
        >
          <aui-col style="width: 100%;    padding: 0px;">
            <aui-button hue="primary" v-show="hasPermit.export" @click="exportNew">导出</aui-button>
          </aui-col>
        </aui-row>
        <scGrid ref="scGrid" :initdata="scGridData" :optparam="scGridDataTwo" @optEvent="optEvent"></scGrid>
        <a id="downlink"></a>
        <!--导出-->
        <scExport ref="scExport" :initdata="exportinitData" @scDialogBoxEvent="scDialogBoxAddEvent"></scExport>
      </div>
    </scPageContainer>

    <!-- 用于放置详情 -->
    <div v-if="detalflag" style="position: relative;">
      <!-- 第一行 -->
      <aui-row>
        <RadarDetail
          :position-level-color="positionLevelColor"
          :red-color="redColor"
          :radar-data="radarData"
          @colorChange="colorChange"
        ></RadarDetail>
      </aui-row>
      <!-- 第二行 -->
      <aui-row>
        <aui-tabs v-model="activeDetailTab" style="margin-top:60px">
          <aui-tab-item name="qualificationDetailTab">
            <div slot="title" class="titleStyle" @click="toggleTab('qualificationDetailTab')">
              <span>资质</span>
            </div>
            <div class="dflex">
              <component
                ref="itPeopleEidApplyView"
                :color-data="colorData"
                :is="key"
                :basic-data="basicData"
                :cach-param="cachParam"
                @returnToMainPage="returnToMainPage"
              ></component>
              <div class="temp-holder"></div>
            </div>
          </aui-tab-item>
          <div class="permission-tab">
            <aui-tab-item name="permissionTab">
              <div slot="title" class="titleStyle" @click="toggleTab('permissionTab')">
                <span>权限</span>
              </div>
              <div class="dflex">
                <PermissionDetail :perm-detail-data="permDetailData" :is="key1"></PermissionDetail>
                <PermissionAutor :per-autor-data="perAutorData"></PermissionAutor>
                <div class="temp-holder"></div>
              </div>
            </aui-tab-item>
          </div>
          <aui-tab-item name="operationTab">
            <div slot="title" class="titleStyle" @click="toggleTab('operationTab')">
              <span>操作</span>
            </div>
            <div class="dflex" @keyup.enter="queryEvent">
              <ApplyHistory :apply-data="applyData"></ApplyHistory>
              <WorkHistory :work-his-data="workHisData"></WorkHistory>
              <WorkEnviron :work-env-data="workEnvData"></WorkEnviron>
              <div class="temp-holder"></div>
            </div>
          </aui-tab-item>
        </aui-tabs>
      </aui-row>
      <!-- 第三行 -->
      <div class="float-button" @click="back">返回</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/deep/.hae-ui-tabs .hae-tabs__header .hae-tabs__nav-wrap {
  margin-left: 34px;
}

/deep/.hae-ui-tabs .hae-tabs__header {
  background: #fff;
  border-bottom: 1px solid rgb(229, 229, 229);
}

/deep/.hae-ui-tabs .hae-tabs__content {
  position: relative;
  padding: 0px;
}
/deep/.hae-tree.hae-tree-menu.tree-wrap>.tree-menus>.tree-node .tree-menus-link .tree-node-body .tree-node-name {
   font-size:15px;
   color:#1890ff;
   margin-left: 25%;
}
.relativeInfoMenuContainler{
  margin-top:-40px;
  width: 15%;
  float:right;
}
/deep/.hae-tree.hae-tree-menu{
  width:100%
}
.title {
    margin-left:20px;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    color: #333333;
    margin-bottom: 20px;
    position: relative;
}
.hae-template-default .template-main {
  background: none !important;
}

.titleStyle {
  width: 60px;
  height: 42px;
  text-align: center;
}

.titleStyle span {
  font-weight: 600;
}

.group-title {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  margin: 8px 0;

  span {
    display: inline-block;
    width: 32px;
  }

  &::after {
    content: '';
    display: inline-block;
    width: calc(100% - 32px);
    background-color: #e5e5e5;
    height: 1px;
  }
}

.search-btn-group {
  margin-top: 12px;
  position: relative;
  align-items: center;
}

.advanced-search {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #1890ff;
  text-align: center;
  cursor: pointer;

  i {
    margin-left: 4px;
    font-size: 13px;
    transition: all ease-in-out 0.3s;
    transition-delay: 0.1s;

    &.expanded {
      transform: rotate(180deg);
    }
  }
}

.l {
  width: 200px;
}

.m {
  width: 116px;
}

.s {
  width: 80px;
  margin-right: 4px;
}

.condition-group {
  & > div {
    max-width: 1799px;
    margin: 0 auto;
  }

  .group-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    & > div {
      display: flex;
      align-items: center;
      min-width: 360px;
      margin: 6px 0;

      label {
        display: inline-block;
        width: 160px;
        font-size: 14px;
        color: #666;
        text-align: right;

        &::after {
          content: '：';
        }
      }
    }
  }
}

.float-button {
  line-height: 45px;
  cursor: pointer;
  position: absolute;
  top: 0;
  color: #1890ff;
  right: 10px;
}

/* .condition-group{
  max-width:1260px;
}
.condition-tabs .dflex>div{
  width: 366px;
  margin: 6px;
  display: flex;
  align-items: center;
}
.condition-tabs .dflex>div label{
  font-size: 14px;
  color: #333;
  flex-grow: 1;
  text-align: right;
  margin-right: 14px;
}
.condition-tabs .dflex>div .l{
  width: 210px;
}
.condition-tabs .dflex>div .m{
  width: 123px;
}
.condition-tabs .dflex>div .s{
  width: 84px;
  margin-right: 3px;
}

.basic-condition{
  display: flex;
}
.basic-condition>div{
  margin-right: 48px;
}
.basic-condition>div label{
  margin-right: 14px;
}
.basic-condition>div .l{
  width: 210px;
} */

.icon-chevron-right {
  transform: rotate(0);
  transition: all 0.25s;
}

.is-active .icon-chevron-right {
  transform: rotate(90deg);
}

.temp-holder {
  width: 360px;
}

 .tree-node-name {
    color: green !important;
    font-size: 30px !important;
    padding: 2px 4px;
    border-radius: 6px;
}
.permission-tab {
  display: none;
}
</style>

<script>
import opsMixin from './opsMixin'
import { bus } from '@/utils/bus.js'

import {
  Selectgroup,
  Tabs,
  TabItem,
  Button,
  Row,
  Dropdown,
  Input,
  Col,
  User,
  Datepicker,
  DialogBox,
  Dept,
  TreeMenu
} from '@aurora/ui'
import ItPeopleEidApplyView from './itPeopleEidApplyView.vue'
import ItPeopleJobRecordsView from './itPeopleJobRecordsView.vue'
import ItPeopleDetails from './itPeopleDetails'
import PermissionDetail from './permissionDetail'
import ApplyHistory from './applyHistory'
import WorkHistory from './workHistory'
import WorkEnviron from './workEnviron'
import PermissionAutor from './permissionAutor'
import RadarDetail from './radarDetail'

export default {
  components: {
    AuiSelectgroup: Selectgroup,
    AuiTabs: Tabs,
    AuiTabItem: TabItem,
    AuiButton: Button,
    AuiRow: Row,
    AuiDropdown: Dropdown,
    AuiInput: Input,
    AuiCol: Col,
    AuiUser: User,
    ItPeopleEidApplyView: ItPeopleEidApplyView,
    ItPeopleJobRecordsView: ItPeopleJobRecordsView,
    ItPeopleDetails: ItPeopleDetails,
    PermissionDetail: PermissionDetail,
    ApplyHistory: ApplyHistory,
    WorkHistory: WorkHistory,
    WorkEnviron: WorkEnviron,
    PermissionAutor: PermissionAutor,
    RadarDetail: RadarDetail,
    AuiDatepicker: Datepicker,
    AuiDialogBox: DialogBox,
    AuiDept: Dept,
    AuiTreeMenu:TreeMenu
  },
  mixins: [opsMixin],
  data() {
    var initParam = {
      userAccount: this.$service.base.getEnvInfoSync().user.userAccount,
      canApplyEid: this.$route.query.isEidMember
        ? this.$route.query.isEidMember
        : ''
    }
    let dept = this.$route.query.dept
    if (dept) {
      initParam.deptAllName = dept
    }
    let domain = this.$route.query.domain
    if (domain) {
      initParam.productDomain = domain
    }
    [
      'isKeySysAuth',
      'riskCondition',
      'dayId',
      'deptAllName',
      'employeeId',
      'employeeRoles'
    ].forEach(key => {
      if (this.$route.query[key]) {
        initParam[key] = this.$route.query[key]
      }
    })
    if (this.$route.query.Employee_ID) {
      let employee = ''
      let userID = this.$service.base.getEnvInfoSync().user.employeeNumber
      let roles = this.$service.base.getEnvInfoSync().user.roles
      let isorle = false
      let rolesArr = this.$service.base.getEnvInfoSync().user.currentRole
        .personalPermissions
      for (let i = 0; i < rolesArr.length; i++) {
        if (
          rolesArr[i] ===
          'isppBehaviormon$Service$Occ.PortraitDetail$getPortraitDetailList'
        ) {
          isorle = true
        }
      }
      if (isorle) {
        if (roles === '访客') {
          // 只能看当前登陆人想情信息
          if (
            this.$route.query.Employee_ID.toUpperCase() === userID.toUpperCase()
          ) {
            employee = userID
          } else {
            this.$router.push('/noPermit')
          }
        } else {
          employee = this.$route.query.Employee_ID
        }
      } else {
        // 跳转无权限页面
        this.$router.push('/noPermit')
      }
      initParam = {
        employeeId: employee,
        userAccount: userID
      }
    }
    if (this.$route.query.DOMAIN_NAME) {
      let domainName = this.$route.query.DOMAIN_NAME
      let userID = this.$service.base.getEnvInfoSync().user.userAccount

      initParam = {
        productDomain: domainName,
        userAccount: userID
      }
    }
    let vue = this
    return {
      exportinitData:{},
      exportCount: 0,
      exportobj: {},
      deptValue: '',
      op: {
        onConfirm: function() {
          var depts = vue.$refs['deptAllName'].widget.getSelected()
          var dept = ''
          if (depts !== '' && depts !== null && depts !== undefined) {
            depts.sort((a, b) => {
              return a.level - b.level
            })
            depts = depts.slice(1)
            let deptArr = depts.map(x => x.deptName)
            dept = deptArr.join('/')
          }
          vue.deptValue = dept
        }
      },
      qualificationOp:{
        mode: 'radio',
        textField: 'text',
        valueField: 'value',
        dataset: {
          value: [
            {
              text: '符合',
              value: 'Y'
            },
            {
              text: '不符合',
              value: 'N'
            }
          ]
        }
      },
      opForMulti: {
        placeHolder: '请输入工号',
        valueField: 'employeeNumber',
        isdetail: true
      },
      productDomainOp: {
        novalid: true,
        textField: 'domain',
        valueField: 'domain',
        value: '',
        dataset: {
          api: {
            url: 'services/personInfo/domainList',
            resDataProLogic: data => {
              return data
            }
          }
        }
      },
      roleSignOp: {
        textField: 'roleSignName',
        valueField: 'roleColumnName',
        multi: true,
        dataset: {
          api: {
            url: `services/roleSign/getAllRoleSignList?params=${encodeURI(
              this.$service.base.getEnvInfoSync().user.roles
            )}`,
            resDataProLogic: data => {
              var dataArr = []
              data.forEach(item => {
                var ele = {
                  text: item.roleSignName,
                  value: item.roleColumnName
                }
                dataArr.push(ele)
              })
              return dataArr
            }
          }
        }
      },
      advancedSearch: false,
      colorData: '',
      positionLevelColor: '',
      redColor: '',
      activeTab: null,
      activeDetailTab: 'qualificationDetailTab',
      singleConditions: [
        'employeeName',
        'employeeId',
        'deptAllName',
        'productDomain',
        'jobStatus',
        'employeeType',
        'employeeRoles',
        'riskCondition',
        'illegalActions',
        'positionLevel',
        'employeeLevel',
        'isKeySysAuth',
        'qualificationStatus'
      ],
      doubleConditions: [
        'itCreditValue',
        'totalRiskCnt',
        'illegalCount',
        'entryAgeLimit',
        'itExamPassDay',
        'itSafeTeachDay',
        'sysByAuthCount',
        'accByAuthCount',
        'totalCount',
        'appCount',
        'sidAndEidLeaderCount',
        'eidCount',
        'devopsCountByChange',
        'devopsCountByEvent',
        'devopsCountByWork',
        'operationCount',
        'logonCount',
        'ftpDownloadCount',
        'operServiceCount',
        'operAppCount'
      ],
      origin: false,
      alldata: '',
      perAutorData: {},
      workEnvData: {},
      workHisData: {},
      applyData: {},
      ftpData: {},
      basicData: {},
      permDetailData: {},
      radarData: {},
      cachParam: {},
      workNo: '',
      key: '',
      key1: '',
      hasPermit: {
        export:this.$service.privilege.check('Service$Occ.AsynchronousExport2$itPortraitsOfPeopleExport') || false
      },
      componentType: '',
      configurationParam: {
        optType: ''
      },
      flag: true,
      // hiddenflag用来隐藏相关字段
      hiddenflag: false,
      detalflag: false,
      // 数据组件逻辑通用数据集
      scGridDataTwo: {
        // 是否开启服务端排序
        isSort: true,
        // 服务端排序逻辑字段
        sortLogic: {
          // 禁止服务端排序字段
          escapeField: {
            //     'whiteListTypeName' : 'whiteListType'
          }
        },
        // 绑定操作栏自定义事件
        renderUtilEventArr: ['detail'],
        apiName: 'business.getPortraitDetailList',
        ajaxParam: {
          dispatch: 'getPortraitDetailList',
          methods: 'post',
          // mutations 方法名 非必填
          mutationsName: 'GET_CONTACT',
          // 页面加载初始参数
          paramData: initParam,
          // 获取到数据需要做处理得 非必填
          resDataProLogic: data => {
            this.alldata = data
            if (this.$route.query.Employee_ID) {
              this.godetails(data)
            }
            return data
          },
          resProLogic: data=>{
            this.exportCount = data.pageVO.totalRows
            return data
          }
        }
      },
      // 数据组件默认初始化的数据集
      scGridData: {
        dataset: {
          api: {
            name: 'business.getPortraitDetailList' // 自定义 api 接口，并在 created() 函数中实现接口
          }
        },
        width: '100%',
        renderUtil: {
          setTableOptBtn: () => {
            let content = ''
            content += '<a  eno="detail"><span>查看</span>'
            return content
          }
        },
        columns: [
          {
            header: '操作',
            content: '{{:~renderUtil.setTableOptBtn(#data)}}',
            width: 40
          },
          {
            field: 'employeeId',
            header: '工号',
            freezable: false, // 取消对操作列的冻结
            width: 60
          },
          {
            field: 'employeeName',
            header: '姓名',
            // headCss: 'text-center', // 单个样式名称
            width: 50
          },
          {
            field: 'deptAllName',
            header: '部门',
            width: 200
          },
          {
            field: 'jobStatus',
            header: '在职状态',
            // headCss: 'text-center',
            width: 60
          },
          {
            field: 'employeeType',
            header: '人员类别',
            width: 60,
            content: `<span>{{(employeeType=="null"||employeeType==null||employeeType=="NULL")
              ?" ":((employeeType=="OTH"||employeeType=="oth"||employeeType=="EX_OTH")?"外包":"华为")}}</span>`
          },
          {
            field: 'entryAgeLimit',
            header: '服务年限',
            width: 60
          },
          {
            field: 'productDomain',
            header: '产品领域',
            content:
              '<span>{{>(productDomain=="NULL"||productDomain=="null")?"":productDomain}}</span>',
            width: 50
          },
          {
            field: 'itCreditValue',
            header: '信用积分',
            width: 60
          },
          {
            field: 'qualificationStatus',
            header: '资质',
            sortable: false,
            width: 60
          }
        ]
      }
    }
  },
  watch: {
    $route: 'godetails'
  },
  mounted() {
    if (this.$refs['product']) {
      let domainName = this.$route.query.DOMAIN_NAME
      this.$refs['product'].widget.setValue(domainName && domainName.trim())
    }
    let dept = this.$route.query.dept
    if (dept) {
      this.$refs['deptAllName'].widget.setValue(dept)
    }
    let domain = this.$route.query.domain
    if (domain) {
      this.$refs['productDomain'].widget.setValue(domain)
    }
    ;[
      'isKeySysAuth',
      'riskCondition',
      'employeeRoles',
      'employeeId',
      'deptAllName'
    ].forEach(key => {
      if (this.$route.query[key]) {
        this.$refs[key].widget.setValue(this.$route.query[key])
      }
    })

    // IT人员档案详情页点击左侧菜单回到查询页面
    bus.$on('back', () => {
      this.back()
    })
  },
  async created() {
    const employeeId =
      sessionStorage.getItem('cachedEmployeeId') ||
      this.$route.query.cachedEmployeeId
    employeeId && (await this.getCachedUser(employeeId))
  },
  beforeDestroy() {
    sessionStorage.removeItem('cachedEmployeeId')
  },
  methods: {
    async getCachedUser(employeeId) {
      const res = await this.$service.network.post(
        'services/portraitDetail/portraitDetail/page/1/1',
        {
          employeeId
        }
      )
      if (res.data.result.length > 0) {
        this.flag = false
        await this.renderUserDetail(res.data.result[0])
      }
    },

    // 设置用户详情数据
    async renderUserDetail(data) {
      const res = await this.$service.network.post(
        'services/oracleLogin/queryOracleLogin',
        {
          employeeNumber: data.employeeId
        }
      )
      data.oracleLoginCount = res.data.result.cnt || 0
      let keyArr = [
        'perAutorData',
        'workEnvData',
        'workHisData',
        'applyData',
        'ftpData',
        'permDetailData',
        'radarData',
        'basicData'
      ]
      keyArr.forEach(key => {
        this[key] = data
      })
      // magic for  refresh
      this.flag = false
      this.detalflag = true

      // this.$nextTick(() => {
      this.key = 'itPeopleDetails'
      this.key1 = 'permissionDetail'
      // })
    },
    toggleTab(clickedTab) {
      this.pageJumpCache('IT人员档案', '查看权限详情')
      // 点击已展开的Tab时关闭Tab
      this.activeTab === clickedTab &&
        setTimeout(() => {
          this.activeTab = ''
        }, 0)
    },
    godetails(data) {
      if (this.$route.query.Employee_ID && !this.origin) {
        if (data instanceof Array) {
          this.workNo = this.$route.query.Employee_ID
          data.type = 'detail'
          var cData = data[0] ? data[0] : {}
          cData.colorData = {}
          this.renderUserDetail(cData)
          this.pageJumpCache('IT人员档案', '查看IT人员档案详情')
        }
      }
    },
    // 重置
    resetEvent() {
      if (JSON.stringify(this.$route.query) !== '{}') {
        this.$router.push('/itPortraitsOfPeople/itPortraitsOfPeople')
      }

      this.singleConditions.forEach(key => {
        this.$refs[key].widget.setValue('')
      })
      this.doubleConditions.forEach(key => {
        this.$refs[key].widget.setValue('')
        this.$refs[`${key}Select`].widget.setValue('')
      })
      this.queryEvent()
    },
    getFormVal() {
      let params = {}
      if (this.$route.query.isEidMember || this.$route.query.isKeySysAuth) {
        params = {
          canApplyEid: this.$route.query.isEidMember
            ? this.$route.query.isEidMember
            : '',
          isKeySysAuth: this.$route.query.isKeySysAuth
            ? this.$route.query.isKeySysAuth
            : ''
        }
      }else{
        this.singleConditions
          .filter(key => this.$refs[key].widget.getValue().trim())
          .forEach(key => {
            params[key] = this.$refs[key].widget.getValue().trim()
          })

        this.doubleConditions
          .filter(key => this.$refs[key].widget.getValue().trim())
          .forEach(key => {
            params[`${key}Select`] = this.$refs[`${key}Select`].widget.getValue()
            params[key] = this.$refs[key].widget.getValue().trim()
          })
      }
      params.userAccount = this.$service.base.getEnvInfoSync().user.userAccount
      return params
    },
    queryEvent() {
      var params = this.getFormVal()
      this.cachParam = params
      let ages0 = {
        paramData: params
      }
      this.$refs.scGrid.gridWidgetEvent(ages0)
    },
    // 导出
    scDialogBoxAddEvent() {
      this.$refs.scExport.externalOperationsEvent({
        type: 'changeVisible',
        value: false
      })
    },
    exportNew(){
      if (this.exportCount > 50000) {
        this.$haeCommon.topBox({
          content: '无法操作！因导出记录已超出50000条，请输入相应的查询条件筛选后再次导出。',
          style: 'warning',
          closeTime: 4000
        })
        return
      }
      var warningParams = {
        operator: this.$service.base.getEnvInfoSync().user.userAccount,
        module: 'IT人员档案',
        operation: '导出数据',
        rtf:'导出列表数据'
      }
      var param = {
        $service: this.$service,
        args: warningParams
      }
      this.$store.dispatch('pageJumpCache', param)
      this.exportobj = this.getFormVal()
      let url = 'services/asynchronousExport2/itPortraitsOfPeople/export'
      this.$service.network.post(url,this.exportobj).then(res => {
        const excelId = res.data.result
        this.$refs.scExport.externalOperationsEvent({
          type: 'changeVisible',
          value: true,
          excelId: excelId
        })
      })
    },
    // 列表操作响应事件
    optEvent(opt) {
      this.workNo = opt.param.workNo
      // 添加单元格 查看点击事件
      if (opt.type === 'eidApply') {
        this.key = 'itPeopleEidApplyView'
      }
      if (opt.type === 'JobRecord') {
        this.key = 'itPeopleJobRecordsView'
      }
      if (opt.type === 'detail') {
        // 设置信息 跳转页面各个节点的值
        opt.param.colorData = {}
        sessionStorage.setItem('cachedEmployeeId', opt.param.employeeId)
        this.renderUserDetail(opt.param)
        this.pageJumpCache('IT人员档案', '查看IT人员档案详情')
      }
    },
    pageJumpCache(moduleName, operation) {
      var warningParams = {
        operator: this.$service.base.getEnvInfoSync().user.userAccount,
        module: moduleName,
        operation: operation
        // operationTime:new Date().toLocaleString('chinese',{hour12:false}).replace(new RegExp('/',"g"),'-')
      }
      var param = {
        $service: this.$service,
        args: warningParams
      }
      this.$store.dispatch('pageJumpCache', param)
    },
    // 导航栏目首页
    returnToMainPage() {
      this.flag = true
      this.detalflag = false
      sessionStorage.removeItem('cachedEmployeeId')
      this.activeDetailTab = 'qualificationDetailTab'
      if (this.$route.query.Employee_ID) {
        this.origin = true
        let aa = this.$route.path
        this.$router.push(aa)
      }
      if (this.$route.query.DOMAIN_NAME) {
        this.origin = true
        let aa = this.$route.path
        this.$router.push(aa)
      }
      if (this.$route.query.isEidMember || this.$route.query.isKeySysAuth) {
        let iseid = this.$route.query.isEidMember
          ? 'isEidMember=' + this.$route.query.isEidMember
          : ''
        let isKey = this.$route.query.isKeySysAuth
          ? 'isKeySysAuth=' + this.$route.query.isKeySysAuth
          : ''
        let aa = this.$route.path + '?' + iseid + '&' + isKey
        this.$router.go(aa)
      }
    },
    back() {
      this.returnToMainPage()
    },

    colorChange(data) {
      var colorData = {}
      // 基本信息-信息安全违规次数
      const risk = [
        {
          key: '再次信息安全违规风险',
          value: ['basicDataColor1']
        },
        // 基本信息-IT安全违规次数,基本信息-EID申请不合规次数
        {
          key: '再次IT安全违规风险',
          value: ['basicDataColor2']
        },
        // 基本信息-在职状态
        {
          key: '离职人员特权被冒用风险',
          value: ['basicDataColor3']
        },
        // 基本信息-服务年限
        {
          key: '入职年限短',
          value: ['basicDataColor4']
        },
        // 权限审批人-近一年审批人总数
        {
          key: '绕过审批控制',
          value: ['perAutorDataColor1']
        },
        // 详细权限-总账号数，详细权限-APP OWNER数，详细权限-APP MANAGER数，详细权限-ENV OWNER数，详细权限-ENV MANAGER数，
        {
          key: '权限过大-特权账号总量',
          value: ['permDetailDataColor1']
        },
        // 详细权限-拥有关键系统权限
        {
          key: '权限过大-关键系统特权',
          value: ['permDetailDataColor2']
        },
        // 基本信息-人员类别,详细权限-拥有关键系统权限
        {
          key: '权限过大-外包持关键系统特权',
          value: ['basicDataColor5', 'permDetailDataColor3']
        },
        // 申请记录-一年内申请单总数（包含免密登录）
        {
          key: '低频使用特权的运维风险',
          value: ['applyDataColor1']
        },
        // 运维通道登录-一年内登录总次数
        {
          key: '低频生产环境操作风险',
          value: ['workEnvDataColor1']
        },
        // 基本信息-EID特权人员,基本信息-任职级别,
        {
          key: '高技能有钥匙',
          value: ['basicDataColor6']
        }
      ]

      data.forEach(dd => {
        risk.forEach(rr => {
          if (rr.key === dd.riskIndicator && dd.riskIndicatorSum > 0) {
            rr.value.forEach(r => {
              colorData[r] = true
            })
          }
        })
      })

      // 根据风险项修改字段颜色
      this.colorData = colorData
      this.redColor = colorData.basicDataColor4
      this.positionLevelColor = colorData.basicDataColor6
      this.perAutorData.colorData = colorData
      this.workEnvData.colorData = colorData
      this.workHisData.colorData = colorData
      this.applyData.colorData = colorData
      this.ftpData.colorData = colorData
      this.permDetailData.colorData = colorData
      this.basicData.colorData = colorData
    }
  }
}
</script>

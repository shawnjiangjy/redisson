<template>
  <div>
    <scPageContainer style="width: 100%;" v-show="flag" title="应用三切面配置">
      <div style="width: 100%;">
        <div class="condition-group" @keyup.enter="queryEvent">
          <div class="group-items">
            <div>
              <label>APPID</label>
              <aui-input ref="appId" :show-clear-btn="true" place-holder="请输入APPID" class="l" />
            </div>
            <div>
              <label>URL(去参)</label>
              <aui-input ref="excludeParamUrl" :show-clear-btn="true" place-holder="请输入URL(去参)" class="l" />
            </div>
            <div>
              <label>URL(样例)</label>
              <aui-input ref="exampleUrl" :show-clear-btn="true" place-holder="请输入URL(样例)" class="l" />
            </div>
          </div>
        </div>
        <div class="condition-group">
          <div class="group-items">
            <div>
              <label>切面分类</label>
              <aui-dropdown ref="aspectType" :op="aspectTypeOp" class="l" />
            </div>
            <div>
              <label>是否包含业务数据</label>
              <aui-dropdown ref="isIncludeData" :op="isIncludeDataOp" class="l" />
            </div>
            <div>
              <label>是否有效</label>
              <aui-dropdown ref="isValid" :op="isValidOp" class="l" />
            </div>
          </div>
        </div>
        <div class="condition-group">
          <div class="group-items">
            <div>
              <label>数据来源</label>
              <aui-input ref="dataSource" :show-clear-btn="true" place-holder="请输入数据来源" class="l" />
            </div>
            <div>
              <label>更新人</label>
              <aui-user ref="lastUpdatePerson" :op="opForMulti" :show-clear-btn="true" class="l"></aui-user>
            </div>
            <div >
              <label>更新时间</label>
              <aui-datepicker ref="lastUpdateTimeStart" :op="startTimeBeginOp" class="m" />
              <span class="seperator">-</span>
              <aui-datepicker ref="lastUpdateTimeEnd" :op="startTimeEndOp" class="m" />
            </div>
          </div>
        </div>
        <div class="search-btn-group">
          <aui-button
            class="querybtn"
            hue="primary"
            @click="queryEvent"
          >查询</aui-button>
          <aui-button
            class="resetbtn"
            plain="true"
            @click="resetEvent"
          >重置</aui-button>
        </div>
        <div class="search-btn-group1">
          <aui-button
            hue="primary"
            @click="openAddDialog()"
          >新增</aui-button>
          <aui-button
            class="exportbtn resetbtn"
            hue="primary"
            @click="importConfig"
          >导入</aui-button>
          <aui-button
            class="exportbtn resetbtn"
            hue="primary"
            @click="getexportNew"
          >导出</aui-button>
        </div>
        <aui-grid ref="grid" class="ggrid" :op="gridOp"/>
      </div>
      <!--导出-->
      <scExport ref="scExport" :initdata="exportinitData" @scDialogBoxEvent="exportBoxAddEvent"></scExport>
      <aui-dialog-box
      :title="dialogTitle"
      v-model="dialogVisible"
      width="700px"
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
    <!-- 导入 -->
    <scDialogBox
      ref="importScDialogBox"
      :initdata="importDialogBoxInitdata"
      @scDialogBoxEvent="importDialogBoxEvent"
    >
      <div style="margin-bottom: 14px;margin-left: 22%;">
        <label style="margin-right:3px;">导入模板:</label>
        <a :href="mockUrl" download="应用三切面配置-导入">下载导入模板</a>
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
    <input
      id="imFile"
      type="file"
      style="display: none"
      :accept="accpet"
      @change="getFileName(this)"
    />
    </scPageContainer>
  </div>
</template>

<style lang="less" scoped>
.dialogTitle {
    font-size: 16px;
    font-weight: bold;
}

.grid-input {
  text-align: center;
}

.ggrid /deep/ .hae-grid-head {
  position: absolute;
  top: -40px;
  left: 10px;
  button {
    background-color: #1890ff;
    color: white;
    border: 0px;
  }
}

/deep/ .hae-grid-head {
  button {
    background-color: #1890ff;
    color: white;
    border: 0px;
  }
}

.exportbtn {
  margin-left: 10px;
  margin-bottom: 10px;
}

.search-btn-group {
  margin-top: 15px;
  text-align: center;
}

.querybtn {
  margin-right: 10px;
}

.second-btn-group {
  margin-right: 10px;
}

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

.l {
  width: 320px;
}

.m {
  width: 158px;
}

.s {
  width: 80px;
  margin-right: 4px;
}

.condition-group {
  & > div {
    max-width: 1799px;
    margin: 0 auto;
    margin-bottom:10px;
  }

  .group-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    & > div {
      display: flex;
      align-items: center;
      min-width: 406px;
      margin: 10px 0;

      label {
        display: inline-block;
        width: 160px;
        font-size: 14px;
        color: #333;
        text-align: right;
        margin-right: 15px;
      }
    }
  }
}
</style>

<script>
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
  TreeMenu,
  Grid,
  Hae,
  $
} from '@aurora/ui'
import { Message } from 'element-ui'
import Vue from 'vue'
import { Modal } from '@aurora/vue'
import urlList from '../../store/api/urlList.js'
import StringUtil from '../../utils/stringUtil'
import { createdTip } from '@/assets/js/public.js'
import EditFundSystemAspectConfig from './EditFundSystemAspectConfig'
var XLSX = require('xlsx')

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
    AuiDatepicker: Datepicker,
    AuiDialogBox: DialogBox,
    AuiDept: Dept,
    AuiTreeMenu:TreeMenu,
    AuiGrid: Grid,
    EditFundSystemAspectConfig
  },
  data() {
    let vue = this
    return {
      configOption: {
        '用户面': '0',
        '管理面': '1',
        '集成面': '2',
        '是': 'Y',
        '否': 'N'
      },
      imFile: '',
      accpet: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
      application/vnd.ms-excel, application/vnd.ms-excel.sheet.macroEnabled.12`,
      mockUrl: this.ajaxurl + 'static/fundSystemAspectConfig.xlsm',
      showUpload: true,
      importDialogBoxInitdata: {
        title: '',
        visible: false
      },
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
      },
      tempItem: {},
      exportCount: 0,
      dialogTitle: '',
      dialogContent: '',
      dialogVisible: false,
      visible5: false,
      visible4: false,
      isIncludeData: {
        textField: 'valueDes',
        valueField: 'value',
        dataset: {
          api: {
            url: 'services/selectOptionConfig/getConfig',
            params: {
              params: {
                module: 'FundSystemAspectConfig',
                subModule: 'isIncludeData'
              }
            },
            resDataProLogic: data => {
              return data
            }
          }
        }
      },
      aspectTypeOp: {
        multi: true,
        textField: 'valueDes',
        valueField: 'value',
        dataset: {
          api: {
            url: 'services/selectOptionConfig/getConfig',
            params: {
              params: {
                module: 'FundSystemAspectConfig',
                subModule: 'aspectType'
              }
            },
            resDataProLogic: data => {
              return data
            }
          }
        }
      },
      isIncludeDataOp: {
        textField: 'valueDes',
        valueField: 'value',
        dataset: {
          api: {
            url: 'services/selectOptionConfig/getConfig',
            params: {
              params: {
                module: 'FundSystemAspectConfig',
                subModule: 'isIncludeData'
              }
            },
            resDataProLogic: data => {
              return data
            }
          }
        }
      },
      isValidOp: {
        textField: 'valueDes',
        valueField: 'value',
        dataset: {
          api: {
            url: 'services/selectOptionConfig/getConfig',
            params: {
              params: {
                module: 'FundSystemAspectConfig',
                subModule: 'isValid'
              }
            },
            resDataProLogic: data => {
              return data
            }
          }
        }
      },
      exportinitData: {
        visible: false,
        saveEventClose: false
      },
      startTimeEndOp: {
        showClearBtn: false,
        id: 'start_time',
        dateFormat: 'yyyy-MM-dd'
      },
      startTimeBeginOp: {
        showClearBtn: false,
        cascadeDom: '#start_time',
        dateFormat: 'yyyy-MM-dd'
      },
      gridOp: {
        remoteSort: true,
        maxHeight: 455,
        editMode: true,
        showSeq: false,
        dataset: {
          api: {
            name: 'business.findFundsAspectConfPageList'
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
        showTipOverflow: true,
        columns: [
          {
            header: '操作',
            editable: false,
            sortable:false,
            width: 120,
            content: '{{:~renderUtil.setTableOptBtn(#data)}}'
          },
          {
            sortable:false,
            content: '{{~renderUtil.nullFilter(excludeParamUrl)}}',
            header: 'URL(去参)',
            editable: false,
            width: 180,
            field: 'excludeParamUrl'
          },
          {
            header: 'URL(样例)',
            sortable:false,
            width: 180,
            content: '{{~renderUtil.nullFilter(exampleUrl)}}',
            editable: false,
            field: 'exampleUrl'
          },
          {
            header: 'APPID',
            sortable:false,
            width: 150,
            content: '{{~renderUtil.nullFilter(appId)}}',
            editable: false,
            type: 'Input',
            field: 'appId'
          },
          {
            header: '切面类型',
            sortable:false,
            width: 140,
            content: '{{~renderUtil.nullFilter(aspectType)}}',
            editable: false,
            field: 'aspectType'
          },
          {
            header: '是否包含业务数据',
            sortable:false,
            width: 140,
            content: '{{~renderUtil.nullFilter(isIncludeData)}}',
            editable: false,
            field: 'isIncludeData'
          },
          {
            header: '是否有效',
            sortable:false,
            width: 140,
            content: '{{~renderUtil.nullFilter(isValid)}}',
            editable: false,
            field: 'isValid'
          },
          {
            header: '数据来源',
            sortable:false,
            width: 140,
            content: '{{~renderUtil.nullFilter(dataSource)}}',
            editable: false,
            field: 'dataSource'
          },
          {
            header: '更新人',
            sortable:false,
            width: 140,
            field: 'lastUpdatePerson',
            editable: false,
            content: '{{~renderUtil.nullFilter(lastUpdatePerson)}}'
          },
          {
            header: '更新时间',
            sortable:false,
            width: 140,
            field: 'lastUpdateTime',
            editable: false,
            content: '{{~renderUtil.nullFilter(lastUpdateTime)}}'
          }
        ],
        renderUtil: {
          nullFilter (data) {
            return StringUtil.convertNull(data)
          },
          setTableOptBtn: data => {
            return '<a eno="deleteItem">删除</a>&nbsp&nbsp<a eno="editItem">编辑</a>'
          },

          setConditionBtn: data => {
            return '<a eno="doConditionConfig">配置</a>'
          }
        },
        onComplete: (grid) => {
          grid.setEvent('deleteItem', (target, grid) => {
            const rowData = grid.getRowData(grid.getCellRow(target))
            this.openDeleteDialog(rowData)
          })
          grid.setEvent('editItem', (target, grid) => {
            const rowData = grid.getRowData(grid.getCellRow(target))
            this.openEditDialog(rowData)
          })
        }
      },
      opForMulti: {
        placeHolder: '请输入工号',
        valueField: 'employeeNumber',
        isdetail: true
      },
      singleConditions: [
        'appId',
        'excludeParamUrl',
        'exampleUrl',
        'isIncludeData',
        'aspectType',
        'dataSource',
        'isValid',
        'lastUpdatePerson',
        'lastUpdateTimeStart',
        'lastUpdateTimeEnd'
      ],
      flag: true
    }
  },
  created() {
    this.$service.business.findFundsAspectConfPageList = args => {
      let sortColumn = args.pageVO.orderBy
      let param = this.getFormVal()
      param.sortColumn = sortColumn
      return new Promise((resolve) => {
        this.$service.network
          .post(
            `services/fundsSystemAspectConfig/findFundsAspectConfPageList/page/${args.pageVO.pageSize}/${args.pageVO.curPage}`,
            param
          )
          .then(res => {
            this.exportCount = res.data.pageVO.totalRows
            resolve(res.data)
          })
      })
    }
  },
  mounted() {
    this.imFile = document.getElementById('imFile')
  },
  methods: {
    dealFile: function(data) {
      // 先根据工号查一遍，如果查出来工号则提示一下，如果点击确认，则提交到后台做数据更新
      this.imFile.value = ''
      this.fullscreenLoading = false
      if (data.length <= 0) {
        this.errorDialog = true
        this.errorMsg = '请导入正确信息'
      } else {
        this.excelData = data
        var args = data
        let doImport = true
        if (doImport) {
          return new Promise((resolve, reject) => {
            this.$service.network
              .post('services/fundsSystemAspectConfig/importFundsSystemAspect', args)
              .then(data => {
                if (data && data.data && data.data.state) {
                  this.$haeCommon.topBox({
                    content: '导入成功！',
                    style: 'successful',
                    closeTime: 1000
                  })
                  this.queryEvent()
                } else {
                  this.$haeCommon.topBox({
                    content: '导入失败！',
                    style: 'error',
                    closeTime: 1000
                  })
                }
                resolve(data.result)
              })
              .catch(reject)
          })
        }
      }
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
    uploadFile: function() {
      this.imFile.click()
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
    newFunction(key, appId, da, aspectType, isIncludeData, isValid, dataSource) {
      if (key.indexOf('APPID') != -1) {
        appId = da[key]
      }
      if (key.indexOf('切面类型') != -1) {
        aspectType = this.configOption[da[key]]
      }
      if (key.indexOf('是否包含业务数据') != -1) {
        isIncludeData = this.configOption[da[key]]
      }
      if (key.indexOf('是否有效') != -1) {
        isValid = this.configOption[da[key]]
      }
      if (key.indexOf('数据来源') != -1) {
        dataSource = da[key]
      }
      return { aspectType, isIncludeData, isValid, appId, dataSource}
    },
    analyzeData: function(data) {
      if (data.length === 0) {
        this.topBox('请填写完必填信息之后再导入', 3000, 'error')
      }
      // 此处可以解析导入数据
      var imports = []
      for (let da of data) {
        let excludeParamUrl = '',
          exampleUrl = '',
          aspectType = '',
          isIncludeData = '',
          isValid = '',
          dataSource = '',
          appId = ''
        Object.keys(da).forEach(key=>{
          if (key.indexOf('URL(去参)') != -1) {
            if (da[key].trim() == '') {
              this.topBox('URL（去参）必填', 3000, 'error')
              return
            }
            excludeParamUrl = da[key]
          }
          if (key.indexOf('URL(样例)') != -1) {
            if (da[key].trim() == '') {
              this.topBox('URL（样例）必填', 3000, 'error')
              return
            }
            exampleUrl = da[key]
          }
          if (key.indexOf('切面类型') != -1) {
            if (da[key].trim() == '') {
              this.topBox('切面类型必填', 3000, 'error')
              return
            }
            aspectType = da[key]
          }
          if (key.indexOf('是否包含业务数据') != -1) {
            if (da[key].trim() == '') {
              this.topBox('是否包含业务数据必填', 3000, 'error')
              return
            }
            isIncludeData = da[key]
          }
          if (key.indexOf('是否有效') != -1) {
            if (da[key].trim() == '') {
              this.topBox('是否有效必填', 3000, 'error')
              return
            }
            isValid = da[key]
          }
          ;({ aspectType, isIncludeData, isValid, appId, dataSource } = this.newFunction(
            key,
            appId,
            da,
            aspectType,
            isIncludeData,
            isValid,
            dataSource
          ))
        })
        var importObj = {
          appId: appId,
          exampleUrl: exampleUrl,
          excludeParamUrl: excludeParamUrl,
          aspectType: aspectType,
          isIncludeData: isIncludeData,
          isValid: isValid,
          dataSource: dataSource,
          createPerson:this.$service.base.getEnvInfoSync().user.employeeNumber.toUpperCase(),
          lastUpdatePerson:this.$service.base.getEnvInfoSync().user.employeeNumber.toUpperCase()
        }
        imports.push(importObj)
      }
      // 解析为后台对应的实体对象
      return imports
    },
    async onOperationDone () {
      this.$refs.grid.widget.search()
      this.closeDialog()
    },
    closeDialog () {
      this.dialogVisible = false
      this.dialogContent = ''
    },
    // 导入框显示
    importConfig: function() {
      this.$refs.importScDialogBox.externalOperationsEvent({
        class: 'importPop',
        type: 'changeVisible',
        title: '应用三切面配置导入',
        width: '50',
        value: true
      })
      setTimeout(() => {
        this.reSelect()
      })
    },
    importDialogBoxEvent(opt) {
      if (opt.type === 'saveEvent') {
        this.importFile(this.file)
      }
      if (opt.type === 'closeEvent') {
        this.showUpload = false
      }
    },
    openAddDialog () {
      this.tempItem = ''
      this.dialogTitle = '新增配置'
      this.dialogVisible = true
      this.dialogContent = 'EditFundSystemAspectConfig'
    },
    openEditDialog (data) {
      this.tempItem = data
      this.dialogTitle = '编辑配置'
      this.dialogVisible = true
      this.dialogContent = 'EditFundSystemAspectConfig'
    },
    // 导出
    exportBoxAddEvent() {
      this.$refs.scExport.externalOperationsEvent({
        type: 'changeVisible',
        value: false
      })
    },
    getexportNew() {
      if (this.exportCount > 50000) {
        this.$haeCommon.topBox({
          content: '无法操作！因导出记录已超出50000条，请输入相应的查询条件筛选后再次导出。',
          style: 'warning',
          closeTime: 4000
        })
        return
      }
      if (this.exportCount == 0) {
        this.$haeCommon.topBox({
          content: '无法操作！没有可以导出的数据。',
          style: 'warning',
          closeTime: 4000
        })
        return
      }
      this.exportobj = this.getFormVal()
      this.$service.network
        .post('services/asynchronousExport2/fundsSystemAspectConfig/export', this.exportobj)
        .then(res => {
          const excelId = res.data.result
          this.$refs.scExport.externalOperationsEvent({
            type: 'changeVisible',
            value: true,
            excelId: excelId
          })
        })
    },
    deleteItem (excludeParamUrl) {
      this.$service.network
        .post('services/fundsSystemAspectConfig/deleteItem', {
          excludeParamUrl:excludeParamUrl
        })
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
    editItem (excludeParamUrl) {
      this.$service.network
        .post('services/fundsSystemAspectConfig/editItem', {
          excludeParamUrl:excludeParamUrl
        })
        .then(res => {
          if (res.status === 200) {
            this.$haeCommon.topBox({
              content: '修改成功',
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
    openDeleteDialog ({ excludeParamUrl }) {
      this.$haeCommon.alert({
        title: '请确认',
        content: '确认删除吗?',
        fun: bool => {
          bool && this.deleteItem(excludeParamUrl)
        }
      })
    },
    // 重置
    resetEvent() {
      this.singleConditions.forEach(key => {
        this.$refs[key].widget.setValue('')
      })
      this.queryEvent()
    },
    getFormVal() {
      let params = {}
      this.singleConditions
        .filter(key => this.$refs[key].widget.getValue().trim())
        .forEach(key => {
          params[key] = this.$refs[key].widget.getValue().trim()
        })
      if (params['lastUpdateTimeStart']) {
        params['lastUpdateTimeStart'] =
        params['lastUpdateTimeStart'].split(' ')[0] + ' 00:00:00'
      }
      if (params['lastUpdateTimeEnd']) {
        params['lastUpdateTimeEnd'] =
        params['lastUpdateTimeEnd'].split(' ')[0] + ' 23:59:59'
      }
      return params
    },
    queryEvent() {
      this.$refs.grid.widget.search()
    }
  }
}
</script>

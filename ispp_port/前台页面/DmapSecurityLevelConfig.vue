<template>
  <div>
    <scPageContainer style="width: 100%;" v-show="flag" title="DMAP字段密级配置">
      <div style="width: 100%;">
        <div class="condition-group" @keyup.enter="queryEvent">
          <div class="group-items">
            <div>
              <label>APPID</label>
              <aui-input ref="appId" :show-clear-btn="true" place-holder="请输入APPID" class="l" />
            </div>
            <div>
              <label>表名</label>
              <aui-input ref="tableName" :show-clear-btn="true" place-holder="请输入表名" class="l" />
            </div>
            <div>
              <label>字段名</label>
              <aui-input ref="columnName" :show-clear-btn="true" place-holder="请输入字段名" class="l" />
            </div>
          </div>
        </div>
        <div class="condition-group">
          <div class="group-items">
            <div>
              <label>隐私级别</label>
              <aui-dropdown ref="privacyLevel" :op="privacyLevelOp" class="l" />
            </div>
            <div>
              <label>密级</label>
              <aui-dropdown ref="securityLevel" :op="securityLevelOp" class="l" />
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
              <label>更新人</label>
              <aui-user ref="lastUpdatePerson" :op="opForMulti" :show-clear-btn="true" class="l"></aui-user>
            </div>
            <div>
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
      width="660px"
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
        <a :href="mockUrl" download="DMAP字段密级配置-导入">下载导入模板</a>
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
import EditAlbConfig from './EditAlbConfig'
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
    EditAlbConfig
  },
  data() {
    let vue = this
    return {
      imFile: '',
      accpet: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
      application/vnd.ms-excel, application/vnd.ms-excel.sheet.macroEnabled.12`,
      mockUrl: this.ajaxurl + 'static/dmapConfig.xlsm',
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
      exportinitData: {
        visible: false,
        saveEventClose: false
      },
      privacyLevelOp: {
        multi: true,
        textField: 'value',
        valueField: 'value',
        alwaysLoad: true,
        dataset: {
          api: {
            url: 'services/selectOptionConfig/getConfig',
            params: {
              params: {
                module: 'DmapSecurityLevelConfig',
                subModule: 'privacyLevel'
              }
            },
            resDataProLogic: data => {
              return data
            }
          }
        }
      },
      securityLevelOp: {
        multi: true,
        textField: 'valueDes',
        valueField: 'value',
        alwaysLoad: true,
        dataset: {
          api: {
            url: 'services/selectOptionConfig/getConfig',
            params: {
              params: {
                module: 'DmapSecurityLevelConfig',
                subModule: 'securityLevel'
              }
            },
            resDataProLogic: data => {
              return data
            }
          }
        }
      },
      isValidOp: {
        multi: true,
        textField: 'text',
        valueField: 'value',
        dataset: {
          value: [
            {
              text: '是',
              value: '是'
            },
            {
              text: '否',
              value: '否'
            }
          ]
        }
      },
      startTimeEndOp: {
        showClearBtn: false,
        id: 'start_time',
        dateFormat: 'yyyy-MM-dd hh:mm:ss'
      },
      startTimeBeginOp: {
        showClearBtn: false,
        cascadeDom: '#start_time',
        dateFormat: 'yyyy-MM-dd hh:mm:ss'
      },
      gridOp: {
        remoteSort: true,
        maxHeight: 455,
        editMode: true,
        showSeq: false,
        dataset: {
          api: {
            name: 'business.findAlbConfPageList'
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
            width: 70,
            content: '{{:~renderUtil.setTableOptBtn(#data)}}'
          },
          {
            header: 'APPID',
            sortable:false,
            width: 180,
            content: '{{~renderUtil.nullFilter(appId)}}',
            editable: false,
            type: 'Input',
            field: 'appId'
          },
          {
            sortable:false,
            content: '{{~renderUtil.nullFilter(tableName)}}',
            header: '表名',
            editable: false,
            width: 180,
            field: 'tableName'
          },
          {
            header: '字段名',
            sortable:false,
            width: 180,
            content: '{{~renderUtil.nullFilter(columnName)}}',
            editable: false,
            field: 'columnName'
          },
          {
            header: '字段定义',
            sortable:false,
            width: 140,
            content: '{{~renderUtil.nullFilter(columnComments)}}',
            editable: false,
            field: 'columnComments'
          },
          {
            header: '数据库名',
            sortable:false,
            width: 140,
            content: '{{~renderUtil.nullFilter(dataBaseName)}}',
            editable: false,
            field: 'dataBaseName'
          },
          {
            header: '资产类型',
            sortable:false,
            width: 130,
            field: 'keyAssets',
            editable: false,
            content: '{{~renderUtil.nullFilter(keyAssets)}}'
          },
          {
            header: 'label',
            sortable:false,
            width: 130,
            field: 'label',
            editable: false,
            content: '{{~renderUtil.nullFilter(label)}}'
          },
          {
            header: '模块名称',
            sortable:false,
            width: 130,
            field: 'moduleName',
            editable: false,
            content: '{{~renderUtil.nullFilter(moduleName)}}'
          },
          {
            header: '隐私分类',
            sortable:false,
            width: 130,
            field: 'privacyClassify',
            editable: false,
            content: '{{~renderUtil.nullFilter(privacyClassify)}}'
          },
          {
            header: '隐私级别',
            sortable:false,
            width: 130,
            field: 'privacyLevel',
            editable: false,
            content: '{{~renderUtil.nullFilter(privacyLevel)}}'
          },
          {
            header: '密级',
            sortable:false,
            width: 120,
            field: 'securityLevel',
            editable: false,
            content: '{{~renderUtil.nullFilter(securityLevel)}}'
          },
          {
            header: '是否生效',
            sortable:false,
            width: 100,
            field: 'isValid',
            editable: false,
            content: '{{~renderUtil.nullFilter(isValid)}}'
          },
          {
            header: '更新人',
            sortable:false,
            width: 120,
            field: 'lastUpdatePerson',
            editable: false,
            content: '{{~renderUtil.nullFilter(lastUpdatePerson)}}'
          },
          {
            header: '更新时间',
            sortable:false,
            width: 130,
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
            return '<a eno="deleteItem">删除</a>'
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
        'tableName',
        'columnName',
        'privacyLevel',
        'securityLevel',
        'isValid',
        'lastUpdatePerson',
        'lastUpdateTimeStart',
        'lastUpdateTimeEnd'
      ],
      flag: true
    }
  },
  created() {
    this.$service.business.findAlbConfPageList = args => {
      let sortColumn = args.pageVO.orderBy
      let param = this.getFormVal()
      param.sortColumn = sortColumn
      return new Promise((resolve) => {
        this.$service.network
          .post(
            `services/dmapSecurityLevelConfig/findDmapClassificationConfPageList/page/${args.pageVO.pageSize}/${args.pageVO.curPage}`,
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
              .post('services/dmapSecurityLevelConfig/importDmapConf', args)
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
                    content: data.data.message,
                    style: 'error',
                    closeTime: 3000
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
    newFunction(key, da, columnComments, keyAssets, label, moduleName, privacyClassify, privacyLevel, securityLevel) {
      if (key.indexOf('字段定义') != -1) {
        columnComments = da[key]
      }
      if (key.indexOf('资产类型') != -1) {
        keyAssets = da[key]
      }
      if (key.indexOf('Label') != -1) {
        label = da[key]
      }
      if (key.indexOf('模块名称') != -1) {
        moduleName = da[key]
      }
      if (key.indexOf('隐私分类') != -1) {
        privacyClassify = da[key]
      }
      if (key.indexOf('隐私级别') != -1) {
        privacyLevel = da[key]
      }
      if (key.indexOf('密级') != -1) {
        securityLevel = da[key]
      }
      return { columnComments, keyAssets, label, moduleName, privacyClassify, privacyLevel, securityLevel}
    },
    analyzeData: function(data) {
      if (data.length === 0) {
        this.topBox('请填写完必填信息之后再导入', 3000, 'error')
      }
      // 此处可以解析导入数据
      var imports = []
      for (let da of data) {
        let appId = '',
          tableName = '',
          columnName = '',
          columnComments = '',
          dataBaseName = '',
          keyAssets = '',
          label = '',
          isValid = '',
          moduleName = '',
          privacyClassify = '',
          privacyLevel = '',
          securityLevel = ''
        Object.keys(da).forEach(key=>{
          if (key.indexOf('APPID') != -1) {
            if (da[key].trim() == '') {
              this.topBox('APPID必填', 3000, 'error')
              return
            }
            appId = da[key]
          }
          if (key.indexOf('表名') != -1) {
            if (da[key].trim() == '') {
              this.topBox('表名必填', 3000, 'error')
              return
            }
            tableName = da[key]
          }
          if (key.indexOf('字段名') != -1) {
            if (da[key].trim() == '') {
              this.topBox('字段名必填', 3000, 'error')
              return
            }
            columnName = da[key]
          }
          if (key.indexOf('数据库名') != -1) {
            if (da[key].trim() == '') {
              this.topBox('数据库名必填', 3000, 'error')
              return
            }
            dataBaseName = da[key]
          }
          if (key.indexOf('是否有效') != -1) {
            if (da[key].trim() == '') {
              this.topBox('是否有效必填', 3000, 'error')
              return
            }
            isValid = da[key]
          }
          ;({ columnComments, keyAssets, label, moduleName, privacyClassify, privacyLevel, securityLevel } = this.newFunction(
            key,
            da,
            columnComments,
            keyAssets,
            label,
            moduleName,
            privacyClassify,
            privacyLevel,
            securityLevel
          ))
        })
        var importObj = {
          appId: appId,
          tableName: tableName,
          columnName: columnName,
          columnComments: columnComments,
          dataBaseName: dataBaseName,
          isValid: isValid,
          keyAssets: keyAssets,
          label: label,
          privacyClassify: privacyClassify,
          privacyLevel: privacyLevel,
          moduleName: moduleName,
          securityLevel: securityLevel,
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
        title: 'DMAP字段密级配置导入',
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
      this.dialogContent = 'EditAlbConfig'
    },
    openEditDialog (data) {
      this.tempItem = data
      this.dialogTitle = '编辑配置'
      this.dialogVisible = true
      this.dialogContent = 'EditAlbConfig'
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
        .post('services/asynchronousExport2/dmapConfig/export', this.exportobj)
        .then(res => {
          const excelId = res.data.result
          this.$refs.scExport.externalOperationsEvent({
            type: 'changeVisible',
            value: true,
            excelId: excelId
          })
        })
    },
    deleteItem (id) {
      this.$service.network
        .post('services/dmapSecurityLevelConfig/deleteItem', {
          id:id
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
    openDeleteDialog ({ id }) {
      this.$haeCommon.alert({
        title: '请确认',
        content: '确认删除吗?',
        fun: bool => {
          bool && this.deleteItem(id)
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
      return params
    },
    queryEvent() {
      this.$refs.grid.widget.search()
    }
  }
}
</script>

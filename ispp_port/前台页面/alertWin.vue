//表格不包括分页
<template>
  <div class="itPeopleAlertWinClass">
    <aui-dialog-box
      v-model="dialogView"
      :dragable="true"
      :modal-closable="false"
      :esc-closeable="false"
      width="80%"
      height="650px"
    >
      <div>
        <div class="title" style="line-height:22px">
          {{ title }}
          <i v-if="showCloseIcon" class="hae-icon icon-close close" @click="backBtn" />
        </div>
        <aui-grid
          v-if="scShow && bonusPoint !== '12'"
          ref="grid"
          :op="scGridData"
          class="gridClass"
        ></aui-grid>
        <aui-pager v-if="scShow && bonusPoint !== '12'" ref="pagerRef" :op="opForNumber"></aui-pager>
        <div class="foot">
          <aui-button @click="backBtn">返回</aui-button>
        </div>
      </div>
    </aui-dialog-box>
  </div>
</template>

<script>
import {
  Panel,
  Button,
  DialogBox,
  Pager,
  Grid,
  Row,
  Col
} from '@aurora/ui'
//
export default {
  components: {
    AuiPager: Pager,
    AuiButton: Button,
    AuiGrid: Grid,
    AuiDialogBox: DialogBox,
    AuiRow: Row,
    AuiCol: Col,
    AuiPanel: Panel
  },
  props: {
    viewName: {
      type: String
    },
    bonusPoint: {
      type: String
    },
    firstDayPass: {
      type: String
    }
  },
  data() {
    const _this = this
    return {
      formItem: {
        appId: '',
        product: '',
        roleName: ''
      },
      employeeNumber: '',
      gridData: {},
      scShow: true,
      flag: true,
      dialogView: false,
      gridPageSize: 10,
      girdTotalPages: 10,
      girdCurPage: 1,
      girdTotalRows: 10,
      title: '',
      alertUrl: '',
      list: [],
      // time: null,
      valList: [],
      scGridData: {
        height: '200px',
        dataset: {
          api: {
            name: '' // 自定义 api 接口，并在 created() 函数中实现接口
          }
        },
        columns: [],
        renderUtil: {}
      },
      opForNumber: {
        // mode: 'simple',
        pageSizes: [10, 30, 100],
        pageVO: {
          pageSize: 10,
          curPage: 3,
          totalRows: 10
        },
        modeOp: {
          btnNum: 4
        },
        onPageChanged: function(pageVO) {
          _this.gridPageSize = pageVO.pageSize
          _this.girdTotalPages = pageVO.totalPages
          _this.girdCurPage = pageVO.curPage
          _this.girdTotalRows = pageVO.totalRows
          _this.callAlertWin(_this.gridData)
        }
      },
      panelOp: {
        expand: true,
        head: '扣分规则'
      }
    }
  },
  computed: {
    showCloseIcon() {
      return 'IT安全违规次数,信息安全违规次数,EID申请不合规次数,信用积分'.includes(
        this.title
      )
    }
  },
  methods: {
    queryEvent() {
      this.$refs.grid.widget.search({
        ...this.formItem,
        ...this.employeeNumber
      })
    },
    resetEvent() {
      Object.keys(this.formItem).forEach(key => {
        this.formItem[key] = ''
      })
      this.queryEvent()
    },
    // 查询
    callGridPost(type, param) {
      const _that = this
      this.$service.business[type] = () => {
        let data = [{}]
        let gridPage = {}
        let url = `${_that.alertUrl}${_that.gridPageSize}/${_that.girdCurPage}`

        // 关键系统权限查询
        if (_that.title === '关键系统权限') {
          return new Promise((resolve, reject) => {
            this.$service.network
              .post(url, {
                employeeNumber: _that.employeeNumber,
                ..._that.formItem
              })
              .then(response => {
                data = response.data.result
                // 设置表格分页
                gridPage = {
                  pageSizes: [10, 30, 100],
                  pageVO: response.data.pageVO
                }
                _that.$refs.pagerRef.widget.reInit(gridPage)
                _that.$refs.pagerRef.widget.getOption()
                resolve(data)
              })
              .catch(reject)
          })
        }

        return new Promise((resolve, reject) => {
          this.$service.network
            .post(url, param)
            .then(response => {
              data = response.data.result
              // 设置表格分页
              gridPage = {
                pageSizes: [10, 30, 100],
                pageVO: response.data.pageVO
              }
              _that.$refs.pagerRef.widget.reInit(gridPage)
              _that.$refs.pagerRef.widget.getOption()
              resolve(data)
            })
            .catch(reject)
        })
      }
    },
    callGridGet(type, param) {
      const _that = this
      this.$service.business[type] = () => {
        let data = [{}]
        let gridPage = {}
        let url = `${_that.alertUrl}${_that.gridPageSize}/${
          _that.girdCurPage
        }?params=${encodeURIComponent(JSON.stringify(param))}`
        let _data = {
          cache: false
        }
        return new Promise((resolve, reject) => {
          this.$service.network
            .get(url, _data)
            .then(response => {
              data = response.data.result
              // 设置表格分页
              gridPage = {
                pageSizes: [10, 30, 100],
                pageVO: response.data.pageVO
              }
              _that.$refs.pagerRef.widget.reInit(gridPage)
              _that.$refs.pagerRef.widget.getOption()
              resolve(data)
            })
            .catch(reject)
        })
      }
    },
    callAlertWin(data) {
      this.gridData = data
      // 设置表格
      this.title = data.title
      this.scGridData.columns = data.list

      this.scGridData.dataset['api'].name =
        'business.' + data.ajaxData['urlType']
      this.alertUrl = data.ajaxData['url']
      this.scShow = false
      this.$nextTick(() => {
        this.scShow = true
      })
      let param = data.param
      this.valList = data.valList
      this.dialogView = true
      // 增加操作记录
      if (data.ajaxData['methods'] === 'post') {
        // 关键系统权限  employeeNumber
        if (this.title === '关键系统权限') {
          this.employeeNumber = param.employeeNumber
        }
        this.callGridPost(data.ajaxData['urlType'], param)
      } else {
        this.callGridGet(data.ajaxData['urlType'], param)
      }
    },
    pageJumpCache(moduleName, operation) {
      let warningParams = {
        operator: this.$service.base.getEnvInfoSync().user.userAccount,
        module: moduleName,
        operation: operation
      }
      let param = {
        $service: this.$service,
        args: warningParams
      }
      this.$store.dispatch('pageJumpCache', param).then(data => {
        data.data
      })
    },
    // 返回
    backBtn() {
      clearInterval(this.time)
      this.dialogView = false
    }
  }
}
</script>

<style lang="less" scoped>
.close {
  float: right;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: scale(1.2);
    color: #1890ff;
  }
}

.text-middle {
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
}

.case-link {
  position: absolute;
  left: 78px;
  top: 13px;
  z-index: 100;
}

.coziestTip {
  height: 120px;
  line-height: 120px;
  font-size: 18px;
  font-weight: bolder;
  text-align: center;
}

.deductionsTip {
  padding-left: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
}

.headerTip {
  font-size: 12px;
  font-weight: bold;
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
  border-bottom: 1px solid #ccc;
}

.itPeopleAlertWinClass {
  // /deep/.hae-hide, .hae-i18n{
  //     display: block!important;
  // }
  /deep/.hae-dialog__header {
    display: none;
  }

  .gridClass {
    z-index: 100;
    border: 1px solid #d8d8d8;

    /deep/ .hae-grid-head {
      display: none;
    }
  }

  .title {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .table {
    border: 1px solid #d8d8d8;

    .header {
      display: flex;
      height: 40px;
      line-height: 40px;
      background: #d8d8d8;

      .header-item {
        text-align: center;
        flex: 1;
        width: 100px;
        display: inline-block;
      }
    }

    .body {
      display: flex;
      height: 150px;
      line-height: 40px;
      overflow-y: auto;
      flex-direction: column;

      .body-item {
        display: flex;

        .list-item {
          text-align: center;
          flex: 1;
          // width: 103px;
          display: inline-block;
        }
      }
    }
  }

  .pager {
    margin-top: 20px;

    /deep/.icon-default:before {
      content: '\E63C' !important;
    }
  }

  .foot {
    text-align: center;
    margin-top: 30px;
  }
}
</style>

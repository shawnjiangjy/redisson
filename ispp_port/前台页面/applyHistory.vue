<template>
  <div class="applyHistoryContent">
    <div class="page-container-style">
      <el-card style="padding:10px 20px 0">
        <div slot="header" @click="hideBody" class="headstyle">
          <span class="hae-icon" :class="!basicShow ? 'icon-triangle-down' : 'icon-chevron-right'"></span>
          <span class="header-size">申请记录</span>
        </div>
        <div class="body" v-show="!basicShow" style="padding-bottom:20px;">
          <aui-row>
            <aui-col
              :span="6"
              :flex="true"
              class="row-bg"
              justify-content="space-between"
              style="padding-right: 0"
            >
              <aui-row :flex="false" class="row-bg">
                <div class="title">
                  <label class="titleSize">EID申请</label>
                  <div>
                    <label class="v_colText">首单申请时间 :</label>
                    <label class="v_text">
                      {{
                      applyData.firstEidDate == 'NULL' ||
                      applyData.firstEidDate == null ||
                      applyData.firstEidDate == 'null' ||
                      applyData.firstEidDate == ''
                      ? ''
                      :applyData.firstEidDate
                      }}
                    </label>
                  </div>
                </div>
              </aui-row>

              <ul style="border-right: transparent">
                <li>
                  <label class="v-textTwo">一年内申请单总数（包含免密登录）</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidCount >0
                    ?applyData.eidCount
                    : 0
                    }}
                  </label>
                </li>
                <li>
                  <label class="v-textTwo">以变更单申请总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidCountByChange >0
                    ?applyData.eidCountByChange
                    : 0
                    }}
                  </label>
                </li>
                <li>
                  <label class="v-textTwo">以事件单申请总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidCountByEvent >0
                    ?applyData.eidCountByEvent
                    : 0
                    }}
                  </label>
                </li>
                <li>
                  <label class="v-textTwo">以问题单申请总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidCountByProblem >0
                    ?applyData.eidCountByProblem
                    : 0
                    }}
                  </label>
                </li>
                <li>
                  <label class="v-textTwo">以例行工作单申请总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidCountByWork >0
                    ?applyData.eidCountByWork
                    : 0
                    }}
                  </label>
                </li>
              </ul>
            </aui-col>

            <aui-col
              :span="6"
              :flex="true"
              class="row-bg"
              justify-content="space-between"
              style="padding-left: 0"
            >
              <aui-row :flex="false" class="row-bg">
                <div class="title">
                  &nbsp;
                  <div>
                    <label class="v_colText">最后申请时间 :</label>
                    <label class="v_text alertwin" @click="alertWin('detail')">
                      {{
                      applyData.lastEidDate == 'NULL' ||
                      applyData.lastEidDate == null ||
                      applyData.lastEidDate == 'null' ||
                      applyData.lastEidDate == ''
                      ? ''
                      :applyData.lastEidDate
                      }}
                    </label>
                  </div>
                </div>
              </aui-row>
              <ul style="border-left: transparent">
                <li>
                  <label class="v-textTwo">一年内申请账号总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidAccCount >0
                    ?applyData.eidAccCount
                    : 0
                    }}
                  </label>
                </li>
                <li>
                  <label class="v-textTwo">以变更单申请账号总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidEopsAccCount >0
                    ?applyData.eidEopsAccCount
                    : 0
                    }}
                  </label>
                </li>
                <li>
                  <label class="v-textTwo">以事件单申请账号总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidInciAccCount >0
                    ?applyData.eidInciAccCount
                    : 0
                    }}
                  </label>
                </li>
                <li>
                  <label class="v-textTwo">以问题单申请账号总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidProbAccCount >0
                    ?applyData.eidProbAccCount
                    : 0
                    }}
                  </label>
                </li>
                <li>
                  <label class="v-textTwo">以例行工作单申请账号总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.eidRwAccCount >0
                    ?applyData.eidRwAccCount
                    : 0
                    }}
                  </label>
                </li>
              </ul>
            </aui-col>
          </aui-row>

          <aui-row>
            <aui-col :span="6" :flex="true" class="row-bg" justify-content="space-between">
              <aui-row :flex="false" class="row-bg">
                <div class="title">
                  <label class="titleSize">变更申请</label>
                  <div>
                    <label class="v_colText">首单申请时间 :</label>
                    <label class="v_text">
                      {{
                      applyData.firstEopsDate == 'NULL' ||
                      applyData.firstEopsDate == null ||
                      applyData.firstEopsDate == 'null' ||
                      applyData.firstEopsDate == ''
                      ? ''
                      :applyData.firstEopsDate
                      }}
                    </label>
                  </div>
                  <div>
                    <label class="v_colText">最后申请时间 :</label>
                    <label class="v_text alertwin" @click="alertWin('change')">
                      {{applyData.lastEopsDate == 'NULL' ||
                      applyData.lastEopsDate == null ||
                      applyData.lastEopsDate == 'null' ||
                      applyData.lastEopsDate == ''
                      ? ''
                      :applyData.lastEopsDate
                      }}
                    </label>
                  </div>
                </div>
              </aui-row>
              <ul>
                <li>
                  <label class="v-textTwo">一年内申请单总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.devopsCountByChange >0
                    ?applyData.devopsCountByChange
                    : 0
                    }}
                  </label>
                </li>
              </ul>
            </aui-col>

            <aui-col :span="6" :flex="true" class="row-bg" justify-content="space-between">
              <aui-row :flex="false" class="row-bg">
                <div class="title">
                  <label class="titleSize">事件申请</label>
                  <div>
                    <label class="v_colText">首单申请时间 :</label>
                    <label class="v_text">
                      {{
                      applyData.firstImDate == 'NULL' ||
                      applyData.firstImDate == null ||
                      applyData.firstImDate == 'null' ||
                      applyData.firstImDate == ''
                      ? ''
                      :applyData.firstImDate
                      }}
                    </label>
                  </div>
                  <div>
                    <label class="v_colText">最后申请时间 :</label>
                    <label class="v_text alertwin" @click="alertWin('model')">
                      {{
                      applyData.lastImDate == 'NULL' ||
                      applyData.lastImDate == null ||
                      applyData.lastImDate == 'null' ||
                      applyData.lastImDate == ''
                      ? ''
                      :applyData.lastImDate
                      }}
                    </label>
                  </div>
                </div>
              </aui-row>
              <ul>
                <li>
                  <label class="v-textTwo">一年内申请单总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.devopsCountByEvent >0
                    ?applyData.devopsCountByEvent
                    : 0
                    }}
                  </label>
                </li>
              </ul>
            </aui-col>
          </aui-row>

          <aui-row>
            <aui-col :span="6" :flex="true" class="row-bg" justify-content="space-between">
              <aui-row :flex="false" class="row-bg">
                <div class="title">
                  <label class="titleSize">问题申请</label>
                  <div>
                    <label class="v_colText">首单申请时间 :</label>
                    <label class="v_text">
                      {{
                      applyData.firstPmDate == 'NULL' ||
                      applyData.firstPmDate == null ||
                      applyData.firstPmDate == 'null' ||
                      applyData.firstPmDate == ''
                      ? ''
                      :applyData.firstPmDate
                      }}
                    </label>
                  </div>
                  <div>
                    <label class="v_colText">最后申请时间 :</label>
                    <label class="v_text">
                      {{
                      applyData.lastPmDate == 'NULL' ||
                      applyData.lastPmDate == null ||
                      applyData.lastPmDate == 'null' ||
                      applyData.lastPmDate == ''
                      ? ''
                      :applyData.lastPmDate
                      }}
                    </label>
                  </div>
                </div>
              </aui-row>
              <ul>
                <li>
                  <label class="v-textTwo">一年内申请单总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.devopsCountByProblem >0
                    ?applyData.devopsCountByProblem
                    : 0
                    }}
                  </label>
                </li>
              </ul>
            </aui-col>

            <aui-col :span="6" :flex="true" class="row-bg" justify-content="space-between">
              <aui-row :flex="false" class="row-bg">
                <div class="title">
                  <label class="titleSize">例行工作申请</label>
                  <div>
                    <label class="v_colText">首单申请时间 :</label>
                    <label class="v_text">
                      {{
                      applyData.firstSdDate == 'NULL' ||
                      applyData.firstSdDate == null ||
                      applyData.firstSdDate == 'null' ||
                      applyData.firstSdDate == ''
                      ? ''
                      :applyData.firstSdDate
                      }}
                    </label>
                  </div>
                  <div>
                    <label class="v_colText">最后申请时间 :</label>
                    <label class="v_text">
                      {{
                      applyData.lastSdDate == 'NULL' ||
                      applyData.lastSdDate == null ||
                      applyData.lastSdDate == 'null' ||
                      applyData.lastSdDate == ''
                      ? ''
                      :applyData.lastSdDate
                      }}
                    </label>
                  </div>
                </div>
              </aui-row>
              <ul>
                <li>
                  <label class="v-textTwo">一年内申请单总数</label>
                  <span></span>
                  <label class="v_test">
                    {{
                    applyData.devopsCountByWork >0
                    ?applyData.devopsCountByWork
                    : 0
                    }}
                  </label>
                </li>
              </ul>
            </aui-col>
          </aui-row>
        </div>
      </el-card>
    </div>
    <AlertWin ref="alertWinRef" :viewName="openTimes"></AlertWin>
  </div>
</template>
<script>
import { Button, Row, Col } from '@aurora/ui'
import AlertWin from './alertWin'
export default {
  components: {
    AlertWin,
    AuiButton: Button,
    AuiRow: Row,
    AuiCol: Col
  },
  props: {
    applyData: {
      type: Object
    }
  },
  data() {
    return {
      openTimes: '1',
      basicShow: false,
      gridTitleArr: [
        {
          title: 'EID申请',
          type: 'detail',
          record: '查看申请记录EID申请最后申请时间',
          parm: {
            employeeNumber: this.applyData.employeeId || ''
          },
          list: [
            {
              field: 'employeeNumber',
              width: 100,
              header: '申请人'
            },
            {
              field: 'applicantSn',
              width: 100,
              header: '申请单号'
            },
            {
              field: 'createDate',
              width: 100,
              header: '申请时间'
            },
            {
              field: 'applyType',
              width: 100,
              header: '申请类型'
            },
            {
              field: 'appTicket',
              width: 100,
              header: '凭据号'
            },
            {
              field: 'effectiveTime',
              width: 100,
              header: '开始时间'
            },
            {
              field: 'applyDesc',
              width: 100,
              header: '描述'
            },
            {
              field: 'account',
              width: 100,
              header: '账号'
            },
            {
              field: 'dns',
              width: 100,
              header: 'DNS'
            },
            {
              field: 'ipField',
              width: 100,
              header: 'IP'
            },
            {
              field: 'appCi',
              width: 100,
              header: '应用名'
            }
          ],
          ajaxData: {
            urlType: 'trustWorthyEid',
            url: 'services/trustWorthyEid/findlist/page/',
            methods: 'post'
          }
        },
        {
          title: '变更申请',
          record: '查看申请记录变更申请最后申请时间',
          type: 'change',
          parm: {
            taskApplyer: this.applyData.employeeId || ''
          },
          list: [
            {
              field: 'taskApplyer',
              width: 100,
              header: '申请人'
            },
            {
              field: 'taskId',
              width: 100,
              header: '申请单号'
            },
            {
              field: 'createTime',
              width: 100,
              header: '申请时间'
            },
            {
              field: 'taskType',
              width: 100,
              header: '申请类型'
            },
            {
              field: 'taskStart',
              width: 100,
              header: '开始时间'
            },
            {
              field: 'taskEnd',
              width: 100,
              header: '结束时间'
            },
            {
              field: 'relatedPerson',
              width: 100,
              header: '执行人'
            },
            {
              field: 'taskDesc',
              width: 100,
              header: '描述'
            },
            {
              field: 'taskApplication',
              width: 100,
              header: '应用名'
            }
          ],
          ajaxData: {
            urlType: 'trustWorthyEopsInfo',
            url: 'services/trustWorthyEopsInfo/findlist/page/',
            methods: 'post'
          }
        },
        {
          title: '事件申请',
          type: 'model',
          record: '查看申请记录事件申请最后申请时间',
          list: [
            {
              field: 'openedBy',
              width: 100,
              header: '申请人'
            },
            {
              field: 'number',
              width: 100,
              header: '事件号'
            },
            {
              field: 'updateTime',
              width: 100,
              header: '申请时间'
            },
            {
              field: 'openTime',
              width: 100,
              header: '开始时间'
            },
            {
              field: 'closeTime',
              width: 100,
              header: '结束时间'
            },
            {
              field: 'relatedPerson',
              width: 100,
              header: '执行人'
            },
            {
              field: 'resolution',
              width: 100,
              header: '描述'
            },
            {
              field: 'affectedItem',
              width: 100,
              header: '应用名'
            }
          ],
          parm: {
            openedBy: this.applyData.employeeId || ''
          },
          ajaxData: {
            urlType: 'trustWorthyIncidentInfo',
            url: 'services/trustWorthyIncidentInfo/findlist/page/',
            methods: 'post'
          }
        }
      ]
    }
  },
  methods: {
    alertWin(title) {
      let arr = this.gridTitleArr
      for (let i = 0; i < arr.length; i++) {
        if (title === arr[i].type) {
          this.$refs.alertWinRef.callAlertWin(arr[i])
        }
      }
    },
    hideBody() {
      this.basicShow = !this.basicShow
    },
    click() {
      this.$emit('returnToMainPage')
    }
  }
}
</script>

<style scoped lang="less">
.applyHistoryContent {
  width: 100%;
}
.headstyle {
  border-bottom: 1px solid #ebeef5;
  height: 32px;
}
.v_colText {
  margin: 5px 0 5px 0;
  padding-right: 10px;
  display: inline-block;
  text-align: right;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
}
.page-container-style {
  padding: 0 !important;
  /deep/.el-card__header {
    padding: 10px !important;
    border: none;
  }
  /deep/.el-card {
    border: none;
    box-shadow: none;
  }
  /deep/.el-card__body {
    padding: 0 !important;
  }
}
.icon-triangle-down {
  color: #1890ff;
}
.hae-row {
  margin-top: 10px;
}

.v_text {
  width: 48%;
  display: inline;
}

.title {
  background: #f7f7f7;
  line-height: 28px;
  padding: 12px 26px;
  .titleSize {
    font-size: 16px;
    color: #000;
    font-weight: 600;
  }
}
ul {
  border: 1px solid #e5e5e5;
  border-top: transparent;
  padding: 20px 0px;
  li {
    display: flex;
    line-height: 30px;
    padding-left: 26px;
    width: 70%;
    position: relative;
    span {
      flex: auto;
      color: #999999;
      border-bottom: 1px dashed #999;
      display: inline-block;
      margin: 0 6px 14px 14px;
    }
  }
}
.v_test {
  width: 44px;
  text-align: right;
  font-size: 14px;
  color: #333333;
  line-height: 30px;
  font-weight: 600;
}

.v-textTwo {
  font-size: 14px;
  color: #333333;
}
.alertwin {
  color: #1890ff;
}
.alertwin:hover {
  cursor: pointer;
}
.header-size {
  font-size: 16px;
  font-weight: 600;
}
.center-btn {
  text-align: center;
}
</style>

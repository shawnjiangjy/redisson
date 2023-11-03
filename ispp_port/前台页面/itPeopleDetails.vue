<template>
  <div class="itPeopleDetailsClass">
    <div class="page-container-style">
      <div class="body">
        <!--tab切换-->

        <aui-row>
          <aui-col
            :span="8"
            style="min-height: 500px;border-right: 1px solid #E5E5E5;"
          >
            <aui-row :flex="true" class="row-bg">
              <aui-col :span="6" class="divText">
                <aui-row>
                  <aui-col :span="12" style="padding:0">
                    <div
                      class="PeopleStatus fl"
                      ref="ititIllegalCount"
                      :class="[
                        basicData.itIllegalCount == null ||
                        basicData.itIllegalCount == '' ||
                        basicData.itIllegalCount === '0'
                          ? 'grestatus'
                          : 'redstatus'
                      ]"
                    >
                      <icon-smile
                        v-if="
                          basicData.itIllegalCount == null ||
                            basicData.itIllegalCount == '' ||
                            basicData.itIllegalCount === '0'
                        "
                        class="icon-smile"
                      ></icon-smile>
                      <icon-frown
                        v-if="
                          !(
                            basicData.itIllegalCount == null ||
                            basicData.itIllegalCount == '' ||
                            basicData.itIllegalCount === '0'
                          )
                        "
                        class="icon-smile"
                      ></icon-frown>
                    </div>
                    <div
                      class="PeopleCtn fl"
                      :class="[
                        basicData.itIllegalCount == null ||
                        basicData.itIllegalCount == '' ||
                        basicData.itIllegalCount === '0'
                          ? 'grestatus1'
                          : 'redstatus1'
                      ]"
                    >
                      <div class="pageJumpCacheview">IT安全违规次数</div>
                      <label
                        class="v_text textUnderline"
                        @click="alertWin('it')"
                      >
                        {{
                          basicData.itIllegalCount == null ||
                          basicData.itIllegalCount == ''
                            ? 0
                            : basicData.itIllegalCount
                        }}
                      </label>
                    </div>
                  </aui-col>
                </aui-row>
              </aui-col>
              <aui-col :span="6" class="divText" style="padding:0">
                <aui-row>
                  <aui-col :span="12" style="padding:0">
                    <div
                      class="PeopleStatus fl"
                      :class="[
                        basicData.itExamPassDay == null ||
                        basicData.itExamPassDay == '' ||
                        basicData.itExamPassDay === '0'
                          ? 'redstatus'
                          : 'grestatus'
                      ]"
                    >
                      <icon-smile
                        v-if="
                          !(
                            basicData.itExamPassDay == null ||
                            basicData.itExamPassDay == '' ||
                            basicData.itExamPassDay === '0'
                          )
                        "
                        class="icon-smile"
                      ></icon-smile>
                      <icon-frown
                        v-if="
                          basicData.itExamPassDay == null ||
                            basicData.itExamPassDay == '' ||
                            basicData.itExamPassDay === '0'
                        "
                        class="icon-smile"
                      ></icon-frown>
                    </div>
                    <div
                      class="PeopleCtn fl"
                      :class="[
                        basicData.itExamPassDay == null ||
                        basicData.itExamPassDay == '' ||
                        basicData.itExamPassDay === '0'
                          ? 'redstatus1'
                          : 'grestatus1'
                      ]"
                    >
                      <div class="v-text">IT安全认证通过天数</div>
                      <label class="v_text">
                        {{
                          basicData.itExamPassDay == null ||
                          basicData.itExamPassDay == ''
                            ? 0
                            : basicData.itExamPassDay
                        }}
                      </label>
                    </div>
                  </aui-col>
                </aui-row>
              </aui-col>
            </aui-row>

            <aui-row :flex="true" class="row-bg">
              <aui-col :span="6" class="divText" style="padding:0">
                <aui-row>
                  <aui-col :span="12" style="padding:0">
                    <div
                      class="PeopleStatus fl"
                      :class="[
                        basicData.infoIllegalCount == null ||
                        basicData.infoIllegalCount == '' ||
                        basicData.infoIllegalCount === '0'
                          ? 'grestatus'
                          : 'redstatus'
                      ]"
                    >
                      <icon-smile
                        v-if="
                          basicData.infoIllegalCount == null ||
                            basicData.infoIllegalCount == '' ||
                            basicData.infoIllegalCount === '0'
                        "
                        class="icon-smile"
                      ></icon-smile>
                      <icon-frown
                        v-if="
                          !(
                            basicData.infoIllegalCount == null ||
                            basicData.infoIllegalCount == '' ||
                            basicData.infoIllegalCount === '0'
                          )
                        "
                        class="icon-smile"
                      ></icon-frown>
                    </div>
                    <div
                      class="PeopleCtn fl"
                      :class="[
                        basicData.infoIllegalCount == null ||
                        basicData.infoIllegalCount == '' ||
                        basicData.infoIllegalCount === '0'
                          ? 'grestatus1'
                          : 'redstatus1'
                      ]"
                    >
                      <div class="v-text">信息安全违规次数</div>
                      <label
                        class="v_text textUnderline"
                        @click="alertWin('info')"
                      >
                        {{
                          basicData.infoIllegalCount == null ||
                          basicData.infoIllegalCount == ''
                            ? 0
                            : basicData.infoIllegalCount
                        }}
                      </label>
                    </div>
                  </aui-col>
                </aui-row>
              </aui-col>
              <aui-col :span="6" class="divText" style="display:none;">
                <aui-row>
                  <aui-col :span="12" style="padding:0">
                    <div
                      class="PeopleStatus fl"
                      :class="[
                        basicData.eidIllegalCount == null ||
                        basicData.eidIllegalCount == '' ||
                        basicData.eidIllegalCount === '0'
                          ? 'grestatus'
                          : 'redstatus'
                      ]"
                    >
                      <icon-smile
                        v-if="
                          basicData.eidIllegalCount == null ||
                            basicData.eidIllegalCount == '' ||
                            basicData.eidIllegalCount === '0'
                        "
                        class="icon-smile"
                      ></icon-smile>
                      <icon-frown
                        v-if="
                          !(
                            basicData.eidIllegalCount == null ||
                            basicData.eidIllegalCount == '' ||
                            basicData.eidIllegalCount === '0'
                          )
                        "
                        class="icon-smile"
                      ></icon-frown>
                    </div>
                    <div
                      class="PeopleCtn fl"
                      :class="[
                        basicData.eidIllegalCount == null ||
                        basicData.eidIllegalCount == '' ||
                        basicData.eidIllegalCount === '0'
                          ? 'grestatus1'
                          : 'redstatus1'
                      ]"
                    >
                      <div class="v-text">EID申请不合规次数</div>
                      <label
                        class="v_text textUnderline"
                        @click="alertWin('eid')"
                      >
                        {{
                          basicData.eidIllegalCount == null ||
                          basicData.eidIllegalCount == ''
                            ? 0
                            : basicData.eidIllegalCount
                        }}
                      </label>
                    </div>
                  </aui-col>
                </aui-row>
              </aui-col>
            </aui-row>
          </aui-col>

          <aui-col :span="4">
            <div class="right_text">
              <div class="fl theone">
                <p class="v-text text-r">在职状态:</p>
                <p class="v-text text-r">人员类别:</p>
                <p class="v-text text-r">IT安全认证考试日期:</p>
                <p class="v-text text-r">安全意识培训日期:</p>
              </div>
              <div class="fl thetwo">
                <p class="v-text">{{ basicData.jobStatus }}</p>
                <p class="v-text">
                  {{
                    basicData.employeeType == 'null' ||
                    basicData.employeeType == null ||
                    basicData.employeeType == 'NULL'
                      ? ' '
                      : basicData.employeeType == 'OTH' ||
                        basicData.employeeType == 'oth' ||
                        basicData.employeeType == 'EX_OTH'
                      ? '外包'
                      : '华为'
                  }}
                </p>
                <p class="v-text">
                  <span>{{
                    basicData.itExamTime
                      ? basicData.itExamTime.replace(/\//g, '-')
                      : ''
                  }}</span>
                </p>
                <p class="v-text bluePrintA">
                  <span @click="alertWin('train', 'sign')">{{
                    basicData.lastTrainDate
                      ? basicData.lastTrainDate.replace(/\//g, '-')
                      : ''
                  }}</span>
                </p>
              </div>
            </div>
          </aui-col>
        </aui-row>
      </div>
    </div>
    <AlertWin
      ref="alertWinRef"
      :bonus-point="itCreditValue"
      :rate="rate"
      :first-day-pass="firstDayPass"
    ></AlertWin>
  </div>
</template>

<script>
import { Tip, Button, Row, Col } from '@aurora/ui'
import AlertWin from './alertWin'
import labelTip from './labelTip'
import { IconSmile, IconFrown } from '@aurora/vue-icon'
export default {
  components: {
    AuiTip: Tip,
    AlertWin,
    labelTip,
    AuiButton: Button,
    AuiRow: Row,
    AuiCol: Col,
    IconSmile: new IconSmile(),
    IconFrown: new IconFrown()
  },
  props: {
    basicData: {
      type: Object
    }
  },
  data() {
    return {
      // trainDate: '',
      flag: false,
      itCreditValue: '1',
      rate: '',
      firstDayPass: '',
      basicShow: false,
      tipsOp: {
        content: this.basicData.deptAllName,
        mode: 'hover',
        showCloseButton: false,
        placement: 'right',
        type: 'normal'
      },
      gridTitleArr: [
        {
          title: 'IT安全违规',
          record: '查看基本信息IT安全违规次数',
          type: 'it',
          parm: {
            workNo: this.basicData.employeeId || null,
            dataOrigin: 'ISAC',
            deleteFlag: 'N',
            userAccount:
              this.$service.base.getEnvInfoSync().user.userAccount || null,
            encrypted: '0'
          },
          list: [
            {
              field: 'workNo',
              width: 100,
              header: '工号'
            },
            {
              field: 'genarationTime',
              width: 100,
              header: '发生时间'
            },
            {
              field: 'dept',
              width: 100,
              header: '违规时部门'
            },
            {
              field: 'finalLevel',
              width: 100,
              header: '违规等级'
            },
            {
              field: 'escalateType',
              width: 100,
              header: '违规类型'
            },
            {
              field: 'verificationBasis',
              width: 100,
              header: '核实摘要'
            },
            {
              field: 'relatedProducts',
              width: 100,
              header: '涉及产品'
            },
            {
              field: 'dataOrigin',
              width: 100,
              header: '数据来源'
            }
          ],
          ajaxData: {
            urlType: 'escalate',
            url: 'services/statisticEscalate/escalateInfoPop/page/',
            methods: 'get'
          }
        },

        {
          title: '安全培训记录',
          record: '当前人员所有的安全培训记录',
          type: 'train',
          parm: {
            employeeId: this.basicData.employeeId || null
          },
          list: [
            {
              header: '工号',
              field: 'employeeId',
              width: 130
            },
            {
              header: '姓名',
              field: 'name',
              width: 100
            },

            {
              header: '部门',
              field: 'dept',
              width: 380
            },
            {
              header: '培训方式',
              width: 120,
              field: 'learningMethod',
              content: `{{learningMethod=="1"?"现场培训":(learningMethod=="2")?"线上会议"
                :(learningMethod=="3"?"线下学习":(learningMethod=="4"?"自学":"其它"))}}`
            },
            {
              header: '培训日期',
              field: 'trainDate',
              width: 120
            }
          ],
          ajaxData: {
            urlType: 'getTrain',
            url: 'services/securityTrain/queryList/page/',
            methods: 'get'
          }
        },

        {
          title: '信息安全违规',
          record: '查看基本信息信息安全违规次数',
          type: 'info',
          parm: {
            workNo: this.basicData.employeeId || null,
            dataOrigin: 'INFO',
            deleteFlag: 'N',
            userAccount:
              this.$service.base.getEnvInfoSync().user.userAccount || null,
            encrypted: '0'
          },
          list: [
            {
              field: 'workNo',
              width: 100,
              header: '工号'
            },
            {
              field: 'genarationTime',
              width: 100,
              header: '发生时间'
            },
            {
              field: 'dept',
              width: 100,
              header: '部门'
            },
            {
              field: 'finalLevel',
              width: 100,
              header: '违规等级'
            },
            {
              field: 'escalateType',
              width: 100,
              header: '违规类型'
            },
            {
              field: 'verificationBasis',
              width: 100,
              header: '核实摘要'
            },
            {
              field: 'dataOrigin',
              width: 100,
              header: '数据来源'
            }
          ],
          ajaxData: {
            urlType: 'escalate',
            url: 'services/statisticEscalate/escalateInfoPop/page/',
            methods: 'get'
          }
        },
        {
          title: 'EID申请不合规',
          record: '查看基本信息EID申请不合规次数',
          type: 'eid',
          parm: {
            workNo: this.basicData.employeeId || null,
            dataOrigin: 'EID',
            deleteFlag: 'N',
            userAccount:
              this.$service.base.getEnvInfoSync().user.userAccount || null,
            encrypted: '0'
          },
          list: [
            {
              field: 'workNo',
              width: 100,
              header: '工号'
            },
            {
              field: 'genarationTime',
              width: 100,
              header: '发生时间'
            },
            {
              field: 'dept',
              width: 100,
              header: '违规时部门'
            },
            {
              field: 'finalLevel',
              width: 100,
              header: '违规等级'
            },
            {
              field: 'escalateType',
              width: 100,
              header: '违规类型'
            },
            {
              field: 'verificationBasis',
              width: 100,
              header: '核实摘要'
            },
            {
              field: 'relatedProducts',
              width: 100,
              header: '涉及产品'
            },
            {
              field: 'dataOrigin',
              width: 100,
              header: '数据来源'
            }
          ],
          ajaxData: {
            urlType: 'escalate',
            url: 'services/statisticEscalate/escalateNewInfoPop/page/',
            methods: 'get'
          }
        },
        {
          title: '信用积分',
          record: '查看基本信息信用积分',
          type: 'point',
          parm: {
            employeeId: this.basicData.employeeId || ''
          },
          list: [
            {
              field: 'generationTime',
              width: 100,
              header: '时间'
            },
            {
              field: 'scoreType',
              width: 100,
              header: '积分类型'
            },
            {
              field: 'riskValue',
              width: 100,
              header: '分值'
            },
            {
              field: 'creditScore',
              width: 100,
              header: '信用积分'
            },
            {
              field: 'nonComplianceDetail',
              width: 100,
              header: '积分原因'
            }
          ],

          ajaxData: {
            urlType: 'itPersonCreditDisplay',
            url: 'services/itPersonCreditDisplay/findlist/page/',
            methods: 'post'
          }
        }
      ]
    }
  },
  mounted() {
    var _this = this
    if (_this.basicData.itCreditValue == 12) {
      // 如果信用积分为12分，需要去请求后台，获取 你的信用积分保持良好XX天，超过xx%的人，请继续保持！
      var param = this.basicData.employeeId
      this.$store
        .dispatch('getCreditScoreIndex', {
          $service: this.$service,
          param
        })
        .then(response => {
          // 传递到扣分规则弹窗页面
          var res = response.data.result
          _this.firstDayPass = res.FIRSTDAYPASS || ''
          _this.rate = res.RATE || ''
        })
    }
  },
  methods: {
    alertWin(title, sign) {
      if (title == 'point') {
        this.itCreditValue = this.basicData.itCreditValue
      } else {
        this.itCreditValue = '1'
      }
      // 添加标识取消扣分规则显示
      if (sign == 'sign') {
        this.itCreditValue = false
      }
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

<style lang="less" scoped>
.itPeopleDetailsClass {
  width: 100%;

  .divText {
    margin-left: 24px;
    padding: 0px;
    width: 344px;
    height: 72px;
  }

  .fl {
    float: left;
  }

  .PeopleStatus {
    width: 72px;
    height: 72px;
    text-align: center;
    line-height: 72px;
  }

  .icon-smile {
    fill: white;
  }

  .PeopleCtn {
    padding: 10px;
    width: 60%;
    height: 72px;
  }

  .textUnderline {
    text-decoration: underline;
    cursor: pointer;
  }

  .redstatus {
    background: #fd512d;
  }

  .redstatus1 {
    background: #feedea;
  }

  .grestatus {
    background: #1ec075;
  }

  .grestatus1 {
    background: #e8f8f1;
  }

  .v-text {
    font-size: 14px;
    color: #666666;
  }

  .right_text {
    margin-top: 26px;
    padding-left: 14%;
  }

  .theone,
  .thetwo {
    line-height: 28px;
  }

  .thetwo {
    width: 38%;
    margin-left: 3%;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      height: 28px;
    }
  }

  .text-r {
    text-align: right;
  }

  .v_colText {
    margin: 5px 0 5px -50px;
    padding-right: 10px;
    color: rgb(147, 150, 158);
    width: 51%;
    display: inline-block;
    text-align: right;
  }

  .page-container-style {
    padding: 0 !important;

    /deep/.el-card__header {
      padding: 10px 20px !important;
    }

    /deep/.el-card__body {
      padding: 0 !important;
    }
  }

  .v_text {
    top: 5px;
    font-size: 24px;
    color: #333333;
    line-height: 32px;
    font-weight: 600;
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

  .redPrint {
    background-color: red;
    color: white;
  }

  .redPrintA {
    background-color: red;
    color: yellow;
  }

  .bluePrintA {
    color: #1890ff;
    cursor: pointer;
  }
}
</style>

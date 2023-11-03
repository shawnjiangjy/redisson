<template>
  <div class="permissionAutorClass">
    <div class="page-container-style">
      <el-card body-style="padding:24px 0 20px 0">
        <div v-show="basicShow" class="body">
          <!-- 第一列 -->
          <aui-row :flex="true" class="row-bg" justify-content="space-around">
            <!-- 人员详情 -->
            <!--第一列-->
            <!--**加宽此栏用于新增展示SRE信息-->
            <aui-col :span="12" class="left_box">
              <div class="avatarBox">
                <img id="avatar" class="avatar" alt />
                <div
                  :class="[radarData.jobStatus == '离职' ? 'v-avataexit' : '']"
                  class="avatarState"
                ></div>
              </div>
              <div class="PeopleDetails">
                <!-- 第一行 -->
                <aui-row style="padding: 6px 0px">
                  <div>
                    <aui-row>
                      <span class="v-colName">{{ radarData.employeeName }}</span>
                      <span
                        v-for="roleSign in roleSignData"
                        :key="roleSign"
                        :class="[
                          roleSignData.length > 0 ? 'v-isAuthPerson' : ''
                        ]"
                      >{{ roleSign }}</span>
                      <div class="v-coltitle">{{ radarData.employeeId }}</div>
                    </aui-row>
                  </div>
                </aui-row>
                <!-- 第二行 -->
                <aui-row style="background: #fafafa">
                  <aui-col class="colCredits" style="margin-left: 20px">
                    <div class="col v_colText">信用积分</div>
                    <div class="col v-Print">
                      <span
                        style="cursor: pointer; color: #1890ff"
                        @click="alertWin('point')"
                      >{{ radarData.itCreditValue }}</span>
                    </div>
                  </aui-col>
                  <aui-col class="colCredits">
                    <div class="col v_colText">服务年限</div>
                    <div class="col v-Print">{{ radarData.entryAgeLimit }}</div>
                  </aui-col>
                  <aui-col class="colCredits">
                    <div class="col v_colText">IT上岗凭证</div>
                    <div
                      v-if="radarData.isItExamValidTime == 3"
                      :class="
                        radarData.isItExamValidTime == 3
                          ? 'greenPrint'
                          : radarData.isItExamValidTime == 2
                          ? 'yellowPrint'
                          : 'rPrint'
                      "
                    >{{ radarData.itExamValidTime }}</div>
                    <div v-if="radarData.isItExamValidTime != 3">
                      <div
                        @click="redirectTo('1')"
                        :class="
                          radarData.isItExamValidTime == 3
                            ? 'greenPrint'
                            : radarData.isItExamValidTime == 2
                            ? 'yellowPrint'
                            : 'rPrint'
                        "
                      >{{ radarData.itExamValidTime }}</div>
                    </div>
                  </aui-col>
                  <aui-col class="colCredits">
                    <div class="col v_colText">IT上岗承诺书</div>
                    <div
                      v-if="radarData.isItSignedValidTime == 3"
                      :class="
                        radarData.isItSignedValidTime == 3
                          ? 'greenPrint'
                          : radarData.isItSignedValidTime == 2
                          ? 'yellowPrint'
                          : 'rPrint'
                      "
                    >{{ radarData.itSignedValidTime }}</div>
                    <div v-if="radarData.isItSignedValidTime != 3">
                      <div
                        @click="redirectTo('2')"
                        :class="
                          radarData.isItSignedValidTime == 3
                            ? 'greenPrint'
                            : radarData.isItSignedValidTime == 2
                            ? 'yellowPrint'
                            : 'rPrint'
                        "
                      >{{ radarData.itSignedValidTime }}</div>
                    </div>
                  </aui-col>
                  <!-- **以下新增展示SRE信息 -->
                  <aui-col class="colCredits">
                    <div class="col v_colText"
                      v-if="radarData.sreStatus == 3 || radarData.sreStatus == 2 || radarData.sreStatus == 1">
                      SRE任命期</div>
                    <div
                      v-if="radarData.sreStatus == 3 || radarData.sreStatus == 2 || radarData.sreStatus == 1"
                      :class="
                        radarData.sreStatus == 3
                          ? 'greenPrint'
                          : radarData.sreStatus == 2
                          ? 'yellowPrint'
                          : 'rPrint'
                      "
                    >{{ radarData.isSre }}</div>
                  </aui-col>
                  <aui-col v-if="false" class="colCredits">
                    <div class="col v_colText">可信告警数</div>
                    <div class="col">
                      <a class="redPrintA" @click="forwardDetail">
                        {{
                        radarData.totalRiskCnt == null ||
                        radarData.totalRiskCnt == ''
                        ? 0
                        : radarData.totalRiskCnt
                        }}
                      </a>
                    </div>
                  </aui-col>
                </aui-row>
                <!-- 第三行 -->
                <aui-row style="line-height: 36px; padding-top: 10px">
                  <aui-col
                    :span="6"
                    :flex="true"
                    class="row-bg overflow"
                    justify-content="space-around"
                  >
                    <div>
                      <label class="v_colText magin10">部门:</label>
                      <labelTip :show-text="radarData.deptAllName" style="top: 0px">
                        {{
                        radarData.deptAllName == null ||
                        radarData.deptAllName == ''
                        ? ''
                        : radarData.deptAllName.length > 17
                        ? radarData.deptAllName.substr(0, 17) + '...'
                        : radarData.deptAllName
                        }}
                      </labelTip>
                    </div>
                    <div>
                      <label class="v_colText magin10">领域:</label>
                      <labelTip :show-text="radarData.productDomain" style="top: 0px">
                        {{
                        radarData.productDomain == null ||
                        radarData.productDomain == ''
                        ? ''
                        : radarData.productDomain.length > 17
                        ? radarData.productDomain.substr(0, 17) + '...'
                        : radarData.productDomain
                        }}
                      </labelTip>
                      <!-- <span :title="radarData.productDomain " class="tip"> {{ radarData.productDomain }}</span> -->
                    </div>
                  </aui-col>
                  <aui-col :span="6" :flex="true" class="row-bg" justify-content="space-around">
                    <div v-show="hiddenflag2">
                      <label class="v_colText magin10">任职级别:</label>

                      <span>{{ radarData.positionLevel }}</span>
                    </div>
                    <div v-show="hiddenflag2">
                      <label class="v_colText magin10">职级:</label>
                      <span>{{ radarData.employeeLevel }}</span>
                    </div>
                  </aui-col>
                </aui-row>
              </div>
            </aui-col>
            <!-- 第二列 -->
            <aui-col v-if="false" :span="4">
              <div class="cChart">
                <div class="cChartText">
                  <p class="v_colText">可信指数</p>
                  <span>{{ radarData.credibilityIndex }}</span>
                </div>

                <aui-chart ref="riskStatistics" :op="riskStatisticsOp"></aui-chart>
              </div>
            </aui-col>
          </aui-row>
        </div>
      </el-card>
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
import {Button, Row, Col, Chart } from '@aurora/ui'
import AlertWin from './alertWin'
import labelTip from './labelTip'
import { IconSuccessful } from '@aurora/vue-icon'
export default {
  components: {
    AuiButton: Button,
    AuiRow: Row,
    AlertWin,
    AuiCol: Col,
    AuiChart: Chart,
    labelTip,
    IconSuccessful: new IconSuccessful()
  },
  props: {
    radarData: {
      type: Object
    },
    redColor: {
      type: Boolean
    },
    positionLevelColor: {
      type: Boolean
    }
  },
  data() {
    var that = this
    return {
      // hiddenflag用来隐藏相关字段
      hiddenflag2: false,
      roleSignData: [],
      isAllowances: false, // 是否有津贴
      itCreditValue: '1',
      rate: '',
      firstDayPass: '',
      gridTitleArr: [
        {
          title: '信用积分',
          record: '查看基本信息信用积分',
          type: 'point',
          parm: {
            employeeId: this.radarData.employeeId || ''
          },
          list: [
            {
              // field: 'generationTime',
              width: 100,
              header: '时间',
              content:
                '{{(nonComplianceDetail=="黑IP"||nonComplianceDetail=="黑OS"||'+
                'nonComplianceDetail=="私自挪用IP"||nonComplianceDetail=="黑DB"||'+
                'nonComplianceDetail=="黑中间件"||nonComplianceDetail=='+
                '"应用与资源关联关系缺失")?generationTime.split(" ")[0]:generationTime}}'
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
      ],

      isActive: true,
      basicShow: true,
      riskStatisticsOp: {
        title: {
          x: 'center',
          y: 'center'
        },
        tooltip: {
          confine: true,
          enterable: true
        },
        radar: {
          // shape: 'circle',
          indicator: [],
          name: {
            textStyle: {
              fontStyle: 'normal',
              color: 'black'
            }
          },
          center: ['50%', '50%'],
          radius: '60%',
          splitArea: {
            areaStyle: {
              color: [
                'rgba(250, 250, 250)',
                'rgba(255, 255, 255)',
                'rgba(250, 250, 250)',
                'rgba(255, 255, 255)'
              ]
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(230, 230, 230)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(230, 230, 230)'
            }
          },
          splitNumber: 4
        },

        series: [
          {
            name: '',
            type: 'radar',
            itemStyle: {
              normal: {
                color: '#419BF9'
              }
            },

            areaStyle: {
              type: 'default',
              opacity: 0,
              normal: {
                color: 'rgba(24,144,255,0.4)'
              }
            },

            lineStyle: {
              color: '#1890FF',
              width: 2,
              opacity: 1
            },
            symbol: 'circle',
            symbolSize: 8
          }
        ],
        onComplete: function() {
          that.renderData()
        }
      }
    }
  },
  mounted() {
    var _this = this
    if (_this.radarData.itCreditValue == 12) {
      // 如果信用积分为12分，需要去请求后台，获取 你的信用积分保持良好XX天，超过xx%的人，请继续保持！
      var param = this.radarData.employeeId
      this.$store
        .dispatch('getCreditScoreIndex', {
          $service: this.$service,
          param
        })
        .then(response => {
          // 传递到扣分规则弹窗页面
          var res = response.data.result
          _this.firstDayPass = res.firstDayPass || ''
          _this.rate = res.rate || ''
        })
    }
    this.$service.network
      .get(
        `services/personInfo/personPhoto/${sessionStorage.getItem(
          'cachedEmployeeId'
        ) || this.$route.query.cachedEmployeeId}`
      )
      .then(({ data }) => {
        if (Number(data.code) === 200) {
          document.querySelector('#avatar').src =
            'data:image/jpeg;base64,' + data.data
        }
      })
    this.getRoleSignData(this.radarData.employeeId)
  },
  methods: {
    getRoleSignData(employeeId) {
      this.$service.network
        .get(
          'services/roleSign/findEmployeeLabel/' +
            employeeId +
            `?params=${encodeURI(
              this.$service.base.getEnvInfoSync().user.roles
            )}`
        )
        .then(data => {
          this.roleSignData = data.data
        })
    },
    alertWin(title) {
      if (title == 'point') {
        this.itCreditValue = this.radarData.itCreditValue
      } else {
        this.itCreditValue = '1'
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
    forwardDetail() {
      var account = this.radarData.employeeId
      let path = this.$router.resolve({
        path: 'itPortraitsOfPeople/riskStatistic?account=' + account
      })
      window.open(path.href.replace('/itPortraitsOfPeople', ''), '_blank')
    },
    renderData() {
      var that = this
      var args = {
        account: that.radarData.employeeId
      }
      this.$store
        .dispatch('getSingleRadarDate', {
          $service: this.$service,
          args
        })
        .then(data => {
          const _data = data.data

          this.$emit('colorChange', _data)
          // _data 去重
          var distinctData = this.distinct(_data, d => {
            return d.riskDimension
          })
          var newVal = []
          // 主要是为了设置雷达图中indicator属性的max
          let totalSum = 0
          distinctData.forEach(item => {
            newVal.push(item.riskTotalSum)
            totalSum += item.riskTotalSum
          })
          that.totalSum = totalSum
          // newVal翻转
          newVal.reverse()
          // 把最后一个元素放到第一个
          var str = newVal.splice(newVal.length - 1, 1)
          newVal.unshift(str[0])
          let max = Math.max(...newVal) * 1.5
          let vals = []
          newVal.forEach(val => {
            vals.push(max - val)
          })
          this.setData(distinctData, vals, max)
        })
    },
    setData(distinctData, value, max) {
      let newOp = {
        tooltip: {
          confine: true,
          enterable: true,
          formatter: function(param) {
            var html = []
            var params = param.data.distinctData
            if (params.length != 0) {
              for (let i = 0; i < params.length; i++) {
                // if(params[i].value !=null&&params[i].value!=0&&params[i].value!=''){
                html.push(
                  '<div style="display: flex; justify-content: space-between">'
                )
                html.push(
                  `<span class="attr-name">${params[i].riskDimension}&nbsp;</span>`
                )
                html.push(
                  `<span class="attr-value">&nbsp;&nbsp;${params[i].riskTotalSum}</span>`
                )
                html.push('</div>')
                // }
              }
            }
            return html.join('')
          }
        },
        series: [
          {
            data: [
              {
                distinctData: distinctData,
                value: value,
                name: '风险统计'
              }
            ]
          }
        ],
        radar: {
          indicator: [
            {
              name: '基础资质',
              max: max
            },
            {
              name: '作业环境',
              max: max
            },
            {
              name: '操作过程',
              max: max
            },
            {
              name: '操作凭证',
              max: max
            },
            {
              name: '权限分配',
              max: max
            },
            {
              name: '权限使用',
              max: max
            },
            {
              name: '权限审批',
              max: max
            },
            {
              name: '职责分离',
              max: max
            }
          ]
        }
      }
      var canvas = this.$refs.riskStatistics.widget.getChartObject()
      canvas.setOption(newOp)
      canvas.resize({
        height: 260
      })
      let _this = this
      // 点击事件
      canvas.on('click', function() {
        _this.forwardDetail()
      })
    },
    // 去重
    distinct(originData, fn) {
      var distinctObj = {}
      var distinctData = originData.reduce((item, next) => {
        var key = fn(next)
        distinctObj[key] ? '' : (distinctObj[key] = true && item.push(next))
        return item
      }, [])
      return distinctData
    },
    redirectTo(type) {
      if (type == '1') {
        window.open(
          'http://ilearning.huawei.com/next/home.html#/examinationInfo?examinationId=50691'
        )
      }
      if (type == '2') {
        let path = this.$router.resolve({
          path: 'itCommitment/itCommitmentLetter?signingEmpId='+this.radarData.employeeId
        })
        window.open(path.href.replace('/itPortraitsOfPeople', ''), '_blank')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.permissionAutorClass {
  width: 100%;

  .page-container-style {
    height: 300px;
    padding: 0 !important;

    /deep/.el-card__header {
      padding: 10px 20px !important;
    }

    /deep/.el-card__body {
    }
  }

  .body {
    .left_box {
      height: 260px;
    }
  }

  .avatarBox {
    float: left;
    width: 10%;
    height: 64px;
    margin-left: 3%;

    .avatar {
      display: inline-block;
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    .avatarState {
      position: relative;
      right: -50px;
      bottom: 11px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #1ec075;
      border: 2px solid #ffffff;
    }

    .v-avataexit {
      background: #bfbfbf;
      border: 2px solid #ffffff;
    }
  }

  // 人员详情
  .PeopleDetails {
    float: left;
    height: 200px;
    width: 80%;
    // 第一行

    .v-colName {
      font-weight: bolder;
      font-size: 18px;
      color: #000000;
      text-align: left;
      line-height: 26px;
    }

    .v-coltitle {
      font-size: 12px;
      color: #666666;
      text-align: left;
      line-height: 32px;
    }

    .v-jobStatus,
    .v-employeeType,
    .v-isAuthPerson {
      margin-left: 4px;
      border: 1px solid #b7eb8f;
      border-radius: 2px;
      background: #f6ffed;
      padding: 2px;
      color: #52c41a;
      line-height: 30px;
    }

    .v-exitStatus {
      border: 1px solid #ededed;
      color: #7d7d7d;
      background: #fafafa;
    }

    .v-employeeType {
      color: #1890ff;
      border: 1px solid #91d5ff;
      background: #e6f7ff;
    }

    .v-isAuthPerson {
      color: #fa8c16;
      background: #fff7e6;
      border: 1px solid #ffd591;
    }
  }

  // 第二行
  .v_text {
    vertical-align: bottom;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .colCredits {
    width: 18%;
    padding: 6px 0;
  }

  .active {
    margin-top: 6px;
    font-size: 12px;
    float: right;
    fill: #fa8d17;
  }

  .activeno {
    fill: #ffffff;
    float: right;
  }

  .overflow {
    overflow: hidden;
    white-space: nowrap;
  }

  .title {
    position: relative;
    top: 20px;
    left: 40px;
    display: block;
    margin-bottom: 20px;
  }

  .header-size {
    font-size: 16px;
  }

  .center-btn {
    text-align: center;
  }

  .hae-col .col {
    line-height: 30px;
    text-align: left;
  }

  .fl {
    float: left;
  }

  //表格
  table {
    td {
      padding: 0 8px;
      width: 168px;
      border: 1px solid #e5e5e5;
      font-size: 14px;
      color: #333333;
      text-align: left;
      line-height: 22px;
    }

    .tdfirst {
      font-size: 14px;
      color: #333333;
      text-align: center;
      vertical-align: middle;
      line-height: 22px;
      width: 40px;
      max-width: 40px;
      padding: 10px;

      span {
        display: inline-block;
        max-width: 20px;
      }
    }
  }

  .ul {
    margin-top: 10px;

    li {
      border: 1px solid #d9d9d9;
      text-align: center;
    }

    .td-1-first {
      float: left;
      line-height: 30px;
    }

    .td-1-second {
      height: 144px;
      float: left;
      line-height: 30px;
    }

    .td1 {
      height: 36px;

      span {
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .li-3 {
      height: 30px;
      line-height: 30px;
    }
  }

  .v_colText {
    font-size: 14px;
    color: #666666;
    line-height: 22px;
  }

  .magin10 {
    margin-right: 10px;
  }

  .v-Print {
    font-size: 24px;
    color: #000000;
    text-align: left;
    line-height: 26px;
  }
  .greenPrint {
    line-height: 26px;
    font-size: 12px;
    color: green;
    cursor: pointer;
  }
  .yellowPrint {
    line-height: 26px;
    font-size: 12px;
    color: #fa8c16;
    cursor: pointer;
  }
  .rPrint {
    line-height: 26px;
    font-size: 12px;
    color: red;
    cursor: pointer;
  }
  .redPrintA {
    font-size: 24px;
    color: #ff4d4f;
    text-align: left;
    line-height: 26px;
    text-decoration: underline;
  }

  .redPrint {
    background-color: red;
    color: white;
  }

  .cChart {
    height: 270px;

    .cChartText {
      margin-left: 16px;

      span {
        font-size: 36px;
        color: #1ec075;
        line-height: 44px;
      }
    }
  }

  .v_labelTip {
    z-index: 99;
  }

  .starFlag {
    font-size: 20px;
    font-weight: bolder;
    color: #fa8d17;
    margin-right: 10px;
  }
}
</style>

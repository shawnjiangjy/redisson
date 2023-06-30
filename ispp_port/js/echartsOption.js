// 折线图配置项
export class LineOption {
  setOption (data) {
    // 设置x轴数据
    this.xAxis.data = data.x || []
    data.y.forEach((val, i) => {
      this.series[i].data = val
    })
  }
  setYaxisName (name) {
    this.yAxis.name = name
  }
  tooltip = {
    trigger: 'axis',
    show: true
  }
  xAxis = {
    type: 'category',
    boundaryGap: false,
    data: [],

    axisLine: getAxisLine('ccc', 'solid')
  }
  color = ['#1890FF', '#70d354', '#CC0000','#4AD2E7','#FFCC33']
  legend = {
    icon: 'circle',
    // top: 10,
    bottom: 0,
    itemWidth: 12,
    itemHeight: 12
  }
  grid = {
    top: '30px',
    left: '3%',
    right: '3%',
    bottom: '30',
    containLabel: true
  }
  yAxis = {
    type: 'value',
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    splitLine: getAxisLine('#ccc')
  }
  series = [{
    name: '总次数',
    data: [150, 230, 224, 218, 135, 147, 260],
    type: 'line'
  },
  {
    name: '资质符合',
    data: [160, 240, 234, 238, 155, 167, 280],
    type: 'line'
  },
  {
    name: '资质不符',
    data: [170, 250, 274, 278, 175, 177, 270],
    type: 'line'
  },
  {
    name: '资质提醒',
    data: [0],
    type: 'line'
  },
  {
    name: '资质警示',
    data: [0],
    type: 'line'
  }
  ]
}

export class LineModelOption {
  setOption (data) {
    // 设置x轴数据
    this.xAxis.data = data.month || []
    this.series[0].data = data.addNum || []
    this.series[1].data = data.online || []
  }
  tooltip = {
    trigger: 'axis',
    show: true
  }
  color = ['#9900ff', '#1890ff']
  legend = {
    show: true,
    data: ['注册新增', '上线新增'],
    icon: 'circle'
  }
  grid = {
    right: '3%',
    top: '30px',
    bottom: '30',
    left: '3%',
    containLabel: true
  }
  yAxis = {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#ccc'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  }
  xAxis = {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine: {
      lineStyle: {
        color: '#999'
      }
    },
    axisTick: {
      show: false
    }
  }
  series = [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true, //折线图变成圆滑曲线
      name: '注册新增'
    },
    {
      data: [500, 600, 420, 934, 1000, 1330, 1320],
      type: 'line',
      smooth: true,
      name: '上线新增'
    }
  ]
}
export class LineChangeOption {
  setOption (data, flag) {
    // 设置x轴数据
    this.xAxis.data = data.month || []
    this.legend.data = data.type || []
    data.type.map((item, index) => {
      let obj = {
        type: 'line',
        smooth: true,
        name: item,
        data: data.num[item]
      }
      this.series.push(obj)
    })
    if (flag) {
      this.xAxis.axisLabel.rotate = 20
    }
  }
  tooltip = {
    trigger: 'axis',
    show: true
  }
  color = ['#9900ff', '#1890ff', '#ff33ff', '#99cc66', '#999900']
  legend = {
    show: true,
    data: [],
    icon: 'circle',
    type: 'scroll',
    orient: 'vertical',
    right: '1%',
    top: '5%'
  }
  grid = {
    top: '30px',
    bottom: '30',
    left: '3%',
    right: '15%',
    containLabel: true
  }
  xAxis = {
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#999'
      }
    },
    axisLabel: {
      interval: 0
    }
  }
  yAxis = {
    type: 'value',
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#ccc'
      }
    }
  }
  series = []
}
// 环形图配置项
export class Pieoption {
  setPieData (data) {
    this.series[1].data = data.array
    this.series[0].label.normal = {
      ...this.normalObj,
      formatter: function() {
        if (data.formatterAble) {
          return data.total < 10000? data.total:(data.total/10000).toString().match(/^\d+(?:\.\d{0,1})?/)+'万' || ''
        } else {
          return data.total || ''
        } 
      }
    }
  }
  // 万级以上数据做简化处理（带单位）
  setPieDataWithUnit(data, unit) {
    this.series[1].data = data.array
    this.series[0].label.normal = {
      ...this.normalObj,
      formatter: function() {
        if (data.formatterAble) {
          return data.total < 10000 ? data.total : (data.total / 10000).toString().match(/^\d+(?:\.\d{0,1})?/) + '万\n' + unit || '' + unit
        } else {
          return data.total || ''
        }
      }
    }
  }
  title = {
    show: false,
    text: ''
  }
  color = ['#029bed', '#cc99cc', '#fedf82', '#70d354', '#777532']
  tooltip = {
    trigger: 'item',
    formatter: (name) => {
      let percent = name.data.percent ? (name.data.percent * 100).toFixed(2) : '0'
      let str = `${name.marker} ${name.data.name}: ${name.data.value} (${percent}%)`
      return str
    }
  }
  normalObj = {
    show: true,
    position: 'center',

    color: '#333',
    fontSize: '20'

  }
  legend = {
    orient: 'vertical',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    top: 'middle',
    right: '3%',

    tooltip: {
      show: true
    },
    formatter: (name) => {
      let params1 = ''
      let percent = ''
      let nameRes = ''

      let seriesData = this.series[1].data
      for (let i = 0, len = seriesData.length; i < len; i++) {
        if (seriesData[i]['name'] === name) {
          nameRes = substrStrBymiddle(name, 10)
          params1 = seriesData[i]['value']
          let num = seriesData[i].percent ? seriesData[i].percent * 100 : 0
          percent = num % 1 ? num.toFixed(2) : num
        }
      }

      let arr = [
        '{a|' + nameRes + '}',
        '{b|' + percent + '%}',
        '{c|' + params1 + '}'
      ]
      if (name === '0') {
      } else {
        return arr.join('')
      }
    },
    textStyle: {
      rich: {
        a: {
          align: 'left',
          width: 100,
          padding: [0, 14, 8, 5],
          whiteSpace: 'wrap'
        },
        b: {
          align: 'right',
          width: 58,
          padding: [0, 10, 8, 10]

        },
        c: {
          align: 'right',
          padding: [0, 10, 8, 10]
        }

      }
    }

  }
  series = [{
    name: '',
    type: 'pie',
    center: ['22%', '50%'],
    radius: ['42%', '48%'],
    avoidLabelOverlap: false,
    color: ['transparent'],
    silent: true,
    label: {
      normal: {
        show: true,
        position: 'center',
        formatter: function() {
          return ''
        },
        color: '#333',
        fontSize: '30'

      }

    },
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
      value: 0,
      name: '0'
    }]
  },
  {
    name: '',
    type: 'pie',
    center: ['22%', '50%'],
    radius: ['40%', '50%'],
    avoidLabelOverlap: false,
    label: {
      normal: {
        show: false

      },
      emphasis: {
        show: false
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    data: []
  }
  ]
}

export class SeverOverPie extends Pieoption {
  constructor(colorArr, suffix) {
    super()
    let _that = this 
    this.color = colorArr
    this.legend = {
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      top: 'middle',
      right: '3%',
      tooltip: {
        show: true,
        formatter: function (params, ticket, callback) {
          let params1 = ''
          let seriesData = _that.series[1].data
          for (let i = 0, len = seriesData.length; i < len; i++) {
            if (seriesData[i]['name'] === params.name) {
              params1 = seriesData[i]['value'] > 10000?seriesData[i]['value']:''

            }
          }
          return params1
        }
    },
      formatter: (name) => {
        let params1 = ''
        let nameRes = ''
        let seriesData = this.series[1].data
        for (let i = 0, len = seriesData.length; i < len; i++) {
          if (seriesData[i]['name'] === name) {
            nameRes = substrStrBymiddle(name, 10)
            params1 = seriesData[i]['value'] < 10000? seriesData[i]['value']:(seriesData[i]['value']/10000).toString().match(/^\d+(?:\.\d{0,1})?/)+'万' || ''
          }
        }
        let arr = [
          '{a|' + nameRes + '}',
          '{b|' + params1 + '' + suffix + '}'

        ]
        if (name !== '0') {
          return arr.join('')
        }
      },
      textStyle: {
        rich: {
          a: {
            align: 'left',
            width: 130,
            whiteSpace: 'wrap'
          },
          b: {
            align: 'right',
            padding: [0, 5, 2, 5]
          }

        }
      }

    }
    this.tooltip = {
      trigger: 'item'
    }
  }
  setLegend (legend) {
    this.legend = legend
  }
}

export class Baroption {
  setSeriesData (data) {
    this.xAxis.data = data.x
    this.series[0].data = data.y
    this.dataZoom = [{
      show: data.x.length > 10, // 是否显示
      start: 0,
      end: data.x.length > 10 ? (10 / data.x.length) * 100 : 100,
      height: '14',
      type: 'slider',
      textStyle: false // 不显示文字，显示就删掉这行
    }]
  }
  setYaxisName (name) {
    this.yAxis.name = name
  }
  setGrid (grid) {
    this.grid = grid
  }
  setNameTextStyle (nameTextStyle) {
    this.nameTextStyle = nameTextStyle
  }
  xAxis = {
    type: 'category',
    data: [],
    axisLine: getAxisLine('#999'),
    axisLabel: {
      interval: 0,
      color: '#333',
      formatter: (data) => {
        return substrStrBymiddle(data, 5)
      }
    },
    nameTextStyle: {
      color: '#333'
    }
  }
  tooltip = {
    trigger: 'item',
    show: true
  }
  yAxis = {
    type: 'value',
    axisLine: getAxisLine('#999'),
    splitLine: getAxisLine('#ccc'),
    axisLabel: {
      color: '#333'
    }
  }
  color = ['#4ad2e7']
  series = [{
    barWidth: 15,
    data: [],
    type: 'bar'
  }]
  grid = {
    top: '20px',
    left: '3%',
    right: '3%',
    containLabel: true
  }
}

export class SeverOverBar extends Baroption {
  constructor() {
    super()
    this.grid = {
      top: '20px',
      left: '3%',
      right: '3%',
      bottom: '30',
      containLabel: true
    }
  }
}

// 从中间分割字符串展示
export function substrStrBymiddle (data, fromAt) {
  let len = data.length
  if (len > fromAt) {
    let len1 = Math.ceil(len / 2)
    let str1 = data.substring(0, len1)
    let str2 = data.substring(len1)
    return `${str1}\n${str2}`
  } else {
    return data
  }
}

export function getAxisLine (color = '#333', type = 'dashed') {
  let axisLine = {
    lineStyle: {
      type: type,
      color: color,
      width: 1
    }
  }
  return axisLine
}


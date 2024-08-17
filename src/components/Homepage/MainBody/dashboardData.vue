<template>
  <div>
    <el-card class="wholeLayout">
      <el-dialog v-model="salaryTable" title="总支出" width="70%">
        <div class="bottomCharts">
          <el-card style="flex: 1">
            <template #header>
              <div class="card-header">
                <span>管理工资</span>
                <el-button class="button" text>Operation button</el-button>
              </div>
            </template>
            <el-alert type="success" :closable="false"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 16px;
                  align-items: center;
                "
              >
                <span>支出类别</span><span>支出金额</span>
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>报销金额</span
                ><span
                  >{{ salaryPart.allReimburse ? salaryPart.allReimburse.toFixed(2) : 0 }}元</span
                >
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>管理费用</span
                ><span
                  >{{
                    salaryPart.managerExpense ? salaryPart.managerExpense.toFixed(2) : 0
                  }}元</span
                >
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>会籍提成</span
                ><span
                  >{{ salaryPart.commissionAll ? salaryPart.commissionAll.toFixed(2) : 0 }}元</span
                >
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>私教工资</span
                ><span
                  ><el-input v-model="privateSalary" style="width: 50px; height: 21px"></el-input
                  >元</span
                >
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>值班工资</span
                ><span>{{ salaryPart.dailyDuty ? salaryPart.dailyDuty : 0 }}元</span>
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>其他支出</span
                ><span>{{ salaryPart.other ? salaryPart.other.toFixed(2) : 0 }}元</span>
              </div>
            </el-alert>
          </el-card>

          <el-card style="flex: 1">
            <template #header>
              <div class="card-header">
                <span>管理工资</span>
                <el-button class="button" text>Operation button</el-button>
              </div>
            </template>
            <el-alert type="success" :closable="false"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 16px;
                  align-items: center;
                "
              >
                <span>管理人员</span> <span>管理职位</span> <span>本月工资</span>
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>赵天志</span> <span>店长</span> <span>{{ salaryPart.gymManager }}元</span>
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>余海峡</span> <span>会籍部部长</span>
                <span>{{ salaryPart.membership }}元</span>
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>黄拓森</span> <span>财务部部长</span>
                <span>{{ salaryPart.finManager }}元</span>
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>黄飞杰</span> <span>技术部部长</span>
                <span>{{ salaryPart.techManager }}元</span>
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>何林旭</span> <span>私教部部长</span>
                <span>{{ salaryPart.trainerManager }}元</span>
              </div>
            </el-alert>
            <el-alert type="warning" :closable="false" class="managePart"
              ><div
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 360px;
                  font-size: 13px;
                  align-items: center;
                "
              >
                <span>赵天志</span> <span>宣传部部长</span>
                <span>{{ salaryPart.promoManager }}元</span>
              </div>
            </el-alert>
          </el-card>
        </div>

        <div class="staffSalary">
          <el-card style="height: 100%">
            <el-table :data="salaryPart.staffSalary" border style="width: 100%; height: 250px">
              <el-table-column prop="staff" label="会籍姓名" header-align="center" align="center" />
              <el-table-column
                prop="performance"
                label="本月业绩"
                header-align="center"
                align="center"
              />
              <el-table-column
                prop="ratio"
                label="本月提成额度"
                header-align="center"
                align="center"
              />
              <el-table-column
                prop="salary"
                label="本月工资"
                header-align="center"
                align="center"
              /> </el-table
          ></el-card>
        </div>
        <div class="staffSalary">
          <el-card>
            <el-table :data="salaryPart.dutyAll" border style="width: 100%; height: 250px">
              <el-table-column
                prop="dutyName"
                label="值班姓名"
                header-align="center"
                align="center"
              />
              <el-table-column
                prop="dutyAll"
                label="本次工时"
                header-align="center"
                align="center"
              />
              <el-table-column label="本次工资" header-align="center" align="center">
                <template #default="scope">
                  <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #reference>
                      <el-tag style="font-size: 16px" type="warning"
                        >{{ scope.row.dutyAll * 10 }}元</el-tag
                      >
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-dialog>
      <template #header>
        <div class="card-header">
          <span>数据表盘</span>
          <div class="block">
            <el-date-picker
              v-model="dashboardDate"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </div>

          <el-button class="button" text @click="salaryTable = true">获取总支出部分</el-button>
        </div>
      </template>
      <el-row :gutter="18">
        <el-col :span="7">
          <el-card style="height: 390px; margin-bottom: 18px">
            <el-row>
              <el-col :span="6" :offset="4">
                <el-statistic title="总营收 totalRevenue" :value="dashboardData.revenue">
                  <template #suffix>
                    <el-icon style="vertical-align: -0.125em">
                      <ChatLineRound />
                    </el-icon>
                  </template>
                </el-statistic>
                <div style="height: 5px; background-color: green"></div>
              </el-col>
              <el-col :span="6" :offset="4">
                <el-statistic title="总支出 totalExpense" :value="finalExpense">
                  <template #suffix>
                    <el-icon style="vertical-align: -0.125em">
                      <ChatLineRound />
                    </el-icon>
                  </template>
                </el-statistic>
                <div style="height: 5px; background-color: red"></div>
              </el-col>
            </el-row>
            <v-chart :option="option" style="height: 260px; width: 100%"> </v-chart>
          </el-card>
          <el-card style="height: 280px">
            <v-chart :option="option3" style="height: 260px; width: 100%"> </v-chart>
          </el-card>
        </el-col>
        <el-col :span="17">
          <el-card style="height: 390px; margin-bottom: 18px">
            <v-chart :option="option2" style="height: 360px; width: 100%"> </v-chart>
          </el-card>
          <el-row :gutter="18">
            <el-col :span="12">
              <el-card style="height: 280px">
                <v-chart :option="option1" style="height: 260px; width: 100%"> </v-chart> </el-card
            ></el-col>
            <el-col :span="12"
              ><el-card style="height: 280px">
                <div style="height: 20px">
                  <span style="font-size: 8px">{{
                    dashboardData.perCard ? dashboardData.perCard : 0
                  }}</span>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div>
                      <div class="applyNum">
                        {{ dashboardData.termCard ? dashboardData.termCard : 0 }}
                      </div>
                      <el-progress type="circle" :percentage="78" status="success" />
                      <p>本月学期卡</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <div class="applyNum">
                        {{ dashboardData.monthCard ? dashboardData.monthCard : 0 }}
                      </div>
                      <el-progress type="circle" :percentage="78" />
                      <p>本月月卡</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <div class="applyNum">
                        {{ dashboardData.seasonCard ? dashboardData.seasonCard : 0 }}
                      </div>
                      <el-progress type="circle" :percentage="78" status="warning" />
                      <p>本月季卡</p>
                    </div>
                  </el-col>
                </el-row>
              </el-card></el-col
            >
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch, reactive } from 'vue'
//引入echarst
// 引如vue-echarts
import * as echarts from 'echarts'
import {
  CircleCloseFilled,
  UploadFilled,
  QuestionFilled,
  StarFilled,
  ChatLineRound
} from '@element-plus/icons-vue'
import request from '@/common/request'

// 工资表

const salaryTable = ref(false)

//私教部分和值班部分
const privateSalary = ref(0)
const dutySalary = ref(0)
const finalExpense = computed(() => {
  return Number(privateSalary.value) + Number(dutySalary.value) + salaryPart.allExpense
})

// dashboard数据
const dashboardDate = ref('')
const dashboardData = reactive({})
//日期转换

const formatDate = (orginalDate) => {
  const date = new Date(orginalDate)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份是从 0 开始的
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

//echarts部分数据定义
//左上角:环形图
const option = reactive({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical', // 设置图例垂直排列
    left: 'right', // 将图例放置在右边
    top: '44', // 纵向居中
    itemHeight: 20
  },
  series: [
    {
      center: ['50%', '55%'],
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 500, name: '办卡营收' },
        { value: 500, name: '私教营收' },
        { value: 580, name: '其他营收' },
        { value: 484, name: '总支出' }
      ]
    }
  ]
})

//上右边:组合图
const option2 = reactive({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  dataZoom: [
    {
      type: 'slider', // 表示使用滑块形式的数据区域缩放
      xAxisIndex: 0, // 表示这个 dataZoom 组件控制第一个 xAxis
      start: 0, // 数据窗口范围的起始百分比, 表示从10%开始
      end: 100 // 数据窗口范围的结束百分比, 表示到60%结束
    }
  ],
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['办卡营收', '私教营收', '总营收']
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '营收',
      min: 0,
      max: 120000,
      interval: 20000,
      axisLabel: {
        formatter: '{value} 元'
      }
    },
    {
      type: 'value',
      name: '总营收',
      min: 0,
      max: 120000,
      interval: 20000,
      axisLabel: {
        formatter: '{value} 元'
      }
    }
  ],
  series: [
    {
      name: '办卡营收',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 元'
        }
      },
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: '私教营收',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 元'
        }
      },
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: '总营收',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 元'
        }
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
})

//下边第二个：热力图

function getVirtualData(year, month) {
  const date = +echarts.time.parse(`${year}-${month}-01`)
  const end = +echarts.time.parse(`${year}-${month + 1}-01`)
  const dayTime = 3600 * 24 * 1000
  const data = []
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 80000)
    ])
  }
  return data
}

const option1 = reactive({
  title: {
    top: 5,
    left: 'center',
    text: '当月营收每日金额'
  },
  tooltip: {
    formatter: function (params) {
      // params是一个对象，其中包含了悬浮的单元格的数据
      // data的结构通常是[value, date]，具体结构取决于你的数据
      const value = params.value[1] // 假设数据值在数组的第二个位置
      const date = params.value[0] // 假设日期在数组的第一个位置
      // 返回你想要显示的字符串
      return `日期: ${date}<br/>数据: ${value}`
    }
  },
  visualMap: {
    min: 0,
    max: 80000,
    type: 'piecewise',
    splitNumber: 4,
    orient: 'horizontal',
    left: 'center',
    top: 200,
    itemGap: 6
  },
  calendar: {
    top: 70,
    left: 30,
    right: 30,
    cellSize: ['auto', 16],
    range: '2016-06',
    itemStyle: {
      borderWidth: 0.5
    },
    yearLabel: { show: false },
    dayLabel: {
      show: true,
      firstDay: 1, // 设定一周从星期一开始
      nameMap: ['日', '一', '二', '三', '四', '五', '六']
    }, // 显示星期文本，使用中文
    monthLabel: {
      show: true,
      nameMap: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]
    } // 显示月份文本
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: getVirtualData('2016', 6)
  }
})

// 左下角
const option3 = reactive({
  legend: {
    data: ['上月份数据', '本月份数据']
  },
  radar: {
    // shape: 'circle',
    radius: '60%',
    indicator: [
      { name: '办卡营收' },
      { name: '报销总金额' },
      { name: '私教营收' },
      { name: '办卡提成' },
      { name: '会籍值班工资' },
      { name: '办卡人数' }
    ]
  },
  series: [
    {
      name: '上月份 vs 本月份',
      type: 'radar',
      data: [
        {
          value: [500, 500, 500, 500, 500, 500],
          name: '上月份数据'
        },
        {
          value: [500, 500, 500, 500, 500, 500],
          name: '本月份数据'
        }
      ]
    }
  ]
})

//接口都写在这里

const getAllData = (startDate, endDate) => {
  request.get(`dashboard/getRecentData/?startDate=${startDate}&endDate=${endDate}`).then((res) => {
    if (res.code === '200') {
      Object.assign(dashboardData, res.data)
      console.log(res.data)
      option2.xAxis[0].data = dashboardData.datelist
      option2.series[0].data = dashboardData.combineChartApply
      option2.series[1].data = dashboardData.combineChartPri
      option2.series[2].data = dashboardData.combineAll
      option3.series[0].data[0].value = dashboardData.vadarData

      option.series[0].data = [
        { value: dashboardData.applyCard, name: '办卡营收' },
        { value: dashboardData.privateCard, name: '私教营收' },
        { value: 580, name: '其他营收' },
        { value: 484, name: '总支出' }
      ]

      option1.calendar.range = [startDate, endDate]
      option1.series.data = dashboardData.hotList
    }
  })
}

//
const salaryPart = reactive({})
salaryPart.allExpense = 0
const allsalaryTable = (startDate, endDate) => {
  request.get(`dashboard/salaryPart/?startDate=${startDate}&&endDate=${endDate}`).then((res) => {
    if (res.code === '200') {
      Object.assign(salaryPart, res.data)
      console.log(salaryPart)
    }
  })
}

// 监听器部分：
watch(
  () => dashboardDate.value,
  (newValue) => {
    const startDate = formatDate(newValue[0])
    const endDate = formatDate(newValue[1])
    getAllData(startDate, endDate)
    allsalaryTable(startDate, endDate)
  }
)
</script>

<style>
.wholeLayout {
  height: calc(100vh - 125px);
}

.topCharts {
  background-color: #5e5e5e;
  height: 45px;
}

.middleCharts {
  background-color: aqua;
  height: 330px;
}

.bottomCharts {
  height: 420px;
  display: flex;
  padding: 0 80px;
  gap: 20px; /* 在子项之间设置10px的间隔 */
}

.managePart {
  margin-top: 10px;
  text-align: center;
}

.el-card__header {
  padding: 10px;
}

/*  */
.wholeLayout > .el-card__body {
  padding-top: 9px !important;
}

.el-col {
  text-align: center;
}

.applyNum {
  font-size: 45px;
}

.staffSalary {
  margin-top: 10px;
  height: 300px;
  padding: 0 80px;
}
</style>

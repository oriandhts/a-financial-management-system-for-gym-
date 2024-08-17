<template>
  <div>
    <el-card>
      <div class="dataPresent">
        <el-card class="dataCard">
          <template #header>
            <div class="card-header">
              <span>本月预计总报销金额</span>
              <el-icon><QuestionFilled /></el-icon>
            </div>
          </template>
          <div class="textForCharts">
            <span>{{ rankTen.allAmount }}</span>
          </div>
          <div>
            <div class="footer-item">
              <span>相较上周金额变化:</span>
              <span class="green"> 24% </span>
            </div>

            <div class="footer-item">
              <span>相较上周涨跌幅度:</span>
              <span class="red"> 24% </span>
            </div>

            <el-divider>
              <span>My wishes</span>
              <el-icon><star-filled /></el-icon>
            </el-divider>
          </div>
        </el-card>
        <el-card class="dataCard">
          <template #header>
            <div class="card-header">
              <span>本月待报销金额</span>
              <el-icon><QuestionFilled /></el-icon>
            </div>
          </template>
          <div class="textForCharts">
            <span>{{ rankTen.verifyAmount ? rankTen.verifyAmount : 0 }}</span>
          </div>
          <div>
            <v-chart
              :option="option_column"
              style="height: 80px; width: 100%"
              :key="chartKey"
            ></v-chart>
            <el-divider>
              <span>按金额排序</span>
              <el-icon><star-filled /></el-icon>
            </el-divider>
          </div>
        </el-card>
        <el-card class="dataCard">
          <template #header>
            <div class="card-header">
              <span>本月已报销金额</span>
              <el-icon><QuestionFilled /></el-icon>
            </div>
          </template>
          <div class="textForCharts">
            <span>{{ rankTen.successAmount }}</span>
          </div>
          <div>
            <v-chart
              :option="option_bar"
              style="height: 80px; width: 100%"
              :key="chartKey"
            ></v-chart>

            <el-divider>
              <span>My wishes</span>
              <el-icon><star-filled /></el-icon>
            </el-divider>
          </div>
        </el-card>
        <el-card class="dataCard">
          <template #header>
            <div class="card-header">
              <span>本月报销占总营收比例</span>
              <el-icon><QuestionFilled /></el-icon>
            </div>
          </template>
          <div class="textForCharts">
            <span>13.7%</span>
          </div>
          <div style="height: 22px; margin: 30px 10px">
            <el-progress :text-inside="true" :stroke-width="16" :percentage="80" status="success" />
          </div>
          <div>
            <el-divider>
              <span>My wishes</span>
              <el-icon><star-filled /></el-icon>
            </el-divider>
          </div>
        </el-card>
      </div>
      <div class="addReimburse">
        <el-card class="addCard">
          <div class="addCardBody">
            <div class="addLeft">
              <div style="display: flex">
                <el-tabs v-model="activeTab" @tab-change="handleTabChange" style="flex: 1">
                  <el-tab-pane label="审核中" name="verifying"></el-tab-pane>
                  <el-tab-pane label="审核成功" name="success"></el-tab-pane>
                  <el-tab-pane label="问题账单" name="question"></el-tab-pane>
                  <el-tab-pane label="查看全部" name="all"></el-tab-pane>
                </el-tabs>
                <div><el-button type="success" @click="drawerControl">新增报销</el-button></div>
                <!-- 新建报销信息填写部分:el-drawer -->
                <el-drawer v-model="drawerVisable" :show-close="false">
                  <template #header="{ close, titleId, titleClass }">
                    <h4 :id="titleId" :class="titleClass">新建报销填写表</h4>
                    <el-button type="danger" @click="close">
                      <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
                      Close
                    </el-button>
                  </template>
                  <!-- 报销信息表Content部分 -->
                  <el-form :model="formReim" label-width="120px">
                    <el-form-item label="报销申请人">
                      <el-select v-model="formReim.buyer" placeholder="选择报销申请人">
                        <el-option label="黄拓森" value="黄拓森" />
                        <el-option label="赵天志" value="赵天志" />
                        <el-option label="余海峡" value="余海峡" />
                        <el-option label="黄飞杰" value="黄飞杰" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="报销日期">
                      <el-date-picker
                        v-model="formReim.buyDate"
                        type="date"
                        placeholder="Pick a day"
                        value-format="YYYY-MM-DD"
                        format="YYYY/MM/DD"
                      />
                    </el-form-item>
                    <el-form-item label="报销金额">
                      <el-input v-model="formReim.buyAmount" style="width: 220px" /> 元
                    </el-form-item>
                    <el-form-item label="采购事宜">
                      <el-input v-model="formReim.buyType" />
                    </el-form-item>
                    <el-form-item label="相关报销备注">
                      <el-input v-model="formReim.reimRemarks" type="textarea" :row="10" />
                    </el-form-item>
                    <el-form-item label="证明材料">
                      <el-upload
                        class="upload-demo"
                        drag
                        multiple
                        action="http://106.14.155.164:5770/file/uploads"
                        method="post"
                        :on-success="uploadSuccess"
                        list-type="picture"
                        :file-list="fileList"
                      >
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">拖拽文件或者 <em>点击组件上传</em></div>
                        <template #tip>
                          <div class="el-upload__tip">请一次只上传一张报销图片~</div>
                        </template>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <div style="flex: auto">
                      <el-button @click="cancelreimClick">cancel</el-button>
                      <el-button type="primary" @click="confirmreimClick">confirm</el-button>
                    </div>
                  </template>
                </el-drawer>
                <!-- 修改报销信息填写部分:el-drawer -->
                <el-drawer v-model="drawerEdit" :show-close="false">
                  <template #header="{ close, titleId, titleClass }">
                    <h4 :id="titleId" :class="titleClass">新建报销填写表</h4>
                    <el-button type="danger" @click="close">
                      <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
                      Close
                    </el-button>
                  </template>
                  <!-- 报销信息表Content部分 -->
                  <el-form :model="formReim" label-width="120px">
                    <el-form-item label="报销申请人">
                      <el-select v-model="formReim.buyer" placeholder="选择报销申请人">
                        <el-option label="黄拓森" value="黄拓森" />
                        <el-option label="赵天志" value="赵天志" />
                        <el-option label="余海峡" value="余海峡" />
                        <el-option label="黄飞杰" value="黄飞杰" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="报销日期">
                      <el-date-picker
                        v-model="formReim.buyDate"
                        type="date"
                        placeholder="Pick a day"
                        value-format="YYYY-MM-DD"
                        format="YYYY/MM/DD"
                      />
                    </el-form-item>
                    <el-form-item label="报销金额">
                      <el-input v-model="formReim.buyAmount" />
                    </el-form-item>
                    <el-form-item label="采购事宜">
                      <el-input v-model="formReim.buyType" />
                    </el-form-item>
                    <el-form-item label="相关报销备注">
                      <el-input v-model="formReim.reimRemarks" type="textarea" :row="10" />
                    </el-form-item>
                    <el-form-item label="证明材料">
                      <el-upload
                        class="upload-demo"
                        drag
                        multiple
                        action="http://106.14.155.164:5770/file/uploads"
                        method="post"
                        :on-success="uploadSuccess"
                        list-type="picture"
                      >
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">拖拽文件或者 <em>点击组件上传</em></div>
                        <template #tip>
                          <div class="el-upload__tip">jpg/png files with a size less than 10Mb</div>
                        </template>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <div style="flex: auto">
                      <el-button @click="cancelreimEdit">cancel</el-button>
                      <el-button type="primary" @click="editReimburse">confirm</el-button>
                    </div>
                  </template>
                </el-drawer>
              </div>
              <!-- 报销记录表部分 -->
              <el-table :data="filterTableData" style="width: 100%" max-height="430">
                <el-table-column label="采购时间" prop="buyDate" />
                <el-table-column label="采购事宜" prop="buyType" />
                <el-table-column label="报销金额" prop="buyAmount" />
                <el-table-column label="报销备注" prop="reimRemarks" />
                <el-table-column label="报销人" prop="buyer" />
                <el-table-column label="报销状态" prop="verifyType" />
                <el-table-column align="right">
                  <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                  </template>
                  <template #default="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)"
                      :disabled="scope.row.verifyType === 'success' ? true : false"
                      >{{
                        scope.row.verifyType === 'question' ? '重新提交' : '修改报销'
                      }}</el-button
                    >
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      :disabled="scope.row.verifyType === 'success' ? true : false"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 报销表右边部分 -->
            <div class="addRight">
              <div class="addRightTitle">大额报销</div>
              <el-divider style="border-width: 2px">
                <span>OrderBy</span>
              </el-divider>
              <p v-for="(item, index) in rankTen.topTen" class="addRightOrder">
                <el-button
                  circle
                  size="small"
                  style="font-size: medium; font-weight: 700"
                  :type="index > 2 ? '' : 'info'"
                  >{{ index + 1 }}
                </el-button>
                <span>{{ item.buyType }}</span>
                <el-tag class="ml-2" :type="index > 2 ? 'success' : 'danger'"
                  >{{ item.buyAmount }}元</el-tag
                >
              </p>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import {
  CircleCloseFilled,
  UploadFilled,
  QuestionFilled,
  StarFilled
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '@/common/request'
// 引如vue-echarts
import 'echarts'

const props = defineProps({
  collapse: Boolean
})

const isCollapse = ref(true)
const chartKey = ref(0)

// 用来存放所选的Tab
const activeTab = ref('verifying')

const handleTabChange = (tab) => {
  if (tab === 'all') {
    selectAll()
  } else {
    request.get(`reimburse/selectByTab/${tab}`).then((res) => {
      tableDataReim.splice(0, tableDataReim.length, ...res.data)
    })
  }
}

//新建报销信息填写部分
const drawerVisable = ref(false)
const drawerEdit = ref(false)

const drawerControl = () => {
  drawerVisable.value = true
  Object.assign(formReim, {
    buyer: '',
    buyDate: '',
    buyAmount: '',
    buyType: '',
    reimRemarks: '',
    proof: '',
    verifyType: 'verifying'
  })
}

const formReim = reactive({
  buyer: '',
  buyDate: '',
  buyAmount: '',
  buyType: '',
  reimRemarks: '',
  proof: '',
  verifyType: 'verifying'
})

const cancelreimClick = () => {
  drawerVisable.value = false
}

const cancelreimEdit = () => {
  drawerEdit.value = false
}

const confirmreimClick = () => {
  const data = JSON.stringify(formReim)
  activeTab.value = 'verifying'
  request.post('/reimburse/insert', data).then((res) => {
    if (res.code == '200') {
      ElMessage.success('成功记录此次报销!')
      drawerVisable.value = false
      queryReimburse('verifying')
      fileList.value = []
    } else {
      ElMessage.warning('本次插入有误请稍后重试！')
    }
  })
}

//报销数据表格部分

const search = ref('')
const filterTableData = computed(() =>
  tableDataReim.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleEdit = (index, row) => {
  drawerEdit.value = true
  Object.assign(formReim, row)
}
const handleDelete = (index, row) => {
  deleteReimburse(row.reimId, row.verifyType)
}

//上传文件部分
const uploadSuccess = (res) => {
  formReim.proof = res.data
}

const fileList = ref([])
// 渲染数据表部分
const tableDataReim = reactive([])

onMounted(() => {
  // 这里放置挂载后逻辑

  request.get('reimburse/selectByTab/verifying').then((res) => {
    if (res.code === '200') {
      tableDataReim.splice(0, tableDataReim.length, ...res.data)
    } else {
      ElMessage.error('渲染数据表有误,请询问技术人员！')
    }
  })

  renderData()
})

// vue-echarts部分
const option_column = reactive({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    show: false
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {
        color: 'rgb(154, 64, 238)'
      }
    }
  ]
})

const option_bar = reactive({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    boundaryGap: false,
    show: false
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        // 在这里设置柱状图的颜色
        color: 'rgba(0, 136, 212, 0.7)' // 示例颜色
      }
    }
  ]
})

//排名前十部分

const rankTen = ref('')
const renderData = () => {
  //排名前十
  request.get('reimburse/selectTopTen').then((res) => {
    if (res.code === '200') {
      rankTen.value = res.data
    }
  })
}

// 监听器部分：
watch(
  () => props.collapse,
  (newValue, oldValue) => {
    isCollapse.value = newValue
    chartKey.value++
  }
)

//接口部分放这里

const deleteReimburse = (reimId, verifyType) => {
  request.get(`reimburse/deleteReim/?reimId=${reimId}`).then((res) => {
    if (res.code === '200') {
      ElMessage.success('成功删除！')
      if (activeTab.value !== 'all') {
        queryReimburse(activeTab.value)
      } else {
        selectAll()
      }
    }
  })
}

const queryReimburse = (status) => {
  request.get(`reimburse/selectByTab/${status}`).then((res) => {
    if (res.code === '200') {
      tableDataReim.splice(0, tableDataReim.length, ...res.data)
    } else {
      ElMessage.error('渲染数据表有误,请询问技术人员！')
    }
  })
}

const editReimburse = () => {
  const myVerify = formReim.verifyType
  formReim.verifyType = 'verifying'
  const data = JSON.stringify(formReim)
  request.post(`reimburse/editReim/?reimId=${formReim.reimId}`, data).then((res) => {
    if (res.code === '200') {
      ElMessage.success('成功编辑！')
      drawerEdit.value = false
      queryReimburse(myVerify)
    }
  })
}

//筛选所有Tab
const selectAll = () => {
  request.get('reimburse/selectReim').then((res) => {
    if (res.code === '200') {
      tableDataReim.splice(0, tableDataReim.length, ...res.data)
    } else {
      ElMessage.error('渲染数据表有误,请询问技术人员！')
    }
  })
}
</script>
<style>
.dataPresent {
  display: flex;
  gap: 20px;
}
.dataPresent > .dataCard {
  flex: 1;
  height: 200px;
}

.addReimburse {
  margin-top: 20px;
  height: 510px;
}

.addReimburse > .addCard {
  height: 100%;
}

.addCardBody {
  height: 100%;
  width: 1510px;
  display: flex;
  gap: 10px;
}

.addLeft {
  height: 100%;
  flex: 4;
}

.addRight {
  height: 100%;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
}
.card-header > span {
  color: rgb(114, 114, 114);
  font-size: 24px;
  font-weight: 600;
}

.dataCard .el-card__body {
  padding: 0px !important;
}

.dataCard .el-card__header {
  padding-bottom: 9px !important;
}

.textForCharts {
  padding-top: 5px;
  padding-left: calc(var(--el-card-padding) - 2px);
  font-size: 28px;
  font-weight: 500;
}

.el-divider {
  margin: 2px 0px !important;
}

.addRightTitle {
  height: 36px;
  font-weight: 600;
  font-size: 18px;
}

.addRightOrder {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}

.footer-item {
  margin: 10.8px 16px;
  color: rgb(150, 150, 150);
}
</style>

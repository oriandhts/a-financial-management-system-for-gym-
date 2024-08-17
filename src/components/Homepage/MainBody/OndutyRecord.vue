<template>
  <div>
    <el-card style="margin-bottom: 15px">
      <template #header>
        <div class="card-header">
          <span>每日工时记录</span>
          <el-button class="button" text>其他功能</el-button>
        </div>
      </template>
      <div>
        <el-form :model="form" label-width="120px">
          <el-form-item label="值班人员">
            <el-select v-model="form.dutyName" placeholder="选择值班人员">
              <el-option v-for="staff in allStaff" :label="staff" :value="staff" />
            </el-select>
          </el-form-item>
          <el-form-item label="值班时间">
            <el-checkbox-group v-model="form.dutyTime">
              <el-checkbox label="9:00 - 12:00" name="type" />
              <el-checkbox label="12:00 - 14:00" name="type" />
              <el-checkbox label="14:00 - 16:00" name="type" />
              <el-checkbox label="16:00 - 18:00" name="type" />
              <el-checkbox label="18:00 - 20:00" name="type" />
              <el-checkbox label="20:00 - 22:30" name="type" />
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="销售情况">
            <el-input v-model="form.dutyDesc" type="textarea" />
          </el-form-item>
          <el-form-item label="是否已填入系统">
            <el-radio-group v-model="form.fillIn">
              <el-radio label="是" name="是" />
              <el-radio label="否" name="否" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认登记</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Date" width="250" header-align="center" align="center">
          <template #default="scope">
            <div>
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.fillTime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="值班人员" width="300px">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #reference>
                <el-tag style="font-size: 16px">{{ scope.row.dutyName }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="值班时间" width="500px">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #reference>
                <el-tag style="font-size: 16px" type="warning">{{ scope.row.dutyTime }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="销售情况" width="250px" prop="dutyDesc"> </el-table-column>
        <el-table-column label="工时" width="100px" prop="dutyCount"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped></style>

<script setup>
import { Timer } from '@element-plus/icons-vue'
import { reactive, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/common/request'
const form = reactive({
  dutyName: '',
  dutyTime: [],
  dutyDesc: '',
  fillIn: '',
  dutyCount: 0
})

onMounted(() => {
  //获取到所有的工作人员
  getAllName()

  //获取所有记录
  selectAllduty()
})

const allStaff = ref([])
//获取所有工作人员
const getAllName = () => {
  request.get('login/selectAllName').then((res) => {
    if (res.code === '200') {
      allStaff.value = res.data
    } else {
      ElMessage.error('未登录！')
    }
  })
}

const onSubmit = () => {
  let sum = 0
  for (const element of form.dutyTime) {
    console.log(element, 'element')
    if (element[0] == '9') {
      sum += 3
    } else if (element[0] == '1') {
      sum += 2
    } else if (element[0] == '2') {
      sum += 2.5
    } else {
      sum += 0
    }
  }
  form.dutyTime = form.dutyTime.join(' ')
  console.log(sum, form.dutyCount)
  form.dutyCount = sum
  console.log(sum, form.dutyCount)
  const data = JSON.stringify(form)
  console.log(sum, form.dutyCount, data)
  request.post('login/insertDuty', data).then((res) => {
    if (res.code === '200') {
      Object.assign(form, {
        dutyName: '',
        dutyTime: [],
        dutyDesc: '',
        fillIn: '',
        dutyCount: 0
      })
      ElMessage.success('成功插入数据!')
      selectAllduty()
    } else {
      ElMessage.error('打卡有误！请重试！')
    }
  })

  console.log('form', form)
}

const handleDelete = (index, row) => {
  deleteDuty(row.dutyId, row.dutyName)
}

const tableData = ref([])

const selectAllduty = () => {
  request.get('login/selectDuty').then((res) => {
    if (res.code === '200') {
      tableData.value = res.data
    } else if (res.code === '401') {
      // 响应状态码为 401 时跳转到登录页面
      router.push('/login')
    } else {
      ElMessage.error('添加值班记录数据有误！')
    }
  })
}

const deleteDuty = (dutyId, dutyName) => {
  request.get(`login/deleteDuty/${dutyId}`).then((res) => {
    if (res.code === '200') {
      ElMessage.success(`成功删除成员${dutyName}的数据`)
      selectAllduty()
    } else {
      ElMessage.error(`删除会员${dutyName}的数据失败！请询问相关技术人员！`)
    }
  })
}
</script>

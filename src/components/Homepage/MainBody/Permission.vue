<template>
  <div>
    <el-card>
      <!-- 用户账号管理部分 -->
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :lg="14">
          <el-card style="height: 354px">
            <template #header>
              <div class="card-header">
                <span>用户权限分配</span>
                <el-button class="button" text @click="centerDialogVisible = true"
                  >总支出其余部分</el-button
                >
                <!-- 创建新的用户 -->
                <el-dialog v-model="centerDialogVisible" title="新建用户表" width="30%" center>
                  <el-form :model="userForm" label-width="120px">
                    <el-form-item label="用户姓名">
                      <el-input v-model="userForm.name" />
                    </el-form-item>
                    <el-form-item label="用户账号">
                      <el-input v-model="userForm.username" />
                    </el-form-item>
                    <el-form-item label="用户密码">
                      <el-input v-model="userForm.password" />
                    </el-form-item>
                    <el-form-item label="用户权限">
                      <el-radio-group v-model="userForm.role">
                        <el-radio label="administrator" />
                        <el-radio label="stakeholder" />
                        <el-radio label="commonStaff" />
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="centerDialogVisible = false">Cancel</el-button>
                      <el-button type="primary" @click="createUser"> Confirm </el-button>
                    </span>
                  </template>
                </el-dialog>
                <!-- 编辑和删除信息的对话框 -->
                <!-- 编辑信息对话框 -->
                <el-dialog v-model="editDialog" title="修改用户表" width="30%" center>
                  <el-form :model="editForm" label-width="120px">
                    <el-form-item label="用户姓名">
                      <el-input v-model="editForm.name" />
                    </el-form-item>
                    <el-form-item label="用户账号">
                      <el-input v-model="editForm.username" />
                    </el-form-item>
                    <el-form-item label="用户密码">
                      <el-input v-model="editForm.password" />
                    </el-form-item>
                    <el-form-item label="用户权限">
                      <el-radio-group v-model="editForm.role">
                        <el-radio label="administrator" />
                        <el-radio label="stakeholder" />
                        <el-radio label="commonStaff" />
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="editDialog = false">Cancel</el-button>
                      <el-button type="primary" @click="editUser"> Confirm </el-button>
                    </span>
                  </template>
                </el-dialog>

                <!-- 新的表格 -->
                <el-dialog v-model="editDialog1" title="编辑用户权限" width="75%" center>
                  <el-table :data="filterTableDataAll" style="width: 100%" max-height="340px">
                    <el-table-column label="日期" prop="date" width="170" />
                    <el-table-column label="会员姓名" prop="memberName" width="80" />
                    <el-table-column label="电话号码" prop="phoneNumber" width="120" />
                    <el-table-column label="卡种" prop="cardType" width="80" />
                    <el-table-column label="金额" prop="price" width="80" />
                    <el-table-column label="团购优惠" prop="groupPurchase" width="80" />
                    <el-table-column label="办理人" prop="staff" width="80"> </el-table-column>
                    <el-table-column label="最后金额" prop="finalPrice" width="80" />
                    <el-table-column align="right">
                      <template #header>
                        <el-input v-model="searchAll" size="small" placeholder="Type to search" />
                      </template>
                      <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                          >Edit</el-button
                        >
                        <el-button
                          size="small"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)"
                          >Delete
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="editDialog1 = false">Cancel</el-button>
                      <el-button type="primary" @click="editUser"> Confirm </el-button>
                    </span>
                  </template>
                </el-dialog>
              </div>
            </template>
            <el-table :data="permissionTable" style="width: 100%; height: 250px">
              <el-table-column label="创建日期" prop="date" width="80" header-align="center">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <el-icon><timer /></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="用户姓名"
                prop="name"
                width="80"
                header-align="center"
                align="center"
              ></el-table-column>
              <el-table-column
                label="用户账号"
                prop="username"
                width="120"
                header-align="center"
                align="center"
              ></el-table-column>
              <el-table-column
                label="用户密码"
                width="120"
                prop="password"
                header-align="center"
                align="center"
              ></el-table-column>
              <el-table-column
                label="用户权限"
                prop="role"
                width="120"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column label="权限操作" header-align="center" align="center">
                <template #default="scope">
                  <el-button size="small" @click="handleEdita(scope.row)" type="success"
                    >Edit</el-button
                  >
                  <el-button size="small" @click="handleSuspend(scope.row)" type="info">{{
                    scope.row.suspend === 0 ? 'suspend' : 'unsuspend'
                  }}</el-button>
                  <el-button size="small" type="danger" @click="handleDeletea(index, scope.row)"
                    >Delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card></el-col
        >

        <!-- 报销处理部分 -->
        <el-dialog v-model="dialogForRiem" title="报销内容详情">
          <el-card style="height: 450px">
            <div style="display: flex; height: 400px">
              <div style="flex: 1">
                <p>{{ reimburseDeal.buyer }}</p>
                <p>{{ reimburseDeal.buyDate }}</p>
                <p>{{ reimburseDeal.buyType }}</p>
                <p>{{ reimburseDeal.buyAmount }}</p>
                <p>{{ reimburseDeal.reimRemarks }}</p>
              </div>

              <div style="flex: 1">
                <el-image
                  :src="imageUrl"
                  fit="fill"
                  style="width: 100%; height: 100%"
                  :preview-src-list="imageUrlPre"
                />
              </div>
            </div>
          </el-card>
        </el-dialog>
        <el-col :lg="10"
          ><el-card>
            <template #header>
              <div class="card-header">
                <span>报销处理区域</span>
                <el-dialog v-model="dialogVisiblePrice" title="价格调整" width="500">
                  <el-form :model="myprice" label-width="120px">
                    <el-form-item label="学期卡">
                      <el-input v-model="myprice.term" />
                    </el-form-item>
                    <el-form-item label="季卡">
                      <el-input v-model="myprice.season" />
                    </el-form-item>
                    <el-form-item label="月卡">
                      <el-input v-model="myprice.month" />
                    </el-form-item>
                    <el-form-item label="次卡">
                      <el-input v-model="myprice.per" />
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <div class="dialog-footer">
                      <el-button @click="dialogVisiblePrice = false">Cancel</el-button>
                      <el-button type="primary" @click="priceModify"> Confirm </el-button>
                    </div>
                  </template>
                </el-dialog>
                <el-button class="button" text @click="controlAllCard">创建新用户</el-button>
              </div>
            </template>
            <div class="reimburse">
              <p v-for="(reim, index) in waitToDeal" class="newItem">
                <el-button circle size="small" style="font-size: medium; font-weight: 700"
                  >{{ index }}
                </el-button>
                <el-badge :value="1" class="item">
                  <el-button style="width: 450px" @click="reimburseConfirm(reim)">{{
                    `${reim.buyer}于${reim.buyDate}需要报销${reim.buyAmount}元`
                  }}</el-button>
                </el-badge>
                <el-button style="width: 45px" type="success" @click="finishReim(reim)"
                  >报销
                </el-button>
                <el-button style="width: 45px" type="danger" @click="questionReim(reim)"
                  >问题
                </el-button>
              </p>
            </div>
          </el-card></el-col
        >
      </el-row>
      <!-- 办卡表 -->
      <el-dialog v-model="editFormVisible" title="修改办卡信息">
        <el-form v-model="applyCardForm">
          <el-form-item label="会员姓名">
            <el-input v-model="applyCardForm.memberName" style="width: 240px" />
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="applyCardForm.phoneNumber" style="width: 240px" />
          </el-form-item>
          <el-form-item label="所购卡种" @change="cardTypeChange">
            <el-radio-group v-model="applyCardForm.cardType" class="ml-W4">
              <el-radio label="季卡" />
              <el-radio label="学期卡" />
              <el-radio label="月卡" />
              <el-radio label="次卡" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="卡种价格">
            <el-tag type="danger">{{ applyCardForm.price }}</el-tag>
          </el-form-item>
          <el-form-item label="团购优惠">
            <el-input v-model="applyCardForm.groupPurchase" style="width: 240px" />
            <span>元</span>
          </el-form-item>
          <el-form-item label="办理人员">
            <el-select v-model="applyCardForm.staff" placeholder="选择办理人员">
              <el-option v-for="staff in allStaff" :label="staff" :value="staff" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="applyCardForm.remarks" type="textarea" style="width: 540px" />
          </el-form-item>
          <el-tag class="ml-2" type="success">最终价格</el-tag>
          <el-tag class="ml-2" type="success">{{
            applyCardForm.price - applyCardForm.groupPurchase
          }}</el-tag>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="submitEditForm"> Confirm </el-button>
          </span>
        </template>
      </el-dialog>
      <el-row :gutter="10" style="height: 368px">
        <el-col :lg="16">
          <el-card>
            <el-table :data="filterTableData" style="width: 100%" max-height="340px">
              <el-table-column label="日期" prop="date" width="170" />
              <el-table-column label="会员姓名" prop="memberName" width="80" />
              <el-table-column label="电话号码" prop="phoneNumber" width="120" />
              <el-table-column label="卡种" prop="cardType" width="80" />
              <el-table-column label="金额" prop="price" width="80" />
              <el-table-column label="团购优惠" prop="groupPurchase" width="80" />
              <el-table-column label="办理人" prop="staff" width="80"> </el-table-column>
              <el-table-column label="最后金额" prop="finalPrice" width="80" />
              <el-table-column align="right">
                <template #header>
                  <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Delete
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :lg="8">
          <el-card>
            <el-table style="width: 100%; height: 260px" :data="privateAllData">
              <el-table-column
                label="办理日期"
                prop="tutorDate"
                header-align="center"
                align="center"
              />
              <el-table-column
                label="会员姓名"
                prop="privateName"
                header-align="center"
                align="center"
              />

              <el-table-column
                label="最后金额"
                prop="finalPriPrice"
                header-align="center"
                align="center"
              />
            </el-table>
          </el-card>
          <el-card>
            <el-pagination
              background
              layout="prev, pager, next"
              :default-page-size="everyCount"
              :page-count="pageCount"
              @update:current-page="changePage"
            />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { Timer } from '@element-plus/icons-vue'
import { reactive, ref, watch, onMounted, computed } from 'vue'
import request from '@/common/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatLocalDateTime } from '@/common/dateTime'
import { cardMatchPrice } from '@/Constant/applyCard'

//调整价格
const dialogVisiblePrice = ref(false)
const myprice = ref({
  term: '',
  month: '',
  per: '',
  season: ''
})
const newprice = ref({
  学期卡: '',
  月卡: '',
  次卡: '',
  季卡: ''
})
const priceModify = () => {
  dialogVisiblePrice.value = false
  newprice.value['学期卡'] = parseInt(myprice.value.term)
  newprice.value['月卡'] = parseInt(myprice.value.month)
  newprice.value['次卡'] = parseInt(myprice.value.per)
  newprice.value['季卡'] = parseInt(myprice.value.season)
  cardMatchPrice.value = newprice.value
}

//办卡表
const editFormVisible = ref(false)

// 权限管理表
const permissionTable = reactive([])
const centerDialogVisible = ref(false)
const userForm = reactive({
  name: '',
  username: '',
  password: '',
  role: 'commonStaff',
  suspend: 0
})

//编辑和删除权限信息
const editDialog = ref(false)
const editDialog1 = ref(false)

const editForm = ref({
  id: '',
  name: '',
  username: '',
  password: '',
  role: ''
})

const suspendForm = ref({
  suspend: ''
})

const handleEdita = (row) => {
  editDialog.value = true
  console.log('111')
  editForm.value = row
}

const handleEdit = (index, row) => {
  editFormVisible.value = true

  // date不进行修改
  row.date = ''
  Object.assign(applyCardForm, row)
}

const applyCardForm = reactive({
  memberName: '',
  phoneNumber: '',
  cardType: '学期卡',
  price: 488,
  groupPurchase: 0,
  staff: '',
  remarks: ''
})

// 修改提交的表单
const submitEditForm = () => {
  // 序列化提交的表单
  const data = JSON.stringify(applyCardForm)
  request.post('memberCard/editMember', data).then((res) => {
    if (res.code === '200') {
      ElMessage.success(`成功修改会员${applyCardForm.memberName}的数据!`)
      editFormVisible.value = false
      fetchApplyCard(1)
    } else {
      ElMessage.error(`修改会员${applyCardForm.memberName}的数据失败！请询问相关技术人员！`)
    }
  })
}

const handleDeletea = (index, row) => {
  ElMessageBox.confirm(`确定要删除用户名称为 “${row.name}” 的用户吗?`, 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      deleteUser(row.id).then((res) => {
        if (res.code === '200') {
          ElMessage({
            type: 'success',
            message: '成功删除用户！'
          })
          fetchUser()
        } else {
          ElMessage.error('删除用户失败,请联系相关技术人员！')
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除用户！'
      })
    })
}

const handleDelete = (index, row) => {
  const memberId = row.memberId
  request.get(`memberCard/deleteMember/${memberId}`).then((res) => {
    if (res.code === '200') {
      ElMessage.success(`成功删除会员${row.memberName}的数据`)
      fetchApplyCard(1)
      fetchAllApplyCard()
    } else {
      ElMessage.error(`删除会员${row.memberName}的数据失败！请询问相关技术人员！`)
    }
  })
}

const handleSuspend = (row) => {
  if (row.suspend === 0) {
    suspendForm.value = {
      ...row,
      suspend: 1
    }
  } else {
    suspendForm.value = {
      ...row,
      suspend: 0
    }
  }
  suspendUser(suspendForm.value)
}

const allStaff = ref('')

// 办卡

// onMounted 挂载成功后操作
onMounted(() => {
  // 这里放置挂载后逻辑

  //这里获取用户表
  fetchUser()

  //这里获取每日办卡表
  fetchApplyCard(1)

  //这里获取待报销部分
  fetchWaitReim()

  //这里获取私教数据
  selectAllPrivate()

  //获取所有办卡用户
  getAllName()
})

//报销处理区域部分
const waitToDeal = reactive([])
const dialogForRiem = ref(false)
const reimburseDeal = ref({})
const imageUrl = ref('')
const imageUrlPre = ref('')

const reimburseConfirm = (reimData) => {
  dialogForRiem.value = true
  reimburseDeal.value = reimData
  imageUrl.value = `http://106.14.155.164:5770${reimData.proof}`
  imageUrlPre.value = [`http://106.14.155.164:5770${reimData.proof}`]
}

//关于每日办卡管理表部分

const applyCard = reactive([])

const search = ref('')
const searchAll = ref('')

const filterTableData = computed(() =>
  applyCard.filter((data) => !search.value || data.memberName.includes(search.value))
)

const filterTableDataAll = computed(() =>
  applyCardAll.filter((data) => !searchAll.value || data.memberName.includes(searchAll.value))
)

// 分页器部分

const everyCount = ref(7)
const pageCount = ref(1)
const totalCount = ref(0)

const changePage = (pageNum) => {
  fetchApplyCard(pageNum)
}

// 各种接口,之后可以封装到一个api.js里面去

const createUser = async () => {
  const user = JSON.stringify(userForm)
  request.post('login/add', userForm).then((res) => {
    if (res.code === '200') {
      ElMessage.success('添加成功')
      centerDialogVisible.value = false
      fetchUser()
    }
  })
}
const fetchUser = () => {
  request.get('login/selectUser').then((res) => {
    if (res.code === '200') {
      permissionTable.splice(0, permissionTable.length, ...res.data)
    } else {
      ElMessage.error('渲染数据表有误,请询问技术人员！')
    }
  })
}

const editUser = () => {
  const data = JSON.stringify(editForm.value)
  request.post('login/editUser', data).then((res) => {
    if (res.code === '200') {
      editDialog.value = false
      ElMessage.success('修改权限成功！')
      fetchUser()
    } else {
      ElMessage.error('修改权限有误,请询问技术人员！')
    }
  })
}

const deleteUser = (id) => {
  return request.delete(`login/deleteUser/${id}`)
}

const suspendUser = (row) => {
  const data = JSON.stringify(row)
  request.post('login/suspendUser', data).then((res) => {
    if (res.code === '200') {
      if (row.suspend === 0) {
        ElMessage.success('用户已经被挂起！')
      } else {
        ElMessage.success('用户已经解挂！')
      }
      fetchUser()
    } else {
      ElMessage.error('修改权限有误,请询问技术人员！')
    }
  })
}

const fetchApplyCard = (value) => {
  request.get(`memberCard/selectAll/?count=${everyCount.value}&offset=${value}`).then((res) => {
    if (res.code === '200') {
      const data = res.data.data
      totalCount.value = res.data.totalNum
      pageCount.value = Math.ceil(totalCount.value / everyCount.value)
      data.forEach((item) => {
        const dateTime = formatLocalDateTime(item.date)
        item.date = dateTime
      })
      applyCard.splice(0, applyCard.length, ...data)
    } else {
      ElMessage.error('渲染数据表有误,请询问技术人员！')
    }
  })
}

const applyCardAll = reactive([])
const fetchAllApplyCard = (v) => {
  request.get(`memberCard/selectRealAll`).then((res) => {
    if (res.code === '200') {
      const data = res.data
      applyCardAll.splice(0, applyCardAll.length, ...data)
    }
  })
}

const fetchWaitReim = () => {
  request.get('/reimburse/selectByTab/verifying').then((res) => {
    if (res.code === '200') {
      waitToDeal.splice(0, waitToDeal.length, ...res.data)
    } else {
      ElMessage.error('渲染待处理报销数据表有误,请询问技术人员！')
    }
  })
}

const finishReim = (reim) => {
  const data = JSON.stringify(reim)
  request.post('/reimburse/finishReim', data).then((res) => {
    if (res.code === '200') {
      //这里获取待报销部分
      fetchWaitReim()
      ElMessage.success('成功处理报销')
    } else {
      ElMessage.error('处理报销失败')
    }
  })
}

const questionReim = (reim) => {
  const data = JSON.stringify(reim)
  request.post('/reimburse/questionReim', data).then((res) => {
    if (res.code === '200') {
      //这里获取待报销部分
      fetchWaitReim()
      ElMessage.success('成功置为问题报销')
    } else {
      ElMessage.error('处理报销失败')
    }
  })
}

const privateAllData = ref([])
const selectAllPrivate = () => {
  request.get('memberCard/selectAllPri').then((res) => {
    if (res.code === '200') {
      privateAllData.value = res.data
    } else {
      ElMessage.error('渲染私教数据表有误！')
    }
  })
}

const getAllName = () => {
  request.get('login/selectAllName').then((res) => {
    if (res.code === '200') {
      allStaff.value = res.data
    } else {
      ElMessage.error('未登录！')
    }
  })
}

const cardTypeChange = (newValue) => {
  const cardType = newValue.target.value
  applyCardForm.price = cardMatchPrice[cardType]
}

const controlAllCard = () => {
  editDialog1.value = true
  fetchAllApplyCard()
}
</script>

<style scoped>
.reimburse {
  height: 246px;
  overflow: auto;
}

.newItem {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <div>
    <el-card>
      <div class="everyTitle">每日汇总</div>
      <div class="everydaySum">
        <div class="welcomeMes">
          <el-avatar :size="80" style="margin-right: 20px;">
            <img src="@/assets/image/jijianLogo.png" />
          </el-avatar>
          <div style="flex: 1">
            <p class="welcomeText">你好同学, 乐极健俱乐部欢迎您! 祝你开始生活每一天!</p>
            <p style="padding-bottom: 0px;">若系统有任何问题,请及时联系财务部人员黄拓森,wx: qwqw13551185595</p>
            <div style="height: 80px;display:flex">
              <el-image :src="applyCardPhoto" ></el-image> 
              <el-image :src="applyCardPhoto2" ></el-image>
              </div>
          </div>
        </div>
        <div class="dataSum">
          <div>
            <div><el-tag size='large' style="font-size: 16px; "     effect="dark">今日办卡总数:</el-tag></div>
            <p>
              <div style="margin-bottom: 6px;"><el-tag size="default">学期卡:&nbsp;&nbsp;{{ everyDayCal.term }}</el-tag></div>
              <div style="margin-bottom: 6px;"><el-tag size="default" type="success"> 季卡:&nbsp;&nbsp;{{ everyDayCal.season }}</el-tag></div>
              <div style="margin-bottom: 6px;"><el-tag size="default" type="warning"> 月卡:&nbsp;&nbsp;{{ everyDayCal.month }}</el-tag></div>
              <div style="margin-bottom: 6px;"><el-tag size="default" type="danger"> 次卡:&nbsp;&nbsp;{{ everyDayCal.day }}</el-tag></div>
            </p>
          </div>
          <div>
            <div><el-tag size='large' style="font-size: 16px;" effect="dark" type = "success">今日私教:</el-tag></div>
            <p><el-tag size="default">{{ everyDayCal.tutorMoney }}元</el-tag></p>
          </div>
          <div>
            <div><el-tag size='large' style="font-size: 16px;" effect="dark" type = "warning">今日办卡:</el-tag></div>
            <p><el-tag size="default">{{ everyDayCal.cardMoney }}元</el-tag></p>
          </div>
          <div>
            <div><el-tag size='large' style="font-size: 16px;" effect="dark" type = "danger">今日总金额:</el-tag></div>
            <p><el-tag size="default">{{ everyDayCal.sumMoney }}元</el-tag></p>
          </div>
        </div>
      </div>
    </el-card>
    <el-card style="margin-top: 10px">
      <template #header>
        <div class="card-header">
          <span>每日办卡</span>
          <el-button class="button" text >其他功能</el-button>
        </div>
      </template>
      <!-- el-tab 标签页:办卡 和 私教 -->
      <el-tabs type="border-card" class="demo-tabs">
        <el-tab-pane label="办卡业务">
          <el-button type="primary" :icon="Plus" @click="addApplyCard">新增办卡</el-button>
          <!-- 新增办卡的弹窗:dialog组件 -->
          <el-dialog v-model="dialogFormVisible" title="新增办卡" style="position:relative" >
            <el-form v-model="applyCardForm" :rules="applyCardRule" ref="applyCard">
              <el-form-item label="会员姓名">
                <el-input v-model="applyCardForm.memberName" style="width: 240px" />
              </el-form-item>
              <el-image :src="post" style="height: 270px; position: absolute; right:50px;top:50px"></el-image>
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
                  <el-option v-for="staff in allStaff" :label="staff" :value="staff"/>
                </el-select>
              </el-form-item>
              <el-form-item label="备注信息">
                <el-input v-model="applyCardForm.remarks" type="textarea" style="width: 540px" />
              </el-form-item>
              <div style="display: flex;justify-content: flex-end;">              
                <el-tag class="ml-2" type="success" size="large" style="font-size: 22px;">最终价格:&nbsp;&nbsp;
                {{applyCardForm.price - applyCardForm.groupPurchase}}</el-tag>
              </div>


            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消办卡</el-button>
                <el-button type="primary" @click="submitForm"> 确定办卡 </el-button>
              </span>
            </template>
          </el-dialog>

          <!-- 修改办卡的弹窗:dialog组件 -->
          <el-dialog v-model="editFormVisible" title="修改办卡信息">
            <el-form v-model="applyCardForm" >
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
                  <el-option v-for="staff in allStaff" :label="staff" :value="staff"/>
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
          <!-- 数据表渲染 -->
          <el-table
            :data="filterTableData"
            style="width: 100%; height: 290px"
            empty-text="今天暂时没有办卡数据嗷~"
          >
            <el-table-column
              label="日期"
              prop="date"
              header-align="center"
              align="center"
              width="200px"
            />
            <el-table-column
              label="会员姓名"
              prop="memberName"
              header-align="center"
              align="center"
            />
            <el-table-column
              label="电话号码"
              prop="phoneNumber"
              header-align="center"
              align="center"
            />
            <el-table-column label="卡种" prop="cardType" header-align="center" align="center" />
            <el-table-column label="金额" prop="price" header-align="center" align="center" />
            <el-table-column
              label="团购优惠"
              prop="groupPurchase"
              header-align="center"
              align="center"
            />
            <el-table-column label="办理人" prop="staff" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              label="最后金额"
              prop="finalPrice"
              header-align="center"
              align="center"
            />
            <el-table-column
              label="备注"
              prop="remarks"
              header-align="center"
              align="center"
            />
            <el-table-column width="250" header-align="center" align="center">
              <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
              </template>
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)"
                  >Edit</el-button
                >
                <el-button size="small" type="danger" @click="handleDelete(scope.row)"
                  >Delete
                </el-button>
              </template>
            </el-table-column>
            <!-- 空数据时显示的内容 -->
            <template #empty>
              <div style="text-align: center">
                <div style="margin-top: 80px">
                  <img src="@/assets/image/noData.png" alt="No data" />
                  <p>今天还没有办卡数据嗷~</p>
                </div>
              </div>
            </template>
          </el-table>
        </el-tab-pane>
        <!-- 私教业务tab -->
        <el-tab-pane label="私教业务">
                    <!-- 私教新增办卡的弹窗:dialog组件 -->
                    <!-- 新增办卡的弹窗:dialog组件 -->
                    <el-dialog v-model="privateFormVisible" title="新增私教">
            <el-form v-model="privateForm">
              <el-form-item label="会员姓名">
                <el-input v-model="privateForm.privateName" style="width: 240px" />
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="privateForm.privatePhone" style="width: 240px" />
              </el-form-item>
              <el-form-item label="私教课次" @change="cardTypeChange">
                <el-radio-group v-model="privateForm.classNum" class="ml-W4">
                  <el-radio :label="10" />
                  <el-radio :label="12" />
                  <el-radio :label="15" />
                  <el-radio :label="20" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="私教总价">
                <el-input v-model="privateForm.priPrice" style="width:240px" />元
              </el-form-item>
              <el-form-item label="团购优惠">
                <el-input v-model="privateForm.discount" style="width: 240px" />
                <span>元</span>
              </el-form-item>
              <el-form-item label="办理人员">
                <el-select v-model="privateForm.transactor" placeholder="选择办理人员">
                  <el-option v-for="staff in allStaff" :label="staff" :value="staff"/>
                </el-select>
              </el-form-item>
              <el-form-item label="备注信息">
                <el-input v-model="privateForm.tutotRemarks" type="textarea" style="width: 540px" />
              </el-form-item>
              <div style="display: flex;justify-content: flex-end;">              
                <el-tag class="ml-2" type="success" size="large" style="font-size: 22px;">最终价格:&nbsp;&nbsp;
                {{privateForm.priPrice - privateForm.discount}}</el-tag>
              </div>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="privateFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="priSubmitFormCon"> Confirm </el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 修改私教信息：dialog -->
          <el-dialog v-model="privateEditVisible" title="修改私教办卡信息">
            <el-form v-model="privateForm">
              <el-form-item label="会员姓名">
                <el-input v-model="privateForm.privateName" style="width: 240px" />
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="privateForm.privatePhone" style="width: 240px" />
              </el-form-item>
              <el-form-item label="私教课次">
                <el-radio-group v-model="privateForm.classNum" class="ml-W4">
                  <el-radio :label="10" />
                  <el-radio :label="12" />
                  <el-radio :label="15" />
                  <el-radio :label="20" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="私教总价">
                <el-input v-model="privateForm.priPrice" style="width:240px" />
              </el-form-item>
              <el-form-item label="团购优惠">
                <el-input v-model="privateForm.discount" style="width: 240px" />
                <span>元</span>
              </el-form-item>
              <el-form-item label="办理人员">
                <el-select v-model="privateForm.transactor" placeholder="选择办理人员">
                  <el-option v-for="staff in allStaff" :label="staff" :value="staff"/>
                </el-select>
              </el-form-item>
              <el-form-item label="备注信息">
                <el-input v-model="privateForm.tutotRemarks" type="textarea" style="width: 540px" />
              </el-form-item>
              <el-tag class="ml-2" type="success">最终价格</el-tag>
              <el-tag class="ml-2" type="success">{{
                privateForm.priPrice - privateForm.discount
              }}</el-tag>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="privateEditVisible = false">Cancel</el-button>
                <el-button type="primary" @click="priEditFormCon"> Confirm </el-button>
              </span>
            </template>
          </el-dialog>
          <el-button type="primary" :icon="Plus" @click="priSubmitForm">新增私教</el-button>
          <el-table
            :data="filterTableDataPri"
            style="width: 100%; height: 290px"
          >
            <el-table-column
              label="办理日期"
              prop="tutorDate"
              header-align="center"
              align="center"
              width="200px"
            />
            <el-table-column
              label="会员姓名"
              prop="privateName"
              header-align="center"
              align="center"
            />
            <el-table-column
              label="电话号码"
              prop="privatePhone"
              header-align="center"
              align="center"
            />
            <el-table-column label="私教课次" prop="classNum" header-align="center" align="center" />
            <el-table-column label="私教金额" prop="priPrice" header-align="center" align="center" />
            <el-table-column
              label="私教优惠"
              prop="discount"
              header-align="center"
              align="center"
            />
            <el-table-column label="办理人" prop="transactor" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              label="最后金额"
              prop="finalPriPrice"
              header-align="center"
              align="center"
            />
            <el-table-column
              label="备注"
              prop="tutorRemarks"
              header-align="center"
              align="center"
            />
            <el-table-column width="250" header-align="center" align="center">
              <template #header>
                <el-input v-model="searchPri" size="small" placeholder="Type to search" />
              </template>
              <template #default="scope">
                <el-button size="small" @click="handleEditPri(scope.$index, scope.row)"
                  >Edit</el-button
                >
                <el-button size="small" type="danger" @click="handleDeletePri(scope.$index, scope.row)"
                  >Delete
                </el-button>
              </template>
            </el-table-column>
            <!-- 空数据时显示的内容 -->
            <template #empty>
              <div style="text-align: center">
                <div style="margin-top: 80px">
                  <img src="@/assets/image/noData.png" alt="No data" />
                  <p>今天还没有私教数据嗷~</p>
                </div>
              </div>
            </template>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { cardMatchPrice } from '@/Constant/applyCard'
import request from '@/common/request'
import { formatLocalDateTime } from '@/common/dateTime'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted } from 'vue'
import applyCardPhoto from '@/assets/image/applyCardPhoto.png';
import applyCardPhoto2 from '@/assets/image/applyCardPhoto2.png';
import post from '@/assets/image/post.jpg'
import { useRouter } from 'vue-router';
const router = useRouter();

// 功能1==》新增办卡:dialog弹窗功能:
const dialogFormVisible = ref(false)
const privateEditVisible = ref(false)
const addApplyCard = () => {
  //首先将数据清理为默认数据格式
  
  //首先将弹窗可视化为true
  dialogFormVisible.value = true

  //刷新办卡的基础数据(因为之前确定提交之后,applyCardForm有之前的数据)
  Object.assign(applyCardForm, {
    memberName: '',
    phoneNumber: '',
    cardType: '学期卡',
    price: 488,
    groupPurchase: 0,
    staff: '',
    remarks: ''
  })
}

//表单验证规则
const applyCardForm = reactive({
  memberName: '',
  phoneNumber: '',
  cardType: '学期卡',
  price: 488,
  groupPurchase: 0,
  staff: '',
  remarks: ''
})

const applyCardRule = reactive ({
  phoneNumber: [
  { required: true, message: 'age is required' },
  { type: 'number', message: 'age must be a number' },
  ]
})




const cardTypeChange = (newValue) => {
  const cardType = newValue.target.value
  applyCardForm.price = cardMatchPrice[cardType]
}

// 修改删除办卡:dialog弹窗功能:
const editFormVisible = ref(false)

const handleEdit = (row) => {
  editFormVisible.value = true
  // date不进行修改
  row.date = ''
  Object.assign(applyCardForm, row)
}
const handleDelete = (row) => {
  ElMessageBox.confirm(`是否要删除${row.memberName}的会员财务信息?`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteMember(row.memberId, row.memberName)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

//私教部分
const privateForm = reactive({
  privateName:'',
  tutorDate:'',
  privatePhone:'',
  tutotRemarks:'',
  discount:0,
  transactor:'',
  classNum:10,
  priPrice:0,
  finalPriPrice:0
})

const privateData = ref([])

const privateFormVisible = ref(false)

const priSubmitForm = () => {
  privateFormVisible.value = true
  
  Object.assign(privateForm,{
  privateName:'',
  tutorDate:'',
  privatePhone:'',
  tutotRemarks:'',
  discount:0,
  transactor:'',
  classNum:10,
  priPrice:0,
  finalPriPrice:0
})

}


const handleEditPri = (index,row) => {
  privateEditVisible.value = true
  // date不进行修改
  row.privateDate = ''
  Object.assign(privateForm, row)
}

const priEditFormCon = () => {
  submitEditFormPri()
}


const handleDeletePri = (index, row) => {
  ElMessageBox.confirm(`是否要删除${row.privateName}的会员财务信息?`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteMemberPri(row.privateId, row.privateName)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}
// 提交表单

const search = ref('')
const searchPri = ref('')
const allStaff = ref('')
const filterTableData = computed(() =>
  tableDataCard.filter(
    (data) => !search.value || data.memberName.includes(search.value)
  )
)

const filterTableDataPri = computed(() =>
privateData.value.filter(
    (data) => !searchPri.value || data.privateName.includes(searchPri.value)
  )
)

//渲染表单数据表模块
let tableDataCard = reactive([])
onMounted(() => {
  // 这里放置挂载后逻辑
  getMemberCard()
  calculateNum()
  selectNewPrivate()

  //获取到所有的工作人员
  getAllName()



})

const getAllName = () => {
  request.get('login/selectAllName').then((res) => {
    if(res.code === '200'){
      allStaff.value = res.data
    }
    else{
    ElMessage.error("未登录！")
    }
  })
}

// 每日数据汇总部分:
const everyDayCal = ref({
})

// 接口部分
const getMemberCard = () => {
  request.get('memberCard/selectMember').then((res) => {
    if (res.code === '200') {
      res.data.forEach((item) => {
        const dateTime = formatLocalDateTime(item.date)
        item.date = dateTime
      })
      tableDataCard.splice(0, tableDataCard.length, ...res.data)
    } else if(res.code === '401')
    {
      // 响应状态码为 401 时跳转到登录页面
      router.push('/login');
    }
    else {
      ElMessage.error('渲染数据表有误,请询问技术人员！')
    }
  })
}
const submitForm = () => {
  //表单验证
  // 序列化提交的表单
  const data = JSON.stringify(applyCardForm)
  request.post('memberCard/addMember', data).then((res) => {
    if (res.code === '200') {
      ElMessage.success('成功插入数据!')
      dialogFormVisible.value = false
      getMemberCard()
      calculateNum()
    } else {
      ElMessage.error("办卡输入的数据格式有误！请重新输入")
    }
  })
}

const priSubmitFormCon = () => {

    addNewPrivate();
}


// 修改提交的表单
const submitEditForm = () => {
  // 序列化提交的表单
  const data = JSON.stringify(applyCardForm)
  request.post('memberCard/editMember', data).then((res) => {
    if (res.code === '200') {
      ElMessage.success(`成功修改会员${applyCardForm.memberName}的数据!`)
      editFormVisible.value = false
      getMemberCard()
      calculateNum()
    } else {
      ElMessage.error(`修改会员${applyCardForm.memberName}的数据失败！请询问相关技术人员！`)
    }
  })
}

const deleteMember = (memberId, memberName) => {
  request.get(`memberCard/deleteMember/${memberId}`).then((res) => {
    if (res.code === '200') {
      ElMessage.success(`成功删除会员${memberName}的数据`)
      getMemberCard()
      calculateNum()
    } else {
      ElMessage.error(`删除会员${memberName}的数据失败！请询问相关技术人员！`)
    }
  })
}

const calculateNum = () =>
  request.get('memberCard/calculateAll').then((res) => {
    if (res.code === '200') {
      everyDayCal.value = res.data
    }
  })


  //私教表单

const selectNewPrivate = () => {
  request.get('memberCard/selectAllPriDate').then((res) => {
    if(res.code === '200') {
      privateData.value = res.data
    }
    else if(res.code === '401')
    {
      // 响应状态码为 401 时跳转到登录页面
      router.push('/login');
    }
    else {
      ElMessage.error('渲染私教数据有误,请询问技术人员！')
    }
  })
}

const addNewPrivate = () => {
  // 序列化提交的表单
  const data = JSON.stringify(privateForm)
  request.post('memberCard/insertPri', data).then((res) => {
    if (res.code === '200') {
      privateFormVisible.value = false
      ElMessage.success('成功插入数据!')
      calculateNum()
      selectNewPrivate()
    } else {
      ElMessage.error("私教办卡输入的数据格式有误！请重新增加私教会员")
    }
  })
}

const submitEditFormPri = () => {
  // 序列化提交的表单
  privateForm.finalPriPrice = privateForm.priPrice - privateForm.discount
  const data = JSON.stringify(privateForm)
  request.post('memberCard/editPri', data).then((res) => {
    if (res.code === '200') {
      ElMessage.success(`成功修改会员${privateForm.privateName}的数据!`)
      privateEditVisible.value = false
      selectNewPrivate()
      calculateNum()
    } else {
      ElMessage.error(`修改会员${privateForm.privateName}的数据失败！请询问相关技术人员！`)
    }
  })
}

const deleteMemberPri = (memberId, memberName) => {
  request.get(`memberCard/deletePri/${memberId}`).then((res) => {
    if (res.code === '200') {
      ElMessage.success(`成功删除会员${memberName}的数据`)
      selectNewPrivate()
      calculateNum()
    } else {
      ElMessage.error(`删除会员${memberName}的数据失败！请询问相关技术人员！`)
    }
  })
}

</script>

<style>
.everydaySum {
  display: flex;
  gap:10px;
}

.welcomeMes {
  flex: 3;
  display: flex;
}

.welcomeText {
  font-weight: 600;
  font-size: 20px;
  margin-top: 0;
}
.everyTitle {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
}

.dataSum {
  display: flex;
  flex: 2;
  gap: 20px;
}

.dataSum > div > p {
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<script setup>
import { reactive, ref } from 'vue'
//导入验证码组件
import ValidCode from '@/components/ValidCode.vue'
//导入消息提示ELMessage库
import { ElMessage } from 'element-plus'
//导入icon
import { User, Unlock } from '@element-plus/icons-vue'
//导入全局的router
import { useRouter } from 'vue-router'

import request from '@/common/request'

// 暂时存放ip地址

//导入router
const router = useRouter()
//双向绑定数据部分:

//登录页表单组件所需要的三个值
const formValue = reactive({
  username: '',
  password: '',
  code: ''
})

//ValidCode组件生成的code值
// const codeGen = ref('')

const loginRef = ref(null)
//验证表单登录

// 验证码校验
// const validateCode = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('请输入验证码'))
//   } else if (value !== codeGen.value) {
//     callback(new Error('验证码错误'))
//   } else {
//     callback()
//   }
// }

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  // 自定义校验机制
  // code: [{ validator: validateCode, trigger: 'blur' }]
})

//函数定义部分：

//点击验证码图片，从而将值赋值给codeGen
// const getCode = (code) => {
//   console.log(code)
//   codeGen.value = code
// }

//登录时处理函数
const logIn = () => {
  loginRef.value.validate((valid) => {
    if (valid) {
      //发送网络请求,从而验证是否有该用户
      request
        .post('login/enter', {
          username: formValue.username,
          password: formValue.password
        })
        .then((res) => {
          if (res.code === '200') {
            router.push('/dashboard')
            ElMessage.success('登录成功！')
            //用于记录用户状态
            localStorage.setItem('JijianUser', JSON.stringify(res.data))
          } else {
            ElMessage.error(res.msg)
          }
        })
    }
  })
}

//注册时处理函数
const register = () => {
  ElMessage.warning('目前系统只供乐极健内部使用,不支持外部人员注册！')
  router.push('/register')
}

//removeToken
const removeToken = () => {
  localStorage.removeItem('JijianUser')
  ElMessage.warning('暂时不提供忘记密码功能,该按钮用于清除用户缓存')
}
</script>

<template>
  <div class="mainBody">
    <div class="mainContent">
      <div class="leftPart">
        <img src="@/assets/image/login.png" alt="登录你的账号" style="width: 100%" />
      </div>

      <div class="rightPart">
        <el-form :model="formValue" style="width: 80%" ref="loginRef" :rules="rules">
          <div class="formTitle">欢迎登录后台管理系统</div>
          <el-form-item prop="username">
            <el-input
              v-model="formValue.username"
              :prefix-icon="User"
              size="large"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Unlock"
              size="large"
              show-password
              placeholder="请输入密码"
              v-model="formValue.password"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="code">
            <div style="display: flex; width: 100%">
              <el-input
                placeholder="请输入验证码"
                :prefix-icon="CircleCheck"
                size="large"
                style="flex: 1"
                v-model="formValue.code"
              ></el-input>
              <div style="height: 40px; flex: 1">
                <valid-code @update:value="getCode" />
              </div>
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="logIn">登 录</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">
              还没有账号？请
              <span style="color: #0f9876; cursor: pointer" @click="register">注册</span>
            </div>
            <div style="flex: 1; text-align: right">
              <span style="color: #0f9876; cursor: pointer" @click="removeToken">忘记密码</span>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainBody {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f9876;
}

.mainContent {
  display: flex;
  background-color: white;
  width: 50%;
  border-radius: 5px;
  overflow: hidden;
}

.leftPart {
  flex: 1;
}

.rightPart {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 表单部分 */
.formTitle {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
</style>

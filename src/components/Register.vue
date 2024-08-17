<template>
  <div class="mainBody">
    <div class="mainContent">
      <div class="leftPart">
        <img src="@/assets/image/register.png" alt="注册你的账号" style="width: 100%" />
      </div>

      <div class="rightPart">
        <el-form style="width: 80%">
          <div class="formTitle">欢迎登录后台管理系统</div>
          <div style="flex: 1">
            已经有账号了？请
            <span style="color: #6e77f2; cursor: pointer" @click="router.push('/login')">登录</span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
//导入全局的router
import { useRouter } from 'vue-router'
//导入router
const router = useRouter()
</script>

<style scoped>
.mainBody {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #669fef;
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

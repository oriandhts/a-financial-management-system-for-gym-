<template>
  <div style="display: flex">
    <el-icon v-if="!props.collapse" :size="26" @click="hanleCollapse" style="cursor: pointer"
      ><Expand
    /></el-icon>
    <el-icon v-else :size="26" @click="hanleCollapse" style="cursor: pointer"><Fold /></el-icon>
    <el-breadcrumb separator="/" style="margin-left: 20px; font-size: 20px; line-height: 24px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">每日办卡</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <div style="flex: 1; display: flex; justify-content: flex-end; align-items: center">
      <i class="el-icon-quanping" @click="handleFullScreen" style="font-size: 25px"></i>
      <el-dropdown placement="bottom">
        <div style="display: flex; align-items: center; cursor: pointer">
          <img
            src="@/assets/image/avatar.png"
            alt=""
            style="width: 40px; height: 40px; margin: 0 5px"
          />
          <span>管理员</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Expand, Fold, Edit } from '@element-plus/icons-vue'

const props = defineProps({
  collapse: Boolean
})

const emit = defineEmits(['update-collapse'])

const hanleCollapse = () => {
  emit('update-collapse', !props.collapse)
}
</script>

<template>
  <!-- logo部分 -->
  <div
    style="
      height: 80px;
      line-height: 80px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <img src="@/assets/image/jijianLogo.png" style="width: 40px" alt="乐极健健身房欢迎你的加入！" />
    <span class="logo-title" v-show="!isCollapse">乐极健俱乐部</span>
  </div>

  <!-- Sidebar的menu部分 -->
  <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
    <router-link :to="{ name: 'applyCard' }">
      <el-menu-item index="1">
        <el-icon><icon-menu /></el-icon>
        <template #title>每日办卡</template>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'OndutyRecord' }">
      <el-menu-item index="7">
        <el-icon><document /></el-icon>
        <template #title>工时记录</template>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'reimbursement' }">
      <el-menu-item index="2">
        <el-icon><document /></el-icon>
        <template #title>账单报销</template>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'dashboardData' }">
      <el-menu-item index="3">
        <el-icon><setting /></el-icon>
        <template #title>汇总仪表盘</template>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'Permission' }">
      <el-menu-item index="5">
        <el-icon><document /></el-icon>
        <template #title>权限管理</template>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'Chatroom' }">
      <el-menu-item index="6">
        <el-icon><document /></el-icon>
        <template #title>极健聊天室</template>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
// 导入Props 和 Emits
import { watch } from 'vue'
const props = defineProps({
  collapse: Boolean
})

//用来控制侧边栏的打开和关闭
const isCollapse = ref(true)

// 监听器部分：
watch(
  () => props.collapse,
  (newValue, oldValue) => {
    isCollapse.value = newValue
  }
)
</script>

<style>
a {
  text-decoration: none;
}
</style>

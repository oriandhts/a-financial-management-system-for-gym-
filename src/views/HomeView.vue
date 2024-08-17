<template>
  <div class="common-layout">
    <el-container>
      <el-aside :class="{ homeSide_expand: !collapse, homeSide_collapse: collapse }">
        <SideBar :collapse="collapse" />
      </el-aside>
      <el-container>
        <el-header class="elHeader">
          <Header :collapse="collapse" @update-collapse="collapse = $event"
        /></el-header>
        <el-main>
          <router-view :collapse="collapse"></router-view>
          <!-- <MainBody :collapse="collapse"></MainBody> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SideBar from '@/components/Homepage/SideBar.vue'
import Header from '@/components/Homepage/Header.vue'

import { ref } from 'vue'

//维护一个collapse变量,初始状态为true
const collapse = ref(true)
</script>

<style scoped>
.homeSide_expand {
  min-height: 100vh;
  width: 220px;
}

.homeSide_collapse {
  min-height: 100vh;
  width: 64px;
}

.elHeader {
  /* 文字居中 */
  height: 80px;
  line-height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
</style>

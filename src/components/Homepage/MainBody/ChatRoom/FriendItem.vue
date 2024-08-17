<template>
  <li
    class="perChat"
    @mouseover="changeColor"
    @click="emitEvent"
    :style="{ backgroundColor: props.isActive ? 'blue' : boxColor }"
    @mouseleave="resetColor"
  >
    {{ props.friendName }}
  </li>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['setActive'])

const props = defineProps({
  friendName: String,
  isActive: Boolean,
  key: Number
})

const boxColor = ref('grey')

const changeColor = () => {
  if (boxColor.value !== 'blue') {
    boxColor.value = 'red'
  }
}

const resetColor = () => {
  if (boxColor.value !== 'blue') {
    boxColor.value = 'grey'
  }
}

const emitEvent = () => {
  emit('setActive', props.friendName)
}
</script>

<style scoped>
li {
  list-style-type: none; /* 去除项目符号 */
  margin: 0; /* 重置外边距 */
  padding: 0; /* 重置内边距 */
}

ul {
  margin: 0;
  padding: 0;
}
.perChat {
  height: 60px;
  background-color: #fff;
}
</style>

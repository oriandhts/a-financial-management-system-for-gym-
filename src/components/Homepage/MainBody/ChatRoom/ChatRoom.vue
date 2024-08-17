<template>
  <div>
    <el-card class="mainBodyChat">
      <template #header>
        <div class="card-header">
          <span>极健聊天室</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <div class="chatbox">
        <el-row>
          <el-col :span="7">
            <div class="leftSearch">
              <div class="searchDiv">
                <el-input v-model="inputFriend" placeholder="搜素" clearable />
              </div>
            </div>
            <div class="leftChat">
              <ul>
                <FriendItem
                  v-for="(friend, index) in friendList"
                  :key="index"
                  :friendName="friend"
                  :isActive="activeFriend === index"
                  @setActive="(friendName) => setActiveFriend(index, friendName)"
                />
              </ul>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="rightTop"></div>
            <div class="rightchat" ref="scrollContainer">
              <div v-if="activeFriend === -1">选择一个聊天对象</div>
              <div v-else v-for="message in message">
                <div class="rightBubble" v-if="message.fromUser === fromUser">
                  <div class="rightChatbox">{{ message.content }}</div>
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    shape="square"
                  />
                </div>
                <div class="leftBubble" v-else>
                  <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    shape="square"
                  />
                  <div class="leftChatbox">{{ message.content }}</div>
                </div>
              </div>
            </div>
            <div class="rightEnter">
              <div style="height: 30px; background-color: antiquewhite"></div>
              <div style="height: 80px; background-color: rgb(237, 211, 177)">
                <el-input
                  v-model="textareaChat"
                  :rows="3"
                  type="textarea"
                  placeholder="Please input"
                  style="height: 80px"
                />
              </div>
              <div style="height: 35px; background-color: aqua">
                <el-button type="success" @click="handleSend">发送</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, nextTick } from 'vue'
import FriendItem from './FriendItem.vue'
import requestws from '@/common/requestws.js'
import request from '@/common/request.js'
import { MagicString } from 'vue/compiler-sfc'
import { formProps } from 'element-plus'
// 搜索框部分
const inputFriend = ref('')

// 聊天界面部分
const scrollContainer = ref(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
    }
  })
}

// 右下部分:
const friendList = ref([])
const activeFriend = ref(-1)

const setActiveFriend = (index, friendName) => {
  activeFriend.value = index
  // 接收来自子组件的friendName
  toUser.value = friendName

  // 开始查询记录
  loadInitial()
}

const textareaChat = ref(null)

// 实现及时聊天核心部分
const client = ref(null)
const clientGroup = ref(null)
const fromUser = ref('')
const toUser = ref('')
const message = ref('')
const sendObject = reactive({})

const loadInitial = () => {
  request.get(`/imsingle?fromUser=${fromUser.value}&toUser=${toUser.value}`).then((res) => {
    if (res.code === '200') {
      message.value = res.data
      scrollToBottom()
    }
  })
}

// 发送消息
const handleSend = () => {
  if (client) {
    if (textareaChat.value) {
      sendObject.fromUser = fromUser.value
      sendObject.toUser = toUser.value
      sendObject.content = textareaChat.value
    }
    const data = JSON.stringify(sendObject)

    // 将数据发送到服务器
    clickEnterChat()
    client.value.send(data)

    // request.post('/imsingle/insertChat', data).then((res) => {
    //   if (res.code === '200') {
    //     loadInitial()
    //   }
    // })
  }
}

// 清空发送的消息
const clickEnterChat = () => {
  textareaChat.value = ''
}

onMounted(() => {
  // 这里放置挂载后逻辑
  // 单聊逻辑
  const userId = JSON.parse(localStorage.getItem('JijianUser')).id
  client.value = new WebSocket(`ws://106.14.155.164:5770/imserverSingle/${userId}`)

  client.value.onopen = () => {}

  client.value.onmessage = (msg) => {
    if (msg.data) {
      let json = JSON.parse(msg.data)
      if (
        (json.content && json.fromUser === fromUser.value && json.toUser === toUser.value) ||
        (json.fromUser === toUser.value && json.toUser === fromUser.value)
      ) {
        message.value.push(json)
        scrollToBottom()
      }
    }
  }

  client.value.onclose = () => {
    console.log('Disconnected from the WebSocket server')
  }

  client.value.onerror = (error) => {
    console.error('WebSocket error', error)
  }

  fromUser.value = JSON.parse(localStorage.getItem('JijianUser')).name

  //加载聊天数据

  // 查询所有的用户:
  request.get('/login/selectUser').then((res) => {
    friendList.value = res.data
      .filter((user) => user.name !== fromUser.value)
      .map((friend) => friend.name)
  })
})
// mark:json对象要转换一下
</script>

<style>
.mainBodyChat {
  height: 760px;
}

.chatbox {
  background-color: gray;
  height: 670px;
  width: 55%;
  margin: 0 auto;
  border: 1px solid grey;
}

.leftSearch {
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  box-sizing: border-box;
  padding-top: 25px;
}

.leftChat {
  height: 599px;
  background-color: #a59f9f;
  border-right: 1px solid grey;
  box-sizing: border-box;
}

.rightTop {
  height: 70px;
  background-color: goldenrod;
  box-sizing: border-box;
  border-bottom: 1px solid grey;
}

.rightchat {
  height: 455px;
  background-color: rgb(236, 207, 207);
  box-sizing: border-box;
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

ul {
  margin: 0;
  padding: 0;
}

.searchDiv {
  width: 80%;
  height: 35px;
  margin: 0 auto;
}

.rightBubble {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  margin-right: 20px;
}

.rightChatbox {
  position: relative;
  background-color: #8ec657;
  border-radius: 10px;
  padding: 10px 20px;
  color: white;
  margin: 0 10px;
  min-height: 20px;
  max-width: 280px;
  font-size: 16px;
  text-align: left;
}

.leftBubble {
  display: flex;
  justify-content: flex-start;
  margin: 20px 0;
  margin-left: 20px;
}

.leftChatbox {
  position: relative;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 20px;
  color: rgb(0, 0, 0);
  margin: 0 10px;
  min-height: 20px;
  max-width: 280px;
  font-size: 16px;
  text-align: left;
}

.el-textarea__inner {
  padding-bottom: 0 !important;
  height: 80px;
}
</style>

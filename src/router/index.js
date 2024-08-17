import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ApplyCard from '@/components/Homepage/MainBody/ApplyCard.vue'
import reimbursement from '@/components/Homepage/MainBody/reimbursement.vue'
import Permission from '@/components/Homepage/MainBody/Permission.vue'
import dashboardData from '@/components/Homepage/MainBody/dashboardData.vue'
import Chatroom from '@/components/Homepage/MainBody/ChatRoom/ChatRoom.vue'
import OndutyRecord from '@/components/Homepage/MainBody/OndutyRecord.vue'
import NoRight from '@/components/Homepage/MainBody/NoRight.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: 'applyCard', // 注意：这里不需要斜杠
          name: 'applyCard',
          component: ApplyCard
        },
        {
          path: '', // 注意：这里不需要斜杠
          name: 'applyCard',
          component: ApplyCard
        },
        {
          path: 'reimbursement',
          name: 'reimbursement',
          component: reimbursement
        },
        {
          path: 'Permission',
          name: 'Permission',
          component: Permission
        },
        {
          path: 'dashboardData',
          name: 'dashboardData',
          component: dashboardData
        },
        {
          path: 'Chatroom',
          name: 'Chatroom',
          component: Chatroom
        },
        {
          path: '/OndutyRecord',
          name: 'OndutyRecord',
          component: OndutyRecord
        },
        {
          path: '/noRight',
          name: 'NoRight',
          component: NoRight
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const login = JSON.parse(localStorage.getItem('JijianUser')) // 假设这是检查用户权限的函数
  let hasRight = ''
  if (login) {
    hasRight = login.role
  }
  if (
    (to.name === 'reimbursement' || to.name === 'dashboardData' || to.name === 'Permission') &&
    hasRight == 'commonStaff'
  ) {
    next({ name: 'NoRight' }) // 没有权限时重定向到无权限页面
  } else if (to.name === 'Permission' && hasRight === 'stakeholder') {
    next({ name: 'NoRight' }) // 没有权限时重定向到无权限页面
  } else {
    next() // 有权限或跳转到其他页面则正常进行
  }
})

export default router

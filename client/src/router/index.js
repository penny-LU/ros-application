import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Forget from '@/components/Forget'
import Download from '@/components/Download'
import Custom from '@/components/GitDownload'
// import Terminal from '@/components/Terminal'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld,
      meta: {
        index: 1
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        index: 2
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        index: 3
      }
    },
    {
      path: '/download',
      name: 'download',
      component: Download,
      meta: {
        index: 5
      }
    },
    {
      path: '/custom',
      name: 'custom',
      component: Custom,
      meta: {
        index: 6
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: Forget,
      meta: {
        index: 4
      }
    }
    // ,
    // {
    //   path: '/terminal',
    //   name: 'terminal',
    //   component: Terminal
    // }
  ]
})

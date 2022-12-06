// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import ElementUI from 'element-ui'
import store from '@/store/store'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.use(Vuetify)
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi' // 默认值 - 仅用于展示目的
    },
    theme: {
      dark: false, // 如果指定为 true，那么整个页面主题将为下面的 dark 配色
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
        dark: {
          primary: '#0000'
        }
      }
    }
  }),
  template: '<App/>'
})

// '/download'
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/forgot-password', '/', '/download', '/custom']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

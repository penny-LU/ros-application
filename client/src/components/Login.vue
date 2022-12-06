<template>
    <v-layout>
      <v-row absolute justify='center' class="pt-12">
      <v-card class="rounded-lg" elevation="12" width="40%">
        <v-toolbar :elevation="1" dense dark justify-center>
          <v-toolbar-title class="mytitle pt-1 pl-1">Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="d-flex justify-center" flat>
         <div class="pl-6 pr-6 pt-2 pb-2">
          <form
            :rules="emailRules"
            @submit.prevent="login"
            v-on:keyup.enter="login"
            auto-complete="'on'">
          <v-text-field
            prop="email"
            label="Email"
            v-model="email"></v-text-field>
          <br>
          <v-text-field
            prop="password"
            label="Password*"
            :rules="passwordrules"
            counter="32"
            v-model="password"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            ></v-text-field>
            <br>
            <input type="checkbox" v-model="remember" style="margin:0px 0px 25px 0px text-align:left" id="me">
            <label for="me">Remember me</label>
          <div class="textsize alternative-option mt-4">
          You don't have an account? <span class="change pl-2" @click="navigateTo({name: 'register'})">Register</span>
          </div>
          <br>
          <v-btn
            dark
            class="mt-4 mr-1 btn-pers"
            @click="login">
            Login
          </v-btn>
          <br>
          <div class="forgot-password text-center mt-2 mb-4">
            <router-link to="/forgot-password">forget password?</router-link>
          </div>
          <br>
          <div class="error" v-html="error" />
          </form>
        </div>
      </v-card-text>
    </v-card>
    </v-row>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
const Base64 = require('js-base64').Base64
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      remember: false,
      value: String,
      passwordrules: [
        v => !!v || 'Password is required !',
        v => (v && v.length <= 32) || 'Max 32 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  mounted () {
    let account = this.getCookie('email')
    let password = Base64.decode(this.getCookie('password'))
    // 如果存在赋值给表单，并且将记住密码勾选
    if (account) {
      this.email = account
      this.password = password
      this.remember = true
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.token)
        this.$store.dispatch('setUser', response.user)
        this.setCookie('token', response.token)
        this.setUserInfo()
        this.$router.push('/download')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    setUserInfo: function () {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (this.remember) {
        this.setCookie('email', this.email)
        // base64加密密码
        let passWord = Base64.encode(this.password)
        this.setCookie('remember', passWord)
      } else {
        this.setCookie('email', '')
        this.setCookie('password', '')
      }
    },
    // 获取cookie
    getCookie: function (key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    // 保存cookie
    setCookie: function (cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
      ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    }
  }
}
</script>

<style scoped>
.error{
  color:red;
}
.change {
  cursor: pointer;
}
.change:hover {
  border-bottom:1px #000 solid; padding-bottom:5px;
  color:rgb(106, 223, 255);
}
.mytitle {
  font-size: 150%;
}
.forgot-password {
  font-size: 10px
}
.textsize{
  font-size: 18px
}

</style>

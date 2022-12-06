<template>
    <v-layout>
      <v-row absolute justify='center' class="pt-12">
        <v-card class="rounded-lg" elevation="12" width="40%">
        <v-toolbar :elevation="1" dense dark justify-center>
          <v-toolbar-title class="mytitle pt-1 pl-1">SIGN UP</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="d-flex justify-center" flat>
        <div class="pl-6 pr-6 pt-2 pb-2">
          <form
            name="ros-form"
            auto-complete="'off'">
            <br>
            <v-text-field
              label="Email"
              v-model="email"></v-text-field>
            <br>
            <v-text-field
              label="Password"
              :rules="rules"
              counter="32"
              v-model="password"
              autocomplete="new-password"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
            ></v-text-field>
            </form>
            <div class="textsize alternative-option mt-4">
            Already have an account? <span class="change pl-2" @click="navigateTo({name: 'login'})">Login</span>
          </div>
          <br>
          <v-btn
            dark
            justify-center
            class="mt-4 btn-pers"
            @click="register">
            Register
          </v-btn>
          <br><br>
          <div class="error" v-html="error" />
          <br>
          <br>
        </div>
      </v-card-text>
    </v-card>
    </v-row>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      rules: [v => v.length <= 32 || 'Max 32 characters'],
      value: String
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$router.push('/login')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.back{
  background-color: #6a6c6c;
}
.error{
  color:rgb(0, 0, 0);
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
.textsize{
  font-size: 18px
}
</style>

<template>
    <div class="container m-5">
        <form @submit.prevent="forgetPassword">
            <h3 class="text-left pl-3">忘記密碼</h3>

            <div class="form-group">
                <br><label>信箱</label>
                <v-text-field type="email" class="form-control form-control-lg pl-3 outlined" v-model="email" outlined label="Email" ></v-text-field>
            </div>

            <v-btn type="submit" class="btn btn-dark btn-lg btn-block outlined">重新設定密碼</v-btn>
        </form>
    </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  data () {
    return {
      user: {
        email: ''
      }
    }
  },
  methods: {
    async forgetPassword () {
      try {
        await AuthenticationService.forgetPassword({
          email: this.email
        })
        this.$router.push()
        alert('请到邮箱中修改')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>

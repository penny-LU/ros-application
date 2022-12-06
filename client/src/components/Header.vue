<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      fixed
      dark
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-toolbar-title class="mr-4" >
        <span
        class="home"
          @click="navigateTo({name: 'root'})">
          RosApplication
         </span>
      </v-toolbar-title>
      <v-toolbar-items class="pl-2">
      <v-btn v-if="$store.state.isUserLoggedIn" text dark
      @click="navigateTo({name: 'download'})">
      Basic Feature
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items class="pl-2">
      <v-btn v-if="$store.state.isUserLoggedIn" text dark
      @click="navigateTo({name: 'custom'})">
      Custom Feature
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn  text dark  v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo({name: 'login'})">
        Log In
      </v-btn>

      <v-btn  text dark  v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo({name: 'register'})">
        Sign Up
      </v-btn>

      <v-btn v-if="$store.state.isUserLoggedIn" text dark
      @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;

}
.home:hover {
  color:rgb(156, 231, 149);
}
.v-btn {
  font-size: 18px;
}
</style>

<template>
  <div id="app" >
    <v-app>
      <PageHeader absolute/>
        <v-main>
        <v-container
        id="scrolling-techniques-7"
        fluid>
          <router-view/>
        </v-container>
      </v-main>
    </v-app>
    <!-- img src="./assets/logo.png" -->
  </div>
</template>

<script>
import dProgress from './components/DownloadProgress.vue'
import PageHeader from './components/Header.vue'
export default {
  name: 'app',
  components: {
    PageHeader,
    dProgress
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap');
#app {
  font-family: 'Oswald', sans-serif;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 55px;
  height: 100%;
  background: #389ce8,
}
.container {
  position:absolute;
  width: 100%;
  height: 100%;
}
.btn-pers {
  text-align: center;
  margin-left: 80px;
  padding: 1em 2.5em;
  font-size: 30px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 40px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  transform: translateX(-50%);
}
.btn-pers:hover {
  background-color: #6a6c6c;
  box-shadow: 0px 15px 20px rgba(103, 107, 106, 0.4);
  color: #fff;
  transform: translate(-50%, -7px);
}
.btn-pers:active {
  transform: translate(-50%, -1px);
}
</style>

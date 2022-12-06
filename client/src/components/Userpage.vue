<template>
  <v-layout justify-center>
    <v-flex justify-center absolute>
    <v-card class="white rounded-lg" elevation="12">
    <div v-for="data in datas"
    :key="data.time">
      {{data.image}}
      {{data.video}}
      {{data.camera}}
    </div>
  </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      datas: [
        {
      image: false,
      video: false,
      camera: false,
      image_path:'0',
      image_outputpath: '0',
      video_path: '0',
      video_outputpath: '0',
      camera_path: '0',
      time: '' 
        }
    ]
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

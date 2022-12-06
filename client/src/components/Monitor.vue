<template>
  <!-- <v-sheet
    class="overflow-hidden"
    style="position: relative;"
  > -->
  <v-container     class="overflow-hidden"
    style="position: relative" >
      <v-row
      align="center"
      justify="center">
      <v-flex align="center">
        <input type="checkbox"
          :true-value="1"
          :false-value="0"
          v-model="image"
          id="checkbox1"
        >
        <label for="checkbox1">Image</label>
        <v-text-field
          outlined
          label="image_path"
          type="text"
          v-model="image_path"
          @input="setOptionText(optionText)"
        ></v-text-field>
        <v-text-field
          outlined
          label="image_outputpath"
          type="text"
          v-model="image_outputpath"
          @input="setOptionText(optionText)"
        ></v-text-field>
      </v-flex>
    </v-row>
    <br>
    <v-row
      align="center"
      justify="center">
        <v-flex>
        <input type="checkbox"
          :true-value="1"
          :false-value="0"
          v-model="video"
          @change="setCorrect(isCorrect2)"
          id="checkbox2"
        >
        <label for="checkbox2">Video:</label>
        <br>
        <v-text-field
          outlined
          label="video_path"
          type="text"
          v-model="video_path"
          @input="setOptionText(optionText)"
        ></v-text-field>
        <v-text-field
          outlined
          label="video_outputpath"
          type="text"
          v-model="video_outputpath"
          @input="setOptionText(optionText)"
        ></v-text-field>
      </v-flex>
    </v-row>
      <v-row
      class="md"
      align="center"
      justify="center">
      <v-flex align="center">
        <input type="checkbox"
          :true-value="1"
          :false-value="0"
          v-model="camera"
          @change="setCorrect(isCorrect3)"
          id="checkbox3"
        >
        <label for="checkbox3">Realtime:</label>
        <v-text-field
          outlined
          label="camera_path"
          type="text"
          v-model="camera_path"
          @input="setOptionText(optionText)"
        ></v-text-field>
      </v-flex>
    </v-row>
    <br>
    <v-row
      align="center"
      justify="center">
      <v-btn
            dark
            class="mt-4 btn-pers"
            @click="send">
            Download
      </v-btn>
      <v-btn
          @click.stop="drawer = !drawer"
          dark
          fab
          large
          right
        >
          <v-icon v-if="fab">
            mdi-cloud-upload
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
        <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
      </v-row>
    </v-container>

  <!-- </v-sheet> -->
</template>

<script>
import DownloadService from '@/services/DownloadService'
export default {
  data () {
    return {
      image: false,
      video: false,
      camera: false,
      image_path: '0',
      image_outputpath: '0',
      video_path: '0',
      video_outputpath: '0',
      camera_path: '0',
      time: '',
      drawer: false
    }
  },
  methods: {
    async send () {
      try {
        const response = await  DownloadService.index({
          string: this.image + this.video + this.camera + this.image_path + this.image_outputpath + this.video_path + this.video_outputpath + this.camera_path, 
          time: new Date()
        })
      } catch (err) {
        console.log(err)
      }
    },
    setCorrect (e) {
      this.$emit('set-correct',
        e
      )
    },
    setOptionText (text) {
      this.$emit('set-option-text', {
        optionText: text
      })
    }
  }
  // components: {
  //   Menu
  // }
}
</script>

<style scoped>
.v-navigation-drawer--mini-variant, .v-navigation-drawer {
  overflow: visible !important;
}
</style>

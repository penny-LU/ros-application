<template>
  <v-container class="overflow-hidden pt-10"
    style="position: absolute" justify='center'>
      <v-row
      justify="center">
      <v-card class="flexcard" flat width="60%">
        <v-select
          v-model="input_form.system"
          :items="items"
          label="System"
          solo
          hint="Pick your System type( Github support )"
          persistent-hint
        ></v-select>
        <br>
        <v-text-field
          :rules="rules"
          outlined
          label="Other System"
          type="text"
          v-model="input_form.system"
        ></v-text-field>
        <v-text-field
          :rules="rules"
          outlined
          label="github url"
          type="text"
          v-model="input_form.image"
        ></v-text-field>
        <v-text-field
          :rules="rules"
          outlined
          label="Image Output Name"
          type="text"
          v-model="input_form.image_output_name"
        ></v-text-field>
        <v-text-field
          :rules="rules"
          outlined
          label="Maintainer"
          type="text"
          v-model="input_form.maintainer"
        ></v-text-field>
        <v-textarea
          name="input-7-1"
          filled
          label="Other Instruction  ( seperate by: \n )"
          v-model="input_form.Other_instr"
          auto-grow
          value="0"
        ></v-textarea>
      </v-card>
    </v-row>
    <v-row
      justify="center"
      class="pb-12">
      <br>
      <v-btn
            dark
            class="mt-4 mr-1 btn-pers"
            @click="send">
            <v-icon
            dark
            left
            >
              mdi-checkbox-marked-circle
            </v-icon>
            Download
      </v-btn>
    </v-row>
    </v-container>

  <!-- </v-sheet> -->
</template>

<script>
import DownloadService from '@/services/DownloadService'
export default {
  data () {
    return {
      input_form: {
        system: '',
        image: '',
        image_output_name: '',
        maintainer: '',
        instr: []
      },
      drawer: false,
      Other_instr: '',
      items: [
        'Window',
        'Linux'
      ],
      rules: [
        v => !!v || 'This is required !'
      ]
    }
  },
  methods: {
    async send () {
      this.splitText()
      let str = `${this.input_form.system}\u00A0${this.input_form.maintainer}\u00A0${this.input_form.image_output_name}\u00A0${this.input_form.image}`
      console.log(str)
      try {
        await DownloadService.customD({
          string: str
        })
      } catch (err) {
        console.log(err)
      }
    },
    // setOptionText (text) {
    //   this.$emit('set-option-text', {
    //     optionText: text
    //   })
    // },
    splitText: function () {
      if (this.input_form.Other_instr === '') {
        this.input_form.instr = this.input_form.instr
      } else {
        this.input_form.instr = this.input_form.Other_instr.split(/[(\r\n)\r\n]+/)
        this.input_form.instr = this.input_form.instr.map(function (v) { return v.replace(/^\s+|\s+$/g, '') })
      }
    }
  }
  // components: {
  //   Menu
  // time: new Date(),
  // }
}
</script>

<style scoped>
.v-navigation-drawer--mini-variant, .v-navigation-drawer {
  overflow: visible !important;
}
</style>

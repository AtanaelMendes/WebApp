<template>
  <div >
      <q-btn-group class="row" flat >
        <q-btn flat  color="primary" icon="rotate_left" @click="croppa.rotate(-1)"/>
        <q-btn flat  color="primary" icon="rotate_right" @click="croppa.rotate(1)"/>
        <q-btn flat  color="primary" icon="clear" @click="croppa.remove()"/>
      </q-btn-group>


    <div class="row q-mt-sm">
      <croppa v-model="croppa"
              :width="800"
              :height="500"
              :remove-button-size="30"
              :show-remove-button="false"
              placeholder="Clique para selecionar uma imagem"
              :prevent-white-space="true"/>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "ImageUpload",
    props: {
      url: String,
    },
    data: function(){
      return {
        croppa: {}
      }

    },
    methods: {
      uploadImage() {
        if (!this.croppa.hasImage()) {
          this.$emit('on_error', 'Selecione uma imagem para continuar');
          return
        }

        this.croppa.generateBlob((blob) => {
          var data = new FormData();
          data.append('image', blob, 'filename.jpg');

          Vue.prototype.$axios.post(this.url, data).then(response => {
            this.$emit('on_upload_success', response);
          }).catch(error => {
            this.$emit('on_upload_error', error.response);
          })
        })
      },
      clear(){
        this.croppa.remove();
      }
    }
  }
</script>

<style scoped>
  .croppa-container {
    background-color: #edebeb;
    border: 1px solid grey;
  }
</style>

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
              :quality="1"
              :show-loading="true"
              :show-remove-button="false"
              placeholder="Clique para selecionar uma imagem"
              :placeholder-font-size="labelSize"
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
    computed:{
      labelSize: function () {
        return this.$q.screen.lt.sm ? 40 : 20;
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

<style >
  .croppa-container {
    background-color: #edebeb;
    border: 1px solid grey;
    max-width: 800px;
    margin: 0 20px;
  }

  .croppa-container canvas{
    width: 100% !important;
    height: auto !important;
  }
</style>

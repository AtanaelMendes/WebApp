<template>
  <div class="row space-end" v-if="visible">
    <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 col-xl-5">
      <q-card-media overlay-position="top" style="max-height: 40vh">
        <ap-image size="800x500" :file-name="cultura.image_file_name"/>
        <q-card-title slot="overlay">
          {{cultura.nome}}
          <div slot="right" class="row items-center">
            <q-btn flat round dense color="white" icon="more_vert" >
              <q-popover anchor="bottom left">
                <q-list link>
                  <q-item v-close-overlay @click.native="openChangePhotoModal(cultura.id)">
                    <q-item-main label="Alterar Imagem"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </div>
        </q-card-title>
      </q-card-media>
    </div>
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">a</div>
  </div>
</template>

<script>
  import apImage from 'components/ApImage'
  export default {
    name: "ResumoTab",
    components:{
      apImage
    },
    props:{
      visible: false
    },
    data() {
      return {
        cultura: null,
      }
    },
    methods: {
      init(cultura) {
        this.cultura = cultura;
      },
      openChangePhotoModal(culturaId){

      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end">
      {{caminhao}}
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import imapeUpload from 'components/ImageUpload'
  import CaminhaoService from "../../../assets/js/service/CaminhaoService";

  export default {
    name: "caminhao-view",
    components: {
      toolbar,
      customPage,
      imapeUpload,
    },
    watch: {},
    computed: {},
    data(){
      return{
        caminhaoService: new CaminhaoService(),
        caminhao: null,
      }
    },
    methods: {
      getCaminhaoById: function(id){
        this.$q.loading.show();
        this.caminhaoService.getCaminhaoById(id).then(caminhao => {
          this.caminhao = caminhao;
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações.'});
          this.$q.loading.hide();
        })
      },
      backAction: function () {
        // this.$router.go(-1);
        this.$router.back()
      }
    },
    mounted(){
      this.getCaminhaoById(this.$route.params.id);
    }
  }
</script>

<style>
</style>

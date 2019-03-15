<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end">
      {{armazem}}
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import armazemService from 'assets/js/service/armazem/ArmazemService'
  export default {
    name: "armazem-view",
    components: {
      toolbar,
      customPage,
    },
    watch: {},
    computed: {},
    data(){
      return{
        armazem: null,
      }
    },
    methods: {
      getArmazemById: function(id){
        this.$q.loading.show();
        armazemService.getArmazemById(id).then(response => {
          this.armazem = response.data;
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
      this.getArmazemById(this.$route.params.id);
    }
  }
</script>

<style>
</style>

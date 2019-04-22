<template>
  <custom-page widthInner="60%" isParent v-if="cultura">
    <toolbar slot="toolbar" :title="cultura.nome" navigation_type="back" @navigation_clicked="backAction"></toolbar>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import CulturaService from "../../../assets/js/service/cultura/CulturaService";

  export default {
    name: "CulturaView",
    components: {
      toolbar,
      customPage,
    },
    data () {
      return {
        culturaService: new CulturaService(),
        cultura: null,
      }
    },
    methods:{
      getCulturaById(){
        this.culturaService.getCultura(this.$route.params.id).then(cultura => {
          this.cultura = cultura;
        })
      },
      backAction() {
        this.$router.back();
      },
    },
    mounted(){
      this.getCulturaById();
    }
  }
</script>

<style scoped>

</style>

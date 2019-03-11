<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction">
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end">Desenvolvendo</div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import areaService from 'assets/js/service/area/AreaService'
  import imapeUpload from 'components/ImageUpload'

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
      return{}
    },
    methods: {
      backAction: function () {
        // this.$router.go(-1);
        this.$router.back()
      }
    },
    mounted(){}
  }
</script>

<style>
</style>

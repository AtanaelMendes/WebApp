<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Safra">
    </toolbar>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'

  export default {
    name: "SafraView",
    components: {
      toolbar,
      customPage,
    },
    methods:{
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    }
  }

</script>

<style scoped>

</style>

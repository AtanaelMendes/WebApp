<template>

  <custom-page>
    <toolbar slot="toolbar" title="Início" navigation_type="menu"></toolbar>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'

    export default {
      name: "Dashboard",
      data () {
        return {
        }
      },
      components: {
        toolbar,
        customPage
      },
      methods: {
      }
    }
</script>

<style scoped>

</style>

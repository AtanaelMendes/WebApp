<template>
  <custom-page isParent>
    <toolbar slot="toolbar" title="Culturas" searchable navigation_type="menu" >
    </toolbar>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'

  export default {
    name: "CulturaList",
    omponents: {
      toolbar,
      customPage
    }
  }
</script>

<style scoped>

</style>

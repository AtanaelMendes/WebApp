<template>
  <div>
    <toolbar title="teste inner" type="close"></toolbar>
    <span>Dashboard inner</span>
  </div>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'

    export default {
        name: "Teste",
      components: {
        toolbar
      }
    }
</script>

<style scoped>

</style>

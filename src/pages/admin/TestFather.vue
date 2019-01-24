<template>

  <custom-page hasMargin>
    <toolbar slot="toolbar" title="teste" navigation_type="menu" @navigation_clicked="test"></toolbar>

    <span>Dashboard</span><br/>
    <q-btn label="Inner" @click="openChildPage" /><br/>
    <p v-for="item in 100">a</p>

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
      methods: {
        test(){
        },
        openChildPage(){
          this.$router.push('/admin/teste/child');
        }
      },
      components: {
        toolbar,
        customPage
      }
    }
</script>

<style scoped>

</style>

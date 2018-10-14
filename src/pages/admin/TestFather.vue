<template>

  <custom-page>
    <template slot="toolbar">
      <toolbar title="teste" navigation_type="menu" @navigation_clicked="test"></toolbar>
    </template>

    <template slot="content">
      <span>Dashboard</span><br/>
      <q-btn label="Inner" @click="openChildPage" /><br/>
      <p v-for="item in 100">a</p>
    </template>

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
          console.log("teste")
        },
        openChildPage(){
          this.$router.push('/teste/child');
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

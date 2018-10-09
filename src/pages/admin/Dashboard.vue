<template>
  <div style="display: flex">
    <div style="flex-grow: 1" :class="{'teste' : $q.platform.is.mobile}" >
      <toolbar title="teste" type="menu" @menu_clicked="test"></toolbar>
      <span>Dashboard</span>
      <q-btn label="Inner" @click="openChildPage" />
    </div>
    <router-view style="flex-grow: 1"/>
  </div>
</template>

<script>
    import toolbar from 'components/Toolbar.vue'
    import {Platform} from 'quasar'

    export default {
        name: "Dashboard",
      data () {
        return {}
      },
      methods: {
        test(){
          console.log("teste")
        },
        openChildPage(){

        }
      },
      components: {
        toolbar
      }
    }
</script>

<style scoped>
  .teste{
    flex-grow: 0 !important;
  }
</style>

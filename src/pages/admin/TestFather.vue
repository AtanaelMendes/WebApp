<template>
  <q-page style="display: flex">
    <div style="flex-grow: 1" v-if="!hideMainPage" >
      <toolbar title="teste" navigation_type="menu" @navigation_clicked="test"></toolbar>
      <span>Dashboard</span>
      <q-btn label="Inner" @click="openChildPage" />
    </div>

    <router-view style="flex-grow: 1.5" />
  </q-page>
</template>

<script>
    import toolbar from 'components/Toolbar.vue'

    export default {
        name: "Dashboard",
      data () {
        return {
          hideMainPage: false,
        }
      },
      created(){
        if(this.$q.screen.lt.md) {
          this.hideMainPage = this.$route.path == '/admin' ? false : true
        }
      },
      methods: {
        test(){
          console.log("teste")
        },
        openChildPage(){
          this.$router.push('/admin/teste');
        }
      },
      components: {
        toolbar
      },
      beforeRouteUpdate (to, from, next) {
        console.log("beforeRouteEnter")
        if(this.$q.screen.lt.md){
          this.hideMainPage = to.path == '/admin' ? false : true;
        }
        next();
      }
    }
</script>

<style scoped>
</style>

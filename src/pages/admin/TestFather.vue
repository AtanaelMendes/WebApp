<template>
  <q-page style="display: flex">
    <div style="flex-grow: 1" v-if="!hideMainPage"  >
      <toolbar title="teste" navigation_type="menu" @navigation_clicked="test"></toolbar>
      <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: 'red',
        width: '10px',
        opacity: 1}">

        <div class="q-pa-sm">
          <span>Dashboard</span><br/>
          <q-btn label="Inner" @click="openChildPage" /><br/>
          <p v-for="item in 100">a</p>
        </div>

      </q-scroll-area>
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
          this.hideMainPage = this.$route.path == '/admin/teste' ? false : true
        }
      },
      methods: {
        test(){
          console.log("teste")
        },
        openChildPage(){
          this.$router.push('/admin/teste/child');
        }
      },
      components: {
        toolbar
      },
      beforeRouteUpdate (to, from, next) {
        console.log("beforeRouteEnter")
        if(this.$q.screen.lt.md){
          this.hideMainPage = to.path == '/admin/teste' ? false : true;
        }
        next();
      }
    }
</script>

<style scoped>
</style>

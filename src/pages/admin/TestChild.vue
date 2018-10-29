<template>
  <custom-page hasMargin>

    <toolbar slot="toolbar" title="teste inner" :navigation_type="navigationType" @navigation_clicked="goToBack">
      <template slot="action_itens">
        <q-btn flat round dense icon="more_vert"  @click="openMenu" />
      </template>
    </toolbar>

    <span>Dashboard inner</span>
    <p v-for="item in 100">b</p>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'

    export default {
      name: "Teste",
      components: {
        toolbar,
        customPage
      },
      data() {
        return {
          navigationType: this.$q.screen.lt.md ? 'back' : ''
        }
      },
      methods: {
        goToBack: function(navigationType){
          this.$router.back();
        },
        openMenu: function () {
          console.log('openMenu')
        }
      }
    }
</script>

<style scoped>

</style>

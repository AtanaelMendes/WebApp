<template>
  <div>
    <toolbar title="teste inner" :navigation_type="navigationType" @navigation_clicked="goToBack">
      <template slot="action_itens">
        <q-btn flat round dense icon="more_vert"  @click="openMenu" />
      </template>
    </toolbar>
    <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: 'red',
        width: '10px',
        opacity: 1}">

      <span>Dashboard inner</span>
      <p v-for="item in 100">b</p>

    </q-scroll-area>
  </div>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'

    export default {
      name: "Teste",
      components: {
        toolbar
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

<template>
  <q-dialog
    prevent-close
    v-model="isModalOpened">
    <span slot="title">Aguarde!</span>

    <div slot="body" align="center">
      <q-icon name="mdi-sync" size="50px" class="animate-spin"/>
      <p class="q-my-none q-mt-md">Sincronizando...</p>
    </div>

    <template slot="buttons" slot-scope="props"></template>
  </q-dialog>
</template>

<script>
  export default {
    name: "SyncProgressDialog",
    data () {
      return {
        isModalOpened: false,
      }
    },
    methods: {
      openModal(){
        this.isModalOpened = true;
      },
      closeModal(){
        this.isModalOpened = false;
      },
    },
  }
</script>

<style scoped>

</style>

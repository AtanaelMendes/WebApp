<template>
  <q-dialog
    v-model="isModalOpened">
    <span slot="title">Ops!</span>

    <div slot="body" align="center">
      <q-icon name="mdi-wifi-off" size="50px"/>
      <p class="q-my-none q-mt-md">Esta ação não é permitida enquanto você está sem conexão com a internet!</p>
    </div>

    <template slot="buttons" slot-scope="props">
      <q-btn flat label="OK" @click="onOk" />
    </template>
  </q-dialog>
</template>

<script>
  export default {
    name: "ForbiddenAccessDialog",
    data () {
      return {
        isModalOpened: false,
      }
    },
    methods: {
      openModal(){
        this.isModalOpened = true;
      },
      onOk(){
        this.isModalOpened = false;
      }
    },
    mounted() {
      this.$root.$on('openForbiddenAccessDialog', this.openModal);
    },
    destroyed() {
      this.$root.$off('openForbiddenAccessDialog', this.openModal);
    }
  }
</script>

<style scoped>

</style>

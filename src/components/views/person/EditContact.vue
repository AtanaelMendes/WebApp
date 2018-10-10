<template>
  <AgroLayout back-path="/exemplo">
    <template slot="title">
      Novo Cadastro
    </template>


    <div slot="content" >

    </div>
  </AgroLayout>
</template>

<script>

  import AgroLayout from 'layouts/AgroLayout'

  export default {
    name: 'index-example',
    components: {
      AgroLayout
    },
    data () {
      return {
      }
    },
    methods: {


    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

<template>
  <AgroLayout back-path="/exemplo">
    <div slot="title">
      Novo Cadastro
    </div>


    <div slot="content" >

      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">

      </div>

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
      loaded: false,
    }
  },
  methods: {
    axiosRequest: function() {
      let vm = this
      vm.$axios.get( 'rota/'+ vm.$route.params.id ).then( response => {
        vm.var = response.data
        vm.loaded = true
      }).catch( error => {})
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

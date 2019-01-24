<template>
  <AgroLayout drawer back-path="/exemplo">
    <div slot="title">
      Titulo
    </div>

    <!-- Menu Drawer (Esquerda) -->
    <div slot="drawer" width="200" style="width: 200px;">
      <q-list highlight no-border>

        <q-item>
          <q-item-side icon="place"/>
          <q-item-main>
            link exemplo
          </q-item-main>
        </q-item>

      </q-list>
    </div>

    <div slot="content" >

      <div>

      <q-infinite-scroll :handler="exampleFunction" ref="infiniteScroll">

      <q-list highlight inset-separator>


      </q-list>
      </q-infinite-scroll>
      </div>

      <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn round color="primary" @click="confirmarRequisicoes()" icon="done" />
      </q-page-sticky> -->
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
      filter: { },
      pedidos: []
    }
  },

  watch: {
    // observa filter, sempre que alterado chama a api
    filter: {
      handler: function (val, oldVal) {
        this.exampleFunction(0, null)
      },
      deep: true
    }
  },

  methods: {

    exampleFunction: function (index, done) {

      // se primeiro registro scroll infinito
      // limpa array de pedidos
      if (index == 0) {
        this.pedidos = []
      }

      // monta parametros de busca
      let params = {
        page: (index + 1)
      }

      // busca registros
      let vm = this
      vm.$axios.get('pedido', { params }).then(function(request){

        // concatena no array de pedidos os registros retornados pela api
        vm.pedidos = vm.pedidos.concat(request.data)

        // se foi chamado pelo scroll infinito
        if (done) {

          // se nao veio mais registros, interrompe o scroll infinito
          if (request.data.length === 0) {
            vm.$q.notify({
              message: 'Fim!',
              type: 'warning',
            })
            vm.$refs.infiniteScroll.stop()

          // se veio mais registros, continua scroll infinito
          } else {
            vm.$q.notify({
              message: 'Mais ' + request.data.length + ' registros carregados!',
              color: 'primary',
              icon: 'add',
            })
            vm.$refs.infiniteScroll.resume()
          }
          done()
        }

        if (index > 0) {
        }

      }).catch(function(error) {
        vm.$q.notify({
          message: 'Erro ao carregar Pedidos!',
          type: 'negative',
        });
      })
    },

  },
  mounted() {
    this.id = this.$route.params.id;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

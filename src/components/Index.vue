<template>
  <AgroLayout drawer class="bg-green-1">

    <template slot="title" class="fundo">
      Início
    </template>

    <div slot="drawer">
      <q-list link no-border>
        <q-list-header>Menu</q-list-header>

        <q-item>
          <q-item-side icon="receipt"/>
          <q-item-main>
            Emissão de Notas
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-side icon="gavel"/>
          <q-item-main>
            Contratos
          </q-item-main>
        </q-item>

        <!-- <q-item>
          <q-item-side icon="receipt"/>
          <q-item-main>
          </q-item-main>
        </q-item> -->

        <q-item>
          <q-item-side icon="info"/>
          <q-item-main>
            Sobre
          </q-item-main>
        </q-item>

      </q-list>
    </div>

    <div slot="content" class="layout-padding">
      <div class="row gutter-sm justify-center">


      </div>
    </div>

  </AgroLayout>
</template>

<script>
import AgroLayout from '../layouts/AgroLayout'

export default {
  name: 'index',
  components: {
    AgroLayout
  },

  data () {
    return {
      left: false
    }
  },
  methods: {
    getCredentials: function (){
      let vm = this
      vm.$axios.get('account').then(response => {

        // localStorage.setItem('auth.usuario.usuario', response.data.user.usuario)
        // localStorage.setItem('auth.usuario.codusuario', response.data.user.codusuario)
        //
        // this.$store.commit('perfil/updatePerfil', {
        //   usuario: localStorage.getItem('auth.usuario.usuario'),
        //   codusuario: localStorage.getItem('auth.usuario.codusuario')
        // })

      }).catch(error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    }
  },
  mounted () {
    this.getCredentials()
  }

}
</script>

<style>
.img-responsive{
  height: auto;
  width: auto;
}
</style>

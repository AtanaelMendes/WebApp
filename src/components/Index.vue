<template>
  <AgroLayout leftDrawer class="bg-green-1">

    <template slot="title">
      Início
    </template>

    <div slot="leftDrawer">
      <q-item>
        <q-item-side link to="/inbox/1"/>
        <q-item-main @click.native="$router.push('/usuario/perfil')" style="cursor:pointer">
          Atanael
        </q-item-main>
        <q-item-side link icon="exit_to_app" @click.native="logout" style="cursor:pointer"/>
      </q-item>

      <q-list link no-border>

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

        <q-item>
          <q-item-side icon="account_box"/>
          <q-item-main @click.native="$router.push('/cadastro')">
            Criar novo usuário
          </q-item-main>
        </q-item>

        <q-item>
          <q-item-side icon="info"/>
          <q-item-main>
            Sobre
          </q-item-main>
        </q-item>

      </q-list>
    </div>

    <div slot="content">
    <!-- <div slot="content" class="layout-padding"> -->
      <!-- <div class="row gutter-sm justify-center">
      </div> -->
    <q-page-container class="dash">
    </q-page-container>
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
      vm.$axios.get('account/info').then(response => {

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
    },
    logout () {
      var vm = this

      vm.$q.dialog({
        title: 'Sair do sistema',
        message: 'Tem certeza que deseja sair?',
        ok: 'Sair',
        cancel: 'Cancelar'
      }).then(() => {

        console.log('pegando o token_id')

        vm.$axios.get('oauth/personal-access-tokens').then(response => {
          vm.token_id = response.data[0].id

        }).then(function (){

          console.log('deletando o token')

          vm.$axios.delete('oauth/personal-access-tokens/' + vm.token_id).then(response => {

            if (response.status === 200){
              localStorage.removeItem('auth.token')
              localStorage.removeItem('auth.refresh_token')

              router.push('/login')

              vm.$q.notify({
                message: 'Até mais...',
                type: 'positive',
              })

            }
          })
        })
      })
    }
  },
  mounted () {
    this.getCredentials()
  }

}
</script>

<style>
.dash {
  background-image: url("/statics/images/dash.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color:#464646;
  height: 100vh;
}
.img-responsive{
  height: auto;
  width: auto;
}
</style>

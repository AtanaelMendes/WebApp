<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="fundo">
      <q-page>
        <div class="row">
          <div class="col-xs-8 col-sm-6 col-md-4 col-lg-3 fixed-center">
            <q-card class="login q-pa-sm">

              <q-card-media align="center" class="q-pa-md">
                <img class="logo shadow-10" src="/statics/images/logo.jpg" />
              </q-card-media>

              <q-card-main class="gutter-y-sm">
                <div>
                  <q-input v-model="username" float-label="Usuário" autofocus />
                  <q-input v-model="password" type="password" float-label="password" />
                </div>

                <div class="gutter-y-sm">
                  <div>
                    <q-btn @click="login()" class="full-width btn" color="secondary" label="entrar"/>
                  </div>
                  <div align="end">
                    <q-btn @click="modalPassRecover = true" dense color="primary" flat label="esqueci minha senha"/>
                  </div>
                </div>

              </q-card-main>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-modal minimized v-model="modalPassRecover">
      <div class="justify-center">
        <div class="col-xs-10 col-sm-8 col-md-6 col-lg-4 q-pa-lg gutter-y-sm">

          <div>
            <p class="text-justify">
              Ao clicar em <strong>RECUPERAR</strong> será enviado<br />
              um email com o link para a recuperação<br />
              de senha.
            </p>
          </div>

          <div>
            <q-field>
              <q-input placeholder="insira seu email" type="email" float-label="Email" v-model="emailRecover"/>
            </q-field>
          </div>

          <div align="end">
            <q-btn color="secondary" label="recuperar"/>&nbsp
            <q-btn @click="modalPassRecover = false" color="primary" flat label="fechar"/>
          </div>

        </div>
      </div>
    </q-modal>

  </q-layout>
</template>


<script>
export default {
  name: 'login',
  data () {
    return {
      emailRecover: null,
      username: 'mendes@mendes.com',
      password: "12345678",
      erro: false,
      mensagem: 'mensagem',
      modalPassRecover: false
    }
  },

  components: {
  },
  created() {
    //do something after creating vue instance
  },
  methods: {

    login: function (e) {
      var vm = this
      let data = {
        grant_type: 'password',
        client_id: '2',
        client_secret: 'uY0WBc41kKaSxqpaiga5iOgK0afD0DxzhVLxXkxc',
        scope: null,
        username: vm.username,
        senha: vm.password
      }
      // Busca Autenticacao
      vm.$axios.post('oauth/token', data).then(response => {
        // salva token no Local Storage
        let token = response.data.token
        let refresh_token = response.data.refresh_token
        localStorage.setItem('auth.token', token)
        localStorage.setItem('auth.refresh_token', refresh_token)

        vm.$axios.get('account/').then(response => {

          localStorage.setItem('auth.user.user', response.data.user.usuario)
          localStorage.setItem('auth.user.coduser', response.data.user.codusuario)

          this.$store.commit('perfil/updatePerfil', {
            user: localStorage.getItem('auth.user.user'),
            coduser: localStorage.getItem('auth.user.coduser')
          })

        }).catch(error => {
          console.log('Erro Ocorrido:')
          console.log(error)
        })
        // vm.$router.push('/')
      }).catch(error => {
        // Mensagem de erro
        console.log('Erro Ocorrido:')
        this.erro = true
        this.mensagem = error.response.data.mensagem
      })
    }

  }
}
</script>
<style>

.logo {
  border-radius: 50%;
}
.fundo {
  background-image: url("/statics/images/fundo.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color:#464646;
}
.login {
  background-color: rgba(255, 255, 255, 0.8);
}

</style>

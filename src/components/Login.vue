<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="fundo">
      <q-page>
        <div class="row">
          <div class="col-xs-8 col-sm-6 col-md-4 col-lg-3 fixed-center">
            <q-card class="login q-pa-sm">

              <q-card-media align="center" class="q-pa-md">
                <img class="logo" src="/statics/logo.jpg" />
              </q-card-media>

              <q-card-main class="gutter-y-sm">
                <div>
                  <q-input v-model="usuario" float-label="Usuário" autofocus />
                  <q-input v-model="senha" type="password" float-label="Senha" />
                </div>

                <div class="gutter-y-sm">
                  <div>
                    <q-btn @click="login()" class="full-width btn" color="secondary" label="entrar"/>
                  </div>
                  <div align="end">
                    <q-btn @click="modalRecuperacaoSenha = true" dense color="primary" flat label="esqueci minha senha"/>
                  </div>
                </div>

              </q-card-main>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-modal  maximized v-model="modalRecuperacaoSenha">
      <div class="row justify-center">
        <div class="col-xs-10 col-sm-8 col-md-6 col-lg-4 q-pa-lg">
          <q-card>
            <q-card-media class="q-pa-md">
              <img class="logo" src="/statics/logo.jpg" />
            </q-card-media>
            <q-card-separator/>

            <q-card-main>
              <p class="text-justify">
                Ao clicar em <strong>RECUPERAR</strong>
                será lhe enviado um email com o link para a recuperação de senha.
              </p>
              <q-input type="email" float-label="Email"/>
            </q-card-main>
            <q-card-separator/>

            <q-card-actions align="end">
              <q-btn color="secondary" label="recuperar"/>
              <q-btn @click="modalRecuperacaoSenha = false" color="primary" flat label="voltar"/>
            </q-card-actions>

          </q-card>
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
      usuario: 'peter@klaven',
      senha: "cityslicka",
      erro: false,
      mensagem: 'mensagem',
      modalRecuperacaoSenha: false
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
        usuario: vm.usuario,
        senha: vm.senha
      }
      console.log("aqui")
      // Busca Autenticacao
      vm.$axios.post('https://reqres.in/api/login', data).then(response => {
        // salva token no Local Storage
        let token = response.data.token
        localStorage.setItem('auth.token', token)

        vm.$axios.get('auth/user').then(response => {
          // salva código da imagem avatar do usuário
          localStorage.setItem('auth.usuario.avatar', response.data.user.avatar)
          localStorage.setItem('auth.usuario.usuario', response.data.user.usuario)
          localStorage.setItem('auth.usuario.codusuario', response.data.user.codusuario)
          this.$store.commit('perfil/updatePerfil', {
            usuario: localStorage.getItem('auth.usuario.usuario'),
            avatar: localStorage.getItem('auth.usuario.avatar'),
            codusuario: localStorage.getItem('auth.usuario.codusuario')
          })
        }).catch(error => {
          console.log(error.response)
        })
        vm.$router.push('/')
      }).catch(error => {
        // Mensagem de erro
        console.log('erro no login')
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
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.4);
}
.fundo {
  background-image: url("/statics/fundo.jpg");
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

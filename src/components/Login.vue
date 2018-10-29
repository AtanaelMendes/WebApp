<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="fundo">
      <q-page class="row justify-center">
          <div class="col-xs-8 col-sm-6 col-md-4 col-lg-3 q-pt-md">

            <q-card class="login q-pa-sm">

              <q-card-media align="center" class="q-pa-md">
                <img class="logo shadow-10" src="/statics/images/logo.jpg" />
              </q-card-media>

              <q-card-main class="gutter-y-sm">

                <div>
                  <form @keyup.enter="submit">

                    <q-input v-model="form.username" @blur="$v.form.username.$touch"
                      :error="$v.form.username.$error" type="email"
                      float-label="Email" placeholder="insira seu email"
                    />

                    <q-input v-model="form.password" @blur="$v.form.password.$touch"
                      :error="$v.form.password.$error" type="password"
                      float-label="Senha" placeholder="Insira sua senha"
                    />

                  </form>
                </div>

                <div class="gutter-y-sm">
                  <div>
                    <q-btn class="full-width" color="secondary" @click="submit" label="entrar"/>
                  </div>

                  <div align="end">
                    <q-btn @click="modalPassRecover = true" dense color="primary" flat label="esqueci minha senha"/>
                  </div>
                </div>

              </q-card-main>
            </q-card>
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

          <div v-if="modalPassRecover">
            <form @keyup.enter="submit">

              <q-input v-model="emailRecover" @blur="$v.emailRecover.$touch"
                :error="$v.emailRecover.$error" type="email"
                float-label="Email" placeholder="insira seu email"
              />

            </form>
          </div>

          <div align="end">
            <q-btn @click="submitRecover" color="secondary" label="recuperar"/>&nbsp
            <q-btn @click="modalPassRecover = false" color="primary" flat label="fechar"/>
          </div>

        </div>
      </div>
    </q-modal>

  </q-layout>
</template>


<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { Loading } from 'quasar'

export default {
  name: 'login',
  data () {
    return {
      form: {
        username: 'mendes@mendes.com',
        password: '12345678',
        // username: 'mendes@mendes.com',
        // password: "12345678",
      },
      emailRecover: null,
      erro: false,
      mensagem: 'mensagem',
      modalPassRecover: false
    }
  },
  validations: {
    form: {
      username: { required, email },
      password: { required, minLength: minLength(8) }
    },
    emailRecover: {required, email },
  },
  components: {
  },
  created() {
    //do something after creating vue instance
  },
  methods: {
    submitRecover: function () {
      this.$v.emailRecover.$touch()

      if ( this.$v.emailRecover.$error ) {
        this.$q.notify( 'Email inválido' )
        return
      }
    },
    submit: function (e) {

      Loading.show()

      this.$v.form.$touch()
      if ( this.$v.form.$error ) {
        this.$q.notify( 'Email ou Senha inválido' )
        return
      }

      var vm = this
      let params = {
        grant_type: 'password',
        client_id: '2',
        client_secret: 'uY0WBc41kKaSxqpaiga5iOgK0afD0DxzhVLxXkxc',
        scope: null,
        username: vm.form.username,
        password: vm.form.password
      }
      // Busca Autenticacao
      vm.$axios.post( 'oauth/token', params ).then( response => {

        // salva token no Local Storage
        let token = response.data.access_token
        let refresh_token = response.data.refresh_token
        localStorage.setItem( 'auth.token', token )
        localStorage.setItem( 'auth.refresh_token', refresh_token )

        Loading.hide()
        vm.$router.push( '/' )
      }).catch( error => {
        // Mensagem de erro
        console.log('Erro Login Ocorrido:')
        this.erro = true
        console.log(error)
        this.mensagem = error.response.data.mensagem
        Loading.hide()
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

<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="background">
      <q-page class="row justify-center">
        <div class=" q-pt-md" style="text-align: center">

          <h1 class="title">AgroProject</h1>
          <q-card class="login" color="white" text-color="black" inline style="max-width: 500px; min-width: 400px; text-align: left" >
            <q-card-title >
              Bem vindo ao AgroProject
            </q-card-title>
            <q-card-main class="gutter-y-sm">
              <div>
                <form @keyup.enter="login">
                  <custom-input-text type="email" placeholder="Digite seu email" label="Email" :model="form.email" />

                  <custom-input-text type="password" placeholder="Digite sua senha" label="Senha" :model="form.password" />
                </form>
              </div>

              <q-btn class="full-width q-mt-lg" color="primary" rounded push @click="login" label="entrar"/>

              <div align="end">
                <q-btn  @click="openPasswordRecoveryModal" color="secondary" flat label="esqueci minha senha"/>
              </div>

            </q-card-main>
          </q-card>
        </div>
      </q-page>
    </q-page-container>

    <q-modal minimized v-model="passwordRecoveryModalOpened" @hide="clearResetPasswordForm()">
      <div class="col-xs-10 col-sm-8 col-md-6 col-lg-4 q-pa-lg" style="width: 400px">

        <span>Digite seu email para receber um link para cadastramento de uma nova senha na sua caixa de entrada.</span>

        <div v-if="passwordRecoveryModalOpened">
          <form @keyup.enter="login">

            <custom-input-text type="email" placeholder="Digite seu email" label="Email" :model="resetPasswordForm.email" />

          </form>
        </div>

        <div align="end">
          <q-btn @click="closePasswordRecoveryModal" color="primary" flat label="Cancelar" class="q-mr-sm"/>
          <q-btn @click="submitPasswordRecoveryForm" color="primary" label="recuperar"/>
        </div>

      </div>
    </q-modal>

  </q-layout>
</template>


<script>
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import { Loading } from 'quasar'
  import customInputText from 'components/CustomInputText.vue'

  export default {
    name: 'login',
    components: {
      customInputText
    },
    data () {
      return {
        form: {
          email: {
            value: 'mendes@mendes.com',
            errorMessage: null
          },
          password: {
            value: '12345678',
            errorMessage: null
          },
        },
        resetPasswordForm: {
          email: {
            value: null,
            errorMessage: null
          },
        },
        passwordRecoveryModalOpened: false,

      }
    },

    validations: {
      form: {
        email: { value: { required, email } },
        password: { value: {required, minLength: minLength(8) } }
      },
      resetPasswordForm: {
        email: { value: { required, email } }
      }
    },
    created() {
      let token = localStorage.getItem('auth.token');

      if (token != null) {
        this.$router.push('/admin')
      }
    },
    methods: {
      openPasswordRecoveryModal: function(){
        this.passwordRecoveryModalOpened = true;
      },
      closePasswordRecoveryModal: function(){
        this.passwordRecoveryModalOpened = false
      },
      clearResetPasswordForm : function(){
        this.resetPasswordForm.email.value = null;
        this.resetPasswordForm.email.errorMessage = null;
      },
      submitPasswordRecoveryForm: function () {
        this.$v.resetPasswordForm.$touch();

        if (this.$v.resetPasswordForm.$error ) {

          if(!this.$v.resetPasswordForm.email.value.required){
            this.resetPasswordForm.email.errorMessage = "Digite um email"
          }else if(!this.$v.resetPasswordForm.email.value.email){
            this.resetPasswordForm.email.errorMessage = "Este email é inválido."
          }
          return;
        }
        //TODO: Implementar a lógica aqui
      },
      login: function () {
        this.$v.form.$touch();

        if (this.$v.form.$error) {

          if(!this.$v.form.email.value.required){
            this.form.email.errorMessage = "Digite um email"
          }else if(!this.$v.form.email.value.email){
            this.form.email.errorMessage = "Este email é inválido."
          }

          if(!this.$v.form.password.value.required){
            this.form.password.errorMessage = "Digite uma senha."
          }else if(!this.$v.form.password.value.minLength){
            this.form.password.errorMessage = "A senha deve ter no mínimo 8 caracteres."
          }

          return
        }

        Loading.show();

        let params = {
          grant_type: 'password',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          scope: null,
          username: this.form.email.value,
          password: this.form.password.value
        };

        this.$axios.post( 'oauth/token', params ).then( response => {
          localStorage.setItem( 'auth.token', response.data.access_token );
          localStorage.setItem( 'auth.refresh_token', response.data.refresh_token );

          Loading.hide();
          this.$router.push( '/admin' );
        }).catch( error => {
          Loading.hide();
          switch(error.response.status){
            case 401:
              this.showErrorDialog("Email e/ou senha incorretos!")
              break;
          }

        })
      },
      showErrorDialog: function (message) {
        this.$q.dialog({
          title: 'Ops!',
          message: message,
          ok: true,
        })
      }
    }
  }
</script>
<style>
  .background {
    background-image: url('/assets/login_background.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #05614f99;
    background-blend-mode: darken;
  }
  .title{
    color: white;
    font-weight: 800;
    text-align: center;
    font-size: 80px;
  }
</style>

<template>
  <AgroLayout back-path="/">

    <template slot="title">
      Cadastrar Usuário
    </template>
    <!-- <div slot="drawer"></div> -->

    <div slot="content" class="layout-padding">
      <div class="row gutter-sm">
        <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 gutter-y-sm">
          <div>
            <q-input v-model="form.email" placeholder="informe seu email" float-label="Email" type="text"
              @blur="$v.form.email.$touch" :error="$v.form.email.$error"
            />
            <q-input v-model="form.password" placeholder="mínimo 8 caracteres" float-label="Senha" type="password"
              @blur="$v.form.password.$touch" :error="$v.form.password.$error"
            />
            <q-input v-model="form.repeatPassword" placeholder="mínimo 8 caracteres" float-label="Confirmar Senha" type="password"
              @blur="$v.form.repeatPassword.$touch" :error="$v.form.repeatPassword.$error"
            />
          </div>
          <div align="end">
            <q-btn color="secondary" label="Cadastrar" @click="create()"/>
          </div>

        </div>
      </div>
    </div>

  </AgroLayout>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import AgroLayout from 'layouts/AgroLayout'

export default {
  name: 'index',
  components: {
    AgroLayout
  },

  data () {
    return {
      form:{
        email: 'mendes@mendes.com',
        password: null,
        repeatPassword: null
      }
    }
  },
  validations: {
    form: {
      email: { required, email},
      password: { required,  minLength: minLength(8) },
      repeatPassword: { sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    create: function () {
      this.$v.form.$touch()
      if ( this.$v.form.$error ) {
        this.$q.notify( 'Email ou Senha inválido(s)' )
        return
      }

      let vm = this

      let params = {
        email: vm.form.email,
        password: vm.form.password,
        repeatPassword: vm.form.repeatPassword
      }

      vm.$axios.post( 'create-cad', params ).then( response => {

      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    }
  },
  mounted () {
  }

}
</script>

<style>
.img-responsive{
  height: auto;
  width: auto;
}
</style>

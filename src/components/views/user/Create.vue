<template>
  <AgroLayout back-path="/">

    <template slot="title">
      Cadastrar Usuário
    </template>
    <!-- <div slot="drawer"></div> -->

    <div slot="content">
      <q-list highlight no no-border>
        <template v-if="users">
          <template v-for="user in users">
            <q-item>
              <q-item-side icon="account_circle"/>
              <q-item-main>
                <q-item-tile>
                  {{user.id}}
                </q-item-tile>
                <q-item-tile>
                  {{user.email}}
                </q-item-tile>
              </q-item-main>
              <q-item-side>
                <q-item-tile>
                  <q-icon name="date_range"/> 16 maio 1989
                </q-item-tile>
                <q-item-tile></q-item-tile>
              </q-item-side>
            </q-item>
            <q-item-separator />
          </template>
        </template>
      </q-list>

      <template>
        <q-modal v-model="opened" maximized class="gutter-y-sm">
          <q-page padding class="row">
            <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4 gutter-sm">

              <div>
                <q-input v-model="form.email" placeholder="informe seu email" float-label="Email" type="text"
                  @blur="$v.form.email.$touch" :error="$v.form.email.$error"
                />
                <q-input v-model="form.password" placeholder="mínimo 8 caracteres" float-label="Senha" type="password"
                  @blur="$v.form.password.$touch" :error="$v.form.password.$error"
                />
                <q-input v-model="form.repeatPassword" placeholder="mínimo 8 caracteres" float-label="Confirmar Senha"
                  type="password" @blur="$v.form.repeatPassword.$touch" :error="$v.form.repeatPassword.$error"
                />
              </div>
              <div align="end">
                <q-btn color="secondary" label="Cadastrar" @click="create()"/>&nbsp
                <q-btn color="primary" flat @click="opened = false" label="Cancelar" />
              </div>

            </div>
          </q-page>
        </q-modal>
      </template>

      <q-page-sticky corner="bottom-right" :offset="[25, 25]">
        <q-btn round color="secondary" @click="opened = true" icon="add" />
      </q-page-sticky>

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
      users: null,
      opened: false,
      form:{
        email: null,
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
    list: function () {

      let vm = this

      vm.$axios.get( 'account?trashed=true' ).then( response => {
        vm.users = response.data
        console.log(vm.users);
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
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
      }

      vm.$axios.post( 'account', params ).then( response => {
        if (response.status == 201){
          vm.$q.notify({
            type: 'positive',
            message: 'Success, Cadastro criado com sucesso'
          })
          vm.opened = false
        }
      }).catch( error => {
        if (error.response.status == 422){
          this.$q.dialog({
            title:'Atenção',
            message: 'Já existe um cadastro com esse email'
          })
        }
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    }
  },
  mounted () {
    this.list()
  }

}
</script>

<style>
.img-responsive{
  height: auto;
  width: auto;
}
</style>

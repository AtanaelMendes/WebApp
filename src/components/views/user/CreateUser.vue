<template>
  <AgroLayout back-path="/usuario">

    <div slot="title">
      Novo Usuário
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="done" @click="create()" v-if="$q.platform.is.mobile"/>
    </div>

    <div slot="content" >

        <q-page padding class="row">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">

            <form @keyup.enter="create()" class="gutter-sm">

              <div>
                <q-field icon="email">
                  <q-input v-model="form.email" placeholder="informe seu email" float-label="Email" type="text"
                    @blur="$v.form.email.$touch" :error="$v.form.email.$error"
                  />
                </q-field>

                <q-field icon="lock">
                  <q-input v-model="form.password" placeholder="mínimo 8 caracteres" float-label="Senha" type="password"
                    @blur="$v.form.password.$touch" :error="$v.form.password.$error"
                  />
                </q-field>

                <q-field icon="lock">
                  <q-input v-model="form.repeatPassword" placeholder="mínimo 8 caracteres" float-label="Confirmar Senha"
                    type="password" @blur="$v.form.repeatPassword.$touch" :error="$v.form.repeatPassword.$error"
                  />
                </q-field>
              </div>
              <div align="end">
                <q-btn color="secondary" label="Cadastrar" @click="create()" v-if="$q.platform.is.desktop"/>
              </div>

            </form>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <q-list v-if="papeis">
              <q-item v-for="papel in papeis">
                <q-item-main>
                  {{papel.name}}
                </q-item-main>
                <q-item-side>
                  <q-btn icon="check_box" color="positive" flat dense @click="rmRole()"  v-if="form.roleId"/>
                  <q-btn icon="check_box_outline_blank" flat dense @click="form.roleId = papel.id" v-else/>
                </q-item-side>
              </q-item>
            </q-list>
          </div>

        </q-page>

    </div>
  </AgroLayout>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'

export default {
  name: 'index-example',
  components: {
    AgroLayout
  },
  data () {
    return {
      papeis: null,
      form: {
        email: null,
        password: null,
        repeatPassword: null,
        roleId: false,
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
    rmRole: function(){
      this.form.roleId = false
    },
    roles: function() {
      let vm = this
      vm.$axios.get( 'role' ).then( response => {
        vm.papeis = response.data
        console.log(vm.papeis)
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    create: function () {
      this.$v.form.$touch()
      if ( this.$v.form.$error ) {
        this.$q.notify( 'preencha os campos corretamente' )
        return
      }

      let vm = this
      let params = {
        email: vm.form.email,
        password: vm.form.password,
        roles: vm.form.roleId
      }

      vm.$axios.post( 'account', params ).then( response => {
        if (response.status == 201){
          vm.$q.notify({
            type: 'positive',
            message: 'Cadastro criado com sucesso'
          })
          vm.$router.push( '/usuario' )
        }
      }).catch( error => {
        if (error.response.status == 422){
          this.$q.dialog({
            title:'Ops',
            message: 'Já existe um cadastro com esse email'
          })
        }
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    }

  },
  mounted() {
    this.roles()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

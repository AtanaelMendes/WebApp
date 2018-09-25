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
            <q-item link inset-separator @click.native="layoutModal = true, userData = user" multiline>
              <q-item-side icon="account_circle"/>

              <q-item-main>
                <q-item-tile>
                  {{user.id}} Atanael Gamarra Mendes Costa
                </q-item-tile>
                <q-item-tile>
                  {{user.email}}
                </q-item-tile>
              </q-item-main>

              <q-item-side stamp>
                <q-icon name="date_range"/>
                {{ moment(user.created_at).format('DD MMMM YYYY') }}
              </q-item-side>

            </q-item>

          </template>
        </template>
      </q-list>

      <!-- MODAL CREATE USER -->
      <q-modal v-model="opened" maximized class="gutter-y-sm">
        <q-page padding class="row">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 gutter-sm">

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
              <q-btn color="secondary" label="Cadastrar" @click="create()"/>&nbsp
              <q-btn color="primary" flat @click="opened = false" label="Cancelar" />
            </div>

          </div>
        </q-page>
      </q-modal>

      <!-- MODAL EDIT/DELETE USER -->
      <q-modal maximized v-model="layoutModal" v-if="userData">
        <q-modal-layout>
          <q-toolbar slot="header" color="secondary">
            <q-btn flat round dense @click="layoutModal = false" icon="arrow_back"  />
            <q-toolbar-title>
              Editar
            </q-toolbar-title>
            <q-btn flat round dense icon="delete"/>&nbsp
          </q-toolbar>

          <div class="layout-padding">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                <div class="q-headline">{{userData.email}}</div>
                <q-item>
                  <q-item-main class="gutter-y-sm">

                    <q-item-tile>
                      <q-field icon="person">
                        <q-input type="text" float-label="Nome" v-model="updateForm.name" clearable/>
                      </q-field>
                    </q-item-tile>

                    <q-item-tile>
                      <q-field icon="mail">
                        <q-input type="email" float-label="Email" v-model="updateForm.email" clearable/>
                      </q-field>
                    </q-item-tile>

                    <q-item-tile>
                      <q-field icon="lock">
                        <q-input type="password" float-label="Senha" v-model="updateForm.password" clearable/>
                      </q-field>
                    </q-item-tile>

                    <q-item-tile align="end">
                      <q-btn color="secondary" label="Salvar"/>
                    </q-item-tile>

                  </q-item-main>
                </q-item>
              </div>
            </div>
          </div>

          <!-- <q-toolbar slot="footer">
            <q-toolbar-title>
              Footer
            </q-toolbar-title>
          </q-toolbar> -->
        </q-modal-layout>
      </q-modal>

      <q-page-sticky corner="bottom-right" :offset="[25, 25]">
        <q-btn round color="secondary" @click="opened = true" icon="person_add" />
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
      userData: null,
      layoutModal: false,
      updateForm: {
        name: null,
        email: null,
        password: null,
      },
      form: {
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
  watch: {
    userData: function(data) {
      this.updateForm.name = data.email
      this.updateForm.email = data.email
    }
  },
  methods: {
    list: function() {

      let vm = this

      vm.$axios.get( 'account?trashed=true' ).then( response => {
        vm.users = response.data
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
            message: 'Cadastro criado com sucesso'
          })
          vm.opened = false
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

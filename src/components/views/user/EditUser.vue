<template>
  <AgroLayout back-path="/usuario">

    <div slot="title">
      Editar
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="done" @click="updateUser()" v-if="$q.platform.is.mobile"/>
      <q-btn flat round icon="delete" @click="deleteUser()"/>
    </div>

    <div slot="content" >

      <q-page padding class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
          <q-list higlight no-border>

            <div class="q-title">Nome da Pessoa</div>

            <q-item>
              <q-item-side icon="work"/>
              <q-item-main>
                <q-item-tile>Nome do grupo econômico</q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-side icon="contact_mail"/>
              <q-item-main>
                fulano@gmail.com
              </q-item-main>
            </q-item>

            <!-- <q-item>
              <q-item-side/>
              <q-item-main>
              </q-item-main>
            </q-item> -->

          </q-list>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
          <form @keyup.enter="updateUser()" class="gutter-sm">

            <div>
              <q-field icon="person">
                <q-input type="text" float-label="Nome" placeholder="Mínimo 3 caracteres" v-model="form.name" clearable
                  @blur="$v.form.name.$touch" :error="$v.form.name.$error"
                />
              </q-field>

              <q-field icon="mail">
                <q-input type="email" float-label="Email" v-model="form.email" clearable
                  @blur="$v.form.email.$touch" :error="$v.form.email.$error"
                />
              </q-field>

              <q-field icon="lock">
                <q-input type="password" float-label="Senha" v-model="form.password" placeholder="Mínimo 8 caracteres" clearable
                  @blur="$v.form.password.$touch" :error="$v.form.password.$error"
                />
              </q-field>

              <q-field icon="lock">
                <q-input type="password" float-label="Confirmar Senha" v-model="form.repeatPassword"  clearable
                  @blur="$v.form.repeatPassword.$touch" :error="$v.form.repeatPassword.$error" placeholder="Mínimo 8 caracteres"
                />
              </q-field>
            </div>

            <div align="end">
              <q-btn color="secondary" label="Salvar" @click="updateUser()"/>
            </div>

          </form>
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
      userId: null,
      userData: null,
      form: {
        name: null,
        email: null,
        password: null,
        repeatPassword: null
      }
    }
  },
  validations: {
    form: {
      name: { required, minLength: minLength(3) },
      email: { required, email},
      password: { required,  minLength: minLength(8) },
      repeatPassword: { sameAsPassword: sameAs('password') }
    }
  },
  methods: {

    deleteUser: function() {
      let vm = this
      let params = {
        id: vm.$route.params.id
      }
      this.$q.dialog({
        title: 'Inativar',
        message: 'Têm certeza que deseja inativar este usuário?',
        ok: 'OK',
        cancel: 'Cancelar'
      }).then(() => {
        vm.$axios.delete( 'account/'+ params.id ).then( response => {
          this.$q.notify({
            type: 'positive',
            message: 'Usuário excluido com sucesso'
          })
          vm.$router.push( '/usuario' )
        })
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },

    getUser: function() {
      let vm = this
      let params = {
        id: vm.$route.params.id
      }
      vm.$axios.get( 'account/'+ params.id ).then( response => {
        vm.userData = response.data
      }).catch( error => {
        if (error.response.status == 404){
          this.$q.dialog({
            title:'Ops',
            message: 'Não foi possível carregar as informações'
          })
        }
        vm.$router.push( '/usuario' )
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },

    updateUser: function() {
      this.$v.form.$touch()
      if ( this.$v.form.$error ) {
        this.$q.notify( 'preencha os campos corretamente' )
        return
      }
      let vm = this
      let params = {
        email: vm.form.email,
        password: vm.form.password,
      }
      vm.$axios.put( 'account/'+ vm.$route.params.id, params ).then( response => {
        if (response.status == 200){
          vm.$q.notify({
            type: 'positive',
            message: 'Cadastro alterado com sucesso'
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
    this.getUser()
  }
}
</script>

<style>
</style>

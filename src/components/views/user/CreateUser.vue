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
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-px-sm">

            <form @keyup.enter="create()" class="gutter-sm">

              <div>
                <q-field >
                  <q-input v-model="form.email"
                           placeholder="informe seu email"
                           float-label="Email"
                           type="text"
                           @blur="$v.form.email.$touch"
                           :error="$v.form.email.$error"
                  />
                </q-field>

                <q-field >
                  <q-input v-model="form.password"
                           placeholder="mínimo 8 caracteres"
                           float-label="Senha"
                           type="password"
                           @blur="$v.form.password.$touch"
                           :error="$v.form.password.$error"
                  />
                </q-field>

                <q-field  class="q-pb-lg">
                  <q-input v-model="form.repeatPassword"
                           placeholder="mínimo 8 caracteres"
                           float-label="Confirmar Senha"
                           type="password"
                           @blur="$v.form.repeatPassword.$touch"
                           :error="$v.form.repeatPassword.$error"
                  />
                </q-field>

                <div class="q-title q-mb-sm">Papéis</div>
                <q-list id="chip_container"
                        v-if="form.selectedRoles"
                        class="chip-container"
                        :class="{ 'chip-container-error': $v.form.selectedRoles.$error }"
                  >
                  <q-item v-for="role in form.selectedRoles" :key="role.id" class="chip-inline">
                    <q-chip class="q-ma-xs" @hide="removeRole(role)" closable color="secondary" text-color="white">{{role.name}}</q-chip>
                  </q-item>
                </q-list>

                <q-btn class="full-width q-mt-md" color="secondary" @click="openRolesDialog()" label="Adicionar"/>

              </div>

              <div align="end">
                <q-btn color="secondary" label="Cadastrar" @click="create()" v-if="$q.platform.is.desktop"/>
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
  name: 'create-user',
  components: {
    AgroLayout
  },
  data () {
    return {
      papeis: null,
      form: {
        selectedRoles: [],
        email: null,
        password: null,
        repeatPassword: null,
      }
    }
  },
  validations: {
    form: {
      email: { required, email},
      password: { required,  minLength: minLength(8) },
      repeatPassword: { sameAsPassword: sameAs('password') },
      selectedRoles: { required }
    }
  },
  methods: {
    openRolesDialog: function() {
      this.$q.dialog({
        title: 'Papéis',
        message: 'Selecione as funções do usuário.',
        options: {
          type: 'checkbox',
          model: this.getIdsByRoles(this.form.selectedRoles),
          items: this.rolesToItems()
        },
        cancel: true,
        preventClose: true,
        color: 'secondary'
      }).then(data => {
        this.replaceRoles(data)
      }).catch(() => {})
    },
    rolesToItems: function() {
      var items = []
       this.papeis.forEach(function (role) {
         var item = {}
         item['label'] = role.name
         item['value'] = role.id
         items.push(item)
       })
      return items
    },
    getIdsByRoles: function(roles) {
      var rolesIds = []
      roles.forEach(function (role) {
        rolesIds.push(role.id)
      })
      return rolesIds
    },
    getRolesById: function(ids) {
      var roles = []
      for(var i = 0; i < ids.length; i++) {
        this.papeis.forEach(function (role) {
         if(role.id == ids[i]){
           roles.push(role)
         }
        })
      }
      return roles
    },
    replaceRoles: function(selectedRoles) {
      this.form.selectedRoles = this.getRolesById(selectedRoles)
    },
    removeRole: function(role) {
      var id = this.form.selectedRoles.indexOf(role)
      this.form.selectedRoles.splice(id,1)
    },
    listRoles: function() {
      let vm = this
      vm.$axios.get( 'role' ).then( response => {
        vm.papeis = response.data
      }).catch( error => {
        console.log('Erro Ocorrido:')
        console.log(error)
      })
    },
    create: function () {
      this.$v.form.$touch()
      if ( this.$v.form.$error ) {
        if( this.$v.form.selectedRoles.$error ){
          // this.$v.form.selectedRoles
          this.$q.notify( 'Selecione ao menos um papel' )
        }
        if( this.$v.form.email.$error ){
          this.$q.notify( 'Email inválido' )
        }
        if( this.$v.form.password.$error ){
          this.$q.notify( 'Senha inválida' )
        }
        if( this.$v.form.repeatPassword.$error ){
          this.$q.notify( 'As senhas não conferem' )
        }
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
    this.listRoles()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .chip-container {
    min-height: 100px ;
  }
  .chip-inline {
    display: inline;
    padding: unset;
  }
  .chip-container-error{
    border-color: red;
  }
</style>

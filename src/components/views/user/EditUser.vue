<template>
  <AgroLayout back-path="/usuario">
    <div slot="title">
      Editar
    </div>

    <div slot="rightBtn">
      <q-btn flat round icon="done" @click="updateUser()" v-if="$q.platform.is.mobile"/>
    </div>

    <div slot="content" >

      <q-page padding class="row gutter-x-md">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 " >
          <form @keyup.enter="updateUser()" class="gutter-sm">

            <div>
              <!--<q-field>-->
                <!--<q-input type="text" float-label="Nome" placeholder="Mínimo 3 caracteres" v-model="form.name" clearable-->
                  <!--@blur="$v.form.name.$touch" :error="$v.form.name.$error"-->
                <!--/>-->
              <!--</q-field>-->

              <q-field>
                <q-input type="email" float-label="Email" v-model="form.email" clearable
                  @blur="$v.form.email.$touch" :error="$v.form.email.$error"
                />
              </q-field>

              <!--<q-field>-->
                <!--<q-input type="password" float-label="Senha" v-model="form.password" placeholder="Mínimo 8 caracteres" clearable-->
                  <!--@blur="$v.form.password.$touch" :error="$v.form.password.$error"-->
                <!--/>-->
              <!--</q-field>-->

              <!--<q-field>-->
                <!--<q-input type="password" float-label="Confirmar Senha" v-model="form.repeatPassword"  clearable-->
                  <!--@blur="$v.form.repeatPassword.$touch" :error="$v.form.repeatPassword.$error" placeholder="Mínimo 8 caracteres"-->
                <!--/>-->
              <!--</q-field>-->
            </div>

            <div align="end">
              <q-btn color="secondary" label="Salvar" @click="updateUser()"/>
            </div>

          </form>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-sm">
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

          <q-btn class="full-width q-my-md" color="secondary" @click="openRolesDialog()" label="Adicionar"/>
        </div>

      </q-page>

    </div>
  </AgroLayout>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import AgroLayout from 'layouts/AgroLayout'
import RolesMixins from 'components/views/mixins/RolesMixins'
import GetUser from 'components/views/mixins/GetUser'
import { Platform } from 'quasar'

export default {
  name: 'edit-user',
  components: {
    AgroLayout
  },
  mixins: [RolesMixins, GetUser],
  data () {
    return {
      userId: null,
      userData: null,
      rolesId: [],
      form: {
        name: null,
        email: null,
        password: null,
        repeatPassword: null,
        selectedRoles: []
      }
    }
  },
  validations: {
    form: {
      // name: { required, minLength: minLength(3) },
      email: { required, email},
      // password: { required,  minLength: minLength(8) },
      // repeatPassword: { sameAsPassword: sameAs('password') },
      selectedRoles: { required }
    }
  },
  methods: {
    updateUser: function() {
      this.$v.form.$touch()
      if ( this.$v.form.$error ) {
        if( this.$v.form.selectedRoles.$error ){
          this.$q.notify( 'Selecione ao menos um papel' )
        }
        if( this.$v.form.email.$error ){
          this.$q.notify( 'Email inválido' )
        }
        return
      }
      let vm = this
      let params = {
        email: vm.form.email,
        roles: vm.getIdsByRoles(vm.form.selectedRoles).join(',')
      }
      console.log(params)
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
    this.listRoles()
  }
}
</script>

<style>
</style>

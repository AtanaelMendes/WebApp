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
          <form @keyup.enter="updateUser()">
            <div class="gutter-sm">

              <div>
                <q-input
                  type="email"
                  float-label="Email"
                  v-model="formUser.email"
                  clearable
                  @blur="$v.formUser.email.$touch"
                  :error="$v.formUser.email.$error"
                />
              </div>

              <div class="q-title q-mb-sm">Papéis</div>
              <div>
                <q-list
                  id="chip_container"
                  v-if="formUser.selectedRoles"
                  class="chip-container"
                  :class="{ 'chip-container-error': $v.formUser.selectedRoles.$error }"
                >
                  <q-item v-for="role in formUser.selectedRoles" :key="role.id" class="chip-inline">
                    <q-chip class="q-ma-xs" @hide="removeRole(role)" closable color="secondary" text-color="white">{{role.name}}</q-chip>
                  </q-item>
                </q-list>
              </div>

              <div>
                <q-btn class="full-width q-my-md" color="secondary" @click="openRolesDialog()" label="Adicionar"/>
              </div>

              <div align="end">
                <q-btn color="secondary" label="Salvar" @click="updateUser()"/>
              </div>

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
      formUser: {
        name: null,
        email: null,
        password: null,
        repeatPassword: null,
        selectedRoles: []
      }
    }
  },
  validations: {
    formUser: {
      // name: { required, minLength: minLength(3) },
      email: { required, email},
      // password: { required,  minLength: minLength(8) },
      // repeatPassword: { sameAsPassword: sameAs('password') },
      selectedRoles: { required }
    }
  },
  methods: {
    updateUser: function() {
      this.$v.formUser.$touch()
      if ( this.$v.formUser.$error ) {
        if( this.$v.formUser.selectedRoles.$error ){
          this.$q.notify( 'Selecione ao menos um papel' )
        }
        if( this.$v.formUser.email.$error ){
          this.$q.notify( 'Email inválido' )
        }
        return
      }
      let vm = this
      let params = {
        email: vm.formUser.email,
        roles: vm.getIdsByRoles(vm.formUser.selectedRoles).join(',')
      };
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

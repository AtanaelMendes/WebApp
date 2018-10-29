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
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3 q-px-sm">

            <form @keyup.enter="create()">
              <div class="gutter-y-sm">

                <div>
                  <q-input
                    clearable
                    v-model="formUser.email"
                    placeholder="informe seu email"
                    float-label="Email"
                    type="text"
                    @blur="$v.formUser.email.$touch"
                    :error="$v.formUser.email.$error"
                  />
                </div>

                <div>
                  <q-input
                    clearable
                    v-model="formUser.password"
                    placeholder="mínimo 8 caracteres"
                    float-label="Senha"
                    type="password"
                    @blur="$v.formUser.password.$touch"
                    :error="$v.formUser.password.$error"
                  />
                </div>

                <div>
                  <q-input
                    clearable
                    v-model="formUser.repeatPassword"
                    placeholder="mínimo 8 caracteres"
                    float-label="Confirmar Senha"
                    type="password"
                    @blur="$v.formUser.repeatPassword.$touch"
                    :error="$v.formUser.repeatPassword.$error"
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
                  <q-btn class="full-width q-mt-md" color="secondary" @click="openRolesDialog()" label="Adicionar"/>
                </div>

                <div align="end">
                  <q-btn color="secondary" label="Cadastrar" @click="create()" v-if="$q.platform.is.desktop"/>
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
import RolesMixins from 'components/views/mixins/RolesMixins'
import AgroLayout from 'layouts/AgroLayout'
import { Platform } from 'quasar'

export default {
  name: 'create-user',
  components: {
    AgroLayout
  },
  mixins: [RolesMixins],
  data () {
    return {
      papeis: null,
      formUser: {
        selectedRoles: [],
        email: null,
        password: null,
        repeatPassword: null,
      }
    }
  },
  validations: {
    formUser: {
      email: { required, email},
      password: { required,  minLength: minLength(8) },
      repeatPassword: { sameAsPassword: sameAs('password') },
      selectedRoles: { required }
    }
  },
  methods: {
    create: function () {
      this.$v.formUser.$touch()
      if ( this.$v.formUser.$error ) {
        if( this.$v.formUser.selectedRoles.$error ){
          this.$q.notify( 'Selecione ao menos um papel' )
        }
        if( this.$v.formUser.email.$error ){
          this.$q.notify( 'Email inválido' )
        }
        if( this.$v.formUser.password.$error ){
          this.$q.notify( 'Senha inválida' )
        }
        if( this.$v.formUser.repeatPassword.$error ){
          this.$q.notify( 'As senhas não conferem' )
        }
        return
      }
      // let vm = this
      // let params = {
      //   email: vm.formUser.email,
      //   password: vm.formUser.password,
      // }
      // vm.$axios.post( 'account', params ).then( response => {
      //   if (response.status == 201){
      //     vm.$q.notify({
      //       type: 'positive',
      //       message: 'Cadastro criado com sucesso'
      //     })
      //     vm.$router.push( '/usuario' )
      //   }
      // }).catch( error => {
      //   if (error.response.status == 422){
      //     this.$q.dialog({
      //       title:'Ops',
      //       message: 'Já existe um cadastro com esse email'
      //     })
      //   }
      //   console.log('Erro Ocorrido:')
      //   console.log(error)
      // })
    }
  },
  mounted() {
    this.listRoles()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

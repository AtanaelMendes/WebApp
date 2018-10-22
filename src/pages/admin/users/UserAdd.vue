<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Novo Unuário">
      <q-btn slot="action_itens" flat dense label="salvar" @click="saveAccount()"/>
    </toolbar>

    <form class="q-pa-md">

      <div style="display: flex">
        <div style="width: 50%;">
          <q-list-header class="q-pa-none">Informações Básicas</q-list-header>
          <custom-input-text type="email" label="Email" :model="form.email" />

          <custom-input-text type="password" label="Senha" :model="form.password" />

          <custom-input-text type="password" label="Confirmar senha" :model="form.repeatPassword" />
        </div>

        <div style="width: 50%; margin-left: 20px">
          <q-list-header class="q-pa-none">Funções</q-list-header>
          <q-field :error="form.selectedRoles.error">
            <q-list id="chip_container"
                    v-if="form.selectedRoles.value"
                    class="chip-container"
                    :class="{ 'chip-container-error': form.selectedRoles.error }">
              <q-item v-for="role in form.selectedRoles.value" :key="role.id" class="chip-inline">
                <q-chip class="q-ma-xs" @hide="removeRole(role)" closable color="secondary" text-color="white">{{role.name}}</q-chip>
              </q-item>
            </q-list>
            <div class="q-field-bottom row no-wrap q-field-no-input-fix" style="height: 22px">
              <div class="q-field-error col" v-if="form.selectedRoles.error" >{{form.selectedRoles.errorMessage}}</div>
            </div>
          </q-field>

          <q-btn class="full-width q-mt-md" color="deep-orange" rounded @click="openRolesDialog()" label="Adicionar Função"/>
        </div>

      </div>

    </form>


  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  import { Loading } from 'quasar'
  import * as UserUtils from 'assets/js/UserUtils'
  import UserMixin from 'components/mixins/users/UserMixin'

  export default {
    name: "UserAdd",
    components: {
      toolbar,
      customPage,
      customInputText
    },
    mixins: [UserMixin],
    data(){
      return {
        roles: null,
        form: {
          email: {
            value: null,
            error: false,
            errorMessage: null
          },
          password: {
            value: null,
            error: false,
            errorMessage: null
          },
          repeatPassword: {
            value: null,
            error: false,
            errorMessage: null
          },
          selectedRoles: {
            value: [],
            error: false,
            errorMessage: null
          },
        }
      }
    },
    validations: {
      form: {
        email: { value: { required, email } },
        password: { value: {required, minLength: minLength(8) } },
        repeatPassword: { value: {function () {
              return this.form.repeatPassword.value === this.form.password.value;
            }}},
        selectedRoles: { value: { required } }
      }
    },
    methods:{
      saveAccount: function () {
        this.$v.form.$touch();

        if ( this.$v.form.$error ) {
          this.form.email.error = this.$v.form.email.$error;
          this.form.password.error = this.$v.form.password.$error;
          this.form.repeatPassword.error = this.$v.form.repeatPassword.$error;
          this.form.selectedRoles.error = this.$v.form.selectedRoles.$error;

          if(this.form.email.error && !this.$v.form.email.value.required){
            this.form.email.errorMessage = "Digite um email"
          }else if(this.form.email.error && !this.$v.form.email.value.email){
            this.form.email.errorMessage = "Este email é inválido"
          }

          if(this.form.password.error && !this.$v.form.password.value.required){
            this.form.password.errorMessage = "Digite uma senha"
          }else if(this.form.password.error && !this.$v.form.password.value.minLength){
            this.form.password.errorMessage = "A senha deve ter no mínimo 8 caracteres"
          }

          if(this.form.repeatPassword.error){
            this.form.repeatPassword.errorMessage = "As senhas não são iguais"
          }

          if(this.form.selectedRoles.error){
            this.form.selectedRoles.errorMessage = "Adicione ao menos uma função"
          }

          return;
        }

        Loading.show();

        let params = {
          email: this.form.email.value,
          password: this.form.password.value,
          roles: UserUtils.getIdsByRoles(this.form.selectedRoles.value).join()

        };

        this.$axios.post( 'account', params ).then( response => {
          if (response.status === 201){
            Loading.hide();

            this.$q.notify({
              type: 'positive',
              message: 'Cadastro criado com sucesso'
            });

            this.copiedObj = JSON.parse(JSON.stringify(this.form));
            this.$router.push('/admin/usuarios');
            this.$root.$emit('refreshUserList')
          }
        }).catch( error => {
          Loading.hide();
          if (error.response.status === 422){
            this.$q.dialog({
              title:'Ops',
              message: 'Já existe um cadastro com esse email'
            })
          }
        })
      },
      backAction: function () {
        this.$router.push('/admin/usuarios')
      }
    },
    mounted(){
      this.copiedObj = JSON.parse(JSON.stringify(this.form));
      this.listRoles()
    },
    beforeRouteLeave (to, from, next) {
      if(from.name === "add_user") {
        if (!UserUtils.compare(this.copiedObj, this.form)) {
          this.$q.dialog({
            title: 'Atenção',
            message: 'Se sair você perderá todas as informações. Deseja continuar?',
            ok: 'Sim',
            cancel: 'Cancelar',
            preventClose: true,
            color: 'primary'
          }).then(data => {
            next();
          }).catch(() => {
            // Picked "Cancel" or dismissed
          });
          return;
        }
      }
      next()
    },
  }
</script>

<style scoped>
  .chip-container {
    min-height: 150px ;
    padding: 10px 8px;
  }
  .chip-inline {
    display: inline;
    padding: unset;
  }
  .chip-container-error{
    border-color: red;
  }

  .q-field-no-input-fix{
    margin: 0 !important;
    border: none !important;
  }
</style>

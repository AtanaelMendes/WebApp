<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Novo Unuário">
      <q-btn slot="action_itens" flat dense label="salvar" @click="create()"/>
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

  export default {
    name: "UserAdd",
    components: {
      toolbar,
      customPage,
      customInputText
    },
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
      openRolesDialog: function() {
        this.$q.dialog({
          title: 'Funções',
          message: 'Selecione as funções do usuário.',
          options: {
            type: 'checkbox',
            model: this.getIdsByRoles(this.form.selectedRoles.value),
            items: this.parseRolesToItems(this.roles)
          },
          cancel: true,
          preventClose: true,
          color: 'primary'
        }).then(data => {
          this.replaceRoles(data)
        })
      },
      parseRolesToItems: function(roles) {
        var items = [];
        roles.forEach(function (role) {
          var item = {};
          item['label'] = role.name;
          item['value'] = role.id;
          items.push(item)
        });
        return items
      },
      getIdsByRoles: function(roles) {
        let rolesIds = [];
        roles.forEach(function (role) {
          rolesIds.push(role.id)
        });
        return rolesIds
      },
      getRolesById: function(ids) {
        let roles = [];
        for(let i = 0; i < ids.length; i++) {
          this.roles.forEach(function (role) {
            if(role.id === ids[i]){
              roles.push(role)
            }
          })
        }
        return roles
      },
      listRoles: function() {
        this.$axios.get( 'role' ).then( response => {
          this.roles = response.data
        })
      },
      replaceRoles: function(selectedRoles) {
        this.form.selectedRoles.error = false;
        this.form.selectedRoles.value = this.getRolesById(selectedRoles)
      },
      removeRole: function(role) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar essa permissão?',
          ok: 'Sim',
          cancel: 'Não',
          preventClose: true,
          color: 'primary'
        }).then(data => {
          let id = this.form.selectedRoles.value.indexOf(role);
          this.form.selectedRoles.value.splice(id,1)
        })
      },
      create: function () {
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
          roles: this.getIdsByRoles(this.form.selectedRoles.value).join()

        };

        this.$axios.post( 'account', params ).then( response => {
          if (response.status === 201){
            Loading.hide();

            this.$q.notify({
              type: 'positive',
              message: 'Cadastro criado com sucesso'
            });

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
        this.$router.go(-1);
      }
    },
    mounted(){
      this.listRoles()
    }
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

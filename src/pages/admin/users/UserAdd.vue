<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Novo Unuário">
      <q-btn slot="action_itens" flat dense round icon="done" @click="saveAccount()"/>
    </toolbar>

    <div class="row q-ma-md gutter-sm space-end" @keyup.enter="saveAccount()">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <form>
          <q-list-header class="q-pa-none">Informações Básicas</q-list-header>

          <produtor-select @click.native="listProdutor" label="Produtor" :model="form.produtor" :options="produtorOptions"/>

          <custom-input-text type="email" label="Email" :model="form.email" />

          <custom-input-text type="password" label="Senha" :model="form.password" />

          <custom-input-text type="password" label="Confirmar senha" :model="form.repeatPassword" />
        </form>
      </div>

      <!--LIST ROLES-->
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <q-list-header class="q-pa-none">Funções</q-list-header>
        <q-field :error="form.selectedRoles.errorMessage != null">
          <q-list id="chip_container"
                  v-if="form.selectedRoles.value"
                  class="chip-container"
                  :class="{ 'chip-container-error': form.selectedRoles.errorMessage != null }">
            <q-item v-for="role in form.selectedRoles.value" :key="role.id" class="chip-inline">
              <q-chip class="q-ma-xs" @hide="removeRole(role)" closable color="secondary" text-color="white">{{role.name}}</q-chip>
            </q-item>
          </q-list>
          <div class="q-field-bottom row no-wrap q-field-no-input-fix" style="height: 22px">
            <div class="q-field-error col" v-if="form.selectedRoles.errorMessage != null" >{{form.selectedRoles.errorMessage}}</div>
          </div>
        </q-field>

        <q-btn class="full-width q-mt-md" color="deep-orange" rounded @click="openRolesDialog()" label="Adicionar Função"/>
      </div>
      <!--FIM LIST ROLES-->
    </div>

    <!--PRODUTOR DIALOG-->
    <q-dialog v-model="newProdutorDialog" prevent-close>
      <span slot="title">Novo Produtor</span>
      <span slot="message">Crie um Produtor preenchendo o campo abaixo</span>

      <div slot="body">
        <form @keyup.enter="saveProdutor()">
          <custom-input-text type="text" label="Produtor" :model="produtor.nome" />
        </form>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat @click="closeNewProdutorDialog"  label="Cancelar"/>
        <q-btn flat @click="saveProdutor()"  label="Salvar"/>
      </template>
    </q-dialog>
    <!--FIM PRODUTOR DIALOG-->

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  import userService from 'assets/js/service/UserService'
  import produtor from 'assets/js/model/produtor/Produtor'
  import produtorSelect from 'components/ProdutorSelect.vue'
  import FormMixin from 'components/mixins/FormMixin'
  export default {
    name: "user-add",
    components: {
      toolbar,
      customPage,
      produtorSelect,
      customInputText
    },
    mixins: [FormMixin],
    data(){
      return {
        roles: null,
        produtorSearchTerms: '',
        tempProdutorList: [],
        newProdutorDialog: false,
        produtor: new produtor(),
        produtorOptions: [],
        form: {
          email: {
            value: null,
            errorMessage: null
          },
          produtor: {
            value: null,
            errorMessage: null
          },
          password: {
            value: null,
            errorMessage: null
          },
          repeatPassword: {
            value: null,
            errorMessage: null
          },
          selectedRoles: {
            value: [],
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
      openRolesDialog: function(){
        userService.openRolesDialog(this.form.selectedRoles.value, this.roles).then(roles =>{
          this.form.selectedRoles.errorMessage = null;
          this.form.selectedRoles.value = roles;
        })
      },
      removeRole: function(role){
        userService.removeRole(this.form.selectedRoles.value, role);
      },
      listRoles: function(){
        userService.listRoles().then(roles => {this.roles = roles})
      },
      saveAccount: function () {
        this.$v.form.$touch();
        if ( this.$v.form.$error ) {
          if(!this.$v.form.email.value.required){
            this.form.email.errorMessage = "Digite um email"
          }else if(!this.$v.form.email.value.email){
            this.form.email.errorMessage = "Este email é inválido"
          }

          if(!this.$v.form.password.value.required){
            this.form.password.errorMessage = "Digite uma senha"
          }else if(!this.$v.form.password.value.minLength){
            this.form.password.errorMessage = "A senha deve ter no mínimo 8 caracteres"
          }
          if(!this.$v.form.repeatPassword.value.required){
            this.form.repeatPassword.errorMessage = "As senhas não são iguais"
          }
          if(!this.$v.form.selectedRoles.value.required){
            this.form.selectedRoles.errorMessage = "Adicione ao menos uma função"
          }
          return;
        }
        let params = {
          email: this.form.email.value,
          password: this.form.password.value,
          roles: userService.getIdsByRoles(this.form.selectedRoles.value).join()

        };
        userService.saveAccount(params).then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Cadastro criado com sucesso'
          });

          this.setFormObj(this.form);
          this.$router.push({name: 'users'});
          this.$root.$emit('refreshUserList')
        }).catch(error => {
          if (error.response.status === 422){
            this.$q.dialog({
              title:'Ops',
              message: 'Já existe um cadastro com esse email'
            })
          }
        })
      },
      listProdutor: function(){
        userService.listProdutor().then(response => {
          this.produtorOptions = response;
        })
      },
      openNewProdutorDialog: function(){
        this.newProdutorDialog = true;
      },
      closeNewProdutorDialog: function(){
        this.newProdutorDialog = false;
        this.produtor.nome.value = null;
        this.produtor.nome.errorMessage = null;
      },
      saveProdutor: function(){
        if(!this.produtor.isValid(this)){
          return;
        }
        userService.saveProdutor(this.produtor.getValues()).then(response => {
          this.$q.notify({type: 'positive', message: 'Grupo Econômico criado com sucesso'});
          this.closeNewProdutorDialog();
        }).catch(error => {
          if (error.response.status === 422){
            this.$q.dialog({title:'Ops', message: 'Já existe um registro com esse nome'})
          }
        })
      },
      backAction: function () {
        this.$router.push({name: 'users'});
      }
    },
    mounted(){
      this.routeName = 'add_user';
      this.setFormObj(this.form);
      this.listRoles();
    },

  }
</script>

<style scoped>
  .space-end{
    margin-bottom: 150px;
  }
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

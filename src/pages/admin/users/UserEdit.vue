<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Editar Unuário">
      <q-btn slot="action_itens" flat dense round icon="done" @click="updateAccount()"/>
    </toolbar>

    <div class="row gutter-sm q-pa-md">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <form>
          <q-list-header class="q-pa-none">Informações Básicas</q-list-header>

          <q-item class="q-px-none">
            <q-item-main>
              <produtor-select label="Produtor" :model="form.produtor" :options="produtorOptions"/>
            </q-item-main>
            <q-item-side>
              <q-btn color="deep-orange" round icon="add" @click.native="openNewProdutorDialog"/>
            </q-item-side>
          </q-item>

          <custom-input-text label="Nome" :model="form.nome" />

          <custom-input-text type="email" label="Email" :model="form.email" />

          <custom-input-text type="password" label="Senha" :model="form.password" />

          <custom-input-text type="password" label="Confirmar senha" :model="form.repeatPassword" />
        </form>
      </div>

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
    </div>

    <!--PRODUTOR DIALOG-->
    <q-dialog v-model="newProdutorDialog" prevent-close>
      <span slot="title">Novo Produtor</span>
      <span slot="message">Crie um Produtor preenchendo o campo abaixo</span>

      <div slot="body">
        <form @keyup.enter="saveProdutor()">
          <custom-input-text type="text" label="Nome" :model="produtor.nome" />
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
  import produtorSelect from 'components/ProdutorSelect.vue'
  import Produtor from 'assets/js/model/produtor/Produtor'
  import UserService from "../../../assets/js/service/UserService";

  export default {
    name: "UserEdit",
    components: {
      toolbar,
      customPage,
      customInputText,
      produtorSelect,
    },
    data(){
      return {
        userService: new UserService(),
        roles: null,
        accountId: null,
        produtorOptions: [],
        newProdutorDialog: false,
        produtor: new Produtor(),
        form: {
          produtor : {
            value: null,
            errorMessage: null
          },
          nome: {
            value: null,
            errorMessage: null
          },
          email: {
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
        produtor: {value: {required}},
        nome: { value: {required, minLength: minLength(3) } },
        email: { value: { required, email } },
        password: { value: {minLength: minLength(8) } },
        repeatPassword: { value: {function () {
              return this.form.repeatPassword.value === this.form.password.value;
            }}},
        selectedRoles: { value: { required } }
      }
    },
    methods:{
      getUser: function(id) {
        this.$q.loading.show();
        this.userService.getAccount(id).then(account => {
          this.fillFormUser(account);
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.loading.hide();
        })
      },
      fillFormUser: function(account){
        this.accountId = account.id;
        this.form.nome.value = account.nome;
        this.form.email.value = account.email;
        this.form.selectedRoles.value = account.roles;
        this.form.produtor.value = account.produtor_id;
        // this.setFormObj(this.form);
      },
      openRolesDialog: function(){
        this.userService.openRolesDialog(this.form.selectedRoles.value, this.roles).then(roles =>{
          this.form.selectedRoles.error = false;
          this.form.selectedRoles.value = roles;
        })
      },
      removeRole: function(role){
        this.userService.removeRole(this.form.selectedRoles.value, role);
      },
      listRoles: function(){
        this.$q.loading.show();
        this.userService.listRoles().then(roles => {
          this.roles = roles;
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.loading.hide();
        })
      },
      listProdutor: function(){
        this.$q.loading.show();
        this.userService.listProdutores().then(produtores => {
          this.produtorOptions = produtores;
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.loading.hide();
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
        this.$q.loading.show();
        this.userService.saveProdutor(this.produtor.getValues()).then(produtor => {
          this.$q.notify({type: 'positive', message: 'Produtor criado com sucesso'});
          this.closeNewProdutorDialog();
          this.form.produtor.value = produtor.id;
          this.listProdutor();
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
          if (error.response.status === 422){
            this.$q.dialog({title:'Ops', message: 'Já existe um registro com esse nome'})
          }
        })
      },
      updateAccount: function () {
        this.$v.form.$touch();
        if ( this.$v.form.$error ) {
          if(!this.$v.form.produtor.value.required){
            this.form.produtor.errorMessage = "Selecione um Produtor";
          }
          if(!this.$v.form.nome.value.required){
            this.form.nome.errorMessage = "Digite um nome";
          }else if(!this.$v.form.nome.value.minLength){
            this.form.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres";
          }
          if(!this.$v.form.email.value.required){
            this.form.email.errorMessage = "Digite um email"
          }else if(!this.$v.form.email.value.email){
            this.form.email.errorMessage = "Este email é inválido"
          }
          if(!this.$v.form.password.value.minLength){
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
          produtor_id: this.form.produtor.value,
          email: this.form.email.value,
          password: this.form.password.value,
          roles: this.userService.getIdsByRoles(this.form.selectedRoles.value).join()
        };
        this.$q.loading.show();
        this.userService.updateAccount(params, this.accountId).then(() => {
          this.$q.notify({type: 'positive', message: 'Cadastro atualizado com sucesso'});
          this.$q.loading.hide();
          // this.setFormObj(this.form);
          this.$router.push({name: 'users'});
        }).catch(error => {
          if (error.response.status === 422){
            this.$q.loading.hide();
            this.$q.dialog({
              title:'Ops',
              message: 'Já existe um cadastro com esse email'
            })
          }
        });

      },
      backAction: function () {
        this.$router.back();
      }
    },
    mounted(){
      this.listRoles();
      this.listProdutor();
      this.getUser(this.$route.params.id);
      this.routeName = 'edit_user';
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

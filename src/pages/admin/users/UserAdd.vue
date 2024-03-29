<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Novo Usuário">
      <q-btn slot="action_itens" flat dense round icon="done" @click="saveAccount()"/>
    </toolbar>

    <div class="row q-ma-md gutter-sm space-end" @keyup.enter="saveAccount()">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <form>
          <q-list-header class="q-pa-none">Informações Básicas</q-list-header>

          <q-item class="q-px-none">
            <q-item-main>
              <produtor-select label="Produtor" :model="usuario.produtor" :options="produtorOptions"/>
            </q-item-main>
            <q-item-side>
              <q-btn color="deep-orange" round icon="add" @click.native="openNewProdutorDialog"/>
            </q-item-side>
          </q-item>

          <custom-input-text label="Nome" :model="usuario.nome" />

          <custom-input-text type="email" label="Email" :model="usuario.email" />

          <custom-input-text type="password" label="Senha" :model="usuario.password" />

          <custom-input-text type="password" label="Confirmar senha" :model="usuario.repeatPassword" />
        </form>
      </div>

      <!--LIST ROLES-->
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <q-list-header class="q-pa-none">Funções</q-list-header>
        <q-field :error="usuario.selectedRoles.errorMessage != null">
          <q-list
            id="chip_container"
            class="chip-container"
            v-if="usuario.selectedRoles.value"
            :class="{ 'chip-container-error': usuario.selectedRoles.errorMessage != null }"
          >
            <q-item v-for="role in usuario.selectedRoles.value" :key="role.id" class="chip-inline">
              <q-chip class="q-ma-xs" @hide="removeRole(role)" closable color="secondary" text-color="white">{{role.name}}</q-chip>
            </q-item>
          </q-list>
          <div class="q-field-bottom row no-wrap q-field-no-input-fix" style="height: 22px">
            <div class="q-field-error col" v-if="usuario.selectedRoles.errorMessage != null" >{{usuario.selectedRoles.errorMessage}}</div>
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
  import Produtor from 'assets/js/model/produtor/Produtor'
  import User from 'assets/js/model/usuario/Usuario'
  import produtorSelect from 'components/ProdutorSelect.vue'
  import UserService from "../../../assets/js/service/UserService";
  export default {
    name: "user-add",
    components: {
      toolbar,
      customPage,
      produtorSelect,
      customInputText
    },
    data(){
      return {
        userService: new UserService(),
        roles: null,
        produtorSearchTerms: '',
        tempProdutorList: [],
        newProdutorDialog: false,
        produtor: new Produtor(),
        produtorOptions: [],
        usuario: new User()
      }
    },
    methods:{
      openRolesDialog: function(){
        this.userService.openRolesDialog(this.usuario.selectedRoles.value, this.roles).then(roles =>{
          this.usuario.selectedRoles.errorMessage = null;
          this.usuario.selectedRoles.value = roles;
        })
      },
      removeRole: function(role){
        this.userService.removeRole(this.usuario.selectedRoles.value, role);
      },
      listRoles: function(){
        this.$q.loading.show();
        this.userService.listRoles().then(roles => {
          this.roles = roles; this.$q.loading.hide();
        }).catch(error =>{
          this.$q.loading.hide();
        })
      },
      saveAccount: function () {
        if(!this.usuario.isValid()){
          return;
        }
        this.$q.loading.show();
        this.userService.saveAccount(this.usuario.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Cadastro criado com sucesso'});
          this.$router.push({name: 'users'});
          this.$root.$emit('refreshUserList');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
          if (error.response.status === 422){
            this.$q.dialog({title:'Ops', message: 'Já existe um cadastro com esse email'})
          }
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
          this.usuario.produtor.value = produtor.id;
          this.listProdutor();
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
          if (error.response.status === 422){
            this.$q.dialog({title:'Ops', message: 'Já existe um registro com esse nome'})
          }
        })
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted(){
      this.listRoles();
      this.listProdutor();
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

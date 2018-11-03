<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Novo Contato">
      <q-btn slot="action_itens" flat dense label="salvar" @click="saveContato()"/>
    </toolbar>
    <form class="q-pa-md">
      <div style="width: 50%; float: left; padding-right: 20px">
        <custom-input-text type="text" label="Nome" :model="contato.nome" />

        <q-list no-border link>
          <q-list-header class="custom-header">Finalidade</q-list-header>
          <q-item class="custom-item" tag="label">
            <q-item-main label="Cobrança" />
            <q-item-side class="q-pr-sm">
              <q-toggle color="deep-orange" v-model="contato.isCobranca" />
            </q-item-side>
          </q-item>

          <q-item class="custom-item" tag="label">
            <q-item-main label="Fiscal" />
            <q-item-side class="q-pr-sm">
              <q-toggle color="deep-orange" v-model="contato.isFiscal" />
            </q-item-side>
          </q-item>
        </q-list>

      </div>

      <div style="width:50%; float: right; padding-left: 20px">
        <q-list no-border link>
          <q-list-header class="custom-header" inset>Telefones</q-list-header>

          <q-item class="custom-item" v-for="(telefone, index) in contato.telefones"
                  @click.native="openEditPhoneDialog(telefone, index)">
            <q-item-side :icon="getTelefoneIcon(telefone.tipo)"
                         inverted color="light-green-4"  />
            <q-item-main>
              <q-item-tile label>{{telefone.numero.value}}</q-item-tile>
              <q-item-tile sublabel>{{getTelefoneTipo(telefone.tipo)}}</q-item-tile>
            </q-item-main>
            <q-item-side>
              <q-btn rounded dense flat color="red" icon="close" @click.stop="removeTelefone(index)" />
            </q-item-side>
          </q-item>

          <div v-if="contato.telefones.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhum telefone adicionado</span>
          </div>

          <div class="custom-footer" align="right">
            <q-btn  color="deep-orange " label="Novo Telefone" @click="openAddPhoneDialog()" />
          </div>
        </q-list>



        <q-list no-border link>
          <q-list-header class="custom-header" inset>Emails</q-list-header>

          <q-item class="custom-item" v-for="(email, index) in contato.emails"
                  @click.native="openEditEmailDialog(email, index)">
            <q-item-side icon="email" inverted color="light-green-4" />
            <q-item-main>
              <q-item-tile label>{{email.endereco.value}}</q-item-tile>
            </q-item-main>
            <q-item-side>
              <q-btn rounded dense flat color="red" icon="close" @click.stop="removeEmail(index)" />
            </q-item-side>
          </q-item>

          <div v-if="contato.emails.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhum email adicionado</span>
          </div>

          <div class="custom-footer" align="right">
            <q-btn  color="deep-orange " label="Novo Email" @click="openAddEmailDialog()" />
          </div>
        </q-list>
      </div>
    </form>


    <q-dialog v-model="newPhoneDialog" prevent-close @show="onShowPhoneDialog">
      <span slot="title">{{dialogTitlePreffix}} Telefone</span>

      <div slot="body">
        <form @keyup.enter="addTelefone(telefone)">
          <div style="display: flex; align-items: baseline;">
            <custom-input-text ref="telefoneRef" type="text" label="Número" mask="(##)####-####"
                               :model="telefone.numero" style="width: 200px; margin-right: 30px" />

            <q-select
              v-model="telefone.tipo"
              :options="telefoneTipos"
              style="width: 120px"
            />
          </div>
        </form>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat @click="closePhoneDialog"  label="Cancelar"/>
        <q-btn flat @click="addTelefone(telefone)"  label="Adicionar" v-if="!telefoneEditMode"/>
        <q-btn flat @click="editTelefone(telefone, telefoneEditedIndex)"  label="Atualizar" v-if="telefoneEditMode"/>
      </template>
    </q-dialog>


    <q-dialog v-model="newEmailDialog" prevent-close @show="onShowEmailDialog">
      <span slot="title">{{dialogTitlePreffix}} Email</span>

      <div slot="body">
        <form @keyup.enter="addEmail(email)">
          <custom-input-text ref="emailRef" type="text" label="Email" :model="email.endereco" style="width: 250px;" />
        </form>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat @click="closeEmailDialog"  label="Cancelar"/>
        <q-btn flat @click="addEmail(email)"  label="Adicionar" v-if="!emailEditMode"/>
        <q-btn flat @click="editEmail(email, emailEditedIndex)"  label="Atualizar" v-if="emailEditMode"/>
      </template>
    </q-dialog>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Contato from 'assets/js/model/contato/Contato'
  import Telefone from 'assets/js/model/contato/Telefone'
  import Email from 'assets/js/model/contato/Email'
  import ContatoService from 'assets/js/service/ContatoService'

  export default {
    name: "ContatoAdd",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    computed:{
      dialogTitlePreffix: function () {
        return (this.telefoneEditMode || this.emailEditMode) ? "Editar" : "Novo"
      }
    },
    data(){
      return {
        contato: new Contato(),
        telefone: new Telefone(),
        email: new Email(),
        newPhoneDialog: false,
        newEmailDialog: false,
        telefoneEditMode: false,
        emailEditMode: false,
        telefoneEditedIndex: null,
        emailEditedIndex: null,
        telefoneTipos: [
          {
            label: 'Fixo',
            icon: 'phone',
            value: 0
          },
          {
            label: 'Celular',
            icon: 'phone_iphone',
            value: 1
          }
        ]
      }
    },
    methods:{
      saveContato: function(){
        if(this.contato.isValid()){
          if(this.contato.telefones.length === 0 && this.contato.emails.length === 0){
            this.$q.dialog({
              title: 'Ops!',
              message: 'Adicione ao menos um telefone ou um email para continuar.',
              color: 'primary'
            })
          }
        }
      },
      openAddPhoneDialog: function(telefone){
        this.telefoneEditMode = (telefone !== undefined);
        this.telefone = new Telefone(telefone);
        this.newPhoneDialog = true;
      },
      openEditPhoneDialog(telefone, index){
        this.openAddPhoneDialog(telefone);
        this.telefoneEditedIndex = index;
      },
      closePhoneDialog: function () {
        this.newPhoneDialog = false;
      },
      onShowPhoneDialog: function(){
        this.$refs.telefoneRef.$children[0].$children[0].focus()
      },

      openAddEmailDialog: function(email){
        this.emailEditMode = (email !== undefined);
        this.email = new Email(email);
        this.newEmailDialog = true;
      },
      openEditEmailDialog: function(email, index){
        this.openAddEmailDialog(email);
        this.emailEditedIndex = index;
      },
      closeEmailDialog: function () {
        this.newEmailDialog = false;
      },
      onShowEmailDialog: function(){
        this.$refs.emailRef.$children[0].$children[0].focus()
      },

      addTelefone: function(telefone){
        if(telefone.isValid()){
          this.contato.addTelefone(telefone);
          this.closePhoneDialog();
        }
      },
      editTelefone: function(telefone, index){
        if(telefone.isValid()){
          this.contato.editTelefone(telefone, index);
          this.closePhoneDialog();
        }
      },
      removeTelefone: function(index){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esse telefone?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.contato.removeTelefone(index);
        });
      },
      addEmail: function(email){
        if(email.isValid()){
          this.contato.addEmail(email);
          this.closeEmailDialog();
        }
      },
      editEmail: function(email, index){
        if(email.isValid()){
          this.contato.editEmail(email, index);
          this.closeEmailDialog();
        }
      },

      removeEmail: function(index){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esse email?',
          ok: 'Sim',
          cancel: 'Não',
          preventClose: true,
          color: 'primary'
        }).then(data => {
          this.contato.removeEmail(index);
        });
      },
      getTelefoneTipo: function (value) {
        return value === 0 ? 'Fixo' : 'Celular'
      },
      getTelefoneIcon: function (value) {
        return value === 0 ? 'phone' : 'phone_iphone'
      },
      backAction: function () {
        this.$router.go(-1);
      }
    }
  }
</script>

<style>
  .custom-header{
    padding-left: 0;
    padding-right: 0;
  }

  .custom-item{
    padding-left: 8px;
    padding-right: 0;
  }

  .custom-footer{
    padding: 6px;
    border-top: 1px solid #cccccc;
  }

  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }

  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }

  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }

</style>

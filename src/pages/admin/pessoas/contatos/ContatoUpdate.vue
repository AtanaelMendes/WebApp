<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Editar contato">
      <q-btn slot="action_itens" flat dense icon="done" round @click="updateContato()"/>
    </toolbar>

    <q-scroll-area style="height: 200vh" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

      <div class="row q-pa-md gutter-sm">

        <!--TOGGLE FISCAL COBRANCA-->
        <div class="col-12">
          <q-toggle color="deep-orange" label="Fiscal" v-model="contato.isFiscal" class="q-mr-lg"/>
          <q-toggle color="deep-orange" label="Cobrança" v-model="contato.isCobranca" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
          <form>

            <!--IMPUT NOME-->
            <custom-input-text type="text" label="Nome" :model="contato.nome" />

            <!--IMPUT TELEFONE-->
            <q-list no-border link>
              <q-list-header inset>Telefones</q-list-header>

              <q-item v-for="(telefone, index) in contato.telefones" :key="telefone.id"  @click.native="openEditPhoneDialog(telefone, index)">
                <q-item-side :icon="getTelefoneIcon(telefone.tipo)" inverted color="light-green-4"  />
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

            <!--IMPUT EMAIL-->
            <q-list no-border link>
              <q-list-header inset>Emails</q-list-header>

              <q-item v-for="(email, index) in contato.emails" :key="index" @click.native="openEditEmailDialog(email, index)">
                <q-item-side icon="email" inverted color="light-green-4" />
                <q-item-main style="overflow: hidden">
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

          </form>
        </div>
      </div>

    </q-scroll-area>

    <!--DIALOG TELEFONE-->
    <q-dialog v-model="newPhoneDialog" prevent-close @show="onShowPhoneDialog">
      <span slot="title">{{dialogTitlePreffix}} Telefone</span>
      <div slot="body">
        <div class="row">
          <form @keyup.enter="addTelefone(telefone)">

            <custom-input-text key="fixo" v-if="telefoneTipoSelected.label == 'fixo' " ref="telefoneRef" type="text" label="Número" mask="(##)####-####" :model="telefone.numero"/>
            <custom-input-text key="celular" v-if="telefoneTipoSelected.label == 'celular' " ref="telefoneRef" type="text" label="Número" mask="(##)#####-####" :model="telefone.numero"/>

            <q-btn-dropdown class="full-width" flat :label="telefoneTipoSelected.label" :icon="telefoneTipoSelected.icon">
              <q-list link>

                <q-item @click.native="setTelefoneTipo('fixo')" v-close-overlay>
                  <q-item-side icon="phone"/>
                  <q-item-main>
                    <q-item-tile label>Fixo</q-item-tile>
                  </q-item-main>
                </q-item>

                <q-item @click.native="setTelefoneTipo('celular')" v-close-overlay>
                  <q-item-side icon="phone_iphone"/>
                  <q-item-main>
                    <q-item-tile label>Celular</q-item-tile>
                  </q-item-main>
                </q-item>

              </q-list>
            </q-btn-dropdown>
          </form>
        </div>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat @click="closePhoneDialog"  label="Cancelar"/>
        <q-btn flat @click="addTelefone(telefone)"  label="Adicionar" v-if="!telefoneEditMode"/>
        <q-btn flat @click="editTelefone(telefone, telefoneEditedIndex)"  label="Atualizar" v-if="telefoneEditMode"/>
      </template>
    </q-dialog>
    <!--FIM DIALOG TELEFONE-->

    <!--DIALOG EMAIL-->
    <q-dialog v-model="newEmailDialog" prevent-close @show="onShowEmailDialog">
      <span slot="title">{{dialogTitlePreffix}} Email</span>

      <div slot="body">
        <form @keyup.enter="addEmail(email)">
          <custom-input-text ref="emailRef" type="email" label="Email" :model="email.endereco"/>
        </form>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat @click="closeEmailDialog"  label="Cancelar"/>
        <q-btn flat @click="addEmail(email)"  label="Adicionar" v-if="!emailEditMode"/>
        <q-btn flat @click="editEmail(email, emailEditedIndex)"  label="Atualizar" v-if="emailEditMode"/>
      </template>
    </q-dialog>
    <!--FIM DIALOG EMAIL-->

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Contato from 'assets/js/model/contato/Contato'
  import Telefone from 'assets/js/model/contato/Telefone'
  import Email from 'assets/js/model/contato/Email'
  import contatoService from 'assets/js/service/ContatoService'
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
        contatoId: null,
        contato: new Contato(),
        telefone: new Telefone(),
        email: new Email(),
        newPhoneDialog: false,
        newEmailDialog: false,
        telefoneEditMode: false,
        emailEditMode: false,
        telefoneEditedIndex: null,
        emailEditedIndex: null,
        telefoneTipoSelected: {
          icon: 'phone',
          label: 'fixo',
        },
      }
    },
    methods:{
      fillForm: function(data){
        let vm = this
        this.contatoId = data.id
        this.contato.isFiscal = data.is_fiscal
        this.contato.isCobranca = data.is_cobranca
        this.contato.nome.value = data.nome
        data.telefones.forEach(function (telefone) {
          let telefoneConverted = {tipo: telefone.is_celular ? 1 : 0, numero: {value: telefone.numero}};
          vm.contato.addTelefone(new Telefone(telefoneConverted))
        })
        data.emails.forEach(function (email) {
          let emailConverted = {endereco: {value: email.endereco}};
          vm.contato.addEmail(new Email(emailConverted))
        })
      },
      getContato: function(){
        let pessoaId = this.$route.params.id
        let contatoId = this.$route.params.contatoId
        contatoService.getContato(pessoaId, contatoId).then(contato => {
          this.fillForm(contato)
        });
      },
      setTelefoneTipo: function(tipo){
        if(tipo == 'fixo' ){
          this.telefoneTipoSelected.icon = 'phone'
          this.telefoneTipoSelected.label = 'fixo'
          this.telefone.tipo = 0
        }
        if(tipo == 'celular' ){
          this.telefoneTipoSelected.icon = 'phone_iphone'
          this.telefoneTipoSelected.label = 'celular'
          this.telefone.tipo = 1
        }
      },
      updateContato: function(){
        if(this.contato.isValid()){
          if(this.contato.telefones.length === 0 && this.contato.emails.length === 0){
            this.$q.dialog({
              title: 'Ops!',
              message: 'Adicione ao menos um telefone ou um email para continuar.',
              color: 'primary'
            })
          }
        }
        contatoService.updateContato(this.$route.params.id, this.contatoId, this.contato.getValues()).then( () => {
          this.$q.notify({type: 'positive', message: 'Contato criado com sucesso'})
          this.$router.go(-1);
        }).catch(error => {
          this.$q.notify({type: 'negative', message: error})
        })
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
        this.$router.back()
      }
    },
    mounted(){
      this.getContato()
    }
  }
</script>

<style>
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

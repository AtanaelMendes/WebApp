<template>
  <ap-modal ref="editAccountInfoModal" title="Editar Informações" :visible="isModalOpened" @hide="closeModal">
    <div slot="content" class="q-mx-lg q-mb-lg" v-if="currentAccount" >
      <q-field :error="nomeError !== null" :error-label="nomeError" class="q-mt-sm">
        <q-input v-model="currentAccount.nome" stack-label="Nome" @input="nomeError = null" />
      </q-field>

      <q-field :error="emailError !== null" :error-label="emailError" class="q-mt-sm">
        <q-input v-model="currentAccount.email" autocomplete="off" stack-label="Email"  @input="emailError = null" />
      </q-field>

      <q-field :error="passwordError !== null" :error-label="passwordError" class="q-mt-lg">
        <q-input v-model="currentPassword" type="password" autocomplete="new-password"  @input="passwordError = null"
                 inverted-light color="grey-4" stack-label="Senha atual" />
      </q-field>
    </div>

    <div class="text-right" slot="footer">
      <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="updateAccountInfo" flat label="Salvar" color="primary" />
    </div>
  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  import customInputText from 'components/CustomInputText.vue'
  import AccountService from "../../assets/js/service/AccountService";
  import { helpers, email} from 'vuelidate/lib/validators'

  export default {
    name: "EditAccountInfoModal",
    components:{
      apModal,
      customInputText
    },
    data(){
      return {
        isModalOpened: false,
        currentAccount: null,
        accountService: new AccountService(),
        currentPassword: "",
        nomeError: null,
        emailError: null,
        passwordError: null,
      }
    },
    methods: {
      openModal(account) {
        this.isModalOpened = true;
        this.currentAccount = JSON.parse(JSON.stringify(account));
        this.currentPassword = "";
        this.nomeError = null;
        this.emailError = null;
        this.passwordError = null;
      },
      closeModal() {
        this.isModalOpened = false;
      },
      updateAccountInfo(){
        if(!this.isFormValid()){
          return
        }

        this.$refs.editAccountInfoModal.showOuterProgress();

        let body = {
          'nome':this.currentAccount.nome,
          'email':this.currentAccount.email,
          'password':this.currentPassword
        };

        this.accountService.updateInfo(body).then(()=>{
          this.$q.notify({type: 'positive', message: 'Conta modificada com sucesso'});
          this.$refs.editAccountInfoModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('updateAccountInfo')
        }).catch(error => {
          if(error instanceof Error){
            this.$q.dialog({
              title:'Ops',
              message: error.message
            })
          }else{
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          }
          this.$refs.editAccountInfoModal.hideOuterProgress();
        })
      },
      isFormValid(){
        let hasError = false;

        if(!helpers.req(this.currentAccount.nome)){
          this.nomeError = "Digite um nome";
          hasError = true;
        }else if(helpers.len(this.currentAccount.nome) < 3){
          this.nomeError = "O nome deve ter no mínimo 3 caracteres";
          hasError = true;
        }

        if(!helpers.req(this.currentAccount.email)){
          this.emailError = "Digite um email";
          hasError = true;
        }else if(!email(this.currentAccount.email)){
          this.emailError = "O email é inválido";
          hasError = true;
        }

        if(!helpers.req(this.currentPassword)){
          this.passwordError = "Digite sua senha";
          hasError = true;
        }else if(helpers.len(this.currentPassword) < 8){
          this.passwordError = "A senha deve ter no mínimo 8 caracteres";
          hasError = true;
        }

        return !hasError;
      }
    },
  }
</script>

<style scoped>

</style>

<template>
  <ap-modal ref="chagePasswordModal" title="Alterar Senha" :visible="isModalOpened" @hide="closeModal">
    <div slot="content" class="q-mx-lg q-mb-lg" >
      <q-field :error="currentPasswordError !== null" :error-label="currentPasswordError" class="q-mt-sm">
        <q-input v-model="currentPassword" type="password" autocomplete="new-password"  @input="currentPasswordError = null"
                 inverted-light color="grey-4" stack-label="Senha atual" />
      </q-field>

      <q-field :error="newPasswordError !== null" :error-label="newPasswordError" class="q-mt-lg">
        <q-input v-model="newPassword" type="password" autocomplete="new-password"  @input="newPasswordError = null"
                 no-pass-toggle stack-label="Nova senha" />
      </q-field>

      <q-field :error="repeatPasswordError !== null" :error-label="repeatPasswordError" class="q-mt-sm">
        <q-input v-model="repeatPassword" type="password" autocomplete="new-password"  @input="repeatPasswordError = null"
                 no-pass-toggle stack-label="Repetir senha" />
      </q-field>
    </div>

    <div class="text-right" slot="footer">
      <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="changePassword" flat label="Salvar" color="primary" />
    </div>
  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  import { helpers} from 'vuelidate/lib/validators'
  import AccountService from "../../assets/js/service/AccountService";

  export default {
    name: "ChangePasswordModal",
    components:{
      apModal
    },
    data(){
      return {
        isModalOpened: false,
        accountService: new AccountService(),
        currentPassword: "",
        newPassword: "",
        repeatPassword: "",
        currentPasswordError: null,
        newPasswordError: null,
        repeatPasswordError: null,
      }
    },
    methods: {
      openModal() {
        this.isModalOpened = true;
        this.currentPassword = "";
        this.newPassword = "";
        this.repeatPassword = "";
        this.currentPasswordError = null;
        this.newPasswordError = null;
        this.repeatPasswordError = null;
      },
      closeModal() {
        this.isModalOpened = false;
      },
      changePassword(){
        if(!this.isFormValid()){
          return
        }

        this.$refs.chagePasswordModal.showOuterProgress();

        let body = {
          'password':this.currentPassword,
          'new_password':this.newPassword
        };

        this.accountService.changePassword(body).then(() => {
          this.$q.notify({type: 'positive', message: 'Senha alterada com sucesso'});
          this.$refs.chagePasswordModal.hideOuterProgress();
          this.closeModal();
        }).catch(error => {
          this.closeModal();
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.chagePasswordModal.hideOuterProgress();
        })
      },
      isFormValid(){
        let hasError = false;

        if(!helpers.req(this.currentPassword)){
          this.currentPasswordError = "Digite sua senha";
          hasError = true;
        }else if(helpers.len(this.currentPassword) < 8){
          this.currentPasswordError = "A senha deve ter no mínimo 8 caracteres";
          hasError = true;
        }

        if(!helpers.req(this.newPassword)){
          this.newPasswordError = "Digite uma nova senha";
          hasError = true;
        }else if(helpers.len(this.newPassword) < 8){
          this.newPasswordError = "A senha deve ter no mínimo 8 caracteres";
          hasError = true;
        }

        if(!helpers.req(this.repeatPassword)){
          this.repeatPasswordError = "Digite a nova senha novamente";
          hasError = true;
        }else if(this.repeatPassword !== this.newPassword){
          this.repeatPasswordError = "As senhas não são iguais";
          hasError = true;
        }

        return !hasError;
      }
    }
  }
</script>

<style scoped>

</style>

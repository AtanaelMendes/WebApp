<template>
  <q-modal v-model="isModalOpened" class="view-account-modal" minimized >
    <q-modal-layout>
      <template v-if="currentAccount">
        <div class="header shadow-2">
          <q-btn flat round dense icon="more_vert" class="menu-btn">
            <q-popover>
              <q-list link class="scroll" >
                <q-item v-close-overlay @click.native="openModalUpdateAccountPicture">
                  <q-item-main label="Trocar Foto" />
                </q-item>
                <q-item v-close-overlay @click.native="">
                  <q-item-main label="Editar Informações" />
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>

          <img src="/statics/images/no-image-user.svg" v-if="currentAccount.image_file_name === null" class="profile-image shadow-2"/>
          <ap-image size="250x250" :fileName="currentAccount.image_file_name" v-if="currentAccount.image_file_name !== null" class="profile-image shadow-2"/>
        </div>
        <div class="content">
          <span class="q-subheading text-weight-regular">{{currentAccount.nome}}</span>
          <span class="q-body-2 q-mt-sm text-weight-light">{{currentAccount.email}}</span>
        </div>
      </template>

      <div slot="footer" class="q-pa-sm text-right">
        <q-btn flat color="primary" label="OK" @click="closeModal" />
      </div>
    </q-modal-layout>

    <!--MODAL UPDATE ACCOUNT PICTURE-->
    <q-modal v-model="modalUpdateAccountPicture" maximized no-backdrop-dismiss>
      <div class="row justify-center q-pt-lg">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 q-display-1 text-center"></div>
      </div>

      <div class="row justify-center content-center" style="min-height: 80vh">
        <imape-upload ref="accountImageUpload"
                      url="/account/image"
                      v-on:on_error="uploadFotoError"
                      v-on:on_upload_success="uploadFotoSuccess"
                      v-on:on_upload_error="uploadFotoError" />
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click.native="closeModalUpdateAccountPicture" color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="uploadAccountFoto" color="deep-orange" label="Salvar"/>
      </q-page-sticky>
    </q-modal>

  </q-modal>
</template>

<script>
  import imapeUpload from 'components/ImageUpload'
  import apImage from 'components/ApImage'
  import AccountService from "../../assets/js/service/AccountService";
  import AccountAPI from "../../assets/js/api/AccountAPI";
  import AccountRepository from "../../assets/js/repository/AccountRepository";

  export default {
    name: "ViewAccountModal",
    components: {
      apImage,
      imapeUpload,
    },
    data(){
      return{
        accountService: new AccountService(),
        accountRepository: new AccountRepository(),
        isModalOpened: false,
        modalUpdateAccountPicture: false,
        currentAccount: null,
      }
    },
    methods:{
      openModal() {
        this.isModalOpened = true;
        this.getAccountInfo();
      },
      closeModal() {
        this.isModalOpened = false;
      },
      getAccountInfo(){
        this.accountService.getInfo().then(info => {
          this.currentAccount = info;
        })
      },
      openModalUpdateAccountPicture(){
        this.modalUpdateAccountPicture = true;
      },
      closeModalUpdateAccountPicture(){
        this.modalUpdateAccountPicture = false;
        this.$refs.accountImageUpload.clear();
      },
      async uploadFotoSuccess(response){
        this.closeModalUpdateAccountPicture();
        //TODO: Colocar em um serviço
        await AccountAPI.getAccountInfo().then(response => {
          this.accountRepository.update(response.data).then(() => {
            this.currentAccount = response.data;
            this.$root.$emit('refreshAccountInfo')
          });
        });
      },
      uploadFotoError(error){
        if(error.data){
          this.$q.notify({type: 'negative', message: error.data.image[0]})
        }else{
          this.$q.dialog({noBackdropDismiss: true, title: 'Oops!', message: error, ok: 'OK'});
        }
      },
      uploadAccountFoto(){
        this.$refs.accountImageUpload.uploadImage();
      },
    }
  }
</script>

<style >
  .view-account-modal .modal-content{
    background: #f6f6f6;
  }

  .view-account-modal .q-layout-footer{
    box-shadow: none;
  }
  .view-account-modal .header{
    height: 100px;
    background-color: teal;
    text-align: center;
  }
  .view-account-modal .menu-btn{
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
  }
  .view-account-modal .profile-image{
    border-radius: 50%;
    border: 2px solid white;
    width: 120px;
    height: 120px;
    display: inline-block;
    position: absolute;
    top: 40px;
    background: #106767;
    margin-left: -60px;
  }
  .view-account-modal .content{
    margin-top: 75px;
    height: 100px;
    padding: 10px;
    text-align: center;
  }

  .view-account-modal .content span{
    display: block;
  }
</style>

<template>
  <q-layout view="lHh Lpr lFr">
    <q-layout-header></q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" class="layout-drawer" behavior="mobile">
      <template v-if="currentAccount">
        <div class="navigation-header" :class="{'with-tenant':$user.tenants.length > 1}">
          <img src="/statics/images/no-image-user.svg" v-if="currentAccount.image_file_name === null" class="profile-image shadow-2"/>
          <ap-image size="250x250" :fileName="currentAccount.image_file_name" v-if="currentAccount.image_file_name !== null" class="profile-image shadow-2"/>
          <span class="profile-name">{{currentAccount.nome}}</span>
          <span class="profile-email">{{currentAccount.email}}</span>
          <div class="tenant-selector" v-if="currentAccount.tenants.length > 1">
            <q-btn-dropdown :label="currentAccount.activedTenant.nome" color="white" text-color="black" size="sm" rounded >
              <!-- dropdown content -->
              <q-list link>
                <q-item v-for="tenant in currentAccount.tenants" @click.native="changeTenant(tenant.key)">
                  <q-item-main>
                    <q-item-tile>{{tenant.nome}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div>
            <q-btn flat round dense class="network_status_icon" @click="showOfflineAlertDialog" v-if="isOfflineStatusBarVisible" >
              <q-icon name="mdi-alert" color="warning"/>
            </q-btn>
            <q-btn flat round dense class="settings_icon">
              <q-icon name="settings" />
              <q-popover>
                <q-list link class="scroll" style="min-width: 200px">
                  <q-item v-close-overlay @click.native="showAccountModal">
                    <q-item-side left>
                      <q-item-tile icon="mdi-account" />
                    </q-item-side>
                    <q-item-main label="Minha conta" />
                  </q-item>
                  <q-item v-close-overlay @click.native="getAccountInfo()">
                    <q-item-side left>
                      <q-item-tile icon="mdi-sync" />
                    </q-item-side>
                    <q-item-main label="Sincronizar" />
                  </q-item>
                  <q-item-separator />
                  <q-item v-close-overlay @click.native="logout()">
                    <q-item-side left>
                      <q-item-tile icon="mdi-power" color="red" />
                    </q-item-side>
                    <q-item-main label="Sair" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
            <span class="app-version" >v. {{app_version}}</span>
          </div>
        </div>
      </template>
      <q-list no-border link inset-delimiter>

        <!--DASHBOARD-->
        <q-item @click.native="$router.push('/admin')">
          <q-item-side icon="dashboard" />
          <q-item-main label="Dashboard" />
        </q-item>

        <!--USUARIOS-->
        <q-item @click.native="$router.push({name:'users'})">
          <q-item-side icon="group" />
          <q-item-main label="Usuários" />
        </q-item>

        <!--PESSOAS-->
        <q-item @click.native="$router.push({name:'pessoas'})">
          <q-item-side icon="group" />
          <q-item-main label="Pessoas" />
        </q-item>

        <!--MOTORISTAS-->
        <q-item @click.native="$router.push({name:'motoristas'})">
          <q-item-side icon="group" />
          <q-item-main label="Motoristas" />
        </q-item>

        <!--GRUPOS ECONOMICOS-->
        <q-item @click.native="$router.push({name:'grupos_economicos'})">
          <q-item-side icon="group_work" />
          <q-item-main label="Grupos econômicos" />
        </q-item>

        <!--AREAS-->
        <q-item @click.native="$router.push({name:'areas'})">
          <q-item-side icon="place" />
          <q-item-main label="Áreas" />
        </q-item>

        <!--NOTAS FISCAIS-->
        <q-item @click.native="$router.push({name:'notas-fiscais'})">
          <q-item-side icon="receipt" />
          <q-item-main label="Notas Fiscais" />
        </q-item>

        <!--SAFRAS-->
        <q-item @click.native="$router.push({name:'safras'})">
          <!--<q-item-side><i class="fab fa-pagelines q-headline"></i></q-item-side>-->
          <q-item-side icon="spa"/>
          <q-item-main label="Safras" />
        </q-item>

        <!--CULTURAS-->
        <q-item @click.native="$router.push({name:'culturas'})">
          <q-item-side icon="spa"/>
          <q-item-main label="Culturas" />
        </q-item>

        <!--CONTRATOS-->
        <q-item @click.native="$router.push({name:'negocios'})">
          <q-item-side icon="work"/>
          <q-item-main label="Negócios" />
        </q-item>

        <!--ENTREGAS-->
        <q-item @click.native="$router.push({name:'entregas', query: { status: 'carregando' }})">
          <q-item-side icon="local_shipping"/>
          <q-item-main label="Entregas" />
        </q-item>

        <!--CAMINHOES-->
        <q-item @click.native="$router.push({name:'caminhoes'})">
          <q-item-side icon="local_shipping"/>
          <q-item-main label="Caminhões" />
        </q-item>

        <!--ARMAZEMS-->
        <q-item @click.native="$router.push({name:'armazens'})">
          <q-item-side icon="location_city"/>
          <q-item-main label="Armazéns" />
        </q-item>

        <!--CLASSIFICACOES-->
        <q-item @click.native="$router.push({name:'classificacoes'})">
          <q-item-side icon="assessment"/>
          <q-item-main label="Classificações" />
        </q-item>

      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />

    </q-page-container>

    <!--<q-dialog v-model="isNetworkErrorDialogOpen">-->
    <q-dialog v-model="isNetworkErrorDialogOpen" ref="isNetworkErrorDialogOpen">
      <div slot="title"></div>
      <div slot="body" align="center">
        <q-icon name="mdi-wifi-off" size="50px"/>
        <p class="q-my-none q-mt-md">Sem conexão com a internet!</p>
      </div>
      <template slot="buttons" class="q-mt-sm">
        <q-btn flat label="OK" @click="isNetworkErrorDialogOpen = false"/>
      </template>
    </q-dialog>


    <forbidden-access-dialog></forbidden-access-dialog>
    <sync-progress-dialog ref="syncProgressDialog"></sync-progress-dialog>

    <view-account-modal ref="viewAccountModal" />

    <q-layout-footer v-model="offlineStatusBar" >
      <div class="offline-status-bar">
        <q-item dense>
          <q-item-side>
            <q-icon name="mdi-wifi-off" color="white" />
          </q-item-side>
          <q-item-main>
            Você está desconectado
          </q-item-main>
          <q-item-side right>
            <q-btn flat label="Ok" color="white" @click="hideOfflineStatusBar"/>
          </q-item-side>
        </q-item>
      </div>
    </q-layout-footer>
  </q-layout>
</template>

<script>
  import {version} from '../../package.json';
  import SyncService from "../assets/js/service/sync/SyncService";
  import AccountService from "../assets/js/service/AccountService";
  import ForbiddenAccessDialog from "../components/offline/ForbiddenAccessDialog";
  import SyncProgressDialog from "../components/offline/SyncProgressDialog";
  import viewAccountDialog from "../components/account/ViewAccountModal";
  import ServiceMessage from '../assets/js/serviceWorker/ServiceMessage';
  import ServiceWorker from "../assets/js/serviceWorker/ServiceWorker";
  import ViewAccountModal from "../components/account/ViewAccountModal";
  import apImage from 'components/ApImage'
  import AuthService from "../assets/js/service/AuthService";

  export default {
    name: 'Admin',
    components:{
      ViewAccountModal,
      SyncProgressDialog,
      ForbiddenAccessDialog,
      viewAccountDialog,
      apImage
    },
    data () {
      return {
        accountService: new AccountService(),
        authService: new AuthService(),
        syncService: null,
        leftDrawerOpen: this.$q.platform.is.desktop,
        currentAccount: null,
        isOfflineStatusBarVisible: false,
        isNetworkErrorDialogOpen: false,
      }
    },
    computed:{
      app_version: function () {
        return version;
      },
      offlineStatusBar(){
        return this.isOfflineStatusBarVisible;
      }
    },
    methods: {
      changeTenant(tenant){
        console.log('changeTenant', tenant)
        this.authService.changeActiveTenant(tenant);
        this.$router.go();
      },
      doSync(){
        if(this.serverStatus.isUp) {
          this.syncService = new SyncService();
          this.$refs.syncProgressDialog.openModal();
          this.syncService.doSync().then(() => {
            this.$refs.syncProgressDialog.closeModal();
            ServiceWorker.sendMessage(new ServiceMessage(ServiceMessage.SYNC_FINISHED, status));
          }).catch(error => {
            this.$refs.syncProgressDialog.closeModal();
            console.log("Erro ao sincronizar")
          })

        }
      },
      serviceWorkerMessageEvent(event){
        switch (event.data.type) {
          case ServiceMessage.SYNC:
            this.doSync();
            break;
          case ServiceMessage.SERVER_STATUS:
            if(event.data.payload === true){
              this.hideOfflineStatusBar();
              this.doSync();
            }else{
              this.showOfflineStatusBar();
            }
            break;
        }
      },
      showAccountModal(){
        this.$refs.viewAccountModal.openModal(this.currentAccount);
      },
      showOfflineAlertDialog(){
        this.isNetworkErrorDialogOpen = true;
      },
      hideOfflineStatusBar(){
        this.isOfflineStatusBarVisible = false;
      },
      showOfflineStatusBar(){
        this.isOfflineStatusBarVisible = true;
      },
      getAccountInfo(){
        this.authService.getAccountInfo().then(info => {
          this.currentAccount = info;

          //this.doSync();
        });
      },
      toogleLeftDrawer() {
        this.leftDrawerOpen = !this.leftDrawerOpen;
      },
      logout(){
        this.$q.dialog({
          title: 'Sair do sistema',
          message: 'Tem certeza que deseja sair?',
          ok: 'Sair',
          cancel: 'Cancelar'
        }).then(data => {
          this.accountService.logout().then(()=>{
            this.$router.push('/login');
          })
        });

      }
    },
    mounted(){
      this.getAccountInfo();
      //TODO: Registrar o service worker manualmente
      //TODO: Esse método só pode ser chamado depois que o serviceWorker for iniciado

      this.$root.$on('toogleLeftDrawer', this.toogleLeftDrawer);
      this.$root.$on('refreshAccountInfo', this.getAccountInfo);

      if('serviceWorker' in navigator){
        navigator.serviceWorker.addEventListener('message', this.serviceWorkerMessageEvent);
      }

    },
    destroyed() {
      this.$root.$off('toogleLeftDrawer', this.toogleLeftDrawer);
      this.$root.$off('refreshAccountInfo', this.getAccountInfo);

      if('serviceWorker' in navigator){
        navigator.serviceWorker.removeEventListener('message', this.serviceWorkerMessageEvent);
      }
    }
  }
</script>

<style>
  body{
    /*overflow: hidden;*/
  }
  .navigation-header{
    height: 150px;
    background-color: teal;
    padding: 20px;
  }
  .navigation-header.with-tenant{
    height: 190px;
  }
  .navigation-header .profile-image{
    border-radius: 50%;
    border: 2px solid white;
    width: 65px;
    height: 65px;
    display: block;
    margin-bottom: 10px;
  }

  .navigation-header .profile-name{
    color: white;
    font-size: 16px;
    font-weight: 400;
    display: block;
    margin-bottom: 6px;
  }

  .navigation-header .profile-email{
    color: white;
    font-size: 14px;
    font-weight: 300;
    display: block;
  }

  .navigation-header .settings_icon{
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
    color: white;
  }

  .navigation-header .network_status_icon{
    position: absolute;
    top: 0px;
    right: 30px;
    margin: 20px;
    color: white;
  }

  .navigation-header .tenant-selector{
    margin-top: 10px;
  }

  .app-version{
    color: white;
    font-size: 10px;
    position: absolute;
    top: 60px;
    right: 28px;
  }

  .q-layout-drawer{
    background: #fcfcfc;
  }
  .layout-drawer .q-list-link .q-item:hover{
    background: rgba(217, 217, 217, 0.3);
  }
  .space-end{
    margin-bottom: 100px;
  }
  .offline-status-bar{
    background: var(--q-color-tertiary);
    color: white;
  }
  .offline-status-bar .q-item-side-left{
    min-width: unset;
    margin-right: 6px;
  }

</style>

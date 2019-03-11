<template>
  <q-layout view="lHh Lpr lFr">
    <q-layout-header></q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" class="layout-drawer">
      <div class="navigation-header">
        <img src="/statics/images/no-image-user.svg" class="profile-image shadow-1"/>
        <span class="profile-name">{{currentAccount.name}}</span>
        <span class="profile-email">{{currentAccount.email}}</span>
        <div>
          <q-btn flat round dense class="network_status_icon" @click="showOfflineAlertDialog" v-if="isOffline" >
            <q-icon name="mdi-alert" color="warning"/>
          </q-btn>
          <q-btn flat round dense class="settings_icon">
            <q-icon name="settings" />
            <q-popover>
              <q-list link class="scroll" style="min-width: 200px">
                <!--<q-item @click.native="">
                  <q-item-main label="Minha conta" />
                </q-item>-->
                <q-item @click.native="logout()">
                  <q-item-main label="Sair" />
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
          <span class="app-version" >v. {{app_version}}</span>
        </div>

      </div>
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

        <!--AREAS-->
        <q-item @click.native="$router.push({name:'areas'})">
          <q-item-side icon="place" />
          <q-item-main label="Áreas" />
        </q-item>

        <!--NOTAS FISCAIS-->
        <!--<q-item @click.native="$router.push({name:'notas-fiscais'})">
          <q-item-side icon="receipt" />
          <q-item-main label="Notas Fiscais" />
        </q-item>-->

        <!--SAFRAS-->
        <q-item @click.native="$router.push({name:'safras'})">
          <!--<q-item-side><i class="fab fa-pagelines q-headline"></i></q-item-side>-->
          <q-item-side icon="spa"/>
          <q-item-main label="Safras" />
        </q-item>

        <!--CULTURAS-->
        <q-item @click.native="$router.push({name:'culturas'})">
          <q-item-side icon="spa"/>
          <q-item-main label="Cultivares" />
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
  import NetworkStateMixin from 'components/mixins/NetworkStateMixin'
  import {version} from '../../package.json';
  import SyncService from "../assets/js/service/sync/SyncService";
  import ResourceService from "../assets/js/service/sync/ResourceService";
  import ListService from "../assets/js/service/sync/ListService";
  import AccountService from "../assets/js/service/AccountService";
  import ForbiddenAccessDialog from "../components/offline/ForbiddenAccessDialog";
  import SyncProgressDialog from "../components/offline/SyncProgressDialog";
  export default {
    name: 'Admin',
    mixins: [NetworkStateMixin],
    components:{
      SyncProgressDialog,
      ForbiddenAccessDialog
    },
    data () {
      return {
        accountService: new AccountService(),
        syncService: new SyncService(),
        leftDrawerOpen: this.$q.platform.is.desktop,
        currentAccount: {
          name: null,
          email: null
        },
        isOfflineStatusBarVisible: true,
        isNetworkErrorDialogOpen: false,
      }
    },
    mounted(){
      this.getAccountInfo();
      //TODO: Registrar o service worker manualmente
      //TODO: Esse método só pode ser chamado depois que o serviceWorker for iniciado

      this.$root.$on('toogleLeftDrawer', this.toogleLeftDrawer);

      this.$on('offline', () => {
        this.showOfflineStatusBar();
      });

      /*this.$on('online', () => {
        //alert('You are online!')
        this.getAccountInfo();
      });*/

      if('serviceWorker' in navigator){
        navigator.serviceWorker.addEventListener('message', this.serviceWorkerMessageEvent);
      }

    },
    computed:{
      app_version: function () {
        return version;
      },
      offlineStatusBar(){
        return this.isOffline && this.isOfflineStatusBarVisible;
      }
    },
    methods: {
      serviceWorkerMessageEvent(event){
        switch (event.data) {
          case 'sync':
            this.syncService.doSync().then(()=>{
              event.ports[0].postMessage("queueSyncFinished");
            });
            break;
        }
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
        this.accountService.getInfo().then(info => {
          this.currentAccount.name = info.nome;
          this.currentAccount.email = info.email;

          this.getInitialContent(info.produtor_id)
        })
      },
      getInitialContent(produtorId){
        this.$refs.syncProgressDialog.openModal();
        this.syncService.getInitialContent(produtorId);
        new ResourceService(produtorId).download().then(() => {
          new ListService(produtorId).download().then(() => {
            this.$refs.syncProgressDialog.closeModal();
          }).catch(error => {
            console.log("Erro no download de ListService")
          })
        }).catch(error => {
          console.log("Erro no download de ResourseService")
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
          accountService.logout().then(()=>{
            this.$router.push('/login');
          })
        });

      }
    },
    destroyed() {
      if('serviceWorker' in navigator){
        navigator.serviceWorker.removeEventListener('message', this.serviceWorkerMessageEvent);
      }
    }
  }
</script>

<style>
  body{
    overflow: hidden;
  }
  .navigation-header{
    height: 150px;
    background-color: teal;
    padding: 20px;
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

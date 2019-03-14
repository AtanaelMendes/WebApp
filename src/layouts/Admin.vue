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

        <!--MOTORISTAS-->
        <q-item @click.native="$router.push({name:'motoristas'})">
          <q-item-side icon="group" />
          <q-item-main label="Motoristas" />
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

        <!--CAMINHOES-->
        <q-item @click.native="$router.push({name:'caminhoes'})">
          <q-item-side icon="local_shipping"/>
          <q-item-main label="Caminhões" />
        </q-item>

        <!--ARMAZEMS-->
        <q-item @click.native="$router.push({name:'caminhoes'})">
          <q-item-side icon="location_city"/>
          <q-item-main label="Armazéns" />
        </q-item>

        <!--&lt;!&ndash;TESTE&ndash;&gt;-->
        <!--<q-item @click.native="$router.push({name:'teste'})">-->
          <!--<q-item-side icon="mdi-close-circle-outline"/>-->
          <!--<q-item-main label="Teste" />-->
        <!--</q-item>-->

      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />

    </q-page-container>

    <!--<q-dialog v-model="isNetworkErrorDialogOpen">-->
    <q-dialog v-model="isNetworkErrorDialogOpen">
      <div slot="title"></div>
      <div slot="body" align="center">
        <q-icon name="mdi-wifi-off" size="50px"/>
        <p class="q-my-none q-mt-md">Sem conexão com a internet!</p>
      </div>
      <template slot="buttons" class="q-mt-sm">
        <q-btn flat label="OK" @click="isNetworkErrorDialogOpen = false"/>
      </template>
    </q-dialog>


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
  import accountService from 'assets/js/service/AccountService'
  import NetworkStateMixin from 'components/mixins/NetworkStateMixin'
  import {version} from '../../package.json';
  import SyncService from "../assets/js/service/SyncService";
  export default {
    name: 'Admin',
    mixins: [NetworkStateMixin],
    data () {
      return {
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

      this.$root.$on('toogleLeftDrawer', this.toogleLeftDrawer);

      this.$on('offline', () => {
        this.showOfflineStatusBar();
      });

      this.$on('online', () => {
        //alert('You are online!')
      });


      if('serviceWorker' in navigator){
        navigator.serviceWorker.addEventListener('message', function(event){
          switch (event.data) {
            case 'sync':
              new SyncService().doSync();
              break;
          }
          //console.log("Client 1 Received Message: " + event.data);
          //event.ports[0].postMessage("Client 1 Says 'Hello back!'");
        });
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
      showOfflineAlertDialog(){
        this.isNetworkErrorDialogOpen = true;
      },
      hideOfflineStatusBar(){
        this.isOfflineStatusBarVisible = false;
      },
      showOfflineStatusBar(){
        this.isOfflineStatusBarVisible = true;
      },
      getAccountInfo: function(){
        this.$axios.get( 'account/info').then( response => {
          this.currentAccount.name = response.data.nome;
          this.currentAccount.email = response.data.email;
          localStorage.setItem( 'account.produtor_id', response.data.produtor_id);
        })
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

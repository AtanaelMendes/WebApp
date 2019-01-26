<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header></q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" class="layout-drawer">
      <div class="navigation-header">
        <img src="/statics/images/no-image-user.svg" class="profile-image shadow-1"/>
        <span class="profile-name">{{currentAccount.name}}</span>
        <span class="profile-email">{{currentAccount.email}}</span>
        <div>
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
  </q-layout>
</template>

<script>
  import accountService from 'assets/js/service/AccountService'
  import {version} from '../../package.json';
export default {
  name: 'Admin',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      currentAccount: {
        name: null,
        email: null
      }
    }
  },
  mounted(){
    this.getAccountInfo();

    this.$root.$on('toogleLeftDrawer', this.toogleLeftDrawer)
  },
  computed:{
    app_version: function () {
      return version;
    },
  },
  methods: {
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

</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header></q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" class="layout-drawer">
      <div class="navigation-header">
        <img src="~assets/images/person-profile-image.jpg" class="profile-image shadow-1" style="opacity: 0"/>
        <span class="profile-name">{{currentAccount.name}}</span>
        <span class="profile-email">{{currentAccount.email}}</span>
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

      </div>
      <q-list no-border link inset-delimiter>
        <q-item @click.native="$router.push('/admin')">
          <q-item-side icon="dashboard" />
          <q-item-main label="Dashboard" />
        </q-item>
        <q-item @click.native="$router.push({name:'users'})">
          <q-item-side icon="group" />
          <q-item-main label="Usuários" />
        </q-item>
        <q-item @click.native="$router.push({name:'pessoas'})">
          <q-item-side icon="group" />
          <q-item-main label="Pessoas" />
        </q-item>
        <q-item @click.native="$router.push({name:'areas'})">
          <q-item-side icon="place" />
          <q-item-main label="Áreas" />
        </q-item>
        <!--<q-item @click.native="$router.push({name:'notas-fiscais'})">
          <q-item-side icon="receipt" />
          <q-item-main label="Notas Fiscais" />
        </q-item>-->
        <q-item @click.native="$router.push({name:'safras'})">
          <q-item-side><i class="fab fa-pagelines q-headline"></i></q-item-side>
          <q-item-main label="Safras" />
        </q-item>
        <q-item @click.native="$router.push({name:'culturas'})">
          <q-item-side><i class="fab fa-pagelines q-headline"></i></q-item-side>
          <q-item-main label="Cultivares" />
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

  .q-layout-drawer{
    background: #fcfcfc;
  }
  .layout-drawer .q-list-link .q-item:hover{
    background: rgba(217, 217, 217, 0.3);
  }

</style>

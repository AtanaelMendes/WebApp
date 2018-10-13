<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header></q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen">
      <div class="navigation-header">
        <img src="assets/person-profile-image.jpg" class="profile-image shadow-1"/>
        <span class="profile-name">{{currentAccount.name}}</span>
        <span class="profile-email">{{currentAccount.email}}</span>
        <q-btn flat round dense icon="settings" class="settings_icon" v-on:click="getAccountInfo" />
      </div>
      <q-list no-border link inset-delimiter>
        <q-item @click.native="$router.push('/admin')">
          <q-item-side icon="dashboard" />
          <q-item-main label="Dashboard" />
        </q-item>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="group" />
          <q-item-main label="Usuários" />
        </q-item>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="group" />
          <q-item-main label="Pessoas" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

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
  created(){
    this.getAccountInfo();
  },
  methods: {
    openURL,
    getAccountInfo: function(){
      this.$axios.get( 'account/info').then( response => {
        this.currentAccount.name = 'Fulano da Silva';
        this.currentAccount.email = response.data.email;
      })
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
    height: auto;
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
</style>

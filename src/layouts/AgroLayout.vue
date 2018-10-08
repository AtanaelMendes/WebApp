<template>
  <q-layout view="lHr LpR lFr">
    <q-layout-header v-model="header" :reveal="headerReveal">
      <q-toolbar color="secondary">

        <!-- left drawer -->
        <slot name="leftDrawerBtn">
          <q-btn flat round dense icon="menu" @click="leftSide = !leftSide" v-if="leftDrawer"/>
        </slot>

        <!-- left buttons -->
        <slot name="leftBtn"></slot>

        <q-btn icon="arrow_back" flat round class="within-iframe-hide" v-if="backPath" @click="$router.replace(backPath)"/>

        <q-toolbar-title><slot name="title"></slot></q-toolbar-title>

        <!-- search field -->
        <slot name="searchField"></slot>&nbsp

        <!-- right buttons -->
        <slot name="rightBtn"></slot>

        <!-- right drawer -->
        <slot name="rightDrawerBtn">
          <q-btn flat round dense icon="menu" @click="rightSide = !rightSide" v-if="rightDrawer"/>
        </slot>
      </q-toolbar>

      <slot name="tabHeader"></slot>

    </q-layout-header>

    <!-- Left Side Panel -->
    <q-layout-drawer :width="drawerWidth" v-if="leftDrawer" side="left" v-model="leftSide" behavior="default" >
      <slot name="leftDrawer"></slot>
    </q-layout-drawer>

    <!-- Right Side Panel -->
    <q-layout-drawer :width="drawerWidth" v-if="rightDrawer" side="right" v-model="rightSide" behavior="default">
      <slot name="rightDrawer"></slot>
    </q-layout-drawer>

    <q-page-container>
      <slot name="content">
        <router-view />
      </slot>
    </q-page-container>

  </q-layout>
</template>

<script>

import router from '../router'

  export default {
    name: 'agrolayout',
    data () {
      return {
        token_id: null,
        view: '',
        header: true,
        headerReveal: true,

        footer: true,
        footerReveal: false,

        hideTabs: true,

        leftSide: true,
        rightSide: true,

        drawerWidth: 250,

        bottomcenter: 'F',
        bottomright: 'f',
        scrolling: true,

      }
    },
    components: {
    },
    computed: {
      perfil: {
        get () {
          return this.$store.state.perfil.perfilState
        }
      }
    },
    props: {
      navigation: {
        type: Boolean,
        default: false
      },
      rightDrawer: {
        type: Boolean,
        default: false
      },
      leftDrawer: {
        type: Boolean,
        default: false
      },
      backPath: {
        type: String,
        default: null
      }
    },
    methods: {
    }
  }
</script>

<style>
  .chip-container {
    min-height: 100px ;
  }
  .chip-inline {
    display: inline;
    padding: unset;
  }
  .chip-container-error{
    border-color: red;
  }
</style>

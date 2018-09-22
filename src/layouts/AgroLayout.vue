<template>
  <q-layout :view="view">
    <q-layout-header v-model="header" :reveal="headerReveal">
      <q-toolbar color="secondary">
        <slot name="menu">
          <q-btn flat round dense icon="menu" @click="left = !left" v-if="drawer"/>
        </slot>

        <q-toolbar-title>
          <slot name="title"></slot>
        </q-toolbar-title>

        <q-btn flat round class="within-iframe-hide" v-if="backPath" @click="$router.replace(backPath)" style="margin-right: 15px">
          <q-icon name="arrow_back" />
        </q-btn>

        <slot name="menuRight">
          <q-btn flat round dense icon="apps" @click="rightSide = !rightSide" />
        </slot>
      </q-toolbar>

      <slot name="tabHeader">
      </slot>

    </q-layout-header>

    <!-- <q-layout-footer v-model="footer" :reveal="footerReveal">
      <q-toolbar>
        <slot name="footer">
          <q-toolbar-title>
            © AgroProject
          </q-toolbar-title>
        </slot>
      </q-toolbar>
    </q-layout-footer> -->

    <!-- Left Side Panel -->
    <q-layout-drawer v-if="drawer" side="left" v-model="left" :overlay="leftOverlay" :behavior="leftBehavior" :breakpoint="leftBreakpoint">
      <slot name="drawer"></slot>
    </q-layout-drawer>

    <!-- Right Side Panel -->
    <q-layout-drawer v-model="rightSide" side="right" behavior="mobile">
      <q-list inset-separator>

        <q-item>
          <q-item-side link to="/inbox/1">
          </q-item-side>
          <q-item-main @click.native="$router.push('/usuario/perfil')" style="cursor:pointer">
            {{ perfil.usuario }}
          </q-item-main>
          <q-item-side right>
            <q-item-tile link icon="exit_to_app"@click.native="logout" style="cursor:pointer"/>
          </q-item-side>
        </q-item>

      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <slot name="content">
        <router-view />
      </slot>
    </q-page-container>

    <!-- <q-toolbar>
      <q-toolbar-title>
        <slot name="footer">
          &copy; MG Papelaria
        </slot>
      </q-toolbar-title>
    </q-toolbar> -->

    <!-- Footer -->
    <!--
    <q-toolbar>
    <q-toolbar-title>
    &copy; MG Papelaria
  </q-toolbar-title>
</q-toolbar>
-->

  </q-layout>
</template>

<script>

import router from '../router'

  export default {
    name: 'agro-layout',
    data () {
      return {
        token_id: null,
        view: 'lHr LpR lFr',
        header: true,
        headerReveal: true,

        footer: true,
        footerReveal: false,

        left: true,
        leftOverlay: false,
        leftBreakpoint: 996,
        leftBehavior: 'default',

        leftScroll: false,
        rightScroll: true,
        rightBreakpoint: 2000,
        hideTabs: true,
        leftSide: false,
        rightSide: false,

        // bottomcenter: 'F',
        // bottomright: 'f',
        scrolling: true
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
      drawer: {
        type: Boolean,
        default: false
      },
      backPath: {
        type: String,
        default: null
      }
    },
    methods: {

      logout () {
        var vm = this

        vm.$q.dialog({
          title: 'Sair do sistema',
          message: 'Tem certeza que deseja sair?',
          ok: 'Sair',
          cancel: 'Cancelar'
        }).then(() => {

          console.log('pegando o token_id')

          vm.$axios.get('oauth/personal-access-tokens').then(response => {
            vm.token_id = response.data[0].id

          }).then(function (){

            console.log('deletando o token')

            vm.$axios.delete('oauth/personal-access-tokens/' + vm.token_id).then(response => {

              if (response.status === 200){
                localStorage.removeItem('auth.token')
                localStorage.removeItem('auth.refresh_token')

                router.push('/login')

                vm.$q.notify({
                  message: 'Até mais...',
                  type: 'positive',
                })

              }
            })
          })
        })
      }

    }
  }
</script>

<style>
</style>

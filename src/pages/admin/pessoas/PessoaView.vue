<template>
  <custom-page isChild noScroll style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">

      <template slot="action_itens" v-if="pessoa">
        <q-btn flat round dense icon="edit" @click.native="editUser(pessoa.id)"/>
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item dense @click.native="disablePessoa(pessoa.id)" v-if="!pessoa.deleted_at">
                <q-item-main label="Inativar pessoa"  />
              </q-item>
              <q-item dense @click.native="enablePessoa(pessoa.id)" v-if="pessoa.deleted_at">
                <q-item-main label="Ativar pessoa"  />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>

      <q-tabs slot="tabs" v-model="selectedTab" align="justify"  class="shadow-3" color="brand" text-color="brand" underline-color="deep-orange">
        <q-tab slot="title" name="tab-info" label="Informações" />
        <q-tab slot="title" name="tab-contatos" label="Contatos"></q-tab>
        <q-tab slot="title" name="tab-localizacoes" label="Localizações"/>
      </q-tabs>

    </toolbar>
    <swipe ref="mySwiper" class="my-swipe" :continuous="false" :auto="0" :showIndicators="false" :disabled="true">
      <swipe-item>
        <informacoes></informacoes>
      </swipe-item>

      <swipe-item>
        <contatoList></contatoList>
      </swipe-item>

      <swipe-item>
        <localizacaoList></localizacaoList>
      </swipe-item>

    </swipe>
    <transition
      appear
      slot="fab-container"
      enter-active-class="animated slideInUp faster"
      leave-active-class="animated slideOutDown faster">
      <q-btn key="contatos" v-if="isFabVisible" @click="addContato" round color="deep-orange" icon="add" size="20px"/>
    </transition>

  </custom-page>
</template>

<script>
  require('vue-swipe/dist/vue-swipe.css');
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import PessoaService from 'assets/js/service/PessoaService'
  import contatoList from 'pages/admin/pessoas/tabs/ContatoList'
  import localizacaoList from 'pages/admin/pessoas/tabs/LocalizacaoList'
  import informacoes from 'pages/admin/pessoas/tabs/Informacoes'
  import { Swipe, SwipeItem } from 'vue-swipe';
  export default {
    name: "PessoaView",
    components: {
      toolbar,
      customPage,
      informacoes,
      localizacaoList,
      contatoList,
      Swipe,
      SwipeItem
    },
    watch: {
      '$route' (to, from) {
        this.selectedTab ='tab-info';
      },
      selectedTab: function (value) {
        let index;
        switch (value) {
          case 'tab-info':
            index = 0;
            break;
          case 'tab-contatos':
            index = 1;
            break;
          case 'tab-localizacoes':
            index = 2;
            break;
        }
        this.$refs.mySwiper.goto(index)
      }
    },
    data(){
      return{
        pessoa: null,
        selectedTab: 'tab-info',
      }
    },
    computed: {
      isFabVisible: function () {
        return this.selectedTab === 'tab-contatos' || this.selectedTab === 'tab-localizacoes';
      }
    },
    methods: {
      addContato: function(){
        this.$router.push({name:'add_contact'});
      },
      backAction: function () {
        //this.$router.go(-1);
        this.$router.push({name:'pessoas'})
      }
    }
  }
</script>

<style>
  .label{
    color: #005f5f;
    font-size: 14px;
    text-transform: uppercase;
  }
  .text-brand {
    color: #909090 !important;
  }
  .bg-brand {
    background: #fcfcfc !important;
  }
  .q-tabs{
    border-radius: unset;
  }
  .shadow-3{
    box-shadow: 0 1px 8px rgba(0,0,0,0.05), 0 3px 4px rgba(0,0,0,0.04), 0 3px 3px -2px rgba(0,0,0,0.03);
  }

  .animated.faster {
    -webkit-animation-duration: 200ms !important;
    animation-duration: 200ms !important;
  }

  .my-swipe {
    height: 100%;
  }
</style>

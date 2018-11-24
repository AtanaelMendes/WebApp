<template>
  <custom-page isChild noScroll style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">

      <!--<template slot="action_itens" v-if="pessoaData">-->
        <!--<q-btn flat round dense icon="edit" @click.native="editUser(pessoaData.id)"/>-->
        <!--<q-btn flat round dense icon="more_vert" >-->
          <!--<q-popover anchor="bottom left">-->
            <!--<q-list link>-->
              <!--<q-item dense @click.native="disablePessoa(pessoaData.id)" v-if="!pessoaData.deleted_at">-->
                <!--<q-item-main label="Inativar pessoaData"  />-->
              <!--</q-item>-->
              <!--<q-item dense @click.native="enablePessoa(pessoaData.id)" v-if="pessoaData.deleted_at">-->
                <!--<q-item-main label="Ativar pessoa"  />-->
              <!--</q-item>-->
            <!--</q-list>-->
          <!--</q-popover>-->
        <!--</q-btn>-->
      <!--</template>-->

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
      v-if="isFabVisible"
      slot="fab-container"
      enter-active-class="animated zoomIn faster"
      leave-active-class="animated zoomOut faster">
      <q-btn
      icon="add"
      size="20px"
      key="contatos"
      @click="addContato"
      round color="deep-orange"
      v-if="selectedTab == 'tab-contatos' "
      />
      <q-btn
        icon="add"
        size="20px"
        key="localizacoes"
        @click="addLocalizacao"
        round color="deep-orange"
        v-if="selectedTab == 'tab-localizacoes' "
      />
      <q-btn
        icon="edit"
        size="20px"
        key="informacoes"
        @click="editPessoa"
        round color="deep-orange"
        v-if="selectedTab == 'tab-info' "
      />
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
    name: "pessoa-view",
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
        selectedTab: 'tab-info',
      }
    },
    computed: {
      isFabVisible: function () {
        return this.selectedTab === 'tab-contatos' || this.selectedTab === 'tab-localizacoes' || this.selectedTab === 'tab-info';
      }
    },
    methods: {
      editPessoa: function(){
        this.$router.push({name:'edit_pessoa'});
      },
      addContato: function(){
        this.$router.push({name:'add_contact'});
      },
      addLocalizacao: function(){
        this.$router.push({name:'add_localizacao'});
      },
      backAction: function () {
        //this.$router.go(-1);
        this.$router.push({name:'pessoas'})
      }
    }
  }
</script>

<style>
  .my-swipe {
    height: 100%;
  }
</style>

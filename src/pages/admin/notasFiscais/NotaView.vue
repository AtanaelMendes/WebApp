<template>
  <custom-page isChild noScroll style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">

      <template slot="action_itens" v-if="pessoa">
        <!--<q-btn flat round dense icon="edit" @click.native="editUser(pessoa.id)"/>-->
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item dense @click.native="danfeGenerate(notaFiscal.id)">
                <q-item-main label="Danfe" class="text-primary" />
              </q-item>
              <q-item dense @click.native="emailDanfe(notaFiscal.id)">
                <q-item-main label="Email" class="text-primary" />
              </q-item>
              <q-item dense @click.native="cancelarNotaFiscal(notaFiscal.id)">
                <q-item-main label="Cancelar" class="text-negative" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>

      <q-tabs slot="tabs" v-model="selectedTab" align="justify"  class="shadow-3" color="brand" text-color="brand" underline-color="deep-orange">
        <q-tab slot="title" name="tab-info" label="Informações" />
        <q-tab slot="title" name="tab-produtos" label="Produtos" />
        <q-tab slot="title" name="tab-complemento" label="Complemento"/>
      </q-tabs>

    </toolbar>
    <swipe ref="mySwiper" class="my-swipe" :continuous="false" :auto="0" :showIndicators="false" :disabled="true">
      <swipe-item >
        <informacao></informacao>
      </swipe-item>

      <swipe-item>
        <produtos></produtos>
      </swipe-item>

      <swipe-item>
        <complementos></complementos>
      </swipe-item>

    </swipe>
  </custom-page>
</template>

<script>
  require('vue-swipe/dist/vue-swipe.css');
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import NotaFiscalService from 'assets/js/service/NotaFiscalService'
  import informacao from 'pages/admin/notasFiscais/tabs/Informacao'
  import produtos from 'pages/admin/notasFiscais/tabs/Products'
  import complementos from 'pages/admin/notasFiscais/tabs/Complementos'
  import { Swipe, SwipeItem } from 'vue-swipe';
  export default {
    name: "nota-View",
    components: {
      toolbar,
      customPage,
      informacao,
      produtos,
      complementos,
      Swipe,
      SwipeItem
    },
    watch: {
      '$route' (to, from) {
        this.getPessoa();
        this.selectedTab ='tab-info';
      },
      selectedTab: function (value) {
        let index;
        switch (value) {
          case 'tab-info':
            index = 0;
            break;
          case 'tab-produtos':
            index = 1;
            break;
          case 'tab-complemento':
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
    methods: {
      /*getNotaById: function(){
        NotaFiscalService.getNotaById(this.$route.params.id).then(produtos => {
          this.produtos = produtos;
        })
      },*/
      backAction: function () {
        this.$router.back()
      }
    },
    mounted(){
      // this.getNotaById();
    }
  }
</script>

<style>
  .label{
    color: #005f5f;
    font-size: 14px;
    text-transform: uppercase;
  }
  .field{
    font-size: 18px;
    font-weight: 400;
    margin-top: 6px;
    margin-bottom: 0px;
    color: #333333;
  }
  .item{
    margin-bottom: 26px;
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

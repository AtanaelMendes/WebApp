<template>
  <custom-page isParent v-if="safraCultura" >

    <toolbar slot="toolbar" :title="safraCultura.cultura.nome + ' ' + safraCultura.safra.ano_inicio + '/' + safraCultura.safra.ano_fim"
             navigation_type="back" @navigation_clicked="backAction" >

      <template slot="action_itens" >
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item v-close-overlay @click.native="editSafraCultura(safraCultura.id)">
                <q-item-main label="Editar Cultura"/>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>

      <div slot="tabs">
        <q-tabs v-model="currentTab">
          <q-route-tab slot="title" to="resumo" replace name="tab-resumo" label="resumo" default />
          <q-route-tab slot="title" to="areas" replace name="tab-areas" label="areas" />
          <q-route-tab slot="title" to="cultivares" replace name="tab-cultivares" label="cultivares" />
        </q-tabs>
      </div>
    </toolbar>

    <!-- RESUMO -->
    <resumo-tab ref="resumoTab" :visible="currentTab === 'tab-resumo'" :safra-cultura="safraCultura"/>
    <!-- AREAS -->
    <areas-tab ref="areasTab" :visible="currentTab === 'tab-areas'" :safra-cultura="safraCultura"/>
    <!-- CULTIVARES -->
    <cultivares-tab ref="cultivaresTab" :visible="currentTab === 'tab-cultivares'" :safra-cultura="safraCultura"/>


    <edit-cultura-modal ref="editCulturaModal" />
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import apImage from 'components/ApImage'
  import areasTab from './components/tabs/AreasTab.vue'
  import resumoTab from './components/tabs/ResumoTab.vue'
  import cultivaresTab from './components/tabs/CultivaresTab.vue'
  import SafraCulturaService from "../../../assets/js/service/safra/SafraCulturaService";
  import editCulturaModal from './components/modals/EditCulturaModal'

  export default {
    name: "safra-cultura",
    components: {
      toolbar,
      customPage,
      customInputText,
      apImage,
      areasTab,
      resumoTab,
      cultivaresTab,
      editCulturaModal,
    },
    data () {
      return {
        safraCulturaService: new SafraCulturaService(),
        safraCultura: null,
        currentTab: null,
      }
    },
    methods: {
      async getSafraCultura(){
        this.$q.loading.show();
        return this.safraCulturaService.getSafraCultura(this.$route.params.safra_id, this.$route.params.id).then(safraCultura => {
          this.safraCultura = safraCultura;
          this.$q.loading.hide();
        })
      },
      editSafraCultura(){
        this.$refs.editCulturaModal.openModal(this.safraCultura);
      },
      updateView(resetIndexes = true, removeQueryString = false){
        /*if(removeQueryString){
          let query = Object.assign({}, this.$route.query);
          delete query.id;
          this.$router.replace({ query });
        }*/
        this.getSafraCultura().then(()=>{
          /*this.$refs.resumoTab.init(this.safraCultura);
          this.$refs.areasTab.init(this.safraCultura, resetIndexes);
          this.$refs.cultivaresTab.init(this.safraCultura);*/
        })
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted () {
      this.$root.$on('refreshSafrasCulura', this.updateView);
      this.getSafraCultura();
    },
    destroyed() {
      this.$root.$off('refreshSafrasCulura', this.updateView);
    }
  }
</script>
<style>
  .carousel-caption {
    text-align: left;
    padding: 12px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
  }
</style>

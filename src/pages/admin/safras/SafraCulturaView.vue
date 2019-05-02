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
          <q-route-tab slot="title" to="resumo" replace name="tab-resumo" label="resumo" default @select="resumoTabSelected" />
          <q-route-tab slot="title" to="areas" replace name="tab-areas" label="areas" @select="areasTabSelected" />
          <q-route-tab slot="title" to="cultivares" replace name="tab-cultivares" label="cultivares" @select="cultivaresTabSelected" />
        </q-tabs>
      </div>
    </toolbar>

    <!-- RESUMO -->
    <resumo-tab ref="resumoTab" v-if="currentTab === 'tab-resumo'" :safra-cultura="safraCultura" />
    <!-- AREAS -->
    <areas-tab ref="areasTab" v-if="currentTab === 'tab-areas'" :safra-cultura="safraCultura" :areas="areas" :talhoes="talhoes" />
    <!-- CULTIVARES -->
    <cultivares-tab ref="cultivaresTab" v-if="currentTab === 'tab-cultivares'" :safra-cultura="safraCultura" :marcas="marcas" :cultivares="cultivares"/>


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
        areas: null,
        talhoes: null,
        marcas: null,
        cultivares: null,
      }
    },
    methods: {
      resumoTabSelected(){
        this.$refs.resumoTab.onTabSelected();
      },
      areasTabSelected(){
        this.$refs.areasTab.onTabSelected();
      },
      cultivaresTabSelected(){
        this.$refs.cultivaresTab.onTabSelected();
      },
      async getSafraCultura(){
        this.$q.loading.show();
        return this.safraCulturaService.getSafraCultura(this.$route.params.safra_id, this.$route.params.id).then(safraCultura => {
          this.safraCultura = safraCultura;
          return Promise.all([
            this.getAreas(),
            this.getTalhoes(),
            this.getMarcas(),
            this.getCultivares(),
          ]).then(()=>{
            this.$q.loading.hide();

            if(this.$refs.resumoTab){
              this.$refs.resumoTab.onDataLoaded();
            }
            if(this.$refs.areasTab) {
              this.$refs.areasTab.onDataLoaded();
            }
            if(this.$refs.cultivaresTab) {
              this.$refs.cultivaresTab.onDataLoaded();
            }
          });

        })
      },
      editSafraCultura(){
        this.$refs.editCulturaModal.openModal(this.safraCultura);
      },
      async getAreas(){
        return this.safraCulturaService.getAreas(this.safraCultura.safra.id, this.safraCultura.id).then(areas => {
          this.areas = areas.areas;
        })
      },
      async getTalhoes(){
        return this.safraCulturaService.getTalhoes(this.safraCultura.safra.id, this.safraCultura.id).then(talhoes => {
          this.talhoes = talhoes.talhoes;
        })
      },
      async getMarcas(){
        return this.safraCulturaService.getMarcas(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.marcas = response.marcas;
        })
      },
      async getCultivares(){
        return this.safraCulturaService.getCultivares(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.cultivares = response.cultivares;
        })
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted () {
      this.$root.$on('refreshSafrasCulura', this.getSafraCultura);
      this.getSafraCultura();
    },
    destroyed() {
      this.$root.$off('refreshSafrasCulura', this.getSafraCultura);
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

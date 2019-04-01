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
          <q-tab slot="title" name="tab-resumo" label="resumo" default @select="selectTabResumo()"/>
          <q-tab slot="title" name="tab-areas" label="areas" @select="selectTabAreas()"/>
          <q-tab slot="title" name="tab-cultivares" label="cultivares" @select="selectTabCultivares()"/>
        </q-tabs>
      </div>
    </toolbar>

    <!-- RESUMO -->
    <resumo-tab ref="resumoTab" :visible="currentTab === 'tab-resumo'"/>
    <!-- AREAS -->
    <areas-tab ref="areasTab" :visible="currentTab === 'tab-areas'"/>
    <!-- CULTIVARES -->
    <cultivares-tab ref="cultivaresTab" :visible="currentTab === 'tab-cultivares'" />


    <edit-cultura-modal ref="editCulturaModal" />
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import apImage from 'components/ApImage'
  import areasTab from 'components/safra/AreasTab.vue'
  import resumoTab from 'components/safra/ResumoTab.vue'
  import cultivaresTab from 'components/safra/CultivaresTab.vue'
  import SafraCulturaService from "../../../../assets/js/service/safra/SafraCulturaService";
  import editCulturaModal from 'components/safra/EditCulturaModal'

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
      selectTabResumo(){
        this.$refs.resumoTab.init(this.safraCultura)
      },
      selectTabAreas() {
        this.$refs.areasTab.init(this.safraCultura)
      },
      selectTabCultivares() {
        this.$refs.cultivaresTab.init(this.safraCultura)
      },
      async getSafraCultura(){
        return new Promise((resolve, reject) => {
          this.$q.loading.show();
          this.safraCulturaService.getSafraCultura(this.safra_id, this.id).then(safraCultura => {
            this.safraCultura = safraCultura;
            this.$q.loading.hide();
            return resolve()
          })
        });
      },
      editSafraCultura(){
        this.$refs.editCulturaModal.openModal(this.safraCultura);
      },
      updateView(){
        this.getSafraCultura().then(()=>{
          this.$refs.resumoTab.init(this.safraCultura);
          this.$refs.areasTab.init(this.safraCultura);
          this.$refs.cultivaresTab.init(this.safraCultura);
        })

      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted () {
      this.id = this.$route.params.id;
      this.safra_id = this.$route.params.safra_id;
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

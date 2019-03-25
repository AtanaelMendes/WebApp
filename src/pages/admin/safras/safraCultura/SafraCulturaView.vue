<template>
  <custom-page isParent >

    <toolbar slot="toolbar" :title="data.cultura.nome + ' ' + data.safra.ano_inicio + '/' + data.safra.ano_fim"
             navigation_type="back" @navigation_clicked="backAction" >
      <div slot="tabs">
        <q-tabs v-model="currentTab">
          <q-tab slot="title" name="tab-resumo" label="resumo" default @select="selectTabResumo()"/>
          <q-tab slot="title" name="tab-areas" label="areas" @select="selectTabAreas()"/>
          <q-tab slot="title" name="tab-cultivares" label="cultivares" @select="selectTabCultivares()"/>
          <!-- <q-tab slot="title" name="tab-negocios" label="negocios"/> -->
        </q-tabs>
      </div>
    </toolbar>

    <!-- RESUMO -->
    <resumo-tab ref="resumoTab" :visible="currentTab === 'tab-resumo'"/>
    <!-- AREAS -->
    <areas-tab ref="areasTab" :visible="currentTab === 'tab-areas'"/>
    <!-- CULTIVARES -->
    <cultivares-tab ref="cultivaresTab" :visible="currentTab === 'tab-cultivares'" />
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
    },
    data () {
      return {
        safraCulturaService: new SafraCulturaService(),
        data: null,
        currentTab: null,
      }
    },
    methods: {
      selectTabResumo(){
        this.$refs.resumoTab.init(this.safra_id, this.id, this.data)
      },
      selectTabAreas: function () {
        this.$refs.areasTab.init(this.safra_id, this.id, this.data)
      },
      selectTabCultivares: function () {
        this.$refs.cultivaresTab.init(this.safra_id, this.id, this.data)
      },
      getSafraCultura: function(force = false){
        this.$q.loading.show();
        this.safraCulturaService.getSafraCultura(this.safra_id, this.id).then(safraCultura => {
          this.data = safraCultura;
          this.$q.loading.hide();
        })
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted () {
      this.id = this.$route.params.id;
      this.safra_id = this.$route.params.safra_id;
      this.getSafraCultura();
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

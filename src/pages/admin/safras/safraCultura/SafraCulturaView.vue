<template>
  <custom-page isParent v-if="safraCultura">

    <toolbar slot="toolbar" :title="safraCultura.cultura.nome + ' ' + safraCultura.safra.ano_inicio + '/' + safraCultura.safra.ano_fim" navigation_type="back" @navigation_clicked="backAction" >
      <div slot="tabs">
        <q-tabs v-model="activeTab">
          <q-tab slot="title" name="tab-resumo" label="resumo" />
          <q-tab slot="title" name="tab-areas" label="areas" default @select="ativarPrimeiraArea()"/>
          <q-tab slot="title" name="tab-cultivares" label="cultivares"/>
          <q-tab slot="title" name="tab-negocios" label="negocios"/>
        </q-tabs>
      </div>
    </toolbar>


    <!-- RESUMO -->
    <div class="row space-end" v-if="activeTab === 'tab-resumo'">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <q-card-media overlay-position="top" style="max-height: 40vh">
          <ap-image size="800x500" :file-name="safraCultura.cultura.image_file_name"/>
          <q-card-title slot="overlay">
              {{safraCultura.cultura.nome}} {{safraCultura.safra.ano_inicio}}/{{safraCultura.safra.ano_fim}}
            <span slot="subtitle">
              {{numeral(safraCultura.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}
            </span>
          </q-card-title>
        </q-card-media>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8">
        <safra-quantidades v-if="loaded"
          :tamanho="safraCultura.tamanho"
          :estimativa_total="safraCultura.estimativa_total"
          :peso_liquido="safraCultura.peso_liquido"
          :peso_desconto="safraCultura.peso_desconto"
          :estimativa_carga="safraCultura.estimativa_carga"
          :cargas="safraCultura.cargas"
          :finalizado="safraCultura.finalizado"
          :view_unidade_area="safraCultura.view_unidade_area"
          :view_unidade_medida="safraCultura.view_unidade_medida"
        />
      </div>

      <!-- GRAFICOS -->
      <div class="col-12 q-pa-md">
        <q-tabs class="shadow-4"  swipeable inverted align="justify">
          <q-tab slot="title" name="tab-diaria" label="" icon="mdi-calendar" default/>
          <q-tab slot="title" name="tab-classificacao" label="" icon="mdi-ruler" />
          <q-tab slot="title" name="tab-caminhao" label="" icon="mdi-truck" />
          <q-tab slot="title" name="tab-armazem" label="" icon="place"/>

          <q-tab-pane name="tab-armazem" keep-alive>
            Entrega Por Armazém
            <grafico-entrega-armazem :safra-id="safraId" :safra-cultura-id="safraCulturaId" :height="300" :width="100"/>
          </q-tab-pane>
          <q-tab-pane name="tab-caminhao" keep-alive>
            Entrega Por Caminhão
            <grafico-entrega-caminhao :safra-id="safraId" :safra-cultura-id="safraCulturaId" :height="300" :width="100"/>
          </q-tab-pane>
          <q-tab-pane name="tab-diaria" keep-alive>
            Colheita Diária
            <grafico-colheita-diaria :safra-id="safraId" :safra-cultura-id="safraCulturaId" :height="300" :width="100"/>
          </q-tab-pane>
          <q-tab-pane name="tab-classificacao" keep-alive>
            Classificação Diária
            <grafico-classificacao-diaria :safra-id="safraId" :safra-cultura-id="safraCulturaId" :height="300" :width="100"/>
          </q-tab-pane>
        </q-tabs>
      </div>

    </div>

    <!-- AREAS -->
    <div class="row space-end" v-if="activeTab === 'tab-areas'">
      <div class="col-12">
        <q-carousel arrows quick-nav v-model="activeArea">
          <q-carousel-slide v-for="area in areasPorId" :key="area.id">
            <q-card-media overlay-position="top" style="max-height: 40vh">
              <ap-image size="800x500" :file-name="area.image_file_name"/>
              <q-card-title slot="overlay">
                  {{area.nome}}
                <span slot="subtitle">
                  {{numeral(area.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}
                </span>
              </q-card-title>
            </q-card-media>

          </q-carousel-slide>
        </q-carousel>

        <template v-if="this.area">
          <safra-quantidades v-if="loaded"
            :tamanho="area.tamanho"
            :estimativa_total="area.estimativa_total"
            :peso_liquido="area.peso_liquido"
            :peso_desconto="area.peso_desconto"
            :estimativa_carga="area.estimativa_carga"
            :cargas="area.cargas"
            :finalizado="area.finalizado"
            :view_unidade_area="safraCultura.view_unidade_area"
            :view_unidade_medida="safraCultura.view_unidade_medida"
          />

          <q-carousel arrows quick-nav v-model="activeTalhao">
            <q-carousel-slide v-for="talhao in area.talhoes" :key="talhao.id">
              <q-card-media overlay-position="top" style="max-height: 40vh">
                <ap-image size="800x500" :file-name="talhao.image_file_name"/>
                <q-card-title slot="overlay">
                    {{talhao.nome}}
                  <span slot="subtitle">
                    {{numeral(talhao.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}
                  </span>
                </q-card-title>
              </q-card-media>
            </q-carousel-slide>
          </q-carousel>

          <template v-if="this.talhao">
            <safra-quantidades v-if="loaded"
              :tamanho="talhao.tamanho"
              :estimativa_total="talhao.estimativa_total"
              :peso_liquido="talhao.peso_liquido"
              :peso_desconto="talhao.peso_desconto"
              :estimativa_carga="talhao.estimativa_carga"
              :cargas="talhao.cargas"
              :finalizado="talhao.finalizado"
              :view_unidade_area="safraCultura.view_unidade_area"
              :view_unidade_medida="safraCultura.view_unidade_medida"
            />

          </template>
        </template>

      </div>
    </div>



  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import apImage from 'components/ApImage'

  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import SafraCulturaTalhaoEdit from 'assets/js/model/safra/SafraCulturaTalhaoEdit'

  // import graficoClassificacaoMediaArmazem from 'components/graficos/GraficoClassificacaoMediaArmazem.vue'
  // import graficoQuantidadeEntregaArmazems from 'components/graficos/GraficoQuantidadeEntregaArmazems.vue'

  // import graficoColheitaPorArea from 'components/safra/graficos/GraficoColheitaPorArea.vue'
  // import graficoColheitaPorTalhao from 'components/safra/graficos/GraficoColheitaPorTalhao.vue'
  // import graficoColheitaPorCultivar from 'components/safra/graficos/GraficoColheitaPorCultivar.vue'

  import graficoEntregaArmazem from 'components/safra/graficos/GraficoEntregaArmazem.vue'
  import graficoEntregaCaminhao from 'components/safra/graficos/GraficoEntregaCaminhao.vue'
  import graficoColheitaDiaria from 'components/safra/graficos/GraficoColheitaDiaria.vue'
  import graficoClassificacaoDiaria from 'components/safra/graficos/GraficoClassificacaoDiaria.vue'

  import safraQuantidades from 'components/safra/Quantidades.vue'
  import AgroUtils from 'assets/js/AgroUtils'

  export default {
    name: "safra-cultura",
    components: {
      toolbar,
      customPage,
      customInputText,
      apImage,
      // graficoClassificacaoMediaArmazem,
      // graficoQuantidadeEntregaArmazems,

      // graficoColheitaPorArea,
      // graficoColheitaPorTalhao,
      // graficoColheitaPorCultivar,

      graficoClassificacaoDiaria,
      graficoColheitaDiaria,
      graficoEntregaArmazem,
      graficoEntregaCaminhao,

      safraQuantidades,
    },
    data () {
      return {
        activeTab: null,
        activeArea: null,
        activeTalhao: null,
        graficoPorMedia: true,
        currentStep: 'marca',
        marcas: [],
        cultivares: [],
        selectedMarcaId: null,
        selectedCultivarId: null,
        selecteTipoId: null,
        loaded: false,
        safraCultura: null,
        safraCulturaTalhao: new SafraCulturaTalhaoEdit(),
        progressBuffer: 100,
        selectedSafraCulturaTalhao: null,
        modalEditSafraCulturaTalhao: false,
        modalAddCultivarInfo: false,
      }
    },
    computed: {
      safraId: function () {
        return this.$route.params.safra_id
      },
      safraCulturaId: function () {
        return this.$route.params.id
      },
      areasPorId: function () {
        return _.orderBy(this.safraCultura.areas, 'id')
      },
      area: function() {
        return this.areasPorId[this.activeArea]
      },
      talhao: function() {
        return this.area.talhoes[this.activeTalhao]
      },
    },
    methods: {
      imageMakeUrl: function (fileName, size) {
        return AgroUtils.image.makeUrl(this.fileName, this.size)
      },
      ativarPrimeiraArea: function () {
        this.activeArea = 0;
        this.activeTalhao = 0;
      },
      // ADD CULTIVAR
      listMarcas: function(){
        safraCulturaService.listMarcas().then(response => {
          this.marcas = response.data;
          this.loaded = true;
        })
      },
      listCultivar: function(marcaId){
        safraCulturaService.listCultivaresByMarca(this.safraCultura.cultura.id, marcaId).then(response => {
          this.cultivares = response.data;
        })
      },
      addCultivarModal: function(safraCulturaTalhao){
        this.listMarcas();
        this.modalAddCultivarInfo = true;
        this.selectedSafraCulturaTalhao = safraCulturaTalhao;
      },
      chooseMarca: function(id){
        this.selectedMarcaId = id;
        this.listCultivar(id);
        this.goToNextStep();
      },
      chooseCultivar: function(id){
        if(this.selectedCultivarId === id){
          this.selectedCultivarId = null
        }else{
          this.selectedCultivarId = id;
        }
      },
      saveCultivarToSafraCulturaTalhao: function(){
        if(this.selectedCultivarId == null ){
          this.$q.notify({type: 'negative', message: 'Escolha um cultivar para salvar'});
          return
        }
        let safraCulturaTalhaoId = this.selectedSafraCulturaTalhao.talhao.id;
        let cultivarId = this.selectedCultivarId;
        safraCulturaService.saveCultivarToSafraCulturaTalhao(this.$route.params.id, safraCulturaTalhaoId, cultivarId).then(response => {
          if(response.status === 200){
            let talhao = this.safraCultura.cultura_talhoes[this.safraCultura.cultura_talhoes.map(cultura_talhao => cultura_talhao.talhao.id).indexOf(safraCulturaTalhaoId)];
            talhao.cultivar = response.data;
            this.getSafraCultura(this.$route.params.safra_id, this.$route.params.id);
            this.selectedSafraCulturaTalhao = null;
            this.$q.notify({type: 'positive', message: 'Salvo com sucesso.'});
            this.modalAddCultivarInfo = false;
            this.currentStep = 'marca';
            this.marcas = [];
            this.cultivares = [];
            this.selectedMarcaId = null;
            this.selectedCultivarId = null;
            this.selecteTipoId = null;
          }
        })
      },
      goToNextStep(){
        this.$refs.stepper.next()
      },

      // CRUD SAFRA CULTURA TALHAO
      getSafraCultura: function(safra_id, id){
        safraCulturaService.getSafraCultura(safra_id, id).then(response => {
          this.safraCultura = response.data;
          this.loaded = true;
        })
      },
      editSafraCulturaTalhao: function(data){
        this.selectedSafraCulturaTalhao = data;
        this.fillSafraCulturaTalhaoForm(data);
        this.modalEditSafraCulturaTalhao = true;
      },
      fillSafraCulturaTalhaoForm: function(data){
        this.safraCulturaTalhao.estimativa.value = data.estimativa;
        this.safraCulturaTalhao.tamanho.value = data.tamanho;
      },
      updadeSafraCulturatalhao: function(){
        if(!this.safraCulturaTalhao.isValid()){
          return;
        }
        safraCulturaService.updateSafraCulturaTalhao(
          this.$route.params.id,
          this.selectedSafraCulturaTalhao.talhao.id, this.safraCulturaTalhao.getValues()).then(response => {
          if(response.status === 200) {
            this.modalEditSafraCulturaTalhao = false;
            this.$q.notify({type: 'positive', message: 'Atualizdo com sucesso'});
            this.getSafraCultura(this.$route.params.safra_id, this.$route.params.id);
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.request.response})
        });
      },
      deleteSafraCulturaTalhao: function(safraCulturaTalhao){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esse talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          safraCulturaService.deleteSafraCulturaTalhao(this.$route.params.id, safraCulturaTalhao.talhao.id).then(response => {
            //this.getSafraCultura(this.$route.params.safra_id, this.$route.params.id);
            if(response.status === 200){
              let talhaoIndex = this.safraCultura.cultura_talhoes.map(talhao => talhao.id).indexOf(safraCulturaTalhao.talhao.id);
              this.safraCultura.cultura_talhoes.splice(talhaoIndex, 1);

              if(this.safraCultura.cultura_talhoes.length === 0){
                this.$router.push({name: 'safras'});
              }
            }
          });
        }).catch(()=>{});
      },
      checkInputMaxSize: function(newVal, oldVal){
        if(newVal > oldVal.talhao.tamanho){
          this.safraCulturaTalhao.tamanho.value = oldVal.talhao.tamanho
        }
      },
      formatCulturaTalhaoTamanhoLabel: function(culturaTalhao) {
        if (culturaTalhao.tamanho === culturaTalhao.talhao.tamanho) {
          return culturaTalhao.tamanho + ' ' + this.safraCultura.view_unidade_area.plural + ' (100%)'
        } else {
          let porcentagem = Math.round(culturaTalhao.tamanho / culturaTalhao.talhao.tamanho * 100);
          return culturaTalhao.tamanho + ' de ' + culturaTalhao.talhao.tamanho + ' ' + this.safraCultura.view_unidade_area.nome + ' (' + porcentagem + '%)';
        }
      },
      // getSafraCulturaTotalArea: function () {
      //   return this.safraCultura.cultura_talhoes.map(function (culturaTalhao) {
      //     return culturaTalhao.talhao.tamanho;
      //   }).reduce((a, b) => a + b);
      // },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted () {
      this.getSafraCultura(this.$route.params.safra_id, this.$route.params.id);
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
</script>
<style>
  .cultivar-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }
  .cultivar-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }
  .cultivar-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }
</style>

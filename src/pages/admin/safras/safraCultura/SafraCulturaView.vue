<template>
  <custom-page isParent v-if="loaded">

    <toolbar slot="toolbar" :title="data.cultura.nome + ' ' + data.safra.ano_inicio + '/' + data.safra.ano_fim" navigation_type="back" @navigation_clicked="backAction" >
      <div slot="tabs">
        <q-tabs v-model="iTab">
          <q-tab slot="title" name="tab-resumo" label="resumo" />
          <q-tab slot="title" name="tab-areas" label="areas" @select="enterTabAreas()" default/>
          <q-tab slot="title" name="tab-cultivares" label="cultivares"/>
          <q-tab slot="title" name="tab-negocios" label="negocios"/>
        </q-tabs>
      </div>
    </toolbar>


    <!-- RESUMO -->
    <div class="row space-end" v-if="iTab === 'tab-resumo'">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <q-card-media overlay-position="top" style="max-height: 40vh">
          <ap-image size="800x500" :file-name="data.cultura.image_file_name"/>
          <q-card-title slot="overlay">
              {{data.cultura.nome}} {{data.safra.ano_inicio}}/{{data.safra.ano_fim}}
            <span slot="subtitle">
              {{numeral(data.totals.tamanho).format('0,0')}} {{data.view_unidade_area.plural}}
            </span>
          </q-card-title>
        </q-card-media>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8">
        <safra-quantidades
          :quantidades="data.totals"
          :unidade-area="data.view_unidade_area"
          :unidade-medida="data.view_unidade_medida"
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
            <!-- <grafico-entrega-armazem :safra-id="safra_id" :safra-cultura-id="id" :height="300" :width="100"/> -->
          </q-tab-pane>
          <q-tab-pane name="tab-caminhao" keep-alive>
            Entrega Por Caminhão
            <!-- <grafico-entrega-caminhao :safra-id="safra_id" :safra-cultura-id="id" :height="300" :width="100"/> -->
          </q-tab-pane>
          <q-tab-pane name="tab-diaria" keep-alive>
            Colheita Diária
            <!-- <grafico-colheita-diaria :safra-id="safra_id" :safra-cultura-id="id" :height="300" :width="100"/> -->
          </q-tab-pane>
          <q-tab-pane name="tab-classificacao" keep-alive>
            Classificação Diária
            <!-- <grafico-classificacao-diaria :safra-id="safra_id" :safra-cultura-id="id" :height="300" :width="100"/> -->
          </q-tab-pane>
        </q-tabs>
      </div>

    </div>

    <!-- AREAS -->
    <div class="row space-end" v-if="iTab === 'tab-areas' & areasLoaded">
      <div class="col-12 ">
        <div class="row">

          <!-- GRAFICO DAS AREAS -->
          <div class="col-12">
            <div @click="media = !media" class="cursor-pointer q-ma-md">
              <q-toggle v-model="media" color="secondary" />
              <template v-if="media">
                Média
                {{data.view_unidade_medida.sigla}}
                por {{data.view_unidade_area.sigla}}
              </template>
              <template v-else>
                Total de
                {{data.view_unidade_medida.sigla}}
              </template>
            </div>
            <safra-grafico-quantidades-por-area
              :areas="areas"
              :media="media"
              :unidade-medida="data.view_unidade_medida"
              :unidade-area="data.view_unidade_area"
              :height="200"
              :width="100"
              v-model="iArea"
            />
          </div>


          <!-- DETALHE DAS AREAS -->
          <div class="col-12 q-mt-md">
            <div class="row">
              <!-- CARROUSEL DE AREAS -->
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                <q-carousel color="white" arrows quick-nav v-model="iArea" height="250px">
                  <q-carousel-slide v-for="area in areas" :key="area.id" :img-src="imageMakeUrl(area.image_file_name, '800x500')">
                    <div class="absolute-top carousel-caption">
                      <div class="q-card-title">{{area.nome}}</div>
                      <div class="q-card-subtitle text-white">{{numeral(area.tamanho).format('0,0')}} {{data.view_unidade_area.plural}}</div>
                    </div>
                  </q-carousel-slide>
                </q-carousel>
              </div>
              <!-- DETALHES DA AREA -->
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8">
                <safra-quantidades
                  :quantidades="areas[iArea]"
                  :unidade-area="data.view_unidade_area"
                  :unidade-medida="data.view_unidade_medida"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="col-12 q-mt-md space-end" v-if="talhoesLoaded">
        <div class="row">

          <!-- GRAFICO DOS TALHOES -->
          <div class="col-12 q-mt-md">
            <safra-grafico-quantidades-por-talhao
              :talhoes="this.talhoes"
              :areaId="this.activeArea.id"
              :media="media"
              :unidade-medida="data.view_unidade_medida"
              :unidade-area="data.view_unidade_area"
              :height="200"
              :width="100"
              v-model="iTalhao"
            />
          </div>

          <!-- DETALHE DOS TALHOES -->
          <div class="col-12 q-mt-md" >
            <div class="row">
              <!-- CARROUSEL DE TALHOES -->
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                <q-carousel color="white" arrows quick-nav v-model="iTalhao" height="250px">
                  <q-carousel-slide v-for="talhao in talhoesDaArea" :key="talhao.id" :img-src="imageMakeUrl(talhao.image_file_name, '800x500')">
                    <div class="absolute-top carousel-caption">
                      <div class="q-card-title">{{activeArea.nome}} {{talhao.nome}}</div>
                      <div class="q-card-subtitle text-white">{{numeral(talhao.tamanho).format('0,0')}} {{data.view_unidade_area.plural}}</div>
                    </div>
                  </q-carousel-slide>
                </q-carousel>
              </div>
              <!-- DETALHES DO TALHAO -->
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8" v-if="activeTalhao">
                <safra-quantidades
                  :quantidades="activeTalhao"
                  :unidade-area="data.view_unidade_area"
                  :unidade-medida="data.view_unidade_medida"
                >
                  <q-item v-for="cultivar in activeTalhao.cultivares" :key="cultivar.key">
                    <q-item-side icon="spa" color="primary"/>
                    <q-item-side v-if="cultivar.image_file_name">
                      <ap-image size="200x125" :file-name="cultivar.image_file_name" style="max-height: 50px"/>
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile>
                        {{cultivar.marca}}
                        {{cultivar.nome}}
                      </q-item-tile>
                      <q-item-tile sublabel>
                        {{numeral(cultivar.tamanho * 100 / activeTalhao.tamanho).format('0,0.0')}}%
                        ({{numeral(cultivar.tamanho).format('0,0')}} {{data.view_unidade_area.sigla}})
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                </safra-quantidades>
              </div>
            </div>
          </div>

        </div>
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

  // import graficoColheitaPorTalhao from 'components/safra/graficos/GraficoColheitaPorTalhao.vue'
  // import graficoColheitaPorCultivar from 'components/safra/graficos/GraficoColheitaPorCultivar.vue'

  import graficoEntregaArmazem from 'components/safra/graficos/GraficoEntregaArmazem.vue'
  import graficoEntregaCaminhao from 'components/safra/graficos/GraficoEntregaCaminhao.vue'
  import graficoColheitaDiaria from 'components/safra/graficos/GraficoColheitaDiaria.vue'
  // import graficoClassificacaoDiaria from 'components/safra/graficos/GraficoClassificacaoDiaria.vue'

  import safraGraficoDiario from 'components/safra/graficos/Diario.vue'
  import safraGraficoQuantidadesPorArea from 'components/safra/graficos/QuantidadesPorArea.vue'
  import safraGraficoQuantidadesPorTalhao from 'components/safra/graficos/QuantidadesPorTalhao.vue'
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

      // graficoColheitaPorTalhao,
      // graficoColheitaPorCultivar,

      //graficoClassificacaoDiaria,
      // graficoColheitaDiaria,
      // graficoEntregaArmazem,
      // graficoEntregaCaminhao,


      safraGraficoDiario,
      safraGraficoQuantidadesPorArea,
      safraGraficoQuantidadesPorTalhao,
      safraQuantidades,
    },
    data () {
      return {

        safra_id: null,
        id: null,

        loaded: false,
        data: null,

        areasLoaded: false,
        areas: null,

        talhoesLoaded: false,
        talhoes: null,

        iTab: null,
        iArea: null,
        iTalhao: null,

        media: true,

        graficoPorMedia: true,
        currentStep: 'marca',
        marcas: [],
        cultivares: [],
        selectedMarcaId: null,
        selectedCultivarId: null,
        selecteTipoId: null,
        safraCultura: null,
        safraCulturaTalhao: new SafraCulturaTalhaoEdit(),
        progressBuffer: 100,
        selectedSafraCulturaTalhao: null,
        modalEditSafraCulturaTalhao: false,
        modalAddCultivarInfo: false,
      }
    },
    computed: {
      activeArea: function () {
        return this.areas[this.iArea];
      },
      activeTalhao: function () {
        return this.talhoesDaArea[this.iTalhao];
      },
      talhoesDaArea: function () {
        return _.filter(this.talhoes, {area_id: this.activeArea.id});
      }
    },
    methods: {
      imageMakeUrl: function (fileName, size) {
        return AgroUtils.image.makeUrl(fileName, size)
      },
      enterTabAreas: function () {
        this.iArea = 0;
        this.iTalhao = 0;
        this.getAreas();
        this.getTalhoes();
      },

      // ADD CULTIVAR
      listMarcas: function(){
        safraCulturaService.listMarcas().then(response => {
          this.marcas = response.data;
        })
      },
      listCultivar: function(marcaId){
        safraCulturaService.listCultivaresByMarca(this.data.cultura.id, marcaId).then(response => {
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
            let talhao = this.data.cultura_talhoes[this.data.cultura_talhoes.map(cultura_talhao => cultura_talhao.talhao.id).indexOf(safraCulturaTalhaoId)];
            talhao.cultivar = response.data;
            this.getSafraCultura();
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
      getSafraCultura: function(force = false){
        if (this.areasLoaded & !force) {
          return;
        }
        safraCulturaService.getSafraCultura(this.safra_id, this.id).then(response => {
          this.data = response.data;
          this.loaded = true;
        })
      },

      getAreas: function(force = false){
        if (this.areasLoaded & !force) {
          return;
        }
        safraCulturaService.getAreas(this.safra_id, this.id).then(response => {
          this.areas = response.data.areas;
          this.areasLoaded = true;
        })
      },

      getTalhoes: function(force = false){
        if (this.areasLoaded & !force) {
          return;
        }
        safraCulturaService.getTalhoes(this.safra_id, this.id).then(response => {
          this.talhoes = response.data.talhoes;
          this.talhoesLoaded = true;
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
            this.getSafraCultura();
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
            this.getSafraCultura();
            if(response.status === 200){
              let talhaoIndex = this.data.cultura_talhoes.map(talhao => talhao.id).indexOf(safraCulturaTalhao.talhao.id);
              this.data.cultura_talhoes.splice(talhaoIndex, 1);

              if(this.data.cultura_talhoes.length === 0){
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
          return culturaTalhao.tamanho + ' ' + this.data.view_unidade_area.plural + ' (100%)'
        } else {
          let porcentagem = Math.round(culturaTalhao.tamanho / culturaTalhao.talhao.tamanho * 100);
          return culturaTalhao.tamanho + ' de ' + culturaTalhao.talhao.tamanho + ' ' + this.data.view_unidade_area.nome + ' (' + porcentagem + '%)';
        }
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted () {
      this.id = this.$route.params.id;
      this.safra_id = this.$route.params.safra_id;
      this.getSafraCultura();
    },
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

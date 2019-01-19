<template>
  <custom-page isParent v-if="safraCultura">
    <toolbar slot="toolbar" :title="safraCultura.inicio + '/' + safraCultura.fim" navigation_type="back" @navigation_clicked="backAction" >
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end">

      <!--HEADER-->
      <div class="col-12">
        <q-card class="row">

          <!--IMAGEM HEADER-->
          <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" style="max-height: 200px; overflow: hidden">
            <img :src="safraCultura.cultura.image" class="fit" v-if="safraCultura.cultura.image"/>
            <img src="statics/images/no-image-16-10.svg" class="fit" v-if="!safraCultura.cultura.image"/>
          </div>

          <!--INFO DO HEADER-->
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div class="row gutter-y-xs q-pa-md">

              <div class="col-12 text-faded" v-if="loaded">
                <!--Plantio total em {{getSafraCulturaTotalArea()}} hectares (100%)-->
                Plantio total em {{safraCultura.plantioTotal}} {{safraCultura.cultura.estimativa_unidade_area.plural}} ({{Math.round((safraCultura.plantioTotal / safraCultura.area_total) * 100)}}%)
              </div>

              <!--NEGOCIADO-->
              <div class="col-12">
                <!--<div class="row">-->

                <!--<div class="col-6 q-caption text-faded">-->
                <!--Negociado 000%-->
                <!--</div>-->

                <!--&lt;!&ndash;BARRA DE % DO NEGOCIADO&ndash;&gt;-->
                <!--<div class="col-6 self-center">-->
                <!--<q-progress color="deep-orange" :percentage="progressBuffer"/>-->
                <!--</div>-->

                <!--&lt;!&ndash;TOTAL SACAS POR HECTARE&ndash;&gt;-->
                <!--<div class="col-6">-->
                <!--0000 Sc/Ha-->
                <!--</div>-->

                <!--&lt;!&ndash;TOTAL DE SACAS&ndash;&gt;-->
                <!--<div class="col-6">-->
                <!--00000 Sacas-->
                <!--</div>-->

                <!--</div>-->
              </div>

              <!--ESTIMATIVA TOTAL-->
              <div class="col-12">
                <div class="row">

                  <div class="col-12 q-caption text-faded">
                    Estimativa
                  </div>

                  <!--ESTIMATIVA TOTAL DE SACAS POR HECTARE-->
                  <div class="col-6">
                    {{safraCultura.estimativa}} {{safraCultura.cultura.estimativa_unidade_medida.sigla}}/{{safraCultura.cultura.estimativa_unidade_area.sigla}}
                  </div>

                  <!--ESTIMATIVA TOTAL DE SACAS-->
                  <div class="col-6">
                    {{safraCultura.estimativa_total}} {{safraCultura.cultura.estimativa_unidade_medida.plural}}
                  </div>

                </div>
              </div>

              <!--TOTAL COLHIDO-->
              <div class="col-12">
                <!--<div class="row">-->

                <!--<div class="col-12 q-mb-xs">-->
                <!--<div class="row">-->
                <!--<div class="col-6 q-caption text-faded">-->
                <!--Colhido 000%-->
                <!--</div>-->
                <!--<div class="col-6 self-center">-->
                <!--<q-progress color="deep-orange" :percentage="progressBuffer"/>-->
                <!--</div>-->
                <!--</div>-->

                <!--</div>-->

                <!--<div class="col-6">-->
                <!--000 Sc/Ha-->
                <!--</div>-->

                <!--<div class="col-6">-->
                <!--00000 Sacas-->
                <!--</div>-->

                <!--</div>-->
              </div>

            </div>
          </div>

        </q-card>
      </div>

      <!--GRAFICO QUANTIDADE ENTREGA DOS ARMAZEMS-->
      <!--<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
        <!--<q-card class="full-height">-->
          <!--<q-card-title>-->
            <!--Entrega dos Armazéms-->
          <!--</q-card-title>-->
          <!--<q-card-main>-->
            <!--<grafico-quantidade-entrega-armazems :height="200" :width="100"/>-->
          <!--</q-card-main>-->
        <!--</q-card>-->
      <!--</div>-->

      <!--GRAFICO COLHEITA DIARIA-->
      <!--<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
        <!--<q-card class="full-height">-->
          <!--<q-card-title>-->
            <!--Colheita diária-->
          <!--</q-card-title>-->
          <!--<q-card-main>-->
            <!--<grafico-colheita-diaria :height="200" :width="100"/>-->
          <!--</q-card-main>-->
        <!--</q-card>-->
      <!--</div>-->

      <!--GRAFICO CLASSIFICACAO DIARIA-->
      <!--<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">-->
        <!--<q-card class="full-height">-->
          <!--<q-card-title>-->
            <!--Classificação diária-->
          <!--</q-card-title>-->
          <!--<q-card-main>-->
            <!--<grafico-classificacoes-diaria :height="200" :width="100"/>-->
          <!--</q-card-main>-->
        <!--</q-card>-->
      <!--</div>-->

      <!--GRAFICO CLASSIFICACAO MEDIA ARMAZEM-->
      <!--<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
        <!--<q-card class="full-height">-->
          <!--<q-card-main>-->
            <!--<grafico-classificacao-media-armazem/>-->
          <!--</q-card-main>-->
        <!--</q-card>-->
      <!--</div>-->

      <!--GRAFICO PORCENTAGEM ENTREGA DOS ARMAZEMS-->
      <!--<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
        <!--<q-card class="full-height">-->
          <!--<q-card-title>-->
            <!--Porcentagem dos Armazéms-->
          <!--</q-card-title>-->
          <!--<q-card-main>-->
            <!--<grafico-porcentagem-entrega-armazems :height="200" :width="100"/>-->
          <!--</q-card-main>-->
        <!--</q-card>-->
      <!--</div>-->

      <!--GRAFICO COLHEITA POR AREA-->
      <!--<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
        <!--<q-card class="full-height">-->
          <!--<q-card-title>-->
            <!--Colheita por área-->
          <!--</q-card-title>-->
          <!--<q-card-main>-->
            <!--<grafico-colheita-por-area :height="200" :width="100"/>-->
          <!--</q-card-main>-->
        <!--</q-card>-->
      <!--</div>-->

      <!--GRAFICO COLHEITA POR TALHAO-->
      <!--<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
        <!--<q-card class="full-height">-->
          <!--<q-card-title>-->
            <!--Colheita por talhão-->
          <!--</q-card-title>-->
          <!--<q-card-main>-->
            <!--<grafico-colheita-por-talhao :height="200" :width="100"/>-->
          <!--</q-card-main>-->
        <!--</q-card>-->
      <!--</div>-->

      <!--GRAFICO COLHEITA POR CULTIVAR-->
      <!--<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
        <!--<q-card class="full-height">-->
          <!--<q-card-title>-->
            <!--Colheita por cultivar-->
          <!--</q-card-title>-->
          <!--<q-card-main>-->
            <!--<grafico-colheita-por-cultivar :height="200" :width="100"/>-->
          <!--</q-card-main>-->
        <!--</q-card>-->
      <!--</div>-->

      <!--GRAFICO PORENTAGEM CAMINHOES-->
      <!--<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
        <!--<q-card class="full-height">-->
          <!--<q-card-title>-->
            <!--Porcentagem por caminhões-->
          <!--</q-card-title>-->
          <!--<q-card-main>-->
            <!--<grafico-porcentagem-por-caminhao :height="200" :width="100"/>-->
          <!--</q-card-main>-->
        <!--</q-card>-->
      <!--</div>-->

      <!--TALHOES-->
      <template v-if="safraCultura">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="culturaTalhao in safraCultura.cultura_talhoes" :key="culturaTalhao.id">

          <q-card class="full-height">
            <q-card-media>
              <img src="statics/images/no-image-16-10.svg" v-if="!culturaTalhao.talhao.image"/>
              <img :src="culturaTalhao.talhao.image" v-if="culturaTalhao.talhao.image"/>
            </q-card-media>
            <q-card-separator/>

            <q-card-title>
              {{culturaTalhao.talhao.nome}}
              <q-btn round flat dense icon="more_vert" slot="right">
                <q-popover>
                  <q-list link class="no-border">
                    <q-item v-close-overlay @click.native="addCultivarModal(culturaTalhao)">
                      <q-item-main label="Informar cultivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="editSafraCulturaTalhao(culturaTalhao)">
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteSafraCulturaTalhao(culturaTalhao)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-card-title>
            <q-card-separator/>

            <q-card-main class="gutter-xs">

              <!--CULTURA TALHAO-->
              <div class="">
                <div class="col-12 text-faded q-caption">
                  {{formatCulturaTalhaoTamanhoLabel(culturaTalhao)}}
                </div>

                <div class="cultivar-container">
                  <div class="cultivar-item row" v-if="culturaTalhao.cultivar">
                    <div class="col-xs-10 col-sm-10 col-md-9 col-lg-9 self-center">
                      <span class="q-subheading">{{culturaTalhao.cultivar.nome}}</span>
                    </div>

                    <div class="col-xs-2 col-sm-2 col-md-3 col-lg-3">
                      <img :src="culturaTalhao.cultivar.image_path" class="responsive" v-if="culturaTalhao.cultivar.image_path"/>
                    </div>
                  </div>

                  <div class="cultivar-empty"  v-if="!culturaTalhao.cultivar">
                    <q-icon name="warning" />
                    <span>Nenhum cultivar adicionado ainda</span>
                  </div>
                </div>
              </div>

              <!--ESTIMATIVA  TALHAO-->
              <div class="row">
                <div class="col-12">
                  <div class="row">

                    <div class="col-12 q-caption text-faded">
                      Estimativa
                    </div>

                    <div class="col-6">
                      {{culturaTalhao.estimativa}} {{safraCultura.cultura.estimativa_unidade_medida.sigla}}/{{safraCultura.cultura.estimativa_unidade_area.plural}}
                    </div>

                    <div class="col-6 text-right">
                      {{culturaTalhao.estimativa_total}} {{safraCultura.cultura.estimativa_unidade_medida.nome}}
                    </div>

                  </div>
                </div>
              </div>

              <!--COLHIDO POR TALHAO-->
              <div clas="row">
                <!--<div class="col-12 gutter-y-xs">-->

                <!--<div class="row">-->
                <!--<div class="col-6 text-faded">-->
                <!--Colhido 000%-->
                <!--</div>-->
                <!--<div class="col-6 self-center">-->
                <!--<q-progress color="deep-orange" :percentage="progressBuffer"/>-->
                <!--</div>-->
                <!--</div>-->

                <!--<div class="row">-->
                <!--<div class="col-6">-->
                <!--000 Sc/Ha-->
                <!--</div>-->

                <!--<div class="col-6 text-right">-->
                <!--000 Sacas-->
                <!--</div>-->
                <!--</div>-->

                <!--</div>-->
              </div>

            </q-card-main>
          </q-card>

        </div>
      </template>

    </div>

    <!--MODAL UPDATE SAFRA CULTURA-->
    <q-modal minimized no-backdrop-dismiss v-model="modalEditSafraCulturaTalhao" v-if="selectedSafraCulturaTalhao">
      <form @keyup.enter="updadeSafraCulturatalhao()">
        <div class="column q-ma-md">
          <div class="col-6 q-title q-mb-md">
            {{selectedSafraCulturaTalhao.talhao.nome}}
          </div>
          <div class="col-6 text-justify">

            <q-list-header>Área à ser utilizada</q-list-header>
            <q-item dense>
              <div class="row gutter-x-sm">
                <div class="col-8 self-center">
                  <q-slider
                    label
                    :min="0"
                    :max="selectedSafraCulturaTalhao.talhao.tamanho"
                    v-model="safraCulturaTalhao.tamanho.value"
                    :label-value="safraCulturaTalhao.tamanho.value + ' ' + safraCultura.cultura.estimativa_unidade_area.sigla"
                  />
                </div>
                <div class="col-4">
                  <custom-input-text  type="number" :suffix="safraCultura.cultura.estimativa_unidade_area.sigla" :model="safraCulturaTalhao.tamanho"
                                      @blur="checkInputMaxSize(safraCulturaTalhao.tamanho.value, selectedSafraCulturaTalhao)"
                  />
                </div>
              </div>
            </q-item>

            <q-list no-border dense class="q-py-none">
              <q-list-header>Estimativa por {{safraCultura.cultura.estimativa_unidade_area.nome}}</q-list-header>
              <q-item dense>
                <div class="row gutter-x-sm">
                  <div class="col-3">
                    <custom-input-text  type="number" :model="safraCulturaTalhao.estimativa" />
                  </div>
                  <div class="col-9 self-center">
                    <!--label de unidade-->
                    {{safraCultura.cultura.estimativa_unidade_medida.nome}}
                  </div>
                </div>
              </q-item>
            </q-list>

          </div>
        </div>

        <div class="row" position="bottom-right" :offset="[30, 30]">
          <div class="col-12 q-pa-sm" align="end">
            <q-btn color="primary" @click.native="modalEditSafraCulturaTalhao = false" flat label="cancelar" class="q-mr-sm"/>
            <q-btn color="primary" @click.native="updadeSafraCulturatalhao" flat label="salvar"/>
          </div>
        </div>

      </form>
    </q-modal>

    <!--MODAL ADD CULTIVAR INFO-->
    <q-modal v-model="modalAddCultivarInfo" maximized>
      <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow">

        <!-- PASSO 1 ESCOLHER MARCA-->
        <q-step default title="Marca" name="marca">

          <div class="row q-ma-md gutter-xs justify-center" style="min-height: 80vh">
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="marca in marcas" :key="marca.id">
              <q-card @click.native="chooseMarca(marca.id)">
                <q-card-media overlay-position="full">
                  <img src="statics/images/no-image-16-10.svg" v-if="!marca.image_path"/>
                  <img :src="marca.image_path" v-if="marca.image_path"/>
                  <q-card-title slot="overlay" align="end" v-if="marca.id === selectedMarcaId">
                    <q-icon name="check_circle" size="30px" color="positive"/>
                  </q-card-title>
                </q-card-media>
                <q-card-separator/>
                <q-card-title>
                  {{marca.nome}}
                </q-card-title>
              </q-card>
            </div>
          </div>

        </q-step>

        <!--PASSO 2 ESCOLHER TIPO-->
        <q-step title="Cultivar" name="cultivar">
          <div class="row q-ma-md gutter-xs justify-center" style="min-height: 80vh">
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultivar in cultivares" :key="cultivar.id">
              <q-card @click.native="chooseCultivar(cultivar.id)">
                <q-card-title class="text-center">
                  {{cultivar.nome}}
                  <div slot="right" v-if="cultivar.id === selectedCultivarId">
                    <q-btn icon="done" round color="positive" dense/>
                  </div>
                </q-card-title>
                <q-card-separator/>
                <q-card-main>
                  <div class="row">
                    <div class="col-12 text-center text-faded">
                      {{cultivar.tipo}}
                    </div>
                    <div class="col-12 text-center">
                      Ciclo {{cultivar.ciclo}} {{cultivar.ciclo_dias}} dias.
                    </div>
                  </div>
                </q-card-main>
              </q-card>
            </div>
          </div>
        </q-step>

      </q-stepper>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn class="q-mr-xs" color="primary" @click="modalAddCultivarInfo = false" label="cancelar" />
        <q-btn v-if="currentStep === 'cultivar' " color="primary" @click="saveCultivarToSafraCulturaTalhao()" label="salvar" />
      </q-page-sticky>
    </q-modal>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import SafraCulturaTalhaoEdit from 'assets/js/model/safra/SafraCulturaTalhaoEdit'
  import graficoColheitaDiaria from 'components/graficos/GraficoColheitaDiaria.vue'
  import graficoClassificacoesDiaria from 'components/graficos/GraficoClassificacoesDiaria.vue'
  import graficoClassificacaoMediaArmazem from 'components/graficos/GraficoClassificacaoMediaArmazem.vue'
  import graficoQuantidadeEntregaArmazems from 'components/graficos/GraficoQuantidadeEntregaArmazems.vue'
  import graficoPorcentagemEntregaArmazems from 'components/graficos/GraficoPorcentagemEntregaArmazems.vue'
  import graficoColheitaPorArea from 'components/graficos/GraficoColheitaPorArea.vue'
  import graficoColheitaPorTalhao from 'components/graficos/GraficoColheitaPorTalhao.vue'
  import graficoColheitaPorCultivar from 'components/graficos/GraficoColheitaPorCultivar.vue'
  import graficoPorcentagemPorCaminhao from 'components/graficos/GraficoPorcentagemPorCaminhao.vue'
  export default {
    name: "safra-cultura",
    components: {
      toolbar,
      customPage,
      customInputText,
      graficoColheitaDiaria,
      graficoClassificacoesDiaria,
      graficoClassificacaoMediaArmazem,
      graficoQuantidadeEntregaArmazems,
      graficoPorcentagemEntregaArmazems,
      graficoColheitaPorArea,
      graficoColheitaPorTalhao,
      graficoColheitaPorCultivar,
      graficoPorcentagemPorCaminhao,
    },
    data () {
      return {
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
    methods: {
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
          return culturaTalhao.tamanho + ' ' + this.safraCultura.cultura.estimativa_unidade_area.plural + ' (100%)'
        } else {
          let porcentagem = Math.round(culturaTalhao.tamanho / culturaTalhao.talhao.tamanho * 100);
          return culturaTalhao.tamanho + ' de ' + culturaTalhao.talhao.tamanho + ' ' + this.safraCultura.cultura.estimativa_unidade_area.nome + ' (' + porcentagem + '%)';
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

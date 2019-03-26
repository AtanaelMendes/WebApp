<template>
  <div class="row space-end" v-if="visible && safraCultura">
    <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 col-xl-5">
      <q-card-media overlay-position="top" style="max-height: 40vh">
        <ap-image size="800x500" :file-name="safraCultura.cultura.image_file_name"/>
        <q-card-title slot="overlay">
          {{safraCultura.cultura.nome}} {{safraCultura.safra.ano_inicio}}/{{safraCultura.safra.ano_fim}}
          <span slot="subtitle">
              {{numeral(safraCultura.totals.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}
            </span>
        </q-card-title>
      </q-card-media>
    </div>
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
      <safra-quantidades
        :quantidades="safraCultura.totals"
        :unidade-area="safraCultura.view_unidade_area"
        :unidade-medida="safraCultura.view_unidade_medida"
      />
    </div>

    <!-- GRAFICOS -->
    <div class="col-12 space-end q-mt-md">
      <q-tabs swipeable inverted arrows align="justify" style="min-height: 410px">
        <q-tab slot="title" name="tab-diario" label="" icon="mdi-calendar" default @select="selectTabDiario()"/>
        <q-tab slot="title" name="tab-diario-classificacao" label="" icon="mdi-ruler" @select="selectTabDiarioClassificacao()"/>
        <q-tab slot="title" name="tab-caminhoes" label="" icon="mdi-truck" @select="selectTabCaminhoes()"/>
        <q-tab slot="title" name="tab-armazem" label="" icon="place" @select="selectTabArmazens()"/>

        <q-tab-pane name="tab-diario" keep-alive>
          <div class="q-mb-md">
            Diário de Colheita
          </div>
          <safra-grafico-diario :diario="diario" :unidade-medida="safraCultura.view_unidade_medida" :height="300" :width="100"/>
        </q-tab-pane>
        <q-tab-pane name="tab-diario-classificacao" keep-alive>
          <div class="q-mb-md">
            Diário de Classificação
          </div>
          <safra-grafico-diario-classificacao :diario-classificacao="diarioClassificacao" :height="300" :width="100"/>
        </q-tab-pane>
        <q-tab-pane name="tab-caminhoes" keep-alive>
          <div class="q-mb-md">
            Entregas Por Caminhão
          </div>
          <safra-grafico-quantidades-por-caminhao :unidade-medida="safraCultura.view_unidade_medida" :caminhoes="caminhoes" :height="300" :width="100"/>
        </q-tab-pane>
        <q-tab-pane name="tab-armazem" keep-alive>
          <div class="q-mb-md">
            Entrega Por Armazém
          </div>
          <safra-grafico-quantidades-por-armazem :unidade-medida="safraCultura.view_unidade_medida" :armazens="armazens" :height="300" :width="100"/>
        </q-tab-pane>
      </q-tabs>
    </div>

  </div>
</template>

<script>
  import apImage from 'components/ApImage'
  import safraQuantidades from 'components/safra/Quantidades.vue'
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";
  import safraGraficoDiario from 'components/safra/graficos/Diario.vue'
  import safraGraficoDiarioClassificacao from 'components/safra/graficos/DiarioClassificacao.vue'
  import safraGraficoQuantidadesPorCaminhao from 'components/safra/graficos/QuantidadesPorCaminhao.vue'
  import safraGraficoQuantidadesPorArmazem from 'components/safra/graficos/QuantidadesPorArmazem.vue'

  export default {
    name: "ResumoTab",
    props:{
      visible: false
    },
    components: {
      apImage,
      safraQuantidades,
      safraGraficoDiario,
      safraGraficoDiarioClassificacao,
      safraGraficoQuantidadesPorCaminhao,
      safraGraficoQuantidadesPorArmazem,
    },
    data(){
      return{
        safraCulturaService: new SafraCulturaService(),
        safraCultura: null,
        diario: null,
        diarioClassificacao: null,
        caminhoes: null,
        armazens: null,
      }
    },
    methods:{
      init(safraCultura){
        this.safraCultura = safraCultura;
      },
      selectTabDiario() {
        this.getDiario();
      },
      selectTabDiarioClassificacao() {
        this.getDiarioClassificacao();
      },
      selectTabCaminhoes() {
        this.getCaminhoes();
      },
      selectTabArmazens() {
        this.getArmazens();
      },
      getDiario: function(force = false){
        if (this.diarioLoaded & !force) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getDiario(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.diario = response.diario;
          this.diarioLoaded = true;
          this.$q.loading.hide();
        })
      },
      getDiarioClassificacao: function(force = false){
        if (this.diarioClassificacaoLoaded & !force) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getDiarioClassificacao(this.safraCultura.safra.id, this.safraCultura.id).then(diarioClassificacao => {
          this.diarioClassificacao = diarioClassificacao;
          this.diarioClassificacaoLoaded = true;
          this.$q.loading.hide();
        })
      },
      getCaminhoes: function(force = false){
        if (this.caminhoesLoaded & !force) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getCaminhoes(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.caminhoes = response.caminhoes;
          this.caminhoesLoaded = true;
          this.$q.loading.hide();
        })
      },
      getArmazens: function(force = false){
        if (this.armazensLoaded & !force) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getArmazens(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.armazens = response.armazens;
          this.armazensLoaded = true;
          this.$q.loading.hide();
        })
      },
    },
  }
</script>

<style scoped>

</style>

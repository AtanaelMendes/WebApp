<template>
  <div class="row space-end" v-if="visible && data">
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
          <safra-grafico-diario :diario="diario" :unidade-medida="data.view_unidade_medida" :height="300" :width="100"/>
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
          <safra-grafico-quantidades-por-caminhao :unidade-medida="data.view_unidade_medida" :caminhoes="caminhoes" :height="300" :width="100"/>
        </q-tab-pane>
        <q-tab-pane name="tab-armazem" keep-alive>
          <div class="q-mb-md">
            Entrega Por Armazém
          </div>
          <safra-grafico-quantidades-por-armazem :unidade-medida="data.view_unidade_medida" :armazens="armazens" :height="300" :width="100"/>
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
        safra_id: null,
        safraCulturaId: null,
        data: null,
        diario: null,
        diarioClassificacao: null,
        caminhoes: null,
        armazens: null,
      }
    },
    methods:{
      init(safraId, safraCulturaId, data){
        this.safra_id = safraId;
        this.safraCulturaId = safraCulturaId;
        this.data = data;
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
        this.safraCulturaService.getDiario(this.safra_id, this.safraCulturaId).then(response => {
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
        this.safraCulturaService.getDiarioClassificacao(this.safra_id, this.safraCulturaId).then(diarioClassificacao => {
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
        this.safraCulturaService.getCaminhoes(this.safra_id, this.safraCulturaId).then(response => {
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
        this.safraCulturaService.getArmazens(this.safra_id, this.safraCulturaId).then(response => {
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

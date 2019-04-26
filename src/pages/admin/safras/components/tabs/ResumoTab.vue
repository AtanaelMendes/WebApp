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
        :safra-cultura-id="safraCultura.id"
        :quantidades="safraCultura.totals"
        :unidade-area="safraCultura.view_unidade_area"
        :unidade-medida="safraCultura.view_unidade_medida"
      />
    </div>

    <!-- GRAFICOS -->
    <div class="col-12 space-end q-mt-md">
      <q-tabs swipeable inverted arrows align="justify" style="min-height: 410px">
        <q-tab slot="title" name="tab-diario" :label="$q.screen.gt.sm ? 'Diário de Colheita' : ''" icon="mdi-calendar" default @select="selectTabDiario()"/>
        <q-tab slot="title" name="tab-diario-classificacao" :label="$q.screen.gt.sm ? 'Diário de Classificação' : ''" icon="mdi-ruler" @select="selectTabDiarioClassificacao()"/>
        <q-tab slot="title" name="tab-descontos-armazem" :label="$q.screen.gt.sm ? 'Diário de Descontos' : ''" icon="mdi-delete" @select="selectTabDescontoArmazens()"/>
        <q-tab slot="title" name="tab-armazem" :label="$q.screen.gt.sm ? 'Entregas Por Armazém' : ''" icon="place" @select="selectTabArmazens()"/>
        <q-tab slot="title" name="tab-caminhoes" :label="$q.screen.gt.sm ? 'Entregas Por Caminhão' : ''" icon="mdi-truck" @select="selectTabCaminhoes()"/>

        <q-tab-pane name="tab-diario" keep-alive>
          <template v-if="diario">
            <div class="q-mb-lg" v-if="$q.screen.lt.md">
              <span class="q-subheading text-weight-medium text-primary uppercase">Diário de Colheita</span>
            </div>
            <safra-grafico-diario v-if="diario.length > 0" :diario="diario" :unidade-medida="safraCultura.view_unidade_medida" :height="300" :width="100"/>
            <div v-else class="text-center chart-empty">
              <q-icon name="warning" />
              <span>Nenhuma informação disponível.</span>
            </div>
          </template>
        </q-tab-pane>
        <q-tab-pane name="tab-diario-classificacao" keep-alive>
          <template v-if="diarioClassificacao">
            <div class="q-mb-lg" v-if="$q.screen.lt.md">
              <span class="q-subheading text-weight-medium text-primary uppercase">Diário de Classificação</span>
            </div>
            <safra-grafico-diario-classificacao v-if="diarioClassificacao.classificacoes.length > 0" :diario-classificacao="diarioClassificacao" :height="300" :width="100"/>
            <div v-else class="text-center chart-empty">
              <q-icon name="warning" />
              <span>Nenhuma informação disponível.</span>
            </div>
          </template>
        </q-tab-pane>
        <q-tab-pane name="tab-descontos-armazem" keep-alive>
          <template v-if="descontosArmazens">
            <div class="q-mb-lg" v-if="$q.screen.lt.md">
              <span class="q-subheading text-weight-medium text-primary uppercase">Diário de Descontos</span>
            </div>
            <safra-grafico-diario-descontos-por-armazem v-if="descontosArmazens.armazens.length > 0" :descontosArmazem="descontosArmazens" :height="300" :width="100"/>
            <div v-else class="text-center chart-empty">
              <q-icon name="warning" />
              <span>Nenhuma informação disponível.</span>
            </div>
          </template>
        </q-tab-pane>
        <q-tab-pane name="tab-armazem" keep-alive>
          <template v-if="armazens">
            <div class="q-mb-lg" v-if="$q.screen.lt.md">
              <span class="q-subheading text-weight-medium text-primary uppercase">Entregas Por Armazém</span>
            </div>
            <safra-grafico-quantidades-por-armazem v-if="armazens.length > 0" :unidade-medida="safraCultura.view_unidade_medida" :armazens="armazens" :height="300" :width="100"/>
            <div v-else class="text-center chart-empty">
              <q-icon name="warning" />
              <span>Nenhuma informação disponível.</span>
            </div>
          </template>
        </q-tab-pane>
        <q-tab-pane name="tab-caminhoes" keep-alive>
          <template v-if="caminhoes">
            <div class="q-mb-lg" v-if="$q.screen.lt.md">
              <span class="q-subheading text-weight-medium text-primary uppercase">Entregas Por Caminhão</span>
            </div>
            <safra-grafico-quantidades-por-caminhao v-if="caminhoes.length > 0" :unidade-medida="safraCultura.view_unidade_medida" :caminhoes="caminhoes" :height="300" :width="100"/>
            <div v-else class="text-center chart-empty">
              <q-icon name="warning" />
              <span>Nenhuma informação disponível.</span>
            </div>
          </template>
        </q-tab-pane>
      </q-tabs>
    </div>

  </div>
</template>

<script>
  import apImage from 'components/ApImage'
  import safraQuantidades from '../Quantidades.vue'
  import SafraCulturaService from "../../../../../assets/js/service/safra/SafraCulturaService";
  import safraGraficoDiario from '../graficos/Diario.vue'
  import safraGraficoDiarioClassificacao from '../graficos/DiarioClassificacao.vue'
  import safraGraficoQuantidadesPorCaminhao from '../graficos/QuantidadesPorCaminhao.vue'
  import safraGraficoQuantidadesPorArmazem from '../graficos/QuantidadesPorArmazem.vue'
  import safraGraficoDiarioDescontosPorArmazem from '../graficos/DiarioDescontosArmazens.vue'

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
      safraGraficoDiarioDescontosPorArmazem,
    },
    data(){
      return{
        safraCulturaService: new SafraCulturaService(),
        safraCultura: null,
        diario: null,
        diarioClassificacao: null,
        caminhoes: null,
        armazens: null,
        descontosArmazens: null,
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
      selectTabDescontoArmazens() {
        this.getDescontosArmazens();
      },
      getDiario(){
        if (this.diario) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getDiario(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.diario = response.diario;
          this.$q.loading.hide();
        })
      },
      getDiarioClassificacao(){
        if (this.diarioClassificacao) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getDiarioClassificacao(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.diarioClassificacao = response;
          this.$q.loading.hide();
        })
      },
      getCaminhoes(){
        if (this.caminhoes) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getCaminhoes(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.caminhoes = response.caminhoes;
          this.$q.loading.hide();
        })
      },
      getArmazens(){
        if (this.armazens) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getArmazens(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.armazens = response.armazens;
          this.$q.loading.hide();
        })
      },
      getDescontosArmazens(){
        console.log('')
        if (this.descontosArmazens) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getDescontosArmazens(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.descontosArmazens = response;
          this.$q.loading.hide();
        })
      },
    },
  }
</script>

<style scoped>
  .chart-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;

    width: 100%;
  }
  .chart-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }
  .chart-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }
</style>

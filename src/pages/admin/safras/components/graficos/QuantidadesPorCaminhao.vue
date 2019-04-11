<template>
  <safra-grafico-quantidades
    :media="false"
    :series="series"
    :unidade-medida="unidadeMedida"
    :height="height"
    :width="width"
    :label-char-size="5"
    v-model="index"
  />
</template>
<script>
import safraGraficoQuantidades from '../graficos/Quantidades.vue'

export default {
  name: "safra-grafico-quantidades-por-caminhao",
  components: {
    safraGraficoQuantidades
  },
  props: {
    caminhoes: Array,
    unidadeMedida: Object,
    height: Number,
    width: Number,
  },
  data() {
    return {
      index: null,
      series: {
        labels: [],
        numeroCargas: [],
        pesoDescarregando: [],
        pesoLiquido: [],
        pesoDesconto: [],
        pesoEstimativa: [],
      }
    }
  },
  watch: {
    caminhoes: function (val) {
      this.parse()
    },
  },
  methods: {
    // cria séries de dados para o grático
    parse () {
      let caminhoes = _.reverse(_.sortBy(this.caminhoes, ['peso_liquido']));
      this.series.labels = _.map(caminhoes, function (item) {
        return item.placa + ' - ' + item.nome
      })
      this.series.numeroCargas = _.map(caminhoes, 'numero_cargas')
      this.series.pesoDescarregando = _.map(caminhoes, 'peso_descarregando');
      this.series.pesoLiquido = _.map(caminhoes, function (item) {
        return (item.peso_liquido - item.peso_descarregando);
      })
      this.series.pesoDesconto = _.map(caminhoes, 'peso_desconto');
    },
  },
  mounted() {
    this.parse()
  }
}
</script>

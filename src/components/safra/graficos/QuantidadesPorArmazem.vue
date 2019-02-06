<template>
  <safra-grafico-quantidades
    :media="false"
    :series="series"
    :unidade-medida="unidadeMedida"
    :height="height"
    :width="width"
    :label-char-size="10"
    v-model="index"
  />
</template>
<script>
import safraGraficoQuantidades from 'components/safra/graficos/Quantidades.vue'

export default {
  name: "safra-grafico-quantidades-por-armazem",
  components: {
    safraGraficoQuantidades
  },
  props: {
    armazens: Array,
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
    armazens: function (val) {
      this.parse()
    },
  },
  methods: {
    // cria séries de dados para o grático
    parse () {
      let armazens = _.reverse(_.sortBy(this.armazens, ['peso_liquido']));
      this.series.labels = _.map(armazens, 'nome')
      this.series.numeroCargas = _.map(armazens, 'numero_cargas')
      this.series.pesoDescarregando = _.map(armazens, 'peso_descarregando');
      this.series.pesoLiquido = _.map(armazens, function (item) {
        return (item.peso_liquido - item.peso_descarregando);
      })
      this.series.pesoDesconto = _.map(armazens, 'peso_desconto');
    },
  },
  mounted() {
    this.parse()
  }
}
</script>

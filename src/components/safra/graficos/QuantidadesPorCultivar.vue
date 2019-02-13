<template>
  <safra-grafico-quantidades
    :media="media"
    :series="series"
    :unidade-medida="unidadeMedida"
    :unidade-area="unidadeArea"
    :height="height"
    :width="width"
    :label-char-size="5"
    v-model="index"
  />
</template>
<script>
import safraGraficoQuantidades from 'components/safra/graficos/Quantidades.vue'

export default {
  name: "safra-grafico-quantidades-por-cultivar",
  components: {
    safraGraficoQuantidades
  },
  props: {
    media: Boolean,
    cultivares: Array,
    unidadeMedida: Object,
    unidadeArea: Object,
    height: Number,
    width: Number,
    marcaId: Number,
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
  computed: {
    cultivaresDaArea: function () {
      return _.filter(this.cultivares, {marca_id: this.marcaId});
    },
  },
  watch: {
    media: function (val) {
      this.parse()
    },
    cultivares: function (val) {
      this.parse()
    },
    marcaId: function (val) {
      this.parse()
    },
    index: function (val) {
      this.$emit("input", this.index)
    },
  },
  methods: {
    // cria séries de dados para o grático
    parse () {
      this.series.labels = _.map(this.cultivaresDaArea, 'nome')
      this.series.numeroCargas = _.map(this.cultivaresDaArea, 'numero_cargas')
      if (this.media) {
        this.series.pesoDescarregando = _.map(this.cultivaresDaArea, function (item) {
          if (!item.peso_descarregando || !item.tamanho) {
            return null
          }
          return item.peso_descarregando / item.tamanho;
        })
        this.series.pesoLiquido = _.map(this.cultivaresDaArea, function (item) {
          return (item.peso_liquido - item.peso_descarregando) / item.tamanho;
        })
        this.series.pesoDesconto = _.map(this.cultivaresDaArea, function (item) {
          return item.peso_desconto / item.tamanho;
        })
        this.series.pesoEstimativa = _.map(this.cultivaresDaArea, function (item) {
          return (item.peso_estimativa) / item.tamanho;
        })
      } else {
        this.series.pesoDescarregando = _.map(this.cultivaresDaArea, 'peso_descarregando');
        this.series.pesoLiquido = _.map(this.cultivaresDaArea, function (item) {
          return (item.peso_liquido - item.peso_descarregando);
        })
        this.series.pesoDesconto = _.map(this.cultivaresDaArea, 'peso_desconto');
        this.series.pesoEstimativa = _.map(this.cultivaresDaArea, function (item) {
          return (item.peso_estimativa);
        })
      }
    },
  },
  mounted() {
    this.parse()
  }
}
</script>

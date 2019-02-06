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
  name: "safra-grafico-quantidades-por-talhao",
  components: {
    safraGraficoQuantidades
  },
  props: {
    media: Boolean,
    talhoes: Array,
    unidadeMedida: Object,
    unidadeArea: Object,
    height: Number,
    width: Number,
    areaId: Number,
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
    talhoesDaArea: function () {
      return _.filter(this.talhoes, {area_id: this.areaId});
    },
  },
  watch: {
    media: function (val) {
      this.parse()
    },
    talhoes: function (val) {
      this.parse()
    },
    areaId: function (val) {
      this.parse()
    },
    index: function (val) {
      this.$emit("input", this.index)
    },
  },
  methods: {
    // cria séries de dados para o grático
    parse () {
      this.series.labels = _.map(this.talhoesDaArea, 'nome')
      this.series.numeroCargas = _.map(this.talhoesDaArea, 'numero_cargas')
      if (this.media) {
        this.series.pesoDescarregando = _.map(this.talhoesDaArea, function (item) {
          if (!item.peso_descarregando || !item.tamanho) {
            return null
          }
          return item.peso_descarregando / item.tamanho;
        })
        this.series.pesoLiquido = _.map(this.talhoesDaArea, function (item) {
          return (item.peso_liquido - item.peso_descarregando) / item.tamanho;
        })
        this.series.pesoDesconto = _.map(this.talhoesDaArea, function (item) {
          return item.peso_desconto / item.tamanho;
        })
        this.series.pesoEstimativa = _.map(this.talhoesDaArea, function (item) {
          return (item.peso_estimativa) / item.tamanho;
        })
      } else {
        this.series.pesoDescarregando = _.map(this.talhoesDaArea, 'peso_descarregando');
        this.series.pesoLiquido = _.map(this.talhoesDaArea, 'peso_liquido');
        this.series.pesoDesconto = _.map(this.talhoesDaArea, 'peso_desconto');
        this.series.pesoEstimativa = _.map(this.talhoesDaArea, function (item) {
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

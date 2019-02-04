<!--GraficoColheitaPorArea-->
<script>
  import { Bar } from 'vue-chartjs'
  export default {
    name: "colheita-por-area",
    extends: Bar,
    props: {
      media: {
        type: Boolean,
        default: true
      },
      areas: {
        type: Array,
        default: []
      }
    },
    data (){
      return {
        chartdata: {
          labels: [],
          datasets: [
            {
              type: 'line',
              label: 'Cargas',
              fill: false,
              showLine: false,
              pointRadius: 7,
              pointHoverRadius: 10,
              pointStyle: 'rectRot',
              yAxisID: 'y-axis-quantidade',
              data: [],
              backgroundColor: 'blue',
              pointBorderColor: 'blue',
            },
            {
              label: 'Descarregando',
              stack: 'stack-peso',
              yAxisID: 'y-axis-peso',
              data: [],
              backgroundColor: 'orange',
            },
            {
              label: 'Líquido',
              stack: 'stack-peso',
              yAxisID: 'y-axis-peso',
              data: [],
              backgroundColor: '#00605f',
            },
            {
              label: 'Desconto',
              stack: 'stack-peso',
              yAxisID: 'y-axis-peso',
              data: [],
              backgroundColor: 'red',
            },
            {
              label: 'Estimativa',
              stack: 'stack-estimativa',
              yAxisID: 'y-axis-peso',
              data: [],
              backgroundColor: 'grey',
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            position: 'right',
            // reverse: true,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: this.formatTooltipLabel,
                // nome do caminhao completo
                title: function(tooltipItems, data) {
                  return data.labels[tooltipItems[0].index]
                },
            }
          },
          scales: {
						xAxes: [{
              labelMaxWidth: 20,
							stacked: true,
              display: true,
              ticks: {
                // Mostra somente primeiras 7 letras (placa)
                callback: function(value) {
                  return value.substr(0, 10)
                },
              }
						}],
            yAxes: [{
              stacked: true,
							display: false,
							id: 'y-axis-peso',
						}, {
              stacked: false,
							display: false,
							position: 'right',
							id: 'y-axis-quantidade',
						}],
					},
        }

      }
    },
    watch: {
      media: function (val) {
        this.parseData()
      }
    },
    methods: {

      formatTooltipLabel (tooltipItem, data) {
        if (isNaN(tooltipItem.yLabel)) {
          return
        }
        if (tooltipItem.datasetIndex == 0) {
          return this.numeral(tooltipItem.yLabel).format('0,0') + ' ' + data.datasets[tooltipItem.datasetIndex].label
        }
        if (tooltipItem.datasetIndex == 1) {
          return this.numeral(tooltipItem.yLabel).format('0,0.00') + ' ' + data.datasets[tooltipItem.datasetIndex].label
        }
        if (tooltipItem.datasetIndex == 2) {
          return this.numeral(tooltipItem.yLabel).format('0,0.00') + ' ' + data.datasets[tooltipItem.datasetIndex].label
        }
        if (tooltipItem.datasetIndex == 3) {
          return this.numeral(tooltipItem.yLabel).format('0,0.00') + ' ' + data.datasets[tooltipItem.datasetIndex].label
        }
        if (tooltipItem.datasetIndex == 4) {
          return this.numeral(tooltipItem.yLabel).format('0,0.00') + ' ' + data.datasets[tooltipItem.datasetIndex].label
        }
        // return data.datasets[tooltipItem.datasetIndex].label +': ' + this.numeral(tooltipItem.yLabel).format('0,0') + ' ' + this.data.unidade_medida.sigla;
      },


      // Passa dados vindos da API pro grafico e monta ele
      parseData () {
        let nomes = _.map(this.areas, 'nome');
        let peso_descarregando = []
        let peso_liquido = []
        let peso_estimativa = []
        let peso_desconto = []
        if (this.media) {
          peso_descarregando = _.map(this.areas, function (item) {
            if (!item.peso_descarregando || !item.tamanho) {
              return null
            }
            return item.peso_descarregando / item.tamanho;
          });
          peso_liquido = _.map(this.areas, function (item) {
            return (item.peso_liquido - item.peso_descarregando) / item.tamanho;
          });
          peso_desconto = _.map(this.areas, function (item) {
            return item.peso_desconto / item.tamanho;
          });
          peso_estimativa = _.map(this.areas, function (item) {
            return (item.peso_estimativa) / item.tamanho;
          });
        } else {
          peso_descarregando = _.map(this.areas, 'peso_descarregando');
          peso_liquido = _.map(this.areas, 'peso_liquido');
          peso_desconto = _.map(this.areas, 'peso_desconto');
          peso_estimativa = _.map(this.areas, function (item) {
            return (item.peso_estimativa);
          });
        }
        this.chartdata.labels = nomes
        this.chartdata.datasets[0].data = _.map(this.areas, 'numero_cargas')
        this.chartdata.datasets[1].data = peso_descarregando
        this.chartdata.datasets[2].data = peso_liquido
        this.chartdata.datasets[3].data = peso_desconto
        this.chartdata.datasets[4].data = peso_estimativa
        console.log(this.chartdata.datasets[0].data);
        this.renderChart(this.chartdata, this.options)
      },

    },
    mounted () {
      this.parseData()
    }
  }
</script>

<style>
</style>

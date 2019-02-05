<!--GraficoColheitaPorArea-->
<script>
  import { Bar } from 'vue-chartjs'
  export default {
    name: "safra-grafico-quantidades",
    extends: Bar,
    props: {
      media: Boolean,
      series: Object,
      unidadeMedida: Object,
      unidadeArea: Object,
      labelCharSize: {
        type: Number,
        default: 10
      },
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
                title: this.formatTitle,
            }
          },
          scales: {
						xAxes: [{
              labelMaxWidth: 20,
							stacked: true,
              display: true,
              ticks: {
                callback: this.formatXAxisLabel,
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
              ticks: {
                  beginAtZero:true
              }
						}],
					},
        }

      }
    },
    watch: {
      series: {
        handler: function(newValue) {
          this.render()
        },
        deep: true
      },
    },
    methods: {

      formatXAxisLabel (value) {
        return value.substr(0, this.labelCharSize)
      },

      formatTitle (tooltipItems, data) {
        this.$emit("input", tooltipItems[0].index)
        return data.labels[tooltipItems[0].index]
      },

      formatTooltipLabel (tooltipItem, data) {
        if (isNaN(tooltipItem.yLabel) || tooltipItem.yLabel == 0) {
          return
        }
        var mask = '0,0'
        var descr = this.unidadeMedida.sigla
        if (this.media) {
          mask = '0,0.00'
          descr = this.unidadeMedida.sigla + '/' + this.unidadeArea.sigla
        }
        if (tooltipItem.datasetIndex == 0) {
          return this.numeral(tooltipItem.yLabel).format('0,0') + ' ' + data.datasets[tooltipItem.datasetIndex].label
        }
        return data.datasets[tooltipItem.datasetIndex].label + ': ' + this.numeral(tooltipItem.yLabel).format(mask) + ' ' + descr
      },

      render () {
        if (this.series.labels.length == 0) {
          return
        }
        this.chartdata.labels = this.series.labels
        this.chartdata.datasets[0].data = this.series.numeroCargas
        this.chartdata.datasets[1].data = this.series.pesoDescarregando
        this.chartdata.datasets[2].data = this.series.pesoLiquido
        this.chartdata.datasets[3].data = this.series.pesoDesconto
        this.chartdata.datasets[4].data = this.series.pesoEstimativa
        this.renderChart(this.chartdata, this.options)
      },

    },
    mounted () {
      this.render()
    }
  }
</script>

<style>
</style>

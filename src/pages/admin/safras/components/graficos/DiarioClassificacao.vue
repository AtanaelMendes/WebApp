<script>
  import { Line } from 'vue-chartjs'
  export default {
    name: "safra-grafico-diario-classificacao",
    extends: Line,
    props: {
      diarioClassificacao: {
        default: null
      },
    },
    data (){
      return {
        loaded: false,
        data: null,
        colors: ['blue', 'red', 'orange', 'green', 'purple', '#00605f', 'pink', 'grey', 'cyan', 'yellow'],
        chartdata: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: false,
            text: 'Colheita diária',
            fontSize: 16
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: this.formatTooltipLabel
            }
          },
          scales: {
            xAxes: [{
              display: true,
              type: 'time',
              distribution: 'series',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'DD/MM',
                  week: 'DD/MM',
                  month: 'MMM/YYYY',
                  quarter: 'MMM/YYYY',
                  year: 'YYYY',
                },
  							tooltipFormat: 'DD/MMM (ddd)'
  						},
  						scaleLabel: {
  							display: true,
  							labelString: 'Date'
  						}
            }],

            yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: false,
							position: 'left',
							id: 'y-axis-liquido',

              ticks: {
                beginAtZero: true
              },
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: false,
							position: 'left',
							id: 'y-axis-desconto',

              ticks: {
                beginAtZero: true
              },
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: false,
							position: 'right',
							id: 'y-axis-cargas',
              ticks: {
                beginAtZero: true
              },
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						}],
          }
        }
      }
    },
    watch: {
      diarioClassificacao: {
        handler: function(newValue) {
          this.parse()
        },
        deep: true
      },
    },
    methods: {

      formatTooltipLabel (tooltipItem, data) {
        if (isNaN(tooltipItem.yLabel)) {
          return
        }
        return data.datasets[tooltipItem.datasetIndex].label +': ' + this.numeral(tooltipItem.yLabel).format('0,0.00') + '%';
      },

      // Passa dados vindos da API pro grafico e monta ele
      parse () {
        if (!this.diarioClassificacao) {
          return;
        }
        // console.log(this.diarioClassificacao);
        this.chartdata.labels = this.diarioClassificacao.dias;
        for (let classificacao of this.diarioClassificacao.classificacoes) {
          var color = this.colors.shift()
          var verificado = []
          for (let dia of this.diarioClassificacao.dias) {
            let ver = _.find(classificacao.diario, ['dia', dia])
            if (ver == undefined) {
              verificado.push(null)
            }
            verificado.push(ver.verificado)
          }
          this.chartdata.datasets.push({
            label: classificacao.nome,
            data: verificado,
            type: 'line',
            fill: false,
            backgroundColor: color,
            borderColor: color,
            yAxisID: 'y-axis-liquido',
          })
        }
        this.renderChart(this.chartdata, this.options)
      },

    },
    mounted () {
      this.parse();
    }

  }
</script>

<style>
  .color{
    background-color: rgb(176, 169, 13)
  }
</style>

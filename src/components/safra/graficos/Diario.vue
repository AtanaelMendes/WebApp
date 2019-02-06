<script>
  import { Bar } from 'vue-chartjs'
  export default {
    name: "safra-grafico-diario",
    extends: Bar,
    props: {
      diario: Array,
      unidadeMedida: Object,
    },
    data (){
      return {
        loaded: false,
        data: null,
        chartdata: {
          labels: [],
          datasets: [
            {
              type: 'line',
              spanGaps: true,
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
              type: 'line',
              spanGaps: true,
              label: 'Descarregando',
              fill: false,
              showLine: false,
              pointRadius: 15,
              pointHoverRadius: 21,
              pointStyle: 'line',
              yAxisID: 'y-axis-peso',
              data: [],
              borderWidth: 5,
              backgroundColor: 'orange',
              pointBorderColor: 'orange',
            },
            {
              label: 'Líquido',
              data: [],
              type: 'line',
              spanGaps: true,
              fill: false,
              backgroundColor: '#00605f',
              borderColor: '#00605f',
              yAxisID: 'y-axis-peso',
            },
            {
              label: 'Desconto',
              data: [],
              type: 'line',
              spanGaps: true,
              fill: false,
              backgroundColor: 'red',
              borderColor: 'red',
              yAxisID: 'y-axis-peso',
              // yAxisID: 'y-axis-desconto',
            },
          ]
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
            display: false,
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
                  day: 'DD/MMM',
                  week: 'DD/MMM',
                  month: 'MMM/YYYY',
                  quarter: 'MMM/YYYY',
                  year: 'YYYY',
                },
  							tooltipFormat: 'DD/MMM (ddd)'
  						},
  						scaleLabel: {
  							display: false,
  							labelString: 'Date'
  						}
            }],

            yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: false,
							position: 'left',
							id: 'y-axis-peso',
              ticks: {
                beginAtZero: true
              },
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: false,
							position: 'right',
							id: 'y-axis-quantidade',
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
      diario: {
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
        if (tooltipItem.datasetIndex == 0) {
          return this.numeral(tooltipItem.yLabel).format('0,0') + ' ' + data.datasets[tooltipItem.datasetIndex].label
        }
        return data.datasets[tooltipItem.datasetIndex].label +': ' + this.numeral(tooltipItem.yLabel).format('0,0') + ' ' + this.unidadeMedida.sigla;
      },

      // Passa dados vindos da API pro grafico e monta ele
      parse () {
        if (!this.diario) {
          return;
        }
        this.chartdata.labels = _.map(this.diario, 'id')
        this.chartdata.datasets[0].data = _.map(this.diario, 'numero_cargas')
        this.chartdata.datasets[1].data = _.map(this.diario, function (item) {
            if (item.peso_descarregando <= 0) {
              return null
            }
            return item.peso_descarregando
        })
        this.chartdata.datasets[2].data = _.map(this.diario, 'peso_liquido')
        this.chartdata.datasets[3].data = _.map(this.diario, 'peso_desconto')
        this.renderChart(this.chartdata, this.options)
      },

    },
    mounted () {
      this.parse();
    }
  }
</script>

<style>
</style>

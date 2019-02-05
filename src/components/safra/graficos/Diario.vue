<script>
  import { Bar } from 'vue-chartjs'

  export default {
    name: "safra-grafico-diario",
    extends: Bar,
    props: {
      safraId: {
        default: null
      },
      safraCulturaId: {
        default: null
      },
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
              fill: false,
              backgroundColor: '#00605f',
              borderColor: '#00605f',
              yAxisID: 'y-axis-peso',
            },
            {
              label: 'Desconto',
              data: [],
              type: 'line',
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
    methods: {

      formatTooltipLabel (tooltipItem, data) {
        if (isNaN(tooltipItem.yLabel)) {
          return
        }
        if (tooltipItem.datasetIndex == 0) {
          return this.numeral(tooltipItem.yLabel).format('0,0') + ' ' + data.datasets[tooltipItem.datasetIndex].label
        }
        return data.datasets[tooltipItem.datasetIndex].label +': ' + this.numeral(tooltipItem.yLabel).format('0,0') + ' ' + this.data.unidade_medida.sigla;
      },

      // Busca Dados da API
      getData () {
        safraCulturaGraficoService.getColheitaDiaria(this.safraId, this.safraCulturaId).then(response => {
          this.data = response.data
          this.loaded = true;
          this.parseData();
        })
      },

      // Passa dados vindos da API pro grafico e monta ele
      parseData () {
        if (!this.loaded) {
          return;
        }
        this.chartdata.labels = this.data.dias
        this.chartdata.datasets[0].data = this.data.cargas
        this.chartdata.datasets[1].data = this.data.estimativa_carga
        this.chartdata.datasets[2].data = this.data.peso_liquido
        this.chartdata.datasets[3].data = this.data.peso_desconto
        this.renderChart(this.chartdata, this.options)
      },

    },
    mounted () {
      this.getData();
    }
  }
</script>

<style>
</style>

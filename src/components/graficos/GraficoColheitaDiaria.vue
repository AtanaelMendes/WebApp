<script>
  import { Bar } from 'vue-chartjs'
  import safraCulturaGraficoService from 'assets/js/service/safra/SafraCulturaGraficoService'

  export default {
    name: "grafico-colheita-diaria",
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
              backgroundColor: 'rgb(255, 28, 0)',
              borderColor: 'rgb(255, 28, 0)',
              yAxisID: 'y-axis-peso',
              // yAxisID: 'y-axis-desconto',
            },
            {
              label: 'Cargas',
              data: [],
              type: 'line',
              fill: false,
              backgroundColor: 'rgb(0, 5, 176)',
              borderColor: 'rgb(0, 5, 176)',
              yAxisID: 'y-axis-quantidade',
            },
            {
              type: 'bar',
              label: 'Estimado',
              fill: false,
              backgroundColor: 'orange',
              borderColor: 'orange',
              data: [],
              yAxisID: 'y-axis-peso',
            }
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
        return data.datasets[tooltipItem.datasetIndex].label +': ' + this.numeral(tooltipItem.yLabel).format('0,0');
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
        this.chartdata.datasets[0].data = this.data.peso_liquido
        this.chartdata.datasets[1].data = this.data.peso_desconto
        this.chartdata.datasets[2].data = this.data.cargas
        this.chartdata.datasets[3].data = this.data.estimativa_carga
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

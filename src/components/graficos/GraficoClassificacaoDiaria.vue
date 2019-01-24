<script>
  import { Line } from 'vue-chartjs'
  import safraCulturaGraficoService from 'assets/js/service/safra/SafraCulturaGraficoService'
  export default {
    name: "grafico-classificacao-diaria",
    extends: Line,
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
            intersect: false
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
    methods: {

      // Busca Dados da API
      getData () {
        safraCulturaGraficoService.getClassificacaoDiaria(this.safraId, this.safraCulturaId).then(response => {
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
        this.chartdata.labels = this.data.dias;
        for (let classificacao of this.data.classificacoes) {
          var color = this.colors.shift();
          this.chartdata.datasets.push({
            label: classificacao.nome,
            data: this.data.verificado[classificacao.id],
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
      this.getData();
    }

  }
</script>

<style>
  .color{
    background-color: rgb(176, 169, 13)
  }
</style>

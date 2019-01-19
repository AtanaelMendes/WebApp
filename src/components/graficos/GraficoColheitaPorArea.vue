<!--GraficoColheitaPorArea-->
<script>
  import { Bar } from 'vue-chartjs'
  import safraCulturaGraficoService from 'assets/js/service/safra/SafraCulturaGraficoService'
  export default {
    name: "colheita-por-area",
    extends: Bar,
    props: {
      media: {
        type: Boolean,
        default: true
      },
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
        chartdata: {
          labels: [],
          datasets: [
            {
              label: 'Colhido',
              data: [],
              backgroundColor: '#00605f',
            },
            {
              label: 'Estimativa',
              data: [],
              backgroundColor: '#CCCCCC',
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
            intersect: false
          },
          scales: {
            xAxes: [{
              display: false,
              stacked: false,
              gridLines: {
                offsetGridLines: true
              }
            }],
            yAxes: [{
              display: false,
              stacked: false,
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }
    },
    watch: {
      media: function (val) {
        this.parseData()
      }
    },
    methods: {

      // Busca Dados da API
      getData () {
        safraCulturaGraficoService.getColheitaPorArea(this.safraId, this.safraCulturaId).then(response => {
          this.data = response.data
          this.loaded = true
          this.parseData()
        })
      },

      // Passa dados vindos da API pro grafico e monta ele
      parseData () {
        if (!this.loaded) {
          return;
        }
        this.chartdata.labels = this.data.areas
        if (this.media) {
          this.chartdata.datasets[0].data = this.data.colhido_media
          this.chartdata.datasets[1].data = this.data.estimativa_media
        } else {
          this.chartdata.datasets[0].data = this.data.colhido
          this.chartdata.datasets[1].data = this.data.estimativa

        }
        this.renderChart(this.chartdata, this.options)
      },

    },
    mounted () {
      this.getData()
    }
  }
</script>

<style>
</style>

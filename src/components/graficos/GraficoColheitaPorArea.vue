<!--GraficoColheitaPorArea-->
<script>
  import { Bar } from 'vue-chartjs'
  import safraCulturaGraficoService from 'assets/js/service/safra/SafraCulturaGraficoService'
  export default {
    name: "colheita-por-area",
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
        loaded: true,
        data: [],
        chartdata: {
          labels: [],
          datasets: [
            {
              label: 'Colhido',
              data: [],
              backgroundColor: 'rgb(220, 130, 0)',
            },
            {
              label: 'Estimativa',
              data: [],
              backgroundColor: 'rgb(133, 133, 133)',
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
              display: true,
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
    methods: {

      // Busca Dados da API
      getData () {
        safraCulturaGraficoService.getColheitaPorArea(this.safraId, this.safraCulturaId).then(response => {
          this.data = response.data;
          this.loaded = true;
          this.parseData();
        })
      },

      // Passa dados vindos da API pro grafico e monta ele
      parseData () {
        this.chartdata.labels = this.data.areas
        this.chartdata.datasets[0].data = this.data.colhido
        this.chartdata.datasets[1].data = this.data.estimativa
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

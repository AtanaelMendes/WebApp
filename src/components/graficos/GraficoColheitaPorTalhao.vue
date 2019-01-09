<!--GraficoColheitaPorTalhao-->
<script>
  import { Bar } from 'vue-chartjs'
  // import graficoService from 'assets/js/service/GraficoService'
  export default {
    name: "colheita-por-talhao",
    extends: Bar,
    data (){
      return {
        loaded: true,
        chartdata: {
          labels: ['Talhao fundo', 'Talhao subida', 'Talhao frente', 'Média'],
          datasets: [
            {
              label: 'Colhido',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
              backgroundColor: 'rgb(220, 130, 0)',
              borderColor: 'rgb(220, 130, 0)',
            },
            {
              label: 'Estimativa',
              data: [20000, 30000, 40000, 90000],
              backgroundColor: 'rgb(133, 133, 133)',
              borderColor: 'rgb(133, 133, 133)',
              // borderWidth: 2
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
      getRandomInt () {
        return Math.floor(Math.random() * (40000 - 10000 + 1)) + 5
      },
    },
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>

<style>
  .color{
    background-color: rgb(70, 160, 0)
  }
</style>

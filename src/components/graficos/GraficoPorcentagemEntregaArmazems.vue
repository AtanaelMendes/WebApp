<!--GraficoPorcentagemEntregaArmazems-->
<script>
  import { Pie } from 'vue-chartjs'
  // import graficoService from 'assets/js/service/GraficoService'
  export default {
    name: "porcentagem-entrega-armazems",
    extends: Pie,
    data (){
      return {
        loaded: true,
        chartdata: {
          labels: ['ADM', 'Bunge', 'Cargil'],
          datasets: [
            {
              label: ['ADM', 'Bunge', 'Cargil'],
              type: 'pie',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
              backgroundColor: ['red', 'green', 'blue'],
              hoverBorderColor: ['rgba(255, 0, 0, 0.4)', 'rgba(0, 255, 0, 0.4)', 'rgba(0, 0, 255, 0.4)'],
              hoverBorderWidth: 8,
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
          // hover: {
          //   mode: 'nearest',
          //   intersect: true
          // },
          tooltips: {
            mode: 'index',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: false,
            }],
            yAxes: [{
              display: false,
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
        return Math.floor(Math.random() * (100 - 1 + 1)) + 5
      },
    },
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>

<style>
  .color{
    background-color: rgb(0, 5, 200)
  }
</style>

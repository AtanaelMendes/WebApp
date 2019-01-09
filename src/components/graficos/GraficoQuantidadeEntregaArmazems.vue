<!--GraficoQuantidadeEntregaArmazems-->
<script>
  import { Bar } from 'vue-chartjs'
  // import graficoService from 'assets/js/service/GraficoService'
  export default {
    name: "quantidade-entrega-armazems",
    extends: Bar,
    data (){
      return {
        loaded: true,
        chartdata: {
          labels: ['ADM', 'Bunge', 'Balcão'],
          datasets: [
            {
              label: 'Entregue',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
              backgroundColor: 'rgb(220, 130, 0)',
              borderColor: 'rgb(220, 130, 0)',
            },
            {
              label: 'Pendente',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
              backgroundColor: 'rgba(133, 133, 133, 0.2)',
              borderColor: 'rgb(133, 133, 133)',
              borderWidth: 2
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
              stacked: true,
            }],
            yAxes: [{
              display: false,
              stacked: true,
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
        return Math.floor(Math.random() * (30000 - 10000 + 1)) + 5
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

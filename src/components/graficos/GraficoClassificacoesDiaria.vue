<script>

  import { Line } from 'vue-chartjs'

  // import graficoService from 'assets/js/service/GraficoService'

  export default {
    name: "grafico-classificacoes-diarias",
    extends: Line,
    data (){
      return {
        loaded: true,
        chartdata: {
          labels: [
            'primeiro',
            '25/jan',
            '26/jan',
            '27/jan',
            '28/jan',
            '25/jan',
            '26/jan',
            '27/jan',
            '28/jan',
            '25/jan',
            '25/jan',
            '25/jan',
            '26/jan',
            '27/jan',
            '28/jan',
            '25/jan',
            '26/jan',
            '27/jan',
            '28/jan',
            '25/jan',
            '25/jan',
            '25/jan',
            '26/jan',
            '27/jan',
            '28/jan',
            '25/jan',
            '26/jan',
            '27/jan',
            '28/jan',
            '25/jan',
            '25/jan',
            '25/jan',
            '26/jan',
            '27/jan',
            '28/jan',
            '25/jan',
            '26/jan',
            '27/jan',
            '28/jan',
            'ultimo'
          ],
          datasets: [
            {
              label: 'Umidade',
              data: [
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
                this.getRandomUmidade(),
              ],
              type: 'line',
              fill: false,
              // lineTension: 1,
              pointRadius: 0,
              backgroundColor: 'rgb(0, 127, 6)',
              borderColor: 'rgb(0, 127, 6)',
            },
            {
              label: 'Impureza',
              data: [
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
                this.getRandomImpureza(),
              ],
              type: 'line',
              fill: false,
              // lineTension: 1,
              pointRadius: 0,
              backgroundColor: 'rgb(176, 21, 155)',
              borderColor: 'rgb(176, 21, 155)',
            },
            {
              label: 'Avariado',
              data: [
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
                this.getRandomAvariado(),
              ],
              type: 'line',
              fill: false,
              // lineTension: 1,
              pointRadius: 0,
              backgroundColor: 'rgb(176, 169, 13)',
              borderColor: 'rgb(176, 169, 13)',
            },
            {
              label: 'Esverdeado',
              data: [
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
                this.getRandomEsverdeado(),
              ],
              type: 'line',
              fill: false,
              // lineTension: 1,
              pointRadius: 0,
              backgroundColor: 'rgb(0, 5, 176)',
              borderColor: 'rgb(0, 5, 176)',
            }
          ]
        },
        options: {
          // animation: {
          //   duration: 0, // general animation time
          // },
          // hover: {
          //   animationDuration: 0, // duration of animations when hovering an item
          // },
          // responsiveAnimationDuration: 0, // animation duration after a resize
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true,
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }
    },
    methods: {
      getRandomUmidade () {
        return (Math.floor(Math.random() * (260 - 120 + 10)) + 120)/10
      },
      getRandomImpureza () {
        return (Math.floor(Math.random() * 30))/10
      },
      getRandomAvariado () {
        return (Math.floor(Math.random() * (100 - 20 + 10)) + 20)/10
      },
      getRandomEsverdeado () {
        return (Math.floor(Math.random() * (80 - 20 + 10)) + 20)/10
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    },
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>

<style>
  .color{
    background-color: rgb(176, 169, 13)
  }
</style>

<script>
  import { Line } from 'vue-chartjs'
  export default {
    name: "DiarioDescontosArmazens",
    extends: Line,
    props: {
      descontosArmazem: {
        default: null
      },
    },
    data () {
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
            text: 'Descontos armazém',
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
              distribution: 'series',
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
    watch: {
      descontosArmazem: {
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
        return data.datasets[tooltipItem.datasetIndex].label +': ' + this.numeral(tooltipItem.yLabel).format('0,0.00') + '%';
      },

      // Passa dados vindos da API pro grafico e monta ele
      parse () {
        if (!this.descontosArmazem) {
          return;
        }
        // console.log(this.diarioClassificacao);
        this.chartdata.labels = this.descontosArmazem.dias;
        for (let armazem of this.descontosArmazem.armazens) {
          var color = this.colors.shift()
          var porcentagem = []
          for (let dia of this.descontosArmazem.dias) {
            let ver = _.find(armazem.diario, ['dia', dia])
            if (ver == undefined) {
              porcentagem.push(null)
            }else{
              porcentagem.push(ver.porcentagem)
            }
          }
          this.chartdata.datasets.push({
            label: armazem.nome,
            data: porcentagem,
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
      this.parse();
    }
  }
</script>

<style scoped>
  .color{
    background-color: rgb(176, 169, 13)
  }
</style>

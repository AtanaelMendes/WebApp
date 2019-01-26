<!--GraficoPorcentagemEntregaArmazems-->
<script>
  import { Bar } from 'vue-chartjs'
  import safraCulturaGraficoService from 'assets/js/service/safra/SafraCulturaGraficoService'
  export default {
    name: "grafico-entrega-armazem",
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
              stack: 'stack-peso',
              yAxisID: 'y-axis-peso',
              data: [],
              backgroundColor: '#00605f',
            },
            {
              label: 'Desconto',
              stack: 'stack-peso',
              yAxisID: 'y-axis-peso',
              data: [],
              backgroundColor: 'red',
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            position: 'right',
            // reverse: true,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: this.formatTooltipLabel,
                // nome do Armazem completo
                title: function(tooltipItems, data) {
                  return data.labels[tooltipItems[0].index]
                },
            }
          },
          scales: {
						xAxes: [{
							stacked: true,
              display: true,
              ticks: {
                // Corta label do armazem no eixo X se tiver mais de 10 caracteres
                callback: function(value) {
                  if (value.length > 9) {
                    return value.substr(0, 7) + "..."
                  } else {
                    return value
                  }
                },
              }
						}],
            yAxes: [{
              stacked: true,
							display: false,
							id: 'y-axis-peso',
						}, {
              stacked: false,
							display: false,
							position: 'right',
							id: 'y-axis-quantidade',
						}],
					},
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
        safraCulturaGraficoService.getEntregaArmazem(this.safraId, this.safraCulturaId).then(response => {
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
        this.chartdata.labels = this.data.armazens
        // gambiarra, se apagar não mostra as cargas do ultimo armazem
        this.data.cargas.push(0);
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

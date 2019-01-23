<!--GraficoPorcentagemEntregaArmazems-->
<script>
  import { Pie } from 'vue-chartjs'
  import safraCulturaGraficoService from 'assets/js/service/safra/SafraCulturaGraficoService'
  export default {
    name: "grafico-entrega-armazem",
    extends: Pie,
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
        data: null,
        chartdata: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: ['#00605f', 'red', 'blue', 'orange', 'pink', 'green', 'grey', 'cyan', 'purple', 'yellow'],
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
            position: 'right'
          },
          tooltips: {
            mode: 'index',
            intersect: true
          },
        }
      }
    },
    methods: {

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
        this.chartdata.datasets[0].data = this.data.quantidades
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

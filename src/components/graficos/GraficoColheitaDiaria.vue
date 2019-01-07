<script>
  import { Bar } from 'vue-chartjs'
  // import graficoService from 'assets/js/service/GraficoService'
  export default {
    name: "colheita-diaria",
    extends: Bar,
    props: ['chartdata', 'options'],
    data (){
      return {
        chartdata: {
          datacollection: {
            labels: ['January', 'February'],
            datasets: [
              {
                label: 'Data One',
                backgroundColor: '#f87979',
                data: [40, 20]
              }
            ]
          }
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    methods: {
      listArmazem: function(){},
    },
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>

<style>
</style>

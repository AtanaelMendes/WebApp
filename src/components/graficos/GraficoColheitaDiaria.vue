<template>
  <q-card>
    <q-card-title class="text-center">
      Colheita diária
    </q-card-title>
    <q-card-main>
      <line-chart v-if="loaded" :chartdata="chartdata" :options="options" :height="height"/>
    </q-card-main>
  </q-card>
</template>
<script>
   //import { Line } from 'vue-chartjs'
  import LineChart from 'assets/js/chart/LineChart.js'
  // import graficoService from 'assets/js/service/GraficoService'
  export default {
    name: "colheita-diaria",
    //extends: Line,
    components: {
      LineChart,
    },
    props: {
      height: BigInt
    },
    data (){
      return {
        loaded: true,
        chartdata: {
          labels: ['Dia 25', 'Dia 26', 'Dia 27'],
          datasets: [
            {
              label: 'Sacas',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
              type: 'line',
              fill: false,
              lineTension: 0,
              backgroundColor: 'rgb(0, 127, 6)',
              borderColor: 'rgb(0, 127, 6)',
            },
            {
              label: 'Cargas',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
              type: 'line',
              fill: false,
              lineTension: 0,
              backgroundColor: 'rgb(0, 5, 176)',
              borderColor: 'rgb(0, 5, 176)',
            },
            {
              label: 'Desconto',
              data: [1, 5, 1],
              type: 'line',
              fill: false,
              lineTension: 0,
              backgroundColor: 'rgb(255, 28, 0)',
              borderColor: 'rgb(255, 28, 0)',
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: false,
            text: 'Colheita diária',
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
            intersect: false
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
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      listArmazem: function(){
        //this.renderChart(this.chartdata, this.options)
      },

    },
    mounted () {
      // this.listArmazem()
    }
  }
</script>

<style>
  .color{
background-color: rgb(0, 5, 176)
  }
</style>

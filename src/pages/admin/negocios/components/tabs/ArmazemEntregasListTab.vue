<template>
  <!--<q-list no-border highlight separator v-if="movimentos">
    <q-item v-for="movimento in movimentosPaginated" :key="movimento.id" multiline :to="'/admin/entregas/' + movimento.entrega.id + '/view'" >
      <q-item-main>
        <q-item-tile label class="q-body-1">
          {{numeral(movimento.entrega.total_peso_liquido).format('0,0')}}
          {{movimento.entrega.total_peso_unidade_medida_sigla}}
        </q-item-tile>
        <q-item-tile sublabel class="q-caption">
          Bruto {{numeral(movimento.entrega.total_peso_bruto_produto).format('0,0')}}
        </q-item-tile>
        <q-item-tile sublabel class="q-caption" v-if="movimento.entrega.total_peso_desconto > 0">
          Desconto {{numeral(movimento.entrega.total_peso_desconto).format('0,0')}}
        </q-item-tile>
      </q-item-main>
      <q-item-side right >
        <q-item-tile class="q-caption">
          {{moment(movimento.entrega.emissao).format('DD, MMM [de] YY')}}
        </q-item-tile>
        <q-item-tile class="q-caption">
          {{movimento.entrega.caminhao.placa}}
        </q-item-tile>
      </q-item-side>
    </q-item>

  </q-list>-->

  <q-table :data="movimentosMaped" :columns="columns" row-key="n_nota" v-if="movimentos">

  </q-table>
</template>

<script>
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";

  export default {
    name: "ArmazemEntregasListTab",
    props:{
      armazem: Object,
      negocioCultura: Object,
    },
    computed:{
      movimentosMaped(){
        return this.movimentos.map(movimento => {
          console.log(movimento)
          return {
            'n_nota': movimento.entrega.numero_nf,
            'n_ticket': movimento.entrega.numero_ticket,
            'placa': movimento.entrega.caminhao.placa,
            'p_liquido': this.numeral(movimento.entrega.total_peso_liquido).format('0,0') + " " + movimento.entrega.total_peso_unidade_medida_sigla,
            'p_bruto': this.numeral(movimento.entrega.total_peso_bruto_produto).format('0,0') + " " + movimento.entrega.total_peso_unidade_medida_sigla,
            'p_desconto': this.numeral(movimento.entrega.total_peso_desconto).format('0,0') + " " + movimento.entrega.total_peso_unidade_medida_sigla,
            'data': this.moment(movimento.entrega.emissao).format('DD/MMM/YYYY'),
          }
        });
      }
    },
    data(){
      return {
        negocioService: new NegocioService(),
        currentPage: 1,
        movimentos: null,
        maxItens: 5,
        columns: [
          {label: 'Nº Nota', field:'n_nota', align: 'left',},
          {label: 'N° Ticket', field:'n_ticket', align: 'left',},
          {label: 'Placa', field:'placa', align: 'left',},
          {label: 'Peso Líquido', field:'p_liquido', align: 'left',},
          {label: 'Peso Bruto', field:'p_bruto', align: 'left',},
          {label: 'Peso Desconto', field:'p_desconto', align: 'left',},
          {label: 'Data', field:'data', align: 'left',},
        ],
      }
    },
    methods:{
      listMovimentos(){
        this.negocioService.listMovimentosByArmazem(this.negocioCultura.id, this.armazem.id).then(movimentos => {
          this.movimentos = movimentos;
        })
      },
    },
    mounted() {
      this.listMovimentos();
    }
  }
</script>

<style scoped>
  .q-table-container{
    box-shadow: unset;
    -webkit-box-shadow: unset;
  }
</style>

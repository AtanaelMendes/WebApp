<template>
  <q-table :data="movimentosMaped" :columns="columns" row-key="n_nota" v-if="movimentos">
      <q-tr slot="body" slot-scope="props" :props="props" >
        <q-td v-for="col in props.cols" :key="col.name" :props="props" style="padding: 0px; height: unset">
          <a :href="'/#/admin/entregas/' + props.row.entrega_id + '/view'" class="td-link">
            <div class="row_div">{{ col.value }}</div>
          </a>
        </q-td>
      </q-tr>
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
          return {
            'id': movimento.id,
            'entrega_id': movimento.entrega.id,
            'n_nota': this.formataNumeroNotaFiscal(movimento.entrega.numeros_nf),
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
          {label: 'Nº Nota', name:'n_nota', field:'n_nota', align: 'left',},
          {label: 'N° Ticket', name:'n_ticket', field:'n_ticket', align: 'left',},
          {label: 'Placa', name:'placa', field:'placa', align: 'left',},
          {label: 'Peso Líquido', name:'p_liquido', field:'p_liquido', align: 'left',},
          {label: 'Peso Bruto', name:'p_bruto', field:'p_bruto', align: 'left',},
          {label: 'Peso Desconto', name:'p_desconto', field:'p_desconto', align: 'left',},
          {label: 'Data', name:'data', field:'data', align: 'left',},
        ],
      }
    },
    methods:{
      listMovimentos(){
        this.negocioService.listMovimentosByArmazem(this.negocioCultura.id, this.armazem.id).then(movimentos => {
          this.movimentos = movimentos;
        })
      },
      formataNumeroNotaFiscal(numeros) {
        let numerosFormatted = numeros.map(numero => this.$_.padStart(numero, 8, '0'));
        return numerosFormatted.join(' | ');
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
  .td-link{
    text-decoration: unset;
    color: rgba(0,0,0,.87);
  }
  .row_div{
    padding: 7px 24px;
    line-height: 34px;
  }
</style>

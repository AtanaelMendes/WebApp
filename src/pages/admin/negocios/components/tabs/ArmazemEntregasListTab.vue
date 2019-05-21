<template>
  <div>
    <q-table :data="movimentosMaped" :columns="columns" row-key="n_nota" v-if="movimentos" class="custom-table">
      <template slot="top" slot-scope="props" >
        <q-btn outline label="Nova Transferência" size="sm" class="q-mr-sm" color="deep-orange" @click="newTrasnferencia(negocioCultura)" />
        <q-btn outline label="Novo Movimento" size="sm" color="deep-orange" @click="newMovimento(negocioCultura)"/>
      </template>

      <q-tr slot="body" slot-scope="props" :props="props" >
        <template v-if="props.row.tipo === 'Entrega'">
          <q-td v-for="col in props.cols" :key="col.name" :props="props" style="padding: 0px; height: unset">
            <a :href="'/#/admin/entregas/' + props.row.entrega_id + '/view'" class="td-link">
              <div class="row_div" v-if="col.name === 'tipo'">
                <q-chip dense square color="blue-8" >{{ col.value }}</q-chip>
              </div>
              <div class="row_div" v-else>{{ col.value }}</div>
            </a>
          </q-td>
        </template>

        <template v-else-if="props.row.tipo === 'Transferencia'">
          <q-td v-for="col in props.cols" :key="col.name" :props="props" style="padding: 0px; height: unset">
            <div class="row_div" v-if="col.name === 'tipo'">
              <q-chip dense square color="amber" text-color="black">{{ col.value }}</q-chip>
            </div>
            <div class="row_div" v-else>{{ col.value }}</div>
          </q-td>
        </template>

        <template v-else>
          <q-td v-for="col in props.cols" :key="col.name" :props="props" style="padding: 0px; height: unset">
            <div class="row_div" v-if="col.name === 'tipo'">
              <q-chip dense square color="deep-purple">{{ col.value }}</q-chip>
            </div>
            <div class="row_div" v-else>{{ col.value }}</div>
          </q-td>
        </template>
      </q-tr>
    </q-table>

    <!--MODAL NOVA TRANSFERENCIA -->
    <new-transferencia-modal ref="transferenciaModal"  />

    <!--MODAL NOVO MOVIMENTO -->
    <new-movimento-modal ref="movimentoModal"  />
  </div>

</template>

<script>
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";
  import newTransferenciaModal from '../modals/NewTransferenciaModal';
  import newMovimentoModal from '../modals/NewMovimentoModal';

  export default {
    name: "ArmazemEntregasListTab",
    props:{
      armazem: Object,
      negocioCultura: Object,
    },
    components:{
      newTransferenciaModal,
      newMovimentoModal,
    },
    computed:{
      movimentosMaped(){
        return this.movimentos.map(movimento => {
          let movimentoMapped = {
            'id': movimento.id,
            'tipo': movimento.tipo.nome,
            'data': this.moment(movimento.data).format('DD/MMM/YYYY'),
            'p_bruto': this.numeral(movimento.peso_bruto).format('0,0') + " " + movimento.unidade_medida_sigla,
            'p_desconto': this.numeral(movimento.peso_desconto).format('0,0') + " " + movimento.unidade_medida_sigla,
            'p_liquido': this.numeral(movimento.peso_liquido).format('0,0') + " " + movimento.unidade_medida_sigla,
          };

          if(movimento.tipo.nome === 'Entrega'){
            movimentoMapped.entrega_id = movimento.entrega.id;
            movimentoMapped.n_nota = this.formataNumeroNotaFiscal(movimento.entrega.numeros_nf);
            movimentoMapped.n_ticket = movimento.entrega.numero_ticket;
            movimentoMapped.placa = movimento.entrega.caminhao.placa;
          }else{
            movimentoMapped.n_nota = '-';
            movimentoMapped.n_ticket = '-';
            movimentoMapped.placa = '-';
          }

          return movimentoMapped;
        });
      }
    },
    data(){
      return {
        negocioService: new NegocioService(),
        movimentos: null,
        columns: [
          {label: 'Tipo', name:'tipo', field:'tipo', align: 'left',},
          {label: 'Nº Nota', name:'n_nota', field:'n_nota', align: 'left',},
          {label: 'N° Ticket', name:'n_ticket', field:'n_ticket', align: 'left',},
          {label: 'Placa', name:'placa', field:'placa', align: 'left',},
          {label: 'Peso Bruto', name:'p_bruto', field:'p_bruto', align: 'left',},
          {label: 'Peso Desconto', name:'p_desconto', field:'p_desconto', align: 'left',},
          {label: 'Peso Líquido', name:'p_liquido', field:'p_liquido', align: 'left',},
          {label: 'Data', name:'data', field:'data', align: 'left',},
        ],
      }
    },
    methods:{
      newTrasnferencia(cultura){
        this.$refs.transferenciaModal.openModal(cultura, this.armazem.armazem_id);
      },
      newMovimento(negocioCultura){
        this.$refs.movimentoModal.openModal(negocioCultura, this.armazem.armazem_id);
      },
      listMovimentos(){
        this.negocioService.listMovimentosByArmazem(this.negocioCultura.id, this.armazem.armazem_id).then(movimentos => {
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

<style >
  .custom-table{
    box-shadow: unset;
    -webkit-box-shadow: unset;
  }
  .custom-table .q-table-top{
    padding: 8px;
    min-height: unset;
  }
  .td-link{
    text-decoration: unset;
    color: rgba(0,0,0,.87);
  }
  .row_div{
    padding: 7px 24px;
    line-height: 33px;
  }
</style>

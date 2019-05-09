<template>
  <q-table :data="notasFiscaisMaped" :columns="columns" row-key="id" v-if="notasFiscais">
    <!--<q-tr slot="body" slot-scope="props" :props="props" >
      <q-td v-for="col in props.cols" :key="col.name" :props="props" style="padding: 0px; height: unset">
        <div class="row_div">{{ col.value }}</div>
      </q-td>
    </q-tr>-->
  </q-table>
</template>

<script>
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";

  export default {
    name: "ArmazemNotasListTab",
    props:{
      armazem: Object,
      negocioCultura: Object,
    },
    computed:{
      notasFiscaisMaped(){
        return this.notasFiscais.map(notaFiscal => {
          return {
            'id': notaFiscal.id,
            'numero': this.formataNumeroNotaFiscal(notaFiscal.numero),
            'peso_fiscal': this.numeral(notaFiscal.peso_fiscal).format('0,0') + ' ' + notaFiscal.unidade_medida_sigla,
            'peso_fisico': this.numeral(notaFiscal.peso_fisico).format('0,0') + ' ' + notaFiscal.unidade_medida_sigla,
            'preco_fiscal': 'R$ ' + this.numeral(notaFiscal.preco_fiscal).format('0,0.00'),
            'preco_fisico': 'R$ ' + this.numeral(notaFiscal.preco_fisico).format('0,0.00'),
          }
        });
      }
    },
    data(){
      return {
        negocioService: new NegocioService(),
        notasFiscais: null,
        columns: [
          {label: 'Nº NF', name:'numero', field:'numero', align: 'left',},
          {label: 'Peso Fiscal', name:'peso_fiscal', field:'peso_fiscal', align: 'left',},
          {label: 'Peso Físico', name:'peso_fisico', field:'peso_fisico', align: 'left',},
          {label: 'Preço Fiscal', name:'preco_fiscal', field:'preco_fiscal', align: 'left',},
          {label: 'Preço Físico', name:'preco_fisico', field:'preco_fisico', align: 'left',},
        ],
      }
    },
    methods:{
      listNotasFiscais(){
        this.negocioService.listNotasFiscaisByArmazem(this.negocioCultura.id, this.armazem.id).then(notasFiscais => {
          this.notasFiscais = notasFiscais;
        })
      },
      formataNumeroNotaFiscal(numero) {
        return this.$_.padStart(numero, 8, '0');
      },
    },
    mounted() {
      this.listNotasFiscais();
    }
  }
</script>

<style scoped>
  .q-table-container{
    box-shadow: unset;
    -webkit-box-shadow: unset;
  }
</style>

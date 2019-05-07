<template>
  <q-card inline style="width: 250px; padding: unset !important;" class="q-mx-sm q-mb-sm" >
    <q-card-title>{{armazem.nome}}</q-card-title>
    <q-card-main class="q-px-none">
      <q-list no-border highlight separator v-if="movimentos">
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

      </q-list>
      <div style="text-align: center" v-if="movimentos && totalPages > 1">
        <q-pagination style="display: inline-flex" boundary-links v-model="currentPage" :min="1" :max="totalPages" :max-pages="3" />
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";

  export default {
    name: "NegocioCulturaArmazemListItem",
    props:{
      armazem: Object,
      negocioCultura: Object,
    },
    computed:{
      totalPages(){
        return Math.ceil(this.movimentos.length/this.maxItens);
      },
      movimentosPaginated(){
        return this.movimentos.slice((this.currentPage - 1) * this.maxItens, this.maxItens * this.currentPage)
      },
    },
    data(){
      return {
        negocioService: new NegocioService(),
        currentPage: 1,
        movimentos: null,
        maxItens: 5,
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

</style>

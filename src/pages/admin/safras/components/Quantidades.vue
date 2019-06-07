<template>
  <div>
    <q-list no-border inset-separator class="q-pa-none">

      <!-- Colhido -->
      <template v-if="quantidades.numero_cargas > 0">
        <q-item>
          <q-item-side icon="mdi-scale" color="primary" />
          <q-item-main multiline>
            <q-item-tile label lines="2">
              {{status}} <q-btn dense round size="sm" flat icon="edit" @click="openChangeColheitaStatusModal" />
              <q-progress :percentage="peso_liquido_percentual" color="primary" height="10px" :stripe="quantidades.colhendo" :animate="quantidades.colhendo"/>
            </q-item-tile>
            <q-item-tile sublabel lines="1">
              <b>{{numeral(quantidades.peso_liquido).format('0,0')}}</b>
              {{unidadeMedida.plural}}
            </q-item-tile>
          </q-item-main>

          <q-item-side right>
            <q-item-tile stamp>
              {{numeral(quantidades.peso_liquido / quantidades.tamanho).format('0,0.00')}}
            </q-item-tile>
            <q-item-tile stamp>
              {{unidadeMedida.sigla}}/{{unidadeArea.sigla}}
            </q-item-tile>
          </q-item-side>

        </q-item>
      </template>

      <!-- ESTIMATIVA -->
      <q-item>
        <q-item-side icon="schedule" />
        <q-item-main multiline>
          <q-item-tile label lines="2">
            Estimativa
            <q-progress :percentage="estimativa_percentual" color="grey" height="10px"/>
          </q-item-tile>
          <q-item-tile sublabel lines="1">
            <b>{{numeral(quantidades.peso_estimativa).format('0,0')}}</b>
            {{unidadeMedida.plural}}
          </q-item-tile>
        </q-item-main>

        <q-item-side right>
          <q-item-tile stamp>
            {{numeral(quantidades.peso_estimativa / quantidades.tamanho).format('0,0.00')}}
          </q-item-tile>
          <q-item-tile stamp>
            {{unidadeMedida.sigla}}/{{unidadeArea.sigla}}
          </q-item-tile>
        </q-item-side>
      </q-item>

      <!-- NEGOCIADO -->
      <q-item v-if="showNegociado">
        <q-item-side icon="work" color="primary"/>
        <q-item-main multiline>
          <q-item-tile label lines="2">
            Negociado
            <!--<q-progress :percentage="peso_liquido_negociado_percentual" color="primary" height="10px"/>-->
          </q-item-tile>
          <q-item-tile sublabel lines="1">
            <b>{{numeral(quantidades.negociado).format('0,0')}}</b>
            {{unidadeMedida.plural}}
          </q-item-tile>
        </q-item-main>
      </q-item>

      <template v-if="quantidades.numero_cargas > 0">
        <!-- DESCONTO -->
        <q-item v-if="quantidades.peso_desconto>0">
          <q-item-side icon="mdi-delete" color="red" />
          <q-item-main>
            <q-item-tile sublabel>
              <b>{{numeral(quantidades.peso_desconto).format('0,0')}}</b>
              {{unidadeMedida.plural}} descontado no recebimento
            </q-item-tile>
          </q-item-main>
        </q-item>

        <!-- ESTIMATIVA_CARGA -->
        <q-item v-if="quantidades.peso_descarregando>0">
          <q-item-side icon="schedule" color="orange"/>
          <q-item-main>
            <q-item-tile sublabel>
              <b>{{numeral(quantidades.peso_descarregando).format('0,0')}}</b>  {{unidadeMedida.plural}} aproximadamente
              encima de caminhão aguardando descarga.
            </q-item-tile>
          </q-item-main>
        </q-item>

        <!-- CARGAS -->
        <q-item>
          <q-item-side icon="mdi-truck" color="indigo"/>
          <q-item-main>
            <q-item-tile sublabel>
              <b>{{numeral(quantidades.numero_cargas).format('0,0.0')}}</b> Cargas no total
              <template v-if="quantidades.numero_cargas_descarregando">
                (<b>{{numeral(quantidades.numero_cargas_descarregando).format('0,0.')}}</b> Descarregando)
              </template>
              <template v-if="quantidades.numero_cargas_carregando">
                (<b>{{numeral(quantidades.numero_cargas_carregando).format('0,0.')}}</b> Carregando)
              </template>
            </q-item-tile>
          </q-item-main>
        </q-item>

      </template>
    </q-list>

    <change-colheita-status-modal ref="changeColheitaStatusModal" />
  </div>
</template>
<script>
  import changeColheitaStatusModal from './modals/ChangeColheitaStatusModal';
  export default {
    name: "safra-quantidades",
    props: {
      safraCulturaId: Number,
      quantidades: Object,
      unidadeMedida: Object,
      unidadeArea: Object,
      showNegociado: {
        type: Boolean,
        default: true
      },
    },
    components:{
      changeColheitaStatusModal,
    },
    computed: {
      status(){
        let message = "Colheita ";
        if(this.quantidades.finalizado){
          message += "finalizada";
        } else {
          if (this.quantidades.colhendo) {
            message += "em andamento";
          } else {
            message += "ainda não começou";
          }
        }
        return message;
      },
      maior_peso(){
        return (this.quantidades.peso_estimativa > this.quantidades.peso_liquido)?this.quantidades.peso_estimativa:this.quantidades.peso_liquido;
      },
      peso_liquido_percentual(){
        return (this.quantidades.peso_liquido / this.maior_peso) * 100;
      },
      peso_liquido_negociado_percentual(){
        return (this.quantidades.negociado / this.maior_peso) * 100;
      },
      estimativa_percentual(){
        return (this.quantidades.peso_estimativa / this.maior_peso) * 100;
      },
    },
    methods:{
      openChangeColheitaStatusModal(){
        this.$refs.changeColheitaStatusModal.openModal(this.safraCulturaId);
      },
    }
  }
</script>

<template>
    <q-list  no-border highlight inset-separator>

      <!-- ESTIMATIVA -->
      <q-item>
        <q-item-side icon="schedule" />
        <q-item-main multiline>
          <q-item-tile label lines="2">
            Estimativa
            <q-progress :percentage="estimativa_percentual" color="grey" height="10px"/>
          </q-item-tile>
          <q-item-tile sublabel lines="1">
            <b>{{numeral(estimativa_total).format('0,0')}}</b>
            {{view_unidade_medida.plural}}
          </q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile stamp>
            {{numeral(estimativa_total / tamanho).format('0,0.00')}}
          </q-item-tile>
          <q-item-tile stamp>
            {{view_unidade_medida.sigla}}/{{view_unidade_area.sigla}}
          </q-item-tile>
        </q-item-side>
      </q-item>

      <template v-if="cargas > 0">

        <!-- Colhido -->
        <q-item>
          <q-item-side icon="mdi-scale" color="primary" />
          <q-item-main multiline>
            <q-item-tile label lines="2">
              Colheita
              <template v-if="finalizado">
                finalizada
              </template>
              <template v-else>
                <template v-if="cargas > 0">
                  em andamento
                </template>
                <template v-else>
                  ainda não começou
                </template>
              </template>
              <q-progress :percentage="peso_liquido_percentual" color="primary" height="10px" :stripe="colhendo" :animate="colhendo"/>
            </q-item-tile>
            <q-item-tile sublabel lines="1">
              <b>{{numeral(peso_liquido).format('0,0')}}</b>
              {{view_unidade_medida.plural}} <br />
            </q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-item-tile stamp>
              {{numeral(peso_liquido / tamanho).format('0,0.00')}}
            </q-item-tile>
            <q-item-tile stamp>
              {{view_unidade_medida.sigla}}/{{view_unidade_area.sigla}}
            </q-item-tile>
          </q-item-side>
        </q-item>

        <!-- DESCONTO -->
        <q-item v-if="peso_desconto>0">
          <q-item-side icon="mdi-delete" color="red" />
          <q-item-main>
            <q-item-tile sublabel>
              <b>{{numeral(peso_desconto).format('0,0')}}</b>
              {{view_unidade_medida.plural}} de desconto no recebimento
            </q-item-tile>
          </q-item-main>
        </q-item>

        <!-- ESTIMATIVA_CARGA -->
        <q-item v-if="estimativa_carga>0">
          <q-item-side icon="schedule" color="orange"/>
          <q-item-main>
            <q-item-tile sublabel>
              <b>{{numeral(estimativa_carga).format('0,0')}}</b>  {{view_unidade_medida.plural}} aproximadamente
              encima de caminhão aguardando descarga.
            </q-item-tile>
          </q-item-main>
        </q-item>

        <!-- CARGAS -->
        <q-item>
          <q-item-side icon="mdi-truck" color="indigo"/>
          <q-item-main>
            <q-item-tile sublabel>
              <b>{{numeral(cargas).format('0,0.')}}</b> Cargas
            </q-item-tile>
          </q-item-main>
        </q-item>

      </template>


      <!--
      <div class="col-12">


        <div class="q-mb-md">
        </div>

        <div class="q-mb-md">
          <b>{{numeral(cargas).format('0,0')}}</b> Cargas feitas
        </div>

        <div class="q-mb-md">
        </div>

        <br />
        {{ numeral(cargas).format('0,0') }} Cargas
        <br />
        {{ numeral(estimativa_total).format('0,0') }} {{view_unidade_medida.plural}}
        <br />
        {{ finalizado }}
        <br />
      </div> -->

    </q-list>
</template>
<script>
export default {
  name: "safra-quantidades",
  props: {
    tamanho: Number,
    estimativa_total: Number,
    peso_liquido: Number,
    peso_desconto: Number,
    estimativa_carga: Number,
    cargas: Number,
    view_unidade_medida: Object,
    view_unidade_area: Object,
    finalizado: Boolean,
  },
  computed: {
    maior_peso: function () {
      return (this.estimativa_total > this.peso_liquido)?this.estimativa_total:this.peso_liquido;
    },
    peso_liquido_percentual: function () {
      return (this.peso_liquido / this.maior_peso) * 100;
    },
    estimativa_percentual: function () {
      return (this.estimativa_total / this.maior_peso) * 100;
    },
    colhendo: function () {
      return (this.cargas>0) && (!this.finalizado)
    }
  }
}
</script>

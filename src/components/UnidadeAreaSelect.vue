<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">
    <q-select
      v-model="model.value"
      :float-label="label"
      :options="unidadeAreaOptions"
      v-on:input="clearErrorMessage()"
      @click.native="listUnidadesArea"
    />
    <div class="q-field-bottom row no-wrap" style="height: 22px">
      <div class="q-field-error col" v-if="model.errorMessage != null" >{{model.errorMessage}}</div>
    </div>
  </q-field>
</template>
<script>
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import { filter } from 'quasar'
  export default {
    name: "unidade-area-select",
    props: {
      label: String,
      model: Object
    },
    data: function () {
      return {
        unidadeAreaOptions: [],
        clearErrorMessage: function () {
          this.model.errorMessage = null
        }
      }
    },
    methods: {
      listUnidadesArea: function(){
        unidadeMedidaService.listUnidadesArea().then(response => {
          this.unidadeAreaOptions = response.data.map(unidade => {
            return {
              value: unidade.id,
              label: unidade.nome +', '+ unidade.sigla,
              sublabel: unidade.descricao
            }
          })
        })
      }
    }
  }
</script>

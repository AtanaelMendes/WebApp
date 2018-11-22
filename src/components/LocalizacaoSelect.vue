<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">
    <q-select
      v-model="model.value"
      :float-label="label"
      :options="localizacaoOptions"
      v-on:input="clearErrorMessage()"
      @click.native="buscaLocalizacao"
    />
    <div class="q-field-bottom row no-wrap" style="height: 22px">
      <div class="q-field-error col" v-if="model.errorMessage != null" >{{model.errorMessage}}</div>
    </div>
  </q-field>
</template>
<script>
  import localizacaoService from 'assets/js/service/localizacao/LocalizacaoService'
  import { filter } from 'quasar'
  export default {
    name: "cidade-autocomplete",
    props: {
      label: String,
      model: Object
    },
    data: function () {
      return {
        localizacaoOptions: [],
        clearErrorMessage: function () {
          this.model.errorMessage = null
        }
      }
    },
    methods: {
      buscaLocalizacao: function(){
        localizacaoService.listLocalizacoesByProdutor(localStorage.getItem('account.produtor_id')).then(response => {
          this.localizacaoOptions = response.data.map(local => {
            return {
              value: local.id,
              label: local.endereco +', '+ local.numero,
              sublabel: local.bairro +', '+ local.cidade.nome +'-'+ local.cidade.estado.sigla
            }
          })
        })
      }
    }
  }
</script>

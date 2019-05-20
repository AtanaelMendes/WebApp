<template>
  <q-field :error="model.errorMessage != null" :error-label="model.errorMessage">
    <q-select
      :options="options"
      :float-label="label"
      v-model="model.value"
      v-on:input="clearErrorMessage()"
    />
  </q-field>
</template>
<script>
  import { filter } from 'quasar'
  export default {
    name: "estado-sigla-select",
    props: {
      label: String,
      model: Object
    },
    data: function () {
      return {
        clearErrorMessage: function () {
          this.model.errorMessage = null
        },
        options: [
          {
            label: 'AL',
            sublabel: 'Alagoas',
            value: 'AL'
          },
          {
            label: 'AC',
            sublabel: 'Acre',
            value: 'AC'
          },
          {
            label: 'AM',
            sublabel: 'Amazonas',
            value: 'AM'
          },
          {
            label: 'AP',
            sublabel: 'Amapá',
            value: 'AP'
          },
          {
            label: 'BA',
            sublabel: 'Bahia',
            value: 'BA'
          },
          {
            label: 'CE',
            sublabel: 'Ceará',
            value: 'CE'
          },
          {
            label: 'DF',
            sublabel: 'Distrito Federal',
            value: 'DF'
          },
          {
            label: 'ES',
            sublabel: 'Espírito Santo',
            value: 'ES'
          },
          {
            label: 'GO',
            sublabel: 'Goiás',
            value: 'GO'
          },
          {
            label: 'MG',
            sublabel: 'Minas Gerais',
            value: 'MG'
          },
          {
            label: 'MT',
            sublabel: 'Mato Grosso',
            value: 'MT'
          },
          {
            label: 'MS',
            sublabel: 'Mato Grosso do Sul',
            value: 'MS'
          },
          {
            label: 'MA',
            sublabel: 'Maranhão',
            value: 'MA'
          },
          {
            label: 'PE',
            sublabel: 'Pernambuco',
            value: 'PE'
          },
          {
            label: 'PI',
            sublabel: 'Piauí',
            value: 'PI'
          },
          {
            label: 'PR',
            sublabel: 'Paraná',
            value: 'PR'
          },
          {
            label: 'PB',
            sublabel: 'Paraíba',
            value: 'PB'
          },
          {
            label: 'PA',
            sublabel: 'Pará',
            value: 'PA'
          },
          {
            label: 'RR',
            sublabel: 'Roraima',
            value: 'RR'
          },
          {
            label: 'RO',
            sublabel: 'Rondônia',
            value: 'RO'
          },
          {
            label: 'RS',
            sublabel: ' Rio Grande do Sul',
            value: 'RS'
          },
          {
            label: 'RN',
            sublabel: 'Rio Grande do Norte',
            value: 'RN'
          },
          {
            label: 'RJ',
            sublabel: 'Rio de Janeiro',
            value: 'RJ'
          },
          {
            label: 'SC',
            sublabel: 'Santa Catarina',
            value: 'SC'
          },
          {
            label: 'SE',
            sublabel: 'Sergipe',
            value: 'SE'
          },
          {
            label: 'SP',
            sublabel: 'São Paulo',
            value: 'SP'
          },
          {
            label: 'TO',
            sublabel: 'Tocantins',
            value: 'TO'
          },
        ]
      }
    }
  }
</script>

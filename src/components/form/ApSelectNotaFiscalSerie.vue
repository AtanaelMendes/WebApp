<template>
  <q-select

    :value="value"
    @input="handleInput"
    :options="options"

    :float-label="floatLabel"
    :filter="filter"
    :clearable="clearable"

    :multiple="multiple"
    :toggle="toggle"
    :chips="chips"

  />
</template>
<script>

import NotaFiscalSerieService from '../../assets/js/service/notaFiscal/NotaFiscalSerieService'

export default {
  name: "ap-select-nota-fiscal-serie",
  props: {
    value: {
      type: Number,
      default: null
    },
    floatLabel: {
      type: String,
      default: 'Série'
    },
    filter: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Boolean,
      default: true
    },
    chips: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      notaFiscalSerieService: new NotaFiscalSerieService(),
      options: [],
    }
  },
  methods:{
    loadOptions() {
      this.notaFiscalSerieService.options().then(response => {
        this.options = response.data;
      }).catch(error => {
        this.$q.notify({type: 'negative', message: 'Erro ao carregar opções de Séries de Notas Fiscais!'});
      })
    },
    handleInput(value) {
      console.log(value);
      this.$emit('input', value)
    },
  },
  mounted(){
    this.loadOptions();
  }
}
</script>

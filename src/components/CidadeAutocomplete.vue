<template>
  <q-input :float-label="label" v-model="value.label" @blur="checkCidadeInput">
    <q-autocomplete @search="search" @selected="selected" :min-characters="3" :debounce="500" value-field="label"/>
  </q-input>
</template>
<script>
  import CidadeService from 'assets/js/service/localizacao/CidadeService'
  import { filter } from 'quasar'
  export default {
    name: "cidade-autocomplete",
    props: {
      label: String,
      value: String
    },
    data: function () {
      return {
        // cidadeTerms: '',
        tempCidadeList: [],
      }
    },
    methods: {
      checkCidadeInput(){
        let result = this.tempCidadeList.filter(item => ('' + item['label']).toLowerCase() === this.value.toLowerCase());
        if(result.length === 0){
          this.value = '';
          this.$emit('input', null)
        }
      },
      search (terms, done) {
        CidadeService.searchCidade(terms).then(response => {
          this.tempCidadeList = response;
          done(response)
        });
      },
      selected (item) {
        this.$emit('input', item)
      },
    }
  }
</script>

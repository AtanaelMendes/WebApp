<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">
    <!--<q-input v-on:input="clearErrorMessage()" :float-label="label" v-model="model.value" @blur="checkCidadeInput">-->
    <q-input v-on:input="clearErrorMessage()" :float-label="label" v-model="terms" @blur="checkCidadeInput">
      <q-autocomplete @search="search" @selected="selected" :min-characters="3" :debounce="500" value-field="label"/>
    </q-input>
    <div class="q-field-bottom row no-wrap" style="height: 22px">
      <div class="q-field-error col" v-if="model.errorMessage != null" >{{model.errorMessage}}</div>
    </div>
  </q-field>
</template>
<script>
  import { filter } from 'quasar'
  import CidadeService from "../assets/js/service/localizacao/CidadeService";
  export default {
    name: "cidade-autocomplete",
    props: {
      label: String,
      model: Object,
      terms: String,
    },
    data: function () {
      return {
        cidadeService: new CidadeService(),
        tempCidadeList: [],
        clearErrorMessage: function () {
          this.model.errorMessage = null
        }
      }
    },
    methods: {
      checkCidadeInput(){
        let result = this.tempCidadeList.filter(item => ('' + item['label']).toLowerCase() === this.terms.toLowerCase());
        if(result.length === 0){
          this.terms = '';
          this.$emit('input', '')
          this.clearErrorMessage();
        }else{
          this.$emit('input', result[0])
        }
      },
      search (terms, done) {
        this.cidadeService.searchCidade(terms).then(cidades => {
          this.tempCidadeList = cidades;
          done(cidades)
        });
      },
      selected (item) {
        this.$emit('input', item)
      },
    }
  }
</script>

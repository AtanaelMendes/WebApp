<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">
    <q-input v-on:input="clearErrorMessage()" :float-label="label" v-model="model.label" @blur="checkCidadeInput">
      <q-autocomplete @search="search" @selected="selected" :min-characters="3" :debounce="500" value-field="label"/>
    </q-input>
    <div class="q-field-bottom row no-wrap" style="height: 22px">
      <div class="q-field-error col" v-if="model.errorMessage != null" >{{model.errorMessage}}</div>
    </div>
  </q-field>
</template>
<script>
  import CidadeService from 'assets/js/service/localizacao/CidadeService'
  import { filter } from 'quasar'
  export default {
    name: "cidade-autocomplete",
    props: {
      label: String,
      model: {
        value: null,
        errorMessage: null,
        id: null,
        label: null,
        sublabel: null
      }
    },
    data: function () {
      return {
        tempCidadeList: [],
        clearErrorMessage: function () {
          this.model.errorMessage = null
        }
      }
    },
    methods: {
      checkCidadeInput(){
        let result = this.tempCidadeList.filter(item => ('' + item['label']).toLowerCase() === this.model.label.toLowerCase());
        if(result.length === 0){
          this.model.label = '';
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

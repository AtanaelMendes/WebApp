<template>
  <q-field :error="model.errorMessage != null" class="q-mb-sm">

    <q-input v-model="cidadeTerms" placeholder="Cidade" :after="[{icon:'arrow_drop_down'}]" @blur="checkCidadeInput">
      <q-autocomplete @search="search" @selected="setCidade" :min-characters="0" :debounce="500" value-field="label"/>
    </q-input>

    <div class="q-field-bottom row no-wrap" style="height: 22px">
      <div class="q-field-error col" v-if="model.errorMessage != null" >{{model.errorMessage}}</div>
    </div>
  </q-field>
</template>

<script>
  export default {
    name: "cidade-autocomplete",
    // props: {
    //   model: Object,
    //   label: String,
    // },
    data: function () {
      return {
        cidadeTerms: '',
        tempCidadeList: [],
        clearErrorMessage: function () {
          this.model.errorMessage = null
        }
      }
    },
    methods: {
      checkCidadeInput(){
        let result = filter(this.cidadeTerms, {field: 'label', list: this.tempCidadeList});

        if(result.length === 0){
          this.cidadeTerms = "";
          this.pessoa.cidade.value = null;
        }else{
          this.setCidade(result[0]);
        }
      },
      setCidade (item) {
        this.pessoa.cidade.value = item.id;
        this.pessoa.cidade.errorMessage = null;
      },
      search (terms, done) {
        CidadeService.searchCidade(terms).then(response => {
          this.tempCidadeList = response;
          done(response)
        });
      },
    }
  }
</script>

<style>
</style>

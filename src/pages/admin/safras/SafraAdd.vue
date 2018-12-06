<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Safra">
      <q-btn slot="action_itens" flat dense round icon="done" @click="saveSafra()"/>
    </toolbar>

    <div class="row q-ma-md">
      <div class="col-12">

        <div class="row">

          <!--ANO INICIO-->
          <div class="col-3">
            <q-field :error="safra.inicio.errorMessage != null" class="q-mb-sm">
              <q-select float-label="Inicio" v-model="safra.inicio.value" :options="yearsList" filter @input="setAnoInicio"/>
              <div class="q-field-bottom row no-wrap">
                <div class="q-field-error col" v-if="safra.inicio.errorMessage != null" >{{safra.inicio.errorMessage}}</div>
              </div>
            </q-field>
          </div>

          <!--ANO FIM-->
          <div class="col-3">
            <q-item >
              <q-item-main>
                <q-item-tile sublabel class="q-caption">Fim</q-item-tile>
                <q-item-tile sublabel>
                  <q-btn-toggle
                    @input="setAnoFim"
                    class="custom-toggle"
                    toggle-color="primary"
                    v-model="selectedAnoFim"
                    :options="[{label: safra.inicio.value, value: safra.inicio.value},
                               {label: parseInt(safra.inicio.value) + 1, value: (parseInt(safra.inicio.value) + 1).toString()}
                              ]"
                  />
                </q-item-tile>
              </q-item-main>
            </q-item>
          </div>
        </div>

        <!--SAFRA TIPO-->
        <div class="row">
          <div class="col-3">
            <q-select v-model="safra.safrinha.value"  float-label="Safra" :options="safraType" />
          </div>
        </div>

      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import safra from 'assets/js/model/safra/Safra'
  import safraService from 'assets/js/service/SafraService'
  import { filter } from 'quasar'
  export default {
    name: "safra-add",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data(){
      return {
        safra: new safra(),
        selectedAnoFim: null,
        yearsList: [],
        safraType: [
          {
            value: true,
            label: 'Safrinha'
          },
          {
            value: false,
            label: 'Safra'
          }
        ]
      }
    },
    methods:{
      getCurrentYear: function(){
        return new Date().getFullYear().toString();
      },
      makeYearsList: function(referenceYear){
        this.yearsList = [];
        var listSize = 8;
        var startYear = referenceYear - (listSize / 2);
        for(var i = startYear; i < (startYear + listSize); i++){
          this.yearsList.push({'label': i.toString(), 'value': i.toString()});
        }
      },
      saveSafra: function(){
        if(!this.safra.isValid()){
          return;
        }
        safraService.saveSafra(this.safra.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Safra criada com sucesso'});
            this.$router.push({name: 'safras'});
            this.$root.$emit('refreshSafraList')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      setAnoInicio: function(value){
        this.safra.fim.value = value.toString();
        this.selectedAnoFim = value.toString();
      },
      setAnoFim: function(value){
        this.safra.fim.value = value.toString();
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted () {
      this.makeYearsList(this.getCurrentYear());
      this.safra.inicio.value = this.getCurrentYear();
      this.safra.fim.value = this.getCurrentYear();
      this.selectedAnoFim = this.safra.fim.value.toString();
    },
  }
</script>

<style >
</style>

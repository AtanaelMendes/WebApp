<template>
  <q-modal v-model="isModalOpened" class="new-safra-modal" minimized @hide="closeModal" :content-css="{minWidth: '300px'}">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header">
        Nova Safra
      </div>

      <div class="q-pa-md">
        <div class="" align="center">
          <q-btn-toggle
            v-model="safra.safrinha.value"
            toggle-color="primary"
            :options="[ {label: 'Safra', value: false}, {label: 'Safrinha', value: true},]"
          />
        </div>

        <div class="row">
          <!--ANO INICIO-->
          <div class="col-6">
            <q-field :error="safra.inicio.errorMessage != null" class="q-mb-sm">
              <q-select float-label="Inicio" v-model="safra.inicio.value" :options="yearsList" filter @input="setAnoInicio"/>
              <div class="q-field-bottom row no-wrap">
                <div class="q-field-error col" v-if="safra.inicio.errorMessage != null" >{{safra.inicio.errorMessage}}</div>
              </div>
            </q-field>
          </div>

          <!--ANO FIM-->
          <div class="col-6">
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

      </div>

      <div class="q-pa-md text-right" slot="footer">
        <q-btn @click.native="closeModal" color="primary" label="Cancelar" class="q-mr-xs"/>
        <q-btn @click.native="saveSafra" label="Salvar" color="primary" v-if="!isEditMode"/>
        <q-btn @click.native="updateSafra" label="Atualizar" color="primary" v-if="isEditMode"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import Safra from '../../assets/js/model/safra/Safra'
  import SafraService from "../../assets/js/service/safra/SafraService";

  export default {
    name: "NewSafraModal",
    data(){
      return {
        isModalOpened: false,
        isEditMode: false,
        safraService: new SafraService(),
        safraId: null,
        safra: new Safra(),
        yearsList: [],
        selectedAnoFim: null,
      }
    },
    methods: {
      openModal(safra){
        this.isModalOpened = true;
        this.makeYearsList(this.getCurrentYear());

        if(safra){
          this.safraId = safra.id;
          this.isEditMode = true;
          this.fillSafraForm(safra)
        }else{
          this.isEditMode = false;
          this.safra.inicio.value = this.getCurrentYear();
          this.safra.fim.value = this.getCurrentYear();
          this.selectedAnoFim = this.safra.fim.value.toString();
        }
      },
      closeModal(){
        this.isModalOpened = false;
      },
      setAnoInicio(value){
        this.safra.fim.value = value.toString();
        this.selectedAnoFim = value.toString();
      },
      setAnoFim(value){
        this.safra.fim.value = value.toString();
      },
      getCurrentYear(){
        return new Date().getFullYear().toString();
      },
      makeYearsList(referenceYear){
        this.yearsList = [];
        var listSize = 8;
        var startYear = referenceYear - (listSize / 2);
        for(var i = startYear; i < (startYear + listSize); i++){
          this.yearsList.push({'label': i.toString(), 'value': i.toString()});
        }
      },
      saveSafra(){
        if(!this.safra.isValid()){
          return;
        }
        this.$q.loading.show();
        this.safraService.saveSafra(this.safra.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Safra criada com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshSafrasList');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
      updateSafra(){
        if(!this.safra.isValid()){
          return;
        }
        this.$q.loading.show();
        this.safraService.updateSafra(this.safraId, this.safra.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Safra atualizada com sucesso!'});
          this.closeModal();
          this.$root.$emit('refreshSafrasList');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
      fillSafraForm(data){
        this.safra.inicio.value = data.inicio.toString();
        this.safra.fim.value = data.fim.toString();
        this.selectedAnoFim = data.fim.toString();
        this.safra.safrinha.value = data.is_safrinha;
      },
    }
  }
</script>

<style>
  .new-safra-modal .q-layout-header{
    box-shadow: none;
  }

  .new-safra-modal .q-layout-footer{
    box-shadow: none;
  }
</style>

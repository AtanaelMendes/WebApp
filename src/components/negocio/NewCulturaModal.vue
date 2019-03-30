<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="safraCultura" ref="stepperSafraCultura" contractable color="positive" v-model="currentStep" class="no-shadow" >

      <!--PASSO 1 ESCOLHER SAFRA-->
      <q-step default title="Safra" name="safra">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="safraCultura in safraCulturas" :key="safraCultura.id">
            <q-card @click.native="selectSafraCultura(safraCultura)">
              <q-card-media overlay-position="full">

                <ap-image size="400x250" :file-name="safraCultura.cultura.image_file_name" />

                <q-card-title slot="overlay">
                  <div class="row">
                    <div class="col-8">
                      {{safraCultura.cultura.nome}}
                      {{safraCultura.safra.ano_inicio}}-{{safraCultura.safra.ano_fim}}
                    </div>
                    <div class="col-4" align="end">
                      <q-icon align="end" name="check_circle" size="30px" color="positive" v-if="cultura.safraCulturaId.value == safraCultura.id"/>
                    </div>
                  </div>




                </q-card-title>
              </q-card-media>
            </q-card>
          </div>
          <div v-if="!safraCulturas" class="no-result col-12">
            <ap-no-results />
          </div>
        </div>
      </q-step>

      <!--PASSO 2 ESCOLHER PAGAR RECEBER -->
      <q-step title="Pagar/Receber" name="pagarReceber">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">

          <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">
            <p class="q-title text-center">Você vai</p>
            <q-field>
              <q-option-group type="radio" color="secondary" v-model="cultura.isPagar.value"
                              :options="[{ label: 'Pagar', value: true },{ label: 'Receber', value: false}]"/>
            </q-field>

          </div>
        </div>

      </q-step>

      <!--PASSO 3 INFORMAR QUANTIDADE -->
      <q-step title="Quantidade" name="quantidade">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <div class="row justify-center">
              <div class="col-12" align="center">
                Foi definida uma Quantidade?
                <q-btn-toggle
                  v-model="hasQuantidadeDefined"
                  toggle-color="primary"
                  :options="[{label: 'Sim', value: true},{label: 'Não', value: false}]"
                />
              </div>
              <div class="col-8">
                <custom-input-text
                  type="number"
                  label="Quantidade"
                  :disable="!hasQuantidadeDefined"
                  :model="cultura.quantidade"
                />
                <q-select
                  :disable="!hasQuantidadeDefined"
                  float-label="Unidade de medida"
                  v-model="cultura.unidadeMedidaId.value"
                  :options="parsedUnidades(unidadesMedida)"
                />
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 4 INFORMAR PRAZO -->
      <q-step title="Prazo" name="prazo">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

            <div class="row justify-center">
              <div class="col-12" align="center">
                Foi definida um prazo de entrega?
                <q-btn-toggle
                  v-model="hasPrazoDefined"
                  toggle-color="primary"
                  :options="[{label: 'Sim', value: true},{label: 'Não', value: false}]"
                />
              </div>
              <div class="col-8">
                <q-datetime v-model="cultura.prazoEntregaInicial.value" type="date"
                            float-label="Prazo inicial" :disable="!hasPrazoDefined"
                            align="center" modal format="DD/MM/YYYY"/>

                <q-datetime v-model="cultura.prazoEntregaFinal.value" type="date"
                            float-label="Prazo final" :disable="!hasPrazoDefined"
                            align="center" modal format="DD/MM/YYYY"/>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 5 INFORMAR CLASSIFICACAO -->
      <q-step title="Classificação" name="classificacao">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

            <div class="row justify-center">
              <div class="col-12 q-mb-sm" align="center">
                Qual foi o padrão de classificação negociado?
              </div>
              <div class="col-8" v-for="(classificacao, index) in cultura.classificacoes" :key="classificacao.id">
                <div class="row">
                  <div class="col-7 self-end">
                    {{classificacao.nome}}
                  </div>
                  <div class="col-4">
                    <q-input suffix="%" align="center" type="number" v-model="classificacao.tolerancia"/>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 6 INFORMAR LOCAIS DE ENTREGA -->
      <q-step title="Entrega" name="entrega">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

            <div class="row justify-center">
              <div class="col-12" align="center">
                Quais os locais negociados para a entrega da produção?
              </div>
              <div class="col-12">
                <q-list no-border separator link>
                  <q-item v-for="(armazem, index) in armazens" :key="armazem.id">
                    <q-item-main @click.native="toggleArmazem(armazem)" class="row">
                      <div class="col-2">
                        <q-btn icon="done" size="8px" color="positive" round v-if="isArmazemSelected(armazem)"/>
                      </div>
                      <div class="col-10">{{armazem.nome}}</div>
                      <div class="col-10 offset-2 q-caption text-faded">{{armazem.endereco}}</div>
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>

          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="currentStep != 'entrega' "/>
      <q-btn label="salvar" color="primary" @click="saveAttachCultura" :disable="selectedArmazens.length <= 0" v-if="currentStep == 'entrega' "/>
    </q-page-sticky>
  </q-modal>
</template>

<script>
  import SafraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import Cultura from 'assets/js/model/negocio/Cultura'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import NegocioService from "assets/js/service/negocio/NegocioService";
  import ArmazemService from "assets/js/service/armazem/ArmazemService";
  import UnidadeMedidaService from "assets/js/service/UnidadeMedidaService";
  import CulturaClassificacaoService from "assets/js/service/cultura/CulturaClassificacaoService";
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'

  export default {
    name: "NewCulturaModal",
    components:{
      apImage,
      apNoResults,
      customInputText,
      customInputDatetime
    },
    watch: {
      hasQuantidadeDefined: function(value){
        if(!value){
          this.cultura.quantidade.value = null;
          this.cultura.unidadeMedidaId.value = null;
        }
      },
      hasPrazoDefined: function(value){
        if(!value){
          this.cultura.prazoEntregaInicial.value = null;
          this.cultura.prazoEntregaFinal.value = null;
        }
      }
    },
    data(){
      return{
        culturaClassificacaoService: new CulturaClassificacaoService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        safraCulturaService: new SafraCulturaService(),
        armazemService: new ArmazemService(),
        negocioService: new NegocioService(),
        isModalOpened: false,
        cultura: new Cultura(),
        negocio: null,
        currentStep: 'safra',
        safraCulturas: [],
        hasQuantidadeDefined: false,
        hasPrazoDefined: false,
        selectedArmazens: [],
        unidadesMedida: [],
        armazens: [],
      }
    },
    methods: {
      openModal: async function(negocio){
        this.isModalOpened = true;
        this.listSafraCulturas();
        this.getUnidadesMedida();
        this.cultura = new Cultura();
        this.negocio = negocio;
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.currentStep = 'safra';
        this.clearFields();
        this.$emit('modal-closed')
      },
      clearFields: function(){
        this.cultura = new Cultura();
        this.safraCulturas = [];
        this.hasQuantidadeDefined = false;
        this.hasPrazoDefined = false;
        this.selectedArmazens = [];
        this.unidadesMedida = [];
        this.armazens = [];
      },
      saveAttachCultura: function(){
        this.negocioService.saveAttachCultura(this.negocio.id, this.cultura.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Safra cultura vinculada com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshNegocio')
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      goToNextStep(){
        if(this.currentStep === 'classificacao'){
          this.listArmazens();
        }

        this.$refs.stepperSafraCultura.next();
      },
      selectSafraCultura: function(safraCultura){
        if(this.cultura.safraCulturaId.value === safraCultura.id){
          this.cultura.safraCulturaId.value = null;
          this.cultura.unidadeMedidaId.value = null;
        }else{
          this.cultura.safraCulturaId.value = safraCultura.id;
          this.cultura.unidadeMedidaId.value = safraCultura.cultura.default_unidade_medida_id;
          this.goToNextStep();
          this.listClassificacoesByCultura(safraCultura.cultura.id)
        }
      },
      getUnidadesMedida:function(){
        this.unidadeMedidaService.listUnidadesMedida().then(unidades => {
          this.unidadesMedida = unidades;
        })
      },
      toggleArmazem: function(armazem){
        let existedArmazem = this.selectedArmazens.filter(function(item){
          return item.id === armazem.id;
        })[0];

        if(!existedArmazem){
          this.selectedArmazens.push(armazem);
          this.cultura.armazens = this.selectedArmazens;
        }else{
          let mappedList = this.selectedArmazens.map(function(item){return item.id;});
          let position = mappedList.indexOf(armazem.id);
          this.selectedArmazens.splice(position, 1);
          this.cultura.armazens = this.selectedArmazens;
        }
      },
      isArmazemSelected: function(armazem){
        let value = this.selectedArmazens.filter(function(item){return item.id === armazem.id;}) == 0;
        return !value
      },
      parsedUnidades: function(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome,
            value: unidade.id
          }
        })
      },
      isNextStepEnabled: function(){
        if(this.cultura.safraCulturaId.value == null && this.currentStep === 'safra'){
          return true
        }
        if(this.cultura.isPagar.value == null && this.currentStep === 'pagarReceber'){
          return true
        }
        if(this.hasQuantidadeDefined === true && this.currentStep === 'quantidade'){
          if(this.cultura.quantidade.value == null || this.cultura.unidadeMedidaId.value == null){
            return true
          }
        }
        if(this.hasPrazoDefined === true && this.currentStep === 'prazo'){
          if(this.cultura.prazoEntregaInicial.value == null || this.cultura.prazoEntregaFinal.value == null){
            return true;
          }
        }
        return false;
      },
      listSafraCulturas(){
        this.safraCulturaService.listSafraCulturas().then(response => {
          this.safraCulturas = response;
        })
      },
      listClassificacoesByCultura(cultura_id){
        this.culturaClassificacaoService.listClassificacoesByCultura(cultura_id).then(response => {
          this.cultura.classificacoes = response;
        })
      },
      listArmazens(){
        this.armazemService.listArmazens().then(response => {
          this.armazens = response;
        })
      }
    },
  }
</script>

<style scoped>

</style>

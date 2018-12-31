<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="safraCultura" ref="stepperSafraCultura" contractable color="positive" v-model="currentStep" class="no-shadow" >

      <!--PASSO 1 ESCOLHER SAFRA-->
      <q-step default title="Safra" name="safra">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="safraCultura in safraCulturas" :key="safraCultura.id">
            <q-card @click.native="selectSafraCultura(safraCultura)">
              <q-card-media overlay-position="full">

                <img src="assets/images/icon-no-image.svg" v-if="!safraCultura.cultura.image"/>
                <img :src="safraCultura.cultura.image" v-if="safraCultura.cultura.image"/>

                <q-card-title slot="overlay" align="end" v-if="cultura.safraCulturaId.value == safraCultura.id">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>
              <q-card-main>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">{{safraCultura.cultura.nome}}</div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">{{safraCultura.safra.ano_inicio}}-{{safraCultura.safra.ano_fim}}</div>
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </q-step>

      <!--PASSO 2 ESCOLHER PAGAR RECEBER -->
      <q-step title="Pagar/Receber" name="pagarReceber">

        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">

            <q-field helper=" " label="Você vai">
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
                <custom-input-datetime
                  type="date"
                  :disable="!hasPrazoDefined"
                  label="Prazo inicial"
                  :model="cultura.prazoEntregaInicial"
                />
                <custom-input-datetime
                  type="date"
                  :disable="!hasPrazoDefined"
                  label="Prazo final"
                  :model="cultura.prazoEntregaFinal"
                />
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
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import culturaClassificacaoService from 'assets/js/service/cultura/CulturaClassificacaoService'
  import armazemService from 'assets/js/service/localizacao/ArmazemService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import Cultura from 'assets/js/model/negocio/Cultura'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'

  export default {
    name: "NewCulturaModal",
    components:{
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
      openModal: function(negocio){
        this.isModalOpened = true;
        this.listSafraCulturas();
        this.getUnidadesMedida();
        this.cultura = new Cultura();
        this.negocio = negocio;
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.currentStep = 'safra';
        this.$emit('modal-closed')
      },
      saveAttachCultura: function(){
        negocioService.saveAttachCultura(this.negocio.id, this.cultura.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Safra cultura vinculada com sucesso'});
            this.closeModal();
            this.$router.go(-1);
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      goToNextStep(){
        if(this.currentStep === 'classificacao'){
          this.listArmazensByProdutor();
        }

        this.$refs.stepperSafraCultura.next();
      },
      selectSafraCultura: function(safraCultura){
        if(this.cultura.safraCulturaId.value === safraCultura.id){
          this.cultura.safraCulturaId.value = null;
        }else{
          this.cultura.safraCulturaId.value = safraCultura.id;
          this.goToNextStep();
          this.listClassificacoesByCultura(safraCultura.cultura.id)
        }
      },
      getUnidadesMedida:function(){
        unidadeMedidaService.listUnidadesMedida().then(response => {
          this.unidadesMedida = response.data;
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
        safraCulturaService.listSafraCulturas().then(response => {
          this.safraCulturas = response.data;
        })
      },
      listClassificacoesByCultura(cultura_id){
        culturaClassificacaoService.listClassificacoesByCultura(cultura_id).then(response => {
          this.cultura.classificacoes = response.data;
        })
      },
      listArmazensByProdutor(){
        armazemService.listArmazensByProdutor().then(response => {
          this.armazens = response.data;
        })
      }
    },
  }
</script>

<style scoped>

</style>

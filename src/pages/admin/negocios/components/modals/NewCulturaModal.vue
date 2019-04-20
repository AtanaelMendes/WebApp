<template>
  <ap-modal ref="newCulturaModal" title="Nova Cultura" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovaCultura" @slide-trigger="setStepperIndex">
      <!--PASSO 1 ESCOLHER SAFRA-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="safraCulturas">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione uma safra</span>
          </div>
          <template v-if="$q.screen.gt.xs">
            <div class="q-px-lg q-py-sm">
              <div class="row gutter-sm">
                <div class="col-xs-6 " v-for="safraCultura in safraCulturas" :key="safraCultura.id">
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
              </div>
            </div>
          </template>

          <q-list no-border separator style="width: 100%" link v-if="$q.screen.lt.sm">
            <q-item v-for="safraCultura in safraCulturas" :key="safraCultura.id" @click.native="selectSafraCultura(safraCultura)">
              <q-item-side>
                <q-item-tile style="width:70px">
                  <ap-image size="200x125" :file-name="safraCultura.cultura.image_file_name" />
                </q-item-tile>
              </q-item-side>
              <q-item-main>
                <q-item-tile label>
                  {{safraCultura.cultura.nome}}
                  {{safraCultura.safra.ano_inicio}}-{{safraCultura.safra.ano_fim}}
                </q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-btn v-if="cultura.safraCulturaId.value == safraCultura.id" icon="done" color="positive" size="8px" round dense/>
              </q-item-side>
            </q-item>
          </q-list>

          <div v-if="safraCulturas.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhuma cultura encontrada.</span>
          </div>
        </template>
      </q-carousel-slide>

      <!--PASSO 2 ESCOLHER PAGAR RECEBER-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Você vai</span>
        </div>

        <div class="q-px-lg q-py-sm" style="text-align: center">

          <q-card style="width: 110px" class="pagar-receber-card cursor-pointer" flat inline @click.native="selectPagarReceber(true)" >
            <q-card-main>
              <div class="pagar-receber-icon" v-bind:class="{'pagar-receber-icon-selected':cultura.isPagar.value === true}"><q-icon name="mdi-arrow-top-right" /></div>
              <div class="pagar-receber-nome">Pagar</div>
            </q-card-main>
          </q-card>

          <q-card style="width: 110px" class="pagar-receber-card cursor-pointer" flat inline @click.native="selectPagarReceber(false)" >
            <q-card-main>
              <div class="pagar-receber-icon" v-bind:class="{'pagar-receber-icon-selected':cultura.isPagar.value === false}"><q-icon name="mdi-arrow-bottom-left" /></div>
              <div class="pagar-receber-nome">Receber</div>
            </q-card-main>
          </q-card>

        </div>

      </q-carousel-slide>

      <!--PASSO 3 INFORMAR QUANTIDADE-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="unidadesMedida">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Foi definida uma Quantidade?</span>
          </div>
          <div class="q-px-lg q-py-sm" style="text-align: center">
            <q-btn-toggle v-model="hasQuantidadeDefined" toggle-color="primary"
              :options="[{label: 'Sim', value: true},{label: 'Não', value: false}]"/>

            <div class="row justify-center q-mt-md">
              <div class="col-xs-12 col-sm-6">
                <q-input stack-label="Quantidade" v-model="cultura.quantidade.value" :disable="!hasQuantidadeDefined" @click.native="enableStep3Form()"
                         type="number" align="right"/>
              </div>
            </div>
            <div class="row justify-center q-mt-sm">
              <div class="col-xs-12 col-sm-6">
                <q-select :disable="!hasQuantidadeDefined" stack-label="Unidade de medida" @click.native="enableStep3Form()"
                  v-model="cultura.unidadeMedidaId.value" :options="parsedUnidades(unidadesMedida)"
                />
              </div>
            </div>
          </div>
        </template>
      </q-carousel-slide>

      <!--PASSO 4 INFORMAR PRAZO-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Foi definida um prazo de entrega?</span>
        </div>
        <div class="q-px-lg q-py-sm" style="text-align: center">
          <q-btn-toggle v-model="hasPrazoDefined" toggle-color="primary"
            :options="[{label: 'Sim', value: true},{label: 'Não', value: false}]"/>

          <div class="row justify-center q-mt-md">
            <div class="col-xs-12 col-sm-6">
              <q-datetime v-model="cultura.prazoEntregaInicial.value" type="date" @click.native="enableStep4Form()" @input="initialDateInputEvent"
                          stack-label="Prazo inicial" :disable="!hasPrazoDefined"
                          align="center" modal format="DD/MM/YYYY"/>
            </div>
          </div>
          <div class="row justify-center q-mt-md">
            <div class="col-xs-12 col-sm-6">
              <q-datetime v-model="cultura.prazoEntregaFinal.value" type="date" @click.native="enableStep4Form()" @input="finalDateInputEvent"
                          stack-label="Prazo final" :disable="!hasPrazoDefined"
                          align="center" modal format="DD/MM/YYYY"/>
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <!--PASSO 5 INFORMAR CLASSIFICACAO-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Qual foi o padrão de classificação negociado?</span>
        </div>

        <q-scroll-area style="width: auto; height: 315px;">
          <div class="row justify-center q-mt-md">
            <div class="col-xs-12 col-sm-6">
              <q-list no-border >
                <q-item v-for="(classificacao, index) in cultura.classificacoes" :key="classificacao.id">
                  <q-item-main>
                    <div class="row">
                      <div class="col-7 self-center">
                        {{classificacao.nome}}
                      </div>
                      <div class="col-5">
                        <q-input type="number" v-model="classificacao.tolerancia" inverted-light color="grey-1"
                                 suffix="%" align="right" />
                      </div>
                    </div>
                  </q-item-main>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-scroll-area>
      </q-carousel-slide>

      <!--PASSO 6 INFORMAR LOCAIS DE ENTREGA-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="armazens && armazens.length > 0">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Quais os locais negociados para a entrega da produção?</span>
          </div>
          <q-list no-border separator link>
            <q-item v-for="(armazem, index) in armazens" :key="armazem.id" @click.native="toggleArmazem(armazem)">
              <q-item-main>
                <q-item-tile label>{{armazem.nome}}</q-item-tile>
                <q-item-tile sublabel>{{armazem.endereco}}</q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-btn icon="done" size="8px" color="positive" round v-if="isArmazemSelected(armazem)"/>
              </q-item-side>
            </q-item>
          </q-list>
        </template>

      </q-carousel-slide>

    </q-carousel>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep > 0"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" :disable="isNextStepEnabled()" v-if="currentStep !== 5" />
        <q-btn @click="saveAttachCultura" :disable="selectedArmazens.length <= 0" flat label="Salvar" color="primary" v-if="currentStep === 5"/>
      </div>
    </div>

  </ap-modal>

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
  import apModal from 'components/ApModal'

  export default {
    name: "NewCulturaModal",
    components:{
      apImage,
      apNoResults,
      customInputText,
      customInputDatetime,
      apModal,
    },
    watch: {
      hasQuantidadeDefined: function(value){
        if(!value){
          this.cultura.quantidade.value = null;
          //this.cultura.unidadeMedidaId.value = null;
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
        currentStep: 0,
        safraCulturas: null,
        hasQuantidadeDefined: false,
        hasPrazoDefined: false,
        selectedArmazens: [],
        unidadesMedida: null,
        armazens: null,
      }
    },
    methods: {
      openModal(negocio){
        this.isModalOpened = true;
        this.cultura = new Cultura();
        this.negocio = negocio;

        this.$refs.newCulturaModal.showInnerProgress();
        Promise.all([
          this.listSafraCulturas(),
          this.getUnidadesMedida(),
          this.listArmazens(),
        ]).then(()=>{
          this.$refs.newCulturaModal.hideInnerProgress();
        });
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetModal();
        this.$emit('modal-closed')
      },
      resetModal(){
        this.$refs.stepperNovaCultura.goToSlide(0);
        this.cultura = new Cultura();
        this.safraCulturas = null;
        this.hasQuantidadeDefined = false;
        this.hasPrazoDefined = false;
        this.selectedArmazens = [];
        this.unidadesMedida = null;
        this.armazens = null;
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      saveAttachCultura(){
        this.$refs.newCulturaModal.showOuterProgress();
        this.negocioService.saveAttachCultura(this.negocio.id, this.cultura.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Safra cultura vinculada com sucesso'});
          this.$refs.newCulturaModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshNegocio')
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.newCulturaModal.hideOuterProgress();
        });
      },
      goToNextStep(){
        this.$refs.stepperNovaCultura.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovaCultura.previous();
      },
      selectPagarReceber(value){
        this.cultura.isPagar.value = value;
        this.goToNextStep();
      },
      async selectSafraCultura(safraCultura){
        this.cultura.safraCulturaId.value = safraCultura.id;
        this.cultura.unidadeMedidaId.value = safraCultura.cultura.default_unidade_medida_id;

        await this.listClassificacoesByCultura(safraCultura.cultura.id);
        this.goToNextStep();
      },
      async getUnidadesMedida(){
        return this.unidadeMedidaService.listUnidadesMedida().then(unidades => {
          this.unidadesMedida = unidades;
        })
      },
      toggleArmazem(armazem){
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
      isArmazemSelected(armazem){
        let value = this.selectedArmazens.filter(function(item){return item.id === armazem.id;}) == 0;
        return !value
      },
      parsedUnidades(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome,
            value: unidade.id
          }
        })
      },
      isNextStepEnabled(){
        if(this.cultura.safraCulturaId.value == null && this.currentStep === 0){
          return true
        }
        if(this.cultura.isPagar.value == null && this.currentStep === 1){
          return true
        }
        if(this.hasQuantidadeDefined === true && this.currentStep === 2){
          if(this.cultura.quantidade.value == null || this.cultura.unidadeMedidaId.value == null){
            return true
          }
        }
        if(this.hasPrazoDefined === true && this.currentStep === 3){
          if(this.cultura.prazoEntregaInicial.value == null || this.cultura.prazoEntregaFinal.value == null){
            return true;
          }
        }
        return false;
      },
      async listSafraCulturas(){
        return this.safraCulturaService.listSafraCulturas().then(response => {
          this.safraCulturas = response;
        })
      },
      async listClassificacoesByCultura(cultura_id){
        this.$refs.newCulturaModal.showInnerProgress();
        return this.culturaClassificacaoService.listClassificacoesByCultura(cultura_id).then(response => {
          this.cultura.classificacoes = response;
          this.$refs.newCulturaModal.hideInnerProgress();
        })
      },
      async listArmazens(){
        return this.armazemService.listArmazens().then(response => {
          this.armazens = response;
        })
      },
      enableStep3Form(){
        this.hasQuantidadeDefined = true;
      },
      enableStep4Form(){
        this.hasPrazoDefined = true;
      },
      initialDateInputEvent(value){
        if(this.cultura.prazoEntregaFinal.value === null){
          this.cultura.prazoEntregaFinal.value = value;
        }

        if(this.moment(value).isAfter(this.cultura.prazoEntregaFinal.value)){
          this.cultura.prazoEntregaFinal.value = value;
        }
      },
      finalDateInputEvent(value){
        if(this.cultura.prazoEntregaInicial.value === null){
          this.cultura.prazoEntregaInicial.value = value;
        }

        if(this.moment(value).isBefore(this.cultura.prazoEntregaInicial.value)){
          this.cultura.prazoEntregaInicial.value = value;
        }
      }
    },
  }
</script>

<style scoped>
  .pagar-receber-card{
    text-align: center;
    margin: 8px;
  }
  .pagar-receber-icon{
    background: #f3f1f1;
    display: inline-block;
    width: 60px;
    height: 60px;
    font-weight: 400;
    font-size: 30px;
    line-height: 60px;
    border-radius: 60px;
  }
  .pagar-receber-icon-selected{
    background: #005f5f;
    color: white;
  }
  .pagar-receber-nome{
    margin-top: 12px;
    font-size: 16px;
    color: #454545;
  }
</style>

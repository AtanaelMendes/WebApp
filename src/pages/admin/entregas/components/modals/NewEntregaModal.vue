<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="novaEntrega" ref="stepperNovaEntrega" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 ESCOLHER CAMINHAO -->
      <q-step default title="Caminhão" name="escolherCaminhao" v-if="!addNewTalhaoMode">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh" v-if="caminhoes">

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer" v-for="caminhao in caminhoes" :key="caminhao.id">
            <q-card @click.native="selectCaminhao(caminhao.id)">
              <q-card-media overlay-position="full">
                <ap-image size="400x250" :file-name="caminhao.image_file_name" />
                <q-card-title slot="overlay" align="end" v-if="caminhao.id === novaEntrega.caminhaoId">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>
              <q-list>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>
                      {{caminhao.placa}}
                      {{caminhao.nome}}
                    </q-item-tile>
                    <q-item-tile sublabel v-if="caminhao.lotacao">
                      {{numeral(caminhao.lotacao).format('0,0')}}
                      {{caminhao.unidade_medida_sigla}}
                    </q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-card>
          </div>

          <div v-if="caminhoes.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhum caminhão encontrado</span>
          </div>

        </div>
      </q-step>

      <!--PASSO 2 ESCOLHER SAFRA -->
      <q-step title="Safra" name="escolherSafra" v-if="!addNewTalhaoMode">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh" >

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer" v-for="safraCultura in safraCulturas" :key="safraCultura.id" >
            <q-card @click.native="selectSafraCultura(safraCultura)">
              <q-card-media overlay-position="full">
                <ap-image size="400x250" :file-name="safraCultura.cultura.image_file_name" />
                <q-card-title slot="overlay" align="end" v-if="selectedSafraCulturaId === safraCultura.id">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>

              <q-card-title class="q-py-xs">
                {{safraCultura.cultura.nome}}
                {{safraCultura.safra.ano_inicio}}/{{safraCultura.safra.ano_fim}}
              </q-card-title>

            </q-card>
          </div>

        </div>
      </q-step>

      <!--PASSO 3 ESCOLHER AREA -->
      <q-step title="Área" name="escolherArea">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer" v-for="area in areas" :key="area.id">
            <q-card @click.native="selectArea(area)">
              <q-card-media overlay-position="full">
                <ap-image size="400x250" :file-name="area.image_file_name" />
                <q-card-title slot="overlay" align="end" v-if="area.id === selectedAreaId">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>

              <q-card-title class="q-py-xs">
                {{area.nome}}
              </q-card-title>

            </q-card>
          </div>
        </div>
      </q-step>

      <!--PASSO 4 ESCOLHER TALHAO -->
      <q-step title="Talhão" name="escolherTalhao">
        <div class="row justify-center items-center gutter-sm space-end" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer" v-for="talhao in talhoes" :key="talhao.id">
            <q-card>
              <q-card-media overlay-position="full" @click.native="selectTalhao(talhao)">
                <ap-image size="400x250" :file-name="talhao.image_file_name" />
                <q-card-title slot="overlay" align="end" v-if="talhao.id === selectedTalhaoId">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>

              <q-card-title class="q-py-xs" style="overflow: hidden; text-overflow: ellipsis; white-space:nowrap">
                  {{talhao.nome}}
              </q-card-title>

            </q-card>
          </div>
          <div v-if="talhoes.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhum talhão cadastrado</span>
          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="currentStep != 'escolherTalhao' "/>
      <q-btn label="salvar" color="primary" @click="save" :disable="isNextStepEnabled()" v-if="currentStep == 'escolherTalhao' "/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import NovaEntrega from 'assets/js/model/entrega/NewEntrega'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import apImage from 'components/ApImage'
  import EntregaService from "../../../../../assets/js/service/entrega/EntregaService";
  import CaminhaoService from "../../../../../assets/js/service/CaminhaoService";
  import SafraCulturaService from "../../../../../assets/js/service/safra/SafraCulturaService";
  import SafraCulturaTalhaoService from "../../../../../assets/js/service/safra/SafraCulturaTalhaoService";

  export default {
    name: "stepper-nova-carga",
    components:{
      customInputText,
      customInputDatetime,
      apImage,
    },
    data () {
      return {
        entregaService: new EntregaService(),
        caminhaoService: new CaminhaoService(),
        safraCulturaService: new SafraCulturaService(),
        safraCulturaTalhaoService: new SafraCulturaTalhaoService(),
        currentStep: 'escolherCaminhao',
        novaEntrega: new NovaEntrega(),
        isModalOpened: false,
        caminhoes: [],
        safraCulturas: [],
        areas: [],
        talhoes: [],
        safraCulturaTalhoes: [],
        selectedSafraCulturaId: null,
        selectedAreaId: null,
        selectedTalhaoId: null,
        addNewTalhaoMode: false,
        selectedEntrega: null,
      }
    },
    methods: {
      openModal: function(entrega = null){
        this.isModalOpened = true;
        this.novaEntrega = new NovaEntrega();
        this.selectedSafraCulturaId = null;
        this.selectedAreaId = null;
        this.selectedTalhaoId = null;
        this.currentStep = 'escolherCaminhao';

        this.listSafraCulturas();
        if(entrega){
          this.addNewTalhaoMode = true;
          this.novaEntrega.id = entrega.id;
          this.selectedEntrega = entrega;
          this.selectCaminhao(entrega.caminhao.id);
          this.selectSafraCultura(entrega.safra_cultura);
        }else{
          this.selectedEntrega = null;
          this.listCaminhoes();
          this.addNewTalhaoMode = false;
        }
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      isNextStepEnabled: function(){
        if(this.novaEntrega.caminhaoId == null && this.currentStep === 'escolherCaminhao' ){
          return true
        }
        if(this.selectedSafraCulturaId == null && this.currentStep === 'escolherSafra' ){
          return true
        }
        if(this.selectedAreaId == null && this.currentStep === 'escolherArea' ){
          return true
        }
        if(this.selectedTalhaoId == null && this.currentStep === 'escolherTalhao' ){
          return true
        }
        return false;
      },
      listCaminhoes: function(){
        this.$q.loading.show();
        this.caminhaoService.listFreeCaminhoes().then(caminhoes => {
          this.caminhoes = caminhoes;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      selectCaminhao: function(caminhaoId){
        this.novaEntrega.caminhaoId = caminhaoId;
        this.selectedSafraCulturaId = null;
        this.goToNextStep()
      },
      listSafraCulturas: function(){
        this.$q.loading.show();
        this.safraCulturaService.listSafraCulturas().then(safraCulturas => {
          this.safraCulturas = safraCulturas;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      selectSafraCultura: function(safraCultura){
        this.selectedSafraCulturaId = safraCultura.id;
        this.selectedAreaId = null;
        this.listSafraCulturaTalhaoBySafraCultura(safraCultura.id);
        this.goToNextStep()
      },
      listAreas: function(){
        this.safraCulturaTalhoes.forEach(safraCulturaTalhao => {
          if(this.areas.length === 0){
            this.areas.push(safraCulturaTalhao.talhao.area)
          }else{
            if(!this.areas.some(area => area.id === safraCulturaTalhao.talhao.area.id)){
              this.areas.push(safraCulturaTalhao.talhao.area)
            }
          }

        });
      },
      selectArea: function(area){
        this.selectedAreaId = area.id;
        this.selectedTalhaoId = null;
        this.listTalhoesByArea(area.id);
        this.goToNextStep()
      },
      listTalhoesByArea(area_id){
        let filteredSafraCulturaTalhoes = this.safraCulturaTalhoes.filter(
          safraCulturaTalhao => safraCulturaTalhao.talhao.area.id === area_id
        );

        if(filteredSafraCulturaTalhoes === 1){
          //TODO: Já selecionar o id de safraCulturaTalhao e enviar
          //return
        }
        this.talhoes = [];
        filteredSafraCulturaTalhoes.forEach(safraCulturaTalhao => {
          if(this.talhoes.length === 0){
            this.talhoes.push(safraCulturaTalhao.talhao);
          }else{
            if(!this.talhoes.some(talhao => talhao.id === safraCulturaTalhao.talhao.id)){
              this.talhoes.push(safraCulturaTalhao.talhao)
            }
          }
        })
      },
      listSafraCulturaTalhaoBySafraCultura(safra_cultura_id){
        this.$q.loading.show();
        this.safraCulturaTalhaoService.listFullSafraCulturaTalhao(safra_cultura_id).then(safraCulturaTalhoes => {
          this.safraCulturaTalhoes = safraCulturaTalhoes;

          //Removendo os safra_cultura_talhoes já cadastrados
          if(this.selectedEntrega) {
            this.safraCulturaTalhoes = this.safraCulturaTalhoes.filter(safraCulturaTalhao => {
              return this.selectedEntrega.safra_cultura.talhoes.find(
                talhao => talhao.safra_cultura_talhao.id === safraCulturaTalhao.id
              ) === undefined;
            });
          }

          if(this.safraCulturaTalhoes.length === 1){
            //TODO: Já selecionar o id de safraCulturaTalhao e enviar
          }else {
            this.listAreas();
          }
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      selectTalhao: function(talhao){
        this.selectedTalhaoId = talhao.id;
      },
      save:function(){
        if(!this.addNewTalhaoMode){
          this.saveNovaEntrega();
        }else{
          this.addNovoTalhao();
        }
      },
      saveNovaEntrega: function(){
        let filteredSafraCulturaTalhoes = this.safraCulturaTalhoes.filter(safraCulturaTalhao => {
          return safraCulturaTalhao.talhao.id === this.selectedTalhaoId
            && safraCulturaTalhao.talhao.area.id === this.selectedAreaId;

        });

        this.novaEntrega.safraCulturaTalhaoId = filteredSafraCulturaTalhoes[0].id;
        this.$q.loading.show();
        this.entregaService.saveEntrega(this.novaEntrega.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Entrega criada com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshEntregasList', 'carregando')

          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
      addNovoTalhao: function(){
        //TODO: Código repetido com o saveNovaEntrega. Separar em outro metodo
        let filteredSafraCulturaTalhoes = this.safraCulturaTalhoes.filter(safraCulturaTalhao => {
          return safraCulturaTalhao.talhao.id === this.selectedTalhaoId
            && safraCulturaTalhao.talhao.area.id === this.selectedAreaId;
        });

        this.novaEntrega.safraCulturaTalhaoId = filteredSafraCulturaTalhoes[0].id;
        this.$q.loading.show();
        this.entregaService.addTalhaoToEntrega(this.novaEntrega.id, this.novaEntrega.getValues()).then(response => {
          this.$q.notify({type: 'positive', message: 'Talhao adicionado com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshEntregaView');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
      goToNextStep(){
        switch (this.currentStep) {
          case 'escolherCaminhao':
            this.$refs.stepperNovaEntrega.goToStep('escolherSafra');
            break;
          case 'escolherSafra':
            this.$refs.stepperNovaEntrega.goToStep('escolherArea');
            break;
          case 'escolherArea':
            this.$refs.stepperNovaEntrega.goToStep('escolherTalhao');
            break;
          case 'escolherTalhao':
            break;
        }
      }
    },
  }
</script>
<style scoped>
  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }
  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }
  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }
</style>

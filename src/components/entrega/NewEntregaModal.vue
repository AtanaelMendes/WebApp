<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="novaEntrega" ref="stepperNovaEntrega" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 ESCOLHER CAMINHAO -->
      <q-step default title="Caminhão" name="escolherCaminhao" v-if="!addNewTalhaoMode">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer" v-for="caminhao in caminhoes" :key="caminhao.id">
            <q-card @click.native="selectCaminhao(caminhao.id)">
              <q-card-media overlay-position="full">
                <ap-image size="800x500" :file-name="caminhao.image_file_name" />
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
      <q-step title="Safra" name="escolherSafra">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh" >

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer" v-for="safraCultura in safraCulturas" :key="safraCultura.id" >
            <q-card @click.native="selectSafraCultura(safraCultura)">
              <q-card-media overlay-position="full">
                <ap-image size="800x500" :file-name="safraCultura.cultura.image_file_name" />
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
                <ap-image size="800x500" :file-name="area.image_file_name" />
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
                <ap-image size="800x500" :file-name="talhao.image_file_name" />
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
            <span>Nenhum talhão cadastrado ou nenhum cultivar associado à um talhão</span>
          </div>
        </div>
      </q-step>

      <!--PASSO 5 ESCOLHER CULTIVAR -->
      <q-step title="Cultivar" name="escolherCultivar">
        <div class="row justify-center items-center gutter-sm space-end" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer" v-for="cultivar in cultivares" :key="cultivar.id">
            <q-card>
              <q-card-media overlay-position="full" @click.native="selectCultivar(cultivar)">

                <ap-image size="800x500" :file-name="cultivar.marca.image_file_name" />

                <q-card-title slot="overlay" align="end" v-if="cultivar.id === selectedCultivarId">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>
              <q-card-title class="q-py-xs">
                {{cultivar.marca.nome}}
                {{cultivar.nome}}
              </q-card-title>
            </q-card>
          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="currentStep != 'escolherCultivar' "/>
      <q-btn label="salvar" color="primary" @click="save" :disable="isNextStepEnabled()" v-if="currentStep == 'escolherCultivar' "/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import caminhaoService from 'assets/js/service/CaminhaoService'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import entregaService from 'assets/js/service/entrega/EntregaService'
  import NovaEntrega from 'assets/js/model/entrega/NewEntrega'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import apImage from 'components/ApImage'

  export default {
    name: "stepper-nova-carga",
    components:{
      customInputText,
      customInputDatetime,
      apImage,
    },
    data () {
      return {
        currentStep: 'escolherCaminhao',
        novaEntrega: new NovaEntrega(),
        isModalOpened: false,
        caminhoes: [],
        safraCulturas: [],
        areas: [],
        talhoes: [],
        cultivares: [],
        safraCulturaTalhoes: [],
        selectedSafraCulturaId: null,
        selectedAreaId: null,
        selectedTalhaoId: null,
        selectedCultivarId: null,
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
        this.selectedCultivarId = null;
        this.currentStep = 'escolherCaminhao';

        this.listSafraCulturas();
        if(entrega){
          this.addNewTalhaoMode = true;
          this.novaEntrega.id = entrega.id;
          this.selectedEntrega = entrega;
          //this.currentStep = 'escolherSafra';
          this.selectCaminhao(entrega.caminhao.id);
          //this.novaEntrega.caminhaoId = caminhaoId;
          //this.currentStep = 'escolherSafra';
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
        if(this.selectedCultivarId == null && this.currentStep === 'escolherCultivar' ){
          return true
        }
        return false;
      },
      listCaminhoes: function(){
        caminhaoService.listFreeCaminhoes().then(response => {
          this.caminhoes = response.data;
        })
      },
      selectCaminhao: function(caminhaoId){
        this.novaEntrega.caminhaoId = caminhaoId;
        this.goToNextStep()
      },
      listSafraCulturas: function(){
        safraCulturaService.listSafraCulturas().then(response => {
          this.safraCulturas = response.data;
        })
      },
      selectSafraCultura: function(safraCultura){
        this.selectedSafraCulturaId = safraCultura.id;
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
        this.listTalhoesByArea(area.id);
        this.goToNextStep()
      },
      listTalhoesByArea(area_id){
        let filteredSafraCulturaTalhoes = this.safraCulturaTalhoes.filter(
          safraCulturaTalhao => safraCulturaTalhao.talhao.area.id === area_id && safraCulturaTalhao.cultivar != null
        );

        if(filteredSafraCulturaTalhoes === 1){
          console.log('saveEntrega')
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
        safraCulturaService.listFullSafraCulturaTalhao(safra_cultura_id).then(response => {
          this.safraCulturaTalhoes = response.data;

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
            console.log('saveEntrega')
          }else {
            this.listAreas();
          }
        })
      },
      selectTalhao: function(talhao){
        this.selectedTalhaoId = talhao.id;
        this.listCultivares(this.selectedAreaId, talhao.id)
        this.goToNextStep()
      },
      listCultivares: function(area_id, talhao_id){
        let filteredSafraCulturaTalhoes = this.safraCulturaTalhoes.filter(safraCulturaTalhao => {
          return safraCulturaTalhao.talhao.id === talhao_id && safraCulturaTalhao.talhao.area.id === area_id;
        });

        this.cultivares = [];
        filteredSafraCulturaTalhoes.forEach(safraCulturaTalhao => {
          if(this.cultivares.length === 0){
            if(safraCulturaTalhao.cultivar){
              this.cultivares.push(safraCulturaTalhao.cultivar);
            }
          }else{
            if(safraCulturaTalhao.cultivar){
              if(!this.cultivares.some(cultivar => cultivar.id = safraCulturaTalhao.cultivar.id)){
                this.cultivares.push(safraCulturaTalhao.cultivar)
              }
            }
          }
        })
      },
      selectCultivar: function(cultivar){
        this.selectedCultivarId = cultivar.id;
        //this.saveNovaEntrega();
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
            && safraCulturaTalhao.talhao.area.id === this.selectedAreaId
            && safraCulturaTalhao.cultivar.id === this.selectedCultivarId;

        });

        this.novaEntrega.safraCulturaTalhaoId = filteredSafraCulturaTalhoes[0].id;

        entregaService.saveEntrega(this.novaEntrega.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Entrega criada com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregasList', 'carregando')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      addNovoTalhao: function(){
        //TODO: Código repetido com o saveNovaEntrega. Separar em outro metodo
        let filteredSafraCulturaTalhoes = this.safraCulturaTalhoes.filter(safraCulturaTalhao => {
          return safraCulturaTalhao.talhao.id === this.selectedTalhaoId
            && safraCulturaTalhao.talhao.area.id === this.selectedAreaId
            && safraCulturaTalhao.cultivar.id === this.selectedCultivarId;

        });

        this.novaEntrega.safraCulturaTalhaoId = filteredSafraCulturaTalhoes[0].id;

        entregaService.addTalhaoToEntrega(this.novaEntrega.id, this.novaEntrega.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Talhao adicionado com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregaView')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      goToNextStep(){
        //this.$refs.stepperNovaEntrega.next();
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
            this.$refs.stepperNovaEntrega.goToStep('escolherCultivar');
            break;
          case 'escolherCultivar':
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

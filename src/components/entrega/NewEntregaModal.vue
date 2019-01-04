<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="novaCarga" ref="stepperNovaCarga" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 ESCOLHER CAMINHAO -->
      <q-step default title="Escolher caminhão" name="escolherCaminhao">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="caminhao in caminhoes" :key="caminhao.id">
            <q-card @click.native="selectCaminhao(caminhao)">
              <q-card-media overlay-position="full">
                <img src="assets/images/icon-no-image.svg" v-if="!caminhao.image"/>
                <img :src="caminhao.image" v-if="caminhao.image"/>
                <q-card-title slot="overlay" align="end" v-if="caminhao.id === novaCarga.caminhaoId">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>
              <q-card-separator/>
              <q-card-title>
                {{caminhao.nome}}
              </q-card-title>
              <q-card-separator/>
              <q-card-main class="row">
                <div class="col-12">
                  <span class="text-faded">Motorista:</span> {{caminhao.motorista}}
                </div>
                <div class="col-12">
                  <span class="text-faded">Placa:</span> {{caminhao.placa}}
                </div>
                <div class="col-12">
                  <span class="text-faded">Tara:</span> {{caminhao.tara}}
                </div>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </q-step>

      <!--PASSO 2 ESCOLHER SAFRA -->
      <q-step title="Escolher Safra" name="escolherSafra">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh" >

          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="safraCultura in safraCulturas" :key="safraCultura.id" >
            <q-card @click.native="selectSafraCultura(safraCultura)">
              <q-card-media overlay-position="full">
                <img src="assets/images/icon-no-image.svg" v-if="!safraCultura.cultura.image"/>
                <img :src="safraCultura.cultura.image" v-if="safraCultura.cultura.image"/>

                <q-card-title slot="overlay" align="end" v-if="selectedSafraCulturaId === safraCultura.id">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>

              <q-card-title>
                {{safraCultura.cultura.nome}}
                <span class="text-faded q-caption" v-if="safraCultura.safra.is_safrinha">
                  Safrinha
                </span>

              </q-card-title>
              <q-card-separator/>
              <q-card-main>
                Safra {{safraCultura.safra.ano_inicio}}/{{safraCultura.safra.ano_fim}}
              </q-card-main>
            </q-card>
          </div>

        </div>
      </q-step>

      <!--PASSO 3 ESCOLHER AREA -->
      <q-step title="Escolher área" name="escolherArea">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="area in areas" :key="area.id">
            <q-card @click.native="selectArea(area)">
              <q-card-media overlay-position="full">

                <img src="assets/images/icon-no-image.svg" v-if="!area.image_path"/>
                <img :src="area.image_path" v-if="area.image_path"/>

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
      <q-step title="Escolher Talhão" name="escolherTalhao">
        <div class="row justify-center items-center gutter-sm space-end" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2" v-for="talhao in talhoes" :key="talhao.id">
            <q-card>
              <q-card-media overlay-position="full" @click.native="selectTalhao(talhao)">

                <img src="assets/images/icon-no-image.svg" v-if="!talhao.image_path"/>
                <img :src="talhao.image_path" v-if="talhao.image_path"/>

                <q-card-title slot="overlay" align="end" v-if="talhao.id === selectedTalhaoId">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>

              <q-card-title class="q-py-xs">
                {{talhao.nome}}
              </q-card-title>

            </q-card>
          </div>
        </div>
      </q-step>

      <!--PASSO 5 ESCOLHER CULTIVAR -->
      <q-step title="Escolher cultivar" name="escolherCultivar">
        <div class="row justify-center items-center gutter-sm space-end" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2" v-for="cultivar in cultivares" :key="cultivar.id">
            <q-card>
              <q-card-media overlay-position="full" @click.native="selectCultivar(cultivar)">

                <img src="assets/images/icon-no-image.svg" v-if="!cultivar.image_path"/>
                <img :src="cultivar.image_path" v-if="cultivar.image_path"/>

                <q-card-title slot="overlay" align="end" v-if="cultivar.id === selectedCultivarId">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>
              <q-card-title class="q-py-xs">
                {{cultivar.nome}}
              </q-card-title>
              <q-card-separator/>
              <q-card-main>
                {{cultivar.marca.nome}}
              </q-card-main>
            </q-card>
          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="currentStep != 'escolherCultivar' "/>
      <q-btn label="salvar" color="primary" @click="saveNovaCarga" :disable="isNextStepEnabled()" v-if="currentStep == 'escolherCultivar' "/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import caminhaoService from 'assets/js/service/CaminhaoService'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import entregaService from 'assets/js/service/entrega/EntregaService'
  import NovaCarga from 'assets/js/model/entrega/NovaCarga'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  export default {
    name: "stepper-nova-carga",
    components:{
      customInputText,
      customInputDatetime
    },
    data () {
      return {
        currentStep: 'escolherCaminhao',
        novaCarga: new NovaCarga(),
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
      }
    },
    methods: {
      openModal: function(){
        this.isModalOpened = true;
        this.novaCarga = new NovaCarga();
        this.selectedSafraCulturaId = null;
        this.selectedAreaId = null;
        this.selectedTalhaoId = null;
        this.selectedCultivarId = null;
        this.listCaminhoes();
        this.listSafraCulturas();
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      isNextStepEnabled: function(){
        if(this.novaCarga.caminhaoId == null && this.currentStep === 'escolherCaminhao' ){
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
        caminhaoService.listCaminhoes().then(response => {
          this.caminhoes = response.data;
        })
      },
      selectCaminhao: function(caminhao){
        this.novaCarga.caminhaoId = caminhao.id;
        this.goToNextStep()
      },
      listSafraCulturas: function(){
        safraCulturaService.listSafraCulturas().then(response => {
          this.safraCulturas = response.data;
        })
      },
      selectSafraCultura: function(safraCultura){
        this.selectedSafraCulturaId = safraCultura.id;
        this.listSafraCulturaTalhaoBySafraCultura(safraCultura.id)
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
        let filteredSafraCulturaTalhoes = this.safraCulturaTalhoes.filter(safraCulturaTalhao => safraCulturaTalhao.talhao.area.id === area_id);

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
            this.cultivares.push(safraCulturaTalhao.cultivar);
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
        //this.saveNovaCarga();
      },
      saveNovaCarga: function(){
        let filteredSafraCulturaTalhoes = this.safraCulturaTalhoes.filter(safraCulturaTalhao => {
          return safraCulturaTalhao.talhao.id === this.selectedTalhaoId
            && safraCulturaTalhao.talhao.area.id === this.selectedAreaId
            && safraCulturaTalhao.cultivar.id === this.selectedCultivarId;

        });

        this.novaCarga.safraCulturaTalhaoId = filteredSafraCulturaTalhoes[0].id;

        entregaService.saveEntrega(this.novaCarga.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Carga Criada com sucesso'});
            this.closeModal();
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      goToNextStep(){
        this.$refs.stepperNovaCarga.next();
      }
    },
  }
</script>
<style>
  .space-end{
    margin-bottom: 150px;
  }
</style>

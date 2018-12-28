<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="novaCarga" ref="stepperNovaCarga" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 ESCOLHER CAMINHAO -->
      <q-step default title="Escolher caminhão" name="escolherCaminhao">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="caminhao in caminhoes" :key="caminhao.nome">
            <q-card @click.native="selectCaminhao(caminhao)">
              <q-card-media overlay-position="full">
                <img src="assets/images/no-image.png"/>
                <q-card-title slot="overlay" align="end" v-if="caminhao.id === novaCarga.caminhaoId.value">
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
                  <span class="text-faded">Motorista:</span> {{caminhao.pessoa}}
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
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="safra in safras" :key="safra.id">
            <q-card @click.native="selectSafra(safra)">
              <q-card-title>
                {{safra.cultura}}
                <span class="text-faded q-caption" v-if="safra.is_safrinha">
                  Safrinha
                </span>
                <q-icon slot="right" name="check_circle" color="positive" v-if="novaCarga.safraCulturaId.value == safra.id" round dense/>
              </q-card-title>
              <q-card-separator/>
              <q-card-main>
                Safra {{safra.ano_inicio}}/{{safra.ano_fim}}
              </q-card-main>
            </q-card>
          </div>

        </div>
      </q-step>

      <!--PASSO 3 ESCOLHER AREA -->
      <q-step title="Escolher área" name="escolherArea">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3" v-for="area in areas" :key="area.id">
            <q-card @click.native="selectArea(area)">
              <q-card-media overlay-position="full">
                <!--<img src="assets/images/confinamento250x250.jpg"/>-->

                <img src="assets/images/icon-no-image.svg" v-if="!area.image_path"/>
                <img :src="area.image_path" v-if="area.image_path"/>

                <q-card-title slot="overlay" align="end" v-if="area.id === novaCarga.areaId.value">
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

                <q-card-title slot="overlay" align="end" v-if="talhao.id == novaCarga.talhaoId.value">
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

                <q-card-title slot="overlay" align="end" v-if="cultivar.id == novaCarga.cultivarId.value">
                  <q-icon name="check_circle" size="30px" color="positive"/>
                </q-card-title>
              </q-card-media>
              <q-card-title class="q-py-xs">
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
      <q-btn label="salvar" color="primary" @click="saveNovaCarga" :disable="isNextStepEnabled()" v-if="currentStep == 'escolherCultivar' "/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import areaService from 'assets/js/service/area/AreaService'
  import talhaoService from 'assets/js/service/area/TalhaoService'
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
        caminhoes: [
          {
            id: 1,
            nome: 'Volvo 4444',
            placa: 'NJH3832',
            tara: '5000 kg',
            pessoa: 'Zé da boléia'
          },
          {
            id: 2,
            nome: 'Mercedes Bens 5896',
            placa: 'HRT9414',
            tara: '7000 kg',
            pessoa: 'Careca'
          }
        ],
        safras: [
          {
            id: 1,
            is_safrinha: false,
            ano_inicio: 2018,
            ano_fim: 2019,
            cultura: 'Soja'
          },
          {
            id: 2,
            is_safrinha: true,
            ano_inicio: 2018,
            ano_fim: 2018,
            cultura: 'milho'
          },
          {
            id: 3,
            is_safrinha: false,
            ano_inicio: 2019,
            ano_fim: 2020,
            cultura: 'Soja'
          }
        ],
        areas: [],
        talhoes: [],
        cultivares: [
          {
            id: 1,
            marca: 'Pionner',
            nome: 'YK6565'
          },
          {
            id: 2,
            marca: 'Mosanto',
            nome: 'TG5588'
          },
          {
            id: 3,
            marca: 'Bayer',
            nome: 'HJ3354'
          }
        ],
      }
    },
    methods: {
      openModal: function(){
        this.isModalOpened = true;
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      isNextStepEnabled: function(){
        if(this.novaCarga.caminhaoId.value == null && this.currentStep == 'escolherCaminhao' ){
          return true
        }
        if(this.novaCarga.safraCulturaId.value == null && this.currentStep == 'escolherSafra' ){
          return true
        }
        if(this.novaCarga.areaId.value == null && this.currentStep == 'escolherArea' ){
          return true
        }
        if(this.novaCarga.talhaoId.value == null && this.currentStep == 'escolherTalhao' ){
          return true
        }
        if(this.novaCarga.cultivarId.value == null && this.currentStep == 'escolherCultivar' ){
          return true
        }
        return false;
      },
      listCaminhoes: function(){},
      selectCaminhao: function(carro){
        if(this.novaCarga.caminhaoId.value == carro.id){
          this.novaCarga.caminhaoId.value = null;
        }else{
          this.novaCarga.caminhaoId.value = carro.id;
          this.goToNextStep()
        }
      },
      listSafras: function(){},
      selectSafra: function(safra){
        if(this.novaCarga.safraCulturaId.value == safra.id){
          this.novaCarga.safraCulturaId.value = null;
        }else{
          this.novaCarga.safraCulturaId.value = safra.id;
          this.goToNextStep()
        }
      },
      listAreas: function(){
        areaService.listAreas().then(response => {
          this.areas = response;
        })
      },
      selectArea: function(area){
        if(this.novaCarga.areaId.value == area.id){
          this.novaCarga.areaId.value = null;
        }else{
          this.novaCarga.areaId.value = area.id;
          this.listTalhoesBySafraCulturaAndArea();
          this.goToNextStep()
        }
      },
      listTalhoesBySafraCulturaAndArea: function(){
        let safraCulturaId =this.novaCarga.safraCulturaId.value;
        let areaId = this.novaCarga.areaId.value;
        talhaoService.listTalhoesBySafraCulturaAndArea(safraCulturaId, areaId).then(response => {
          this.talhoes = [];
          response.data.forEach(function(talhao){
            this.talhoes.push({
              id: talhao.id,
              nome: talhao.nome,
              tamanho: parseFloat(talhao.tamanho),
              image_path: talhao.image_path,
            });
          },this)
        })
      },
      selectTalhao: function(talhao){
        if(this.novaCarga.talhaoId.value == talhao.id){
          this.novaCarga.talhaoId.value = null;
        }else{
          this.novaCarga.talhaoId.value = talhao.id;
          this.goToNextStep()
        }
      },
      listCultivar: function(){},
      selectCultivar: function(cultivar){
        if(this.novaCarga.cultivarId.value == cultivar.id){
          this.novaCarga.cultivarId.value = null;
        }else{
          this.novaCarga.cultivarId.value = cultivar.id;
          // this.goToNextStep()
        }
      },
      saveNovaCarga: function(){
        negocioService.saveNovaCarga(this.novaCarga.getValues()).then(response => {
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
    mounted () {
      this.listCaminhoes();
      this.listAreas();
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
</script>
<style>
  .space-end{
    margin-bottom: 150px;
  }
</style>

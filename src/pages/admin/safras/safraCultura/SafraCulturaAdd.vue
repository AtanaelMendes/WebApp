<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Safra">
      <q-btn slot="action_itens" flat dense round icon="done" @click="saveSafraCultura()" v-if="currentStep === 'cultivar'"/>
    </toolbar>

    <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 ADICIONAR CULTURAS-->
      <q-step default title="Culturas" name="cultura">
        <q-list separator link no-border class="space-end">
          <div class="row gutter-sm">
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="cultura in culturas" :key="cultura.id">
              <q-card @click.native="selectedCultura(cultura.id)">
                <q-card-media overlay-position="full">
                  <img src="assets/images/soja250x250.jpg"/>
                  <q-card-title slot="overlay" align="end" v-if="cultura.id === safraCultura.cultura_id">
                    <q-icon name="check_circle" size="30px" color="positive"/>
                  </q-card-title>
                </q-card-media>
                <q-card-title class="q-py-xs">
                  {{cultura.nome}}
                </q-card-title>
              </q-card>
            </div>
          </div>
        </q-list>
      </q-step>

      <!--PASSO 2 ADICIONAR AREA-->
      <q-step title="Área" name="area">
        <q-list separator link no-border class="space-end">
          <div class="row gutter-sm">
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3" v-for="area in areas" :key="area.id">
              <q-card @click.native="selectedArea(area.id)">
                <q-card-media overlay-position="full">
                  <img src="assets/images/confinamento250x250.jpg"/>
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
        </q-list>
      </q-step>

      <!--PASSO 3 ADICIONAR TALHOES-->
      <q-step title=" Selecionar Talhões" name="talhoes">
        <div align="end">
          <q-btn @click.native="selectedTalhao()" label="Próximo" color="primary"/>
        </div>
        <q-list separator link no-border class="space-end">
          <div class="row gutter-sm">
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3" v-for="talhao in talhoes" :key="talhao.id">
              <q-card>
                <q-card-media overlay-position="full" @click.native="toggleTalhao(talhao)">
                  <img src="assets/images/talhao2-250x250.jpg"/>
                  <q-card-title slot="overlay" align="end" v-if="safraCultura.getTalhaoById(talhao.id).tamanho > 0">
                    <q-icon name="check_circle" size="30px" color="positive"/>
                  </q-card-title>
                </q-card-media>
                <q-card-title class="q-py-xs">
                  {{talhao.nome}}
                </q-card-title>
                <q-card-separator/>
                <q-card-main>
                  <div v-if="safraCultura.existsTalhaoById(talhao.id) >= 0">
                    <div>
                      <q-input

                        @blur="checkInputMaxSize(safraCultura.getTalhaoById(talhao.id).tamanho, talhao)"
                        type="number"
                        hide-underline
                        :suffix="talhao.unidade"
                        v-model="safraCultura.getTalhaoById(talhao.id).tamanho"
                      />
                    </div>
                    <q-slider
                      snap
                      label
                      :min="0"
                      :step="2"
                      v-model="safraCultura.getTalhaoById(talhao.id).tamanho"
                      :max="talhao.tamanho"
                    />
                  </div>
                </q-card-main>
              </q-card>
            </div>
          </div>
        </q-list>
      </q-step>

    </q-stepper>
  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import SafraCultura from 'assets/js/model/safra/SafraCultura'
  import SafraCulturaTalhao from 'assets/js/model/safra/SafraCulturaTalhao'
  import areaService from 'assets/js/service/area/AreaService'
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  export default {
    name: "cultura-safra-add",
    components: {
      toolbar,
      customPage,
    },
    data(){
      return {
        currentStep: 'cultura',
        safraCultura: new SafraCultura(),
        selectedAreaId: null,
        selectedTalhaoId: null,
        areas: [],
        talhoes: [],
        culturas: [],
      }
    },
    methods:{
      checkInputMaxSize: function(value, talhao){
        if(value > talhao.tamanho){
          this.safraCultura.getTalhaoById(talhao.id).tamanho = talhao.tamanho
        }
      },
      listCulturas() {
        safraCulturaService.listCulturas().then(response => {
          this.culturas = response;
        });
      },
      setCultura: function(id){
        this.safraCultura.cultura_id = id;
        this.goToNextStep();
      },
      getAreas: function(){
        areaService.listAreas().then(response => {
          this.areas = response;
        })
      },
      setArea: function(id){
        this.selectedAreaId = id;
        this.getTalhoesByArea(id)
        this.goToNextStep();
      },
      getTalhoesByArea: function(area_id){
        talhaoService.listTalhoes(area_id).then(response => {
          //this.talhoes = response.data;
          //this.selectedTalhoes = this.talhoes.map(function (talhao) { return talhao.id });
          //this.safraCultura.talhoes =
          response.data.forEach(function(talhao){
            this.talhoes.push({
              id: talhao.id,
              nome: talhao.nome,
              tamanho: parseFloat(talhao.tamanho),
              unidade: talhao.unidade.nome
            });
            this.safraCultura.addTalhao(new SafraCulturaTalhao(talhao))
          },this)
        })
      },
      toggleTalhao:function(talhao){
        let tal = this.safraCultura.getTalhaoById(talhao.id);
        if(tal.tamanho === 0){
          tal.tamanho = talhao.tamanho
        }else{
          tal.tamanho = 0
        }
      },
      selectedTalhao: function(){
        this.goToNextStep();
      },
      saveSafraCultura: function(){},
      goToNextStep(){
        this.$refs.stepper.next()
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted () {
      this.listCulturas();
      this.getAreas();
    },
  }
</script>

<style>
  .space-end{
    margin-bottom: 150px;
  }
</style>

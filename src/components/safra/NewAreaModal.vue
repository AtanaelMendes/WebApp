<template>
  <q-modal v-model="isModalOpened" minimized @hide="closeModal">
    <q-modal-layout>
      <div class="q-pa-md q-title text-center" slot="header">
        Nova Área
      </div>

      <div class="q-pa-md">
        <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow" >
          <!--PASSO 1 ADICIONAR AREA-->
          <q-step title="Área" name="area">
            <div style="min-height:80vh" class="row gutter-sm justify-center items-center">
              <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3" v-for="area in areas" :key="area.nome">
                <q-card @click.native="setArea(area)">
                  <q-card-media overlay-position="full">
                    <!--<img src="assets/images/confinamento250x250.jpg"/>-->

                    <img src="statics/images/no-image-16-10.svg" v-if="!area.image_path"/>
                    <img :src="area.image_path" v-if="area.image_path"/>

                    <q-card-title slot="overlay" align="end" v-if="area.id === selectedArea.id">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title>
                    {{area.nome}}
                  </q-card-title>
                </q-card>
                <br>
                &nbsp
              </div>
            </div>
          </q-step>

          <!--PASSO 2 ADICIONAR TALHOES-->
          <q-step title=" Selecionar Talhões" name="talhoes">
            <div style="min-height:80vh" class="row gutter-sm justify-center items-center space-end" v-if="talhoes.length > 0">
              <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3" v-for="talhao in talhoes" :key="talhao.nome">
                <q-card>
                  <q-card-media overlay-position="full" @click.native="toggleTalhao(talhao)">

                    <img src="statics/images/no-image-16-10.svg" v-if="!talhao.image_path"/>
                    <img :src="talhao.image_path" v-if="talhao.image_path"/>

                    <q-card-title slot="overlay" align="end" v-if="getTalhaoById(talhao.id).tamanho > 0">
                      <q-icon name="check_circle" size="30px" color="positive"/>
                    </q-card-title>
                  </q-card-media>
                  <q-card-title>
                    {{talhao.nome}}
                  </q-card-title>
                  <!--<q-card-separator/>-->
                  <q-card-main class="q-px-none">
                    <q-list-header>{{getUnidadeAreaById(view_unidade_area_id).plural}} à serem utilizados</q-list-header>
                    <q-item dense >
                      <div class="row full-width">
                        <div class="col-9 self-center">
                          <q-slider
                            label
                            :min="0"
                            :max="talhao.tamanho"
                            v-model="getTalhaoById(talhao.id).tamanho"
                            :label-value="`${getTalhaoById(talhao.id).tamanho} ${getUnidadeAreaById(view_unidade_area_id).sigla}`"
                          />
                        </div>
                        <div class="col-3 q-pl-sm">
                          <q-input
                            type="number"
                            align="center"
                            v-model="getTalhaoById(talhao.id).tamanho"
                            @blur="checkInputMaxSize(getTalhaoById(talhao.id).tamanho, talhao)"
                          />
                        </div>
                      </div>
                    </q-item>

                    <q-list no-border dense class="q-py-none">
                      <q-list-header>Estimativa</q-list-header>
                      <q-item dense>
                        <div class="row gutter-x-sm">
                          <div class="col-3">
                            <q-input type="number" align="center" v-model="getTalhaoById(talhao.id).estimativa" />
                          </div>
                          <div class="col-9 self-center">
                            <!--label de unidade-->
                            {{getUnidadeMedidaById(view_unidade_medida_id).sigla}} por {{getUnidadeAreaById(view_unidade_area_id).nome}}
                            <!--{{unidadesMedida.filter(unidadeMedida => unidadeMedida.value === safraCultura.view_unidade_medida_id)[0].label}}-->
                          </div>
                        </div>
                      </q-item>
                    </q-list>
                  </q-card-main>
                </q-card>
                <br>
                <br>
                <br>
                &nbsp
              </div>
            </div>

            <!--EMPTY LIST-->
            <div class="column q-ma-xl items-center" v-if="talhoes.length <= 0">
              <ap-no-results mensagem="Nenhum talhão com espaço disponível encontrado." />
            </div>
          </q-step>

          <!--PASSO 3  RESUMO E FINALIZAR-->
          <q-step default title="Finalizar" name="finalizar">
            <div style="min-height: 80vh" class="row items-center justify-center gutter-sm">
              <div class="col-xs-12 col-md-6 col-lg-3">
                <q-list separator>
                  <q-list-header>{{culturaNome}}</q-list-header>
                  <q-item>
                    <q-item-main label>
                      {{selectedArea.nome}}
                    </q-item-main>
                  </q-item>
                  <template v-for="talhao in talhoes">
                    <q-item :key="talhao.nome" v-if="talhao.tamanho > 0">
                      <q-item-main>
                        <div class="row">
                          <div class="col-6">{{talhao.nome}}</div>
                          <div class="col-6">{{talhao.tamanho}},&nbsp<span class="text-faded q-caption">{{getUnidadeAreaById(view_unidade_area_id).plural}}</span></div>
                        </div>
                      </q-item-main>
                    </q-item>
                  </template>
                </q-list>
              </div>
            </div>
          </q-step>

        </q-stepper>
      </div>

      <div class="q-pa-md text-right" slot="footer">
        <q-btn @click.native="closeModal" color="primary" label="Cancelar" class="q-mr-xs"/>
        <!--<q-btn @click.native="saveSafra" label="Salvar" color="primary" v-if="!isEditMode"/>
        <q-btn @click.native="updateSafra" label="Atualizar" color="primary" v-if="isEditMode"/>-->
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import SafraCulturaTalhao from "../../assets/js/model/safra/SafraCulturaTalhao";
  import AreaService from "../../assets/js/service/area/AreaService";
  import SafraService from "../../assets/js/service/safra/SafraService";
  import apNoResults from 'components/ApNoResults'

  export default {
    name: "NewAreaModal",
    components:{
      apNoResults,
    },
    data(){
      return{
        isModalOpened: false,
        areaService: new AreaService(),
        safraService: new SafraService(),
        selectedSafraId: null,
        currentStep: 'area',
        areas: [],
        talhoes: [],
        culturaNome: "teste",
        selectedArea: {
          nome: ''
        },
      }
    },
    methods:{
      openModal(safraId){
        this.isModalOpened = true;
        this.selectedSafraId = safraId
        this.getAreas();
      },
      closeModal(){
        this.isModalOpened = false;
      },
      getAreas(){
        this.$q.loading.show();
        this.areaService.listAreas().then(areas => {
          this.areas = areas;
          this.$q.loading.hide();
        })
      },
      setArea(area){
        this.selectedArea.id = area.id;
        this.selectedArea.nome = area.nome;
        this.getTalhoesBySafraAndArea(area.id);
        this.goToNextStep();
      },
      getTalhaoById(id){
        return this.talhoes[this.existsTalhaoById(id)]
      },
      existsTalhaoById(id){
        return this.talhoes.map(talhao => talhao.id).indexOf(id);
      },
      getTalhoesBySafraAndArea(area_id){
        this.$q.loading.show();
        this.safraService.listFreeTalhoes(
          area_id,
          this.selectedSafraId,
          this.view_unidade_area_id,
          this.view_unidade_medida_id,
          this.cultura_id
        ).then(talhoes => {
          this.talhoes = [];
          talhoes.forEach(function(talhao){
            this.talhoes.push({
              id: talhao.id,
              nome: talhao.nome,
              tamanho: parseFloat(talhao.tamanho),
              image_path: talhao.image_path,
            });
            this.addTalhao(new SafraCulturaTalhao(talhao))
          },this);
          this.$q.loading.hide();
        })
      },
      toggleTalhao(talhao){
        let tal = this.getTalhaoById(talhao.id);
        if(tal.tamanho === 0){
          tal.tamanho = talhao.tamanho
        }else{
          tal.tamanho = 0
        }
      },
      goToNextStep(){
        this.$refs.stepper.next()
      },
      goToPreviousStep(){
        this.$refs.stepper.previous()
      },
    }
  }
</script>

<style scoped>

</style>

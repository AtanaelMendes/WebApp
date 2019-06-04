<template>
  <div class="row space-end" >
    <template v-if="areas">
      <template v-if="areas.length > 0">
        <div class="col-12 ">
          <div class="row">

            <!-- GRAFICO DAS AREAS -->
            <div class="col-12" style="min-height: 254px">
              <div @click="media = !media" class="cursor-pointer q-ma-md">
                <q-toggle v-model="media" color="secondary" />
                <template v-if="media">
                  Média
                  {{safraCultura.unidade_medida_preco.sigla}}
                  por {{safraCultura.unidade_medida_preco.sigla}}
                </template>
                <template v-else>
                  Total de
                  {{safraCultura.unidade_medida_preco.sigla}}
                </template>
              </div>
              <safra-grafico-quantidades-por-area
                :areas="areas"
                :media="media"
                :unidade-medida="safraCultura.unidade_medida_preco"
                :unidade-area="safraCultura.unidade_medida_area"
                :height="200"
                :width="100"
                v-model="iArea"
              />
            </div>


            <!-- DETALHE DAS AREAS -->
            <div class="col-12 q-mt-md">
              <div class="row" v-if="areas">
                <!-- CARROUSEL DE AREAS -->
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                  <q-carousel color="white" arrows quick-nav v-model="iArea" ref="areasCarousel" keep-alive >
                    <q-carousel-slide v-for="area in areas" :key="area.id" class="q-pa-none" style="overflow: hidden" >
                      <q-card>
                        <q-card-media overlay-position="top">
                          <ap-image size="400x250" :file-name="area.image_file_name" />
                          <q-card-title slot="overlay">
                            {{area.nome}}
                            <span slot="subtitle">{{numeral(area.tamanho).format('0,0')}} {{safraCultura.unidade_medida_area.plural}}</span>
                            <div slot="right" class="row items-center">
                              <q-btn flat round dense color="white" icon="more_vert" >
                                <q-popover anchor="bottom left">
                                  <q-list link>
                                    <q-item v-close-overlay @click.native="unattachSafraCulturaByArea(area.id)">
                                      <q-item-main label="Desvincular Área"/>
                                    </q-item>
                                  </q-list>
                                </q-popover>
                              </q-btn>
                            </div>
                          </q-card-title>
                        </q-card-media>
                      </q-card>
                    </q-carousel-slide>
                  </q-carousel>
                </div>
                <!-- DETALHES DA AREA -->
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8">
                  <safra-quantidades
                    :safra-cultura-id="safraCultura.id"
                    :quantidades="areas[iArea]"
                    :unidade-area="safraCultura.unidade_medida_area"
                    :unidade-medida="safraCultura.unidade_medida_preco"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="col-12 q-mt-md space-end" v-if="talhoes && areas">
          <div class="row">

            <!-- GRAFICO DOS TALHOES -->
            <div class="col-12 q-mt-md" style="min-height: 200px">
              <safra-grafico-quantidades-por-talhao
                :talhoes="this.talhoes"
                :areaId="this.activeArea.id"
                :media="media"
                :unidade-medida="safraCultura.unidade_medida_preco"
                :unidade-area="safraCultura.unidade_medida_area"
                :height="200"
                :width="100"
                v-model="iTalhao"
              />
            </div>

            <!-- DETALHE DOS TALHOES -->
            <div class="col-12 q-mt-md" >
              <div class="row">
                <!-- CARROUSEL DE TALHOES -->
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                  <q-carousel color="white" arrows quick-nav v-model="iTalhao" ref="talhoesCarousel" keep-alive>
                    <q-carousel-slide v-for="talhao in talhoesDaArea" :key="talhao.id" class="q-pa-none" style="overflow: hidden" >
                      <q-card>
                        <q-card-media overlay-position="top">
                          <ap-image size="400x250" :file-name="talhao.image_file_name" />
                          <q-card-title slot="overlay">
                            {{activeArea.nome}} {{talhao.nome}}
                            <span slot="subtitle">{{numeral(talhao.tamanho).format('0,0')}} {{safraCultura.unidade_medida_area.plural}}</span>
                            <div slot="right" class="row items-center">
                              <q-btn flat round dense color="white" icon="more_vert" >
                                <q-popover anchor="bottom left">
                                  <q-list link>
                                    <q-item v-close-overlay @click.native="unattachSafraCulturaTalhao(talhao.safra_cultura_talhao_id)">
                                      <q-item-main label="Desvincular Talhão"/>
                                    </q-item>
                                    <q-item v-close-overlay @click.native="addCultivar(activeTalhao)">
                                      <q-item-main label="Vincular Cultivar"/>
                                    </q-item>
                                    <q-item v-close-overlay @click.native="updateTamanhoCultivares(activeTalhao)">
                                      <q-item-main label="Estimativa e Tamanho"/>
                                    </q-item>
                                  </q-list>
                                </q-popover>
                              </q-btn>
                            </div>
                          </q-card-title>
                        </q-card-media>
                      </q-card>
                    </q-carousel-slide>
                  </q-carousel>
                </div>

                <!-- DETALHES DO TALHAO -->
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8" v-if="activeTalhao">
                  <safra-quantidades
                    :safra-cultura-id="safraCultura.id"
                    :quantidades="activeTalhao"
                    :unidade-area="safraCultura.unidade_medida_area"
                    :unidade-medida="safraCultura.unidade_medida_preco">
                  </safra-quantidades>

                  <template v-if="activeTalhao.cultivares.length > 0">
                    <q-item link v-for="cultivar in activeTalhao.cultivares" :key="cultivar.key" >
                      <q-item-side v-if="cultivar.marca.image_file_name" :image="imageMakeUrl(cultivar.marca.image_file_name, '200x125')" color="primary"/>
                      <q-item-side v-else icon="spa" color="primary" @click.native="goToCultivar(cultivar.id)" />
                      <q-item-main @click.native="goToCultivar(cultivar)" >
                        <q-item-tile>
                          {{cultivar.marca.nome}}
                          {{cultivar.nome}}
                        </q-item-tile>
                        <q-item-tile sublabel>
                          {{numeral(cultivar.tamanho * 100 / activeTalhao.tamanho).format('0,0.0')}}%
                          ({{numeral(cultivar.tamanho).format('0,0')}} {{safraCultura.unidade_medida_area.sigla}})
                        </q-item-tile>
                      </q-item-main>
                      <q-item-side right>
                        <q-btn flat round dense icon="more_vert" >
                          <q-popover anchor="bottom left">
                            <q-list link>
                              <q-item v-close-overlay @click.native="unattachCultivar(cultivar, activeTalhao)">
                                <q-item-main label="Desvincular Cultivar"/>
                              </q-item>
                            </q-list>
                          </q-popover>
                        </q-btn>
                      </q-item-side>
                    </q-item>
                  </template>
                  <div v-else class="text-center list-empty">
                    <q-icon name="warning" />
                    <span>Nenhum cultivar informado ainda.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </template>

      <template v-else>
        <!--EMPTY LIST-->
        <div class="col-12">
          <ap-no-results mensagem="Nenhuma área criada. Crie uma nova clicando no botão abaixo" />
        </div>
      </template>

      <q-page-sticky position="bottom-right" :offset="[35, 35]">
        <q-btn round color="deep-orange" size="20px" @click="addArea" icon="add" />
      </q-page-sticky>

      <new-area-modal ref="newAreaModal" />
      <new-cultivar-modal ref="newCultivarModal" />
      <update-cultivares-tamanho-modal ref="updateCultivaresTamanhoModal" />
    </template>
  </div>
</template>

<script>
  import SafraCulturaService from "../../../../../assets/js/service/safra/SafraCulturaService";
  import safraGraficoQuantidadesPorArea from '../graficos/QuantidadesPorArea.vue'
  import safraGraficoQuantidadesPorTalhao from '../graficos/QuantidadesPorTalhao.vue'
  import agroUtils from 'assets/js/AgroUtils'
  import safraQuantidades from '../Quantidades.vue'
  import apImage from 'components/ApImage'
  import apNoResults from 'components/ApNoResults'
  import newAreaModal from '../modals/NewAreaModal'
  import newCultivarModal from '../modals/NewCultivarModal'
  import updateCultivaresTamanhoModal from '../modals/UpdateCultivaresTamanhoModal'
  import SafraCulturaTalhaoService from "../../../../../assets/js/service/safra/SafraCulturaTalhaoService";

  export default {
    name: "AreasTab",
    props:{
      visible: false,
      safraCultura: Object,
      areas: Array,
      talhoes: Array,
    },
    components:{
      safraGraficoQuantidadesPorArea,
      safraQuantidades,
      safraGraficoQuantidadesPorTalhao,
      apNoResults,
      newAreaModal,
      newCultivarModal,
      updateCultivaresTamanhoModal,
      apImage
    },
    watch:{
      iArea(value){
        this.iTalhao = 0;
        let areaId = this.areas[value].id;
        this.$router.replace({query: Object.assign({}, this.$route.query, {area_id:areaId})});
      },
      iTalhao(value){
        let talhaoId = this.talhoesDaArea[value].id;
        this.$router.replace({query:Object.assign({}, this.$route.query, {talhao_id:talhaoId})});
      }
    },
    data(){
      return{
        safraCulturaService: new SafraCulturaService(),
        safraCulturaTalhaoService: new SafraCulturaTalhaoService(),
        media: true,
        iArea: 0,
        iTalhao: 0,
      }
    },
    computed:{
      activeArea() {
        return this.areas[this.iArea];
      },
      activeTalhao() {
        return this.talhoesDaArea[this.iTalhao];
      },
      talhoesDaArea() {
        return _.filter(this.talhoes, {area_id: this.activeArea.id});
      },
    },
    methods:{
      onTabSelected(){
        if(!_.isEmpty(this.talhoes) && !_.isEmpty(this.areas)){
          this.checkRoute();
        }
      },
      onDataLoaded(){
        if(!_.isEmpty(this.talhoes) && !_.isEmpty(this.areas)){
          this.checkRoute();
        }
      },
      checkRoute(){
        if(_.isEmpty(this.$route.query)){
          let areaId = this.areas[0].id;
          let talhaoId = this.talhoesDaArea[0].id;
          this.$router.replace({query: Object.assign({}, this.$route.query, {area_id:areaId, talhao_id:talhaoId})});
        }else{
          this.changeSlidesByTalhaoId(parseInt(this.$route.query.talhao_id));
        }
      },
      addArea(){
        this.$refs.newAreaModal.openModal(this.safraCultura);
      },
      addCultivar(talhao){
        this.$refs.newCultivarModal.openModal(talhao, this.safraCultura);
      },
      imageMakeUrl(fileName, size) {
        return agroUtils.image.makeUrl(fileName, size)
      },
      unattachSafraCulturaByArea(areaId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja desvincular essa área?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.safraCulturaTalhaoService.unattachSafraCulturaTalhoesByArea(this.safraCultura.id, areaId).then(() => {
            this.$q.notify({type: 'positive', message: 'Área desvinculada com sucesso.'});
            this.$root.$emit('refreshSafrasCulura', true);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível desvincular esta área'});
            this.$q.loading.hide();
          })
        })
      },
      unattachSafraCulturaTalhao(safraCulturaTalhaoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja desvincular esse talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.safraCulturaTalhaoService.unattachSafraCulturaTalhao(this.safraCultura.id, safraCulturaTalhaoId).then(() => {
            this.$q.notify({type: 'positive', message: 'Talhão desvinculado com sucesso.'});
            this.$root.$emit('refreshSafrasCulura', true);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível desvincular este talhão.'});
            this.$q.loading.hide();
          })
        })
      },
      unattachCultivar(cultivar, activeTalhao){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja desvincular esse cultivar?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.safraCulturaTalhaoService.unattachCultivar(cultivar.safra_cultura_talhao_cultivar_id, activeTalhao.safra_cultura_talhao_id).then(()=>{
            this.$q.notify({type: 'positive', message: 'Cultivar desvinculado com sucesso.'});
            this.$root.$emit('refreshSafrasCulura', false, true);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível desvincular este cultivar'});
            this.$q.loading.hide();
          })
        });
      },
      updateTamanhoCultivares(talhao){
        this.$refs.updateCultivaresTamanhoModal.openModal(talhao, this.safraCultura);
      },
      goToCultivar(cultivar){
        this.$router.replace({path:'cultivares',query:{marca_id:cultivar.marca_id, cultivar_id:cultivar.id}});
      },
      changeSlidesByTalhaoId(talhaoId){
        let talhao = this.talhoes.find(talhao => talhao.id === talhaoId);
        let areaIndex = this.areas.findIndex(area => area.id === talhao.area_id);
        this.iArea = areaIndex;
        let talhaoIndex = this.talhoesDaArea.findIndex(talhaoArea => talhaoArea.id === talhao.id);
        this.iTalhao = talhaoIndex;
        this.$refs.areasCarousel.goToSlide(areaIndex);
        setTimeout(function () {
          this.$refs.talhoesCarousel.goToSlide(talhaoIndex);
        }.bind(this, talhaoIndex), 300);
      }
    },
  }
</script>

<style scoped>
  .lit-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;

    width: 100%;
  }
  .lit-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }
  .lit-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }
</style>

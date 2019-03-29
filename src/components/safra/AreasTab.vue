<template>
  <div class="row space-end" v-if="visible">

    <template v-if="areas.length > 0">
      <div class="col-12 ">
        <div class="row">

          <!-- GRAFICO DAS AREAS -->
          <div class="col-12" style="min-height: 254px">
            <div @click="media = !media" class="cursor-pointer q-ma-md">
              <q-toggle v-model="media" color="secondary" />
              <template v-if="media">
                Média
                {{safraCultura.view_unidade_medida.sigla}}
                por {{safraCultura.view_unidade_area.sigla}}
              </template>
              <template v-else>
                Total de
                {{safraCultura.view_unidade_medida.sigla}}
              </template>
            </div>
            <safra-grafico-quantidades-por-area
              :areas="areas"
              :media="media"
              :unidade-medida="safraCultura.view_unidade_medida"
              :unidade-area="safraCultura.view_unidade_area"
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
                <q-carousel color="white" arrows quick-nav v-model="iArea" height="250px">
                  <q-carousel-slide v-for="area in areas" :key="area.id" class="q-pa-none" style="overflow: hidden" >
                    <q-card>
                      <q-card-media overlay-position="top">
                        <ap-image size="400x250" :file-name="area.image_file_name" />
                        <q-card-title slot="overlay">
                          {{area.nome}}
                          <span slot="subtitle">{{numeral(area.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}</span>
                          <div slot="right" class="row items-center">
                            <q-btn flat round dense color="white" icon="more_vert" >
                              <q-popover anchor="bottom left">
                                <q-list link>
                                  <q-item v-close-overlay @click.native="deleteSafraCulturaByArea(area.id)">
                                    <q-item-main label="Excluir Área"/>
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
                  :quantidades="areas[iArea]"
                  :unidade-area="safraCultura.view_unidade_area"
                  :unidade-medida="safraCultura.view_unidade_medida"
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
              :unidade-medida="safraCultura.view_unidade_medida"
              :unidade-area="safraCultura.view_unidade_area"
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
                <q-carousel color="white" arrows quick-nav v-model="iTalhao" height="250px">
                  <q-carousel-slide v-for="talhao in talhoesDaArea" :key="talhao.id" class="q-pa-none" style="overflow: hidden" >
                    <q-card>
                      <q-card-media overlay-position="top">
                        <ap-image size="400x250" :file-name="talhao.image_file_name" />
                        <q-card-title slot="overlay">
                          {{activeArea.nome}} {{talhao.nome}}
                          <span slot="subtitle">{{numeral(talhao.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}</span>
                          <div slot="right" class="row items-center">
                            <q-btn flat round dense color="white" icon="more_vert" >
                              <q-popover anchor="bottom left">
                                <q-list link>
                                  <q-item v-close-overlay @click.native="addCultivar(talhao)">
                                    <q-item-main label="Adicionar Cultivar"/>
                                  </q-item>
                                  <q-item v-close-overlay @click.native="deleteSafraCulturaTalhao(talhao.safra_cultura_talhao_id)">
                                    <q-item-main label="Excluir Talhão"/>
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
                  :quantidades="activeTalhao"
                  :unidade-area="safraCultura.view_unidade_area"
                  :unidade-medida="safraCultura.view_unidade_medida"
                >
                  <q-item v-for="cultivar in activeTalhao.cultivares" :key="cultivar.key">
                    <q-item-side v-if="cultivar.image_file_name" :image="imageMakeUrl(cultivar.image_file_name, '200x125')" color="primary"/>
                    <q-item-side v-else icon="spa" color="primary"/>
                    <q-item-main>
                      <q-item-tile>
                        {{cultivar.marca}}
                        {{cultivar.nome}}
                      </q-item-tile>
                      <q-item-tile sublabel>
                        {{numeral(cultivar.tamanho * 100 / activeTalhao.tamanho).format('0,0.0')}}%
                        ({{numeral(cultivar.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.sigla}})
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                </safra-quantidades>
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
  </div>
</template>

<script>
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";
  import safraGraficoQuantidadesPorArea from 'components/safra/graficos/QuantidadesPorArea.vue'
  import safraGraficoQuantidadesPorTalhao from 'components/safra/graficos/QuantidadesPorTalhao.vue'
  import agroUtils from 'assets/js/AgroUtils'
  import safraQuantidades from 'components/safra/Quantidades.vue'
  import apImage from 'components/ApImage'
  import apNoResults from 'components/ApNoResults'
  import newAreaModal from 'components/safra/NewAreaModal'
  import newCultivarModal from 'components/safra/NewCultivarModal'

  export default {
    name: "AreasTab",
    props:{
      visible: false
    },
    components:{
      safraGraficoQuantidadesPorArea,
      safraQuantidades,
      safraGraficoQuantidadesPorTalhao,
      apNoResults,
      newAreaModal,
      newCultivarModal,
      apImage
    },
    data(){
      return{
        safraCulturaService: new SafraCulturaService(),
        media: true,
        safraCultura: null,
        areas: [],
        talhoes: null,
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
      init(safraCultura){
        this.safraCultura = safraCultura;

        this.iArea = 0;
        this.iTalhao = 0;
        this.getContent()
      },
      getContent(){
        this.getAreas();
        this.getTalhoes();
      },
      addArea(){
        this.$refs.newAreaModal.openModal(this.safraCultura);
      },
      addCultivar(talhao){
        console.log(talhao)
        this.$refs.newCultivarModal.openModal(talhao, this.safraCultura);
      },
      imageMakeUrl(fileName, size) {
        return agroUtils.image.makeUrl(fileName, size)
      },
      getAreas(){
        this.$q.loading.show();
        this.safraCulturaService.getAreas(this.safraCultura.safra.id, this.safraCultura.id).then(areas => {
          this.areas = areas.areas;
          this.$q.loading.hide();
        })
      },
      getTalhoes(){
        this.$q.loading.show();
        this.safraCulturaService.getTalhoes(this.safraCultura.safra.id, this.safraCultura.id).then(talhoes => {
          this.talhoes = talhoes.talhoes;
          this.$q.loading.hide();
        })
      },
      deleteSafraCulturaByArea(areaId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar essa área?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.safraCulturaService.deleteSafraCulturaTalhoesByArea(this.safraCultura.id, areaId).then(() => {
            this.$q.notify({type: 'positive', message: 'Área apagada com sucesso.'});
            this.getContent();
            this.$q.loading.hide();
          });
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível excluir esta área'});
          this.$q.loading.hide();
        })
      },
      deleteSafraCulturaTalhao(safraCulturaTalhaoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esse talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.safraCulturaService.deleteSafraCulturaTalhao(this.safraCultura.id, safraCulturaTalhaoId).then(() => {
            this.$q.notify({type: 'positive', message: 'Talhão excluido com sucesso.'});
            /*let talhaoPosition = this.talhoes.findIndex(talhao => talhao.safra_cultura_talhao_id === safraCulturaTalhaoId);
            if(talhaoPosition > -1){
              this.talhoes.splice(talhaoPosition, 1);
            }*/
            this.getContent();
            this.$q.loading.hide();
          });
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível excluir este talhão'});
          this.$q.loading.hide();
        })
      },
    },
    mounted () {
      this.$root.$on('refreshAreasTab', this.getContent);
    },
    destroyed() {
      this.$root.$off('refreshAreasTab', this.getContent);
    }
  }
</script>

<style scoped>

</style>

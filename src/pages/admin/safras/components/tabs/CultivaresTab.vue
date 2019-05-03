<template>
  <div class="row space-end" >
    <template v-if="marcas && cultivares">
      <template v-if="marcas.length > 0 && cultivares.length > 0">
        <div class="col-12 ">
          <div class="row">

            <!-- GRAFICO DAS MARCAS -->
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
              <safra-grafico-quantidades-por-marca
                :marcas="marcas"
                :media="media"
                :unidade-medida="safraCultura.view_unidade_medida"
                :unidade-area="safraCultura.view_unidade_area"
                :height="200"
                :width="100"
                v-model="iMarca"
              />
            </div>


            <!-- DETALHE DAS MARCAS -->
            <div class="col-12 q-mt-md">
              <div class="row" v-if="marcas">
                <!-- CARROUSEL DE MARCAS -->
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                  <q-carousel color="white" arrows quick-nav v-model="iMarca" ref="marcasCarousel">
                    <q-carousel-slide v-for="marca in marcas" :key="marca.id" class="q-pa-none" style="overflow: hidden">
                      <q-card>
                        <q-card-media overlay-position="top">
                          <ap-image size="400x250" :file-name="marca.image_file_name" />
                          <q-card-title slot="overlay">
                            {{marca.nome}}
                            <span slot="subtitle">{{numeral(marca.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}</span>
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
                    :quantidades="marcas[iMarca]"
                    :unidade-area="safraCultura.view_unidade_area"
                    :unidade-medida="safraCultura.view_unidade_medida"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="col-12 q-mt-md space-end">
          <div class="row">

            <!-- GRAFICO DOS CULTIVARES -->
            <div class="col-12 q-mt-md" style="min-height: 200px">
              <safra-grafico-quantidades-por-cultivar
                :cultivares="cultivares"
                :marcaId="activeMarca.id"
                :media="media"
                :unidade-medida="safraCultura.view_unidade_medida"
                :unidade-area="safraCultura.view_unidade_area"
                :height="200"
                :width="100"
                v-model="iCultivar"
              />
            </div>

            <!-- DETALHE DOS CULTIVARES -->
            <div class="col-12 q-mt-md" >
              <div class="row">
                <!-- CARROUSEL DE CULTIVARES -->
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                  <q-carousel color="white" arrows quick-nav v-model="iCultivar" ref="cultivaresCarousel">
                    <q-carousel-slide v-for="cultivar in cultivaresDaMarca" :key="cultivar.id"  class="q-pa-none" style="overflow: hidden" >
                      <q-card>
                        <q-card-media overlay-position="top">
                          <ap-image size="400x250" :file-name="safraCultura.cultura.image_file_name" />
                          <q-card-title slot="overlay">
                            {{activeMarca.nome}} {{cultivar.nome}}
                            <span slot="subtitle">{{numeral(cultivar.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}</span>
                          </q-card-title>
                        </q-card-media>
                      </q-card>
                    </q-carousel-slide>
                  </q-carousel>
                </div>
                <!-- DETALHES DO CULTIVARES -->
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8" v-if="activeCultivar">
                  <safra-quantidades
                    :safra-cultura-id="safraCultura.id"
                    :quantidades="activeCultivar"
                    :unidade-area="safraCultura.view_unidade_area"
                    :unidade-medida="safraCultura.view_unidade_medida">
                  </safra-quantidades>
                  <q-item link v-for="talhao in activeCultivar.talhoes" :key="talhao.id" @click.native="goToTalhao(talhao)">
                    <q-item-side v-if="talhao.image_file_name" :image="imageMakeUrl(talhao.image_file_name, '200x125')" color="primary"/>
                    <q-item-side v-else icon="place" color="primary"/>
                    <q-item-main>
                      <q-item-tile>
                        {{talhao.area}}
                        {{talhao.nome}}
                      </q-item-tile>
                      <q-item-tile sublabel>
                        {{numeral(talhao.tamanho * 100 / activeCultivar.tamanho).format('0,0.0')}}%
                        ({{numeral(talhao.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.sigla}})
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                </div>
              </div>
            </div>

          </div>
        </div>
      </template>

      <template v-else>
        <!--EMPTY LIST-->
        <div class="col-12">
          <ap-no-results mensagem="Nenhuma informação para ser exibida ainda" />
        </div>
      </template>

    </template>
  </div>
</template>

<script>
  import safraQuantidades from '../Quantidades.vue'
  import SafraCulturaService from "../../../../../assets/js/service/safra/SafraCulturaService";
  import safraGraficoQuantidadesPorMarca from '../graficos/QuantidadesPorMarca.vue'
  import safraGraficoQuantidadesPorCultivar from '../graficos/QuantidadesPorCultivar.vue'
  import agroUtils from 'assets/js/AgroUtils'
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'

  export default {
    name: "CultivaresTab",
    components:{
      safraQuantidades,
      safraGraficoQuantidadesPorMarca,
      safraGraficoQuantidadesPorCultivar,
      apNoResults,
      apImage
    },
    props:{
      visible: false,
      safraCultura: Object,
      marcas: Array,
      cultivares: Array,
    },
    computed:{
      activeMarca: function () {
        return this.marcas[this.iMarca];
      },
      cultivaresDaMarca: function () {
        return _.filter(this.cultivares, {marca_id: this.activeMarca.id});
      },
      activeCultivar: function () {
        return this.cultivaresDaMarca[this.iCultivar];
      },
    },
    watch:{
      iMarca(value){
        this.iCultivar = 0;
        let marcaId = this.marcas[value].id;
        let cultivarId = this.cultivaresDaMarca[0].id;
        this.$router.replace({query: Object.assign({}, this.$route.query, {marca_id:marcaId, cultivar_id:cultivarId})});
      },
      iCultivar(value){
        let cultivarId = this.cultivaresDaMarca[value].id;
        this.$router.replace({query:Object.assign({}, this.$route.query, {cultivar_id:cultivarId})});
      }
    },
    data(){
      return{
        safraCulturaService: new SafraCulturaService(),
        iMarca: 0,
        iCultivar: 0,
        media: true,
      }
    },
    methods: {
      onTabSelected(){
        if(this.cultivares && this.marcas) {
          this.checkRoute();
        }
      },
      onDataLoaded(){
        this.checkRoute();
      },
      checkRoute(){
        if(_.isEmpty(this.$route.query)){
          let marcaId = this.marcas[0].id;
          let cultivarId = this.cultivaresDaMarca[0].id;
          this.$router.replace({query: Object.assign({}, this.$route.query, {marca_id:marcaId, cultivar_id:cultivarId})});
        }else{
          this.changeSlidesByCultivarId(parseInt(this.$route.query.cultivar_id));
        }
      },
      imageMakeUrl: function (fileName, size) {
        return agroUtils.image.makeUrl(fileName, size)
      },

      goToTalhao(talhao){
        this.$router.replace({path:'areas', query:{talhao_id:talhao.id, area_id:talhao.area_id}});
      },
      changeSlidesByCultivarId(cultivarId){
        let cultivar = this.cultivares.find(cultivar => cultivar.id === cultivarId);
        let marcaIndex = this.marcas.findIndex(marca => marca.id === cultivar.marca_id);
        this.iMarca = marcaIndex;
        let cultivarIndex = this.cultivaresDaMarca.findIndex(cultivarMarca => cultivarMarca.id === cultivar.id);
        this.iCultivar = cultivarIndex;
        this.$refs.marcasCarousel.goToSlide(marcaIndex);
        this.$refs.cultivaresCarousel.goToSlide(cultivarIndex);

      }
    },
  }
</script>

<style scoped>

</style>

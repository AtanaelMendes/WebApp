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
                  <q-carousel-slide v-for="area in areas" :key="area.id" :img-src="imageMakeUrl(area.image_file_name, '800x500')">
                    <div class="absolute-top carousel-caption">
                      <div class="q-card-title">{{area.nome}}</div>
                      <div class="q-card-subtitle text-white">{{numeral(area.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}</div>
                    </div>
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
                  <q-carousel-slide v-for="talhao in talhoesDaArea" :key="talhao.id" :img-src="imageMakeUrl(talhao.image_file_name, '800x500')">
                    <div class="absolute-top carousel-caption">
                      <div class="q-card-title">{{activeArea.nome}} {{talhao.nome}}</div>
                      <div class="q-card-subtitle text-white">{{numeral(talhao.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}</div>
                    </div>
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
  </div>
</template>

<script>
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";
  import safraGraficoQuantidadesPorArea from 'components/safra/graficos/QuantidadesPorArea.vue'
  import safraGraficoQuantidadesPorTalhao from 'components/safra/graficos/QuantidadesPorTalhao.vue'
  import agroUtils from 'assets/js/AgroUtils'
  import safraQuantidades from 'components/safra/Quantidades.vue'
  import apNoResults from 'components/ApNoResults'
  import newAreaModal from 'components/safra/NewAreaModal'

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
      newAreaModal
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
      activeArea: function () {
        return this.areas[this.iArea];
      },
      activeTalhao: function () {
        return this.talhoesDaArea[this.iTalhao];
      },
      talhoesDaArea: function () {
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

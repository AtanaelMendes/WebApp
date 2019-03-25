<template>
  <div class="row space-end" v-if="visible">
    <div class="col-12 ">
      <div class="row">

        <!-- GRAFICO DAS AREAS -->
        <div class="col-12" style="min-height: 254px">
          <div @click="media = !media" class="cursor-pointer q-ma-md">
            <q-toggle v-model="media" color="secondary" />
            <template v-if="media">
              Média
              {{data.view_unidade_medida.sigla}}
              por {{data.view_unidade_area.sigla}}
            </template>
            <template v-else>
              Total de
              {{data.view_unidade_medida.sigla}}
            </template>
          </div>
          <safra-grafico-quantidades-por-area
            :areas="areas"
            :media="media"
            :unidade-medida="data.view_unidade_medida"
            :unidade-area="data.view_unidade_area"
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
                    <div class="q-card-subtitle text-white">{{numeral(area.tamanho).format('0,0')}} {{data.view_unidade_area.plural}}</div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
            <!-- DETALHES DA AREA -->
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8">
              <safra-quantidades
                :quantidades="areas[iArea]"
                :unidade-area="data.view_unidade_area"
                :unidade-medida="data.view_unidade_medida"
              />
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="col-12 q-mt-md space-end" v-if="talhoes">
      <div class="row">

        <!-- GRAFICO DOS TALHOES -->
        <div class="col-12 q-mt-md" style="min-height: 200px">
          <safra-grafico-quantidades-por-talhao
            :talhoes="this.talhoes"
            :areaId="this.activeArea.id"
            :media="media"
            :unidade-medida="data.view_unidade_medida"
            :unidade-area="data.view_unidade_area"
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
                    <div class="q-card-subtitle text-white">{{numeral(talhao.tamanho).format('0,0')}} {{data.view_unidade_area.plural}}</div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
            <!-- DETALHES DO TALHAO -->
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8" v-if="activeTalhao">
              <safra-quantidades
                :quantidades="activeTalhao"
                :unidade-area="data.view_unidade_area"
                :unidade-medida="data.view_unidade_medida"
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
                      ({{numeral(cultivar.tamanho).format('0,0')}} {{data.view_unidade_area.sigla}})
                    </q-item-tile>
                  </q-item-main>
                </q-item>
              </safra-quantidades>
            </div>
          </div>
        </div>

      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <!--<q-btn round color="deep-orange" size="20px" @click="addArea" icon="add" />-->
    </q-page-sticky>
  </div>
</template>

<script>
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";
  import safraGraficoQuantidadesPorArea from 'components/safra/graficos/QuantidadesPorArea.vue'
  import safraGraficoQuantidadesPorTalhao from 'components/safra/graficos/QuantidadesPorTalhao.vue'
  import agroUtils from 'assets/js/AgroUtils'
  import safraQuantidades from 'components/safra/Quantidades.vue'

  export default {
    name: "AreasTab",
    props:{
      visible: false
    },
    components:{
      safraGraficoQuantidadesPorArea,
      safraQuantidades,
      safraGraficoQuantidadesPorTalhao
    },
    data(){
      return{
        safraCulturaService: new SafraCulturaService(),
        safra_id: null,
        safraCulturaId: null,
        media: true,
        data: null,
        areas: null,
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
      init(safraId, safraCulturaId, data){
        this.safra_id = safraId;
        this.safraCulturaId = safraCulturaId;
        this.data = data;

        this.iArea = 0;
        this.iTalhao = 0;
        this.getAreas();
        this.getTalhoes();
      },
      imageMakeUrl: function (fileName, size) {
        return agroUtils.image.makeUrl(fileName, size)
      },
      getAreas(force = false){
        if (this.areasLoaded & !force) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getAreas(this.safra_id, this.safraCulturaId).then(areas => {
          this.areas = areas.areas;
          this.areasLoaded = true;
          this.$q.loading.hide();
        })
      },
      getTalhoes(force = false){
        if (this.areasLoaded & !force) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getTalhoes(this.safra_id, this.safraCulturaId).then(talhoes => {
          this.talhoes = talhoes.talhoes;
          this.talhoesLoaded = true;
          this.posicionarTalhaoPeloId();
          this.$q.loading.hide();
        })
      },
      posicionarTalhaoPeloId(talhaoId) {
        if (!this.talhoesLoaded) {
          this.talhaoIdPosicionar = talhaoId
          this.getAreas()
          this.getTalhoes()
          return
        }
        if (talhaoId == null) {
          talhaoId = this.talhaoIdPosicionar
        }
        if (talhaoId == null) {
          return
        }

      },
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>

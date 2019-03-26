<template>
  <div class="row space-end" v-if="visible">
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
              <q-carousel color="white" arrows quick-nav v-model="iMarca" height="250px">
                <q-carousel-slide v-for="marca in marcas" :key="marca.id" :img-src="imageMakeUrl(marca.image_file_name, '800x500')">
                  <div class="absolute-top carousel-caption">
                    <div class="q-card-title">{{marca.nome}}</div>
                    <div class="q-card-subtitle text-white">{{numeral(marca.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}</div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
            <!-- DETALHES DA AREA -->
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8">
              <safra-quantidades
                :quantidades="marcas[iMarca]"
                :unidade-area="safraCultura.view_unidade_area"
                :unidade-medida="safraCultura.view_unidade_medida"
              />
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="col-12 q-mt-md space-end" v-if="cultivares && marcas">
      <div class="row">

        <!-- GRAFICO DOS CULTIVARES -->
        <div class="col-12 q-mt-md" style="min-height: 200px">
          <safra-grafico-quantidades-por-cultivar
            :cultivares="this.cultivares"
            :marcaId="this.activeMarca.id"
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
              <q-carousel color="white" arrows quick-nav v-model="iCultivar" height="250px">
                <q-carousel-slide v-for="cultivar in cultivaresDaMarca" :key="cultivar.id" :img-src="imageMakeUrl(safraCultura.cultura.image_file_name, '800x500')">
                  <div class="absolute-top carousel-caption">
                    <div class="q-card-title">{{activeMarca.nome}} {{cultivar.nome}}</div>
                    <div class="q-card-subtitle text-white">{{numeral(cultivar.tamanho).format('0,0')}} {{safraCultura.view_unidade_area.plural}}</div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
            <!-- DETALHES DO CULTIVARES -->
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-8" v-if="activeCultivar">
              <safra-quantidades
                :quantidades="activeCultivar"
                :unidade-area="safraCultura.view_unidade_area"
                :unidade-medida="safraCultura.view_unidade_medida">
                <q-item v-for="talhao in activeCultivar.talhoes" :key="talhao.id" class="cursor-pointer" @click.native="posicionarTalhaoPeloId(talhao.id)">
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
              </safra-quantidades>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import safraQuantidades from 'components/safra/Quantidades.vue'
  import SafraCulturaService from "../../assets/js/service/safra/SafraCulturaService";
  import safraGraficoQuantidadesPorMarca from 'components/safra/graficos/QuantidadesPorMarca.vue'
  import safraGraficoQuantidadesPorCultivar from 'components/safra/graficos/QuantidadesPorCultivar.vue'
  import agroUtils from 'assets/js/AgroUtils'

  export default {
    name: "CultivaresTab",
    components:{
      safraQuantidades,
      safraGraficoQuantidadesPorMarca,
      safraGraficoQuantidadesPorCultivar
    },
    props:{
      visible: false
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
    data(){
      return{
        safraCulturaService: new SafraCulturaService(),
        safraCultura: null,
        iMarca: 0,
        iCultivar: 0,
        media: true,
        marcas: null,
        cultivares: null,
      }
    },
    methods: {
      init(safraCultura){
        this.safraCultura = safraCultura;

        this.iMarca = 0;
        this.iCultivar = 0;
        this.getMarcas();
        this.getCultivares();
      },
      imageMakeUrl: function (fileName, size) {
        return agroUtils.image.makeUrl(fileName, size)
      },
      getMarcas: function(force = false){
        if (this.marcasLoaded & !force) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getMarcas(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.marcas = response.marcas;
          this.marcasLoaded = true;
          this.$q.loading.hide();
        })
      },
      getCultivares: function(force = false){
        if (this.cultivaresLoaded & !force) {
          return;
        }
        this.$q.loading.show();
        this.safraCulturaService.getCultivares(this.safraCultura.safra.id, this.safraCultura.id).then(response => {
          this.cultivares = response.cultivares;
          this.cultivaresLoaded = true;
          this.$q.loading.hide();
        })
      },
    }
  }
</script>

<style scoped>

</style>

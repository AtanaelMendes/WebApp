<template>
  <custom-page isParent>
    <toolbar slot="toolbar" v-if="safraCultura" :title="safraCultura.inicio + '/' + safraCultura.fim" navigation_type="back" @navigation_clicked="backAction" >
    </toolbar>

    <div class="row q-pa-md">
      <div class="col-12">

        <q-card class="q-mb-md">
          <div class="row">

            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
              <div style="max-height: 200px; overflow: hidden">
                <img src="assets/images/soja2.jpg" style="max-width: 100%"/>
              </div>

            </div>

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div class="row gutter-y-xs q-pa-md">

                <div class="col-12 text-faded">
                  <!--Plantio total em {{getSafraCulturaTotalArea()}} hectares (100%)-->
                </div>

                <!--NEGOCIADO-->
                <div class="col-12">
                  <div class="row">

                    <div class="col-6 q-caption text-faded">
                      Negociado 100%
                    </div>

                    <div class="col-6 self-center">
                      <q-progress color="deep-orange" :percentage="progressBuffer"/>
                    </div>

                    <div class="col-6">
                      55 Sc/Ha
                    </div>

                    <div class="col-6">
                      10.000 Sacas
                    </div>

                  </div>
                </div>

                <!--ESTIMATIVA-->
                <div class="col-12">
                  <div class="row">

                    <div class="col-12 q-caption text-faded">
                      Estimativa
                    </div>

                    <div class="col-6">
                      55 Sc/Ha
                    </div>

                    <div class="col-6">
                      27.500 Sacas
                    </div>

                  </div>
                </div>

                <!--COLHIDO-->
                <div class="col-12">
                  <div class="row">

                    <div class="col-12 q-mb-xs">
                      <div class="row">
                        <div class="col-6 text-faded">
                          Colhido 53,9%
                        </div>
                        <div class="col-6 self-center">
                          <q-progress color="deep-orange" :percentage="progressBuffer"/>
                        </div>
                      </div>

                    </div>

                    <div class="col-6">
                      32 Sc/Ha
                    </div>

                    <div class="col-6">
                      16.000 Sacas
                    </div>

                  </div>
                </div>


              </div>
            </div>
          </div>
        </q-card>

        <div class="row gutter-xs" v-if="safraCultura">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="culturaTalhao in safraCultura.cultura_talhoes" :key="culturaTalhao.id">
            <q-card>

              <q-card-media>
                <img src="/assets/images/talhao1.jpeg"/>
              </q-card-media>
              <q-card-separator/>

              <q-card-title class="q-py-sm">
                {{culturaTalhao.talhao.nome}}
                <q-btn round flat dense icon="more_vert" slot="right">
                  <q-popover>
                    <q-list link class="no-border">
                      <q-item v-close-overlay>
                        <!--<q-item-main @click.native="updateContato(contato.id)" label="Editar" />-->
                        <q-item-main label="ação 1" />
                      </q-item>
                      <q-item v-close-overlay >
                        <q-item-main label="ação 2"/>
                      </q-item>
                      <q-item v-close-overlay>
                        <q-item-main label="ação 3"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </q-card-title>
              <q-card-separator/>

              <q-card-main class="gutter-xs">

                <!--CULTURA TALHAO-->
                <div class="row">
                  <div class="col-12 text-faded q-caption">
                    {{formatCulturaTalhaoTamanhoLabel(culturaTalhao)}}
                  </div>

                  <div class="col-xs-10 col-sm-10 col-md-9 col-lg-9 self-center">
                    <span class="q-subheading">98Y70</span>
                  </div>

                  <div class="col-xs-2 col-sm-2 col-md-3 col-lg-3">
                    <img src="/assets/images/pioneer.jpg" class="responsive"/>
                  </div>
                </div>

                <!--ESTIMATIVA  TALHAO-->
                <div class="row">
                  <div class="col-12">
                    <div class="row">

                      <div class="col-12 q-caption text-faded">
                        Estimativa
                      </div>

                      <div class="col-6">
                        <!--{{culturaTalhao.estimativa}} {{culturaTalhao.estimativa_unidade_medida.sigla}}/{{culturaTalhao.talhao.tamanho_unidade_area.sigla}}-->
                      </div>

                      <div class="col-6 text-right">
                        <!--{{culturaTalhao.estimativa * culturaTalhao.tamanho}} {{culturaTalhao.estimativa_unidade_medida.nome}}-->
                      </div>

                    </div>
                  </div>
                </div>

                <!--COLHIDO POR TALHAO-->
                <div clas="row">
                  <div class="col-12 gutter-y-xs">

                    <div class="row">
                      <div class="col-6 text-faded">
                        Colhido 53,9%
                      </div>
                      <div class="col-6 self-center">
                        <q-progress color="deep-orange" :percentage="progressBuffer"/>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        29.67 Sc/Ha
                      </div>

                      <div class="col-6 text-right">
                        5.342 Sacas
                      </div>
                    </div>

                  </div>
                </div>

              </q-card-main>
            </q-card>
          </div>
        </div>


        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
      </div>
    </div>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  export default {
    name: "safra-cultura",
    components: {
      toolbar,
      customPage
    },
    data () {
      return {
        safraCultura: null,
        progressBuffer: 53.9
      }
    },
    methods: {
      getSafraCultura: function(safra_id, id){
        safraCulturaService.getSafraCultura(safra_id, id).then(response => {
          this.safraCultura = response.data;
        })
      },
      formatCulturaTalhaoTamanhoLabel: function(culturaTalhao){
        if(culturaTalhao.tamanho === culturaTalhao.talhao.tamanho){
          return culturaTalhao.tamanho + ' ' + culturaTalhao.talhao.tamanho_unidade_area.nome + ' (100%)'
        }else{
          let porcentagem = culturaTalhao.tamanho / culturaTalhao.talhao.tamanho * 100;
          return culturaTalhao.tamanho + ' de ' + culturaTalhao.talhao.tamanho + ' ' + culturaTalhao.talhao.tamanho_unidade_area.nome +  ' (' + porcentagem + '%)';
        }
      },
      getSafraCulturaTotalArea: function () {
        return this.safraCultura.cultura_talhoes.map(function (culturaTalhao) {
          return culturaTalhao.talhao.tamanho;
        }).reduce((a, b) => a + b);
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted () {
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
      this.getSafraCultura(this.$route.params.safra_id, this.$route.params.id)
    },
  }
</script>
<style>
</style>

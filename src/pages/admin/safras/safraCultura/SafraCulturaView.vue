<template>
  <custom-page isParent>
    <toolbar slot="toolbar" v-if="safraCultura" :title="safraCultura.inicio + '/' + safraCultura.fim" navigation_type="back" @navigation_clicked="backAction" >
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end" v-if="safraCultura">

      <!--HEADER-->
      <div class="col-12">
        <q-card class="q-mb-md">
          <div class="row">

            <!--IMAGEM HEADER-->
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
              <div style="max-height: 200px; overflow: hidden">
                <img src="assets/images/soja2.jpg" class="responsive"/>
              </div>
            </div>

            <!--INFO DO HEADER-->
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div class="row gutter-y-xs q-pa-md">

                <div class="col-12 text-faded" v-if="loaded">
                  Plantio total em {{getSafraCulturaTotalArea()}} hectares (100%)
                </div>

                <!--NEGOCIADO-->
                <!--<div class="col-12">-->
                  <!--<div class="row">-->

                    <!--<div class="col-6 q-caption text-faded">-->
                      <!--Negociado 000%-->
                    <!--</div>-->

                    <!--&lt;!&ndash;BARRA DE % DO NEGOCIADO&ndash;&gt;-->
                    <!--<div class="col-6 self-center">-->
                      <!--<q-progress color="deep-orange" :percentage="progressBuffer"/>-->
                    <!--</div>-->

                    <!--&lt;!&ndash;TOTAL SACAS POR HECTARE&ndash;&gt;-->
                    <!--<div class="col-6">-->
                      <!--0000 Sc/Ha-->
                    <!--</div>-->

                    <!--&lt;!&ndash;TOTAL DE SACAS&ndash;&gt;-->
                    <!--<div class="col-6">-->
                      <!--00000 Sacas-->
                    <!--</div>-->

                  <!--</div>-->
                <!--</div>-->

                <!--ESTIMATIVA TOTAL-->
                <div class="col-12">
                  <div class="row">

                    <div class="col-12 q-caption text-faded">
                      Estimativa
                    </div>

                    <!--ESTIMATIVA TOTAL DE SACAS POR HECTARE-->
                    <div class="col-6">
                      000 Sc/Ha
                    </div>

                    <!--ESTIMATIVA TOTAL DE SACAS-->
                    <div class="col-6">
                      00000 Sacas
                    </div>

                  </div>
                </div>

                <!--TOTAL COLHIDO-->
                <!--<div class="col-12">-->
                  <!--<div class="row">-->

                    <!--<div class="col-12 q-mb-xs">-->
                      <!--<div class="row">-->
                        <!--<div class="col-6 q-caption text-faded">-->
                          <!--Colhido 000%-->
                        <!--</div>-->
                        <!--<div class="col-6 self-center">-->
                          <!--<q-progress color="deep-orange" :percentage="progressBuffer"/>-->
                        <!--</div>-->
                      <!--</div>-->

                    <!--</div>-->

                    <!--<div class="col-6">-->
                      <!--000 Sc/Ha-->
                    <!--</div>-->

                    <!--<div class="col-6">-->
                      <!--00000 Sacas-->
                    <!--</div>-->

                  <!--</div>-->
                <!--</div>-->

              </div>
            </div>
          </div>
        </q-card>
      </div>

      <!--INOFORMAÇOES-->
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
                  <!--<q-item v-close-overlay>-->
                    <!--<q-item-main label="Informar cultivar" @click.native="addCultivar"/>-->
                  <!--</q-item>-->
                  <q-item v-close-overlay >
                    <q-item-main label="Editar" @click.native="editSafraCulturaTalhao(culturaTalhao)"/>
                  </q-item>
                  <q-item v-close-overlay>
                    <q-item-main label="Excluir" @click.native="deleteSafraCulturaTalhao(culturaTalhao)"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-card-title>
          <q-card-separator/>

          <q-card-main class="gutter-xs">

            <!--CULTURA TALHAO-->
            <!--<div class="row">-->
              <!--<div class="col-12 text-faded q-caption">-->
                <!--{{formatCulturaTalhaoTamanhoLabel(culturaTalhao)}}-->
              <!--</div>-->

              <!--<div class="col-xs-10 col-sm-10 col-md-9 col-lg-9 self-center">-->
                <!--<span class="q-subheading">98Y70</span>-->
              <!--</div>-->

              <!--<div class="col-xs-2 col-sm-2 col-md-3 col-lg-3">-->
                <!--<img src="/assets/images/pioneer.jpg" class="responsive"/>-->
              <!--</div>-->
            <!--</div>-->

            <!--ESTIMATIVA  TALHAO-->
            <div class="row">
              <div class="col-12">
                <div class="row">

                  <div class="col-12 q-caption text-faded">
                    Estimativa
                  </div>

                  <div class="col-6">
                    {{culturaTalhao.estimativa}} Sc/Ha
                  </div>

                  <div class="col-6 text-right">
                    {{culturaTalhao.tamanho * culturaTalhao.estimativa}} Sacas
                  </div>

                </div>
              </div>
            </div>

            <!--COLHIDO POR TALHAO-->
            <!--<div clas="row">-->
              <!--<div class="col-12 gutter-y-xs">-->

                <!--<div class="row">-->
                  <!--<div class="col-6 text-faded">-->
                    <!--Colhido 000%-->
                  <!--</div>-->
                  <!--<div class="col-6 self-center">-->
                    <!--<q-progress color="deep-orange" :percentage="progressBuffer"/>-->
                  <!--</div>-->
                <!--</div>-->

                <!--<div class="row">-->
                  <!--<div class="col-6">-->
                    <!--000 Sc/Ha-->
                  <!--</div>-->

                  <!--<div class="col-6 text-right">-->
                    <!--000 Sacas-->
                  <!--</div>-->
                <!--</div>-->

              <!--</div>-->
            <!--</div>-->

          </q-card-main>
        </q-card>

      </div>
    </div>

    <q-modal minimized no-backdrop-dismiss v-model="modalEditSafraCulturaTalhao" v-if="selectedSafraCulturaTalhao">
      <form @keyup.enter="updadeSafraCulturatalhao()">
        <div class="column q-ma-md items-center">
          <div class="col-6 q-title">
            {{selectedSafraCulturaTalhao.talhao.nome}}
          </div>
          <div class="col-6 text-justify">

            <q-list-header>Área à ser utilizada</q-list-header>
            <q-item dense>
              <div class="row gutter-x-sm">
                <div class="col-8 self-center">
                  <q-slider
                    label
                    :min="0"
                    :max="selectedSafraCulturaTalhao.talhao.tamanho"
                    v-model="safraCulturaTalhao.tamanho.value"
                    :label-value="`${safraCulturaTalhao.tamanho.value} ha`"
                  />
                </div>
                <div class="col-4">
                  <custom-input-text  type="number" suffix="ha." :model="safraCulturaTalhao.tamanho"
                                      @blur="checkInputMaxSize(safraCulturaTalhao.tamanho.value, selectedSafraCulturaTalhao)"
                  />
                </div>
              </div>
            </q-item>

            <q-list no-border dense class="q-py-none">
              <q-list-header>Estimativa por Hectare</q-list-header>
              <q-item dense>
                <div class="row gutter-x-sm">
                  <div class="col-3">
                    <custom-input-text  type="number" :model="safraCulturaTalhao.estimativa" />
                  </div>
                  <div class="col-9 self-center">
                    <!--label de unidade-->
                    Sacas (60kg)
                  </div>
                </div>
              </q-item>
            </q-list>

          </div>
        </div>

        <div class="row" position="bottom-right" :offset="[30, 30]">
          <div class="col-12 q-pa-sm" align="end">
            <q-btn color="primary" @click.native="modalEditSafraCulturaTalhao = false" label="cancelar" class="q-mr-sm"/>
            <q-btn color="primary" @click.native="updadeSafraCulturatalhao" label="salvar"/>
          </div>
        </div>

      </form>
    </q-modal>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import SafraCulturaTalhaoEdit from 'assets/js/model/safra/SafraCulturaTalhaoEdit'
  export default {
    name: "safra-cultura",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data () {
      return {
        loaded: false,
        safraCultura: [],
        safraCulturaTalhao: new SafraCulturaTalhaoEdit(),
        progressBuffer: 100,
        selectedSafraCulturaTalhao: null,
        modalEditSafraCulturaTalhao: false
      }
    },
    methods: {
      getSafraCultura: function(safra_id, id){
        safraCulturaService.getSafraCultura(safra_id, id).then(response => {
          this.safraCultura = response.data;
          this.loaded = true;
        })
      },
      addCultivar: function(){},
      editSafraCulturaTalhao: function(data){
        this.selectedSafraCulturaTalhao = data;
        this.fillSafraculturaTalhaoForm(data);
        this.modalEditSafraCulturaTalhao = true;
      },
      fillSafraculturaTalhaoForm: function(data){
        this.safraCulturaTalhao.estimativa.value = data.estimativa;
        this.safraCulturaTalhao.tamanho.value = data.tamanho;
      },
      updadeSafraCulturatalhao: function(){
        if(!this.safraCulturaTalhao.isValid()){
          return;
        }
        safraCulturaService.updateSafraCulturaTalhao(
          this.$route.params.id,
          this.selectedSafraCulturaTalhao.talhao.id, this.safraCulturaTalhao.getValues()).then(response => {
          if(response.status === 200) {
            this.modalEditSafraCulturaTalhao = false;
            this.$q.notify({type: 'positive', message: 'Atualizdo com sucesso'});
            this.getSafraCultura(this.$route.params.safra_id, this.$route.params.id);
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.request.response})
        });
      },
      deleteSafraCulturaTalhao: function(data){
        safraCulturaService.deleteSafraCultura(safra_id, data.talhao.id).then(response => {
          this.getSafraCultura(this.$route.params.safra_id, this.$route.params.id);
        });
      },
      getSafraCulturaTotalArea: function () {
        return this.safraCultura.cultura_talhoes.map(function (culturaTalhao) {
          return culturaTalhao.talhao.tamanho;
        }).reduce((a, b) => a + b);
      },
      checkInputMaxSize: function(newVal, oldVal){
        if(newVal > oldVal.talhao.tamanho){
          this.safraCulturaTalhao.tamanho.value = oldVal.talhao.tamanho
        }
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted () {
      this.getSafraCultura(this.$route.params.safra_id, this.$route.params.id);
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
</script>
<style>
  .space-end{
    margin-bottom: 200px;
  }
</style>

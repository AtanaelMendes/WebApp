<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Listagem de Safras" searchable navigation_type="menu" >
    </toolbar>

    <div class="row q-pa-md space_end">
      <div class="col-12">

        <div class="row gutter-y-lg" >
          <div class="col-12" v-for="safra in safras" :key="safra.id">

            <div class="row q-title q-pa-md q-mb-md bg-blue-grey-1">
              <div class="col-9 self-center">
                <span v-if="!safra.is_safrinha">Safra</span>
                <span v-if="safra.is_safrinha">Safrinha</span>
                {{safra.inicio}} - {{safra.fim}}
              </div>
              <div class="col-3" align="end">
                <q-checkbox
                  @input="favoriteSafra(safra.id, safra.is_favorite)"
                  color="deep-orange"
                  checked-icon="flag"
                  v-model="safra.is_favorite"
                  unchecked-icon="outlined_flag"
                />
                <q-btn icon="add" color="primary" @click="addSafraCultura(safra.id)" flat round/>
              </div>

            </div>

            <!--LISTA DE SAFRA CULTURAS-->
            <div class="row gutter-sm" v-if="safra.safra_culturas.length > 0">
              <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" v-for="safraCultura in safra.safra_culturas" :key="item">
                <q-card @click.native="viewSafraCultura(safra)">
                  <q-card-title class="q-py-xs">
                    Soja
                  </q-card-title>
                  <q-card-separator/>

                  <q-card-main class="q-pa-xs">
                    <div class="row gutter-y-xs q-pa-md">

                      <div class="col-12 text-faded">
                        Total 500 hectares
                      </div>

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
                            27.500 Sacas
                          </div>

                        </div>
                      </div>

                      <div class="col-12">
                        <div class="row">

                          <div class="col-12 q-mb-xs">
                            <div class="row" v-if="safra > 1 ">
                              <div class="col-6 text-faded">
                                Colhido 100%
                              </div>
                              <div class="col-6 self-center">
                                <q-progress color="deep-orange" :percentage="progressBuffer"/>
                              </div>
                            </div>

                            <div class="row" v-if="safra == 1">
                              <div class="col-6 text-faded">
                                Colhido 55%
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
                  </q-card-main>
                </q-card>
              </div>
            </div>

            <!--LISTA VAZIA-->
            <div class="row q-mt-xl" v-else>
              <div class="col-12 q-title text-center text-faded">
                <q-icon name="warning" color="warning" size="30px"/> Não há informaçôes sobre essa safra
              </div>
            </div>

          </div>
        </div>

        <q-page-sticky position="bottom-right" :offset="[30, 30]">
          <q-btn round color="primary" size="20px" @click="addSafra" icon="add" />
        </q-page-sticky>
      </div>
    </div>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import safraService from 'assets/js/service/safra/SafraService'
    export default {
      name: "safra-list",
      components: {
        toolbar,
        customPage
      },
      data () {
        return {
          isFavorite: false,
          safras: [],
          progressBuffer: 75
        }
      },
      // watch: {
      //   isFavorite: function (val) {
      //     console.log(val)
      //   }
      // },
      methods: {
        favoriteSafra: function(id, pin){
          safraService.favoriteSafra(id, pin).then(response => {
            this.listSafras()
          })
        },
        addSafraCultura: function(id){
          this.$router.push({name: 'add_cultura_safra', params: {id:id}});
        },
        listSafras: function(){
          safraService.listSafras().then(response => {
            this.safras = response.data;
          })
        },
        viewSafraCultura: function (id) {
          this.$router.push({name: 'view_cultura_safra', params: {id:id}});
        },
        addSafra: function () {
          // this.$router.push({name: 'cultura_safra', params: {id:id}});
          this.$router.push({name: 'add_safra'});
        }
      },
      mounted () {
        this.listSafras()
        // this.$root.$on('refreshSafraList', () => {
        //   this.listSafras();
        // });
      },
    }
</script>
<style>
  .space_end{
    margin-bottom: 150px;
  }
</style>

<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Safras" searchable navigation_type="menu" >
    </toolbar>

    <div class="row q-pa-md gutter-sm space-end" v-if="safras">
      <template v-for="safra in safras">

        <!--HEADER-->
        <div class="col-12" :key="safra.id" >

          <q-item style="border-bottom-style: solid;   border-width: 1px; border-color: #e0e0e0">
            <q-item-main class="q-title">
              <span v-if="!safra.is_safrinha">Safra</span>
              <span v-if="safra.is_safrinha">Safrinha</span>
              {{safra.inicio}}/{{safra.fim}}
              <div class="float-right">
                <q-checkbox class="q-mx-xs"
                            @input="favoriteSafra(safra.id, safra.is_favorite)"
                            color="deep-orange"
                            checked-icon="flag"
                            v-model="safra.is_favorite"
                            unchecked-icon="outlined_flag"
                />
                <q-btn round flat dense icon="more_vert" color="grey-7">
                  <q-popover>
                    <q-list link class="no-border">
                      <q-item v-close-overlay @click.native="addSafraCultura(safra.id)">
                        <q-item-main label="Adicionar Cultura"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="editSafra(safra)">
                        <q-item-main label="Editar"/>
                      </q-item>
                      <q-item v-close-overlay v-if="!safra.deleted_at" @click.native="archiveSafra(safra.id)" >
                        <q-item-main label="Arquivar"/>
                      </q-item>
                      <q-item v-close-overlay v-if="safra.deleted_at" @click.native="restoreSafra(safra.id)">
                        <q-item-main label="Ativar"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="deleteSafra(safra.id)">
                        <q-item-main label="Excluir"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </div>
            </q-item-main>
          </q-item>
        </div>

        <!--LISTA DE SAFRA CULTURAS-->
        <template v-if="safra.safra_culturas.length > 0">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="safraCultura in safra.safra_culturas" :key="safra.id + '_' +safraCultura.id">

            <q-card class="cursor-pointer" @click.native="viewSafraCultura(safra.id, safraCultura.id)">
              <q-card-media overlay-position="top">

                <ap-image size="400x250" :file-name="safraCultura.image_file_name"/>

                <q-card-title slot="overlay">

                  {{safraCultura.nome}} {{safra.inicio}}/{{safra.fim}}
                  <span slot="subtitle">
                  {{safraCultura.tamanho}} {{safraCultura.view_unidade_area.plural}}
                  </span>
                  <q-btn @click.stop round flat dense icon="more_vert" slot="right" color="white">
                    <q-popover>
                      <q-list link class="no-border">
                        <q-item v-close-overlay v-if="!safraCultura.deleted_at" @click.native="archiveSafraCultura(safra.id, safraCultura.id)">
                          <q-item-main label="Arquivar"/>
                        </q-item>
                        <q-item v-close-overlay v-if="safraCultura.deleted_at" @click.native="restoreSafraCultura(safra.id, safraCultura.id)">
                          <q-item-main label="Ativar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="deleteSafraCultura(safra.id, safraCultura.id)">
                          <q-item-main label="Excluir"/>
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>

                </q-card-title>
              </q-card-media>

              <q-card-main class="fullheight">
                <safra-quantidades
                  :quantidades="safraCultura.totals"
                  :unidade-area="safraCultura.view_unidade_area"
                  :unidade-medida="safraCultura.view_unidade_medida"
                />
              </q-card-main>
            </q-card>

          </div>
        </template>

        <!--LISTA VAZIA-->
        <div class="col-12 q-title text-center text-faded" v-else>
          <p class="cursor-pointer" @click="addSafraCultura(safra.id)">
            Clique aqui para adicionar uma cultura neste período de safra!
          </p>
        </div>

      </template>
    </div>

    <!--EMPTY LIST-->
    <div class="col-12" v-if="safras.length <= 0">
      <ap-no-results />
    </div>

    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-btn round color="deep-orange" size="20px" @click="addSafra" icon="add" />
    </q-page-sticky>

    <!--MODAL SAFRA CULTURA-->
    <new-cultura-modal ref="newCulturaModal" />

    <!--MODAL NEW SAFRA-->
    <new-safra-modal ref="newSafraModal" />

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'
  import newCulturaModal from 'components/safra/NewCulturaModal'
  import newSafraModal from 'components/safra/NewSafraModal'
  import SafraService from "../../../assets/js/service/safra/SafraService";
  import safraQuantidades from 'components/safra/Quantidades.vue'
  import SafraCulturaService from "../../../assets/js/service/safra/SafraCulturaService";

    export default {
      name: "safra-list",
      components: {
        apNoResults,
        toolbar,
        customPage,
        safraQuantidades,
        apImage,
        newCulturaModal,
        newSafraModal
      },
      data () {
        return {
          safraService: new SafraService(),
          safraCulturaService: new SafraCulturaService(),
          // SAFRA
          isFavorite: false,
          safras: [],
        }
      },
      methods: {
        getNewSafraRequest: async function(safras){
          let newSafra = [];
          for(var safra of safras){

            newSafra.push({
              id: safra.id,
              inicio: safra.inicio,
              fim: safra.fim,
              is_safrinha: safra.is_safrinha,
              is_favorite: safra.is_favorite,
              safra_culturas: await this.getTotals(safra)
            })
          }
          this.safras = newSafra;
        },
        getTotals: async function(safra){
          let result = null;
          let newSafraCultura = [];
          for(var safraCultura of safra.safra_culturas){

            result = await this.getSafraCulturaTotals(safra.id, safraCultura.id);
            safraCultura.totals = result.totals;
            newSafraCultura.push(safraCultura);

          }
          return newSafraCultura
        },
        getSafraCulturaTotals: function(safraId, safraCulturaId){
          return this.safraCulturaService.getSafraCultura(safraId, safraCulturaId).then(safraCulturaTotals => {
            return safraCulturaTotals
          });
        },

        // SAFRA CRUD
        favoriteSafra(id, pin){
          this.$q.loading.show();
          this.safraService.favoriteSafra(id, pin).then(() => {
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        listSafras(){
          this.$q.loading.show();
          this.safraService.listSafras().then(safras => {
            this.getNewSafraRequest(safras);
            this.$q.loading.hide();
          })
        },
        addSafra() {
          this.$refs.newSafraModal.openModal()
        },
        editSafra(safra){
          this.$refs.newSafraModal.openModal(safra)
        },
        archiveSafra: function(id){
          this.$q.loading.show();
          this.safraService.archiveSafra(id).then(() => {
            this.$q.notify({type: 'positive', message: 'Safra arquivda com sucesso!'});
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        restoreSafra: function(id){
          this.$q.loading.show();
          this.safraService.restoreSafra(id).then(() => {
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        deleteSafra: function(id){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar essa safra?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            this.$q.loading.show();
            this.safraService.deleteSafra(id).then(() => {
              this.listSafras();
              this.$q.loading.hide();
            }).catch(error => {
              if(error.response.status){
                this.$q.loading.hide();
                this.$q.dialog({
                  title: 'Atenção',
                  message: 'Esta safra possui talhões dentro! Apague-os primeiro.',
                  color: 'primary'
                })
              }
            })
          }).catch(()=>{});
        },

        // CREATE SAFRA CULTURA
        addSafraCultura: function(safraId){
          this.$refs.newCulturaModal.openModal(safraId)
        },
        viewSafraCultura: function (safra_id, id) {
          this.$router.push({name: 'view_safra_cultura', params: {safra_id:safra_id, id:id}});
        },
        archiveSafraCultura: function(safra_id, id){
          this.$q.loading.show();
          this.safraCulturaService.archiveSafraCultura(safra_id, id).then(() => {
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        restoreSafraCultura: function(safra_id, id){
          this.$q.loading.show();
          this.safraCulturaService.restoreSafraCultura(safra_id, id).then(() => {
            this.listSafras();
            this.$q.loading.hide();
          })
        },
        deleteSafraCultura: function(safra_id, id){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar esse talhão?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            this.$q.loading.show();
            this.safraCulturaService.deleteSafraCultura(safra_id, id).then(() => {
              this.listSafras();
              this.$q.loading.hide();
            })
          })
        },
      },
      mounted () {
        this.$root.$on('refreshSafrasList', this.listSafras);
        this.listSafras();
      },
      destroyed() {
        this.$root.$off('refreshSafrasList', this.listSafras);
      }
    }
</script>
<style>
</style>

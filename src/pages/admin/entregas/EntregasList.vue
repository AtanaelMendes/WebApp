<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Entregas" navigation_type="menu">

      <template slot="action_itens">
        <q-btn flat round dense icon="mdi-filter" @click="openFilterModal" />
        <q-btn flat round dense icon="mdi-file-excel" />
      </template>

      <div slot="tabs">
        <q-tabs v-model="tabs" ref="tabs" @select="switchTab">
          <q-route-tab slot="title" :to="{ name: 'entregas', query: { status: 'carregando' }}" replace default name="carregando" label="Carregando" ></q-route-tab>
          <q-route-tab slot="title" :to="{ name: 'entregas', query: { status: 'no-armazem' }}" replace name="no-armazem" label="No armazém" ></q-route-tab>
          <q-route-tab slot="title" :to="{ name: 'entregas', query: { status: 'entregue' }}" replace name="entregue" label="Entregue" ></q-route-tab>
        </q-tabs>
      </div>

    </toolbar>

    <ap-filter-result-bar ref="filerResultBar" @clear_button_clicked="clearFilter(true)" />

    <!--TAB CARREGANDO-->
    <div class="row gutter-sm space-end q-pa-md" v-if="tabs === 'carregando' ">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4" v-for="entrega in entregasCarregando" :key="entrega.id">

        <q-card @click.native="viewCarga(entrega)" class="cursor-pointer">
          <q-card-media overlay-position="top">
            <q-card-title slot="overlay">
              {{entrega.caminhao.placa}}
              {{ entrega.caminhao.nome }}
              <span slot="subtitle">
                {{moment(entrega.inicio_carregamento).fromNow()}}
              </span>
              <div slot="right">
                <q-btn @click.stop round flat dense icon="more_vert" color="white" @click.stop>
                  <q-popover>
                    <q-list link no-boder>
                      <q-item v-close-overlay @click.native="deleteEntrega(entrega.id)">
                        <q-item-main label="Excluir"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </div>
            </q-card-title>
            <ap-image size="400x250" :file-name="entrega.caminhao.image_file_name" />
            <div class="q-ma-sm q-pa-xs" style="position: absolute;bottom: 0;right: 0;background:#f4f4f4;border-radius:50%;" v-if="entrega.isInQueueState">
              <q-icon name="mdi-sync-alert" size="20px" style="" color="deep-orange"/>
              <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" :delay="200">Item não sincronizado</q-tooltip>
            </div>
          </q-card-media>

          <q-list>
            <q-item v-for="safra_cultura_talhao in entrega.safra_culturas_talhoes" :key="safra_cultura_talhao.id">
              <q-item-side icon="spa" />
              <q-item-main>
                <q-item-tile label>
                  {{safra_cultura_talhao.area}}
                  {{safra_cultura_talhao.talhao}}
                </q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>

        </q-card>
      </div>

      <!--EMPTY LIST-->
      <div class="col-12" v-if="entregasCarregando <= 0">
        <ap-no-results />
      </div>

      <!--PAGE STICKY BUTTOMS-->
      <q-page-sticky position="bottom-right" :offset="[35, 35]">
        <q-btn
          color="deep-orange"
          icon="add"
          @click="novaEntrega()"
          round
          size="19px"
        />
      </q-page-sticky>

    </div>

    <!--TAB NO ARMAZEM-->
    <div class="row gutter-sm space-end q-pa-md" v-if="tabs === 'no-armazem' ">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4" v-for="entrega in entregasNoArmazem" :key="entrega.id">
        <q-card @click.native="viewCarga(entrega)" class="cursor-pointer">
          <q-card-media overlay-position="top">
            <q-card-title slot="overlay">
              {{entrega.caminhao.placa}}
              {{ entrega.caminhao.nome }}
              <span slot="subtitle">
                {{moment(entrega.envio_armazem).fromNow()}}
              </span>
              <div slot="right">
                <q-btn @click.stop round flat dense icon="more_vert" color="white" @click.stop>
                  <q-popover>
                    <q-list link no-boder>
                      <q-item v-close-overlay @click.native="deleteEntrega(entrega.id)">
                        <q-item-main label="Excluir"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </div>
            </q-card-title>
            <ap-image size="400x250" :file-name="entrega.caminhao.image_file_name" />
            <div class="q-ma-sm q-pa-xs" style="position: absolute;bottom: 0;right: 0;background:#f4f4f4;border-radius:50%;" v-if="entrega.isInQueueState">
              <q-icon name="mdi-sync-alert" size="20px" style="" color="deep-orange"/>
              <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" :delay="200">Item não sincronizado</q-tooltip>
            </div>
          </q-card-media>
          <q-list>

            <!-- MOTORISTA -->
            <q-item>
              <q-item-side :avatar="makeUrl(entrega.motorista.image_file_name, '125x125')" />
              <q-item-main>
                <q-item-tile>
                  {{entrega.motorista.nome}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item>
              <q-item-side icon="place" />
              <q-item-main>
                <q-item-tile label>
                  {{entrega.armazem.nome}}
                </q-item-tile>
                <q-item-tile sublabel>
                  {{entrega.armazem.localizacao}}
                </q-item-tile>
              </q-item-main>
            </q-item>

          </q-list>
        </q-card>
      </div>

      <!--EMPTY LIST-->
      <div class="col-12" v-if="entregasNoArmazem <= 0">
        <ap-no-results />
      </div>
    </div>

    <!--TAB ENTREGUE-->
    <div v-if="tabs === 'entregue' ">

      <div class="row gutter-sm space-end" >
        <div class="col-12">

          <q-infinite-scroll :handler="loadMoreEntregasEntregues" ref="infiniteScroll">

            <q-list no-border link separator>
              <q-item multiline v-for="entrega in entregasEntregues" :key="entrega.id" @click.native="viewCarga(entrega)">
                <q-item-side class="q-item-image" style="position: relative" >
                  <ap-image  size="200x125" :file-name="entrega.caminhao.image_file_name" />
                  <div class="q-ma-sm q-pa-xs" style="position: absolute;bottom: 0;right: 0;background:#f4f4f4;border-radius:50%;" v-if="entrega.isInQueueState">
                    <q-icon name="mdi-sync-alert" size="20px" style="" color="deep-orange"/>
                    <q-tooltip anchor="center right" self="center left" :offset="[10, 10]" :delay="200">Item não sincronizado</q-tooltip>
                  </div>
                </q-item-side>
                <q-item-main>
                  <q-item-tile class="content-center">
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        {{entrega.armazem}}
                      </div>
                      <div class="col-sm-12 col-md-6">
                        {{entrega.peso}}
                      </div>
                    </div>
                  </q-item-tile>
                  <q-item-tile sublabel>
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        {{entrega.safra}}
                      </div>
                      <div class="col-sm-12 col-md-6">
                        {{entrega.motorista}}
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 lt-md">
                        {{moment(entrega.entregue).format('DD MMM YYYY')}} <br>
                        {{entrega.caminhao.placa}}
                      </div>
                    </div>
                  </q-item-tile>
                </q-item-main>
                <q-item-side right class="gt-sm">
                  <q-item-tile stamp>
                    {{moment(entrega.entregue).format('DD MMM YYYY')}}
                  </q-item-tile>
                  <q-item-tile sublabel>
                    {{entrega.caminhao.placa}}
                  </q-item-tile>
                </q-item-side>
                <div >
                  <q-btn @click.stop round flat dense icon="more_vert"  @click.stop>
                    <q-popover>
                      <q-list link no-boder>
                        <q-item v-close-overlay @click.native="deleteEntrega(entrega.id)">
                          <q-item-main label="Excluir"/>
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </div>

              </q-item>

            </q-list>

          </q-infinite-scroll>


        </div>

        <!--EMPTY LIST-->
        <div class="col-12" v-if="entregasEntregues <= 0">
          <ap-no-results />
        </div>
      </div>
    </div>

    <!--MODAL NOVA CARGA -->
    <new-entrega-modal ref="entregaModal"/>

    <!-- MODAL FILTRO -->
    <filter-entregas-modal ref="filterEntregasModal" @on-search="filterEntregas"/>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import NewEntregaModal from 'components/entrega/NewEntregaModal'
  import FilterEntregasModal from 'components/entrega/FilterEntregasModal'
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'
  import apFilterResultBar from 'components/ApFilterResultBar'
  import AgroUtils from 'assets/js/AgroUtils'
  import EntregaService from "../../../assets/js/service/entrega/EntregaService";
  import ServiceMessage from '../../../assets/js/serviceWorker/ServiceMessage';

  export default {
    name: "entregas",
    components: {
      apNoResults,
      toolbar,
      customPage,
      customInputText,
      customInputDatetime,
      NewEntregaModal,
      FilterEntregasModal,
      apImage,
      apFilterResultBar,
    },
    data () {
      return {
        entregaService: new EntregaService(),
        tabs: 'carregando',
        entregas: [],
        entregasCarregando:[],
        entregasNoArmazem:[],
        entregasEntregues:[],
        entregasEntreguesCurrentPage: 1,
        currentFilter: {},
      }
    },
    watch: {
      '$route' (to, from) {
        if(from.query.status !== to.query.status){
          this.clearFilter();
        }
      },
    },
    methods: {
      loadMoreEntregasEntregues(index, done){
        //let filter = {};
        this.currentFilter.page = index;
        this.listEntregasEntregues(AgroUtils.serialize(this.currentFilter), function(hasResult){
          if(hasResult){
            done();
          }
        });
      },
      switchTab(value){

        if(this.$store.state.entrega.filter.value){
          //this.filterEntregas(this.$store.state.entrega.filter.value);
          return;
        }

        switch (value) {
          case 'carregando':
            this.listEntregasCarregando();
            break;
          case 'no-armazem':
            this.listEntregasNoArmazem();
            break;
          case 'entregue':
            //this.listEntregasEntregues();
            break
        }
      },
      makeUrl: function (image_file_name, size) {
        return AgroUtils.image.makeUrl(image_file_name, size)
      },
      novaEntrega: function(){
        this.$refs.entregaModal.openModal()
      },
      openFilterModal(){
        if(this.serverStatus.isUp){
          this.$refs.filterEntregasModal.openModal();
        }else{
          this.$root.$emit('openForbiddenAccessDialog');
        }
      },
      filterEntregas(filters){

        this.$refs.filerResultBar.show(this.$refs.filterEntregasModal.getFilterDesciption());

        this.currentFilter = Object.assign(this.currentFilter, filters);

        let queryFilter = AgroUtils.serialize(this.currentFilter);
        switch (this.tabs) {
          case 'carregando':
            this.listEntregasCarregando(queryFilter);
            break;
          case 'no-armazem':
            this.listEntregasNoArmazem(queryFilter);
            break;
          case 'entregue':
            this.$refs.infiniteScroll.reset();
            this.entregasEntregues = [];
            this.listEntregasEntregues(queryFilter);
            break;
        }
      },
      clearFilter(refreshList = false){
        this.$refs.infiniteScroll.reset();
        this.$refs.filterEntregasModal.clearForm();
        this.$refs.filerResultBar.hide();

        if(refreshList){
          switch (this.tabs) {
            case 'carregando':
              this.listEntregasCarregando();
              break;
            case 'no-armazem':
              this.listEntregasNoArmazem();
              break;
            case 'entregue':
              this.listEntregasEntregues();
              break
          }
        }
      },
      listEntregasCarregando(filter = null) {
        this.$q.loading.show();
        this.entregaService.listEntregasCarregando(filter).then(entregas => {
          this.entregasCarregando = entregas;
          this.$q.loading.hide();
        })
      },
      listEntregasNoArmazem(filter = null) {
        this.$q.loading.show();
        this.entregaService.listEntregasNoArmazem(filter).then(entregas => {
          this.entregasNoArmazem = entregas;
          this.$q.loading.hide();
        })
      },
      listEntregasEntregues(filter = null, callback = null) {
        this.$q.loading.show();

        this.entregaService.listCargasEntregues(filter).then(entregas => {
          this.entregasEntregues = this.entregasEntregues.concat(entregas);

          this.$q.loading.hide();
          if(callback !== null){
            this.$q.notify({color: 'primary', message: 'Ver mais', icon: 'arrow_downward'});
            callback(entregas.length > 0)
          }
        })

      },
      viewCarga: function (entrega) {
        this.$router.push({name: 'entrega_view', params: {id:entrega.id}});
      },
      deleteEntrega(id){
        if(this.serverStatus.isUp){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Realmente deseja apagar esta entrega?',
            ok: 'Sim', cancel: 'Não',
            color: 'primary'
          }).then(data => {
            this.$q.loading.show();
            this.entregaService.deleteEntrega(id).then(() => {
              switch (this.tabs) {
                case 'carregando':
                  this.listEntregasCarregando();
                  break;
                case 'no-armazem':
                  this.listEntregasNoArmazem();
                  break;
                case 'entregue':
                  this.listEntregasEntregues();
                  break
              }
              this.$q.loading.hide();
            })
          })
        }else{
          this.$root.$emit('openForbiddenAccessDialog');
        }

      },
      queueSyncFinishedEvent(event){
        switch (event.data.type) {
          case ServiceMessage.SYNC_FINISHED:
            this.$root.$emit('refreshEntregasList', 'all');
            break;
        }
      },
      refreshEntregasListEvent(status){
        switch (status) {
          case 'carregando':
            this.listEntregasCarregando();
            break;
          case 'no_armazem':
            this.listEntregasNoArmazem();
            break;
          case 'entregue':
            this.entregasEntregues = [];
            this.listEntregasEntregues();
            break;
          case  'all':
            // this.$refs.infiniteScroll.reset();
            this.entregasEntregues = [];
            this.listEntregasCarregando();
            this.listEntregasNoArmazem();
            this.listEntregasEntregues();
            break;
        }
      }
    },
    mounted () {
      if('serviceWorker' in navigator){
        navigator.serviceWorker.addEventListener('message', this.queueSyncFinishedEvent);
      }

      this.listEntregasCarregando();

      this.$root.$on('refreshEntregasList', this.refreshEntregasListEvent);
    },
    destroyed() {
      if('serviceWorker' in navigator){
        navigator.serviceWorker.removeEventListener('message', this.queueSyncFinishedEvent);
      }

      this.$root.$off('refreshEntregasList', this.refreshEntregasListEvent);
    }
  }
  // this.$q.notify({type: 'negative', message: 'aqui'})
</script>
<style scoped>
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }
</style>

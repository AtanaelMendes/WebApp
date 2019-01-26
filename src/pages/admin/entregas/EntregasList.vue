<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Entregas" navigation_type="menu" >

      <div slot="tabs">
        <q-tabs v-model="tabs" ref="tabs" @select="switchTab">
          <q-route-tab slot="title" :to="{ name: 'entregas', query: { status: 'carregando' }}" default name="carregando" label="Carregando" ></q-route-tab>
          <q-route-tab slot="title" :to="{ name: 'entregas', query: { status: 'no-armazem' }}" name="no-armazem" label="No armazém" ></q-route-tab>
          <q-route-tab slot="title" :to="{ name: 'entregas', query: { status: 'entregue' }}" name="entregue" label="Entregue" ></q-route-tab>
        </q-tabs>
      </div>

    </toolbar>

    <!--TAB CARREGANDO-->
    <div class="row gutter-sm space-end q-pa-md" v-if="tabs === 'carregando' ">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="entrega in entregasCarregando" :key="entrega.id">

        <q-card @click.native="viewCarga(entrega.id)" class="cursor-pointer">
          <q-card-media overlay-position="top">
            <q-card-title slot="overlay">
              {{entrega.caminhao.placa}}
              {{ entrega.caminhao.nome }}
              <span slot="subtitle">
                {{moment(entrega.inicio_carregamento).fromNow()}}
              </span>
            </q-card-title>
            <ap-image size="800x500" :file-name="entrega.caminhao.image_file_name" />
          </q-card-media>

          <q-list>
            <q-item v-for="safra_cultura_talhao in entrega.safra_culturas_talhoes" :key="safra_cultura_talhao.id">
              <q-item-side icon="spa" />
              <q-item-main>
                <q-item-tile label>
                  {{safra_cultura_talhao.area}}
                  {{safra_cultura_talhao.talhao}}
                </q-item-tile>
                <q-item-tile sublabel>
                  {{safra_cultura_talhao.cultivar.marca}}
                  {{safra_cultura_talhao.cultivar.nome}}
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

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="entrega in entregasNoArmazem" :key="entrega.id">


        <q-card @click.native="viewCarga(entrega.id)" class="cursor-pointer">
          <q-card-media overlay-position="top">
            <q-card-title slot="overlay">
              {{entrega.caminhao.placa}}
              {{ entrega.caminhao.nome }}
              <span slot="subtitle">
                {{moment(entrega.envio_armazem).fromNow()}}
              </span>
            </q-card-title>
            <ap-image size="800x500" :file-name="entrega.caminhao.image_file_name" />
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
    <div class="row gutter-sm space-end" v-if="tabs === 'entregue' ">
      <div class="col-12">
        <q-list no-border link separator>
          <q-item multiline v-for="entrega in entregasEntregues" :key="entrega.id" @click.native="viewCarga(entrega.id)">
            <q-item-side :image="makeUrl(entrega.caminhao.image_file_name, '200x125')" />
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
          </q-item>

        </q-list>
      </div>

      <!--EMPTY LIST-->
      <div class="col-12" v-if="entregasEntregues <= 0">
        <ap-no-results />
      </div>
    </div>

    <!--MODAL NOVA CARGA -->
    <new-entrega-modal ref="entregaModal"/>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import entregaService from 'assets/js/service/entrega/EntregaService'
  import NewEntregaModal from 'components/entrega/NewEntregaModal'
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'
  import agroUtils from 'assets/js/AgroUtils'

  export default {
    name: "entregas",
    components: {
      apNoResults,
      toolbar,
      customPage,
      customInputText,
      customInputDatetime,
      NewEntregaModal,
      apImage,
    },
    data () {
      return {
        tabs: 'carregando',
        entregas: [],
        entregasCarregando:[],
        entregasNoArmazem:[],
        entregasEntregues:[],
      }
    },
    methods: {
      switchTab(value){
        switch (value) {
          case 'carregando':
            this.listEntregasCarregando();
            break;
          case 'no-armazem':
            this.listEntregasNoArmazem();
            break
          case 'entregue':
            this.listEntregasEntregues();
            break
        }
      },
      makeUrl: function (image_file_name, size) {
        return agroUtils.image.makeUrl(image_file_name, size)
      },
      novaEntrega: function(){
        this.$refs.entregaModal.openModal()
      },
      listEntregasCarregando() {
        this.$q.loading.show();
        entregaService.listEntregasCarregando().then(response => {
          this.entregasCarregando = response.data;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      listEntregasNoArmazem: function () {
        this.$q.loading.show();
        entregaService.listEntregasNoArmazem().then(response => {
          this.entregasNoArmazem = response.data;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      listEntregasEntregues: function () {
        this.$q.loading.show();
        entregaService.listCargasEntregues().then(response => {
          this.entregasEntregues = response.data;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      viewCarga: function (id) {
        this.$router.push({name: 'entrega_view', params: {id:id}});
      }
    },
    mounted () {
      this.listEntregasCarregando();
      // this.listEntregasNoArmazem();
      // this.listEntregasEntregues();

      this.$root.$on('refreshEntregasList', (status) => {
        switch (status) {
          case 'carregando':
            this.listEntregasCarregando();
            break;
          case 'no_armazem':
            this.listEntregasNoArmazem();
            break;
          case 'entregue':
            this.listEntregasEntregues();
            break;
          case  'all':
            this.listEntregasCarregando();
            this.listEntregasNoArmazem();
            this.listEntregasEntregues();
            break;
        }
      });
    },
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

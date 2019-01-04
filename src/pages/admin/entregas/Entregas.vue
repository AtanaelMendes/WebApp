<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Entregas" navigation_type="menu" >

      <div slot="tabs">
        <q-tabs v-model="tabs">
          <q-tab slot="title" name="carregando" label="Carregando" default></q-tab>
          <q-tab slot="title" name="no-armazem" label="No armazém"></q-tab>
          <q-tab slot="title" name="entregue" label="Entregue"></q-tab>
        </q-tabs>
      </div>

    </toolbar>

    <!--TAB CARREGANDO-->
    <div class="row gutter-sm space-end q-ma-lg" v-if="tabs == 'carregando' ">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="cargaCarregando in cargasCarregando" :key="cargaCarregando.id">
        <q-card @click.native="viewCarga(cargaCarregando.id)">
          <q-card-media>
            <img :src=" 'assets/images/'+cargaCarregando.id+'.jpg' "/>
          </q-card-media>
          <q-card-separator/>

          <q-card-title class="q-py-xs">
            {{ cargaCarregando.caminhao }}
          </q-card-title>
          <q-card-separator/>

          <q-card-main class="gutter-y-xs">
            <div class="col-12">
              {{cargaCarregando.motorista}}
            </div>
            <div class="col-12">
              Início do Carregamamento {{moment(cargaCarregando.inicio_carregamento).calendar()}}
            </div>
          </q-card-main>
        </q-card>
      </div>

      <!--EMPTY LIST-->
      <div class="col-12" v-if="cargasCarregando <= 0">
        <div class="row justify-center items-center" style="min-height: 40vh">
          <div class="col-6 text-center">
            <img src="assets/images/sad_2.svg" class="responsive"/>
            <p>Nenhum resultado encontrado.</p>
          </div>
        </div>
      </div>

      <!--PAGE STICKY BUTTOMS-->
      <q-page-sticky position="bottom-right" :offset="[35, 35]">
        <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
          <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="novaCarga()">
            <span class="shadow-2">Nova Carga</span>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
    </div>

    <!--TAB NO ARMAZEM-->
    <div class="row gutter-sm space-end q-ma-lg" v-if="tabs == 'no-armazem' ">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="cargaNoArmazem in cargasNoArmazem" :key="cargaNoArmazem.id">
        <q-card @click.native="viewCarga(cargaNoArmazem.id)">
          <q-card-media>
            <img :src=" 'assets/images/'+cargaNoArmazem.id+'.jpg' "/>
          </q-card-media>
          <q-card-separator/>

          <q-card-title class="q-py-xs">
            {{ cargaNoArmazem.caminhao }}
          </q-card-title>
          <q-card-separator/>

          <q-card-main class="gutter-y-xs">
            <div class="col-12">
              {{cargaNoArmazem.motorista}}
            </div>
            <div class="col-12">
              Hora do envio {{moment(cargaNoArmazem.inicio_carregamento).calendar()}}
            </div>
          </q-card-main>
        </q-card>
      </div>

      <!--EMPTY LIST-->
      <div class="col-12" v-if="cargasNoArmazem <= 0">
        <div class="row justify-center items-center" style="min-height: 40vh">
          <div class="col-6 text-center">
            <img src="assets/images/sad_2.svg" class="responsive"/>
            <p>Nenhum resultado encontrado.</p>
          </div>
        </div>
      </div>
    </div>

    <!--TAB ENTREGUE-->
    <div class="row gutter-sm space-end" v-if="tabs == 'entregue' ">
      <div class="col-12">
        <q-list no-border link separator>

          <q-item multiline v-for="cargaEntregue in 30" :key="cargaEntregue" @click.native="viewCarga(cargaEntregue)">
            <div class="gt-sm">
              <q-item-side avatar="assets/images/1.jpg" class="gt-sm"/>
            </div>
            <q-item-side image="assets/images/1.jpg" class="lt-md"/>
            <q-item-main>
              <q-item-tile class="content-center">
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    Madenorte
                  </div>
                  <div class="col-sm-12 col-md-6">
                    {{numeral(49000).format('0,0')}}
                    ({{numeral(50000).format('0,0')}} -
                    {{numeral(10000).format('0,0')}}) KG
                  </div>
                </div>
              </q-item-tile>
              <q-item-tile sublabel>
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    Crotalaria 2018/2019
                  </div>
                  <div class="col-sm-12 col-md-6">
                    Fulano da Silva
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 lt-md">
                    28 dez 17:45 <br>
                    HGT 9966
                  </div>
                </div>
              </q-item-tile>
            </q-item-main>
            <q-item-side right class="gt-sm">
              <q-item-tile stamp>
                28 dez 17:45
              </q-item-tile>
              <q-item-tile sublabel>
                HGT 9966
              </q-item-tile>
            </q-item-side>
          </q-item>

        </q-list>
      </div>

      <!--EMPTY LIST-->
      <div class="col-12" v-if="cargasEntregue <= 0">
        <div class="row justify-center items-center" style="min-height: 40vh">
          <div class="col-6 text-center">
            <img src="assets/images/sad_2.svg" class="responsive"/>
            <p>Nenhum resultado encontrado.</p>
          </div>
        </div>
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
  import NewEntregaModal from 'components/entrega/NewEntregaModal'
  export default {
    name: "entregas",
    components: {
      toolbar,
      customPage,
      customInputText,
      customInputDatetime,
      NewEntregaModal
    },
    data () {
      return {
        tabs: 'carregando',
        entregas: [],
        cargasCarregando:[
          {
            id: 1,
            caminhao: 'Feneme',
            motorista: 'Tiburcio',
            inicio_carregamento: '2018/12/26 13:30:22',
            envio_armazem: '2018/12/26 14:30:10'
          },
          {
            id: 2,
            caminhao: 'Black Pearl',
            motorista: 'Jack Sparrow',
            inicio_carregamento: '2018/12/27 14:30:22',
            envio_armazem: '2018/12/27 15:30:10'
          },
          {
            id: 3,
            caminhao: 'Holandês Voador',
            motorista: 'Barba Negra',
            inicio_carregamento: '2018/12/28 15:30:22',
            envio_armazem: '2018/12/26 16:30:10'
          }
        ],
        cargasNoArmazem:[
          {
            id: 1,
            caminhao: 'Feneme',
            motorista: 'Tiburcio',
            inicio_carregamento: '2018/12/26 13:30:22',
            envio_armazem: '2018/12/26 14:30:10'
          },
          {
            id: 2,
            caminhao: 'Black Pearl',
            motorista: 'Jack Sparrow',
            inicio_carregamento: '2018/12/27 14:30:22',
            envio_armazem: '2018/12/27 15:30:10'
          },
          {
            id: 3,
            caminhao: 'Holandês Voador',
            motorista: 'Barba Negra',
            inicio_carregamento: '2018/12/28 15:30:22',
            envio_armazem: '2018/12/26 16:30:10'
          }
        ],
        cargasEntregue:[],
      }
    },
    watch: {
    },
    computed: {
    },
    methods: {
      novaCarga: function(){
        this.$refs.entregaModal.openModal()
      },
      listCargasCarregando: function () {

      },
      listCargasNoArmazem: function () {

      },
      listCargasEntregues: function () {

      },
      viewCarga: function (id) {
        this.$router.push({name: 'entrega_view', params: {id:id}});
      }
    },
    mounted () {
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
  // this.$q.notify({type: 'negative', message: 'aqui'})
</script>
<style>
  .space-end{
    margin-bottom: 200px;
  }
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }
</style>

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
    <div class="row gutter-sm space-end q-pa-md" v-if="tabs === 'carregando' ">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="entrega in entregasCarregando" :key="entrega.id">
        <q-card @click.native="viewCarga(entrega.id)" class="cursor-pointer">
          <q-card-media>
            <img src="statics/images/no-image-16-10.svg" v-if="!entrega.caminhao.image"/>
            <img :src="entrega.caminhao.image" v-if="entrega.caminhao.image"/>
          </q-card-media>
          <q-card-separator/>

          <q-card-title class="q-py-xs">
            <div>
            {{ entrega.caminhao.nome }}
              <span class="text-faded float-right q-body-1">{{entrega.caminhao.placa}}</span>
            </div>
            <span slot="subtitle">Início do carregamamento {{moment(entrega.inicio_carregamento).fromNow()}}</span>
          </q-card-title>
          <q-card-separator/>

          <q-card-main class="gutter-y-xs">
            <div class="col-12" v-for="safra_cultura_talhao in entrega.safra_culturas_talhoes">
              <span class="q-subheading">{{safra_cultura_talhao.safra}}</span>
              <span class="float-right q-subheading">{{safra_cultura_talhao.percentual}}%</span>
              <div class="q-pl-sm q-my-xs">
                <span class="text-faded q-body-1">{{safra_cultura_talhao.area}}</span>
                <span class="text-faded float-right q-body-1">{{safra_cultura_talhao.talhao}}</span>
              </div>
              <div class="q-pl-sm q-my-xs">
                <span class="text-faded q-body-1">{{safra_cultura_talhao.cultivar.nome}}</span>
                <span class="text-faded float-right q-body-1">{{safra_cultura_talhao.cultivar.marca}}</span>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>

      <!--EMPTY LIST-->
      <div class="col-12" v-if="entregasCarregando <= 0">
        <ap-no-results />
      </div>

      <!--PAGE STICKY BUTTOMS-->
      <q-page-sticky position="bottom-right" :offset="[35, 35]">
        <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
          <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="novaEntrega()">
            <span class="shadow-2 text-no-wrap">Nova Entrega</span>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
    </div>

    <!--TAB NO ARMAZEM-->
    <div class="row gutter-sm space-end q-pa-md" v-if="tabs == 'no-armazem' ">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="entrega in entregasNoArmazem" :key="entrega.id">
        <q-card @click.native="viewCarga(entrega.id)" class="cursor-pointer">
          <q-card-media>
            <img src="statics/images/no-image-16-10.svg" v-if="!entrega.caminhao.image"/>
            <img :src="entrega.caminhao.image" v-if="entrega.caminhao.image"/>
          </q-card-media>
          <q-card-separator/>

          <q-card-title class="q-py-xs">
            <div>
              {{ entrega.caminhao.nome }}
              <span class="text-faded float-right q-body-1">{{entrega.caminhao.placa}}</span>
            </div>
            <span slot="subtitle">Enviado para o armazém {{moment(entrega.inicio_carregamento).fromNow()}}</span>
          </q-card-title>
          <q-card-separator/>

          <q-card-main class="gutter-y-xs">
            <div class="col-12">
              <span class="q-subheading">{{entrega.armazem.nome}}</span>
              <div class="q-my-xs ">
                <span class="text-faded q-body-1">{{entrega.armazem.localizacao}}</span>
              </div>
              <div class="q-mt-md">Motorista:
                <span class="text-faded q-body-1">{{entrega.motorista}}</span>
              </div>
            </div>
          </q-card-main>
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
            <div class="gt-sm">
              <q-item-side avatar="statics/images/no-image-16-10.svg" class="gt-sm" v-if="!entrega.caminhao.image"/>
              <q-item-side :avatar="entrega.caminhao.image" class="gt-sm" v-if="entrega.caminhao.image"/>
            </div>
            <q-item-side image="statics/images/no-image-16-10.svg" class="lt-md" v-if="!entrega.caminhao.image"/>
            <q-item-side :image="entrega.caminhao.image" class="lt-md" v-if="entrega.caminhao.image"/>
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

  export default {
    name: "entregas",
    components: {
      apNoResults,
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
        entregasCarregando:[],
        entregasNoArmazem:[],
        entregasEntregues:[],
      }
    },
    methods: {
      novaEntrega: function(){
        this.$refs.entregaModal.openModal()
      },
      listEntregasCarregando() {
        entregaService.listEntregasCarregando().then(response => {
          this.entregasCarregando = response.data;
        })
      },
      listEntregasNoArmazem: function () {
        entregaService.listEntregasNoArmazem().then(response => {
          this.entregasNoArmazem = response.data;
        })
      },
      listEntregasEntregues: function () {
        entregaService.listCargasEntregues().then(response => {
          this.entregasEntregues = response.data;
        })
      },
      viewCarga: function (id) {
        this.$router.push({name: 'entrega_view', params: {id:id}});
      }
    },
    mounted () {
      this.listEntregasCarregando();
      this.listEntregasNoArmazem();
      this.listEntregasEntregues();

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

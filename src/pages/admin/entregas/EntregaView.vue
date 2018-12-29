<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Detalhes da entrega" navigation_type="menu"></toolbar>

    <div class="row space-end gutter-sm q-pa-md">

      <!--INFO DO CAMINHAO-->
      <div class="col-12 ">

        <q-card class="row">

          <!--IMAGEM HEADER-->
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <img src="assets/images/1.jpg" class="responsive"/>
          </div>

          <!--INFO DO HEADER-->
          <div class="col-xs-12 col-sm-6 col-md-8 col-lg-9 q-pa-sm">

            <q-btn class="float-right" icon="more_vert" round flat>
              <q-popover>
                <q-list link class="no-border">
                  <q-item v-close-overlay @click.native="addDriver()">
                    <q-item-main label="Alterar Motorista"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>

            <p>Tiburcio</p>
            <p>Feneme  FRG 8855</p>
            <p><span class="text-faded">Lotação</span> {{numeral(70000).format('0,0')}} KG</p>
            <p><span class="text-faded">Carregado em</span> {{moment('2018/12/28 15:30:45').format('lll')}}</p>
            <p><span class="text-faded">Enviado em</span> {{moment('2018/12/28 16:30:45').format('lll')}}</p>
            <p><span class="text-faded">Descarregado em</span> {{moment('2018/12/28 17:30:45').format('lll')}}</p>

          </div>
        </q-card>
      </div>


      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">

        <div class="row gutter-y-sm">

          <!--INFO DAS CARGAS-->
          <div class="col-12">
            <q-btn class="float-right" icon="more_vert" round flat>
              <q-popover>
                <q-list link class="no-border">
                  <q-item v-close-overlay @click.native="addTalhaoPercentage()">
                    <q-item-main label="Definir Porc. do talhão"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="addTalhao()">
                    <q-item-main label="Adiconar talhão"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="deleteTalhao()">
                    <q-item-main label="Excluir talhão"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>

            <q-card class="q-pa-sm">

              <q-list link no-border>
                <q-item v-for="carga in 3" :key="carga">
                  <q-item-main>
                    <q-item-tile>
                      Soja 2018/2019
                    </q-item-tile>
                    <q-item-tile sublabel>
                      33% Y30 Caroline talhão fundos
                    </q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>

            </q-card>
          </div>

        <!--INFO DOS TICKETS-->
          <div class="col-12">
            <q-btn class="float-right" icon="more_vert" round flat>
              <q-popover>
                <q-list link class="no-border">
                  <q-item v-close-overlay @click.native="addTicket()">
                    <q-item-main label="Novo ticket"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="deleteTicket()">
                    <q-item-main label="Excluir"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>

            <q-card class="q-pa-sm">

              <q-list link no-border>
                <q-item>
                  <q-item-main class="row">
                    <div class="col-4">
                      Líquido
                    </div>
                    <div class="col-4">
                      {{numeral(46220).format('0.0')}} KG
                    </div>
                    <div class="col-4">
                      {{numeral(770.33).format('0,0.00')}} SC
                    </div>
                    <div class="col-4">
                      Desconto
                    </div>
                    <div class="col-4">
                      {{numeral(3780).format('0.0')}} KG
                    </div>
                    <div class="col-4">
                      {{numeral(63).format('0,0.00')}} SC
                    </div>
                    <div class="col-4">
                      Bruto
                    </div>
                    <div class="col-4">
                      {{numeral(50000).format('0.0')}} KG
                    </div>
                    <div class="col-4">
                      {{numeral(833.33).format('0,0.00')}} SC
                    </div>

                  </q-item-main>
                </q-item>
              </q-list>

            </q-card>

          </div>
        </div>

      </div>

      <!--INFO DAS ENTREGAS-->
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="row gutter-y-sm">
          <div class="col-12" v-for="entrega in 2" :key="entrega">

            <q-card>

              <q-btn class="float-right" icon="more_vert" round flat>
                <q-popover>
                  <q-list link class="no-border">
                    <q-item v-close-overlay @click.native="updateNota()">
                      <q-item-main label="Alterar nota"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="benderCarga()">
                      <q-item-main label="Desdobrar carga"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteNegocio()">
                      <q-item-main label="Excluir negócio"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>

              <div class="col-12 q-pa-lg">
                <p>Troca ADM {{entrega}}</p>
                <p>Bunge</p>
                <p>Nota</p>
                <p>Vitório 1-1234 {{numeral(30000).format('0,0')}} 0,85 {{numeral(25500).format('0,0.00')}}</p>
                <p></p>
                <p></p>
              </div>

            </q-card>
          </div>
        </div>
      </div>

      <!--PAGE STICKY BUTTOMS-->
      <q-page-sticky position="bottom-right" :offset="[35, 35]">
        <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
          <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="addTicket()">
            <span class="shadow-2 text-no-wrap	">Informar ticket</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="sendToWarehause()">
            <span class="shadow-2 text-no-wrap	">Enviar para armazém</span>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
    </div>

    <!--EMPTY LIST-->
    <div class="col-12" v-if="!carga">
      <div class="row justify-center items-center" style="min-height: 40vh">
        <div class="col-6 text-center">
          <img src="assets/images/sad_2.svg" class="responsive"/>
          <p>Nenhum resultado encontrado.</p>
        </div>
      </div>
    </div>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import Cultura from 'assets/js/model/negocio/Cultura'
  import Titulo from 'assets/js/model/negocio/Titulo'
  import Produto from 'assets/js/model/negocio/Produto'
  import Fixacao from 'assets/js/model/negocio/Fixacao'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import safraCulturaService from 'assets/js/service/safra/SafraCulturaService'
  import culturaClassificacaoService from 'assets/js/service/cultura/CulturaClassificacaoService'
  import armazemService from 'assets/js/service/localizacao/ArmazemService'
  export default {
    name: "negocio-view",
    components: {
      toolbar,
      customPage,
      customInputText,
      customInputDatetime
    },
    data () {
      return {
        carga: true,
      }
    },
    watch: {
    },
    computed: {
    },
    methods: {
      sendToWarehause: function(){
        negocioService.saveAttachTitulo(this.titulo.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Título vinculado com sucesso'});
            this.closeModal();
            this.$router.go(-1);
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      addTicket: function(){},
      addDriver: function(){},
      addTalhaoPercentage: function(){},
      deleteTalhao: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.listCulturas()
          })
        }).catch(()=>{});
      },
      addTalhao: function(){},
      addDriver: function(){},

      deleteNegocio: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.listCulturas()
          })
        }).catch(()=>{});
      },
      updateNota: function(){},
      benderCarga: function(){},

      deleteTicket: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.listCulturas()
          })
        }).catch(()=>{});
      },
      newTicket: function(){},

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

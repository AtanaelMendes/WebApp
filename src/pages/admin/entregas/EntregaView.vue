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
                  <q-item v-close-overlay @click.native="updateDriver()">
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
            <q-card>
              <q-card-title>
                Carga
                <q-btn slot="right" dense icon="more_vert" round flat>
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
              </q-card-title>
              <q-card-separator/>

              <q-card-main>
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
              </q-card-main>

            </q-card>
          </div>

          <!--INFO DOS TICKETS-->
          <div class="col-12" v-for="ticket in 3" :key="ticket">
            <q-card>

              <q-card-title>
                Ticket {{ticket}}
                <q-btn slot="right" icon="more_vert" dense round flat>
                  <q-popover>
                    <q-list link class="no-border">
                      <q-item v-close-overlay @click.native="deleteTicket()">
                        <q-item-main label="Excluir"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </q-card-title>
              <q-card-separator/>

              <q-card-main>
                <q-list link no-border>

                  <q-item>
                    <q-item-main >

                      <q-item-tile class="row">
                        <div class="col-4">Líquido</div>
                        <div class="col-4 text-right">{{numeral(46220).format('0,0.0')}} KG</div>
                        <div class="col-4 text-right">{{numeral(770.33).format('0,0.0')}} SC</div>
                      </q-item-tile>

                      <q-item-tile class="row">
                        <div class="col-4">Desconto</div>
                        <div class="col-4 text-right">{{numeral(3780).format('0,0.0')}} KG</div>
                        <div class="col-4 text-right">{{numeral(63).format('0,0.0')}} SC</div>
                      </q-item-tile>

                      <q-item-tile class="row">
                        <div class="col-4">Bruto</div>
                        <div class="col-4 text-right">{{numeral(50000).format('0.0')}} KG</div>
                        <div class="col-4 text-right">{{numeral(833.33).format('0,0.00')}} SC</div>
                      </q-item-tile>

                    </q-item-main>
                  </q-item>

                  <q-item>
                    <q-item-main class="row">
                      <div class="col-12">
                        {{moment().format('DD/MM/YYYY HH:mm')}} /
                        Nº {{numeral(18539).format('0,0')}}
                      </div>
                    </q-item-main>
                  </q-item>

                  <q-item>
                    <q-item-main>

                      <q-item-tile class="row">
                        <div class="col-4 q-mb-sm">
                          Classificação
                        </div>
                        <div class="col-4 text-right">
                          %
                        </div>
                        <div class="col-4 text-right">
                          Desconto
                        </div>
                      </q-item-tile>

                      <q-item-tile class="row">
                        <div class="col-4">
                          Umidade
                        </div>
                        <div class="col-4 text-right">
                          14,00
                        </div>
                        <div class="col-4 text-right">
                          198 KG
                        </div>
                      </q-item-tile>

                      <q-item-tile class="row">
                        <div class="col-4">
                          Impureza
                        </div>
                        <div class="col-4 text-right">
                          0,80
                        </div>
                        <div class="col-4 text-right">
                          0 KG
                        </div>
                      </q-item-tile>

                      <q-item-tile class="row">
                        <div class="col-4">
                          Avariados
                        </div>
                        <div class="col-4 text-right">
                          3,20
                        </div>
                        <div class="col-4 text-right">
                          0 KG
                        </div>
                      </q-item-tile>

                      <q-item-tile class="row">
                        <div class="col-4">
                          Quebrados
                        </div>
                        <div class="col-4 text-right">
                          2,00
                        </div>
                        <div class="col-4 text-right">
                          0 KG
                        </div>
                      </q-item-tile>

                    </q-item-main>
                  </q-item>

                </q-list>
              </q-card-main>

            </q-card>
          </div>

        </div>
      </div>

      <!--INFO DAS ENTREGAS-->
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="row gutter-y-sm">

          <div class="col-12" v-for="entrega in 3" :key="entrega">
            <q-card>
              <q-card-title>
                Troca ADM {{entrega}}
                <q-btn slot="right" icon="more_vert" dense round flat>
                  <q-popover>
                    <q-list link class="no-border">
                      <q-item v-close-overlay @click.native="updateNota()">
                        <q-item-main label="Alterar nota"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="desdobrarCarga()">
                        <q-item-main label="Desdobrar carga"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="deleteNegocio()">
                        <q-item-main label="Excluir negócio"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </q-card-title>
              <q-card-separator/>

              <q-card-main>
                <q-item>
                  <q-item-main>

                    <q-item-tile>
                      Bunge
                    </q-item-tile>
                    <q-item-tile>
                      Nota
                    </q-item-tile>
                    <q-item-tile>
                      Vitório 1-1234 {{numeral(30000).format('0,0')}} 0,85 {{numeral(25500).format('0,0.00')}}
                    </q-item-tile>
                    <q-item-tile>
                      5101 - Venda Produção estabelecimento {{moment('2018/12/19').format('DD MMM YYYY')}}
                    </q-item-tile>

                  </q-item-main>
                </q-item>
              </q-card-main>

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

    <!--MODAL ENVIAR CARGA-->
    <send-carga-modal ref="sendCargaModal"/>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import sendCargaModal from 'components/entrega/SendCargaModal'
  import ticketService from 'assets/js/service/entrega/TicketService'
  export default {
    name: "carga-view",
    components: {
      toolbar,
      customPage,
      sendCargaModal,
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
        this.$refs.sendCargaModal.openModal()
      },

      addTalhao: function(){},
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

      updateDriver: function(){},

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
      desdobrarCarga: function(){},

      saveTicket: function(){},
      deleteTicket: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar este Ticket?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          ticketService.deleteTicket(id).then(response => {
            this.getCargaById()
          })
        }).catch(()=>{});
      },

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

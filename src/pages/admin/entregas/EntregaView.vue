<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Detalhes da entrega" navigation_type="back" @navigation_clicked="backAction"></toolbar>

    <div class="row space-end gutter-sm q-pa-md" v-if="entrega">

      <!--INFO DO CAMINHAO-->
      <div class="col-12 ">

        <q-card class="row">

          <!--IMAGEM HEADER-->
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <img src="assets/images/icon-no-image.svg" v-if="!entrega.caminhao.image"  class="responsive"/>
            <img :src="entrega.caminhao.image" v-if="entrega.caminhao.image"  class="responsive"/>
          </div>

          <!--INFO DO HEADER-->
          <div class="col-xs-12 col-sm-6 col-md-8 col-lg-9 q-pa-sm">

            <q-btn class="float-right" icon="more_vert" round flat>
              <q-popover>
                <q-list link class="no-border">
                  <q-item v-close-overlay @click.native="updateMotorista(entrega)">
                    <q-item-main label="Alterar Motorista"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>

            <p v-if="entrega.motorista">{{entrega.motorista.nome}}</p>
            <p>{{entrega.caminhao.nome}}  {{entrega.caminhao.placa}}</p>
            <p><span class="text-faded">Lotação</span> {{numeral(70000).format('0,0')}} KG</p>
            <p><span class="text-faded">Carregado em</span> {{moment(entrega.inicio_carregamento).format('lll')}}</p>
            <p v-if="entrega.envio_armazem"><span class="text-faded">Enviado em</span> {{moment(entrega.envio_armazem).format('lll')}}</p>
            <p v-if="entrega.entregue"><span class="text-faded">Descarregado em</span> {{moment(entrega.entregue).format('lll')}}</p>

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
                      <q-item v-close-overlay @click.native="addTalhaoPercentage()" v-if="entrega.talhoes.length > 1">
                        <q-item-main label="Definir Porc. dos talhões"/>
                      </q-item>
                      <q-item v-close-overlay @click.native="addTalhao()">
                        <q-item-main label="Adiconar talhão"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </q-card-title>
              <q-card-separator/>

              <q-card-main>
                <q-list link no-border separator>
                  <q-item class="q-px-none" v-for="entregaTalhao in entrega.talhoes" :key="entregaTalhao.id">
                    <q-item-main>
                      <q-item-tile>
                        {{entregaTalhao.nome}}
                      </q-item-tile>
                      <q-item-tile sublabel>
                        {{entregaTalhao.percentual}}% - {{entregaTalhao.cultivar}} {{entregaTalhao.area}} - {{entregaTalhao.talhao}}
                      </q-item-tile>
                    </q-item-main>
                    <q-item-side class="self-start" v-if="entrega.talhoes.length > 1">
                      <q-btn icon="more_vert" dense round flat>
                        <q-popover>
                          <q-list link class="no-border">
                            <q-item v-close-overlay @click.native="deleteTalhao(entregaTalhao.id)">
                              <q-item-main label="Excluir"/>
                            </q-item>
                          </q-list>
                        </q-popover>
                      </q-btn>
                    </q-item-side>
                  </q-item>
                </q-list>
              </q-card-main>

            </q-card>
          </div>

          <!--INFO DAS PESAGENS-->
          <div class="col-12" v-for="(pesagem, index) in entrega.pesagens" :key="pesagem.id">
            <q-card>

              <q-card-title>
                Pesagem {{index + 1}}
                <q-btn slot="right" icon="more_vert" dense round flat>
                  <q-popover>
                    <q-list link class="no-border">
                      <q-item v-close-overlay @click.native="deletePesagem()">
                        <q-item-main label="Excluir"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </q-card-title>
              <q-card-separator/>

              <q-card-main>
                <q-list link no-border>

                  <q-item class="q-px-none">
                    <q-item-main >

                      <q-item-tile class="row">
                        <div class="col-4">Líquido</div>
                        <div class="col-4 text-right">{{pesagem.liquido}}</div>
                        <div class="col-4 text-right">{{pesagem.liquido_convertido}}</div>
                      </q-item-tile>

                      <q-item-tile class="row">
                        <div class="col-4">Desconto</div>
                        <div class="col-4 text-right">{{pesagem.desconto}}</div>
                        <div class="col-4 text-right">{{pesagem.desconto_convertido}}</div>
                      </q-item-tile>

                      <q-item-tile class="row">
                        <div class="col-4">Bruto</div>
                        <div class="col-4 text-right">{{pesagem.bruto}}</div>
                        <div class="col-4 text-right">{{pesagem.bruto_convertido}}</div>
                      </q-item-tile>

                    </q-item-main>
                  </q-item>

                  <q-item class="q-px-none">
                    <q-item-main class="row">
                      <div class="col-12">
                        {{moment(pesagem.emissao).format('DD/MM/YYYY HH:mm')}} /
                        Nº {{pesagem.numero_ticket}}
                      </div>
                    </q-item-main>
                  </q-item>

                  <q-item class="q-px-none">
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

                      <q-item-tile class="row" v-for="classificacao in pesagem.classificacoes" :key="classificacao.id">
                        <div class="col-4">
                          {{classificacao.nome}}
                        </div>
                        <div class="col-4 text-right">
                          {{classificacao.verificado}}
                        </div>
                        <div class="col-4 text-right">
                          {{classificacao.desconto}}
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

      <!--INFO DOS NEGÓCIOS-->
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" v-if="entrega.negocios.length > 0">
        <div class="row gutter-y-sm">

          <div class="col-12" >
            <q-card>
              <q-card-title>
                Negócios
                <q-btn slot="right" icon="more_vert" dense round flat>
                  <q-popover>
                    <q-list link class="no-border">
                      <q-item v-close-overlay @click.native="novoNegocio(entrega)">
                        <q-item-main label="Adicionar novo negócio"/>
                      </q-item>
                    </q-list>
                  </q-popover>
                </q-btn>
              </q-card-title>
              <q-card-separator/>

              <q-card-main>
                <q-list link no-border separator>
                  <q-item class="q-px-none" v-for="negocio in entrega.negocios" :key="negocio.id">
                    <q-item-main>

                      <q-item-tile>
                        {{negocio.negocio_cultura.negocio.nome}}
                      </q-item-tile>
                      <q-item-tile>
                        Nota
                      </q-item-tile>
                      <q-item-tile>
                        <q-item v-for="nota_fiscal_item in negocio.notas_fiscais_itens" :key="nota_fiscal_item.id">
                          <q-item-main>
                            <q-item-tile>
                              {{nota_fiscal_item.nota_fiscal.nota_fiscal_serie.nome}} - {{nota_fiscal_item.nota_fiscal.nota_fiscal_serie.serie}} -
                              {{nota_fiscal_item.nota_fiscal.numero}} -
                              {{nota_fiscal_item.quantidade}} -
                              {{nota_fiscal_item.valor_unitario}} - {{nota_fiscal_item.valor_total}}
                            </q-item-tile>
                            <q-item-tile sublabel>
                              {{nota_fiscal_item.cfop.numero}} - {{nota_fiscal_item.cfop.descricao}} - {{moment(nota_fiscal_item.nota_fiscal_emissao).format('DD MMM YYYY')}}
                            </q-item-tile>
                          </q-item-main>
                        </q-item>
                      </q-item-tile>


                    </q-item-main>
                    <q-item-side class="self-start">
                      <q-btn icon="more_vert" dense round flat>
                        <q-popover>
                          <q-list link class="no-border">
                            <q-item v-close-overlay @click.native="updateNota(negocio)">
                              <q-item-main label="Alterar nota"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteNegocio(negocio)">
                              <q-item-main label="Excluir negócio"/>
                            </q-item>
                          </q-list>
                        </q-popover>
                      </q-btn>
                    </q-item-side>
                  </q-item>
                </q-list>
              </q-card-main>

            </q-card>
          </div>

        </div>
      </div>

      <!--PAGE STICKY BUTTOMS-->
      <q-page-sticky position="bottom-right" :offset="[35, 35]" v-if="entrega">
        <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
          <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="newPesagem(entrega)" v-if="entrega.status === 'No Armazem'">
            <span class="shadow-2 text-no-wrap">Informar Pesagem</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="sendToWarehause()" v-if="entrega.status === 'Carregando'">
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
    <send-entrega-modal ref="sendEntregaModal"/>

    <!--MODAL INFORMAR PESAGEM-->
    <new-pesagem-modal ref="newPesagemModal"/>

    <!--MODAL INFORMAR PORCENTAGEM DOS TALHOES-->
    <add-talhao-percentage-modal ref="addTalhaoPercentageModal"/>

    <!--MODAL ADD TALHAO-->
    <new-entrega-modal ref="entregaModal"/>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import pesagemService from 'assets/js/service/entrega/PesagemService'
  import entregaService from 'assets/js/service/entrega/EntregaService'
  import sendEntregaModal from 'components/entrega/SendEntregaModal'
  import newPesagemModal from 'components/entrega/NewPesagemModal'
  import addTalhaoPercentageModal from 'components/entrega/AddTalhaoPercentageModal'
  import newEntregaModal from 'components/entrega/NewEntregaModal'
  export default {
    name: "carga-view",
    components: {
      toolbar,
      customPage,
      newPesagemModal,
      newEntregaModal,
      sendEntregaModal,
      addTalhaoPercentageModal,
    },
    data () {
      return {
        carga: true,
        entregaView: null,
        entrega: null,
        // entrega: {
        //   culturaId: 1,
        //   negocios_entregas: [
        //     {id: 1, tipo_negocio: 'Troca', pessoa: 'ADM', negocio_produto_quantidade: null },
        //     // {id: 2, tipo_negocio: 'Balcão', pessoa: 'ADM', negocio_produto_quantidade: null}
        //   ]
        // }
      }
    },
    watch: {
    },
    methods: {
      sendToWarehause: function(){
        this.$refs.sendEntregaModal.openModal('sendEntrega')
      },
      updateNota: function(negocio){
        this.$refs.sendEntregaModal.openModal('updateNota', null)
      },
      novoNegocio: function(entrega){
        this.$refs.sendEntregaModal.openModal('novoNegocio', entrega)
      },
      updateMotorista: function(entrega){
        this.$refs.sendEntregaModal.openModal('updateMotorista', entrega)
      },
      newPesagem: function(){
        this.$refs.newPesagemModal.openModal(this.entrega)
      },

      // TODO passar o id do caminhao no addTalhao
      addTalhao: function(){
        this.$refs.entregaModal.openModal(this.entrega)
      },
      addTalhaoPercentage: function(){
        this.$refs.addTalhaoPercentageModal.openModal(this.entrega)
      },
      deleteTalhao: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar este talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          entregaService.delteTalhaoOfEntrega(this.entrega.id, id).then(response => {
            if(response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Talhão removido com sucesso'});
              this.getEntrega()
            }
          })
        }).catch(()=>{
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
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
        }).catch(()=>{
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      deletePesagem: function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta pesagem?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          pesagemService.deletePesagem(id).then(response => {
            this.getCargaById()
          })
        }).catch(()=>{});
      },
      getEntrega: function(){
        entregaService.getEntregaById(this.$route.params.id).then(response => {
          this.entrega = response.data;
        })
      },
      backAction: function () {
        this.$router.push({name: 'entregas'});
      },
    },
    mounted () {
      this.getEntrega()
      this.$root.$on('refreshEntregaView', () => {
        this.getEntrega()
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

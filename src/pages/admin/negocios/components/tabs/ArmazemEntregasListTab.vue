<template>
  <div>
    <div class="relative-position table-container">
      <div style="min-height: 150px">
        <div class="q-pa-sm">
          <q-btn outline label="Nova Transferência" size="sm" class="q-mr-sm" color="deep-orange" @click="newTrasnferencia()" />
          <q-btn outline label="Novo Movimento" size="sm" color="deep-orange" @click="newMovimento()"/>
        </div>

        <template v-if="movimentos">
          <q-list separator dense v-if="movimentos.length > 0">

            <q-item style="padding-right: unset" class="gt-xs">
              <q-item-main class="row">
                <div class="col-1 table-header text-center">
                  Data
                </div>

                <div class="col-1 table-header text-right">
                  Quantidade
                </div>

                <div class="col-1 table-header text-center">
                  Tipo
                </div>

                <div class="col-8 table-header">

                  <!-- ENTREGAS-->
                  <div class="row">
                    <div class="col-3">
                      Placa
                    </div>
                    <div class="col-9">
                      <div class="row">
                        <div class="col-3 table-header text-center">
                          Ticket
                        </div>
                        <div class="col-3 table-header text-right">
                          Bruto
                        </div>
                        <div class="col-3 table-header text-right">
                          Desconto
                        </div>
                        <div class="col-3 table-header text-right">
                          Líquido
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="col-1">

                </div>

              </q-item-main>
            </q-item>

            <template v-for="movimento in movimentos">
              <a v-bind:href="entregaUrl(movimento.entrega)" class="link">
              <q-item style="padding-right: unset" :key="movimento.id" v-if="$q.screen.gt.xs">
                <q-item-main class="row ">

                  <div class="col-1 text-center table-cell">
                    {{moment(movimento.lancamento).format('DD/MMM/YY')}}
                    <div class="text-faded ">
                      {{moment(movimento.lancamento).format('HH:mm:ss')}}
                    </div>
                  </div>

                  <div class="col-1 text-right table-cell">
                    <div :class="(movimento.quantidade<0)?'text-negative':'text-indigo'">
                      {{numeral(movimento.quantidade).format('0,0')}} KG
                    </div>
                    <div class="text-faded">
                      {{numeral(movimento.quantidade_comercial).format('0,0')}} SC
                    </div>
                  </div>

                  <div class="col-1 text-center table-cell">
                    <abbr :title="movimento.negocio_cultura_movimento_tipo.nome">
                      <q-chip dense square color="blue-8" v-if="movimento.negocio_cultura_movimento_tipo.sigla==='ENT'">{{movimento.negocio_cultura_movimento_tipo.sigla}}</q-chip>
                      <q-chip dense square color="amber" v-else-if="movimento.negocio_cultura_movimento_tipo.sigla==='TRA'">{{movimento.negocio_cultura_movimento_tipo.sigla}}</q-chip>
                      <q-chip dense square color="deep-purple" v-else >{{movimento.negocio_cultura_movimento_tipo.sigla}}</q-chip>
                    </abbr>
                  </div>

                  <div class="col-8">
                    <!-- DESCRICAO -->
                    <div v-if="movimento.descricao">
                      <div class="row">
                        <div class="col-12 text-faded table-cell">
                          {{ movimento.descricao }}
                        </div>
                      </div>
                    </div>

                    <!-- TRANSFERENCIAS -->
                    <div v-if="movimento.negocio_cultura_transferencia" class="table-cell">
                      <div class="row" v-for="tmov in movimento.negocio_cultura_transferencia.negocios_culturas_movimentos">
                        {{tmov.negocio_cultura.negocio.pessoa}} -
                        {{tmov.negocio_cultura.negocio.numero_contrato}} -
                        {{tmov.negocio_cultura.negocio.numero_pedido}}
                      </div>
                      <div class="row">
                        <div class="col-12 text-faded">
                          {{ movimento.negocio_cultura_transferencia.descricao }}
                        </div>
                      </div>
                    </div>

                    <!-- ENTREGAS-->
                    <div class="row" v-if="movimento.entrega">
                      <div class="col-3 table-cell">
                        {{movimento.entrega.caminhao.placa }}
                      </div>
                      <div class="col-9">
                        <div class="row " v-for="pesagem in movimento.entrega.entregas_pesagens">
                          <div class="col-3 text-center table-cell">
                            {{pesagem.numero_ticket}}
                          </div>
                          <div class="col-3 text-right table-cell">
                            {{numeral(pesagem.peso_bruto_produto).format('0,00')}} {{negocioCultura.safra_cultura.unidade_medida_pesagem.sigla}}
                          </div>
                          <div class="col-3 text-right table-cell">
                            {{numeral(pesagem.peso_desconto).format('0,00')}} {{negocioCultura.safra_cultura.unidade_medida_pesagem.sigla}}
                          </div>
                          <div class="col-3 text-right table-cell">
                            {{numeral(pesagem.peso_liquido).format('0,00')}} {{negocioCultura.safra_cultura.unidade_medida_pesagem.sigla}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-1 text-right">
                    <div v-if="movimento.negocio_cultura_transferencia">
                      <q-btn flat dense icon="more_vert" round class="q-mr-sm" v-if="movimento.negocio_cultura_transferencia.is_editable">
                        <q-popover>
                          <q-list link class="no-border">
                            <q-item v-close-overlay @click.native="editTransferencia(movimento.id)">
                              <q-item-main label="Editar Transferência"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteTransferencia(movimento.id)">
                              <q-item-main label="Apagar Transferência"/>
                            </q-item>
                          </q-list>
                        </q-popover>
                      </q-btn>
                    </div>

                    <div v-else-if="movimento.negocio_cultura_movimento_tipo.sigla === 'ENT'">
                    </div>

                    <div v-else>
                      <q-btn flat dense icon="more_vert" round class="q-mr-sm">
                        <q-popover>
                          <q-list link class="no-border">
                            <q-item v-close-overlay @click.native="editMovimento(movimento.id)">
                              <q-item-main label="Editar Movimento"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteMovimento(movimento.id)">
                              <q-item-main label="Apagar Movimento"/>
                            </q-item>
                          </q-list>
                        </q-popover>
                      </q-btn>
                    </div>

                  </div>
                </q-item-main>
              </q-item>

              <q-item class="lt-sm" style="padding: 3px 8px 3px 8px" :key="movimento.id" v-else>

                <q-item-main >
                  <q-item-tile class="row">
                      <div class="col-2">
                        <div class="col-1 text-center table-cell">
                          <abbr :title="movimento.negocio_cultura_movimento_tipo.nome">
                            <q-chip dense square color="blue-8" v-if="movimento.negocio_cultura_movimento_tipo.sigla==='ENT'">{{movimento.negocio_cultura_movimento_tipo.sigla}}</q-chip>
                            <q-chip dense square color="amber" v-else-if="movimento.negocio_cultura_movimento_tipo.sigla==='TRA'">{{movimento.negocio_cultura_movimento_tipo.sigla}}</q-chip>
                            <q-chip dense square color="deep-purple" v-else >{{movimento.negocio_cultura_movimento_tipo.sigla}}</q-chip>
                          </abbr>
                        </div>
                      </div>
                      <div class="col-5 text-left table-cell">
                        <div :class="(movimento.quantidade<0)?'text-negative':'text-indigo'">
                          {{numeral(movimento.quantidade).format('0,0')}} KG
                        </div>
                        <div class="text-faded">
                          {{numeral(movimento.quantidade_comercial).format('0,0')}} SC
                        </div>
                      </div>

                      <div class="col-4 text-right table-cell text-faded">
                        {{moment(movimento.lancamento).format('DD/MMM/YY')}}
                        <div class="text-faded ">
                          {{moment(movimento.lancamento).format('HH:mm:ss')}}
                        </div>
                      </div>

                      <div class="col-1 text-right">
                        <div v-if="movimento.negocio_cultura_transferencia">
                          <q-btn flat dense icon="more_vert" round class="q-mr-sm" v-if="movimento.negocio_cultura_transferencia.is_editable">
                            <q-popover>
                              <q-list link class="no-border">
                                <q-item v-close-overlay @click.native="editTransferencia(movimento.id)">
                                  <q-item-main label="Editar Transferência"/>
                                </q-item>
                                <q-item v-close-overlay @click.native="deleteTransferencia(movimento.id)">
                                  <q-item-main label="Apagar Transferência"/>
                                </q-item>
                              </q-list>
                            </q-popover>
                          </q-btn>
                        </div>

                        <div v-else-if="movimento.negocio_cultura_movimento_tipo.sigla === 'ENT'">
                        </div>

                        <div v-else>
                          <q-btn flat dense icon="more_vert" round class="q-mr-sm">
                            <q-popover>
                              <q-list link class="no-border">
                                <q-item v-close-overlay @click.native="editMovimento(movimento.id)">
                                  <q-item-main label="Editar Movimento"/>
                                </q-item>
                                <q-item v-close-overlay @click.native="deleteMovimento(movimento.id)">
                                  <q-item-main label="Apagar Movimento"/>
                                </q-item>
                              </q-list>
                            </q-popover>
                          </q-btn>
                        </div>

                      </div>

                    </q-item-tile>

                  <q-item-tile class="row q-pt-sm">
                      <div class="col-12">
                        <!-- DESCRICAO -->
                        <div v-if="movimento.descricao">
                          <div class="row">
                            <div class="col-12 text-faded table-cell">
                              {{ movimento.descricao }}
                            </div>
                          </div>
                        </div>

                        <!-- TRANSFERENCIAS -->
                        <div v-if="movimento.negocio_cultura_transferencia" class="table-cell">
                          <div class="row" v-for="tmov in movimento.negocio_cultura_transferencia.negocios_culturas_movimentos">
                            {{tmov.negocio_cultura.negocio.pessoa}} -
                            {{tmov.negocio_cultura.negocio.numero_contrato}} -
                            {{tmov.negocio_cultura.negocio.numero_pedido}}
                          </div>
                          <div class="row">
                            <div class="col-12 text-faded">
                              {{ movimento.negocio_cultura_transferencia.descricao }}
                            </div>
                          </div>
                        </div>

                        <!-- ENTREGAS-->
                        <div class="row" v-if="movimento.entrega">
                          <div class="col-3 table-cell">
                            <span class="text-weight-regular q-caption">Placa</span><br/>
                            <span class="q-caption text-weight-light">{{movimento.entrega.caminhao.placa }}</span>
                          </div>
                          <div class="col-9">
                            <div class="row " v-for="pesagem in movimento.entrega.entregas_pesagens">
                              <div class="col-3 table-cell ">
                                <span class="text-weight-regular q-caption">Nº Ticket</span><br/>
                                <span class="q-caption text-weight-light">{{pesagem.numero_ticket}}</span>
                              </div>
                              <div class="col-3 table-cell">
                                <span class="text-weight-regular q-caption">Bruto</span><br/>
                                <span class="q-caption text-weight-light">{{numeral(pesagem.peso_bruto_produto).format('0,00')}} {{negocioCultura.safra_cultura.unidade_medida_pesagem.sigla}}</span>
                              </div>
                              <div class="col-3 table-cell">
                                <span class="text-weight-regular q-caption">Desconto</span><br/>
                                <span class="q-caption text-weight-light">{{numeral(pesagem.peso_desconto).format('0,00')}} {{negocioCultura.safra_cultura.unidade_medida_pesagem.sigla}}</span>
                              </div>
                              <div class="col-3 table-cell">
                                <span class="text-weight-regular q-caption">Líquido</span><br/>
                                <span class="q-caption text-weight-light">{{numeral(pesagem.peso_liquido).format('0,00')}} {{negocioCultura.safra_cultura.unidade_medida_pesagem.sigla}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </q-item-tile>
                </q-item-main>

              </q-item>
              </a>
            </template>

          </q-list>

          <div v-else>
            <div class="list-empty">
              <q-icon name="warning" />
              <span>Nenhuma movimento encontrado.</span>
            </div>
          </div>
        </template>
      </div>

      <q-inner-loading :visible="isLoadingMovimentos" >
        <q-spinner size="60px" ></q-spinner>
      </q-inner-loading>
    </div>

    <!--MODAL NOVA TRANSFERENCIA -->
    <new-transferencia-modal ref="transferenciaModal"  />

    <!--MODAL NOVO MOVIMENTO -->
    <new-movimento-modal ref="newMovimentoModal"  />

    <!--MODAL EDITAR MOVIMENTO -->
    <edit-movimento-modal ref="editMovimentoModal"  />

    <!--MODAL EDITAR TRANSFERENCIA -->
    <edit-transferencia-modal ref="editTransferenciaModal"  />
  </div>

</template>

<script>
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";
  import newTransferenciaModal from '../modals/NewTransferenciaModal';
  import newMovimentoModal from '../modals/NewMovimentoModal';
  import editMovimentoModal from '../modals/EditMovimentoModal';
  import editTransferenciaModal from '../modals/EditTransferenciaModal';

  export default {
    name: "ArmazemEntregasListTab",
    props:{
      negocio: Object,
      negocioCultura: Object,
      armazem: Object,
    },
    components:{
      newTransferenciaModal,
      newMovimentoModal,
      editMovimentoModal,
      editTransferenciaModal
    },
    data(){
      return {
        negocioService: new NegocioService(),
        movimentos: null,
        isLoadingMovimentos: false,
      }
    },
    methods:{
      newTrasnferencia(){
        this.$refs.transferenciaModal.openModal(this.negocioCultura, this.armazem.armazem_id);
      },
      newMovimento(){
        this.$refs.newMovimentoModal.openModal(this.negocioCultura, this.armazem.armazem_id, this.negocio.emissao);
      },
      editMovimento(movimentoId){
        this.$refs.editMovimentoModal.openModal(movimentoId, this.negocioCultura, this.negocio.emissao);
      },
      editTransferencia(movimentoId){
        this.$refs.editTransferenciaModal.openModal(movimentoId, this.negocioCultura);
      },
      deleteMovimento(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta movimentação?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.negocioService.deleteMovimento(id).then(() => {
            this.$q.loading.hide();
            this.$root.$emit('refreshNegocioMovimentos');
            this.$q.notify({type: 'positive', message: 'Movimento apagado com sucesso'});
          }).catch(() =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível apagar esta movimentação'});
            this.$q.loading.hide();
          })
        }).catch(()=>{});
      },
      deleteTransferencia(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta transferência?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.negocioService.deleteMovimento(id).then(() => {
            this.$q.loading.hide();
            this.$root.$emit('refreshNegocioMovimentos');
            this.$q.notify({type: 'positive', message: 'Transferencia apagada com sucesso'});
          }).catch(() =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível apagar esta transferência'});
            this.$q.loading.hide();
          })
        }).catch(()=>{});
      },
      listMovimentos(){
        this.isLoadingMovimentos = true;
        this.negocioService.listMovimentosByArmazem(this.negocioCultura.id, this.armazem.armazem_id).then(movimentos => {
          this.movimentos = movimentos;
          this.isLoadingMovimentos = false;
        })
      },
      formataNumeroNotaFiscal(numeros) {
        let numerosFormatted = numeros.map(numero => this.$_.padStart(numero, 8, '0'));
        return numerosFormatted.join(' | ');
      },
      refreshNegocioMovimentos(){
        this.$root.$emit('refreshNegocio');
        this.listMovimentos();
      },
      entregaUrl(entrega){
        if(entrega){
          return '/#/admin/entregas/' + entrega.id;
        }else{
          return null;
        }
      },
    },
    mounted() {
      this.listMovimentos();
      this.$root.$on('refreshNegocioMovimentos', this.refreshNegocioMovimentos);
    },
    destroyed() {
      this.$root.$off('refreshNegocioMovimentos', this.refreshNegocioMovimentos);
    }
  }
</script>

<style scoped>
  .table-container .q-spinner circle{
    stroke-width: 6px;
    color: #8c8c8c;
  }
  .table-container .q-item{
    border-top: 1px solid #e0e0e0;
  }
  .table-container .link{
    text-decoration: none;
    color: unset;
  }
  .table-container .link .q-item:hover{
    background: hsla(0, 0%, 74%, 0.24);
  }
  .table-header{
    color: rgba(0,0,0,.54);
    font-weight: 500;
    font-size: 12px;
    user-select: none;
  }
  .table-cell{
    font-size: 13px;
    font-weight: 400;
  }
  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }
  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }
  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }
</style>

<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Detalhes do Negocio" navigation_type="back" @navigation_clicked="backAction">
      <template slot="action_itens" v-if="negocio">
        <q-btn slot="right" flat dense icon="more_vert" round>
          <q-popover>
            <q-list link class="no-border">
              <q-item v-close-overlay @click.native="editNegocio(negocio)">
                <q-item-main label="Editar"/>
              </q-item>
              <q-item v-close-overlay @click.native="archiveNegocio(negocio.id)" v-if="!negocio.deleted_at">
                <q-item-main label="Arquivar"/>
              </q-item>
              <q-item v-close-overlay @click.native="deleteNegocio(negocio.id)">
                <q-item-main label="Excluir"/>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>
    </toolbar>

    <!--CONTRATO VIEW-->
    <div class="row gutter-sm space-end q-pa-md" v-if="negocio">

      <!--NEGOCIO-->
      <div class="col-12">
        <q-card class="full-height">
          <q-card-title>
            {{negocio.tipo}}
            <span class="gt-xs">
                {{negocio.numero_pedido}} / {{negocio.numero_contrato}} - {{moment(negocio.emissao).calendar()}}
              </span>
            <span slot="subtitle" class="lt-sm">
                {{negocio.numero_pedido}} / {{negocio.numero_contrato}} - {{moment(negocio.emissao).calendar()}}
              </span>

          </q-card-title>

          <q-card-main class="row gutter-xs">

            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 text-faded ">
              Contrato de {{negocio.tipo.toLowerCase()}}
              com {{negocio.pessoa.nome}}
              emitido em {{moment(negocio.emissao).format('ll')}}.
              Número do pedido {{negocio.numero_pedido}}
              Número do contrato {{negocio.numero_contrato}}

              <p  v-if="negocio.observacoes">
                Observações <br/>
                <span class="text-faded ">{{negocio.observacoes}}</span>
              </p>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <b class="">{{negocio.pessoa.nome}}</b>
              <p class="text-faded">
                {{negocio.pessoa.nome}}, {{negocio.pessoa.localizacao}}
              </p>
            </div>

          </q-card-main>
        </q-card>
      </div>

      <!--NEGOCIO CULTURAS & NEGOCIO CULTURA FIXAÇOES-->
      <div class="col-12" v-for="(cultura, index) in negocio.culturas" :key="cultura.id">
          <q-card class="full-height">
            <q-card-title>
              {{cultura.safra_cultura}}
              <span v-if="cultura.is_safrinha">Safrinha</span>
              {{cultura.safra}}
              <q-btn slot="right" flat dense icon="more_vert" round>
                <q-popover>
                  <q-list link class="no-border">
                    <q-item v-close-overlay @click.native="deleteCultura(cultura.id)">
                      <q-item-main label="Excluir Cultura"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-card-title>
            <q-card-main>
              <div class="row gutter-sm" >

                <!--NEGOCIO CULTURAS-->
                <div :class="direita">
                  <div class="row gutter-xs text-faded">

                    <div class="col-12 q-caption">
                      Entrega
                      <q-progress :percentage="cultura.quantidade_entregue / cultura.quantidade * 100" height="6px" color="blue" animate stripe/>
                    </div>

                    <div class="col-12  q-caption" v-if="negocio.tipo !== 'Troca'">
                      Fixações
                      <q-progress :percentage="cultura.fixacao_porcentagem"  height="6px" color="blue" animate stripe/>
                    </div>

                    <div class="col-12  q-caption" v-if="false">
                      Financeiro
                      <q-progress :percentage="progressModel + 20" height="6px" color="blue" animate stripe/>
                    </div>

                    <div class="col-12" v-if="cultura.observacoes">
                      <span class="text-bold">Observações</span>
                      <p>{{cultura.observacoes}}</p>
                    </div>
                  </div>
                </div>

                <!--NEGOCIO CULTURAS DETALHES-->
                <div :class="esquerda">
                  <div class="row gutter-xs">
                    <div class="col-12">
                      <span class="text-faded">Entregue</span> {{ numeral(cultura.quantidade_entregue).format('0,0') }}
                      <span class="text-faded">de</span> {{ numeral(cultura.quantidade).format('0,0') }} {{cultura.unidade_medida.sigla}}
                      <template v-if="cultura.prazo_entrega_inicial">
                        <span class="text-faded">entre</span> {{ moment(cultura.prazo_entrega_inicial).format('DD/MMM') }}
                        <span class="text-faded">e</span> {{ moment(cultura.prazo_entrega_final).format('DD/MMM/YYYY') }}.
                      </template>
                      <br/>
                      <span class="text-faded">Armazens: </span> {{armazensTitulos(cultura.armazens).join(', ')}}.
                      <br/>
                      <span class="text-faded">Classificação: </span>{{cultura.classificacao}}.
                    </div>
                  </div>
                </div>

                <!--NEGOCIO CULTURA FIXAÇOES-->
                <template v-for="(fixacao, index) in cultura.fixacoes" >
                  <div class="col-12">
                    <q-card-separator/>
                  </div>

                  <q-card style="padding: 0; width:100%">
                    <q-tabs class="full-width" inverted>
                      <q-tab slot="title" name="tab-resumo" label="Resumo" default/>
                      <q-tab slot="title" :name="'tab-' + index" :label="armazemTitulo" v-for="(armazemTitulo, index) in armazensTitulos(cultura.armazens)" :key="armazemTitulo"/>

                      <q-tab-pane class="q-pa-none" name="tab-resumo">
                        <q-list no-border>
                          <q-item>
                            <q-item-main subheading>
                              {{ numeral(cultura.quantidade).format('0,0') }} {{cultura.unidade_medida.sigla}}
                            </q-item-main>
                          </q-item>
                          <q-item v-for="armazem in cultura.armazens" :key="armazem.id">
                            {{numeral(armazem.quantidade).format('0,0')}} {{cultura.unidade_medida.sigla}} {{armazem.nome}}
                          </q-item>
                          <q-item>
                            {{numeral(cultura.quantidade - cultura.quantidade_entregue).format('0,0')}} {{cultura.unidade_medida.sigla}} Saldo
                          </q-item>
                        </q-list>
                      </q-tab-pane>
                      <q-tab-pane class="q-pa-none" :name="'tab-' + index" v-for="(armazem, index) in cultura.armazens" :key="armazem.id" keep-alive>
                        <armazem-entregas-list-tabs :negocio-cultura="cultura" :armazem="armazem" />
                      </q-tab-pane>
                    </q-tabs>
                  </q-card>

                  <div class="col-12">
                    <q-card-separator/>
                  </div>
                  <div :class="direita" v-if="fixacao.titulos" :key="fixacao.id">

                    <!--TITULOS PAGOS-->
                    <template v-if="fixacao.titulos.pagos">
                      <div class="row col-12" v-for="(titulo, index) in fixacao.titulos.pagos" :key="titulo.total">
                        <q-list no-border separator>

                          <q-item class="q-px-none">
                            <q-item-main>
                              Pagos {{titulo.total}}
                            </q-item-main>
                          </q-item>

                          <q-item v-for="(item, index) in titulo.itens" class="text-faded q-px-none" :key="index * 3">
                            <q-item-main >
                              {{item[0]}} <br/>
                              <span class="q-caption">
                              {{item[1]}}
                            </span>
                            </q-item-main>
                          </q-item>
                        </q-list>

                      </div>
                    </template>

                    <!--TITULOS PARA PAGAR-->
                    <template v-if="fixacao.titulos.para_pagar">
                      <div class="row" v-for="(titulo, index) in fixacao.titulos.para_pagar" :key="titulo.total">
                        <div class="col-12">

                          <q-list no-border highlight separator>
                            <q-item class="q-px-none">
                              <q-item-main>
                                Para pagar {{titulo.total}}
                              </q-item-main>
                            </q-item>

                            <q-item v-for="item in titulo.itens" class="text-faded q-px-none" :key="item.id">
                              <q-item-main>
                                {{item.titulo}}
                              </q-item-main>
                              <q-item-side>
                                <q-btn dense flat icon="more_vert" round>
                                  <q-popover>
                                    <q-list link class="no-border">
                                      <q-item v-close-overlay @click.native="deleteFixacaoTitulo(item.id, fixacao.id, cultura.id)">
                                        <q-item-main label="Excluir Título"/>
                                      </q-item>
                                    </q-list>
                                  </q-popover>
                                </q-btn>
                              </q-item-side>
                            </q-item>
                          </q-list>

                        </div>
                      </div>
                    </template>
                  </div>

                  <!--FIXACAO DESCONTOS-->
                  <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                    <div class="row gutter-xs">

                      <div class="col-9 text-bold self-center">
                        {{numeral(fixacao.quantidade).format('0,0')}} {{fixacao.unidade_medida_quantidade.sigla}}
                        em {{moment(fixacao.data_fixacao).format('DD [de] MMMM [de] YYYY')}}
                      </div>

                      <div class="col-3">
                        <q-btn class="float-right" color="grey-7" flat dense icon="more_vert" round>
                          <q-popover>
                            <q-list link class="no-border">
                              <q-item v-close-overlay @click.native="deleteFixacao(fixacao.id, cultura.id)">
                                <q-item-main label="Excluir Fixação"/>
                              </q-item>
                            </q-list>
                          </q-popover>
                        </q-btn>
                      </div>

                      <div class="col-12">
                        <div class="row gutter-xs">
                          <div class="col-4 q-pb-xs"></div>
                          <div class="col-4 q-pb-xs " align="end">{{fixacao.unidade_medida_preco.sigla}}</div>
                          <div class="col-4 q-pb-xs " align="end">Total</div>

                          <div class="col-4 text-faded"> Bruto </div>
                          <div class="col-4 text-faded" align="end">{{fixacao.bruto}} {{fixacao.moeda.simbolo}}</div>
                          <div class="col-4 text-faded" align="end">{{fixacao.total_bruto}} {{fixacao.moeda.simbolo}}</div>

                          <div class="col-4 text-faded"> Impostos </div>
                          <div class="col-4 text-faded" align="end">{{fixacao.impostos}} {{fixacao.moeda.simbolo}}</div>
                          <div class="col-4 text-faded" align="end">{{fixacao.total_impostos}} {{fixacao.moeda.simbolo}}</div>

                          <div class="col-4 text-faded"> Acréscimos </div>
                          <div class="col-4 text-faded" align="end">{{fixacao.acrescimos}} {{fixacao.moeda.simbolo}}</div>
                          <div class="col-4 text-faded" align="end">{{fixacao.total_acrescimos}} {{fixacao.moeda.simbolo}}</div>

                          <div class="col-4 text-faded"> Descontos </div>
                          <div class="col-4 text-faded" align="end">{{fixacao.descontos}} {{fixacao.moeda.simbolo}}</div>
                          <div class="col-4 text-faded" align="end">{{fixacao.total_descontos}} {{fixacao.moeda.simbolo}}</div>

                          <div class="col-4"> Líquido </div>
                          <div class="col-4" align="end">{{fixacao.liquido}} {{fixacao.moeda.simbolo}}</div>
                          <div class="col-4" align="end">{{fixacao.total_liquido}} {{fixacao.moeda.simbolo}}</div>

                        </div>
                      </div>

                    </div>
                  </div>
                </template>

              </div>
            </q-card-main>
          </q-card>
        </div>

      <!--TITULOS-->
      <div class="col-12" v-if="negocio.titulos">
        <q-card>

          <q-card-title>TÍTULOS</q-card-title>

          <q-card-main>
            <div class="row gutter-y-sm">

              <!--TITULOS PAGOS-->
              <template v-for="(titulo, index) in negocio.titulos.pagos" >

                <div class="col-12  " :key="titulo.total">
                  <q-list no-border separator>

                    <q-item class="q-px-none">
                      <q-item-main>
                        Pagos {{titulo.total}}
                      </q-item-main>
                    </q-item>

                    <q-item class="text-faded q-px-none" v-for="(item, index) in titulo.itens" :key="index * 4">
                      <q-item-main>
                        <q-item-tile>
                          {{item[0]}}
                        </q-item-tile>
                        <q-item-tile sublabel>
                          {{item[1]}}
                        </q-item-tile>
                      </q-item-main>
                    </q-item>

                  </q-list>
                </div>
              </template>

              <!--TITULOS PARA PAGAR-->
              <template v-for="(titulo, index) in negocio.titulos.para_pagar" >
                <div class="col-12  " :key="titulo.total">
                  <q-list highlight no-border separator>

                    <q-item class="q-px-none">
                      <q-item-main>
                        Para pagar {{titulo.total}}
                      </q-item-main>
                    </q-item>

                    <q-item class="text-faded q-px-none" v-for="item in titulo.itens" :key="item.id">
                      <q-item-main>
                        {{item.titulo}}
                      </q-item-main>
                      <q-item-side>
                        <q-btn flat dense icon="more_vert" round>
                          <q-popover>
                            <q-list link class="no-border">
                              <q-item v-close-overlay @click.native="deleteTitulo(item.id)">
                                <q-item-main label="Excluir Título"/>
                              </q-item>
                            </q-list>
                          </q-popover>
                        </q-btn>
                      </q-item-side>
                    </q-item>

                  </q-list>
                </div>
              </template>

            </div>
          </q-card-main>
        </q-card>
      </div>

      <!--NEGOCIO PRODUTOS-->
      <div class="col-12" v-if="negocio.produtos">
        <q-card>

          <q-card-title>PRODUTOS</q-card-title>
          <q-card-main>
            <div class="row">
              <div class="col-12">

                <q-list highlight no-border separator>

                  <q-item v-if="$q.screen.gt.sm" class="q-px-none">
                    <q-item-main class="row">
                      <div class="col-2">Produto</div>
                      <div class="col-4 text-right">Quantidade</div>
                      <div class="col-2 text-right">Preço</div>
                      <div class="col-4 text-right">Total</div>
                    </q-item-main>
                    <q-item-side/>
                  </q-item>

                  <q-item v-for="(produto, index) in negocio.produtos" :key="produto.nome" class="q-px-none">
                    <q-item-main >
                      <q-item-tile class="row text-faded">
                        <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                          {{produto.nome}}
                        </div>
                        <div :class="$q.screen.lt.md ? 'col-xs-12 col-sm-12 col-md-4 col-lg-4': 'col-xs-12 col-sm-12 col-md-4 col-lg-4 text-right' ">
                          <span v-if="$q.screen.lt.md">Quantidade</span>
                          {{numeral(produto.quantidade).format('0,0')}} {{produto.quantidade_unidade_medida}}

                        </div>
                        <div :class="$q.screen.lt.md ? 'col-xs-12 col-sm-12 col-md-2 col-lg-2': 'col-xs-12 col-sm-12 col-md-2 col-lg-2 text-right' ">
                          <span v-if="$q.screen.lt.md">Preço</span>
                          {{numeral(produto.preco).format('0,0.00')}} {{produto.indexador.sigla}}
                        </div>
                        <div :class="$q.screen.lt.md ? 'col-xs-12 col-sm-12 col-md-4 col-lg-4': 'col-xs-12 col-sm-12 col-md-4 col-lg-4 text-right' ">
                          <span v-if="$q.screen.lt.md">Total</span>
                          {{numeral(produto.valor_total).format('0,0.00')}} {{produto.indexador.sigla}}
                        </div>
                      </q-item-tile>

                    </q-item-main>
                    <q-item-side :class="$q.screen.lt.md ? 'self-start': '' ">
                      <q-btn flat dense icon="more_vert" round>
                        <q-popover>
                          <q-list link class="no-border">
                            <q-item v-close-overlay @click.native="deleteProduto(produto.id)">
                              <q-item-main label="Excluir"/>
                            </q-item>
                          </q-list>
                        </q-popover>
                      </q-btn>
                    </q-item-side>
                  </q-item>
                </q-list>

              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>

    </div>

    <!--PAGE STICKY BUTTOMS-->
    <q-page-sticky position="bottom-right" :offset="[35, 35]" v-if="negocio">
      <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
        <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="attachCultura()">
          <span class="shadow-2">Cultura</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachTitulo()" icon="add">
          <span class="shadow-2">Título</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachProduto()" icon="add">
          <span class="shadow-2">Produto</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachFixacao()" icon="add" v-if="negocio.tipo !== 'Troca'">
          <span class="shadow-2">Fixação</span>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <!--MODAL VINCULAR SAFRA CULTURA -->
    <new-cultura-modal ref="culturaModal"  />

    <!--MODAL VINCULAR TITULO -->
    <new-titulo-modal ref="tituloModal" />

    <!--MODAL VINCULAR PRODUTO -->
    <new-produto-modal ref="produtoModal" />

    <!--MODAL VINCULAR FIXACAO -->
    <new-fixacao-modal ref="fixacaoModal" />

    <edit-negocio-modal ref="editNegocioModal" />
  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import newCulturaModal from './components/modals/NewCulturaModal';
  import editNegocioModal from './components/modals/EditNegocioModal';
  import newTituloModal from './components/modals/NewTituloModal';
  import newProdutoModal from './components/modals/NewProdutoModal';
  import newFixacaoModal from './components/modals/NewFixacaoModal';
  import armazemEntregasListTabs from './components/tabs/ArmazemEntregasListTab';
  import apNoResults from 'components/ApNoResults'
  import NegocioService from "../../../assets/js/service/negocio/NegocioService";

  export default {
    name: "negocio-view",
    components: {
      apNoResults,
      toolbar,
      customPage,
      newCulturaModal,
      newTituloModal,
      newProdutoModal,
      newFixacaoModal,
      editNegocioModal,
      armazemEntregasListTabs
    },
    data () {
      return {
        negocioService: new NegocioService(),
        direita: 'col-xs-12 col-sm-12 col-md-7 col-lg-7',
        esquerda: 'col-xs-12 col-sm-12 col-md-5 col-lg-5',
        negocio: null,
        progressModel: 50,
      }
    },
    methods: {
      attachCultura(){
        this.$refs.culturaModal.openModal(this.negocio);
      },
      attachTitulo(){
        this.$refs.tituloModal.openModal(this.negocio);
      },
      attachProduto(){
        this.$refs.produtoModal.openModal(this.negocio);
      },
      attachFixacao(){
        this.$refs.fixacaoModal.openModal(this.negocio);
      },
      editNegocio(negocio){
        this.$refs.editNegocioModal.openModal(negocio);
      },
      archiveNegocio(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar esta negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.negocioService.archiveNegocio(id).then(() => {
            this.getNegocioById()
          })
        });
      },
      deleteNegocio(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.negocioService.deleteNegocio(id).then(() => {
            this.$q.loading.hide();
            this.backAction();
          }).catch(error => {
            this.$q.loading.hide();
            if(error.status === 422){
              this.$q.dialog({
                title: 'Erro', message: 'Não é possível apagar esse negócio! O negócio está associado a outras atividades.', ok: 'Ok', color: 'primary'})
            }
          })
        });
      },
      deleteCultura(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta cultura do negócio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.negocioService.deleteCultura(this.negocio.id, id).then(() => {
            this.$q.loading.hide();
            this.getNegocioById()
          }).catch(error => {
            this.$q.loading.hide();
            if(error.status === 422){
              this.$q.dialog({
                title: 'Erro', message: 'Não é possível apagar essa cultura!', ok: 'Ok', color: 'primary'})
            }
          })
        });
      },
      deleteFixacao(id, culturaId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta fixação do negócio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.negocioService.deleteFixacao(culturaId, id).then(()=>{
            this.$q.loading.hide();
            this.getNegocioById()
          }).catch(error => {
            this.$q.loading.hide();
            if(error.status === 422){
              this.$q.dialog({
                title: 'Erro', message: 'Primeiro apague os títulos associados a essa fixação!', ok: 'Ok', color: 'primary'})
            }
          })
        });
      },
      deleteFixacaoTitulo(id, fixacaoId, culturaId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar este título?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.negocioService.deleteTituloFixacao(id, fixacaoId, culturaId).then(()=>{
            this.$q.loading.hide();
            this.getNegocioById()
          })
        });
      },
      deleteTitulo(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar este título?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.negocioService.deleteTitulo(this.negocio.id, id).then(() => {
            this.$q.loading.hide();
            this.getNegocioById()
          })
        });
      },
      deleteProduto(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja desvincular este produto do negócio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.negocioService.deleteProduto(this.negocio.id, id).then(() => {
            this.$q.loading.hide();
            this.getNegocioById()
          })
        });
      },

      getNegocioById(){
        this.$q.loading.show();
        this.negocioService.getNegocioById(this.$route.params.id, true).then(negocio => {
          this.negocio = negocio;
          this.$q.loading.hide();
        })
      },
      armazensTitulos(armazens){
        return _.map(armazens, 'nome');
      },
      backAction () {
        this.$router.back();
      },
    },
    mounted () {
      this.getNegocioById();

      this.$root.$on('refreshNegocio', this.getNegocioById);
    },
    destroyed() {
      this.$root.$off('refreshNegocio', this.getNegocioById);
    }
  }

</script>
<style scoped>
  .custom-title{
    font-size: 18px;
    font-weight: 400;
  }
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }
</style>

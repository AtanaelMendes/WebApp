<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Detalhes do Negocio" navigation_type="back" @navigation_clicked="backAction"></toolbar>

    <!--CONTRATO VIEW-->
    <div class="row gutter-sm space-end q-pa-md" v-if="negocio">

      <!--NEGOCIO-->
      <template>
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
              <q-btn slot="right" flat dense icon="more_vert" round>
                <q-popover>
                  <q-list link class="no-border">
                    <q-item v-close-overlay @click.native="archiveNegocio(negocio.id)" v-if="!negocio.deleted_at">
                      <q-item-main label="Arquivar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteNegocio(negocio.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-card-title>
            <q-card-separator/>

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

      </template>

      <!--NEGOCIO CULTURAS & NEGOCIO CULTURA FIXAÇOES-->
      <template v-for="(cultura, index) in negocio.culturas">

        <div class="col-12" :key="cultura.id">
          <q-card class="full-height">
            <q-card-title>
              {{cultura.safra_cultura}}
              <q-btn slot="right" flat dense icon="more_vert" round>
                <q-popover>
                  <q-list link class="no-border">
                    <q-item v-close-overlay @click.native="deleteCultura(cultura.id)">
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-card-title>
            <q-card-separator/>

            <q-card-main class="row gutter-sm">

              <!--NEGOCIO CULTURAS-->
              <div :class="direita">
                <div class="row gutter-xs text-faded">
                  <div class="col-12  q-caption">
                    Entrega
                    <q-progress :percentage="cultura.entrega_porcentagem" height="6px" color="blue" animate stripe/>
                  </div>
                  <div class="col-12  q-caption">
                    Fixações
                    <q-progress :percentage="cultura.fixacao_porcentagem"  height="6px" color="blue" animate stripe/>
                  </div>
                  <div class="col-12  q-caption" v-if="false">
                    Financeiro
                    <q-progress :percentage="progressModel + 20" height="6px" color="blue" animate stripe/>
                  </div>
                  <div class="col-12" v-if="cultura.observacoes">
                    Observações
                    <p>{{cultura.observacoes}}</p>
                  </div>
                </div>
              </div>

              <div :class="esquerda">
                <div class="row gutter-xs">
                  <div class="col-12">
                    <span class="text-faded">Entregue</span> 3.500
                    <span class="text-faded">de</span> 5.000 SC/60
                    <span class="text-faded">entre</span> 5 jan 2018
                    <span class="text-faded">e</span> 31 jan 2019.
                    <br/>
                    <span class="text-faded">Armazens: </span> {{cultura.armazens}}.
                    <br/>
                    <span class="text-faded">Classificação: </span>{{cultura.classificacao}}.
                  </div>
                </div>
              </div>

              <!--NEGOCIO CULTURA FIXAÇOES-->
              <div class="row col-12" v-for="(fixacao, index) in cultura.fixacoes">

                <div :class="direita" v-if="fixacao.titulos" :key="fixacao.id">

                  <div class="row col-12" v-for="(titulo, index) in fixacao.titulos.pagos" :key="titulo.total">
                          Pagos:wewewew
                           Total: {{titulo.total}}

                    <q-list no-border highlight separator>
                      <q-item v-for="(item, index) in titulo.itens" class="text-faded" :key="index * 3">
                        <q-item-main >
                          {{item[0]}} <br/>
                          <span class="q-caption">
                              {{item[1]}}
                            </span>
                        </q-item-main>
                      </q-item>
                    </q-list>

                  </div>




                  <q-list no-border highlight>

                    <template v-for="(titulo, index) in fixacao.titulos.para_pagar">
                      <p :key="titulo.total">
                        ({{index}}) Total: {{titulo.total}}
                      </p>
                      <q-item v-for="item in titulo.itens" class="text-faded" :key="item">
                        <q-item-main>
                          {{item}}
                        </q-item-main>
                      </q-item>
                    </template>

                    <q-item>
                      <q-item-main>
                        <q-item-tile>
                          Para pagar:
                        </q-item-tile>
                        <q-item-tile></q-item-tile>
                      </q-item-main>
                    </q-item>

                  </q-list>
                </div>




                <div :class="esquerda">
                  <div class="row gutter-xs">

                    <div class="col-12 text-bold">
                      {{fixacao.quantidade}} {{fixacao.unidade_medida_quantidade.sigla}}
                      em {{moment(fixacao.data_fixacao).format('DD [de] MMMM [de] YYYY')}}
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
              </div>

            </q-card-main>
          </q-card>
        </div>




      </template>

      <!--TITULOS-->
      <template v-if="negocio.titulos">
        <div class="col-12">
          <q-card>
            <q-card-title>TITULOS</q-card-title>
            <q-card-separator/>
            <q-card-main>
              <div class="row">
                <div class="col-12 q-pb-xs">
                  Pagos:
                </div>
                <div class="row col-12" v-for="(titulo, index) in negocio.titulos.pagos" :key="titulo.total">
                  <div class="col-12 q-pb-xs">
                    ({{index}}) Total: {{titulo.total}}
                  </div>
                  <div class="col-12  text-faded" v-for="(item, index) in titulo.itens" :key="index * 4">
                    {{item[0]}} <br/><span class="q-caption">{{item[1]}}</span>
                  </div>
                </div>

                <div class="col-12 q-pb-xs">
                  Para pagar:
                </div>
                <div class="row col-12" v-for="(titulo, index) in negocio.titulos.para_pagar" :key="titulo.total">
                  <div class="col-12 q-pb-xs">
                    ({{index}}) Total: {{titulo.total}}
                  </div>
                  <div class="col-12  text-faded" v-for="(item, index) in titulo.itens" :key="index * 7">
                    {{item}}
                  </div>
                </div>
              </div>
            </q-card-main>
          </q-card>
        </div>
      </template>

      <!--NEGOCIO PRODUTOS-->
      <template v-if="negocio.produtos">
        <div class="col-12">
          <q-card>
            <q-card-title>
              PRODUTOS
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
              <div :class="$q.screen.lt.sm ? 'row gutter-y-xs  q-caption' : 'row gutter-y-xs' ">
                <div class="col-2">
                  Produto
                </div>
                <div class="col-4 text-right">
                  Quantidade
                </div>
                <div class="col-2 text-right">
                  Preço
                </div>
                <div class="col-4 text-right">
                  Total
                </div>

                <template v-for="(produto, index) in negocio.produtos">
                  <div class="col-2 text-faded" :key="produto.nome">
                    {{produto.nome}}
                  </div>
                  <div class="col-4 text-faded text-right">
                    {{numeral(produto.quantidade).format('0,0')}} {{produto.quantidade_unidade_medida}}
                  </div>
                  <div class="col-2 text-faded text-right">
                    {{numeral(produto.preco).format('0,0.00')}} {{produto.indexador.sigla}}
                  </div>
                  <div class="col-4 text-faded text-right">
                    {{numeral(produto.valor_total).format('0,0.00')}} {{produto.indexador.sigla}}
                  </div>
                </template>

              </div>
            </q-card-main>
          </q-card>
        </div>
      </template>

    </div>

    <!--EMPTY LIST-->
    <div class="column q-ma-xl items-center" v-if="!negocio">
      <div class="col-6">
        <img src="assets/images/sad_2.svg" class="responsive"/>
      </div>
      <div class="col-6 text-justify">
        <span>Nenhum resultado encontrado.</span>
      </div>
    </div>

    <!--PAGE STICKY BUTTOMS-->
    <q-page-sticky position="bottom-right" :offset="[35, 35]">
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
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachFixacao()" icon="add">
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

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import newCulturaModal from 'components/negocio/NewCulturaModal';
  import newTituloModal from 'components/negocio/NewTituloModal';
  import newProdutoModal from 'components/negocio/NewProdutoModal';
  import newFixacaoModal from 'components/negocio/NewFixacaoModal';
  import { Screen } from 'quasar'

  export default {
    name: "negocio-view",
    components: {
      toolbar,
      customPage,
      newCulturaModal,
      newTituloModal,
      newProdutoModal,
      newFixacaoModal,
    },
    data () {
      return {
        direita: 'col-xs-12 col-sm-12 col-md-7 col-lg-7',
        esquerda: 'col-xs-12 col-sm-12 col-md-5 col-lg-5',
        negocio: null,
        progressModel: 50,
      }
    },
    computed: {},
    methods: {
      attachCultura: function(){
        this.$refs.culturaModal.openModal(this.negocio);
      },
      attachTitulo: function(){
        this.$refs.tituloModal.openModal(this.negocio);
      },
      attachProduto: function(){
        this.$refs.produtoModal.openModal(this.negocio);
      },
      attachFixacao: function(){
        this.$refs.fixacaoModal.openModal(this.negocio);
      },

      archiveNegocio: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja Arquivar esta negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.archiveNegocio(id).then(response => {
            this.getNegocioById()
          })
        }).catch(()=>{});
      },
      deleteNegocio: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.getNegocioById()
          })
        }).catch(()=>{});
      },

      deleteCultura: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.getNegocioById()
          })
        }).catch(()=>{});
      },

      getNegocioById: function(){
        negocioService.getNegocioById(this.$route.params.id, true).then(response => {
          this.negocio = response.data;
        });
      },
      backAction: function () {
        this.$router.push({name: 'negocios'});
      },
    },
    mounted () {
      this.getNegocioById();

      this.$root.$on('refreshNegocio', () => {
        this.getNegocioById();
      });
    },
  }

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

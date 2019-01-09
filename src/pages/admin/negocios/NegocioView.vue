<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Detalhes do Negocio" navigation_type="back" @navigation_clicked="backAction"></toolbar>

    <!--CONTRATO VIEW-->
    <div class="row gutter-sm space-end q-ma-lg" v-if="negocio">

      <!--NEGOCIO-->
      <template>
        <div :class="direita">
          <div class="row gutter-xs">

            <div class="col-12">
              {{negocio.tipo}} {{negocio.numero_pedido}} / {{negocio.numero_contrato}} - {{moment(negocio.emissao).format('DD/MM/YYYY')}}
            </div>

            <div class="col-12 text-faded ">
              Contrato de {{negocio.tipo.toLowerCase()}} com {{negocio.pessoa.nome}} emitido em {{moment(negocio.emissao).format('DD [de] MMMM [de] YYYY')}}.
              Número do pedido {{negocio.numero_pedido}} Número do contrato {{negocio.numero_contrato}}
            </div>

            <div class="col-12" v-if="negocio.observacoes">
              Observações
              <p class="text-faded ">{{negocio.observacoes}}</p>
            </div>

          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">
            <div class="col-12">
              <div class="row">
                <div class="col-9 self-center">{{negocio.pessoa.nome}}</div>
                <!--<div class="col-3 self-center" align="end">-->
                  <!--<q-btn icon="more_vert" color="primary" flat dense round></q-btn>-->
                <!--</div>-->
              </div>
            </div>
            <div class="col-12 text-faded ">
              {{negocio.pessoa.nome}}, {{negocio.pessoa.localizacao}}
            </div>
          </div>
        </div>
      </template>

      <!--NEGOCIO CULTURAS-->
      <template v-for="(cultura, index) in negocio.culturas">
        <div :class="direita">
          <div class="row gutter-xs">
            <div class="col-12">{{cultura.safra_cultura}}</div>
            <div class="col-12 text-faded q-caption">
              Entrega
              <q-progress :percentage="cultura.entrega_porcentagem" height="6px" color="blue" animate stripe/>
            </div>
            <div class="col-12 text-faded q-caption">
              Fixações
              <q-progress :percentage="cultura.fixacao_porcentagem"  height="6px" color="blue" animate stripe/>
            </div>
            <div class="col-12 text-faded q-caption" v-if="false">
              Financeiro
              <q-progress :percentage="progressModel + 20" height="6px" color="blue" animate stripe/>
            </div>
            <div class="col-12" v-if="cultura.observacoes">
              Observações
              <p class="text-faded ">{{cultura.observacoes}}</p>
            </div>
          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">
            <div class="col-12">
              <div class="row">
                <div class="col-9 self-center">DETALHES</div>
                <div class="col-3 self-center" align="end">
                  <!--<q-btn icon="more_vert" color="primary" flat dense round></q-btn>-->
                </div>
              </div>
            </div>
            <div class="col-12">
              <span class="text-faded">Entregue</span> 3.500 <span class="text-faded">de</span> 5.000 SC/60
              <span class="text-faded">entre</span> 5 jan 2018 <span class="text-faded">e</span> 31 jan 2019.
              <br/>
              <span class="text-faded">Armazens: </span> {{cultura.armazens}}.
              <br/>
              <span class="text-faded">Classificação: </span>{{cultura.classificacao}}.
            </div>
          </div>

        </div>

        <!--NEGOCIO CULTURA FIXAÇOES-->

        <template v-for="(fixacao, index) in cultura.fixacoes">
          <!--FIXAÇOES TITULOS-->
          <template v-if="fixacao.titulos">
            <div :class="direita">
              <div class="row">

                <div class="col-12 q-pb-xs">FINACEIRO</div>

                <div class="col-12 q-pb-xs">
                  Pagos:
                </div>
                <div class="row col-12" v-for="(titulo, index) in fixacao.titulos.pagos">
                  <div class="col-12 q-pb-xs">
                    ({{index}}) Total: {{titulo.total}}
                  </div>
                  <div class="col-12  text-faded" v-for="item in titulo.itens">
                    {{item[0]}} <br/><span class="q-caption">{{item[1]}}</span>
                  </div>
                  <!--<div class="col-12  text-faded q-pb-xs">-->
                  <!--R$ 50.000,00 em (USD 12.88593 a taxa de 3,8802) em 01 fev na conta 22610-0-->
                  <!--</div>-->
                </div>

                <div class="col-12 q-pb-xs">
                  Para pagar:
                </div>
                <div class="row col-12" v-for="(titulo, index) in fixacao.titulos.para_pagar">
                  <div class="col-12 q-pb-xs">
                    ({{index}}) Total: {{titulo.total}}
                  </div>
                  <div class="col-12  text-faded" v-for="item in titulo.itens">
                    {{item}}
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div :class="esquerda">
            <div class="row gutter-xs">

              <div class="col-12">
                <div class="row">
                  <div class="col-9 self-center">{{fixacao.quantidade}} {{fixacao.unidade_medida_quantidade.sigla}} em {{moment(fixacao.data_fixacao).format('DD [de] MMMM [de] YYYY')}}</div>
                  <div class="col-3 self-center" align="end">
                    <!--<q-btn icon="more_vert" color="primary" flat dense round></q-btn>-->
                  </div>
                </div>
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
      </template>

      <!--TITULOS-->
      <template v-if="negocio.titulos">
        <div :class="direita">
          <div class="row">

            <div class="col-12 q-pb-xs">FINACEIRO</div>

            <div class="col-12 q-pb-xs">
              Pagos:
            </div>
            <div class="row col-12" v-for="(titulo, index) in negocio.titulos.pagos">
              <div class="col-12 q-pb-xs">
                ({{index}}) Total: {{titulo.total}}
              </div>
              <div class="col-12  text-faded" v-for="item in titulo.itens">
                {{item[0]}} <br/><span class="q-caption">{{item[1]}}</span>
              </div>
              <!--<div class="col-12  text-faded q-pb-xs">-->
                <!--R$ 50.000,00 em (USD 12.88593 a taxa de 3,8802) em 01 fev na conta 22610-0-->
              <!--</div>-->
            </div>

            <div class="col-12 q-pb-xs">
              Para pagar:
            </div>
            <div class="row col-12" v-for="(titulo, index) in negocio.titulos.para_pagar">
              <div class="col-12 q-pb-xs">
                ({{index}}) Total: {{titulo.total}}
              </div>
              <div class="col-12  text-faded" v-for="item in titulo.itens">
                {{item}}
              </div>
            </div>
          </div>
        </div>
      </template>

      <!--NEGOCIO PRODUTOS-->
      <template v-if="negocio.produtos">
        <div :class="direita">
          <div class="row">

            <div class="col-12 q-mb-xs">PRODUTOS</div>

            <div class="col-6 q-mb-xs">
              Produto
            </div>
            <div class="col-6 q-mb-xs text-right">
              Quantidade
            </div>

            <div class="row col-12" v-for="(produto, index) in negocio.produtos">
              <div class="col-6 text-faded ">
                {{produto.nome}}
              </div>
              <div class="col-6 text-faded text-right">
                {{produto.quantidade}} {{produto.quantidade_unidade_medida}}
              </div>
            </div>

          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">
            <div class="col-5 text-right">Preço</div>
            <div class="col-5 text-right">Total</div>
            <div class="col-2">
              <!--<q-btn icon="more_vert" color="primary" flat dense round></q-btn>-->
              <!--<q-btn round flat dense icon="more_vert" @click.stop>-->
                <!--<q-popover>-->
                  <!--<q-list link no-boder>-->
                    <!--<q-item v-close-overlay @click.native="deleteProduto(contrato.id)">-->
                      <!--<q-item-main label="Editar"/>-->
                    <!--</q-item>-->
                  <!--</q-list>-->
                <!--</q-popover>-->
              <!--</q-btn>-->
            </div>
            <div class="row col-12" v-for="(produto, index) in negocio.produtos">
              <div class="col-5 text-faded text-right">{{produto.preco}} {{produto.indexador.sigla}}</div>
              <div class="col-5 text-faded text-right">{{produto.valor_total}} {{produto.indexador.sigla}}</div>
            </div>
            <div class="col-5 text-right"> Total</div>
            <div class="col-5 text-right">{{produtosValorTotal}} {{produtosValorTotalIndexador}}</div>
          </div>

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
  import Negocio from 'assets/js/model/negocio/Negocio';

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
    computed: {
      produtosValorTotal: function(){
        let valorTotal = 0;

        this.negocio.produtos.forEach(function(produto){
          valorTotal += produto.valor_total;
        });

        return valorTotal;
      },
      produtosValorTotalIndexador: function(){
        return this.negocio.produtos[0].indexador.sigla;
      }
    },
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

      delete1: function(id){
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

      delete3: function(id){
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

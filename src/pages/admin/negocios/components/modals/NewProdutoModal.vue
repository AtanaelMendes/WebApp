<template>
  <ap-modal ref="newProdutoModal" title="Novo Produto" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovoProduto" @slide-trigger="setStepperIndex">

      <!--PASSO 1 ESCOLHER PRODUTO-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Escolher o produto</span>
        </div>

        <div>
          <div class="row justify-center q-mb-md">
            <q-search inverted-light color="grey-2" v-model="searchProdutosQuery" placeholder="Digite o nome de um produto"/>
          </div>

          <div class="relative-position">
            <q-scroll-area style="width: auto; height: 350px;">
              <q-list no-border link separator>
                <q-item v-for="prod in produtos" :key="prod.id" @click.native="selectProduto(prod)">
                  <q-item-main>
                    {{prod.nome}}
                  </q-item-main>
                  <q-item-side right>
                    <q-btn icon="done" size="8px" round dense color="positive" v-if="isProdutoSelected(prod)"/>
                  </q-item-side>
                </q-item>
              </q-list>

              <div v-if="!produtos" class="list-empty">
                <q-icon name="warning" />
                <span>Busque pelo produto no campo acima.</span>
              </div>
              <div v-if="produtos && produtos.length === 0" class="list-empty">
                <q-icon name="warning" />
                <span>Nenhuma produto encontrado.</span>
              </div>
            </q-scroll-area>

            <q-inner-loading :visible="isSearching">
              <q-spinner size="60px"></q-spinner>
            </q-inner-loading>
          </div>
        </div>
      </q-carousel-slide>

      <!--PASSO 2 ESCOLHER INDEXADOR -->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Em qual indexador foi negociado?</span>
        </div>

        <div class="q-px-lg q-py-sm" style="text-align: center">
          <q-card style="width: 110px" class="indexador-card cursor-pointer" flat inline
                  @click.native="selectIndexador(indexador)" v-for="indexador in indexadores" :key="indexador.id">
            <q-card-main>
              <div class="indexador-icon" v-bind:class="{'indexador-icon-selected':isIndexadorSelected(indexador)}">{{indexador.sigla}}</div>
              <div class="indexador-nome">{{indexador.nome}}</div>
            </q-card-main>
          </q-card>
        </div>
      </q-carousel-slide>

      <!--PASSO 3 INFORMAR DETALHES -->
      <q-carousel-slide class="q-pa-none">
        <template v-if="produto.produto && produto.indexador">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Informações</span>
          </div>
          <div class="q-px-lg q-py-sm">
            <div class="row justify-center">
              <div class="col-xs-12 col-sm-6">
                <q-field :error="produto.quantidade.errorMessage !== null" :error-label="produto.quantidade.errorMessage" class="q-mb-md">
                  <q-input type="number" align="right" @input="produto.quantidade.errorMessage = null"
                           v-model="quantidade" stack-label="Quantidade"
                           :suffix="produto.produto.unidade_medida.sigla"/>
                </q-field>

                <q-field :error="produto.preco.errorMessage !== null" :error-label="produto.preco.errorMessage" class="q-mb-md">
                  <q-input type="number" align="right" @input="produto.preco.errorMessage = null"
                           v-model="valorUnitario" :stack-label="'Preço por ' + produto.produto.unidade_medida.plural"
                           :prefix="produto.indexador.sigla"/>
                </q-field>

                <q-field :error="produto.valorTotal.errorMessage !== null" :error-label="produto.valorTotal.errorMessage" class="q-mb-md">
                  <q-input type="number" align="right" @input="produto.valorTotal.errorMessage = null"
                           v-model="valorTotal" stack-label="Valor Total"
                           :prefix="produto.indexador.sigla"/>
                </q-field>
              </div>
            </div>
          </div>
        </template>

      </q-carousel-slide>

    </q-carousel>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep !== 0"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep !== 2" :disabled="!isNextButtomEnabled()"/>
        <q-btn @click="saveAttachProduto" flat label="Salvar" color="primary" v-if="currentStep === 2"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import Produto from 'assets/js/model/negocio/Produto'
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";
  import ProdutoService from "../../../../../assets/js/service/produto/ProdutoService";
  import IndexadorService from "../../../../../assets/js/service/IndexadorService";
  import apModal from 'components/ApModal'

  export default {
    name: "NewProdutoModal",
    components: {
      apModal,
    },
    watch:{
      searchProdutosQuery(value){
        this.produto.produto = null;
        if(value === ""){
          this.produtos = null;
        }else{
          this.searchProdutos(value);
        }
      },
      quantidade(){
        this.valorTotal = this.valorUnitario * this.quantidade;
      },
      valorUnitario(){
        this.valorTotal = this.valorUnitario * this.quantidade;
      },
      valorTotal(){
        this.valorUnitario = this.valorTotal / this.quantidade;
      }
    },
    data(){
      return {
        indexadorService: new IndexadorService(),
        produtoService: new ProdutoService(),
        negocioService: new NegocioService(),
        isModalOpened: false,
        produto: new Produto(),
        negocio: null,
        currentStep: 0,
        searchProdutosQuery: '',
        produtos: null,
        indexadores: null,

        quantidade: null,
        valorUnitario: null,
        valorTotal: null,
        isSearching: false,
      }
    },
    methods: {
      openModal(negocio){
        this.isModalOpened = true;
        this.produto = new Produto();
        this.negocio = negocio;

        this.listIndexadores();
      },
      closeModal(){
        this.isModalOpened = false;
        this.currentStep = 0;
        this.$emit('modal-closed')
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      goToNextStep(){
        this.$refs.stepperNovoProduto.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovoProduto.previous();
      },
      selectProduto: function(produto){
        this.produto.produto = produto;
        this.goToNextStep()
      },
      isProdutoSelected(produto){
        if(this.produto.produto && this.produto.produto.id === produto.id){
          return true;
        }else{
          return false;
        }
      },
      isNextButtomEnabled(){
        if(this.currentStep === 0 && this.produto.produto !== null){
          return true
        }
        if(this.currentStep === 1 && this.produto.indexador !== null){
          return true
        }
        return false;
      },
      selectIndexador(idexador){
        this.produto.indexador = idexador;
        this.goToNextStep()
      },
      isIndexadorSelected(indexador){
        if(this.produto.indexador && this.produto.indexador.id === indexador.id){
          return true;
        }else{
          return false;
        }
      },
      saveAttachProduto(){
        this.produto.quantidade.value = this.quantidade;
        this.produto.preco.value = this.valorUnitario;
        this.produto.valorTotal.value = this.valorTotal;

        if(!this.produto.isValid()){
          return;
        }

        this.produto.isPagar.value = false;

        this.$refs.newProdutoModal.showOuterProgress();
        this.negocioService.saveAttachProduto(this.negocio.id, this.produto.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Produto vinculado com sucesso'});
          this.$refs.newProdutoModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshNegocio')
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.newProdutoModal.hideOuterProgress();
        });
      },
      searchProdutos(nome){
        this.isSearching = true;
        this.produtoService.searchProdutos(nome).then(produtos => {
          this.produtos = produtos;
          this.isSearching = false;
        })
      },
      listIndexadores(){
        this.$refs.newProdutoModal.showInnerProgress();
        this.indexadorService.listIndexadores().then(indexadores => {
          this.indexadores = indexadores;
          this.$refs.newProdutoModal.hideInnerProgress();
        })
      }
    }
  }
</script>

<style scoped>
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

  .indexador-card{
    text-align: center;
    margin: 8px;
  }
  .indexador-icon{
    background: #f3f1f1;
    display: inline-block;
    width: 60px;
    height: 60px;
    font-weight: 400;
    font-size: 16px;
    line-height: 60px;
    border-radius: 60px;
  }
  .indexador-icon-selected{
    background: #005f5f;
    color: white;
  }
  .indexador-nome{
    margin-top: 12px;
    font-size: 16px;
    color: #454545;
  }
</style>

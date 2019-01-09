<template>
  <q-modal key="produto" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="produto" ref="stepperProduto" contractable color="positive" v-model="currentStep" class="no-shadow" >

      <!--PASSO 1 ESCOLHER PRODUTO-->
      <q-step default title="Produto" name="produto">

        <div class="row text-center justify-center q-title">
          <div class="col-12">
            Escolher o produto
          </div>
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <q-search align="center" v-model="searchProdutosQuery" placeholder="Digite o nome de um produto"/>
          </div>
        </div>

        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">

            <div class="row justify-center">
              <div class="col-xs-12 col-sm-12 col-md-10 col-lg-6">
                <q-list no-border link separator>
                  <q-item v-for="prod in produtos" :key="prod.id" @click.native="selectProduto(prod)">
                    <q-item-side>
                      <q-btn icon="done" size="8px" round dense color="positive" v-if="isProdutoSelected(prod)"/>
                    </q-item-side>
                    <q-item-main>
                      {{prod.nome}}
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 2 ESCOLHER INDEXADOR -->
      <q-step title="Indexador" name="indexador">

        <div class="row text-center justify-center q-title">
          <div class="col-12">
            Em qual indexador foi negociado?
          </div>
        </div>

        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">

            <div class="row justify-center">
              <div class="col-xs-12 col-sm-12 col-md-10 col-lg-6">
                <q-list no-border link separator>
                  <q-item v-for="indexador in indexadores" :key="indexador.id" @click.native="selectIndexador(indexador)">
                    <q-item-side>
                      <q-btn icon="done" size="8px" round dense color="positive" v-if="isIndexadorSelected(indexador)"/>
                    </q-item-side>
                    <q-item-main>
                      ({{indexador.sigla}}) {{indexador.nome}}
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 3 INFORMAR DETALHES -->
      <q-step title="Informações" name="informacoes">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2" v-if="produto.produto && produto.indexador">

            <q-input type="number" align="right" class="q-mb-md"
                               v-model="quantidade" label="Quantidade"
                               :suffix="produto.produto.unidade_medida.sigla"/>
            <q-input type="number" align="right" class="q-mb-md"
                               v-model="valorUnitario" :label="'Preço por ' + produto.produto.unidade_medida.plural"
                               :prefix="produto.indexador.sigla"/>
            <q-input type="number" align="right" class="q-mb-md"
                               v-model="valorTotal" label="Valor Total"
                               :prefix="produto.indexador.sigla"/>

          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextProdutoStep()" v-if="currentStep != 'informacoes' "/>
      <q-btn label="salvar" color="primary" @click="saveAttachProduto" v-if="currentStep == 'informacoes' "/>
    </q-page-sticky>
  </q-modal>
</template>

<script>
  import Produto from 'assets/js/model/negocio/Produto'
  import customInputText from 'components/CustomInputText.vue'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import produtoService from 'assets/js/service/produto/ProdutoService'
  import indexadorService from 'assets/js/service/IndexadorService'

  export default {
    name: "NewProdutoModal",
    components: {
      customInputText,
    },
    watch:{
      searchProdutosQuery: function(value){
        this.searchProdutos(value);
      },
      quantidade:function(){
        this.valorTotal = this.valorUnitario * this.quantidade;
      },
      valorUnitario: function(){
        this.valorTotal = this.valorUnitario * this.quantidade;
      },
      valorTotal: function(){
        this.valorUnitario = this.valorTotal / this.quantidade;
      }
    },
    data(){
      return {
        isModalOpened: false,
        produto: new Produto(),
        negocio: null,
        currentStep: 'produto',
        searchProdutosQuery: '',
        produtos: [],
        indexadores: [],

        quantidade: null,
        valorUnitario: null,
        valorTotal: null,
      }
    },
    methods: {
      openModal: function(negocio){
        this.isModalOpened = true;
        this.produto = new Produto();
        this.negocio = negocio;
        this.searchProdutos("");
        this.listIndexadores();
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.currentStep = 'produto';
        this.$emit('modal-closed')
      },
      goToNextStep(){
        this.$refs.stepperProduto.next();
      },
      selectProduto: function(produto){
        this.produto.produto = produto;
        this.goToNextStep()
      },
      isProdutoSelected: function(produto){
        if(this.produto.produto && this.produto.produto.id === produto.id){
          return true;
        }else{
          return false;
        }
      },
      isNextProdutoStep: function(){
        if(this.produto.produto == null && this.currentStep === 'produto'){
          return true
        }
        return false;
      },
      selectIndexador: function(idexador){
        this.produto.indexador = idexador;
        this.goToNextStep()
      },
      isIndexadorSelected: function(indexador){
        if(this.produto.indexador && this.produto.indexador.id === indexador.id){
          return true;
        }else{
          return false;
        }
      },
      saveAttachProduto: function(){
        this.produto.quantidade.value = this.quantidade;
        this.produto.preco.value = this.valorUnitario;
        this.produto.valorTotal.value = this.valorTotal;

        if(!this.produto.isValid()){
          return;
        }

        this.produto.isPagar.value = false;

        negocioService.saveAttachProduto(this.negocio.id, this.produto.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Produto vinculado com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshNegocio')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      searchProdutos: function(nome){
        this.produto.produto = null;
        produtoService.searchProdutos(nome).then(response => {
          this.produtos = response.data;
        })
      },
      listIndexadores: function(){
        indexadorService.listIndexadores().then(response => {
          this.indexadores = response.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>

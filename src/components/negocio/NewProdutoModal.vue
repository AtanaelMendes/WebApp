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
            <q-input align="center" v-model="searchProdutos" :after="[{icon: 'search'}]"/>
          </div>
        </div>

        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">

            <div class="row justify-center">
              <div class="col-xs-12 col-sm-12 col-md-10 col-lg-6">
                <q-list no-border link separator>
                  <q-item v-for="item in produtos" :key="item.id" @click.native="selectProduto(item)">
                    <q-item-side><q-btn icon="done" size="8px" round dense color="positive" v-if="item.id == produto.produtoId.value"/></q-item-side>
                    <q-item-main>
                      {{item.nome}}
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
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <q-input align="center" v-model="searchProdutos" :after="[{icon: 'search'}]"/>
          </div>
        </div>

        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">

            <div class="row justify-center">
              <div class="col-xs-12 col-sm-12 col-md-10 col-lg-6">
                <q-list no-border link separator>
                  <q-item v-for="item in indexadores" :key="item.id" @click.native="selectIndexador(item)">
                    <q-item-side>
                      <q-btn icon="done" size="8px" round dense color="positive" v-if="item.id == produto.indexadorId.value"/>
                    </q-item-side>
                    <q-item-main>
                      {{item.sigla}} {{item.nome}}
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
          <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

            <custom-input-text type="number" :model="produto.quantidade" label="Toneladas"/>
            <custom-input-text type="number" :model="produto.preco" label="Preço por toneladas" prefix="SC60"/>
            <custom-input-text type="number" :model="produto.valorTotal" label="Valor Total"/>

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

  export default {
    name: "NewProdutoModal",
    components: {
      customInputText,
    },
    data(){
      return {
        isModalOpened: false,
        produto: new Produto(),
        currentStep: 'produto',
        searchProdutos: null,
        produtos: [
          {
            id: 1,
            nome: 'KCL',
            unidade_medida_id: 155
          },
          {
            id: 2,
            nome: 'AZOTO',
            unidade_medida_id: 155
          },
          {
            id: 3,
            nome: 'FÓSFORO',
            unidade_medida_id: 155
          },
          {
            id: 4,
            nome: 'POTÁSSIO',
            unidade_medida_id: 155
          }
        ],
        indexadores: [
          {
            id: 1,
            nome: 'Real',
            sigla: 'R$',
            moeda_id: 1,
            cultura_id: 1,
            unidade_media_id: 155
          },
          {
            id: 2,
            nome: 'Dollar',
            sigla: '$',
            moeda_id: 1,
            cultura_id: 1,
            unidade_media_id: 155
          },
          {
            id: 3,
            nome: 'Soja',
            sigla: 'SC',
            moeda_id: 1,
            cultura_id: 1,
            unidade_media_id: 155
          }
        ],
      }
    },
    methods: {
      openModal: function(){
        this.isModalOpened = true;
        this.produto = new Produto();
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
        if(this.produto.produtoId.value === produto.id){
          this.produto.produtoId.value = null;
        }else{
          this.produto.produtoId.value = produto.id;
          this.goToNextStep()
        }
      },
      isNextProdutoStep: function(){
        if(this.produto.produtoId.value == null && this.currentStep == 'produto'){
          return true
        }
        return false;
      },
      selectIndexador: function(idexador){
        if(this.produto.indexadorId.value == idexador.id){
          this.produto.indexadorId.value = null;
        }else{
          this.produto.indexadorId.value = idexador.id;
          this.goToNextStep()
        }
      },
      saveAttachProduto: function(){
        if(!this.produto.isValid()){
          return;
        }
        // negocioService.saveNegocio(this.negocio.getValues()).then(response => {
        //   if(response.status === 201) {
        //     this.$q.notify({type: 'positive', message: 'Negócio criado com sucesso'});
        //     this.listNegocios();
        //     this.closeModalNegocio();
        //   }
        // }).catch(error => {
        //   this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        // });
      },
    }
  }
</script>

<style scoped>

</style>

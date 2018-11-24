<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Safra">
      <q-btn slot="action_itens" flat dense round icon="done" @click="saveSafra()"/>
    </toolbar>

    <q-stepper ref="stepper" color="deep-orange">
      <q-step default title="Informações Básicas">
        <div class="row q-pa-md">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <form>
              <custom-input-text type="text" label="Início" :model="safra.inicio" maxlength="4" mask="####"/>

              <custom-input-text type="text" label="Fim" :model="safra.fim" maxlength="4" mask="####"/>

              <q-field :error="safra.area.errorMessage != null" class="q-mb-sm">
                <q-select float-label="Área" v-model="safra.area.value" :options="areas" @input="getTalhoesByArea(safra.area.value)"/>
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="safra.area.errorMessage != null" >{{safra.area.errorMessage}}</div>
                </div>
              </q-field>

              <q-field :error="safra.talhao.errorMessage != null" class="q-mb-sm">
                <q-select float-label="Talhão" v-model="safra.talhao.value" :options="talhoes"/>
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="safra.talhao.errorMessage != null" >{{safra.talhao.errorMessage}}</div>
                </div>
              </q-field>

            </form>
            <div class="float-right">
              <q-btn label="Continuar" color="deep-orange"  @click="$refs.stepper.next()" />
            </div>
          </div>
        </div>
      </q-step>

      <q-step title="Culturas">
        <div class="q-pl-md q-pt-md q-pr-md">
        <q-field label="Área ocupada:">
          <q-progress :percentage="50" style="height: 16px" stripe animate color="blue" />
        </q-field>
        <q-btn  color="deep-orange" rounded label="Nova Cultura" @click="openCulturaModal()()" class="q-mt-md" />
        </div>

        <q-list highlight no-border>
          <q-list-header>Culturas</q-list-header>
          <q-item v-for="(cultura, index) in safra.culturas">
            <q-item-main :label="cultura.produto.value.label" />
            <q-item-side right>
              <q-item-tile icon="chat_bubble" color="green" />
            </q-item-side>
          </q-item>

        </q-list>


        <q-modal v-model="openedCulturaModal" >
          <q-toolbar color="dark" inverted class="shadow-1">
            <q-btn flat round dense icon="close" v-on:click="openedCulturaModal = false" />
            <q-toolbar-title>Nova Cultura</q-toolbar-title>
          </q-toolbar>
          <div class="q-pa-md">
            <q-field :error="culturaTemp.produto.errorMessage != null" class="q-mt-sm">
              <q-item class="q-px-none">
                <q-item-main>
                  <q-input v-model="searchProdutosTerms" placeholder="Produto" :after="[{icon:'arrow_drop_down'}]" @blur="checkProdutoInput">
                    <q-autocomplete @search="searchProdutos" @selected="setProduto" :min-characters="0" :debounce="500" value-field="label"/>
                  </q-input>
                </q-item-main>

                <q-item-side>
                  <q-btn color="deep-orange" rounded size="md" icon="add" @click.native="openNovoProdutoDialog()" class="q-px-sm"/>
                </q-item-side>
              </q-item>

              <div class="q-field-bottom row no-wrap" >
                <div class="q-field-error col" v-if="culturaTemp.produto.errorMessage != null" >{{culturaTemp.produto.errorMessage}}</div>
              </div>
            </q-field>


            <q-field  class="q-mt-sm" label="Tamanho">
              <q-item class="q-px-none">
                <q-item-main>
                    <q-slider v-model="culturaTemp.tamanho.value" :min="1" v-if="safra.talhao.value != null" :max="parseInt(safra.talhao.value.tamanho)"
                              label :label-value="`${culturaTemp.tamanho.value} ha`" />
                </q-item-main>

                <q-item-side>
                  <q-input v-model="culturaTemp.tamanho.value" suffix="ha" v-if="culturaTemp.tamanho.value != null" style="width: 50px" class="q-pt-sm" />
                </q-item-side>
              </q-item>
            </q-field>

            <q-field :error="culturaTemp.estimativa.errorMessage != null || culturaTemp.estimativaUnidadeMedida.errorMessage != null" class="q-mb-sm">
              <q-item class="q-px-none">
                <q-item-main>
                  <q-input v-model="culturaTemp.estimativa.value" placeholder="Estimativa" />
                </q-item-main>
                <q-item-side >
                  <q-select float-label="Unidade de Medida" v-model="culturaTemp.estimativaUnidadeMedida.value" :options="talhoes" style="width: 150px" class="q-pt-sm"/>
                </q-item-side>

                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="culturaTemp.estimativa.errorMessage != null" >{{culturaTemp.estimativa.errorMessage}}</div>
                  <div class="q-field-error col" v-if="culturaTemp.estimativaUnidadeMedida.errorMessage != null" >{{culturaTemp.estimativaUnidadeMedida.errorMessage}}</div>
                </div>
              </q-item>
            </q-field>


            <q-btn
              color="deep-orange" class="full-width q-mt-md"
              @click="saveCultura(culturaTemp)"
              label="salvar"
            />
          </div>
        </q-modal>
      </q-step>

      <q-stepper-navigation v-if="false">
        <q-btn
          flat
          @click="$refs.stepper.previous()"
          label="Back"
        />
        <q-btn
          @click="$refs.stepper.next()"
          label="Next"
        />
      </q-stepper-navigation>
    </q-stepper>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Safra from 'assets/js/model/Safra'
  import Cultura from 'assets/js/model/Cultura'
  import areaService from 'assets/js/service/area/AreaService'
  import talhaoService from 'assets/js/service/TalhaoService'
  import produtoService from 'assets/js/service/ProdutoService'
  import { filter } from 'quasar'

  export default {
    name: "SafraAdd",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data(){
      return {
        safra: new Safra(),
        areas: [],
        talhoes: [],
        culturaTemp: new Cultura(),
        tempProdutoList: [],
        searchProdutosTerms: "",
        openedCulturaModal: false
      }
    },
    computed:{
      tamanhoPercentual: function(){
        return (this.culturaTemp.tamanho.value / this.safra.talhao.value.tamanho * 100) | 0;
      }
    },
    methods:{
      saveSafra: function(){
        if(!this.safra.isValid()){
          return;
        }
        /*PessoaService.savePessoa(this.pessoa.getValues()).then(response => {
          console.log(response.status)
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Pessoa criada com sucesso'});
            this.$router.push({name: 'pessoas'});
            this.$root.$emit('refreshPessoaList')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative'', message: 'http:' + error.status + error.request.response})
        });*/

      },
      getAreas: function(){
        areaService.listAreas().then(response => {
          this.areas = response.data.map(area => {
            return {
              label: area.nome,
              value: area.id
            }
          })
        })
      },
      getTalhoesByArea: function(area_id){
        talhaoService.listTalhoes(area_id).then(response => {
          this.talhoes = response.data.map(talhao => {
            return {
              label: talhao.nome,
              value: talhao
            }
          })
        })
      },
      searchProdutos (terms, done) {
        produtoService.searchProdutos(terms).then(response => {
          this.tempProdutoList = response;
          done(response)
        });
      },
      setProduto (item) {
        this.culturaTemp.produto.value = item;
        this.culturaTemp.produto.errorMessage = null;
      },
      checkProdutoInput(){
        //let result = filter(this.searchProdutosTerms, {field: 'label', list: this.tempProdutoList});
        let result = this.tempProdutoList.filter(item => ('' + item['label']).toLowerCase() === this.searchProdutosTerms.toLowerCase());

        if(result.length === 0){
          this.searchProdutosTerms = "";
          this.culturaTemp.produto.value = null;
        }else{
          this.setProduto(result[0]);
        }
      },
      openNovoProdutoDialog(){

      },
      openCulturaModal(){
        this.culturaTemp = new Cultura();
        this.openedCulturaModal = true;
      },
      closeCulturaModal(){
        this.openedCulturaModal = false;
      },
      saveCultura(culturaTemp){
        this.safra.culturas.push(culturaTemp);
        this.closeCulturaModal();
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted () {
      this.getAreas();
    },
  }
</script>

<style >
  .q-stepper{
    box-shadow: unset !important;
  }
  .q-stepper-step-inner{
    padding: 0 !important;
  }
</style>

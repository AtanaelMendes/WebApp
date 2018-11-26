<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Safra">
      <q-btn slot="action_itens" flat dense round icon="done" @click="saveSafra()" v-if="currentStep === 'culturas'"/>
    </toolbar>

    <q-stepper ref="stepper" color="positive" v-model="currentStep">
      <q-step default title="Informações Básicas" name="info">
        <div class="row q-pa-md">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <form>
              <custom-input-text type="text" label="Início" :model="safra.inicio" maxlength="4" mask="####"/>

              <custom-input-text type="text" label="Fim" :model="safra.fim" maxlength="4" mask="####"/>

              <q-field :error="safra.area.errorMessage != null" class="q-mb-sm">
                <q-select float-label="Área" v-model="safra.area.value" :options="areas" @input="onAreasSelectInput(safra.area.value)"/>
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="safra.area.errorMessage != null" >{{safra.area.errorMessage}}</div>
                </div>
              </q-field>

              <q-field :error="safra.talhao.errorMessage != null" class="q-mb-sm">
                <q-select float-label="Talhão" v-model="safra.talhao.value" :options="talhoes" :disable="safra.area.value === null" @input="onTalhaoSelectInput"/>
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="safra.talhao.errorMessage != null" >{{safra.talhao.errorMessage}}</div>
                </div>
              </q-field>

            </form>
            <div class="float-right">
              <q-btn label="Continuar" color="deep-orange"  @click="goToNextStep" />
            </div>
          </div>
        </div>
      </q-step>

      <q-step title="Culturas" name="culturas">
        <q-list no-border>
          <q-list-header>

            <div class="row">
              <div class="col-6">Área ocupada:</div>
              <div class="col-6 text-right">{{tamanhoRestante}}</div>
            </div>
          </q-list-header>
          <q-item dense>
            <q-progress :percentage="50" style="height: 16px" stripe animate color="blue" />
          </q-item>
          <q-list-header>Culturas</q-list-header>

          <q-item v-for="(cultura, index) in safra.culturas" :key="cultura.produto.value.label" @click.native="openEditCulturaModal(cultura, index)">
            <q-item-main>
              <q-item-tile label>{{cultura.produto.value.label}}</q-item-tile>
              <q-item-tile sublabel>Estimativa: {{cultura.estimativa.value + " " + cultura.estimativaUnidadeMedida.value.nome}}</q-item-tile>
            </q-item-main>
            <q-item-side>
              <q-btn rounded dense flat color="red" icon="close" @click.stop="removeCultura(index)" />
            </q-item-side>
          </q-item>

          <div v-if="safra.culturas.length === 0" class="list-empty">
            <q-icon name="warning" />
            <span>Nenhuma cultuta adicionada</span>
          </div>

          <q-item dense>
            <div class="custom-footer">
              <q-btn color="deep-orange" rounded label="Nova Cultura" @click="openAddCulturaModal()" class="q-mt-md" />
            </div>
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


            <q-field  class="q-mt-sm" label="Tamanho" label-width="12">
              <q-item class="q-px-none">
                <q-item-main>
                    <q-slider v-model="culturaTemp.tamanho.value" :min="1" v-if="safra.talhao.value != null" :max="parseInt(safra.talhao.value.tamanho)"
                              label :label-value="`${culturaTemp.tamanho.value} ha`" />
                </q-item-main>

                <q-item-side>
                  <q-input v-model="culturaTemp.tamanho.value" suffix="ha" v-if="culturaTemp.tamanho.value != null" style="width: 50px; padding-bottom: 0 !important" />
                </q-item-side>
              </q-item>
            </q-field>

            <q-field :error="culturaTemp.estimativa.errorMessage != null || culturaTemp.estimativaUnidadeMedida.errorMessage != null" class="q-mb-sm">
              <q-item class="q-px-none">
                <q-item-main>
                  <q-input v-model="culturaTemp.estimativa.value" placeholder="Estimativa" />
                </q-item-main>
                <q-item-side >
                  <q-select float-label="Unidade de Medida" v-model="culturaTemp.estimativaUnidadeMedida.value" :options="unidadesMedida" style="width: 150px" class="q-pt-sm"/>
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
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import safraService from 'assets/js/service/SafraService'
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
        currentStep: 'info',
        safra: new Safra(),
        areas: [],
        talhoes: [],
        culturaTemp: new Cultura(),
        tempProdutoList: [],
        searchProdutosTerms: "",
        openedCulturaModal: false,
        unidadesMedida: [],
      }
    },
    computed:{
      /*tamanhoPercentual: function(){
        return (this.culturaTemp.tamanho.value / this.safra.talhao.value.tamanho * 100) | 0;
      }*/
      tamanhoRestante: function(){
        //return this.safra.talhao.value.;
        return '12%'
      }
    },
    methods:{
      getCulturasTamanhoTotal: function(){
        let tamanho = 0;
        for(cultura of this.safra.culturas){
          tamanho += cultura.tamanho.value;
        }
        return tamanho;
      },
      saveSafra: function(){
        if(!this.safra.isValid()){
          return;
        }
        if(this.safra.culturas.length === 0){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Adicione ao menos uma cultura para poder continuar.',
            color: 'primary'
          });
          return;
        }
        safraService.saveSafra(this.safra.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Safra criada com sucesso'});
            this.$router.push({name: 'safras'});
            this.$root.$emit('refreshSafraList')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
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
      onAreasSelectInput: function(value){
        this.safra.area.errorMessage = null;
        this.getTalhoesByArea(value)
      },
      onTalhaoSelectInput: function(){
        this.safra.talhao.errorMessage = null;
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
      getUnidadesMedida:function(){
        unidadeMedidaService.listUnidadesMedida().then(response => {
          this.unidadesMedida = response.data.map(unidade => {
            return {
              label: unidade.nome,
              value: unidade
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
      openAddCulturaModal(){
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
      goToNextStep(){
        if(!this.safra.isValid()){
          return;
        }
        this.$refs.stepper.next()
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted () {
      this.getAreas();
      this.getUnidadesMedida();
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

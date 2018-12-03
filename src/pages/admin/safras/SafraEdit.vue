<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Editar Safra">
      <q-btn slot="action_itens" flat dense round icon="done" @click="updateSafra()" v-if="currentStep === 'culturas'"/>
    </toolbar>

    <q-stepper ref="stepper" color="positive" v-model="currentStep">
      <q-step default title="Informações Básicas" name="info">
        <div class="row q-pa-md" v-if="safra">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <form>
              <div class="row gutter-lg">
                <div class="col-6">
                  <q-field :error="safra.inicio.errorMessage != null" class="q-mb-sm">
                    <q-select float-label="Inicio" v-model="safra.inicio.value" :options="yearsList" filter @input="setAnoInicio"/>
                    <div class="q-field-bottom row no-wrap" style="height: 22px">
                      <div class="q-field-error col" v-if="safra.inicio.errorMessage != null" >{{safra.inicio.errorMessage}}</div>
                    </div>
                  </q-field>
                </div>

                <div class="col-6">
                  <q-item >
                    <q-item-main>
                      <q-item-tile label style="font-size: 0.75rem; color:#979797">Fim</q-item-tile>
                      <q-item-tile sublabel>
                        <q-btn-toggle v-model="selectedAnoFim" toggle-color="primary" class="custom-toggle" @input="setAnoFim" dense
                                      :options="[
                                        {label: safra.inicio.value.toString(), value: safra.inicio.value},
                                        {label: parseInt(safra.inicio.value) + 1, value: (parseInt(safra.inicio.value) + 1).toString()}
                                      ]"
                        />
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                </div>
              </div>

              <q-field :error="safra.area.errorMessage != null" class="q-mb-sm">
                <q-select float-label="Área" v-model="safra.area.value" :options="areas" @input="onAreasSelectInput(safra.area.value)"/>
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="safra.area.errorMessage != null" >{{safra.area.errorMessage}}</div>
                </div>
              </q-field>

              <q-field :error="safra.talhao.errorMessage != null" class="q-mb-sm">
                <q-select float-label="Talhão" v-model="safra.talhao.value" :options="parseTalhoes(talhoes)"  @input="onTalhaoSelectInput"/>
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
        <q-list no-border v-if="safra">
          <q-list-header>

            <div class="row">
              <div class="col-6">Área ocupada:</div>
              <div class="col-6 text-right">{{Number(porcentagemAreaOcupada).toLocaleString(undefined, {maximumFractionDigits:1})}}%</div>
            </div>
          </q-list-header>
          <q-item dense>
            <q-progress :percentage="porcentagemAreaOcupada" style="height: 10px; border-radius: 5px;" color="deep-orange" stripe animate />
          </q-item>
          <q-list-header>Culturas</q-list-header>

          <q-item v-for="(cultura, index) in safra.culturas" :key="cultura.id" @click.native="openEditCulturaModal(cultura, index)">
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
            <span>Nenhuma cultura adicionada</span>
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

            <q-field :error="culturaTemp.estimativa.errorMessage != null || culturaTemp.estimativaUnidadeMedida.errorMessage != null" class="q-mb-sm">
              <q-item class="q-px-none">
                <q-item-main>
                  <q-input v-model="culturaTemp.estimativa.value" placeholder="Estimativa" v-on:input="culturaTemp.estimativa.errorMessage = null" />
                </q-item-main>
                <q-item-side >
                  <q-select float-label="Und. de Medida" v-model="culturaTemp.estimativaUnidadeMedida.value"
                            :options="unidadesMedida" style="width: 150px" class="unidade-medida-select" @input="culturaTemp.estimativaUnidadeMedida.errorMessage = null"/>
                </q-item-side>
              </q-item>
              <div class="q-field-bottom">
                <div class="q-field-error" v-if="culturaTemp.estimativa.errorMessage != null" >{{culturaTemp.estimativa.errorMessage}}</div>
                <div class="q-field-error" v-if="culturaTemp.estimativaUnidadeMedida.errorMessage != null" >{{culturaTemp.estimativaUnidadeMedida.errorMessage}}</div>
              </div>
            </q-field>

            <q-field>
              <q-item class="q-px-none">
                <q-item-main>
                  <q-item-tile label>Plantar em toda área</q-item-tile>
                </q-item-main>
                <q-item-side right>
                  <q-toggle v-model="culturaTempAreaTotal" />
                </q-item-side>
              </q-item>
            </q-field>


            <q-field  class="q-mt-sm" label="Tamanho" label-width="12" v-if="!culturaTempAreaTotal">
              <q-item class="q-px-none">
                <q-item-main>
                  <q-slider v-model="culturaTemp.tamanho.value"
                            :min="1" v-if="safra.talhao.value != null"
                            :max="areaLivre"
                            label :label-value="`${culturaTemp.tamanho.value} ha`" />
                </q-item-main>

                <q-item-side>
                  <q-input v-model="culturaTemp.tamanho.value" suffix="ha" v-if="culturaTemp.tamanho.value != null" style="width: 50px; padding-bottom: 0 !important" />
                </q-item-side>
              </q-item>
            </q-field>

            <q-btn color="deep-orange" class="full-width q-mt-md" v-if="!culturaEditMode" @click="addCultura(culturaTemp)" label="salvar"/>
            <q-btn color="deep-orange" class="full-width q-mt-md" v-if="culturaEditMode" @click="editCultura(culturaTemp, culturaTempEditIndex)" label="Atualizar"/>
          </div>
        </q-modal>
      </q-step>
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
  import talhaoService from 'assets/js/service/area/TalhaoService'
  import produtoService from 'assets/js/service/ProdutoService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import safraService from 'assets/js/service/SafraService'

  export default {
    name: "SafraEdit",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data(){
      return {
        currentStep: 'info',
        safra: null,
        areas: [],
        talhoes: [],
        culturaTemp: new Cultura(),
        culturaTempAreaTotal: true,
        culturaEditMode: false,
        culturaTempEditIndex: null,
        tempProdutoList: [],
        searchProdutosTerms: "",
        openedCulturaModal: false,
        unidadesMedida: [],
        selectedTalhao: null,
        selectedAnoFim: null,
        yearsList: []
      }
    },
    computed:{
      porcentagemAreaOcupada: function(){
        if(!this.selectedTalhao){
          return;
        }

        let areaTotal = parseInt(this.selectedTalhao.tamanho);
        return this.getCulturasTamanhoTotal() / areaTotal * 100;
      },
      areaLivre: function(){
        let areaTotal = parseInt(this.selectedTalhao.tamanho);
        let culturasTotal = this.getCulturasTamanhoTotal();
        if(this.culturaEditMode){
          culturasTotal = culturasTotal - this.culturaTemp.tamanho.value;
        }
        return areaTotal - culturasTotal;
      }
    },
    methods:{
      getCurrentYear: function(){
        return new Date().getFullYear().toString();
      },
      makeYearsList: function(referenceYear){
        this.yearsList = [];
        var listSize = 8;
        var startYear = referenceYear - (listSize / 2);
        for(var i = startYear; i < (startYear + listSize); i++){
          this.yearsList.push({'label': i.toString(), 'value': i.toString()});
        }
      },
      getSafraById: function(id){
        safraService.getSafra(id).then(response => {
          this.safra = new Safra(response.data);
          this.getTalhoesByArea(this.safra.area.value)
        })

        return new Promise((resolve, reject) => {
          safraService.getSafra(id).then(response => {
            this.safra = new Safra(response.data);
            this.getTalhoesByArea(this.safra.area.value)
            resolve();
          }).catch(error => {
            reject();
          })
        });
      },
      getCulturasTamanhoTotal: function(){
        let tamanho = 0;
        for(var cultura of this.safra.culturas){
          tamanho += cultura.tamanho.value;
        }
        return tamanho;
      },
      updateSafra: function(){
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
        safraService.updateSafra(this.$route.params.id, this.safra.getValues()).then(response => {
          if(response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Safra atualizada com sucesso'});
            this.$router.push({name: 'safras'});
            this.$root.$emit('refreshSafraList')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });

      },
      setAnoInicio: function(value){
        this.safra.fim.value = value.toString();
        this.selectedAnoFim = value.toString();
      },
      setAnoFim: function(value){
        this.safra.fim.value = value.toString();
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
      parseTalhoes:function(talhoes){
        return talhoes.map(talhao => {
          return {
            label: talhao.nome,
            value: talhao.id,
          }
        })
      },
      onAreasSelectInput: function(value){
        this.safra.area.errorMessage = null;
        this.getTalhoesByArea(value)
      },
      onTalhaoSelectInput: function(value){
        this.selectedTalhao = this.talhoes.filter(item => item['id'] === value)[0];
        this.safra.talhao.errorMessage = null;
      },
      getTalhoesByArea: function(area_id){
        talhaoService.listTalhoes(area_id).then(response => {
          this.talhoes = response.data;
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
      openAddCulturaModal(){
        if(this.areaLivre === 0){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Não há mais espaço para o plantio de outra cultura.',
            color: 'primary'
          });
          return;
        }

        this.culturaEditMode = false;
        this.culturaTemp = new Cultura();
        this.culturaTemp.tamanho.value = this.areaLivre;
        this.openedCulturaModal = true;
      },
      openEditCulturaModal(cultura, index){
        this.culturaEditMode = true;
        this.culturaTempEditIndex = index;
        this.culturaTemp = cultura;
        this.openedCulturaModal = true;
        this.culturaTempAreaTotal = false;
      },
      closeCulturaModal(){
        this.tempProdutoList= [];
        this.searchProdutosTerms= "";
        this.openedCulturaModal = false;
        this.culturaTempAreaTotal = true;
      },
      addCultura(culturaTemp){
        if(culturaTemp.isValid()){
          this.safra.addCultura(culturaTemp);
          this.closeCulturaModal();
        }
      },
      editCultura: function(cultura, index){
        if(cultura.isValid()){
          this.safra.editCultura(cultura, index);
          this.closeCulturaModal();
        }
      },
      removeCultura(index){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar essa cultura?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.safra.removeCultura(index);
        });
      },
      goToNextStep(){
        if(!this.safra.isValid()){
          return;
        }
        this.selectedTalhao = this.talhoes.filter(item => item['id'] === this.safra.talhao.value)[0];
        this.$refs.stepper.next()
      },
      backAction: function () {
        this.$router.push({name: 'safras'});
      }
    },
    mounted(){

      //this.safra.inicio.value = this.getCurrentYear();
      //this.safra.fim.value = this.getCurrentYear();

      this.getAreas();
      this.getUnidadesMedida();
      this.getSafraById(this.$route.params.id).then(()=>{
        this.makeYearsList(this.safra.inicio.value.toString());
        this.selectedAnoFim = this.safra.fim.value.toString();
      })
    }
  }

</script>

<style>
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

  .unidade-medida-select{
    padding-top: 8px !important;
  }

  .custom-toggle button{
    padding-left: 24px;
    padding-right: 24px;
  }
</style>

<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Editar Área">
      <q-btn slot="action_itens" flat dense label="salvar" @click="updateArea()"/>
    </toolbar>

    <q-scroll-area style="width: 100%; height: 100vh;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

      <div class="q-pa-sm">
        <form>
          <div class="row">

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <custom-input-text type="text" label="Nome" :model="area.nome" maxlength="20" style="flex-grow: 1; margin-right: 20px" />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <q-field :error="area.localizacao.errorMessage != null" >
                <q-input v-model="localizacaoSearchTerms" float-label="Localização" @blur="checkLocalizacaoInput">
                  <q-autocomplete :debounce="500" :min-characters="0" @search="searchLocalizacao" @selected="selectedLocalizacao" value-field="label"/>
                </q-input>
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="area.localizacao.errorMessage != null" >{{area.localizacao.errorMessage}}</div>
                </div>
              </q-field>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <custom-input-text type="number" label="tamanho" :model="area.tamanho" style="flex-grow: 1; margin-right: 20px" />
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <q-field :error="area.unidade_medida.errorMessage != null">
                <q-select
                  @click.native="buscaUnidadeMedida()"
                  filter v-model="area.unidade_medida.value"
                  :options="UnidadeMedidaOptions"
                  float-label="Unidade Medida"
                />
                <div class="q-field-bottom row no-wrap" style="height: 22px">
                  <div class="q-field-error col" v-if="area.unidade_medida.errorMessage != null" >{{area.unidade_medida.errorMessage}}</div>
                </div>
              </q-field>
            </div>
          </div>
        </form>
      </div>

      <div class="q-pa-sm"style="margin-bottom: 100px">

        <div class="row">
          <q-item>
            <q-item-main>Adicionar Talhões</q-item-main>
            <q-item-side>
              <q-btn color="deep-orange" rounded size="md" icon="add" @click.native="openNovoTalhaoDialog()" class="q-px-sm"/>
            </q-item-side>
          </q-item>
        </div>

        <div class="row">
          <div class="col-12">
            <q-list v-if="area.talhoes.length > 0">
              <q-item>
                <q-item-main>
                  <q-chip
                    v-for="(talhao, index) in area.talhoes"
                    :key="index"
                    @hide="deleteTalhao(index, talhao.id.value)"
                    closable flat round
                    color="primary" class="q-ma-xs">
                    {{talhao.nome.value}}
                  </q-chip>
                </q-item-main>
              </q-item>
            </q-list>
          </div>
        </div>

        <q-dialog v-model="newTalhaoDialog" prevent-close>
          <span slot="title">Novo Talhão</span>
          <span slot="message">Informe o nome para criar um talhao</span>

          <div slot="body">
            <form @keyup.enter="newTalhao(novoTalhao)">
              <custom-input-text label="Nome talhão" :model="novoTalhao.nome" style="flex-grow: 1; margin-right: 20px" />
            </form>
          </div>

          <template slot="buttons" slot-scope="props">
            <q-btn flat @click="closeNovoTalhaoDialog"  label="Cancelar"/>
            <q-btn flat @click="newTalhao(novoTalhao)"  label="Adicionar"/>
          </template>
        </q-dialog>

      </div>

    </q-scroll-area>



  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Area from 'assets/js/model/Area'
  import Talhao from 'assets/js/model/Talhao'
  import AreaService from 'assets/js/service/AreaService'
  import UnidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import { filter } from 'quasar'
  export default {
    name: "AreaAdd",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data(){
      return {
        localizacaoSearchTerms: '',
        tempLocalizacaoList: [],
        newTalhaoDialog: false,
        novoTalhao: new Talhao(),
        area: new Area(),
        areaData: null,
        UnidadeMedidaOptions: [],
      }
    },
    methods:{
      fillForm: function(areaData){
        let vm = this
        this.area.nome.value = areaData.nome
        this.area.tamanho.value = areaData.tamanho
        areaData.talhoes.forEach(function (talhao) {
          vm.area.talhoes.push({nome: {value: talhao.nome}, id: {value: talhao.id}})
        })
        this.UnidadeMedidaOptions = areaData.unidadeMedida.map(unit => {
          vm.area.unidade_medida.value = unit.id
          return {
            value: unit.id,
            label: unit.simbolo,
            sublabel: unit.descricao
          }
        })
        this.area.localizacao.value = areaData.localizacao[0].id;
        this.localizacaoSearchTerms = areaData.localizacao[0].endereco + ', ' + areaData.localizacao[0].numero
        AreaService.parseLocalizacao(areaData.localizacao)
      },
      deleteTalhao: function(index, talhaoId) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esse talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.area.removeTalhao(index)
          AreaService.deleteTalhao(talhaoId, this.areaData.id).then(response => {
            this.$q.notify({type: 'positive', message: 'Talhão excluido sucesso'});
          }).catch(error => {
            if (error.response.status === 422){
              this.$q.dialog({title:'Ops', message: 'Não foi possível excluir o talhão'})
            }
          })
        });
      },
      newTalhao: function(talhao) {
        if(talhao.isValid()){
          this.area.addTalhao(talhao).then(value =>{
            this.closeNovoTalhaoDialog()
          }).catch(value =>{
            this.$q.dialog({title:'Ops', message: 'Este nome já foi adicionado'})
          })
        }
      },
      openNovoTalhaoDialog: function(){
        this.novoTalhao = new Talhao()
        this.newTalhaoDialog = true;
      },
      closeNovoTalhaoDialog: function(){
        this.newTalhaoDialog = false;
      },
      searchLocalizacao (terms, done) {
        AreaService.searchLocalizacao(terms).then(response => {
          this.tempLocalizacaoList = response;
          done(response)
        });
      },
      selectedLocalizacao (item) {
        this.area.localizacao.value = item.id;
        this.area.localizacao.errorMessage = null;
      },
      buscaUnidadeMedida: function(){
        UnidadeMedidaService.options().then(response => {
          this.UnidadeMedidaOptions = response.map(unit => {
            return {
              value: unit.id,
              label: unit.simbolo,
              sublabel: unit.descricao
            }
          })
        })
      },
      updateArea: function(){
        if(!this.area.isValid()){
          return;
        }
        AreaService.updateArea(this.area.getValues()).then(response => {
          if(response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Area Atualizada com sucesso'});
            this.$router.push({name: 'areas'});
            this.$root.$emit('refreshAreaList')
          }
        });
      },
      checkLocalizacaoInput(){
        let result = filter(this.localizacaoSearchTerms, {field: 'label', list: this.tempLocalizacaoList});
        if(result.length === 0){
          this.localizacaoSearchTerms = "";
          this.area.localizacao.value = null;
        }else{
          this.selectedLocalizacao(result[0]);
        }
      },
      backAction: function () {
        this.$router.go(-1);
      },
      getArea: function(){
        AreaService.getAreaByID(this.$route.params.id).then(area => {
          this.areaData = area.data;
          this.fillForm(this.areaData)
        })
      },
    },
    mounted(){
      this.getArea();
    }
  }
</script>
<style>
</style>

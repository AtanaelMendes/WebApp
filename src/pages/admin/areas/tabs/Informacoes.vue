<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Área">
      <q-btn slot="action_itens" flat dense label="salvar" @click="saveArea()"/>
    </toolbar>

    <form class="q-pa-md">

      <div class="row">
        <div class="col-sm-12 col-lg-6">
          <custom-input-text type="text" label="Nome" :model="area.nome" maxlength="20"/>

          <q-field :error="area.localizacao.errorMessage != null" class="q-mb-sm q-mt-md">
            <q-input v-model="localizacaoSearchTerms" placeholder="Localização">
              <q-autocomplete @search="searchLocalizacao" @selected="selectedLocalizacao" :min-characters="3" value-field="label"/>
            </q-input>
            <div class="q-field-bottom row no-wrap" style="height: 22px">
              <div class="q-field-error col" v-if="area.localizacao.errorMessage != null" >{{area.localizacao.errorMessage}}</div>
            </div>
          </q-field>

          <custom-input-text type="number" label="tamanho" :model="area.tamanho"/>

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

    <form class="q-pa-md">
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
                  @hide="removeTalhao(index)"
                  closable flat round
                  color="primary" class="q-ma-xs"
                >
                  {{talhao.nome.value}}
                </q-chip>
              </q-item-main>
            </q-item>
          </q-list>
        </div>
      </div>
    </form>

    <q-dialog v-model="newTalhaoDialog" prevent-close>
      <span slot="title">Novo Talhão</span>
      <span slot="message">Informe o nome para criar um talhao</span>

      <div slot="body">
        <form @keyup.enter="addTalhao(novoTalhao)">
          <custom-input-text label="Nome talhão" :model="novoTalhao.nome" style="flex-grow: 1; margin-right: 20px" />
          <!--<q-field :error="arrayTalhaoes.nome.errorMessage != null">-->
          <!--<q-input float-label="Nome do talhão" v-model="novoTalhao.nome"/>-->
          <!--<div class="q-field-bottom row no-wrap" style="height: 22px">-->
          <!--<div class="q-field-error col" v-if="arrayTalhaoes.nome.errorMessage != null" >{{arrayTalhaoes.nome.errorMessage}}</div>-->
          <!--</div>-->
          <!--</q-field>-->
        </form>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat @click="closeNovoTalhaoDialog"  label="Cancelar"/>
        <q-btn flat @click="addTalhao(novoTalhao)"  label="Adicionar"/>
      </template>
    </q-dialog>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import area from 'assets/js/model/area/Area'
  import talhao from 'assets/js/model/area/Talhao'
  import areaService from 'assets/js/service/area/AreaService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  export default {
    name: "area-add",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data(){
      return {
        localizacaoSearchTerms: '',
        newTalhaoDialog: false,
        novoTalhao: new talhao(),
        area: new area(),
        UnidadeMedidaOptions: [],
      }
    },
    methods:{
      createTalhao: function(){
        if(!this.grupoEconomico.isValid(this)){
          return;
        }
        areaService.createTalhao(this.area.getValues()).then(response => {
          this.$q.notify({type: 'positive', message: 'Talhão criado com sucesso'});
          this.closeNovoTalhaoDialog();
        }).catch(error => {
          if (error.response.status === 422){
            this.$q.dialog({title:'Ops', message: 'Já existe um registro com esse nome'})
          }
        })
      },
      removeTalhao: function(index) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esse talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.area.removeTalhao(index)
        });
      },
      addTalhao: function(talhao) {
        if(talhao.isValid()){
          this.area.addTalhao(talhao).then(value =>{
            this.closeNovoTalhaoDialog()
          }).catch(value =>{
            this.$q.dialog({title:'Ops', message: 'Este nome já foi adicionado'})
          })
        }
      },
      openNovoTalhaoDialog: function(){
        this.novoTalhao = new talhao()
        this.newTalhaoDialog = true;
      },
      closeNovoTalhaoDialog: function(){
        this.newTalhaoDialog = false;
      },
      searchLocalizacao (terms, done) {
        areaService.searchLocalizacao(terms).then(response => {
          done(response)
        });
      },
      selectedLocalizacao (item) {
        this.area.localizacao.value = item.id;
        this.area.localizacao.errorMessage = null;
      },
      buscaUnidadeMedida: function(){
        unidadeMedidaService.options().then(response => {
          this.UnidadeMedidaOptions = response.map(unit => {
            return {
              value: unit.id,
              label: unit.simbolo,
              sublabel: unit.descricao
            }
          })
        })
      },
      saveArea: function(){
        if(!this.area.isValid()){
          return;
        }
        areaService.saveArea(this.area.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Area criada com sucesso'});
            this.$router.push({name: 'areas'});
            this.$root.$emit('refreshAreaList')
          }
        });
      },
      backAction: function () {
        this.$router.go(-1);
      }
    }
  }
</script>
<style>
</style>

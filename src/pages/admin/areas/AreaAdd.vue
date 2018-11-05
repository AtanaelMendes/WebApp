<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Área">
      <q-btn slot="action_itens" flat dense label="salvar" @click="saveArea()"/>

      <!--<q-tabs slot="tabs" align="justify"  class="shadow-3" color="brand" text-color="brand" underline-color="deep-orange">
        <q-tab slot="title" label="Informações" />
        <q-tab slot="title" label="Contatos"/>
        <q-tab slot="title" label="Localizações"/>
      </q-tabs>-->

    </toolbar>

    <form class="q-pa-md">

      <div class="row">
        <div class="col-6">
          <custom-input-text type="text" label="Nome" :model="area.nome" maxlength="20" style="flex-grow: 1; margin-right: 20px" />
        </div>
        <div class="col-6">
          <q-field :error="area.localizacao.errorMessage != null" class="q-mb-sm q-mt-md">
            <q-input v-model="localizacaoSearchTerms" placeholder="Localização">
              <q-autocomplete @search="searchLocalizacao" @selected="selectedLocalizacao" :min-characters="3" value-field="label"/>
            </q-input>
            <div class="q-field-bottom row no-wrap" style="height: 22px">
              <div class="q-field-error col" v-if="area.localizacao.errorMessage != null" >{{area.localizacao.errorMessage}}</div>
            </div>
          </q-field>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <custom-input-text type="number" label="tamanho" :model="area.tamanho" style="flex-grow: 1; margin-right: 20px" />
        </div>
        <div class="col-6">
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
                <q-chip v-for="talhao in area.talhoes" @hide="removeTalhao(talhao)" closable flat round color="primary" class="q-ma-xs">
                  {{talhao.nome}}
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
        <form @keyup.enter="addTalhao()">
          <q-field>
            <q-input float-label="Nome do talhão" v-model="novoTalhao"/>
          </q-field>
        </form>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat @click="closeNovoTalhaoDialog"  label="Cancelar"/>
        <q-btn flat @click="addTalhao()"  label="Salvar"/>
      </template>
    </q-dialog>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Area from 'assets/js/model/Area'
  import AreaService from 'assets/js/service/AreaService'
  import UnidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
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
        newTalhaoDialog: false,
        novoTalhao: null,
        area: new Area(),
        UnidadeMedidaOptions: [],
        unidadeMedida: null
      }
    },
    methods:{
      removeTalhao: function(id) {
        var rm = this.area.talhoes.indexOf(id)
        this.area.talhoes.splice(rm, 1)
      },
      addTalhao: function() {
        let vm = this
        this.area.talhoes.push({
          nome: vm.novoTalhao
        })
        var verifyName = 0
        this.area.talhoes.forEach(function (talhao) {
          if(talhao.nome == vm.novoTalhao){
            verifyName++
          }
        })
        if(verifyName > 1){
          this.area.talhoes.pop()
          this.$q.notify({
            type: 'negative',
            message: 'Este nome já foi adicionado'
          })
          return
        }
        vm.novoTalhao = null
        this.closeNovoTalhaoDialog()
      },
      openNovoTalhaoDialog: function(){
        this.newTalhaoDialog = true;
      },
      closeNovoTalhaoDialog: function(){
        this.newTalhaoDialog = false;
        // this.grupoEconomico.nome.value = null;
        // this.grupoEconomico.nome.errorMessage = null;
      },
      createTalhao: function(){
        if(!this.grupoEconomico.isValid(this)){
          return;
        }
        GrupoEconomicoService.saveGrupoEconomico(this.grupoEconomico.getValues()).then(response => {
          this.$q.notify({type: 'positive', message: 'Grupo Econômico criado com sucesso'});
          this.closeNovoTalhaoDialog();
        }).catch(error => {
          if (error.response.status === 422){
            this.$q.dialog({title:'Ops', message: 'Já existe um registro com esse nome'})
          }
        })
      },
      searchLocalizacao (terms, done) {
        AreaService.searchLocalizacao(terms).then(response => {
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
      saveArea: function(){
        if(!this.area.isValid()){
          return;
        }
        AreaService.saveArea(this.area.getValues()).then(response => {
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

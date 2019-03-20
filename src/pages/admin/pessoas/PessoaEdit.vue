<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Editar pessoa">
      <q-btn slot="action_itens" flat dense round icon="done" @click="updatePessoa()"/>
    </toolbar>

    <div class="row q-pa-md space-end">
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <form @keyup.enter="updatePessoa()">

          <!--TOGGLE PESSOA FISICA JURIDICA-->
          <q-field>
            <q-btn-toggle
              inverted
              toggle-color="primary"
              v-model="pessoa.pessoaType"
              :options="[{label: 'Física', value: 1},{label: 'Jurídica', value: 2}]"
            />
          </q-field>

          <!--INPUT GRUPO ECONOMICO-->
          <q-field :error="pessoa.grupoEconomico.errorMessage != null" class="q-mt-sm">
            <q-item class="q-px-none">
              <q-item-main>
                <q-input v-model="grupoEconomicoSearchTerms" placeholder="Grupo Econômico" :after="[{icon:'arrow_drop_down'}]" @blur="checkGrupoEconomicoInput">
                  <q-autocomplete @search="search" @selected="setGrupoEconomico" :min-characters="0" :debounce="500" value-field="label"/>
                </q-input>
              </q-item-main>

              <q-item-side>
                <q-btn color="deep-orange" rounded size="md" icon="add" @click.native="openNovoGrupoEconomicoDialog()" class="q-px-sm"/>
              </q-item-side>
            </q-item>

            <div class="q-field-bottom row no-wrap" >
              <div class="q-field-error col" v-if="pessoa.grupoEconomico.errorMessage != null" >{{pessoa.grupoEconomico.errorMessage}}</div>
            </div>
          </q-field>

          <!--INPUT NOME-->
          <custom-input-text label="Nome" :model="pessoa.nome" maxlength="100"/>

          <!--INPUT RAZAO SOCIAL-->
          <custom-input-text  label="Razão Social" :model="pessoa.razaoSocial" maxlength="100"/>

          <!--INPUT CPF-->
          <custom-input-text key="cpf" label="CPF" :model="pessoa.cpf" mask="###.###.###-##" v-if="pessoa.pessoaType === 1"/>

          <!--INPUT CNPJ-->
          <custom-input-text key="cnpj" label="CNPJ" :model="pessoa.cnpj" mask="##.###.###/####-##" v-if="pessoa.pessoaType === 2"/>

          <!--INPUT INSCRICAO ESTADUAL-->
          <q-item class="q-px-none">
            <q-item-main>
              <custom-input-text type="text" label="Inscrição Estadual" maxlength="14" :model="pessoa.inscricaoEstadual"/>
            </q-item-main>
            <q-item-side>
              <estado-sigla-select label="UF" :model="pessoa.uf"/>
            </q-item-side>
          </q-item>

          <!--INPUT INSCRICAO MUNICIPAL-->
          <custom-input-text type="text" label="Inscrição Municipal" :model="pessoa.inscricaoMunicipal"/>

        </form>
      </div>
    </div>

    <q-dialog v-model="newGrupoEconomicoDialog" prevent-close>
      <span slot="title">Novo Grupo Econômico</span>
      <span slot="message">Crie um novo Grupo Econômico preenchendo o campo abaixo</span>

      <div slot="body">
        <form @keyup.enter.prevent.default="createGrupoEconomico()">
          <custom-input-text type="text" label="Grupo Econômico" :model="grupoEconomico.nome" />
        </form>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat @click="closeNovoGrupoEconomicoDialog"  label="Cancelar"/>
        <q-btn flat @click="createGrupoEconomico()"  label="Salvar"/>
      </template>
    </q-dialog>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import Pessoa from 'assets/js/model/Pessoa'
  import estadoSiglaSelect from 'components/EstadoSiglaSelect.vue'
  import GrupoEconomico from 'assets/js/model/GrupoEconomico'
  import { filter } from 'quasar'
  import GrupoEconomicoService from "../../../assets/js/service/GrupoEconomicoService";
  import PessoaService from "../../../assets/js/service/PessoaService";
  export default {
    name: "pessoa-edit",
    components: {
      toolbar,
      customPage,
      customInputText,
      estadoSiglaSelect,
    },
    data(){
      return {
        pessoaService: new PessoaService(),
        grupoEconomicoService: new GrupoEconomicoService(),
        grupoEconomicoSearchTerms: '',
        tempGrupoEconomicoList: [],
        newGrupoEconomicoDialog: false,
        pessoa: new Pessoa(1),
        pessoaData: null,
        grupoEconomico: GrupoEconomico,
      }
    },
    methods: {
      fillForm: function(data){
        if(data.cpf != null){
          this.pessoa.pessoaType = 1
        }
        if(data.cnpj != null){
          this.pessoa.pessoaType = 2
        }
        this.tempGrupoEconomicoList.id = data.grupo_economico.id;
        this.tempGrupoEconomicoList.label = data.grupo_economico.nome;
        this.grupoEconomicoSearchTerms = data.grupo_economico.nome;

        this.pessoa.grupoEconomico.value = data.grupo_economico.id;
        this.pessoa.nome.value = data.nome;
        this.pessoa.cpf.value = data.cpf;
        this.pessoa.cnpj.value = data.cnpj;
        this.pessoa.razaoSocial.value = data.razao_social;
        this.pessoa.inscricaoEstadual.value = data.inscricao_estadual;
        this.pessoa.uf.value = data.uf;
        this.pessoa.inscricaoMunicipal.value = data.inscricao_municipal;


      },
      getPessoa: function(id){
        this.$q.loading.show();
        this.pessoaService.getPessoa(id).then(pessoa => {
          this.fillForm(pessoa);
          this.$q.loading.hide();
        }).catch(error =>{
          console.log(error.response);
          this.$q.notify({type: 'negative', message: 'Não foi possível carregar as informações'});
          this.$q.loading.hide();
        })
      },
      updatePessoa: function(){
        if(!this.pessoa.isValid()){
          return;
        }
        this.$q.loading.show();
        this.pessoaService.updatePessoa(this.$route.params.id, this.pessoa.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Pessoa atualizada com sucesso'});
          this.$router.push({name: 'pessoas'});
          this.$root.$emit('refreshPessoaList');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.request.response})
          this.$q.loading.hide();
        });
      },
      search (terms, done) {
        this.grupoEconomicoService.searchGrupoEconomico(terms).then(result => {
          this.tempGrupoEconomicoList = result;
          done(result)
        });
      },
      createGrupoEconomico: function(){
        if(!this.grupoEconomico.isValid(this)){
          return;
        }
        this.$q.loading.show();
        this.grupoEconomicoService.saveGrupoEconomico(this.grupoEconomico.getValues()).then(grupoEconomico => {
          this.$q.notify({type: 'positive', message: 'Grupo Econômico criado com sucesso'});
          this.closeNovoGrupoEconomicoDialog();
          this.grupoEconomicoSearchTerms = grupoEconomico.nome;
          this.pessoa.grupoEconomico.value = grupoEconomico.id;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.request.response})
          this.$q.loading.hide();
        })
      },
      openNovoGrupoEconomicoDialog: function(){
        this.newGrupoEconomicoDialog = true;
      },
      closeNovoGrupoEconomicoDialog: function(){
        this.newGrupoEconomicoDialog = false;
        this.grupoEconomico.nome.value = null;
        this.grupoEconomico.nome.errorMessage = null;
      },
      setGrupoEconomico (item) {
        this.pessoa.grupoEconomico.value = item.id;
        this.pessoa.grupoEconomico.errorMessage = null;
      },
      checkGrupoEconomicoInput(){
        let result = filter(this.grupoEconomicoSearchTerms, {field: 'label', list: this.tempGrupoEconomicoList});

        if(result.length === 0){
          this.grupoEconomicoSearchTerms = "";
          this.pessoa.grupoEconomico.value = null;
        }else{
          this.setGrupoEconomico(result[0]);
        }
      },
      backAction: function () {
        this.$router.back();
      }
    },
    mounted(){
      this.getPessoa(this.$route.params.id)
    },

  }
</script>

<style>
</style>

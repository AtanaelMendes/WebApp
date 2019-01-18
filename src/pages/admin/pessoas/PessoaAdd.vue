<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Pessoa">
      <q-btn slot="action_itens" flat dense round icon="done" @click="savePessoa()"/>
    </toolbar>

    <!--INFORMACOES BASICAS-->
    <div class="row q-pa-md space-end">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <form @keyup.enter="savePessoa()">

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
                <q-input
                  placeholder="Grupo Econômico"
                  @blur="checkGrupoEconomicoInput"
                  :after="[{icon:'arrow_drop_down'}]"
                  v-model="grupoEconomicoSearchTerms">
                  <q-autocomplete @search="searchGrupoEconomico" @selected="setGrupoEconomico" :min-characters="0" :debounce="500" value-field="label"/>
                </q-input>
              </q-item-main>

              <q-item-side>
                <q-btn color="deep-orange" round size="md" icon="add" @click.native="openNovoGrupoEconomicoDialog()" class="q-px-sm"/>
              </q-item-side>
            </q-item>

            <div class="q-field-bottom row no-wrap" >
              <div class="q-field-error col" v-if="pessoa.grupoEconomico.errorMessage != null" >{{pessoa.grupoEconomico.errorMessage}}</div>
            </div>
          </q-field>

          <!--INPUT NOME-->
          <custom-input-text type="text" label="Nome" :model="pessoa.nome" maxlength="100"/>

          <!--INPUT RAZAO SOCIAL-->
          <custom-input-text type="text" label="Razão Social" :model="pessoa.razaoSocial" maxlength="100"/>

          <!--INPUT CPF-->
          <custom-input-text key="cpf" type="text" label="CPF" :model="pessoa.cpf" mask="###.###.###-##" v-if="pessoa.pessoaType === 1" @blur="pessoaTypeChanged"/>

          <!--INPUT CNPJ-->
          <custom-input-text key="cnpj" type="text" label="CNPJ" :model="pessoa.cnpj" mask="##.###.###/####-##" v-if="pessoa.pessoaType === 2" @blur="pessoaTypeChanged"/>

          <!--INPUT INSCRICAO ESTADUAL-->
          <q-item class="q-px-none">
            <!--<q-item-side>-->
              <!--<q-btn label="Testar" @click="testaInscricoesEstaduais" />-->
            <!--</q-item-side>-->
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

    <!--DIALOG NEW GRUPO ECONOMICO-->
    <q-dialog v-model="newGrupoEconomicoDialog" prevent-close>
      <span slot="title">Novo Grupo Econômico</span>
      <span slot="message">Crie um novo Grupo Econômico preenchendo o campo abaixo</span>
      <div slot="body">
        <form @keyup.enter="createGrupoEconomico()">
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
  import PessoaService from 'assets/js/service/PessoaService'
  import grupoEconomicoService from 'assets/js/service/GrupoEconomicoService'
  import Pessoa from 'assets/js/model/Pessoa'
  import GrupoEconomico from 'assets/js/model/GrupoEconomico'
  import estadoSiglaSelect from 'components/EstadoSiglaSelect.vue'
  import { filter } from 'quasar'
  import inscricaoEstadualValidator from 'assets/js/InscricaoEstadualValidator';
  export default {
    name: "pessoa-add",
    components: {
      toolbar,
      customPage,
      customInputText,
      estadoSiglaSelect,
    },
    data(){
      return {
        grupoEconomicoSearchTerms: '',
        tempGrupoEconomicoList: [],
        newGrupoEconomicoDialog: false,
        grupoEconomico: GrupoEconomico,
        pessoa: new Pessoa(1),
      }
    },
    methods:{
      testaInscricoesEstaduais: function(){
        console.log("inciado testes...")
        inscricaoEstadualValidator.testaInscricoesEstaduais();
        console.log("finalizado testes.")

      },
      pessoaTypeChanged: function(){
        if(this.pessoa.pessoaType === 1){
          this.pessoa.cnpj.value = null
        }
        if(this.pessoa.pessoaType === 2){
          this.pessoa.cpf.value = null
        }
      },
      savePessoa: function(){
        if(!this.pessoa.isValid()){
          return;
        }
        PessoaService.savePessoa(this.pessoa.getValues()).then(response => {
          console.log(response.status)
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Pessoa criada com sucesso'});
            this.$router.push({name: 'pessoas'});
            this.$root.$emit('refreshPessoaList')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.request.response})
        });

      },
      openNovoGrupoEconomicoDialog: function(){
        this.newGrupoEconomicoDialog = true;
      },
      closeNovoGrupoEconomicoDialog: function(){
        this.newGrupoEconomicoDialog = false;
        this.grupoEconomico.nome.value = null;
        this.grupoEconomico.nome.errorMessage = null;
      },
      createGrupoEconomico: function(){
        if(!this.grupoEconomico.isValid(this)){
          return;
        }
        grupoEconomicoService.saveGrupoEconomico(this.grupoEconomico.getValues()).then(response => {
          this.$q.notify({type: 'positive', message: 'Grupo Econômico criado com sucesso'});
          this.closeNovoGrupoEconomicoDialog();
          this.grupoEconomicoSearchTerms = response.data.nome;
          this.pessoa.grupoEconomico.value = response.data.id;
        }).catch(error => {
          if (error.response.status === 422){
            this.$q.dialog({title:'Ops', message: 'Já existe um registro com esse nome'})
          }
        })
      },
      searchGrupoEconomico (terms, done) {
        grupoEconomicoService.searchGrupoEconomico(terms).then(response => {
          this.tempGrupoEconomicoList = response;
          done(response)
        });
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
        this.$router.back()
      }
    },
    beforeDestroy(){
      this.pessoa = new Pessoa(1)
    }
  }
</script>

<style>
  .no-result{
    text-align: center;
    padding-top: 150px;
  }
  .no-result img{
    width: 120px;
    height: auto;
  }
  .no-result span{
    display: block;
    margin-top: 30px;
    font-size: 25px;
    font-weight: 300;
    color: #ababab;
  }
  .custom-header{
    border-top: 1px solid #c5c5c5;
  }
</style>

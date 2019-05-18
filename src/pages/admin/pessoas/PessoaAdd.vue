<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction" title="Nova Pessoa">
      <q-btn slot="action_itens" flat dense round icon="done" @click="savePessoa()"/>
    </toolbar>

    <!--INFORMACOES BASICAS-->
    <div class="row q-pa-md space-end justify-center">
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4" @keyup.enter="savePessoa()">

        <div class="row gutter-y-md">

          <!--TOGGLE PESSOA FISICA JURIDICA-->
          <div class="col-12">
            <q-btn-toggle inverted
                          toggle-color="primary"
                          v-model="pessoa.pessoaType"
                          :options="[{label: 'Física', value: 1},{label: 'Jurídica', value: 2}]"
            />
          </div>

          <!--INPUT IS CONSUMIDOR-->
          <div class="col-12">
            <q-checkbox v-model="pessoa.isConsumidor.value" label="Consumidor" />
          </div>
        </div>

        <!--INPUT GRUPO ECONOMICO-->
        <q-field :error="pessoa.grupoEconomico.errorMessage != null" class="q-mt-sm">
          <q-item class="q-pa-none">
            <q-item-main>
              <q-input placeholder="Grupo Econômico" @blur="checkGrupoEconomicoInput" :after="[{icon:'arrow_drop_down'}]"
                       v-model="grupoEconomicoSearchTerms">
                <q-autocomplete :max-results="20" @search="searchGrupoEconomico" @selected="setGrupoEconomico"
                                :min-characters="0"
                                :debounce="500"
                                value-field="label"
                />
              </q-input>
            </q-item-main>

            <q-item-side>
              <q-btn color="deep-orange" round size="md" icon="add" @click.native="openNovoGrupoEconomicoDialog()"/>
              <q-tooltip>
                Novo grupo econômico
              </q-tooltip>
            </q-item-side>
          </q-item>

          <div class="q-field-bottom row no-wrap" >
            <div class="q-field-error col" v-if="pessoa.grupoEconomico.errorMessage != null" >{{pessoa.grupoEconomico.errorMessage}}</div>
          </div>
        </q-field>

        <!--INPUT NOME-->
        <custom-input-text label="Nome" :model="pessoa.nome" maxlength="100"/>

        <!--INPUT RAZAO SOCIAL-->
        <custom-input-text label="Razão Social" :model="pessoa.razaoSocial" maxlength="100"/>

        <!--INPUT CPF-->
        <custom-input-text key="cpf"label="CPF" :model="pessoa.cpf" mask="###.###.###-##" v-if="pessoa.pessoaType === 1" @blur="pessoaTypeChanged" align="right"/>

        <!--INPUT CNPJ-->
        <custom-input-text key="cnpj" label="CNPJ" :model="pessoa.cnpj" mask="##.###.###/####-##" v-if="pessoa.pessoaType === 2" @blur="pessoaTypeChanged" align="right"/>

        <!--INPUT INSCRICAO ESTADUAL-->
        <q-item class="q-px-none">
          <!--<q-item-side>-->
          <!--<q-btn label="Testar" @click="testaInscricoesEstaduais" />-->
          <!--</q-item-side>-->
          <q-item-main>
            <custom-input-text type="text" label="Inscrição Estadual" maxlength="14" :model="pessoa.inscricaoEstadual" align="right"/>
          </q-item-main>
          <q-item-side >
            <estado-sigla-select label="UF" :model="pessoa.uf"/>
          </q-item-side>
        </q-item>

        <q-select v-model="pessoa.inscricaoEstadualIndicador.value" float-label="Indicador da Inscrição Estadual" :options="inscricaoEstadualIndicadorOptions"/>

        <!--INPUT INSCRICAO MUNICIPAL-->
        <custom-input-text label="Inscrição Municipal" :model="pessoa.inscricaoMunicipal" align="right"/>

        <!--INPUT INSCRICAO SUFRAMA-->
        <custom-input-text label="Inscrição Suframa" :model="pessoa.inscricaoSuframa" align="right" type="number"/>

        <!--INPUT INSCRICAO ESTRANGEIRO-->
        <custom-input-text label="Inscrição Estrangeiro" :model="pessoa.inscricaoEstrangeiro"/>

        <!--INPUT CNAE-->
        <custom-input-text label="CNAE" :model="pessoa.cnae" align="right" type="number"/>

        <!--INPUT CRT-->
        <custom-input-text label="CRT" :model="pessoa.crt" align="right" type="number"/>

      </div>
    </div>

    <!--DIALOG NEW GRUPO ECONOMICO-->
    <q-dialog v-model="newGrupoEconomicoDialog" prevent-close>
      <span slot="title">Novo Grupo Econômico</span>
      <span slot="message">Crie um novo Grupo Econômico preenchendo o campo abaixo</span>
      <div slot="body">
        <custom-input-text type="text" label="Grupo Econômico" :model="grupoEconomico.nome" @keyup.enter="createGrupoEconomico()"/>
      </div>
      <template slot="buttons" slot-scope="props">
        <q-btn flat @click="closeNovoGrupoEconomicoDialog"  label="Cancelar"/>
        <q-btn flat @click="createGrupoEconomico()"  label="Salvar"/>
      </template>
    </q-dialog>

  </custom-page>
</template>

<script>
  import toolbar from '../../../components/Toolbar.vue'
  import customPage from '../../../components/CustomPage.vue'
  import customInputText from '../../../components/CustomInputText.vue'
  import Pessoa from '../../../assets/js/model/Pessoa'
  import GrupoEconomico from '../../../assets/js/model/GrupoEconomico'
  import estadoSiglaSelect from '../../../components/EstadoSiglaSelect.vue'
  import { filter } from 'quasar'
  import inscricaoEstadualValidator from '../../../assets/js/InscricaoEstadualValidator';
  import GrupoEconomicoService from "../../../assets/js/service/GrupoEconomicoService";
  import PessoaService from "../../../assets/js/service/PessoaService";
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
        pessoaService: new PessoaService(),
        grupoEconomicoService: new GrupoEconomicoService(),
        grupoEconomicoSearchTerms: '',
        tempGrupoEconomicoList: [],
        newGrupoEconomicoDialog: false,
        grupoEconomico: GrupoEconomico,
        pessoa: new Pessoa(1),
        inscricaoEstadualIndicadorOptions: [
          {
            label: '1 - Contribuinte ICMS',
            value: 1,
          },
          {
            label: '2 - Isento',
            value: 2,
          },
          {
            label: '9 - Não Contribuinte',
            value: 9,
          }
        ],
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
        this.$q.loading.show();
        this.pessoaService.savePessoa(this.pessoa.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Pessoa criada com sucesso'});
          this.$router.push({name: 'pessoas'});
          this.$root.$emit('refreshPessoaList');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.request.response});
          this.$q.loading.hide();
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
        this.$q.loading.show();
        this.grupoEconomicoService.saveGrupoEconomico(this.grupoEconomico.getValues()).then(grupoEconomico => {
          this.$q.notify({type: 'positive', message: 'Grupo Econômico criado com sucesso'});
          this.closeNovoGrupoEconomicoDialog();
          this.grupoEconomicoSearchTerms = grupoEconomico.nome;
          this.pessoa.grupoEconomico.value = grupoEconomico.id;
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.dialog({title:'Ops', message: error.message});
          this.$q.loading.hide();
        })
      },
      searchGrupoEconomico (terms, done) {
        this.grupoEconomicoService.listGruposEconomicos(terms).then(result => {
          this.tempGrupoEconomicoList = this.parseGruposEconomicos(result);
          done(this.tempGrupoEconomicoList)
        });
      },
      parseGruposEconomicos(gruposEconomicos) {
        return gruposEconomicos.map(grupoEconomico => {
          return {
            label: grupoEconomico.nome,
            id: grupoEconomico.id
          }
        })
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
    mounted(){

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

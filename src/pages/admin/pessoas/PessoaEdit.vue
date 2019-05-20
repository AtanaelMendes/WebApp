<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction" title="Editar pessoa">
      <q-btn slot="action_itens" flat dense round icon="done" @click="updatePessoa()"/>
    </toolbar>

    <div class="row q-pa-md space-end justify-center">
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4" @keyup.enter="savePessoa()">
        <div class="row gutter-y-sm">

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

          <!--INPUT GRUPO ECONOMICO-->
          <div class="col-12">
            <q-field :error="pessoa.grupoEconomico.errorMessage != null">
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
          </div>

          <!--INPUT NOME-->
          <div class="col-12">
            <custom-input-text label="Nome" :model="pessoa.nome" maxlength="100"/>
          </div>

          <!--INPUT RAZAO SOCIAL-->
          <div class="col-12">
            <custom-input-text label="Razão Social" :model="pessoa.razaoSocial" maxlength="100"/>
          </div>

          <!--INPUT CPF-->
          <div class="col-12">
            <custom-input-text key="cpf"label="CPF" :model="pessoa.cpf" mask="###.###.###-##" v-if="pessoa.pessoaType === 1" @blur="pessoaTypeChanged" align="right"/>
          </div>

          <!--INPUT CNPJ-->
          <div class="col-12">
            <custom-input-text key="cnpj" label="CNPJ" :model="pessoa.cnpj" mask="##.###.###/####-##" v-if="pessoa.pessoaType === 2" @blur="pessoaTypeChanged" align="right"/>
          </div>

          <!--INPUT INSCRICAO ESTADUAL-->
          <div class="col-12">
            <div class="row gutter-x-xs">
              <!--<q-item-side>-->
              <!--<q-btn label="Testar" @click="testaInscricoesEstaduais" />-->
              <!--</q-item-side>-->

              <div class="col-9">
                <custom-input-text type="text" label="Inscrição Estadual" maxlength="14" :model="pessoa.inscricaoEstadual" align="right"/>
              </div>
              <div class="col-3">
                <estado-sigla-select label="UF" :model="pessoa.uf"/>
              </div>
            </div>
          </div>

          <!--INPUT INSCRICAO ESTADUAL INDICADOR-->
          <div class="col-12">
            <q-field :error="pessoa.inscricaoEstadualIndicador.errorMessage !== null" :error-label="pessoa.inscricaoEstadualIndicador.errorMessage">
              <q-select v-model="pessoa.inscricaoEstadualIndicador.value"
                        float-label="Indicador da Inscrição Estadual"
                        :options="inscricaoEstadualIndicadorOptions"
                        v-on:input="pessoa.inscricaoEstadualIndicador.errorMessage = null"
              />
            </q-field>
          </div>

          <!--INPUT INSCRICAO MUNICIPAL-->
          <div class="col-12">
            <custom-input-text label="Inscrição Municipal" :model="pessoa.inscricaoMunicipal" align="right"/>
          </div>

          <!--INPUT INSCRICAO SUFRAMA-->
          <div class="col-12">
            <custom-input-text label="Inscrição Suframa" :model="pessoa.inscricaoSuframa" align="right" type="number"/>
          </div>

          <!--INPUT INSCRICAO ESTRANGEIRO-->
          <div class="col-12">
            <custom-input-text label="Inscrição Estrangeiro" :model="pessoa.inscricaoEstrangeiro"/>
          </div>

          <!--INPUT CNAE-->
          <div class="col-12">
            <custom-input-text label="CNAE" :model="pessoa.cnae" align="right" type="number"/>
          </div>

          <!--INPUT CRT-->
          <div class="col-12">
            <custom-input-text label="CRT" :model="pessoa.crt" align="right" type="number"/>
          </div>

        </div>
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
  import toolbar from '../../../components/Toolbar.vue'
  import customPage from '../../../components/CustomPage.vue'
  import customInputText from '../../../components/CustomInputText.vue'
  import Pessoa from '../../../assets/js/model/Pessoa'
  import estadoSiglaSelect from '../../../components/EstadoSiglaSelect.vue'
  import GrupoEconomico from '../../../assets/js/model/GrupoEconomico'
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
        this.pessoa.inscricaoEstrangeiro.value = data.inscricao_estrangeiro;
        this.pessoa.razaoSocial.value = data.razao_social;
        this.pessoa.inscricaoEstadual.value = data.inscricao_estadual;
        this.pessoa.inscricaoEstadualIndicador.value = data.inscricao_estadual_indicador;
        this.pessoa.uf.value = data.uf;
        this.pessoa.inscricaoMunicipal.value = data.inscricao_municipal;
        this.pessoa.inscricaoSuframa.value = data.inscricao_suframa;
        this.pessoa.isConsumidor.value = data.is_consumidor;
        this.pessoa.cnae.value = data.cnae;
        this.pessoa.crt.value = data.crt;
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

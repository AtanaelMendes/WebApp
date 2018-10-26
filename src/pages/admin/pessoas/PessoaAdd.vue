<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction" title="Nova Pessoa">
      <q-btn slot="action_itens" flat dense label="salvar" @click="savePessoa()"/>

      <q-tabs slot="tabs" align="justify"  class="shadow-3" color="brand" text-color="brand" underline-color="deep-orange">
        <q-tab slot="title" label="Informações" />
        <q-tab slot="title" label="Contatos"/>
        <q-tab slot="title" label="Localizações"/>
      </q-tabs>

    </toolbar>

    <form class="q-pa-md">

      <q-field class="q-mb-sm" style="text-align: center; margin-bottom: 40px">
        <q-btn-toggle v-model="pessoaType" toggle-color="primary" inverted @input="pessoaTypeChanged"
                      :options="[{label: 'Física', value: 1},{label: 'Jurídica', value: 2}]"/>
      </q-field>

      <!--<q-field :error="form.grupoEconomico.errorMessage != null" class="q-mb-sm">-->
      <q-field :error="form.grupoEconomico.errorMessage != null" class="q-mb-sm" style="width: 50%; padding-right:20px">
        <q-item class="q-pa-none" >
          <q-item-main>
            <q-input v-model="grupoEconomicoSearchTerms" placeholder="Grupo Econômico" :after="[{icon:'arrow_drop_down'}]">
              <q-autocomplete @search="search" @selected="selected" :min-characters="0" :debounce="500" value-field="label"/>
            </q-input>
          </q-item-main>

          <q-item-side>
            <q-btn color="deep-orange" rounded size="md" icon="add" @click.native="openNovoGrupoEconomicoDialog()" class="q-px-sm"/>
          </q-item-side>
        </q-item>

        <div class="q-field-bottom row no-wrap" style="height: 22px">
          <div class="q-field-error col" v-if="form.grupoEconomico.errorMessage != null" >{{form.grupoEconomico.errorMessage}}</div>
        </div>
      </q-field>

      <div style="display: flex">
        <custom-input-text type="text" label="Nome" :model="form.nome" maxlength="20" style="flex-grow: 1; margin-right: 20px" />

        <custom-input-text key="cpf" type="text" label="CPF" :model="form.cpf" mask="###.###.###-##" v-if="pessoaType === 1" style="flex-grow: 1; margin-left: 20px" />

        <custom-input-text key="cnpj" type="text" label="CNPJ" :model="form.cnpj" mask="##.###.###/####-##" v-if="pessoaType === 2" style="flex-grow: 1; margin-left: 20px" />
      </div>

      <div style="display: flex" v-if="pessoaType === 2">
        <custom-input-text type="text" label="Razão Social" :model="form.razaoSocial" style="flex-grow: 1; margin-right: 20px" />

        <custom-input-text type="text" label="Nome Fantasia" :model="form.nomeFantasia" style="flex-grow: 1; margin-left: 20px" />
      </div>

      <div style="display: flex">
        <custom-input-text type="text" label="Inscrição Estadual" :model="form.inscricaoEstadual" style="flex-grow: 1; margin-right: 20px" />

        <custom-input-text type="text" label="Inscrição Municipal" :model="form.inscricaoMunicipal" style="flex-grow: 1; margin-left: 20px" />
      </div>

    </form>


    <q-dialog v-model="newGrupoEconomicoDialog" prevent-close>
      <span slot="title">Novo Grupo Econômico</span>
      <span slot="message">Crie um novo Grupo Econômico preenchendo o campo abaixo</span>

      <div slot="body">
        <form @keyup.enter="createGrupoEconomico()">
          <custom-input-text type="text" label="Grupo Econômico" :model="formGrupoEconomico.nome" />
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
  import { required, requiredIf, minLength, maxLength } from 'vuelidate/lib/validators'
  import PessoaService from 'assets/js/PessoaService'
  //import FormMixin from 'components/mixins/FormMixin'

  export default {
    name: "PessoaAdd",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    //mixins: [FormMixin],
    data(){
      return {
        grupoEconomicoSearchTerms: '',
        pessoaType: 1,
        newGrupoEconomicoDialog: false,

        form: {
          nome: {
            value: null,
            errorMessage: null
          },
          grupoEconomico: {
            value: null,
            errorMessage: null
          },
          cpf: {
            value: null,
            errorMessage: null
          },
          cnpj: {
            value: null,
            errorMessage: null
          },
          inscricaoEstadual: {
            value: null,
            errorMessage: null
          },
          inscricaoMunicipal: {
            value: null,
            errorMessage: null
          },
          razaoSocial: {
            value: null,
            errorMessage: null
          },
          nomeFantasia: {
            value: null,
            errorMessage: null
          }
        },
        formGrupoEconomico: {
          nome: {
            value: null,
            errorMessage: null
          },
        },
      }
    },
    validations(){
      let validation;

      if(this.newGrupoEconomicoDialog){
        validation = {
          formGrupoEconomico: {
            nome: { value: { required, minLength: minLength(3) } },
          }
        };
      }else {
        validation = {
          form: {
            nome: { value: { required, minLength: minLength(3), maxLength: maxLength(20) } },
            grupoEconomico: { value: {required} }
          }
        };

        if(this.pessoaType === 1){
          validation.form.cpf = {value: required};
        }else if(this.pessoaType === 2){
          validation.form.cnpj = {value: required};
          validation.form.razaoSocial = {value: required};
          validation.form.nomeFantasia = {value: required};
        }
      }
      return validation;
    },
    methods:{
      openNovoGrupoEconomicoDialog: function(){
        this.newGrupoEconomicoDialog = true;
      },
      closeNovoGrupoEconomicoDialog: function(){
        this.newGrupoEconomicoDialog = false;
        this.formGrupoEconomico.nome.value = null;
        this.formGrupoEconomico.nome.errorMessage = null;
      },
      pessoaTypeChanged: function(value){
        this.form.grupoEconomico.errorMessage = null;
        this.form.nome.errorMessage = null;

        switch (value) {
          case 1:
            this.form.cpf.value = null;
            this.form.cpf.errorMessage = null;
            break;
          case 2:
            this.form.cnpj.value = null;
            this.form.cnpj.errorMessage = null;
            this.form.razaoSocial.value = null;
            this.form.razaoSocial.errorMessage = null;
            this.form.nomeFantasia.value = null;
            this.form.nomeFantasia.errorMessage = null;
            break;
        }
      },
      savePessoa: function(){
        this.$v.form.$touch();

        if ( this.$v.form.$error ) {
          if(!this.$v.form.nome.value.required){
            this.form.nome.errorMessage = "Digite um nome"
          }else if(!this.$v.form.nome.value.minLength){
            this.form.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres"
          }

          if(!this.$v.form.grupoEconomico.value.required){
            this.form.grupoEconomico.errorMessage = "Selecione um Grupo Econòmico"
          }

          if(this.pessoaType === 1){
            if(!this.$v.form.cpf.value.required){
              this.form.cpf.errorMessage = "Digite um CPF"
            }
          }else if(this.pessoaType === 2){
            if(!this.$v.form.cnpj.value.required){
              this.form.cnpj.errorMessage = "Digite um CNPJ"
            }

            if(!this.$v.form.razaoSocial.value.required){
              this.form.razaoSocial.errorMessage = "Digite uma razão social"
            }

            if(!this.$v.form.nomeFantasia.value.required){
              this.form.nomeFantasia.errorMessage = "Digite um nome fantasia"
            }
          }

          return;
        }

        let params = {
          nome: this.form.nome.value,
          grupo_economico_id: this.form.grupoEconomico.value,
          cpf: this.form.cpf.value,
          cnpj: this.form.cnpj.value,
          inscricao_estadual: this.form.inscricaoEstadual.value,
          inscricao_municipal: this.form.inscricaoMunicipal.value,
          razao_social: this.form.razaoSocial.value,
          nome_fantasia: this.form.nomeFantasia.value
        };

        this.$axios.post('/pessoa', params).then(response => {
          if(response.status === 201){
            this.$q.notify({
              type: 'positive',
              message: 'Pessoa criada com sucesso'
            });

            //  this.setFormObj(this.form);
            this.$router.push({name: 'pessoas'});
            this.$root.$emit('refreshPessoaList')
          }
        }).catch(error => {
          console.error(error);
        })
      },
      createGrupoEconomico: function(){
        this.$v.formGrupoEconomico.$touch();

        if ( this.$v.formGrupoEconomico.$error ) {
          if(!this.$v.formGrupoEconomico.nome.value.required){
            this.formGrupoEconomico.nome.errorMessage = "Digite um nome"
          }else if(!this.$v.formGrupoEconomico.nome.value.minLength){
            this.formGrupoEconomico.nome.errorMessage = "O nome deve ter no mínimo 3 caracteres"
          }
          return;
        }

        let params = {'nome':this.formGrupoEconomico.nome.value};
        this.$axios.post('grupo_economico', params).then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Grupo Econômico criado com sucesso'
          });

          this.closeNovoGrupoEconomicoDialog();

        }).catch(error => {
          if (error.response.status === 422){
            this.$q.dialog({
              title:'Ops',
              message: 'Já existe um registro com esse nome'
            })
          }
        })
      },
      search (terms, done) {
        this.$axios.get('grupo_economico?nome=' + terms).then(response => {
          done(parseGruposEconomicos(response.data))
        });
      },
      selected (item) {
        this.form.grupoEconomico.value = item.id;
      },
      backAction: function () {
        this.$router.push({name: 'pessoas'});
      }
    },
    mounted(){}
  }

  function parseGruposEconomicos(gruposEconomicos) {
    return gruposEconomicos.map(grupoEconomico => {
      return {
        label: grupoEconomico.nome,
        id: grupoEconomico.id
      }
    })
  }
</script>

<style>
  .text-brand {
    color: #909090 !important;
  }
  .bg-brand {
    background: #fcfcfc !important;
  }
  .q-tabs{
    border-radius: unset;
  }
  .shadow-3{
    box-shadow: 0 1px 8px rgba(0,0,0,0.05), 0 3px 4px rgba(0,0,0,0.04), 0 3px 3px -2px rgba(0,0,0,0.03);
  }
</style>

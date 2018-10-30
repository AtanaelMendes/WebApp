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


      <div style="display: flex">
        <custom-input-text type="text" label="Nome" :model="pessoa.nome" maxlength="20" style="flex-grow: 1; margin-right: 20px" />

        <custom-input-text key="cpf" type="text" label="CPF" :model="pessoa.cpf" mask="###.###.###-##" v-if="pessoa.pessoaType === 1" style="flex-grow: 1; margin-left: 20px" />

        <custom-input-text key="cnpj" type="text" label="CNPJ" :model="pessoa.cnpj" mask="##.###.###/####-##" v-if="pessoa.pessoaType === 2" style="flex-grow: 1; margin-left: 20px" />
      </div>

      <div style="display: flex" v-if="pessoa.pessoaType === 2">
        <custom-input-text type="text" label="Razão Social" :model="pessoa.razaoSocial" style="flex-grow: 1; margin-right: 20px" />

        <custom-input-text type="text" label="Nome Fantasia" :model="pessoa.nomeFantasia" style="flex-grow: 1; margin-left: 20px" />
      </div>

      <div style="display: flex">
        <custom-input-text type="text" label="Inscrição Estadual" :model="pessoa.inscricaoEstadual" style="flex-grow: 1; margin-right: 20px" />

        <custom-input-text type="text" label="Inscrição Municipal" :model="pessoa.inscricaoMunicipal" style="flex-grow: 1; margin-left: 20px" />
      </div>

    </form>


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
  import GrupoEconomicoService from 'assets/js/service/GrupoEconomicoService'
  import Area from 'assets/js/model/Area'
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
        newGrupoEconomicoDialog: false,
        pessoa: Pessoa,
        grupoEconomico: GrupoEconomico,
      }
    },
    methods:{
      openNovoGrupoEconomicoDialog: function(){
        this.newGrupoEconomicoDialog = true;
      },
      closeNovoGrupoEconomicoDialog: function(){
        this.newGrupoEconomicoDialog = false;
        this.grupoEconomico.nome.value = null;
        this.grupoEconomico.nome.errorMessage = null;
      },
      pessoaTypeChanged: function(value){
        this.pessoa.grupoEconomico.errorMessage = null;
        this.pessoa.nome.errorMessage = null;

        switch (value) {
          case 1:
            this.pessoa.cpf.value = null;
            this.pessoa.cpf.errorMessage = null;
            break;
          case 2:
            this.pessoa.cnpj.value = null;
            this.pessoa.cnpj.errorMessage = null;
            this.pessoa.razaoSocial.value = null;
            this.pessoa.razaoSocial.errorMessage = null;
            this.pessoa.nomeFantasia.value = null;
            this.pessoa.nomeFantasia.errorMessage = null;
            break;
        }
      },
      savePessoa: function(){
        if(!this.pessoa.isValid()){
          return;
        }

        PessoaService.savePessoa(this.pessoa.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Pessoa criada com sucesso'});

            //  this.setFormObj(this.form);
            this.$router.push({name: 'pessoas'});
            this.$root.$emit('refreshPessoaList')
          }
        });

      },
      createGrupoEconomico: function(){
        if(!this.grupoEconomico.isValid(this)){
          return;
        }

        GrupoEconomicoService.saveGrupoEconomico(this.grupoEconomico.getValues()).then(response => {
          this.$q.notify({type: 'positive', message: 'Grupo Econômico criado com sucesso'});

          this.closeNovoGrupoEconomicoDialog();

        }).catch(error => {
          if (error.response.status === 422){
            this.$q.dialog({title:'Ops', message: 'Já existe um registro com esse nome'})
          }
        })
      },
      search (terms, done) {
        GrupoEconomicoService.searchGrupoEconomico(terms).then(response => {
          done(response)
        });
      },
      selected (item) {
        this.pessoa.grupoEconomico.value = item.id;
        this.pessoa.grupoEconomico.errorMessage = null;
      },
      backAction: function () {
        this.$router.push({name: 'pessoas'});
      }
    },
    mounted(){},
    beforeDestroy(){
      console.log('beforeDestroy')
      console.log(this.pessoa)
      this.pessoa = null;
      console.log(this.pessoa)
    }
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

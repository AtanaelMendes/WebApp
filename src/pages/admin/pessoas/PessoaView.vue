<template>
  <custom-page isChild>
    <toolbar slot="toolbar" navigation_type="noneAndBack" @navigation_clicked="backAction">

      <template slot="action_itens" v-if="pessoa">
        <q-btn flat round dense icon="edit" @click.native="editUser(pessoa.id)"/>
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item dense @click.native="disablePessoa(pessoa.id)" v-if="!pessoa.deleted_at">
                <q-item-main label="Inativar pessoa"  />
              </q-item>
              <q-item dense @click.native="enablePessoa(pessoa.id)" v-if="pessoa.deleted_at">
                <q-item-main label="Ativar pessoa"  />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>

      <q-tabs slot="tabs" v-model="selectedTab" align="justify"  class="shadow-3" color="brand" text-color="brand" underline-color="deep-orange">
        <q-tab slot="title" name="tab-info" label="Informações" />
        <q-tab slot="title" name="tab-contatos" label="Contatos"></q-tab>
        <q-tab slot="title" name="tab-localizacoes" label="Localizações"/>
      </q-tabs>

    </toolbar>
      <div v-if="pessoa" >
        <div v-if="selectedTab === 'tab-info'" class="q-ma-lg">

          <div class="item">
            <span class="label">Grupo Econômico</span>
            <p class="field">{{pessoa.grupo_economico.nome}}</p>
          </div>

          <div style="display: flex;" class="item">
            <div style="width: 50%">
              <span class="label">Nome</span>
              <p class="field">{{pessoa.nome}}</p>
            </div>
            <div v-if="pessoa.cpf" style="width: 50%">
              <span class="label">CPF</span>
              <p class="field">{{pessoa.cpf}}</p>
            </div>
            <div v-if="pessoa.cnpj" style="width: 50%">
              <span class="label">CNPJ</span>
              <p class="field">{{pessoa.cnpj}}</p>
            </div>
          </div>


          <div v-if="pessoa.razao_social || pessoa.nome_fantasia" style="display: flex;" class="item">
            <div v-if="pessoa.razao_social" style="width: 50%">
              <span class="label">Razão Social</span>
              <p class="field">{{pessoa.razao_social}}</p>
            </div>
            <div v-if="pessoa.nome_fantasia" style="width: 50%">
              <span class="label">Nome Fantasia</span>
              <p class="field">{{pessoa.nome_fantasia}}</p>
            </div>
          </div>

          <div style="display: flex;" class="item">
            <div v-if="pessoa.inscricao_estadual" style="width: 50%">
              <span class="label">Inscrição Estadual</span>
              <p class="field">{{pessoa.inscricao_estadual}}</p>
            </div>
            <div v-if="pessoa.inscricao_municipal" style="width: 50%">
              <span class="label">Inscrição Municipal</span>
              <p class="field">{{pessoa.inscricao_municipal}}</p>
            </div>
          </div>


        </div>

        <ContatoList v-if="selectedTab === 'tab-contatos'"></ContatoList>

        <div v-if="selectedTab === 'tab-localizacoes'">
          <span>Localizações</span>
        </div>
      </div>
  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import PessoaService from 'assets/js/service/PessoaService'
  import ContatoList from 'pages/admin/pessoas/tabs/ContatoList'

  export default {
    name: "PessoaView",
    components: {
      toolbar,
      customPage,
      ContatoList
    },
    watch: {
      '$route' (to, from) {
        this.getPessoa();
        this.selectedTab ='tab-info';
      }
    },
    data(){
      return{
        pessoa: null,
        selectedTab: 'tab-info',
      }
    },
    methods: {
      getPessoa: function(){
        PessoaService.getPessoa(this.$route.params.id).then(pessoa => {
          this.pessoa = pessoa;
        })
      },
      backAction: function () {
        this.$router.go(-1);
      }
    },
    mounted(){
      this.getPessoa();
    }
  }
</script>

<style>
  .label{
    color: #005f5f;
    font-size: 14px;
    text-transform: uppercase;
  }
  .field{
    font-size: 18px;
    font-weight: 400;
    margin-top: 6px;
    margin-bottom: 0px;
    color: #333333;
  }
  .item{
    margin-bottom: 26px;
  }

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

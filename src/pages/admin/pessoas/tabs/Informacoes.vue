<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">

    <div v-if="pessoa" class="q-pa-md row gutter-sm">

      <div class="col-12">
        <q-item>
          <q-item-side>
            <q-icon name="account_circle" size="40px"/>
          </q-item-side>
          <q-item-main>
            <q-item-tile class="q-title">{{pessoa.nome}}</q-item-tile>
            <q-item-tile v-if="pessoa.cpf" sublabel>{{pessoa.cpf}}</q-item-tile>
            <q-item-tile v-if="pessoa.cnpj" sublabel>{{pessoa.cnpj}}</q-item-tile>
          </q-item-main>
        </q-item>
      </div>


      <div :class="coluna">
        <q-item>
          <q-item-main inset>
            <q-item-tile class="q-subheading title-color">Grupo econômico</q-item-tile>
            <q-item-tile sublabel>{{pessoa.grupo_economico.nome}}</q-item-tile>
          </q-item-main>
        </q-item>
      </div>

      <div v-if="pessoa.razao_social" :class="coluna">
        <q-item>
          <q-item-main inset>
            <q-item-tile class="q-subheading title-color">Razão social</q-item-tile>
            <q-item-tile sublabel>{{pessoa.razao_social}}</q-item-tile>
          </q-item-main>
        </q-item>
      </div>

      <div v-if="pessoa.nome_fantasia" :class="coluna">
        <q-item>
          <q-item-main inset>
            <q-item-tile class="q-subheading title-color">Nome fantasia</q-item-tile>
            <q-item-tile sublabel>{{pessoa.nome_fantasia}}</q-item-tile>
          </q-item-main>
        </q-item>
      </div>

      <div :class="coluna">

        <q-item v-if="pessoa.inscricao_estadual">
          <q-item-main inset>
            <q-item-tile class="q-subheading title-color">Inscrição estadual</q-item-tile>
            <q-item-tile sublabel>
              {{pessoa.inscricao_estadual}}
            </q-item-tile>
          </q-item-main>
        </q-item>

        <q-item v-if="pessoa.inscricao_municipal">
          <q-item-main>
            <q-item-tile class="q-subheading title-color">Inscrição municipal</q-item-tile>
            <q-item-tile sublabel>{{pessoa.inscricao_municipal}}</q-item-tile>
          </q-item-main>
        </q-item>

      </div>
    </div>
  </q-scroll-area>
</template>

<script>
  import PessoaService from 'assets/js/service/PessoaService'
  export default {
    name: "informacao",
    data(){
      return{
        pessoa: null,
        coluna: 'col-xs-12 col-sm-12 col-md-6 col-lg-6',
      }
    },
    watch: {
      '$route' (to, from) {
        this.getPessoa(this.$route.params.id)
      }
    },
    methods: {
      getPessoa: function(id){
        PessoaService.getPessoa(id).then(pessoa => {
          this.pessoa = pessoa;
        })
      },
    },
    mounted() {
      this.getPessoa(this.$route.params.id)
    }
  }
</script>
<style>
  .title-color{
    color: #005f5f;
  }
</style>

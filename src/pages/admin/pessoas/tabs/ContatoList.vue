<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">
    <div class="row gutter-sm q-pa-md" v-if="!isEmptyList">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4" v-for="(contato, key) in contatos">
        <q-card >
          <q-card-title class="q-pb-none q-pt-sm">
            Fulano
            <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
              <q-popover>
                <q-list link class="no-border">
                  <q-item v-close-overlay>
                    <q-item-main label="Apagar Contato" />
                  </q-item>
                  <q-item v-close-overlay>
                    <q-item-main label="Share" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-card-title>
          <q-list no-border>

            <q-item dense class="q-pa-sm">
              <q-item-main>
                <q-chip small color="teal">Cobrança</q-chip>
                <q-chip small color="teal">Fiscal</q-chip>
              </q-item-main>
            </q-item>
            <q-item-separator />
            <q-list-header >Telefones</q-list-header>
            <q-item dense>
              <q-item-main>
                <q-item-tile label>(66) 3531-3456</q-item-tile>
              </q-item-main>
              <q-item-side>
                <q-item-tile stamp color="deep-orange" align="end">Fixo</q-item-tile>
              </q-item-side>
            </q-item>

            <q-list-header >Emails</q-list-header>
            <q-item dense>
              <q-item-main>
                <q-item-tile label>fulano@teste.com</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
          <q-card-separator />
          <q-card-actions align="end">
            <q-btn flat color="primary" label="Editar" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div v-if="isEmptyList" class="no-result">
      <img src="~/assets/sad_2.svg"/>
      <span>Nenhum contato encontrado.</span>
    </div>
  </q-scroll-area>
</template>

<script>
  import contatoService from 'assets/js/service/ContatoService';

  export default {
    name: "ContatoList",
    data () {
      return {
        contatos: [],
        isEmptyList: false
      }
    },
    methods: {
      listContatos: function(pessoaId) {
        contatoService.listContatos(pessoaId).then(response => {
          this.contatos = response.data;
          this.isEmptyList = this.contatos.length === 0;
        });
      },
    },
    mounted () {
      this.listContatos(this.$route.params.id);
    }
  }
</script>

<style>
  .q-list-header{
    padding: 5px 16px;
    min-height: 30px;
  }
  .q-chip{
    margin-right: 8px;
  }
  .q-card{
    background: white;
  }



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
</style>

<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">
    <div class="row gutter-sm q-pa-md" v-if="!isEmptyList">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4" v-for="(contato, index) in contatos" :key="index">
        <q-card >
          <q-card-title class="q-pb-none q-pt-sm">
            {{contato.nome}}
            <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
              <q-popover>
                <q-list link class="no-border">
                  <q-item v-close-overlay>
                    <q-item-main label="Apagar Contato" @click.native="deleteContato(contato.id)"/>
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
                <q-chip v-if="contato.is_cobranca" small color="teal">Cobrança</q-chip>
                <q-chip v-if="contato.is_fiscal" small color="teal">Fiscal</q-chip>
              </q-item-main>
            </q-item>
            <q-item-separator />

            <q-list-header >Telefones</q-list-header>
            <q-item dense v-for="(telefone, index) in contato.telefones" :key="index">
              <q-item-main>
                <q-item-tile label>{{telefone.numero}}</q-item-tile>
              </q-item-main>
              <q-item-side>
                <q-item-tile v-if="!telefone.is_celular" stamp color="deep-orange" align="end">Fixo</q-item-tile>
                <q-item-tile v-if="telefone.is_celular" stamp color="deep-orange" align="end">Celular</q-item-tile>
              </q-item-side>
            </q-item>

            <q-list-header >Emails</q-list-header>
            <q-item dense v-for="(email, index) in contato.emails" :key="index">
              <q-item-main>
                <q-item-tile label>{{email.endereco}}</q-item-tile>
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
    wacth: {
      '$route' (to, from) {
        this.listContatos(this.$route.params.id)
      }
    },
    methods: {
      listContatos: function(pessoaId) {
        contatoService.listContatos(pessoaId).then(response => {
          this.contatos = response.data
          this.isEmptyList = this.contatos.length === 0
        });
      },
      deleteContato: function(contatoId) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esse contato?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          contatoService.deleteContato(contatoId, this.$route.params.id).then(response => {
            this.$q.notify({type: 'positive', message: 'Contato excluido'})
            this.isEmptyList = this.contatos.length === 0
            this.listContatos(this.$route.params.id);
          })
        });

      },
    },
    mounted () {
      this.listContatos(this.$route.params.id);
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
</style>

<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">
    <div class="row gutter-sm q-pa-md final-space" v-if="!isEmptyList">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" v-for="(contato, index) in contatos" :key="contato.nome">
        <q-card>
          <q-card-title class="q-pb-none q-pt-sm">
            {{contato.nome}}
            <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
              <q-popover>
                <q-list class="no-border">
                  <q-item v-close-overlay>
                    <q-item-main @click.native="updateContato(contato.id)">
                      <q-btn dense flat label="editar"/>
                    </q-item-main>
                  </q-item>
                  <q-item v-close-overlay>
                    <q-item-main @click.native="deleteContato(contato.id)">
                      <q-btn dense flat label="apagar"/>
                    </q-item-main>
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

            <q-item v-for="(telefone, index) in getFilteredTelefones(contato.telefones, 'celular')" :key="telefone.numero">
              <q-item-side color="deep-orange" icon="phone_iphone" v-if="index === 0"/>
              <q-item-main inset>
                <q-item-tile>
                  {{telefone.numero}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <q-item v-for="(telefone, index) in getFilteredTelefones(contato.telefones, 'fixo')" :key="telefone.numero">
              <q-item-side color="deep-orange" icon="phone" v-if="index === 0"/>
              <q-item-main inset>
                <q-item-tile>
                  {{telefone.numero}}
                </q-item-tile>
              </q-item-main>
            </q-item>


            <q-item v-for="(email, index) in contato.emails" :key="email.endereco">
              <q-item-side class="q-pa-none" icon="email" color="deep-orange" v-if="index === 0"/>
              <q-item-main inset>
                <q-item-tile>
                  {{email.endereco}}
                </q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
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
    watch: {
      '$route' (to, from) {
        this.listContatos(this.$route.params.id)
      }
    },
    methods: {
      updateContato: function(contatoId){
        this.$router.push({name: 'update_contact', params: {id:this.$route.params.id, contatoId: contatoId}});
      },
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
            this.listContatos(this.$route.params.id);
          })
        });
      },
      getFilteredTelefones: function (telefones, filterParam) {
        let param = filterParam === 'celular';
        let result = [];
        for(var telefone of telefones){
          if(telefone.is_celular === param){
            result.push(telefone);
          }
        }
        return result;
      },
    },
    mounted () {
      this.listContatos(this.$route.params.id);
    }
  }
</script>

<style>
  .final-space{
    margin-bottom: 150px;
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

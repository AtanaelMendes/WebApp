<template>
  <q-scroll-area style="width: 100%; height: 100%;" :thumb-style="{
        right: '4px',
        borderRadius: '5px',
        background: '#dfdfdf',
        width: '8px',
        opacity: 1}">
    <div class="row gutter-sm q-pa-md space-end" v-if="!isEmptyList">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" v-for="localizacao in localizacoes" :key="localizacao.id">

        <q-card >
          <q-card-title class=" relative-position">
            <q-chip small color="teal" class="q-mx-xs" v-if="localizacao.is_cobranca">Cobrança</q-chip>
            <q-chip small color="teal" class="q-mx-xs" v-if="localizacao.is_fiscal">Fiscal</q-chip>
            <q-btn round flat dense icon="more_vert" slot="right" style="margin-right: -15px;">
              <q-popover>
                <q-list class="no-border">
                  <q-item v-close-overlay>
                    <q-item-main @click.native="updateLocalizacao(localizacao.id)">
                      <q-btn dense flat label="editar"/>
                    </q-item-main>
                  </q-item>
                  <q-item v-close-overlay>
                    <q-item-main @click.native="deleteLocalizacao(localizacao.id)">
                      <q-btn dense flat label="apagar"/>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-card-title>
          <q-card-separator/>

          <q-item class="bg-negative text-white" v-if="localizacao.deleted_at">
            <q-item-side>
              <q-icon name="place" size="25px" color="white"/>
            </q-item-side>
            <q-item-main>Localização inativa</q-item-main>
          </q-item>

          <q-card-main>
            <q-list no-border>

              <q-item>
                <q-item-main>
                  {{localizacao.endereco}},&nbsp{{localizacao.numero}}
                </q-item-main>
              </q-item>

              <q-item>
                <q-item-main>
                  {{localizacao.bairro}},&nbsp{{localizacao.cidade.nome}}-{{localizacao.cidade.estado.sigla}}
                </q-item-main>
              </q-item>

              <q-item v-if="localizacao.complemento">
                <q-item-main>
                  <q-item-tile>
                    {{localizacao.complemento}}
                  </q-item-tile>
                </q-item-main>
              </q-item>

              <q-item>
                <q-item-main>
                  {{localizacao.cep}}
                </q-item-main>
              </q-item>

            </q-list>
          </q-card-main>


        </q-card>
      </div>
    </div>
    <div v-if="isEmptyList" class="no-result">
      <img src="~/assets/sad_2.svg"/>
      <span>Nenhuma Localização encontrada.</span>
    </div>
  </q-scroll-area>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import localizacaoService from 'assets/js/service/localizacao/LocalizacaoService'
  export default {
    name: "localizacao-list",
    components: {
      toolbar,
      customPage,
      customInputText
    },
    data(){
      return {
        isEmptyList: null,
        localizacoes: null
      }
    },
    watch: {
      '$route' (to, from) {
        this.listLocalizacoes(this.$route.params.id)
      }
    },
    methods:{
      updateLocalizacao: function(localizacaoId){
        this.$router.push({name: 'update_localizacao', params: {id:this.$route.params.id, localizacaoId: localizacaoId}});
      },
      deleteLocalizacao: function(localizacaoId) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar essa localizaçao?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          localizacaoService.deleteLocalizacao(this.$route.params.id, localizacaoId).then(response => {
            this.$q.notify({type: 'positive', message: 'Endereço excluido com sucesso'})
            this.listLocalizacoes(this.$route.params.id)
          });
        });

      },
      listLocalizacoes: function(pessoaId) {
        localizacaoService.listLocalizacoes(pessoaId).then(response => {
          this.localizacoes = response.data
          this.isEmptyList = this.localizacoes.length === 0
        });
      },
      backAction: function () {
        this.$router.go(-1);
      }
    },
    mounted () {
      this.listLocalizacoes(this.$route.params.id);
    }
  }
</script>

<style>
  .space-end{
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

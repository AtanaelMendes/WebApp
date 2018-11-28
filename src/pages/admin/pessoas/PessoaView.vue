<template>
  <custom-page isChild style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">

      <template slot="action_itens" v-if="pessoa">
        <q-btn flat round dense icon="edit" @click.native="editPessoa(pessoa.id)"/>
        <!--<q-btn flat round dense icon="more_vert" >-->
          <!--<q-popover anchor="bottom left">-->
            <!--<q-list link>-->
              <!--<q-item dense @click.native="disablePessoa(pessoa.id)" v-if="!pessoa.deleted_at">-->
                <!--<q-item-main label="Inativar pessoa"  />-->
              <!--</q-item>-->
              <!--<q-item dense @click.native="enablePessoa(pessoa.id)" v-if="pessoa.deleted_at">-->
                <!--<q-item-main label="Ativar pessoa"  />-->
              <!--</q-item>-->
            <!--</q-list>-->
          <!--</q-popover>-->
        <!--</q-btn>-->
      </template>

    </toolbar>

    <div class="row space-end">
      <div class="col-12">

        <!--PESSOA INFO-->
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
              <q-item-side>
              </q-item-side>
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
              <q-item-main inset>
                <q-item-tile class="q-subheading title-color">Inscrição municipal</q-item-tile>
                <q-item-tile sublabel>{{pessoa.inscricao_municipal}}</q-item-tile>
              </q-item-main>
            </q-item>

          </div>
        </div>
        <!--FIM PESSOA INFO-->

        <!--CONTATO LIST-->
        <div class="row gutter-sm q-pa-md">
          <div class="col-12">
            <q-item class="custom-header">
              <q-item-main class="q-title">
                Contatos
              </q-item-main>
              <q-item-side>
                <q-btn round size="md" icon="add" @click="addContato" color="deep-orange"/>
              </q-item-side>
            </q-item>
          </div>

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
                    <q-chip v-if="contato.is_cobranca" small color="teal" class="q-ma-xs">Cobrança</q-chip>
                    <q-chip v-if="contato.is_fiscal" small color="teal" class="q-ma-xs">Fiscal</q-chip>
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
        <!--FIM CONTATO LIST-->

        <!--LOCALIZACAO LIST-->
        <div class="row gutter-sm q-pa-md">
          <div class="col-12">
            <q-item class="custom-header">
              <q-item-main class="q-title">
                Localizações
              </q-item-main>
              <q-item-side>
                <q-btn icon="add" size="md" round @click="addLocalizacao" color="deep-orange"/>
              </q-item-side>
            </q-item>
          </div>
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
        <!--FIM LOCALIZACAO LIST-->

      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import PessoaService from 'assets/js/service/PessoaService'
  import contatoService from 'assets/js/service/ContatoService'
  import customInputText from 'components/CustomInputText.vue'
  import localizacaoService from 'assets/js/service/localizacao/LocalizacaoService'
  export default {
    name: "pessoa-view",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data(){
      return{
        pessoa: null,
        contatos: [],
        localizacoes: [],
        coluna: 'col-xs-12 col-sm-12 col-md-6 col-lg-6',
      }
    },
    watch: {
      '$route' (to, from) {
        this.getPessoa(this.$route.params.id);
        this.listContatos(this.$route.params.id);
        this.listLocalizacoes(this.$route.params.id);
      }
    },
    methods: {
      getPessoa: function(id){
        PessoaService.getPessoa(id).then(pessoa => {
          this.pessoa = pessoa;
        })
      },
      editPessoa: function(){
        this.$router.push({name:'edit_pessoa'});
      },
      disablePessoa:function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente inativar essa pessoa?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          pessoaService.inactivePessoa(this.$route.params.id).then(response => {
            this.$q.notify({type: 'positive', message: 'Pessoa Inativada'})
            this.getPessoa(this.$route.params.id);
          })
        });
      },
      enablePessoa:function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente ativar essa pessoa?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          pessoaService.activePessoa(this.$route.params.id).then(response => {
            this.$q.notify({type: 'positive', message: 'Pessoa Ativada'})
            this.getPessoa(this.$route.params.id);
          })
        });
      },
      addContato: function(){
        this.$router.push({name:'add_contact'});
      },
      updateContato: function(contatoId){
        this.$router.push({name: 'update_contact', params: {id:this.$route.params.id, contatoId: contatoId}});
      },
      listContatos: function(pessoaId) {
        contatoService.listContatos(pessoaId).then(response => {
          this.contatos = response.data
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
      addLocalizacao: function(){
        this.$router.push({name:'add_localizacao'});
      },
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
        //this.$router.go(-1);
        this.$router.push({name:'pessoas'})
      }
    },
    mounted(){
      this.getPessoa(this.$route.params.id);
      this.listContatos(this.$route.params.id);
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
  .custom-header{
    border-top: 1px solid #c5c5c5;
  }
</style>

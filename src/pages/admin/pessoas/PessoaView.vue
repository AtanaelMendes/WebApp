<template>
  <custom-page isChild style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="back" @navigation_clicked="backAction">

      <template slot="action_itens" v-if="pessoa">
        <q-btn flat round dense icon="edit" @click.native="editPessoa(pessoa.id)"/>
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item @click.native="archivePessoa(pessoa.id)" v-if="!pessoa.deleted_at">
                <q-item-main label="Arquivar pessoa"  />
              </q-item>
              <q-item @click.native="deletePessoa(pessoa.id)">
                <q-item-main label="Excluir pessoa"  />
              </q-item>
              <q-item @click.native="restorePessoa(pessoa.id)" v-if="pessoa.deleted_at">
                <q-item-main label="Ativar pessoa"  />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>

    </toolbar>

    <div class="row space-end">
      <div class="col-12">

        <!--PESSOA INFO-->
        <div v-if="pessoa" class="q-pa-md row gutter-sm">
          <div class="col-12">

            <q-item>
              <q-item-side>
                <q-icon name="account_circle" size="40px" color="primary"/>
              </q-item-side>
              <q-item-main>
                <q-item-tile class="q-title">
                  {{pessoa.nome}}
                  <q-chip v-if="pessoa.deleted_at" dense color="negative" pointing="left">
                    Inativo
                  </q-chip>
                </q-item-tile>
                <q-item-tile v-if="pessoa.cpf" sublabel>
                  {{formatCPF(pessoa.cpf)}}
                </q-item-tile>
                <q-item-tile v-if="pessoa.cnpj" sublabel>
                  {{formatCNPJ(pessoa.cnpj)}}
                </q-item-tile>
              </q-item-main>
              <q-item-side>
              </q-item-side>
            </q-item>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">

            <!--IS CONSUMIDOR-->
            <q-item v-if="pessoa.is_consumidor">
              <q-item-main>
                <q-chip color="primary">
                  Consumidor
                </q-chip>
              </q-item-main>
            </q-item>

            <!--GRUPO ECONOMICO-->
            <q-item>
              <q-item-main >
                <q-item-tile class="q-subheading title-color">Grupo econômico</q-item-tile>
                <q-item-tile sublabel>{{pessoa.grupo_economico.nome}}</q-item-tile>
              </q-item-main>
            </q-item>

            <!--RAZAO SOCIAL-->
            <q-item v-if="pessoa.razao_social">
              <q-item-main >
                <q-item-tile class="q-subheading title-color">Razão social</q-item-tile>
                <q-item-tile sublabel>{{pessoa.razao_social}}</q-item-tile>
              </q-item-main>
            </q-item>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">

            <!--INSCRICAO ESTADUAL-->
            <q-item v-if="pessoa.inscricao_estadual">
              <q-item-main >
                <q-item-tile class="q-subheading title-color">Inscrição estadual</q-item-tile>
                <q-item-tile sublabel>
                  {{pessoa.inscricao_estadual}}
                </q-item-tile>
              </q-item-main>
            </q-item>

            <!--INSCRICAO MUNICIPAL-->
            <q-item v-if="pessoa.inscricao_municipal">
              <q-item-main >
                <q-item-tile class="q-subheading title-color">Inscrição municipal</q-item-tile>
                <q-item-tile sublabel>{{pessoa.inscricao_municipal}}</q-item-tile>
              </q-item-main>
            </q-item>

            <!--INSCRICAO SUFRAMA-->
            <q-item v-if="pessoa.inscricao_suframa">
              <q-item-main >
                <q-item-tile class="q-subheading title-color">Inscrição suframa</q-item-tile>
                <q-item-tile sublabel>{{pessoa.inscricao_suframa}}</q-item-tile>
              </q-item-main>
            </q-item>

            <!--INSCRICAO ESTRANGEIRO-->
            <q-item v-if="pessoa.inscricao_estrangeiro">
              <q-item-main >
                <q-item-tile class="q-subheading title-color">Inscrição estrangeiro</q-item-tile>
                <q-item-tile sublabel>{{pessoa.inscricao_estrangeiro}}</q-item-tile>
              </q-item-main>
            </q-item>

            <!--CNAE-->
            <q-item v-if="pessoa.cnae">
              <q-item-main >
                <q-item-tile class="q-subheading title-color">CNAE</q-item-tile>
                <q-item-tile sublabel>{{pessoa.cnae}}</q-item-tile>
              </q-item-main>
            </q-item>

            <!--CRT-->
            <q-item v-if="pessoa.crt">
              <q-item-main >
                <q-item-tile class="q-subheading title-color">CRT</q-item-tile>
                <q-item-tile sublabel>{{pessoa.crt}}</q-item-tile>
              </q-item-main>
            </q-item>

          </div>

        </div>

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

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" v-for="(contato, index) in contatos" :key="contato.nome">
            <q-card>

              <q-item v-if="contato.deleted_at" class="bg-negative text-white">
                <q-item-side>
                  <q-icon name="phonelink_erase" size="25px" color="white"/>
                </q-item-side>
                <q-item-main>
                  Contato Inativo
                </q-item-main>
              </q-item>

              <q-card-main>
                <q-list no-border>

                  <q-btn class="float-right" color="grey-7" round flat dense icon="more_vert">
                    <q-popover>
                      <q-list link class="no-border">
                        <q-item v-close-overlay>
                          <q-item-main @click.native="updateContato(contato.id)" label="Editar" />
                        </q-item>
                        <q-item v-close-overlay v-if="!contato.deleted_at">
                          <q-item-main @click.native="archiveContato(contato.id)"  label="Arquivar"/>
                        </q-item>
                        <q-item v-close-overlay v-if="contato.deleted_at">
                          <q-item-main @click.native="restoreContato(contato.id)"  label="Ativar"/>
                        </q-item>
                        <q-item v-close-overlay>
                          <q-item-main @click.native="deleteContato(contato.id)" label="Excluir"/>
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>

                  <q-item v-if="contato.nome" class="q-px-none">
                    <q-item-main>
                      <span class="self-center">{{contato.nome}}</span>
                    </q-item-main>
                  </q-item>

                  <q-item class="q-px-none" v-if="contato.is_cobranca || contato.is_fiscal">
                    <q-item-main>
                      <q-chip v-if="contato.is_cobranca" small color="teal" class="q-mr-xs">Cobrança</q-chip>
                      <q-chip v-if="contato.is_fiscal" small color="teal">Fiscal</q-chip>
                    </q-item-main>
                  </q-item>

                  <q-item v-for="(telefone, index) in getFilteredTelefones(contato.telefones, 'celular')" :key="telefone.numero" class="q-px-none">
                    <q-item-side>
                      <q-icon color="deep-orange" name="phone_iphone" v-if="index === 0"/>
                    </q-item-side>
                    <q-item-main>
                      <a :href=" 'tel:'+telefone.numero" style="text-decoration: none;">
                        {{telefone.numero}}
                      </a>
                    </q-item-main>
                  </q-item>

                  <q-item v-for="(telefone, index) in getFilteredTelefones(contato.telefones, 'fixo')" :key="telefone.numero" class="q-px-none">
                    <q-item-side>
                      <q-icon color="deep-orange" name="phone" size="25px" v-if="index === 0"/>
                    </q-item-side>
                    <q-item-main>
                      <a :href=" 'tel:'+telefone.numero" style="text-decoration: none;">
                        {{telefone.numero}}
                      </a>
                    </q-item-main>
                  </q-item>

                  <q-item v-for="(email, index) in contato.emails" :key="email.endereco" class="q-px-none">
                    <q-item-side class="q-pa-none" icon="email" color="deep-orange" v-if="index === 0"/>
                    <q-item-main>
                      <a :href=" 'mailto:'+email.endereco" style="text-decoration: none;">
                        <span class="q-caption">
                          {{email.endereco}}
                        </span>
                      </a>
                    </q-item-main>
                  </q-item>
                </q-list>

              </q-card-main>
            </q-card>
          </div>
        </div>

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

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" v-for="localizacao in localizacoes" :key="localizacao.id">
            <q-card>

              <q-item class="bg-negative text-white" v-if="localizacao.deleted_at">
                <q-item-side>
                  <q-icon name="place" size="25px" color="white"/>
                </q-item-side>
                <q-item-main>
                  Localização inativa
                </q-item-main>
              </q-item>

              <q-card-main>
                <q-list no-border>

                  <q-chip small color="teal" class="q-mr-xs" v-if="localizacao.is_cobranca">Cobrança</q-chip>
                  <q-chip small color="teal" v-if="localizacao.is_fiscal">Fiscal</q-chip>
                  <q-btn class="float-right" color="grey-7" round flat dense icon="more_vert" >
                    <q-popover>
                      <q-list link class="no-border">
                        <q-item v-close-overlay>
                          <q-item-main @click.native="updateLocalizacao(localizacao.id)" label="Editar"/>
                        </q-item>
                        <q-item v-close-overlay v-if="!localizacao.deleted_at">
                          <q-item-main @click.native="archiveLocalizacao(localizacao.id)" label="Arquivar"/>
                        </q-item>
                        <q-item v-close-overlay v-if="localizacao.deleted_at">
                          <q-item-main @click.native="restoreLocalizacao(localizacao.id)" label="Ativar"/>
                        </q-item>
                        <q-item v-close-overlay>
                          <q-item-main @click.native="deleteLocalizacao(localizacao.id)" label="Excluir"/>
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>

                  <q-item class="q-px-none">
                    <q-item-main>
                      <a
                        style="text-decoration: none"
                        :href=" 'http://maps.google.com/maps?q='+
                        localizacao.bairro + ', ' +
                        localizacao.endereco + ', ' +
                        localizacao.numero + ', ' +
                        localizacao.cidade.nome + ', ' +
                        localizacao.cidade.estado.sigla"
                      >
                        {{localizacao.endereco}},&nbsp{{localizacao.numero}}
                      </a>
                    </q-item-main>
                  </q-item>

                  <q-item class="q-px-none">
                    <q-item-main>
                      <a
                        style="text-decoration: none"
                        :href=" 'http://maps.google.com/maps?q='+
                        localizacao.bairro + ', ' +
                        localizacao.endereco + ', ' +
                        localizacao.numero + ', ' +
                        localizacao.cidade.nome + ', ' +
                        localizacao.cidade.estado.sigla"
                      >
                        {{localizacao.bairro}},&nbsp{{localizacao.cidade.nome}}-{{localizacao.cidade.estado.sigla}}
                      </a>
                    </q-item-main>
                  </q-item>

                  <q-item v-if="localizacao.complemento" class="q-px-none">
                    <q-item-main>
                      <q-item-tile>
                        {{localizacao.complemento}}
                      </q-item-tile>
                    </q-item-main>
                  </q-item>

                  <q-item class="q-px-none">
                    <q-item-main>
                      {{localizacao.cep}}
                    </q-item-main>
                  </q-item>

                </q-list>
              </q-card-main>
            </q-card>
          </div>
        </div>

      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import LocalizacaoService from "../../../assets/js/service/localizacao/LocalizacaoService";
  import ContatoService from "../../../assets/js/service/ContatoService";
  import PessoaService from "../../../assets/js/service/PessoaService";

  export default {
    name: "pessoa-view",
    components: {
      toolbar,
      customPage,
      customInputText,
    },
    data(){
      return{
        pessoaService: new PessoaService(),
        contatoService: new ContatoService(),
        localizacaoService: new LocalizacaoService(),
        pessoa: null,
        contatos: [],
        localizacoes: [],
      }
    },
    watch: {
      '$route' (to, from) {
        this.getPessoa(this.$route.params.id);
        this.listContatos(this.$route.params.id);
        this.listLocalizacoesByPessoa(this.$route.params.id);
        this.pessoa = null;
      }
    },
    methods: {
      formatCPF(cpf){
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      },
      formatCNPJ(cnpj){
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
      },
      getPessoa: function(id){
        this.$q.loading.show();
        this.pessoaService.getPessoa(id).then(pessoa => {
          this.pessoa = pessoa;
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possivel carregar as informações da pessoa'});
          this.$q.loading.hide();
        })
      },
      editPessoa: function(){
        this.$router.push({name:'edit_pessoa'});
      },
      deletePessoa:function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir essa pessoa?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.pessoaService.deletePessoa(this.$route.params.id).then(() => {
            this.$q.notify({type: 'positive', message: 'Pessoa exluida com sucesso'});
            this.$router.push({name:'pessoas'});
            this.$root.$emit('refreshPessoaList');
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possivel excluir esta pessoa'});
            this.$q.loading.hide();
          })
        });
      },
      archivePessoa:function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente arquivar essa pessoa?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.pessoaService.archivePessoa(this.$route.params.id).then(() => {
            this.$q.notify({type: 'positive', message: 'Pessoa Arquivada com sucesso'});
            this.getPessoa(this.$route.params.id);
            this.$root.$emit('refreshPessoaList');
            this.$router.push({name:'pessoas'});
            this.$q.loading.hide();
          }).catch(erro =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível arquivar esta pessoa'});
            this.$q.loading.hide();
          })
        });
      },
      restorePessoa:function(){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente ativar essa pessoa?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.pessoaService.restorePessoa(this.$route.params.id).then(() => {
            this.$q.notify({type: 'positive', message: 'Pessoa Ativada'});
            this.getPessoa(this.$route.params.id);
            this.$root.$emit('refreshPessoaList');
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível restaurar esta pessoa'});
            this.$q.loading.hide();
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
        this.$q.loading.show();
        this.contatoService.listContatos(pessoaId).then(contatos => {
          this.contatos = contatos;
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possível carragar os contatos'});
          this.$q.loading.hide();
        });
      },
      deleteContato: function(contatoId) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir esse contato?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.contatoService.deleteContato(contatoId, this.$route.params.id).then(() => {
            this.$q.notify({type: 'positive', message: 'Contato excluido'});
            this.listContatos(this.$route.params.id);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível exlcuir este contato'});
            this.$q.loading.hide();
          })
        });
      },
      archiveContato: function(contatoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar esse contato?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.contatoService.archiveContato(contatoId, this.$route.params.id).then(() => {
            this.$q.notify({type: 'positive', message: 'Contato arquivado'});
            this.listContatos(this.$route.params.id);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possivel arquivar este contato'});
            this.$q.loading.hide();
          })
        });
      },
      restoreContato: function(contatoId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja ativar esse contato?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.contatoService.restoreContato(contatoId, this.$route.params.id).then(() => {
            this.$q.notify({type: 'positive', message: 'Contato ativado'});
            this.listContatos(this.$route.params.id);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível restaurar este contato'});
            this.$q.loading.hide();
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
          this.$q.loading.show();
          this.localizacaoService.deleteLocalizacao(this.$route.params.id, localizacaoId).then(() => {
            this.$q.loading.hide();
            this.$q.notify({type: 'positive', message: 'Endereço excluido com sucesso'});
            this.listLocalizacoesByPessoa(this.$route.params.id);
          })
        });
      },
      archiveLocalizacao: function(localizacaoId) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja arquivar essa localizaçao?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.localizacaoService.archiveLocalizacao(this.$route.params.id, localizacaoId).then(() => {
            this.$q.notify({type: 'positive', message: 'Endereço Arquivado com sucesso'});
            this.listLocalizacoesByPessoa(this.$route.params.id);
            this.$q.loading.hide();
          }).catch(error =>{
            this.$q.notify({type: 'negative', message: 'Não foi possível arquivar esta localização'});
            this.$q.loading.hide();
          });
        });
      },
      restoreLocalizacao: function(localizacaoId) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente ativar essa localizaçao?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          this.localizacaoService.restoreLocalizacao(this.$route.params.id, localizacaoId).then(() => {
            this.$q.loading.hide();
            this.$q.notify({type: 'positive', message: 'Endereço Ativado com sucesso'});
            this.listLocalizacoesByPessoa(this.$route.params.id)
          }).catch(error =>{
            this.$q.loading.hide();
            this.$q.notify({type: 'negative', message: 'Não foi possível restaurar a localização'});
          });
        });
      },
      listLocalizacoesByPessoa: function(pessoaId) {
        this.localizacaoService.listLocalizacoesByPessoa(pessoaId).then(localizacoes => {
          this.localizacoes = localizacoes;
          this.$q.loading.hide();
        }).catch(error =>{
          this.$q.notify({type: 'negative', message: 'Não foi possivel carragar as localizações'});
          this.$q.loading.hide();
        });
      },
      backAction: function () {
        this.$router.back();
      }
    },
    mounted(){
      this.getPessoa(this.$route.params.id);
      this.listContatos(this.$route.params.id);
      this.listLocalizacoesByPessoa(this.$route.params.id);
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
  .custom-header{
    border-top: 1px solid #c5c5c5;
  }
</style>

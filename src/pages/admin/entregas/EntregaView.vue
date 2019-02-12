<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Detalhes da entrega" navigation_type="back" @navigation_clicked="backAction"></toolbar>

    <div class="row space-end q-pa-md gutter-sm" v-if="entrega">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">

        <div class="row gutter-sm justify-center">

          <!-- CAMINHAO -->
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <q-card>
                <q-card-media overlay-position="top">

                  <!-- PLACA E NOME -->
                  <q-card-title slot="overlay">
                    {{entrega.caminhao.placa}}
                    {{entrega.caminhao.nome}}

                  </q-card-title>

                  <!-- FOTO CAMINHAO -->
                  <ap-image size="400x250" :file-name="entrega.caminhao.image_file_name" />
                </q-card-media>

                <q-list>

                  <!-- STATUS -->
                  <q-item>
                    <q-item-side :color="statusIconColor" icon="place" />
                    <q-item-main>
                      <q-item-tile label>{{entrega.status}}</q-item-tile>
                      <q-item-tile v-if="entrega.armazem" sublabel>{{entrega.armazem.nome}}</q-item-tile>
                    </q-item-main>
                    <q-item-side>
                      <q-btn class="float-right" dense icon="more_vert" round flat v-if="entrega.armazem">
                        <q-popover>
                          <q-list link class="no-border">
                            <q-item v-close-overlay @click.native="updateArmazem(entrega)">
                              <q-item-main label="Alterar Armazém"/>
                            </q-item>
                          </q-list>
                        </q-popover>
                      </q-btn>
                    </q-item-side>
                  </q-item>

                  <!-- MOTORISTA -->
                  <q-item v-if="entrega.motorista">
                    <q-item-side :avatar="makeUrl(entrega.motorista.image_file_name, '125x125')" />
                    <q-item-main>
                      <q-item-tile label>{{entrega.motorista.nome}}</q-item-tile>
                    </q-item-main>
                    <q-item-side>
                      <q-btn class="float-right" dense icon="more_vert" round flat >
                        <q-popover>
                          <q-list link class="no-border">
                            <q-item v-close-overlay @click.native="updateMotorista(entrega)">
                              <q-item-main label="Alterar Motorista"/>
                            </q-item>
                          </q-list>
                        </q-popover>
                      </q-btn>
                    </q-item-side>
                  </q-item>

                  <!-- PESO TOTAL -->
                  <q-item>
                    <q-item-side :color="pesoIconColor" icon="mdi-scale" />
                    <q-item-main>
                      <template v-if="entrega.total_peso_liquido > 0">
                        <q-item-tile label>
                          {{numeral(entrega.total_peso_liquido).format('0,0')}}
                          {{entrega.total_peso_unidade_medida_sigla}}
                        </q-item-tile>
                        <q-item-tile sublabel>
                          Bruto {{numeral(entrega.total_peso_bruto_produto).format('0,0')}}
                          Desconto {{numeral(entrega.total_peso_desconto).format('0,0')}}
                        </q-item-tile>
                      </template>
                      <template v-else>
                        <q-item-tile label>
                          {{numeral(entrega.caminhao.estimativa_carga).format('0,0')}}
                          {{entrega.caminhao.unidade_medida_sigla}}
                        </q-item-tile>
                        <q-item-tile sublabel>Estimativa da carga. Pesagem ainda não informada!</q-item-tile>
                      </template>
                    </q-item-main>
                  </q-item>

                  <!-- DATA -->
                  <q-item>
                    <q-item-side color="primary" icon="mdi-calendar" />
                    <q-item-main>
                      <q-item-tile label>
                        Carga
                        <abbr :title="moment(entrega.inicio_carregamento).format('lll')">
                          {{moment(entrega.inicio_carregamento).fromNow()}}
                        </abbr>
                      </q-item-tile>
                      <q-item-tile sublabel v-if="entrega.envio_armazem">
                        Enviado para armazem depois de
                        <abbr :title="moment(entrega.envio_armazem).format('lll')">
                          {{moment(entrega.envio_armazem).from(entrega.inicio_carregamento, true)}}
                        </abbr>.
                        <template v-if="entrega.entregue">
                          Demorou
                          <abbr :title="moment(entrega.entregue).format('lll')">
                            {{moment(entrega.entregue).from(entrega.envio_armazem, true)}}
                          </abbr>
                          para descarregar.
                        </template>
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-card>
            </div>

          </div>

          <!--INFO DOS NEGÓCIOS-->
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6" v-if="entrega.status !== 'Carregando'">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <q-card>
                <q-card-title>
                  Negócios
                  <q-btn slot="right" icon="more_vert" dense round flat >
                    <q-popover>
                      <q-list link class="no-border">
                        <q-item v-close-overlay @click.native="openSetNegociosQuantidadeModal(entrega)" v-if="entrega.negocios.length > 1 && entrega.status === 'Entregue'">
                          <q-item-main label="Definir Quantidades"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="novoNegocio(entrega)">
                          <q-item-main label="Adicionar Negócio"/>
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>
                </q-card-title>
                <q-list dense>
                  <template v-for="negocio in entrega.negocios">
                    <q-card-separator />
                    <q-list-header>
                      <div class="float-right">
                        <q-btn icon="more_vert" dense round flat>
                          <q-popover>
                            <q-list link class="no-border">
                              <q-item v-close-overlay @click.native="addNotaFiscal(negocio)" v-if="negocio.notas_fiscais_itens.length === 0">
                                <q-item-main label="Adicionar Nota Fiscal"/>
                              </q-item>
                              <q-item v-close-overlay @click.native="viewNegocio(negocio.negocio_cultura.negocio.id)">
                                <q-item-main label="Visualizar"/>
                              </q-item>
                              <q-item v-close-overlay @click.native="deleteNegocio(negocio.id)">
                                <q-item-main label="Excluir"/>
                              </q-item>
                            </q-list>
                          </q-popover>
                        </q-btn>
                      </div>

                      <span class="text-weight-bolder">
                          {{negocio.negocio_cultura.negocio.pessoa}}
                        </span>
                      <br />
                      <span class="text-weight-regular">
                          {{negocio.negocio_cultura.negocio.tipo}}
                          <template v-if="negocio.negocio_cultura.negocio.numero_contrato != ''">
                            {{negocio.negocio_cultura.negocio.numero_contrato}}
                          </template>
                          <br />
                          {{numeral(negocio.negocio_cultura.quantidade).format('0,0')}}
                          {{negocio.negocio_cultura.unidade_medida_sigla}} até
                          {{moment(negocio.negocio_cultura.prazo_entrega_final).format('DD/MMM/YY')}}
                        </span>

                    </q-list-header>
                    <q-item>
                      <q-item-side icon="mdi-scale" />
                      <q-item-main>
                        <q-item-tile label>
                          {{numeral(negocio.quantidade).format('0,0')}}
                          {{negocio.negocio_cultura.unidade_medida_sigla}}
                        </q-item-tile>
                        <q-item-tile sublabel>
                          Considerado no negócio
                        </q-item-tile>
                      </q-item-main>
                    </q-item>

                    <template v-for="(nfi, i) in negocio.notas_fiscais_itens" >

                      <!-- Numero -->
                      <q-item>
                        <q-item-side icon="mdi-receipt" />
                        <q-item-main>
                          <q-item-tile label>
                            Nota {{formataNumeroNotaFiscal(nfi.nota_fiscal.numero)}}
                          </q-item-tile>
                          <q-item-tile sublabel class="text-truncate">
                            {{nfi.nota_fiscal.nota_fiscal_serie.nome}}
                          </q-item-tile>
                        </q-item-main>
                        <q-item-side class="self-start" >
                          <q-btn icon="more_vert" dense round flat>
                            <q-popover>
                              <q-list link class="no-border">
                                <q-item v-close-overlay @click.native="updateNota(nfi)">
                                  <q-item-main label="Alterar nota"/>
                                </q-item>
                              </q-list>
                            </q-popover>
                          </q-btn>
                        </q-item-side>
                      </q-item>

                      <!-- EMISSAO -->
                      <q-item>
                        <q-item-side />
                        <q-item-main>
                          <q-item-tile label>
                            {{moment(nfi.nota_fiscal.emissao).format('DD/MMM/YYYY')}}
                          </q-item-tile>
                          <q-item-tile sublabel>
                            Emissão
                          </q-item-tile>
                        </q-item-main>
                      </q-item>

                      <!-- CFOP -->
                      <q-item>
                        <q-item-side />
                        <q-item-main>
                          <q-item-tile label>
                            {{nfi.cfop.numero}}
                          </q-item-tile>
                          <q-item-tile sublabel class="text-truncate">
                            {{nfi.cfop.descricao}}
                          </q-item-tile>
                        </q-item-main>
                      </q-item>

                      <!-- VALOR -->
                      <q-item class="q-mb-md">
                        <q-item-side />
                        <q-item-main>
                          <q-item-tile label>
                            R$ {{numeral(nfi.valor_total).format('0,0.00')}}
                          </q-item-tile>
                          <q-item-tile sublabel class="text-truncate">
                            ({{numeral(nfi.quantidade).format('0,0')}} x
                            R$ {{numeral(nfi.valor_unitario).format('0,0.00')}})
                          </q-item-tile>
                        </q-item-main>
                      </q-item>

                    </template>
                  </template>
                  <template v-if="entrega.negocios.length === 0">
                    <q-item>
                      <q-item-main>
                        <div class="list-empty">
                          <q-icon name="warning" />
                          <span>Adicione um negócio para poder continuar</span>
                        </div>
                      </q-item-main>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>

          </div>

        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <div class="row gutter-sm">

          <!--TALHOES-->
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
              <div class="row gutter-y-sm">
                <div class="col-12">
                  <q-card>

                    <!-- SAFRA -->
                    <q-card-media overlay-position="top">
                      <q-card-title slot="overlay">
                        {{entrega.safra_cultura.cultura.nome}}
                        {{entrega.safra_cultura.safra.ano_inicio}}/{{entrega.safra_cultura.safra.ano_fim}}
                        <q-btn class="float-right" dense icon="more_vert" round flat>
                          <q-popover>
                            <q-list link class="no-border">
                              <q-item v-close-overlay @click.native="addTalhaoPercentage()" v-if="entrega.safra_cultura.talhoes.length > 1">
                                <q-item-main label="Definir Percentuais"/>
                              </q-item>
                              <q-item v-close-overlay @click.native="addTalhao(entrega)">
                                <q-item-main label="Adicionar Talhão"/>
                              </q-item>
                            </q-list>
                          </q-popover>
                        </q-btn>
                      </q-card-title>

                      <!-- IMAGEM CULTURA -->
                      <ap-image size="400x250" :file-name="entrega.safra_cultura.cultura.image_file_name" />
                    </q-card-media>

                    <q-list dense>

                      <!-- TALHOES -->
                      <q-item v-for="sct in entrega.safra_cultura.talhoes" :key="sct.safra_cultura_talhao.id">

                        <!-- IMAGEM TALHAO -->
                        <q-item-side :image="makeUrl(sct.talhao.image_file_name, '200x125')" />

                        <!-- TEXTO TALHAO -->
                        <q-item-main>
                          <q-item-tile label>{{sct.talhao.area}} - {{sct.talhao.nome}}</q-item-tile>
                          <q-item-tile sublabel>
                            <template v-if="sct.quantidade">
                              {{ numeral(sct.quantidade).format('0,0') }}
                              {{ entrega.safra_cultura.view_unidade_medida.sigla }}
                            </template>
                            ({{sct.percentual}} %)
                          </q-item-tile>
                        </q-item-main>

                        <!-- BOTAO EXCLUIR -->
                        <q-item-side class="self-start" v-if="entrega.safra_cultura.talhoes.length > 1">
                          <q-btn icon="more_vert" dense round flat>
                            <q-popover>
                              <q-list link class="no-border">
                                <q-item v-close-overlay @click.native="deleteTalhao(sct.id)">
                                  <q-item-main label="Excluir"/>
                                </q-item>
                              </q-list>
                            </q-popover>
                          </q-btn>

                        </q-item-side>

                      </q-item>
                    </q-list>
                  </q-card>
                </div>



              </div>
            </div>
          </div>

          <!-- PESAGENS -->
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6" v-if="entrega.pesagens">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3" v-for="(pesagem, index) in entrega.pesagens" :key="pesagem.id">
              <q-card>

                <q-card-title>
                  Ticket {{pesagem.numero_ticket}}

                  <span slot="subtitle">
                      {{moment(pesagem.emissao).format('LLL')}}
                    </span>

                  <q-btn slot="right" icon="more_vert" dense round flat>
                    <q-popover>
                      <q-list link class="no-border">
                        <q-item v-close-overlay @click.native="deletePesagem(pesagem.id)" v-if="entrega.pesagens.length > 1">
                          <q-item-main label="Excluir"/>
                        </q-item>
                      </q-list>
                    </q-popover>
                  </q-btn>

                </q-card-title>

                <q-card-separator />

                <q-list dense>

                  <!-- PESO BRUTO -->
                  <q-list-header>Pesagem Caminhão</q-list-header>

                  <q-item>
                    <q-item-side icon="mdi-truck" />
                    <q-item-main>
                      <q-item-tile label>
                        {{numeral(pesagem.peso_bruto_produto).format('0,0')}}
                        {{pesagem.unidade_medida_sigla}}
                        <span class="float-right">
                            {{numeral(pesagem.peso_bruto_produto_convertido).format('0,0')}}
                            {{entrega.safra_cultura.view_unidade_medida.sigla}}
                          </span>
                      </q-item-tile>
                      <q-item-tile sublabel>
                        Peso Bruto ({{numeral(pesagem.peso_bruto_total).format('0,0')}} - {{numeral(pesagem.peso_tara).format('0,0')}})
                      </q-item-tile>
                    </q-item-main>
                  </q-item>

                  <!-- CLASSIFICACOES -->
                  <q-list-header>Descontos</q-list-header>

                  <q-item v-for="(classificacao, i) in pesagem.classificacoes" :key="classificacao.id">
                    <q-item-side color="red" :icon="(i==0)?'mdi-ruler':''" />
                    <q-item-main>

                      <q-item-tile label>
                        {{numeral(classificacao.desconto).format('0,0')}}
                        {{pesagem.unidade_medida_sigla}}
                        <span class="float-right">
                            {{numeral(classificacao.desconto_convertido).format('0,0')}}
                            {{entrega.safra_cultura.view_unidade_medida.sigla}}
                          </span>
                      </q-item-tile>
                      <q-item-tile sublabel>
                        {{numeral(classificacao.verificado).format('0,0.00')}}%
                        {{classificacao.nome}}
                      </q-item-tile>

                    </q-item-main>
                  </q-item>

                  <!-- DESCONTO -->
                  <q-item>
                    <q-item-side color="red" icon="mdi-delete" />
                    <q-item-main>
                      <q-item-tile label class="text-weight-bold">
                        {{numeral(pesagem.peso_desconto).format('0,0')}}
                        {{pesagem.unidade_medida_sigla}}
                        <span class="float-right">
                            {{numeral(pesagem.peso_desconto_convertido).format('0,0')}}
                            {{entrega.safra_cultura.view_unidade_medida.sigla}}
                          </span>
                      </q-item-tile>
                      <q-item-tile sublabel>
                        Total Descontos
                      </q-item-tile>
                    </q-item-main>
                  </q-item>

                  <!-- LIQUIDO -->
                  <q-list-header>Peso Líquido Final</q-list-header>
                  <q-item>
                    <q-item-side icon="mdi-scale" color="green" />
                    <q-item-main>
                      <q-item-tile label class="text-weight-bold">
                        {{numeral(pesagem.peso_liquido).format('0,0')}}
                        {{pesagem.unidade_medida_sigla}}
                        <span class="float-right">
                            {{numeral(pesagem.peso_liquido_convertido).format('0,0')}}
                            {{entrega.safra_cultura.view_unidade_medida.sigla}}
                          </span>
                      </q-item-tile>
                      <q-item-tile sublabel>
                        Líquido
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </div>

        </div>
      </div>


      <!--PAGE STICKY BUTTOMS-->
      <q-page-sticky position="bottom-right"
                     :offset="$q.screen.lt.sm ? [0, 0] : [35, 35]"
                     :expand="$q.screen.lt.sm" :class="$q.screen.lt.sm ? 'full-width' : ''">
        <q-btn
          color="deep-orange"
          icon="mdi-share"
          label="Enviar Para Armazem" class="full-width q-pa-md"
          @click="sendToArmazem(entrega)"
          v-if="entrega.status === 'Carregando'"
        />
        <q-btn
          color="deep-orange"
          icon="mdi-scale"
          label="Informar Pesagem"
          @click="newPesagem(entrega)" class="full-width q-pa-md"
          v-if="entrega.status !== 'Carregando'"
        />
      </q-page-sticky>

    </div>

    <!--EMPTY LIST-->
    <div class="col-12" v-if="!entrega">
      <ap-no-results />
    </div>

    <!--MODAL ENVIAR CARGA-->
    <send-entrega-modal ref="sendEntregaModal"/>

    <!--MODAL INFORMAR PESAGEM-->
    <new-pesagem-modal ref="newPesagemModal"/>

    <!--MODAL INFORMAR PORCENTAGEM DOS TALHOES-->
    <add-talhao-percentage-modal ref="addTalhaoPercentageModal"/>

    <!--MODAL INFORMAR QUANTIDADE NEGÓCIOS-->
    <set-negocios-quantidade-modal ref="setNegociosQuantidadeModal"/>

    <!--MODAL ADD TALHAO-->
    <new-entrega-modal ref="entregaModal"/>

  </custom-page>
</template>

<script>

  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import pesagemService from 'assets/js/service/entrega/PesagemService'
  import entregaService from 'assets/js/service/entrega/EntregaService'
  import sendEntregaModal from 'components/entrega/SendEntregaModal'
  import newPesagemModal from 'components/entrega/NewPesagemModal'
  import addTalhaoPercentageModal from 'components/entrega/AddTalhaoPercentageModal'
  import setNegociosQuantidadeModal from 'components/entrega/SetNegociosQuantidadeModal'
  import newEntregaModal from 'components/entrega/NewEntregaModal'
  import apNoResults from 'components/ApNoResults'
  import apImage from 'components/ApImage'
  import agroUtils from 'assets/js/AgroUtils'

  export default {
    name: "carga-view",
    components: {
      apNoResults,
      toolbar,
      customPage,
      newPesagemModal,
      newEntregaModal,
      sendEntregaModal,
      addTalhaoPercentageModal,
      setNegociosQuantidadeModal,
      apImage,
    },
    data () {
      return {
        carga: true,
        entregaView: null,
        entrega: null,
      }
    },
    watch: {
    },
    computed: {
      statusIconColor: function() {
        if (this.entrega.status == 'No Armazem') {
          return 'warning'
        }
        if (this.entrega.status == 'Entregue') {
          return 'primary'
        }
        return 'negative'
      },
      pesoIconColor: function () {
        if (this.entrega.total_peso_liquido > 0) {
          return 'primary'
        }
        return 'red'
      }
    },
    methods: {
      // TODO: substituir essa gambiarra pela funcao PAD do Lodash
      formataNumeroNotaFiscal: function (numero) {
        return this.$_.padStart(numero, 8, '0');
      },
      makeUrl: function (image_file_name, size) {
        return agroUtils.image.makeUrl(image_file_name, size)
      },
      sendToArmazem: function(entrega){
        this.$refs.sendEntregaModal.openModal('sendEntrega', entrega)
      },
      addNotaFiscal: function(negocio){
        this.$refs.sendEntregaModal.openModal('addNota', negocio)
      },
      updateNota: function(notaFiscalItem){
        this.$refs.sendEntregaModal.openModal('updateNota', notaFiscalItem)
      },
      novoNegocio: function(entrega){
        this.$refs.sendEntregaModal.openModal('novoNegocio', entrega)
      },
      updateMotorista: function(entrega){
        this.$refs.sendEntregaModal.openModal('updateMotorista', entrega)
      },
      updateArmazem: function(entrega){
        this.$refs.sendEntregaModal.openModal('updateArmazem', entrega)
      },
      newPesagem: function(){
        if(this.entrega.negocios.length === 0){
          this.$q.dialog({
            title: 'Atenção',
            message: 'Adicione um negócio para poder continuar',
            color: 'primary'
          });
          return;
        }
        this.$refs.newPesagemModal.openModal(this.entrega)
      },

      // TODO passar o id do caminhao no addTalhao
      addTalhao: function(entrega){
        this.$refs.entregaModal.openModal(entrega)
      },
      addTalhaoPercentage: function(){
        this.$refs.addTalhaoPercentageModal.openModal(this.entrega)
      },
      openSetNegociosQuantidadeModal(entrega){
        this.$refs.setNegociosQuantidadeModal.openModal(entrega);
      },
      viewNegocio(id){
        this.$router.push({name: 'negocio_view', params: {id:id}});
      },
      deleteTalhao: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar este talhão?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          entregaService.delteTalhaoOfEntrega(this.entrega.id, id).then(response => {
            if(response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Talhão removido com sucesso'});
              this.$q.loading.hide();
              this.getEntrega()
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            this.$q.loading.hide();
          });
        }).catch(()=>{});
      },
      deleteNegocio: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          entregaService.delteNegocioOfEntrega(this.entrega.id, id).then(response => {
            if(response.status === 200) {
              this.$q.notify({type: 'positive', message: 'Negócio removido com sucesso'});
              this.getEntrega()
            }
            this.$q.loading.hide();
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            this.$q.loading.hide();
          });
        }).catch(()=>{});
      },
      deletePesagem: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta pesagem?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          this.$q.loading.show();
          pesagemService.deletePesagem(this.entrega.id, id).then(response => {
            this.$q.loading.hide();
            this.getEntrega()
          }).catch(error => {
            this.$q.loading.hide();
          })
        }).catch(()=>{});
      },
      getEntrega: function(){
        this.$q.loading.show();
        entregaService.getEntregaById(this.$route.params.id).then(response => {
          this.$q.loading.hide();
          this.entrega = response.data;
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
      backAction: function () {
        this.$router.back();
      },
    },
    mounted () {
      this.getEntrega()
      this.$root.$on('refreshEntregaView', () => {
        this.getEntrega()
      });
    },
  }
</script>
<style scoped>
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }

  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }
  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
  }
  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }
</style>

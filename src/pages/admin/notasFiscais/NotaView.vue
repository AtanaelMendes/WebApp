<template>
  <custom-page isChild noScroll style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">

      <template slot="action_itens">
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item @click.native="">
                <q-item-main label="Danfe"/>
              </q-item>
              <q-item @click.native="">
                <q-item-main label="Email"/>
              </q-item>
              <q-item @click.native="">
                <q-item-main label="Cancelar" />
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>

    </toolbar>

    <div class="row q-pa-md gutter-sm" v-if="notaFiscal">
      <div class="col-12">

        <div class="row text-weight-light q-body-1 q-py-xs">
            Destinatário / Remetente
        </div>
        <q-card>

          <div class="row ">

            <!--NOME RAZAO SOCIAL-->
            <div class="col-7 q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Nome/Razão Social
              </div>
              <div class="ellipsis">
                {{notaFiscal.localizacao_destinatario.razao_social}}
              </div>
            </div>

            <!--CPF / CNPJ-->
            <div class="col-3 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                CPF / CNPJ
              </div>
              <div class="ellipsis text-center" v-if="notaFiscal.localizacao_destinatario.cpf">
                {{formatCPF(notaFiscal.localizacao_destinatario.cpf)}}
              </div>
              <div class="ellipsis text-center" v-if="notaFiscal.localizacao_destinatario.cnpj">
                {{formatCNPJ(notaFiscal.localizacao_destinatario.cnpj)}}
              </div>
            </div>

            <!--DATA EMISSAO-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Data Emissão
              </div>
              <div class="ellipsis text-center">
                {{moment(notaFiscal.emissao).format('L')}}
              </div>
            </div>
          </div>

          <div class="row borda-superior">

            <!--ENDERECO-->
            <div class="col-6 q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Endereço
              </div>
              <div class="ellipsis">
                {{notaFiscal.localizacao_destinatario.endereco}},
                {{notaFiscal.localizacao_destinatario.numero}},
                {{notaFiscal.localizacao_destinatario.complemento}}
              </div>
            </div>

            <!--BAIRRO DISTRITO-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Bairro / Distrito
              </div>
              <div class="ellipsis text-center">
                {{notaFiscal.localizacao_destinatario.bairro}}
              </div>
            </div>

            <!--CEP-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                CEP
              </div>
              <div class="ellipsis text-center">
                {{formatCEP(notaFiscal.localizacao_destinatario.cep)}}
              </div>
            </div>

            <!--ENTRADA SAIDA-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Data Entrada/Saída
              </div>
              <div class="ellipsis text-center">
                {{moment(notaFiscal.saida).format('L')}}
              </div>
            </div>

          </div>

          <div class="row borda-superior">

            <!--MUNICIPIO-->
            <div class="col-5 q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Município
              </div>
              <div class="ellipsis">
                {{notaFiscal.localizacao_destinatario.cidade.nome}}
              </div>
            </div>

            <!--ESTADO SIGLA-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                UF
              </div>
              <div class="ellipsis text-center">
                {{notaFiscal.localizacao_destinatario.estado.sigla}}
              </div>
            </div>

            <!--FONE FAX-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Fone / Fax
              </div>
              <div class="ellipsis text-center">
                {{notaFiscal.localizacao_destinatario.fone}}
              </div>
            </div>

            <!--INSCRICAO ESTADUAL-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Inscrição Estadual
              </div>
              <div class="ellipsis text-center">
                {{notaFiscal.localizacao_destinatario.inscricao_estadual}}
              </div>
            </div>

            <!--HORA ENTRADA SAIDA-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Hora da Saída/Entrada
              </div>
              <div class="ellipsis text-center">
                {{moment(notaFiscal.saida).format('LTS')}}
              </div>
            </div>

          </div>

        </q-card>

        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
          Cálculo do Imposto
        </div>
        <q-card>
          <div class="row">

            <!--BASE CALCULO ICMS-->
            <div class="col-1 q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Base de Calc. do ICMS
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--VALO ICMS-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do ICMS
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--BASE CALCULO ICMS ST-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Base Calc. ICMS ST
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!-- VALOR DO ICMS SUBST-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do ICMS SUBST
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--VALOR IMPOSTO IMPORTACAO-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V IMP Importação
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!-- VALOR ICMS UF REMET-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V ICMS UF REMET
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!-- V FCP UF DEST-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V FCP UF DEST
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!-- VALOR DO PIS-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do PIS
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!-- VALOR TOTAL PRODUTO-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V Total Produto
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

          </div>

          <div class="row borda-superior">

            <!--VALOR DO FRETE-->
            <div class="col-1 q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Valor do Frete
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--VALOR SEGURO-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do Seguro
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--DESCONTO-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Desconto
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--OUTRAS DESPESAS-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Outras Despesas
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--VALOR TOTAL IPI-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor Total IPI
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--V ICMS UF DEST-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V ICMS UF DEST
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!-- V TOT TRIB-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V TOT TRIB
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--VALOR DO COFINS-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do COFINS
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

            <!--VALOR TOTAL DA NOTA-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V Total Nota
              </div>
              <div class="ellipsis text-right">
                0,0
              </div>
            </div>

          </div>
        </q-card>

        <!--TRANSPORTE E VOLUMES-->
        <template v-for="transporte in notaFiscal.transportes">
          <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
            Transportador / Volumes Transportados
          </div>
          <q-card>
            <div class="row">

              <!--NOME RAZAO SOCIAL-->
              <div class="col-4 q-pa-xs">
                <div class="text-faded q-caption ellipsis">
                  Nome / Razão Social
                </div>
                <div class="ellipsis">
                  {{transporte.razao_social}}
                </div>
              </div>

              <!--FRETE-->
              <div class="col-2 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Frete
                </div>
                <div class="ellipsis">
                  {{notaFiscal.frete}}
                </div>
              </div>

              <!--CODIGO ANTT-->
              <div class="col-2 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Código ANTT
                </div>
                <div class="ellipsis text-center">
                  {{transporte.caminhao_antt}}
                </div>
              </div>

              <!-- PLACA DO VEICULO-->
              <div class="col-1 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Placa do Veículo
                </div>
                <div class="ellipsis text-center">
                  {{transporte.caminhao_placa}}
                </div>
              </div>

              <!-- CAMINHAO UF-->
              <div class="col-1 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  UF
                </div>
                <div class="ellipsis text-center">
                  {{transporte.caminhao_estado.sigla}}
                </div>
              </div>

              <!-- CNPJ / CPF-->
              <div class="col-2 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  CNPJ / CPF
                </div>
                <div class="ellipsis text-center" v-if="transporte.cnpj">
                  {{formatCNPJ(transporte.cnpj)}}
                </div>
                <div class="ellipsis text-center" v-if="transporte.cpf">
                  {{formatCPF(transporte.cpf)}}
                </div>
              </div>

            </div>

            <div class="row borda-superior">

              <!--ENDERECO-->
              <div class="col-5 q-pa-xs">
                <div class="text-faded q-caption ellipsis">
                  Endereço
                </div>
                <div class="ellipsis">
                  {{transporte.endereco}}
                </div>
              </div>

              <!--MUNICIPIO-->
              <div class="col-3 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Município
                </div>
                <div class="ellipsis text-center">
                  {{transporte.municipio.nome}}
                </div>
              </div>

              <!--UF-->
              <div class="col-1 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  UF
                </div>
                <div class="ellipsis text-center">
                  {{transporte.estado.sigla}}
                </div>
              </div>

              <!--INSCRICAO ESTADUAL-->
              <div class="col-3 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Inscração Estadual
                </div>
                <div class="ellipsis text-center">
                  {{transporte.inscricao_estadual}}
                </div>
              </div>

            </div>

            <!--VOLUMES-->
            <div class="row borda-superior" v-for="volume in transporte.volumes">

              <!--QUANTIDADE-->
              <div class="col-2 q-pa-xs">
                <div class="text-faded q-caption ellipsis">
                  Quantidade
                </div>
                <div class="ellipsis text-right">
                  {{numeral(volume.quantidade).format('0,0')}}
                </div>
              </div>

              <!--ESPECIE-->
              <div class="col-2 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Espécie
                </div>
                <div class="ellipsis text-center">
                  {{volume.especie}}
                </div>
              </div>

              <!--MARCA-->
              <div class="col-2 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Marca
                </div>
                <div class="ellipsis text-center">
                  {{volume.marca}}
                </div>
              </div>

              <!--NUMERACAO-->
              <div class="col-2 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Numeração
                </div>
                <div class="ellipsis text-right">
                  {{volume.numeracao}}
                </div>
              </div>

              <!--PESOBRUTO-->
              <div class="col-2 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Peso Bruto
                </div>
                <div class="ellipsis text-right">
                  {{numeral(volume.peso_bruto).format('0,0')}}
                </div>
              </div>

              <!--PESO LIQUIDO-->
              <div class="col-2 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  Peso Líquido
                </div>
                <div class="ellipsis text-right">
                  {{numeral(volume.peso_liquido).format('0,0')}}
                </div>
              </div>

            </div>
          </q-card>
        </template>

        <!--PRODUTOS / SERVICOS-->
        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
          Dados dos Produtos / Serviços
        </div>
        <q-card>
          <div class="row" v-for="produtoServico in notaFiscal.nota_fiscal_itens">

            <!--CODIGO PRODUTO-->
            <div class="col-1 q-pa-xs">
              <div class="text-faded q-caption">
                Código Produto
              </div>
              <div class="ellipsis text-center">
                {{produtoServico.codigo}}
              </div>
            </div>

            <!--DESCRICAO PRODUTO-->
            <div class="col-3 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Descrição Produto/Serviço
              </div>
              <div class="ellipsis">
                {{produtoServico.produto}}
              </div>
            </div>

            <!--NCM / SH-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                NCM / SH
              </div>
              <div class="ellipsis">
                {{produtoServico.ncm}}
              </div>
            </div>

            <!--O/CST-->
            <div class="col-1 q-pa-xs borda-esquerda">

              <div class="text-faded q-caption ellipsis">
                O/CST
              </div>
              <div class="ellipsis">
                260
              </div>
            </div>

            <!--CFOP-->
            <div class="col-1 q-pa-xs borda-esquerda">

              <div class="text-faded q-caption ellipsis">
                CFOP
              </div>
              <div class="ellipsis">
                {{produtoServico.cfop.numero}}
              </div>
            </div>

            <!--UNIDADE/ QUANTIDADE-->
            <div class="col-1 q-pa-xs borda-esquerda">

              <div class="text-faded q-caption ellipsis">
                Unidade/Quantidade
              </div>
              <div class="ellipsis">
                {{produtoServico.unidade_medida.sigla}}
                {{produtoServico.quantidade}}
              </div>
            </div>

            <!--VALOR  UNITARIO-->
            <div class="col-2 q-pa-xs borda-esquerda">

              <div class="text-faded q-caption ellipsis">
                Valor Unit
              </div>
              <div class="ellipsis">
                {{produtoServico.valor_unitario}} -
                {{numeral(produtoServico.valor_unitario).format('0,0.0000')}}
              </div>
            </div>

            <!--VALOR TOTAL-->
            <div class="col-1 q-pa-xs borda-esquerda">

              <div class="text-faded q-caption ellipsis">
                Valor Total
              </div>
              <div class="ellipsis">
                {{numeral(produtoServico.valor_total).format('0,0.0000')}}
              </div>
            </div>

            <!--BASE CALCULO ICMS-->
            <div class="col-1 q-pa-xs borda-esquerda">

              <div class="text-faded q-caption">
                Base Cálculo ICMS
              </div>
              <div class="ellipsis">
                {{numeral(produtoServico.item).format('0,0.0000')}}
              </div>
            </div>

          </div>
        </q-card>
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import NotaFiscalService from '../../../assets/js/service/NotaFiscalService'
  export default {
    name: "nota-View",
    components: {
      toolbar,
      customPage,
    },
    watch: { },
    data(){
      return{
        notaFiscalService: new NotaFiscalService(),
        notaFiscal: null,
        isEmptyList:null,
      }
    },
    methods: {
      formatCEP(cpf){
        return cpf.replace(/(\d{5})(\d{3})/, "$1-$2");
      },
      formatCPF(cpf){
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      },
      formatCNPJ(cnpj){
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
      },
      getNotaFiscalById: function(notaFiscalId) {
        this.$q.loading.show();
        this.notaFiscalService.getNotaFiscalById(notaFiscalId).then(response => {
          this.$q.loading.hide();
          this.notaFiscal = response;
          this.isEmptyList = this.notaFiscal === null;
        })
      },
      editCulturaClassificacao: function(notaFiscalId){
        this.$refs.editCulturaClassificacaoModal.openModal(notaFiscalId)
      },
      deleteNotaFiscalClassificacao: function(notaFiscalId){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja excluir esta cultura classificação?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(() =>{
          this.$q.loading.show();
          this.culturaClassificacaoService.deleteCulturaClassificacao(culturaClassificacaoId).then(response => {
            this.$q.loading.hide();
            this.getCulturasClassificacao(this.$route.params.id);
            this.$q.notify({type: 'positive', message: 'Cultura classificação excluída com sucesso.'});
          }).catch(error =>{
            this.$q.loading.hide();
            this.$q.notify({type: 'negative', message: 'Não foi possível excluir essa cultura classificação'});
          })
        })
      },
      backAction: function () {
        this.$router.back()
      }
    },
    mounted(){
      this.getNotaFiscalById(this.$route.params.id);
      this.$root.$on('refreshNotaFiscalView', () => {
        // this.getCulturasClassificacao(this.$route.params.id);
      });
    }
  }
</script>

<style>

  .borda-esquerda {
    border-left: 1px solid rgba(0,0,0,0.14);
  }

  .borda-superior {
    border-top: 1px solid rgba(0,0,0,0.14);
  }

</style>

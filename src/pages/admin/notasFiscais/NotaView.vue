<template>
  <custom-page isChild noScroll style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">

      <template slot="action_itens">
        <q-btn flat round dense icon="more_vert" >
          <q-popover anchor="bottom left">
            <q-list link>
              <q-item v-close-overlay @click.native="nfeCriar()">
                <q-item-side icon="folder" color="primary" />
                <q-item-main label="Criar"/>
              </q-item>
              <q-item v-close-overlay @click.native="nfeAssinar()">
                <q-item-side icon="folder" color="primary" />
                <q-item-main label="Assinar"/>
              </q-item>
              <q-item v-close-overlay @click.native="nfeEnviarSincrono()">
                <q-item-side icon="folder" color="primary" />
                <q-item-main label="Enviar"/>
              </q-item>
              <q-item v-close-overlay @click.native="nfeDanfe()">
                <q-item-side icon="folder" color="primary" />
                <q-item-main label="Danfe"/>
              </q-item>
              <q-item-separator  />
              <q-item v-close-overlay @click.native="nfeConsultar()">
                <q-item-side icon="info" color="info" />
                <q-item-main label="Consultar"/>
              </q-item>
              <q-item v-close-overlay @click.native="nfeMail()">
                <q-item-side icon="mail" color="info" />
                <q-item-main label="E-mail"/>
              </q-item>
              <q-item-separator  />
              <q-item v-close-overlay @click.native="nfeCancelar()">
                <q-item-side icon="folder" color="negative" />
                <q-item-main label="Cancelar"/>
              </q-item>
              <q-item v-close-overlay @click.native="nfeInutilizar()">
                <q-item-side icon="folder" color="negative" />
                <q-item-main label="Inutilizar"/>
              </q-item>
              <q-item-separator  />
              <q-item v-close-overlay @click.native="nfeXml()">
                <q-item-side icon="folder" color="negative" />
                <q-item-main label="XML"/>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>

    </toolbar>

    <div class="row q-pa-md gutter-sm space-end">
      <div class="col-12" v-if="notaFiscal">

        <!--EMITENTE-->
        <q-card class="q-mb-sm">
          <div class="row">
            <div class="col-lg-5 col-sm-12 q-pa-xs ">
              <div class="text-faded q-caption ellipsis text-center">
                Identificação Emitente
              </div>
              <div class="ellipsis text-center">
                <p>{{notaFiscal.nota_fiscal_serie.pessoa.nome}}</p>
              </div>

              <div class="row q-pb-sm">
                <div class="col-12 text-center" v-for="contato in notaFiscal.nota_fiscal_serie.pessoa.contatos">
                  <div class="row">
                    <div class="col-12" v-for="telefone in contato.telefones">
                      {{telefone.numero}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12 text-center" v-for="localizacao in notaFiscal.nota_fiscal_serie.pessoa.localizacoes">
                  {{localizacao.endereco}}, {{localizacao.numero}} - {{localizacao.complemento}} - {{localizacao.cep}},
                  {{localizacao.cidade.nome}} - {{localizacao.cidade.estado.sigla}}
                </div>
              </div>
            </div>

            <div class="col-xs-4 col-lg-2 borda-superior borda-esquerda q-pa-xs">
              <div class="q-title text-center">
                <q-btn icon-right="print" label="danfe" flat dense  @click="nfeDanfe()" />
              </div>
              <p class="text-faded q-caption text-center">
                Documento Auxiliar da Nota Fiscal Eletrônica
              </p>
              <div class="q-caption row">
                <div class="col-8">
                  0 - Entrada<br/>
                  1 - Saída
                </div>
                <div class="col-4 q-title text-center all-border">
                  <span v-if="notaFiscal.is_saida">1</span>
                  <span v-if="!notaFiscal.is_saida">0</span>
                </div>
              </div>

              <div class="row">
                <div class="col-12 text-center">
                  Nº {{notaFiscal.numero}}
                </div>
                <div class="col-12 text-center">
                  Série {{notaFiscal.nota_fiscal_serie.serie}}
                </div>
              </div>

            </div>
            <div class="col-xs-8 col-lg-5 borda-superior borda-esquerda">
              <div class="row q-pa-xs">
                <div class="col-12 text-center">
                </div>
              </div>
              <div class="row borda-superior q-pa-xs">
                <div class="col-12">
                  <div class="text-faded q-caption ellipsis">
                    Chave de Acesso
                  </div>
                  <div class="row">
                    <div class="col-12 text-center ellipsis">
                      {{notaFiscal.chave}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row q-pa-xs borda-superior">
                <div class="col-12 text-center ellipsis">
                  Consulta de auteticidade no portal nacional da NF-e www.nfe.fazenda.gov.br/portal ou no site da sefaz autorizada
                </div>
              </div>

            </div>
          </div>

          <div class="row borda-superior">
            <div class="col-7 q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Natureza de Operação
              </div>
              <div class="text-center">
                {{notaFiscal.natureza}}
              </div>
            </div>
            <div class="col-5 borda-esquerda q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Protocolo de Autorização de uso
              </div>
              <div class="text-center">
                {{notaFiscal.protocolo_autorizacao}}
                <!--{{notaFiscal.status}}-->
              </div>
            </div>
          </div>

          <div class="row borda-superior">
            <div class="col-4 q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Inscrição Estadual
              </div>
              <div class="text-center">
                {{notaFiscal.nota_fiscal_serie.pessoa.inscricao_estadual}}
              </div>
            </div>
            <div class="col-4 borda-esquerda q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Inscrição Estadual do SUBST. TRIBUT.
              </div>
              <div class="text-center">
                ??????
              </div>
            </div>
            <div class="col-4 borda-esquerda q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                CNPJ / CPF
              </div>
              <div class="text-center">
                <span v-if="notaFiscal.nota_fiscal_serie.pessoa.cpf">
                  {{formatCPF(notaFiscal.nota_fiscal_serie.pessoa.cpf)}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_serie.pessoa.cnpj">
                  {{formatCPF(notaFiscal.nota_fiscal_serie.pessoa.cnpj)}}
                </span>
              </div>
            </div>
          </div>
        </q-card>

        <!--DESTINATARIO / REMETENTE-->
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
                {{notaFiscal.nota_fiscal_localizacao_destinatario.razao_social}}
              </div>
            </div>

            <!--CPF / CNPJ-->
            <div class="col-3 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                CPF / CNPJ
              </div>
              <div class="ellipsis text-center" v-if="notaFiscal.nota_fiscal_localizacao_destinatario.cpf">
                {{formatCPF(notaFiscal.nota_fiscal_localizacao_destinatario.cpf)}}
              </div>
              <div class="ellipsis text-center" v-if="notaFiscal.nota_fiscal_localizacao_destinatario.cnpj">
                {{formatCNPJ(notaFiscal.nota_fiscal_localizacao_destinatario.cnpj)}}
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
                <span v-if="notaFiscal.nota_fiscal_localizacao_destinatario">
                  {{notaFiscal.nota_fiscal_localizacao_destinatario.endereco}},
                  {{notaFiscal.nota_fiscal_localizacao_destinatario.numero}},
                  {{notaFiscal.nota_fiscal_localizacao_destinatario.complemento}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_entrega">
                  {{notaFiscal.nota_fiscal_localizacao_entrega.endereco}},
                  {{notaFiscal.nota_fiscal_localizacao_entrega.numero}},
                  {{notaFiscal.nota_fiscal_localizacao_entrega.complemento}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_retirada">
                  {{notaFiscal.nota_fiscal_localizacao_retirada.endereco}},
                  {{notaFiscal.nota_fiscal_localizacao_retirada.numero}},
                  {{notaFiscal.nota_fiscal_localizacao_retirada.complemento}}
                </span>
              </div>
            </div>

            <!--BAIRRO DISTRITO-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Bairro / Distrito
              </div>
              <div class="ellipsis text-center">
                <span v-if="notaFiscal.nota_fiscal_localizacao_entrega">
                  {{notaFiscal.nota_fiscal_localizacao_entrega.bairro}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_retirada">
                  {{notaFiscal.nota_fiscal_localizacao_retirada.bairro}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_destinatario">
                  {{notaFiscal.nota_fiscal_localizacao_destinatario.bairro}}
                </span>
              </div>
            </div>

            <!--CEP-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                CEP
              </div>
              <div class="ellipsis text-center">
                <span v-if="notaFiscal.nota_fiscal_localizacao_destinatario">
                  {{formatCEP(notaFiscal.nota_fiscal_localizacao_destinatario.cep)}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_retirada">
                  {{formatCEP(notaFiscal.nota_fiscal_localizacao_retirada.cep)}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_entrega">
                  {{formatCEP(notaFiscal.nota_fiscal_localizacao_entrega.cep)}}
                </span>
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
                <span v-if="notaFiscal.nota_fiscal_localizacao_destinatario">
                  {{notaFiscal.nota_fiscal_localizacao_destinatario.cidade.nome}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_entrega">
                  {{notaFiscal.nota_fiscal_localizacao_entrega.cidade.nome}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_retirada">
                  {{notaFiscal.nota_fiscal_localizacao_retirada.cidade.nome}}
                </span>
              </div>
            </div>

            <!--ESTADO SIGLA-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                UF
              </div>
              <div class="ellipsis text-center">
                <span v-if="notaFiscal.nota_fiscal_localizacao_destinatario">
                  {{notaFiscal.nota_fiscal_localizacao_destinatario.estado.sigla}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_entrega">
                  {{notaFiscal.nota_fiscal_localizacao_entrega.estado.sigla}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_retirada">
                  {{notaFiscal.nota_fiscal_localizacao_retirada.estado.sigla}}
                </span>
              </div>
            </div>

            <!--FONE FAX-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Fone / Fax
              </div>
              <div class="ellipsis text-center">
                <span v-if="notaFiscal.nota_fiscal_localizacao_destinatario">
                  {{notaFiscal.nota_fiscal_localizacao_destinatario.fone}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_entrega">
                  {{notaFiscal.nota_fiscal_localizacao_entrega.fone}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_retirada">
                  {{notaFiscal.nota_fiscal_localizacao_retirada.fone}}
                </span>
              </div>
            </div>

            <!--INSCRICAO ESTADUAL-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Inscrição Estadual
              </div>
              <div class="ellipsis text-center">
                <span v-if="notaFiscal.nota_fiscal_localizacao_destinatario">
                  {{notaFiscal.nota_fiscal_localizacao_destinatario.inscricao_estadual}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_entrega">
                  {{notaFiscal.nota_fiscal_localizacao_entrega.inscricao_estadual}}
                </span>
                <span v-if="notaFiscal.nota_fiscal_localizacao_retirada">
                  {{notaFiscal.nota_fiscal_localizacao_retirada.inscricao_estadual}}
                </span>
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
                Base Calc. ICMS
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_icms_base_calculo).format('0,0.00')}}
              </div>
            </div>

            <!--VALO ICMS-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do ICMS
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_icms).format('0,0.00')}}
              </div>
            </div>

            <!--BASE CALCULO ICMS ST-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Base Calc. ICMS ST
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_icms_st_base_calculo).format('0,0.00')}}
              </div>
            </div>

            <!-- VALOR DO ICMS SUBST-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do ICMS SUBST
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_icms_st).format('0,0.00')}}
              </div>
            </div>

            <!--VALOR IMPOSTO IMPORTACAO-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V IMP Importação
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_ii).format('0,0.00')}}
              </div>
            </div>

            <!-- VALOR ICMS UF REMET-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V ICMS UF REMET
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_icms_estado_remetente).format('0,0.00')}}
              </div>
            </div>

            <!-- V FCP UF DEST-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V FCP UF DEST
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_fcp_estado_destinatario).format('0,0.00')}}
              </div>
            </div>

            <!-- VALOR DO PIS-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do PIS
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_pis).format('0,0.00')}}
              </div>
            </div>

            <!-- VALOR TOTAL PRODUTO-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V Total Produto
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_produto).format('0,0.00')}}
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
                {{numeral(notaFiscal.total_frete).format('0,0.00')}}
              </div>
            </div>

            <!--VALOR SEGURO-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do Seguro
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_seguro).format('0,0.00')}}
              </div>
            </div>

            <!--DESCONTO-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Desconto
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_desconto).format('0,0.00')}}
              </div>
            </div>

            <!--OUTRAS DESPESAS-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Outras Despesas
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_outro).format('0,0.00')}}
              </div>
            </div>

            <!--VALOR TOTAL IPI-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor Total IPI
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_ipi).format('0,0.00')}}
              </div>
            </div>

            <!--V ICMS UF DEST-->
            <div class="col-1 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V ICMS UF DEST
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_icms_estado_destinatario).format('0,0.00')}}
              </div>
            </div>

            <!-- V TOT TRIB-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V TOT TRIB
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_tributos).format('0,0.00')}}
              </div>
            </div>

            <!--VALOR DO COFINS-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                Valor do COFINS
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_cofins).format('0,0.00')}}
              </div>
            </div>

            <!--VALOR TOTAL DA NOTA-->
            <div class="col-2 q-pa-xs borda-esquerda">
              <div class="text-faded q-caption ellipsis">
                V Total Nota
              </div>
              <div class="ellipsis text-right">
                {{numeral(notaFiscal.total_nota_fiscal).format('0,0.00')}}
              </div>
            </div>

          </div>

        </q-card>

        <!--TRANSPORTE E VOLUMES-->
        <template v-for="transporte in notaFiscal.notas_fiscais_transportes">
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
                  {{transporte.cidade.nome}}
                </div>
              </div>

              <!--UF-->
              <div class="col-1 q-pa-xs borda-esquerda">
                <div class="text-faded q-caption ellipsis">
                  UF
                </div>
                <div class="ellipsis text-center">
                  {{transporte.cidade.estado.sigla}}
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

            <div class="row borda-superior" v-for="volume in transporte.notas_fiscais_transportes_volumes">

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

          <div class="row">

            <div class="col-3">
              <div class="row">

                <!--CODIGO PRODUTO-->
                <div class="col-4 q-pa-xs">
                  <div class="text-faded q-caption">
                    Código Produto
                  </div>
                </div>

                <!--DESCRICAO PRODUTO-->
                <div class="col-8 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption ellipsis">
                    Descrição Produto/Serviço
                  </div>
                </div>

              </div>
            </div>

            <div class="col-3">
              <div class="row">
                <!--NCM / SH-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption ellipsis">
                    NCM / SH
                  </div>
                </div>

                <!--O/CST-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption ellipsis">
                    O/CST
                  </div>
                </div>

                <!--CFOP-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption ellipsis">
                    CFOP
                  </div>
                </div>

                <!--UNIDADE-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption ellipsis">
                    UN
                  </div>
                </div>
              </div>
            </div>

            <div class="col-3">
              <div class="row">

                <!--QUANTIDADE-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption">
                    Quantidade
                  </div>
                </div>

                <!--VALOR  UNITARIO-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption ellipsis">
                    Valor Unit
                  </div>
                </div>

                <!--VALOR TOTAL-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption ellipsis">
                    Valor Total
                  </div>
                </div>

              </div>
            </div>

            <div class="col-3">
              <div class="row">

                <!--BASE CALCULO ICMS-->
                <div class="col-3 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption">
                    B.CÁLC ICMS
                  </div>
                </div>

                <!--VALOR ICMS-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption">
                    V ICMS
                  </div>
                </div>

                <!--VALOR IPI-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption">
                    V IPI
                  </div>
                </div>

                <!--ALIQUOTA ICMS-->
                <div class="col-3 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption">
                    ALIQ ICMS
                  </div>
                </div>

                <!--ALIQUOTA IPI-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption">
                    ALIQ IPI
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div class="row borda-superior" v-for="item in notaFiscal.notas_fiscais_itens">

            <div class="col-3">
              <div class="row">

                <!--CODIGO PRODUTO-->
                <div class="col-4 q-pa-xs">
                  <div class="ellipsis text-center">
                    {{item.codigo}}
                  </div>
                </div>

                <!--DESCRICAO PRODUTO-->
                <div class="col-8 q-pa-xs borda-esquerda">
                  <div class="ellipsis">
                    {{item.produto}}
                  </div>
                </div>
              </div>
            </div>

            <div class="col-3">
              <div class="row">
                <!--NCM / SH-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-center">
                    {{item.ncm}}
                  </div>
                </div>

                <!--O/CST-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-center">
                    260
                  </div>
                </div>

                <!--CFOP-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-center">
                    {{item.cfop}}
                  </div>
                </div>

                <!--UNIDADE-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-center">
                    {{item.unidade_medida.sigla}}
                  </div>
                </div>
              </div>
            </div>

            <div class="col-3">
              <div class="row">

                <!--QUANTIDADE-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{item.quantidade}}
                  </div>
                </div>

                <!--VALOR  UNITARIO-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{numeral(item.valor_unitario).format('0,0.00')}}
                  </div>
                </div>

                <!--VALOR TOTAL-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{numeral(item.valor_total).format('0,0.00')}}
                  </div>
                </div>

              </div>
            </div>

            <div class="col-3">
              <div class="row">
                <!--BASE CALCULO ICMS-->
                <div class="col-3 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{numeral(item.item_icms_base_calculo).format('0,0.00')}}
                  </div>
                </div>

                <!--VALOR ICMS-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{numeral(item.notas_fiscais_itens_icms.valor).format('0,0.00')}}
                  </div>
                </div>

                <!--VALOR IPI-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{numeral(item.notas_fiscais_itens_ipi.valor).format('0,0.00')}}
                  </div>
                </div>

                <!--ALIQUOTA ICMS-->
                <div class="col-3 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{numeral(item.notas_fiscais_itens_icms.percentual).format('0,0.00')}}
                  </div>
                </div>

                <!--ALIQUOTA IPI-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{numeral(item.notas_fiscais_itens_pis.percentual).format('0,0.00')}}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </q-card>

        <template>
          <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
            Dados Adicionais
          </div>
          <q-card>
            <div class="row">

              <div class="col-8 q-pa-xs">
                <div class="text-faded q-caption ellipsis">
                  Informações Complementares
                </div>

                <!--INFORMACOES ADICIONAIS / COMPLEMENTARES-->
                <div class="ellipsis">
                  <p>{{notaFiscal.informacoes_adicionais_fisco}}<p/>
                  <p>{{notaFiscal.informacoes_complementares}}<p/>
                </div>
              </div>

              <!--RESERVADO AO FISCO-->
              <div class="col-4 borda-esquerda q-pa-xs">
                <div class="text-faded q-caption ellipsis">
                  Reservado ao Fisco
                </div>

              </div>

            </div>
          </q-card>
        </template>
      </div>

      <div v-if="isEmptyList" class="no-result col-12">
        <ap-no-results />
      </div>
    </div>

  </custom-page>
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import apNoResults from 'components/ApNoResults'
  import NotaFiscalService from '../../../assets/js/service/NotaFiscalService'
  import NfeService from '../../../assets/js/service/NfeService'
  export default {
    name: "nota-View",
    components: {
      toolbar,
      customPage,
      apNoResults,
    },
    watch: { },
    data(){
      return{
        notaFiscalService: new NotaFiscalService(),
        nfeService: new NfeService(),
        notaFiscal: null,
        isEmptyList: false,
      }
    },
    methods: {
      nfeCriar() {
        this.nfeService.criar(this.notaFiscal.id);
      },
      nfeAssinar() {
        this.nfeService.assinar(this.notaFiscal.id);
      },
      nfeEnviarSincrono() {
        this.nfeService.enviarSincrono(this.notaFiscal.id);
      },
      nfeConsultar() {
        this.nfeService.consultar(this.notaFiscal.id);
      },
      nfeCancelar() {
        this.nfeService.cancelar(this.notaFiscal.id);
      },
      nfeMail() {
        this.nfeService.mail(this.notaFiscal.id);
      },
      nfeDanfe() {
        this.nfeService.danfe(this.notaFiscal.id);
      },
      nfeXml() {
        this.nfeService.xml(this.notaFiscal.id);
      },
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
        }).catch(()=>{
          this.isEmptyList = true
          this.$q.loading.hide();
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

  .all-border {
    border: 1px solid rgba(0,0,0,0.14);
  }

  .space-end{
    margin-bottom: 300px;
  }
  .no-result{
    text-align: center;
    padding-top: 150px;
  }

  .no-result img{
    width: 300px;
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

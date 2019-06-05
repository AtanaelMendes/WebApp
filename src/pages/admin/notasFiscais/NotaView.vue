<template>
  <custom-page isChild noScroll style="background: #fdfdfd">
    <toolbar slot="toolbar" navigation_type="closeAndBack" @navigation_clicked="backAction">

      <template slot="action_itens" v-if="notaFiscal">
        <q-btn icon="more_vert" flat round>
          <q-popover>
            <q-list link>
              <q-item v-close-overlay @click.native="editNotaFiscal(notaFiscal)">
                <q-item-side icon="edit" />
                <q-item-main label="Editar"/>
              </q-item>
              <q-item v-close-overlay @click.native="duplicarNotaFiscal(notaFiscal)">
                <q-item-side icon="file_copy" />
                <q-item-main label="Duplicar"/>
              </q-item>
              <q-item v-close-overlay @click.native="deleteNotaFiscal(notaFiscal)">
                <q-item-side icon="delete" />
                <q-item-main label="Excluir"/>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </template>

    </toolbar>

    <div class="row q-pa-md gutter-sm space-end">

      <div class="col-12" v-if="notaFiscal">

        <template>
          <nota-fiscal-form-modal ref="notaFiscalFormModal" @atualizada='notaFiscalAtualizada' @apagada='notaFiscalApagada' @duplicada='notaFiscalAtualizada'/>
          <nota-fiscal-item-form-modal ref="notaFiscalItemFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>
          <nota-fiscal-item-cofins-form-modal ref="notaFiscalItemCofinsFormModal" @atualizada='notaFiscalAtualizada'/>
          <nota-fiscal-item-icms-form-modal ref="notaFiscalItemIcmsFormModal" @atualizada='notaFiscalAtualizada'/>
          <nota-fiscal-item-pis-form-modal ref="notaFiscalItemPisFormModal" @atualizada='notaFiscalAtualizada'/>
          <nota-fiscal-item-ipi-form-modal ref="notaFiscalItemIpiFormModal" @atualizada='notaFiscalAtualizada'/>
          <nota-fiscal-item-nve-form-modal ref="notaFiscalItemNveFormModal" @atualizada='notaFiscalAtualizada'/>
          <nota-fiscal-item-imposto-devolucao-form-modal ref="notaFiscalItemImpostoDevolucaoFormModal" @atualizada='notaFiscalAtualizada'/>

          <nota-fiscal-transporte-volume-form-modal ref="notaFiscalTransporteVolumeFormModal" @atualizada='notaFiscalAtualizada'/>
          <nota-fiscal-transporte-reboque-form-modal ref="notaFiscalTransporteReboqueFormModal" @atualizada='notaFiscalAtualizada'/>
          <nota-fiscal-transporte-volume-lacre-form-modal ref="notaFiscalTransporteVolumeLacreFormModal" @atualizada='notaFiscalAtualizada'/>
          <nota-fiscal-transporte-form-modal ref="notaFiscalTransporteFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>

          <nota-fiscal-processo-form-modal ref="notaFiscalProcessoFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>
          <nota-fiscal-duplicata-form-modal ref="notaFiscalDuplicataFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>
          <nota-fiscal-observacao-form-modal ref="notaFiscalObservacaoFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>
          <nota-fiscal-autorizado-form-modal ref="notaFiscalAutorizadoFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>
          <nota-fiscal-localizacao-form-modal ref="notaFiscalLocalizacaoFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>
          <nota-fiscal-referenciada-form-modal ref="notaFiscalReferenciadaFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>
          <nota-fiscal-forma-pagamento-form-modal ref="notaFiscalFormaPagamentoFormModal" @atualizada='notaFiscalAtualizada' :nota-fiscal-id="notaFiscal.id"/>
        </template>

        <!--EMITENTE-->
        <q-card class="q-mb-sm">
          <div class="row">
            <div class="col-lg-5 col-sm-12 q-pa-xs ">
              <div class="text-faded q-caption ellipsis text-center">
                Identificação Emitente
              </div>
              <div class="ellipsis text-center">
                <div>{{notaFiscal.pessoa.nome}}</div>
              </div>

              <div class="row q-pb-sm">
                <div class="col-12 text-center" v-for="contato in notaFiscal.pessoa.contatos" :key="contato.id">
                  <div class="row">
                    <div class="col-12" v-for="telefone in contato.telefones" :key="telefone.numero">
                      {{telefone.numero}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12 text-center" v-for="localizacao in notaFiscal.pessoa.localizacoes" :key="localizacao.id">
                  {{localizacao.endereco}}, {{localizacao.numero}} - {{localizacao.complemento}} - {{localizacao.cep}},
                  {{localizacao.cidade.nome}} - {{localizacao.cidade.estado.sigla}}
                </div>
              </div>
            </div>

            <div class="col-xs-4 col-lg-2 borda-superior borda-esquerda q-pa-xs">
              <div class="q-title text-center">
                DANFE
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

              <div class="row" v-if="notaFiscal.numero">
                <div class="col-12 text-center">
                  Nº {{notaFiscal.numero}}
                </div>
                <div class="col-12 text-center">
                  Série {{notaFiscal.serie}}
                </div>
              </div>

            </div>
            <div class="col-xs-8 col-lg-5 borda-superior borda-esquerda">
              <div class="row q-pa-xs">
                <div class="col-12">
                  <div class="text-faded q-caption ellipsis">
                    Chave de Acesso
                  </div>
                  <div class="row">
                    <div class="col-12 text-center ellipsis">
                      {{notaFiscal.id}} -
                      {{notaFiscal.chave}}
                      &nbsp;
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="row q-pa-xs borda-superior">
                <div class="col-12 text-center ellipsis">
                  Consulta de auteticidade no portal nacional da NF-e www.nfe.fazenda.gov.br/portal ou no site da sefaz autorizada
                </div>
              </div> -->
              <div class="row q-pa-xs borda-superior">
                <div class="col-12 text-center ellipsis">
                  <nfe-buttons :status="notaFiscal.status" :nota-fiscal-id="notaFiscal.id" @atualizada="notaFiscalAtualizada()" />
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
                Status / Protocolo de Autorização de uso
              </div>
              <div class="text-center ellipsis">
                <span :class="classStatus">
                  {{notaFiscal.status}}
                  {{notaFiscal.protocolo_autorizacao}}
                </span>
              </div>
            </div>
          </div>

          <div class="row borda-superior">
            <div class="col-6 q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                Inscrição Estadual
              </div>
              <div class="text-center">
                {{notaFiscal.pessoa.inscricao_estadual}}
              </div>
            </div>
            <!--<div class="col-4 borda-esquerda q-pa-xs">-->
              <!--<div class="text-faded q-caption ellipsis">-->
                <!--Inscrição Estadual do SUBST. TRIBUT.-->
              <!--</div>-->
              <!--<div class="text-center">-->
                <!--??????-->
              <!--</div>-->
            <!--</div>-->
            <div class="col-6 borda-esquerda q-pa-xs">
              <div class="text-faded q-caption ellipsis">
                CNPJ / CPF
              </div>
              <div class="text-center">
                <span v-if="notaFiscal.pessoa.cpf">
                  {{formatCPF(notaFiscal.pessoa.cpf)}}
                </span>
                <span v-if="notaFiscal.pessoa.cnpj">
                  {{formatCNPJ(notaFiscal.pessoa.cnpj)}}
                </span>
              </div>
            </div>
          </div>
        </q-card>

        <!--DESTINATARIO / REMETENTE-->
        <div class="row text-weight-light q-body-1 q-py-xs">
            Destinatário / Remetente
        </div>
        <nota-fiscal-localizacao :nota-fiscal="notaFiscal" :localizacao="notaFiscal.nota_fiscal_localizacao_destinatario" @atualizada='notaFiscalAtualizada' v-if="notaFiscal.nota_fiscal_localizacao_destinatario" />
        <nota-fiscal-localizacao :nota-fiscal="notaFiscal" :localizacao="notaFiscal.nota_fiscal_localizacao_entrega" @atualizada='notaFiscalAtualizada' v-if="notaFiscal.nota_fiscal_localizacao_entrega" />
        <nota-fiscal-localizacao :nota-fiscal="notaFiscal" :localizacao="notaFiscal.nota_fiscal_localizacao_retirada" @atualizada='notaFiscalAtualizada' v-if="notaFiscal.nota_fiscal_localizacao_retirada" />


        <!--FATURA DUPLICATA-->
        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
          Fatura/Duplicata
        </div>
        <q-card>
          <div class="row">
            <template v-for="duplicata in notaFiscal.notas_fiscais_duplicatas">
              <div class="col-2 q-pa-xs all-border" :key="duplicata.id">
                <q-item class="q-pa-none">
                  <q-item-main>
                    <q-item-tile class="row">
                      <div class="col-6 q-caption text-faded">
                        Num.
                      </div>
                      <div class="col-6 text-right">
                        {{duplicata.numero}}
                      </div>
                    </q-item-tile>

                    <q-item-tile class="row">
                      <div class="col-6 q-caption text-faded">
                        Venc.
                      </div>
                      <div class="col-6 text-right">
                        {{moment(duplicata.vencimento).format('L')}}
                      </div>
                    </q-item-tile>

                    <q-item-tile class="row">

                      <div class="col-6 q-caption text-faded">
                        Valor.
                      </div>
                      <div class="col-6 text-right">
                        {{numeral(duplicata.valor).format('0,0.00')}}
                      </div>

                    </q-item-tile>
                  </q-item-main>
                  <q-item-side class="self-start">

                    <q-btn icon="more_vert" flat round color="grey-7">
                      <q-popover>
                        <q-list link>
                          <q-item @click.native="editNotaFiscalDuplicata(duplicata)">
                            <q-item-side icon="edit" />
                            <q-item-main label="Editar"/>
                          </q-item>
                          <q-item @click.native="deleteNotaFiscalDuplicata(duplicata)">
                            <q-item-side icon="delete" />
                            <q-item-main label="Excluir"/>
                          </q-item>
                        </q-list>
                      </q-popover>
                    </q-btn>

                  </q-item-side>
                </q-item>
              </div>
            </template>

          </div>
        </q-card>

        <!--CALCULO DE IMPOSTO-->
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
        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm" >
          Transportador / Volumes Transportados
        </div>
        <q-card v-for="transporte in notaFiscal.notas_fiscais_transportes" :key="transporte.id">

          <div class="row">

            <!--NOME RAZAO SOCIAL-->
            <div class="col-3 q-pa-xs">
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
              <div class="ellipsis text-center">
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
              <div class="ellipsis text-center" v-if="transporte.caminhao_estado">
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

            <div class="col-1 borda-esquerda">
              <q-btn icon="more_vert" color="grey-7" flat round class="float-right">
                <q-popover>
                  <q-list link>
                    <q-item v-close-overlay @click.native="editNotaFiscalTransporte(transporte)">
                      <q-item-side icon="edit" />
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item v-close-overlay @click.native="deleteNotaFiscalTransporte(transporte)">
                      <q-item-side icon="delete" />
                      <q-item-main label="Excluir"/>
                    </q-item>
                    <q-item-separator />

                    <!--MANUITENCAO REBOQUE-->
                    <q-collapsible icon="local_shipping" label="Reboque" class="cursor-pointer">
                      <q-item v-close-overlay @click.native="addNotaFiscalTransporteReboque(transporte.id)" v-if='transporte.notas_fiscais_transportes_reboques.length == 0'>
                        <q-item-side icon="add" />
                        <q-item-main label="Adicionar"/>
                      </q-item>
                      <template v-for="reboque in transporte.notas_fiscais_transportes_reboques">
                        <q-item v-close-overlay @click.native="editNotaFiscalTransporteReboque(reboque)">
                          <q-item-side icon="edit" />
                          <q-item-main label="Editar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="deleteNotaFiscalTransporteReboque(reboque)">
                          <q-item-side icon="delete" />
                          <q-item-main label="Excluir"/>
                        </q-item>
                      </template>
                    </q-collapsible>

                    <!--MANUITENCAO VOLUME-->
                    <q-collapsible icon="shopping_basket" label="Volume" class="cursor-pointer">
                      <q-item v-close-overlay @click.native="addNotaFiscalTransporteVolume(transporte.id)">
                        <q-item-side icon="add" />
                        <q-item-main label="Adicionar"/>
                      </q-item>
                    </q-collapsible>


                  </q-list>
                </q-popover>
              </q-btn>
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

          <div class="row borda-superior" v-for="volume in transporte.notas_fiscais_transportes_volumes" :key="volume.id">

            <!--QUANTIDADE-->
            <div class="col-1 q-pa-xs">
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

            <div class="col-1 borda-esquerda">
              <q-btn icon="more_vert" flat round color="grey-7" class="float-right">
                <q-popover>
                  <q-list link>
                    <q-item @click.native="editNotaFiscalTransporteVolume(volume)">
                      <q-item-side icon="edit" />
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item @click.native="deleteNotaFiscalTransporteVolume(volume)">
                      <q-item-side icon="delete" />
                      <q-item-main label="Excluir"/>
                    </q-item>

                    <!--VOLUME LACRE-->
                    <q-collapsible icon="local_offer" label="Lacre" class="cursor-pointer">
                      <q-item v-close-overlay @click.native="addNotaFiscalTransporteVolumeLacre(volume.id)" v-if='volume.notas_fiscais_transportes_volumes_lacres.length == 0'>
                        <q-item-side icon="add" />
                        <q-item-main label="Adicionar"/>
                      </q-item>
                      <template v-for="lacre in volume.notas_fiscais_transportes_volumes_lacres">
                        <q-item v-close-overlay @click.native="editNotaFiscalTransporteVolumeLacre(lacre)">
                          <q-item-side icon="edit" />
                          <q-item-main label="Editar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="deleteNotaFiscalTransporteVolumeLacre(lacre)">
                          <q-item-side icon="delete" />
                          <q-item-main label="Excluir"/>
                        </q-item>
                      </template>
                    </q-collapsible>

                  </q-list>
                </q-popover>
              </q-btn>
            </div>

          </div>
        </q-card>

        <!--PRODUTOS / SERVICOS-->
        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
          Dados dos Produtos / Serviços
        </div>
        <q-card>

          <div class="row">

            <div class="col-3">
              <div class="row full-height">

                <!--CODIGO PRODUTO-->
                <div class="col-4 q-pa-xs">
                  <div class="text-faded q-caption">
                    Código
                  </div>
                </div>

                <!--DESCRICAO PRODUTO-->
                <div class="col-8 q-pa-xs borda-esquerda">
                  <div class="text-faded q-caption">
                    Produto/Serviço
                  </div>
                </div>

              </div>
            </div>

            <div class="col-3">
              <div class="row full-height">
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
              <div class="row full-height">

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
              <div class="row full-height">

                <!--BASE CALCULO ICMS-->
                <div class="col-2 q-pa-xs borda-esquerda">
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
                <div class="col-2 q-pa-xs borda-esquerda">
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

                <div class="col-2 borda-esquerda" >
                  &nbsp
                </div>

              </div>
            </div>

          </div>

          <div class="row borda-superior" v-for="item in notaFiscal.notas_fiscais_itens" :key="item.id">

            <div class="col-3">
              <div class="row full-height">

                <!--CODIGO PRODUTO-->
                <div class="col-4 q-pa-xs">

                  <div class="ellipsis text-center">
                    {{item.codigo}}
                  </div>
                </div>

                <!--DESCRICAO PRODUTO-->
                <div class="col-7 q-pa-xs borda-esquerda">
                  <div class="ellipsis ">
                    {{item.produto}}
                  </div>
                </div>
              </div>
            </div>

            <div class="col-3">
              <div class="row full-height">
                <!--NCM / SH-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-center ">
                    {{item.ncm}}
                  </div>
                </div>

                <!--O/CST-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-center" v-for="icms in item.notas_fiscais_itens_icms" :key="icms.id">
                    {{icms.origem}}{{icms.cst}}
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
              <div class="row full-height">

                <!--QUANTIDADE-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{numeral(item.quantidade).format('0,0')}}
                  </div>
                </div>

                <!--VALOR  UNITARIO-->
                <div class="col-4 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right">
                    {{numeral(item.valor_unitario).format('0,0.00')}}
                  </div>
                </div>

                <!--VALOR TOTAL-->
                <div class="col-4 q-pa-xs borda-esquerda full-height">
                  <div class="ellipsis text-right">
                    {{numeral(item.valor_produto).format('0,0.00')}}
                  </div>
                </div>

              </div>
            </div>

            <div class="col-3">
              <div class="row full-height">
                <!--BASE CALCULO ICMS-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  {{item.notas_fiscais_itens_icms.base_calculo}}
                  <div class="ellipsis text-right" v-for="icms in item.notas_fiscais_itens_icms" :key="icms.id">
                    {{numeral(icms.base_calculo).format('0,0.00')}}
                  </div>
                </div>

                <!--VALOR ICMS-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right" v-for="icms in item.notas_fiscais_itens_icms" :key="icms.id">
                    {{numeral(icms.valor).format('0,0.00')}}
                  </div>
                </div>

                <!--VALOR IPI-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right" v-for="ipi in item.notas_fiscais_itens_ipi" :key="ipi.id">
                    {{numeral(ipi.valor).format('0,0.00')}}
                  </div>
                </div>

                <!--ALIQUOTA ICMS-->
                <div class="col-2 q-pa-xs borda-esquerda">
                  <div class="ellipsis text-right" v-for="icms in item.notas_fiscais_itens_icms" :key="icms.id">
                    {{numeral(icms.percentual).format('0,0.00')}}
                  </div>
                </div>

                <!--ALIQUOTA IPI-->
                <div class="col-2 q-pa-xs borda-esquerda full-height">
                  <div class="ellipsis text-right" v-for="ipi in item.notas_fiscais_itens_ipi" :key="ipi.id">
                    {{numeral(ipi.percentual).format('0,0.00')}}
                  </div>
                </div>

                <!--BOTOES DE MANUTENCAO-->
                <div class="col-2 borda-esquerda" align="end">
                  <q-btn round flat icon="more_vert" color="grey-7">
                    <q-popover>
                      <q-list link>
                        <q-item v-close-overlay @click.native="editNotaFiscalItem(item)">
                          <q-item-side icon="edit" />
                          <q-item-main label="Editar"/>
                        </q-item>
                        <q-item v-close-overlay @click.native="deleteNotaFiscalItem(item)">
                          <q-item-side icon="delete" />
                          <q-item-main label="Excluir"/>
                        </q-item>

                        <q-item-separator />

                        <!--MANUITENCAO COFINS-->
                        <q-collapsible icon="receipt" label="Cofins" class="cursor-pointer">
                          <q-item v-close-overlay @click.native="addNotaFiscalItemCofins(item.id)" v-if='item.notas_fiscais_itens_cofins.length == 0'>
                            <q-item-side icon="add" />
                            <q-item-main label="Adicionar"/>
                          </q-item>
                          <template v-for="cofins in item.notas_fiscais_itens_cofins">
                            <q-item v-close-overlay @click.native="editNotaFiscalItemCofins(cofins)">
                              <q-item-side icon="edit" />
                              <q-item-main label="Editar"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteNotaFiscalItemCofins(cofins)">
                              <q-item-side icon="delete" />
                              <q-item-main label="Excluir"/>
                            </q-item>
                          </template>
                        </q-collapsible>

                        <!--MANUITENCAO ICMS-->
                        <q-collapsible icon="receipt" label="ICMS" class="cursor-pointer">
                          <q-item v-close-overlay @click.native="addNotaFiscalItemIcms(item.id)" v-if='item.notas_fiscais_itens_icms.length == 0'>
                            <q-item-side icon="add" />
                            <q-item-main label="Adicionar"/>
                          </q-item>
                          <template v-for="icms in item.notas_fiscais_itens_icms">
                            <q-item v-close-overlay @click.native="editNotaFiscalItemIcms(icms)">
                              <q-item-side icon="edit" />
                              <q-item-main label="Editar"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteNotaFiscalItemIcms(icms)">
                              <q-item-side icon="delete" />
                              <q-item-main label="Excluir"/>
                            </q-item>
                          </template>
                        </q-collapsible>

                        <!--MANUTENCAO PIS-->
                        <q-collapsible icon="receipt" label="PIS" class="cursor-pointer">
                          <q-item v-close-overlay @click.native="addNotaFiscalItemPis(item.id)" v-if='item.notas_fiscais_itens_pis.length == 0'>
                            <q-item-side icon="add" />
                            <q-item-main label="Adicionar"/>
                          </q-item>
                          <template v-for="pis in item.notas_fiscais_itens_pis">
                            <q-item v-close-overlay @click.native="editNotaFiscalItemPis(pis)">
                              <q-item-side icon="edit" />
                              <q-item-main label="Editar"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteNotaFiscalItemPis(pis)">
                              <q-item-side icon="delete" />
                              <q-item-main label="Excluir"/>
                            </q-item>
                          </template>
                        </q-collapsible>

                        <!--MANUTENCAO NVE-->
                        <q-collapsible icon="receipt" label="NVE" class="cursor-pointer">
                          <q-item v-close-overlay @click.native="addNotaFiscalItemNve(item.id)" v-if='item.notas_fiscais_itens_nves.length == 0'>
                            <q-item-side icon="add" />
                            <q-item-main label="Adicionar"/>
                          </q-item>
                          <template v-for="nve in item.notas_fiscais_itens_nves">
                            <q-item v-close-overlay @click.native="editNotaFiscalItemNve(nve)">
                              <q-item-side icon="edit" />
                              <q-item-main label="Editar"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteNotaFiscalItemNve(nve)">
                              <q-item-side icon="delete" />
                              <q-item-main label="Excluir"/>
                            </q-item>
                          </template>
                        </q-collapsible>

                        <!--MANUTENCAO IPI-->
                        <q-collapsible icon="receipt" label="IPI" class="cursor-pointer">
                          <q-item v-close-overlay @click.native="addNotaFiscalItemIpi(item.id)" v-if='item.notas_fiscais_itens_ipi.length == 0'>
                            <q-item-side icon="add" />
                            <q-item-main label="Adicionar"/>
                          </q-item>
                          <template v-for="ipi in item.notas_fiscais_itens_ipi">
                            <q-item v-close-overlay @click.native="editNotaFiscalItemIpi(ipi)">
                              <q-item-side icon="edit" />
                              <q-item-main label="Editar"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteNotaFiscalItemIpi(ipi)">
                              <q-item-side icon="delete" />
                              <q-item-main label="Excluir"/>
                            </q-item>
                          </template>
                        </q-collapsible>

                        <!--MANUTENCAO IMPOSTO DEVOLUCAO-->
                        <q-collapsible icon="receipt" label="Imposto Devolução" class="cursor-pointer">
                          <q-item v-close-overlay @click.native="addNotaFiscalItemImpostoDevolucao(item.id)" v-if='item.notas_fiscais_itens_impostos_devolucoes.length == 0'>
                            <q-item-side icon="add" />
                            <q-item-main label="Adicionar"/>
                          </q-item>
                          <template v-for="impostoDevolucao in item.notas_fiscais_itens_impostos_devolucoes">
                            <q-item v-close-overlay @click.native="editNotaFiscalItemImpostoDevolucao(impostoDevolucao)">
                              <q-item-side icon="edit" />
                              <q-item-main label="Editar"/>
                            </q-item>
                            <q-item v-close-overlay @click.native="deleteNotaFiscalItemImpostoDevolucao(impostoDevolucao)">
                              <q-item-side icon="delete" />
                              <q-item-main label="Excluir"/>
                            </q-item>
                          </template>
                        </q-collapsible>

                      </q-list>
                    </q-popover>
                  </q-btn>
                </div>
              </div>
            </div>

          </div>

        </q-card>

        <!--DADOS ADICIONAIS-->
        <template>
          <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
            Dados Adicionais
          </div>
          <q-card>
            <div class="row">

              <div class="col-8 q-pa-xs">
                <div class="text-faded q-caption">
                  Informações Complementares
                </div>

                <!--INFORMACOES ADICIONAIS / COMPLEMENTARES-->
                <div>
                  {{notaFiscal.informacoes_complementares}}
                </div>
              </div>

              <!--RESERVADO AO FISCO-->
              <div class="col-4 borda-esquerda q-pa-xs">
                <div class="text-faded q-caption">
                  Reservado ao Fisco
                </div>
                <p>{{notaFiscal.informacoes_adicionais_fisco}}<p/>
              </div>

            </div>
          </q-card>
        </template>

        <!--OBSERVACOES-->
        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
          Observações
        </div>
        <q-card>
          <div class="row" v-for="observacao in notaFiscal.notas_fiscais_observacoes" :key="observacao.id">
            <div class="col-11 q-pa-xs">
              {{observacao}}
            </div>
            <div class="col-1 borda-esquerda q-pa-xs">
              <q-btn icon="more_vert" flat round class="float-right" color="grey-7">
                <q-popover>
                  <q-list link>
                    <q-item @click.native="editNotaFiscalObservacao(observacao)">
                      <q-item-side icon="edit" />
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item @click.native="deleteNotaFiscalObservacao(observacao)">
                      <q-item-side icon="delete" />
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </div>
        </q-card>

        <!--NOTA FISCAL AUTORIZADOS-->
        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
          Nota Fiscal Autorizados
        </div>
        <q-card>
          <div class="row" v-for="autorizado in notaFiscal.notas_fiscais_autorizados" :key="autorizado.id">
            <div class="col-11 q-pa-xs">
              {{autorizado}}
            </div>
            <div class="col-1 borda-esquerda q-pa-xs">
              <q-btn icon="more_vert" flat round class="float-right" color="grey-7">
                <q-popover>
                  <q-list link>
                    <q-item @click.native="editNotaFiscalAutorizado(autorizado)">
                      <q-item-side icon="edit" />
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item @click.native="deleteNotaFiscalAutorizado(autorizado)">
                      <q-item-side icon="delete" />
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </div>
        </q-card>

        <!--NOTA FISCAL REFERENCIADA-->
        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
          Nota Fiscal Referenciada
        </div>
        <q-card>
          <div class="row" v-for="notaFiscalReferenciada in notaFiscal.notas_fiscais_referenciadas" :key="notaFiscalReferenciada.id">
            <div class="col-11 q-pa-xs">
              {{notaFiscalReferenciada}}
            </div>
            <div class="col-1 q-pa-xs borda-esquerda">
              <q-btn icon="more_vert" flat round class="float-right" color="grey-7">
                <q-popover>
                  <q-list link>
                    <q-item @click.native="editNotaFiscalReferenciada(notaFiscalReferenciada)">
                      <q-item-side icon="edit" />
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item @click.native="deleteNotaFiscalReferenciada(notaFiscalReferenciada)">
                      <q-item-side icon="delete" />
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </div>
        </q-card>

        <!--FORMA DE PAGAMANETO-->
        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
          Formas de Pagamento
        </div>
        <q-card>
          <div class="row" v-for="formaPagamento in notaFiscal.notas_fiscais_formas_pagamento" :key="formaPagamento.id">
            <div class="col-11 q-pa-xs">
              {{formaPagamento}}
            </div>
            <div class="col-1 q-pa-xs borda-esquerda">
              <q-btn icon="more_vert" flat round class="float-right" color="grey-7">
                <q-popover>
                  <q-list link>
                    <q-item @click.native="editNotaFiscalFormaPagamento(formaPagamento)">
                      <q-item-side icon="edit" />
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item @click.native="deleteNotaFiscalFormaPagamento(formaPagamento)">
                      <q-item-side icon="delete" />
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </div>
        </q-card>

        <!--NOTA FISCAL PROCESSOS-->
        <div class="row text-weight-light q-body-1 q-py-xs q-mt-sm">
          Nota FIscal Processos
        </div>
        <q-card>
          <div class="row" v-for="processo in notaFiscal.notas_fiscais_processos" :key="processo.id">
            <div class="col-11 q-pa-xs">
              {{processo}}
            </div>
            <div class="col-1 q-pa-xs borda-esquerda">
              <q-btn icon="more_vert" flat round class="float-right" color="grey-7">
                <q-popover>
                  <q-list link>
                    <q-item @click.native="editNotaFiscalProcesso(processo)">
                      <q-item-side icon="edit" />
                      <q-item-main label="Editar"/>
                    </q-item>
                    <q-item @click.native="deleteNotaFiscalProcesso(processo)">
                      <q-item-side icon="delete" />
                      <q-item-main label="Excluir"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </div>
          </div>
        </q-card>
      </div>

      <!--PAGE STICKY BUTTOMS-->
      <q-page-sticky position="bottom-right" :offset="[35, 35]" >
        <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
          <q-fab-action color="grey-1" text-color="grey-7" @click="addNotaFiscalReferenciada()" icon="add">
            <span class="shadow-2">Nota Fiscal Referênciada</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" @click="addNotaFiscalFormaPagamento()" icon="add">
            <span class="shadow-2">Forma de Pagamento</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" @click="addNotaFiscalDuplicata()" icon="add">
            <span class="shadow-2">Duplicatas</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" @click="addNotaFiscalProcesso()" icon="add">
            <span class="shadow-2">Processos</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" @click="addNotaFiscalTransporte()" icon="add">
            <span class="shadow-2">Transporte</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" @click="addNotaFiscalObservacao()" icon="add">
            <span class="shadow-2">Observações</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" @click="addNotaFiscalAutorizado()" icon="add">
            <span class="shadow-2">Autorizado</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" @click="addNotaFiscalItem()" icon="add">
            <span class="shadow-2">Produto</span>
          </q-fab-action>
          <q-fab-action color="grey-1" text-color="grey-7" @click="addNotaFiscalLocalizacao()" icon="add">
            <span class="shadow-2">Destinatario/Rementente</span>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>

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
  import apLabelType from 'components/form/ApLabelType'

  import notaFiscalItemFormModal from './components/NotaFiscalItemFormModal'
  import notaFiscalItemIpiFormModal from './components/NotaFiscalItemIpiFormModal'
  import notaFiscalItemPisFormModal from './components/NotaFiscalItemPisFormModal'
  import notaFiscalItemNveFormModal from './components/NotaFiscalItemNveFormModal'
  import notaFiscalItemIcmsFormModal from './components/NotaFiscalItemIcmsFormModal'
  import notaFiscalItemCofinsFormModal from './components/NotaFiscalItemCofinsFormModal'
  import notaFiscalItemImpostoDevolucaoFormModal from './components/NotaFiscalItemImpostoDevolucaoFormModal'
  import notaFiscalTransporteVolumeLacreFormModal from './components/NotaFiscalTransporteVolumeLacreFormModal'

  import notaFiscalTransporteFormModal from './components/NotaFiscalTransporteFormModal'
  import notaFiscalTransporteVolumeFormModal from './components/NotaFiscalTransporteVolumeFormModal'
  import notaFiscalTransporteReboqueFormModal from './components/NotaFiscalTransporteReboqueFormModal'

  import notaFiscalFormModal from './components/NotaFiscalFormModal.vue'
  import notaFiscalLocalizacao from './components/NotaFiscalLocalizacao'
  import notaFiscalLocalizacaoFormModal from './components/NotaFiscalLocalizacaoFormModal'
  import notaFiscalDuplicataFormModal from './components/NotaFiscalDuplicataFormModal.vue'
  import notaFiscalObservacaoFormModal from './components/NotaFiscalObservacaoFormModal.vue'
  import notaFiscalProcessoFormModal from './components/NotaFiscalProcessoFormModal.vue'
  import notaFiscalAutorizadoFormModal from './components/NotaFiscalAutorizadoFormModal.vue'
  import notaFiscalReferenciadaFormModal from './components/NotaFiscalReferenciadaFormModal'
  import notaFiscalFormaPagamentoFormModal from './components/NotaFiscalFormaPagamentoFormModal'

  import nfeButtons from 'components/Nfe/NfeButtons'
  import NotaFiscalService from 'assets/js/service/NotaFiscalService'
  import NfeService from 'assets/js/service/NfeService'
  export default {
    name: "notaFiscalView",
    components: {
      toolbar,
      customPage,
      apNoResults,
      apLabelType,
      nfeButtons,
      notaFiscalFormModal,
      notaFiscalLocalizacao,
      notaFiscalItemFormModal,
      notaFiscalItemPisFormModal,
      notaFiscalItemNveFormModal,
      notaFiscalItemIpiFormModal,
      notaFiscalItemIcmsFormModal,
      notaFiscalProcessoFormModal,
      notaFiscalDuplicataFormModal,
      notaFiscalTransporteFormModal,
      notaFiscalObservacaoFormModal,
      notaFiscalAutorizadoFormModal,
      notaFiscalItemCofinsFormModal,
      notaFiscalLocalizacaoFormModal,
      notaFiscalReferenciadaFormModal,
      notaFiscalFormaPagamentoFormModal,
      notaFiscalTransporteVolumeFormModal,
      notaFiscalTransporteReboqueFormModal,
      notaFiscalItemImpostoDevolucaoFormModal,
      notaFiscalTransporteVolumeLacreFormModal,
    },
    watch: { },
    data(){
      return{
        notaFiscalService: new NotaFiscalService(),
        notaFiscal: null,
        isEmptyList: false,
      }
    },
    computed: {
      classStatus: function () {
        switch (this.notaFiscal.status) {
          case 'Digitacao':
          case 'Enviada':
            return 'text-warning';
            break;

          case 'Autorizada':
            return 'text-positive';
            break;

          case 'Cancelada':
          case 'Denegada':
            return 'text-negative';

          default:
            return '';
        }
      },
    },
    methods: {
      notaFiscalAtualizada(notaFiscal) {
        if (notaFiscal) {
          this.notaFiscal = notaFiscal;
          return;
        }
        this.getNotaFiscalById(this.$route.params.id);
      },
      notaFiscalApagada() {
        this.$router.push({name: 'notas_fiscais'});
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
          this.isEmptyList = true;
          this.$q.loading.hide();
        })
      },

      // NotaFiscal
      editNotaFiscal(notaFiscal){
        this.$refs.notaFiscalFormModal.edit(notaFiscal)
      },
      deleteNotaFiscal(notaFiscal){
        this.$refs.notaFiscalFormModal.delete(notaFiscal)
      },
      duplicarNotaFiscal(notaFiscal){
        this.$refs.notaFiscalFormModal.duplicar(notaFiscal)
      },

      // notasFiscaisItens
      addNotaFiscalItem(){
        this.$refs.notaFiscalItemFormModal.add()
      },
      editNotaFiscalItem(notaFiscalItem){
        this.$refs.notaFiscalItemFormModal.edit(notaFiscalItem)
      },
      deleteNotaFiscalItem(notaFiscalItem){
        this.$refs.notaFiscalItemFormModal.delete(notaFiscalItem)
      },

      // notasFiscaisItensCofins
      addNotaFiscalItemCofins(notaFiscalItemId){
        this.$refs.notaFiscalItemCofinsFormModal.add(notaFiscalItemId)
      },
      editNotaFiscalItemCofins(notaFiscalItemCofins){
        this.$refs.notaFiscalItemCofinsFormModal.edit(notaFiscalItemCofins)
      },
      deleteNotaFiscalItemCofins(notaFiscalItemCofins){
        this.$refs.notaFiscalItemCofinsFormModal.delete(notaFiscalItemCofins)
      },

      // notasFiscaisItensPis
      addNotaFiscalItemPis(notaFiscalItemId){
        this.$refs.notaFiscalItemPisFormModal.add(notaFiscalItemId)
      },
      editNotaFiscalItemPis(item){
        this.$refs.notaFiscalItemPisFormModal.edit(item)
      },
      deleteNotaFiscalItemPis(item){
        this.$refs.notaFiscalItemPisFormModal.delete(item)
      },

      // notasFiscaisItensNve
      addNotaFiscalItemNve(notaFiscalItemId){
        this.$refs.notaFiscalItemNveFormModal.add(notaFiscalItemId)
      },
      editNotaFiscalItemNve(notaFiscalItemNve){
        this.$refs.notaFiscalItemNveFormModal.edit(notaFiscalItemNve)
      },
      deleteNotaFiscalItemNve(notaFiscalItemNve){
        this.$refs.notaFiscalItemNveFormModal.delete(notaFiscalItemNve)
      },

      // notaFiscalItemImpostoDevolucao
      addNotaFiscalItemImpostoDevolucao(notaFiscalItemId){
        this.$refs.notaFiscalItemImpostoDevolucaoFormModal.add(notaFiscalItemId)
      },
      editNotaFiscalItemImpostoDevolucao(item){
        this.$refs.notaFiscalItemImpostoDevolucaoFormModal.edit(item)
      },
      deleteNotaFiscalItemImpostoDevolucao(item){
        this.$refs.notaFiscalItemImpostoDevolucaoFormModal.delete(item)
      },

      // notaFiscalItemIcms
      addNotaFiscalItemIcms(notaFiscalItemId){
        this.$refs.notaFiscalItemIcmsFormModal.add(notaFiscalItemId)
      },
      editNotaFiscalItemIcms(item){
        this.$refs.notaFiscalItemIcmsFormModal.edit(item)
      },
      deleteNotaFiscalItemIcms(item){
        this.$refs.notaFiscalItemIcmsFormModal.delete(item)
      },

      // notaFiscalLocalizacao
      addNotaFiscalLocalizacao(){
        this.$refs.notaFiscalLocalizacaoFormModal.add()
      },

      // notaFiscalReferenciada
      addNotaFiscalReferenciada(){
        this.$refs.notaFiscalReferenciadaFormModal.add()
      },
      editNotaFiscalReferenciada(notaFiscalReferenciada){
        this.$refs.notaFiscalReferenciadaFormModal.edit(notaFiscalReferenciada)
      },
      deleteNotaFiscalReferenciada(notaFiscalReferenciada){
        this.$refs.notaFiscalReferenciadaFormModal.delete(notaFiscalReferenciada)
      },

      // notaFiscalFormaPagamento
      addNotaFiscalFormaPagamento(){
        this.$refs.notaFiscalFormaPagamentoFormModal.add()
      },
      editNotaFiscalFormaPagamento(notaFiscalFormaPagamento){
        this.$refs.notaFiscalFormaPagamentoFormModal.edit(notaFiscalFormaPagamento)
      },
      deleteNotaFiscalFormaPagamento(notaFiscalFormaPagamento){
        this.$refs.notaFiscalFormaPagamentoFormModal.delete(notaFiscalFormaPagamento)
      },

      // notaFiscalDuplicata
      addNotaFiscalDuplicata(){
        this.$refs.notaFiscalDuplicataFormModal.add()
      },
      editNotaFiscalDuplicata(notaFiscalDuplicata){
        this.$refs.notaFiscalDuplicataFormModal.edit(notaFiscalDuplicata)
      },
      deleteNotaFiscalDuplicata(notaFiscalDuplicata){
        this.$refs.notaFiscalDuplicataFormModal.delete(notaFiscalDuplicata)
      },

      // notaFiscalTransporte
      addNotaFiscalTransporte(){
        this.$refs.notaFiscalTransporteFormModal.add()
      },
      editNotaFiscalTransporte(notaFiscalTransporte){
        this.$refs.notaFiscalTransporteFormModal.edit(notaFiscalTransporte)
      },
      deleteNotaFiscalTransporte(notaFiscalTransporte){
        this.$refs.notaFiscalTransporteFormModal.delete(notaFiscalTransporte)
      },

      // notaFiscalTransporteReboque
      addNotaFiscalTransporteReboque(notaFiscalTransporteId){
        this.$refs.notaFiscalTransporteReboqueFormModal.add(notaFiscalTransporteId)
      },
      editNotaFiscalTransporteReboque(notaFiscalTransporteReboque){
        this.$refs.notaFiscalTransporteReboqueFormModal.edit(notaFiscalTransporteReboque)
      },
      deleteNotaFiscalTransporteReboque(notaFiscalTransporteReboque){
        this.$refs.notaFiscalTransporteReboqueFormModal.delete(notaFiscalTransporteReboque)
      },

      // notaFiscalTransporteVolume
      addNotaFiscalTransporteVolume(notaFiscalTransporteId){
        this.$refs.notaFiscalTransporteVolumeFormModal.add(notaFiscalTransporteId)
      },
      editNotaFiscalTransporteVolume(notaFiscalTransporteVolume){
        this.$refs.notaFiscalTransporteVolumeFormModal.edit(notaFiscalTransporteVolume)
      },
      deleteNotaFiscalTransporteVolume(notaFiscalTransporteVolume){
        this.$refs.notaFiscalTransporteVolumeFormModal.delete(notaFiscalTransporteVolume)
      },

      // notaFiscalTransporteVolumeLacre
      addNotaFiscalTransporteVolumeLacre(notaFiscalTransporteVolumeId){
        this.$refs.notaFiscalTransporteVolumeLacreFormModal.add(notaFiscalTransporteVolumeId)
      },
      editNotaFiscalTransporteVolumeLacre(notaFiscalTransporteVolumeLacre){
        this.$refs.notaFiscalTransporteVolumeLacreFormModal.edit(notaFiscalTransporteVolumeLacre)
      },
      deleteNotaFiscalTransporteVolumeLacre(notaFiscalTransporteVolumeLacre){
        this.$refs.notaFiscalTransporteVolumeLacreFormModal.delete(notaFiscalTransporteVolumeLacre)
      },

      // notaFiscalObservacao
      addNotaFiscalObservacao(){
        this.$refs.notaFiscalObservacaoFormModal.add()
      },
      editNotaFiscalObservacao(notaFiscalObservacao){
        this.$refs.notaFiscalObservacaoFormModal.edit(notaFiscalObservacao)
      },
      deleteNotaFiscalObservacao(notaFiscalObservacao){
        this.$refs.notaFiscalObservacaoFormModal.delete(notaFiscalObservacao)
      },

      // notaFiscalAutorizado
      addNotaFiscalAutorizado(){
        this.$refs.notaFiscalAutorizadoFormModal.add()
      },
      editNotaFiscalAutorizado(notaFiscalAutorizado){
        this.$refs.notaFiscalAutorizadoFormModal.edit(notaFiscalAutorizado)
      },
      deleteNotaFiscalAutorizado(notaFiscalAutorizado){
        this.$refs.notaFiscalAutorizadoFormModal.delete(notaFiscalAutorizado)
      },

      // notaFiscalProcesso
      addNotaFiscalProcesso(){
        this.$refs.notaFiscalProcessoFormModal.add()
      },
      editNotaFiscalProcesso(notaFiscalProcesso){
        this.$refs.notaFiscalProcessoFormModal.edit(notaFiscalProcesso)
      },
      deleteNotaFiscalProcesso(notaFiscalProcesso){
        this.$refs.notaFiscalProcessoFormModal.delete(notaFiscalProcesso)
      },

      backAction: function () {
        this.$router.push({name: 'notas_fiscais'});
      }
    },
    mounted(){
      this.getNotaFiscalById(this.$route.params.id);
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

  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    padding: 7px 10px;
  }

</style>

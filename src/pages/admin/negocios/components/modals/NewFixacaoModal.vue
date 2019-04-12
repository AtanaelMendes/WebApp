<template>
  <ap-modal ref="newFixacaoModal" title="Nova Fixação" :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovaFixacao" @slide-trigger="setStepperIndex">

      <!--PASSO 1 ESCOLHER NEGOCIO CULTURA-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="negociosCulturas">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione um negócio</span>
          </div>

          <div class="relative-position" >
            <q-scroll-area style="width: auto; height: 350px;">
              <q-list link no-border separator>
                <q-item v-for="negocioCultura in negociosCulturas" :key="negocioCultura.id" @click.native="selectNegocioCultura(negocioCultura)">
                  <q-item-main>
                    <q-item-tile label>
                      {{negocioCultura.safra_cultura.cultura.nome}} {{negocioCultura.safra_cultura.safra.ano_inicio}}/{{negocioCultura.safra_cultura.safra.ano_fim}} &nbsp<span v-if="negocioCultura.safra_cultura.safra.is_safrinha">Safrinha</span>
                    </q-item-tile>

                    <q-item-tile sublabel>
                      {{negocioCulturaRestanteLabel(negocioCultura)}}
                    </q-item-tile>
                  </q-item-main>

                  <q-item-side right>
                    <q-btn v-if="isNegocioCulturaSelected(negocioCultura.id)" icon="done" color="positive" size="8px" round dense/>
                  </q-item-side>
                </q-item>
              </q-list>
              <div v-if="negociosCulturas.length === 0" class="list-empty">
                <q-icon name="warning" />
                <span>Nenhuma safra disponível para seleção</span>
              </div>
            </q-scroll-area>
          </div>
        </template>
      </q-carousel-slide>

      <!--PASSO 2 INFORMAR QUANTIDADE-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="unidadesMedida">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Informe a quantidade fixada</span>
          </div>

          <!--<q-slider v-model="fixacao.quantidade.value" :min="0" :max="maxQuantidade" label  snap/>-->
          <div class="q-px-lg q-py-sm">
            <div class="row justify-center">
              <div class="col-6">
                <q-input stack-label="Quantidade" v-model="fixacao.quantidade.value" type="number" align="right" @blur="validaQuantidade"/>
              </div>
            </div>

            <div class="row justify-center q-mt-sm">
              <div class="col-6">
                <q-select
                  float-label="Unidade de medida"
                  :options="parsedUnidades(unidadesMedida)"
                  v-model="fixacao.unidadeMedidaQuantidadeId" v-if="selectedNegocioCultura"/>
              </div>
            </div>
          </div>
        </template>
      </q-carousel-slide>

      <!--PASSO 3 INFORMAR MOEDA-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Qual a moeda?</span>
        </div>

        <div class="q-px-lg q-py-sm" style="text-align: center">
          <q-card style="width: 110px" class="moeda-card cursor-pointer" flat inline @click.native="selectMoedaFixacao(moeda)" v-for="moeda in moedas" :key="moeda.nome">
            <q-card-main>
              <div class="moeda-icon" v-bind:class="{'moeda-icon-selected':isMoedaSelected(moeda.id)}">{{moeda.simbolo}}</div>
              <div class="moeda-nome">
                {{moeda.nome}}
              </div>
            </q-card-main>
          </q-card>
        </div>
      </q-carousel-slide>

      <!--PASSO 4 INFORMAR PRECO-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="fixacao.moeda">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Qual foi o preço fixado?</span>
          </div>
          <div class="q-px-lg q-py-sm" style="text-align: center">
            <div class="row justify-center">
              <div class="col-6">
                <q-input type="number" :suffix="fixacao.moeda.simbolo" v-model="fixacao.preco.value" stack-label="Preço" align="right"/>
              </div>
            </div>
            <div class="row justify-center q-mt-sm">
              <div class="col-6" >
                <q-select
                  float-label="Unidade de medida"
                  :options="parsedUnidades(unidadesMedida)"
                  v-model="fixacao.unidadeMedidaPrecoId"
                />
              </div>
            </div>
          </div>
        </template>
      </q-carousel-slide>

      <!--PASSO 5 INFORMAR SE HAVERA DESCONTOS/ACRESCIMOS-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Este preço é</span>
        </div>

        <q-list link no-border separator>
          <q-item @click.native="selectDescontoAcrescimos(1)">
            <q-item-main>
              Líquido
            </q-item-main>
            <q-item-side right>
              <q-btn v-if="selectedDescontoAcrescimoType == 1" icon="done" color="positive" size="8px" round dense/>
            </q-item-side>
          </q-item>

          <q-item @click.native="selectDescontoAcrescimos(2)">
            <q-item-main>
              Haverá descontos ou acréscimos e quero informar agora.
            </q-item-main>
            <q-item-side right>
              <q-btn v-if="selectedDescontoAcrescimoType == 2" icon="done" color="positive" size="8px" round dense/>
            </q-item-side>
          </q-item>

          <q-item @click.native="selectDescontoAcrescimos(3)">
            <q-item-main>
              Haverá descontos ou acréscimos mas não sei os valores.
            </q-item-main>
            <q-item-side right>
              <q-btn v-if="selectedDescontoAcrescimoType == 3" icon="done" color="positive" size="8px" round dense/>
            </q-item-side>
          </q-item>
        </q-list>
      </q-carousel-slide>

      <!--PASSO 6 INFORMAR DESCONTOS VALORES-->
      <q-carousel-slide class="q-pa-none" v-if="selectedDescontoAcrescimoType === 2">
        <template v-if="fixacao.moeda">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Quais os valores de desconto/acréscimos?</span>
          </div>
          <div class="row gutter-sm q-px-lg q-py-sm">
            <div class="col-6">
              <q-field label="Bruto" orientation="vertical" class="custom-field">
                <q-input type="number" v-model="fixacao.totalBruto.value" :disable="true" align="right" :prefix="fixacao.moeda.simbolo" />
              </q-field>
            </div>
            <div class="col-6 self-end" align="end">
              {{ numeral(totalBrutoUn).format('0,0.00') }}
              <span class="text-faded q-body-1">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
            </div>

            <div class="col-6">
              <q-field label="Impostos" orientation="vertical" class="custom-field">
                <q-input type="number" v-model="fixacao.totalImpostos.value" align="right" :prefix="fixacao.moeda.simbolo" />
              </q-field>
            </div>
            <div class="col-6 self-end" align="end">
              {{ numeral(totalImpostosUn).format('0,0.00') }}
              <span class="text-faded q-body-1">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
            </div>

            <div class="col-6">
              <q-field label="Descontos" orientation="vertical" class="custom-field">
                <q-input type="number" v-model="fixacao.valorOutrosDescontos.value" align="right" :prefix="fixacao.moeda.simbolo" />
              </q-field>
            </div>
            <div class="col-6 self-end" align="end">
              {{ numeral(totalDescontosUn).format('0,0.00') }}
              <span class="text-faded q-body-1">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
            </div>

            <div class="col-6">
              <q-field label="Acrescimos" orientation="vertical" class="custom-field">
                <q-input type="number" v-model="fixacao.valorOutrosAcrescimos.value" align="right" :prefix="fixacao.moeda.simbolo" />
              </q-field>
            </div>
            <div class="col-6 self-end" align="end">
              {{ numeral(totalAcrescimosUn).format('0,0.00') }}
              <span class="text-faded q-body-1">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
            </div>

            <div class="col-6">
              <q-field label="Total" orientation="vertical" class="custom-field">
                <q-input type="number" v-model="fixacao.totalLiquido.value" align="right" :disable="true" :prefix="fixacao.moeda.simbolo" />
              </q-field>
            </div>
            <div class="col-6 self-end" align="end">
              {{ numeral(totalLiquidoUn).format('0,0.00') }}
              <span class="text-faded q-body-1">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
            </div>
          </div>
        </template>

      </q-carousel-slide>

      <!--PASSO 7 INFORMAR CONTA DE DEPOSITO-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="contasBancarias">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Em qual conta o valor será depositado?</span>
          </div>
          <q-list link no-border separator>
            <q-item v-for="conta in contasBancarias" @click.native="selectContaBancaria(conta)" :key="conta.id">
              <q-item-main>
                <q-item-tile>{{conta.banco.nome}}</q-item-tile>
                <q-item-tile sublabel>{{conta.pessoa.nome}}</q-item-tile>
                <q-item-tile sublabel>
                  <span class="text-faded">Agência:</span> {{conta.agencia}}-{{conta.agencia_digito}},
                  <span class="text-faded">Operação:</span> {{conta.operacao}},
                  <span class="text-faded">conta:</span> {{conta.numero}}
                </q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-btn v-if="isContaSelected(conta.id)" icon="done" color="positive" size="8px" round dense/>
              </q-item-side>
            </q-item>

            <div v-if="contasBancarias.length === 0" class="list-empty">
              <q-icon name="warning" />
              <span>Nenhuma conta associada a essa pessoa. Cadastre uma para pode continuar</span>
            </div>
          </q-list>
        </template>

      </q-carousel-slide>

      <!--PASSO 8 INFORMAR PARCELAS-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Quantas Parcelas?</span>
        </div>
        <div class="row justify-center q-px-lg q-py-sm">
          <div class="col-6" >
            <q-field>
              <q-option-group type="radio" color="secondary" v-model="numParcelasFixacao"
                              :options="[{ label: 'Uma', value: 1 },
                                               { label: 'Duas', value: 2},
                                               { label: 'Três', value: 3}
                                             ]"
              />
            </q-field>
            <q-input v-model="numParcelasFixacao" type="number" suffix="x" align="center"/>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>


    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep !== 8"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" :disable="isNextFixacaoStep()" v-if="!isSaveButtonVisible()" />
        <q-btn @click="" flat label="Salvar" color="primary" v-if="isSaveButtonVisible()"/>
      </div>
    </div>
  </ap-modal>

  <!--<q-modal key="fixacao" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="fixacao" ref="stepperFixacao" contractable color="positive" v-model="currentStep" class="no-shadow" >

      &lt;!&ndash;PASSO 1 ESCOLHER NEGOCIO CULTURA&ndash;&gt;
      <q-step default title="Safras" name="negocioCultura">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5">

            <div class="row justify-center">
              <div class="col-12 text-center q-title q-mb-sm">
                Selecione a Safra
              </div>
              <div class="col-12">
                <q-list link no-border separator>

                  <q-item v-for="negocioCultura in negociosCulturas" :key="negocioCultura.id" @click.native="selectNegocioCultura(negocioCultura)">
                    <q-item-side>
                      <q-btn v-if="isNegocioCulturaSelected(negocioCultura.id)" icon="done" color="positive" size="8px" round dense/>
                    </q-item-side>
                    <q-item-main class="row">
                      <div class="col-4">
                        {{negocioCultura.safra_cultura.cultura.nome}}&nbsp<span v-if="negocioCultura.safra_cultura.safra.is_safrinha">Safrinha</span>
                      </div>
                      <div class="col-4">
                        {{negocioCultura.safra_cultura.safra.ano_inicio}}/{{negocioCultura.safra_cultura.safra.ano_fim}}
                      </div>
                      <div class="col-4 text-faded q-caption">
                        {{negocioCulturaRestanteLabel(negocioCultura)}}
                      </div>
                    </q-item-main>
                  </q-item>

                  <div v-if="negociosCulturas.length === 0" class="list-empty">
                    <q-icon name="warning" />
                    <span>Nenhuma safra disponível para seleção</span>
                  </div>
                </q-list>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      &lt;!&ndash;PASSO 2 INFORMAR QUANTIDADE &ndash;&gt;
      <q-step title="Quantidade" name="quantidade">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-8 col-md-5 col-lg-3">

            <div class="row justify-center gutter-xs">
              <div class="col-12 text-center q-title q-mb-sm">
                Qual foi a quantidade fixada?
              </div>
              <div class="col-12" >
                <q-slider v-model="fixacao.quantidade.value" :min="0" :max="maxQuantidade" label  snap/>
              </div>
              <div class="col-6">
                <custom-input-text @blur="validaQuantidade" :model="fixacao.quantidade" type="number" label="Quantidade" align="right"/>
              </div>
              <div class="col-6" >
                <q-select
                  align="center"
                  float-label="Unidade de medida"
                  :options="parsedUnidades(unidadesMedida)"
                  v-model="fixacao.unidadeMedidaQuantidadeId" v-if="selectedNegocioCultura"
                />
              </div>
            </div>

          </div>
        </div>
      </q-step>

      &lt;!&ndash;PASSO 3 INFORMAR MOEDA &ndash;&gt;
      <q-step title="Moedas" name="moeda">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">

            <div class="row gutter-y-xs">
              <div class="col-12 q-title text-center">Qual a moeda?</div>
              <div class="col-12" v-for="moeda in moedas" :key="moeda.nome">
                <q-btn class="full-width" @click.native="selectMoedaFixacao(moeda)" :color="isMoedaSelected(moeda.id) ? 'positive' : ''">
                  {{moeda.simbolo}}&nbsp{{moeda.nome}}
                </q-btn>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      &lt;!&ndash;PASSO 4 INFORMAR PRECO &ndash;&gt;
      <q-step title="Preço" name="preco">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-8 col-md-5 col-lg-3">

            <div class="row justify-center gutter-xs">
              <div class="col-12 text-center q-title q-mb-sm">
                Qual foi o preço fixado?
              </div>
              <div class="col-6">
                <custom-input-text :prefix="fixacao.moeda.simbolo" :model="fixacao.preco" v-if="fixacao.moeda" type="number" label="Preço" align="center"/>
              </div>
              <div class="col-6" >
                <q-select
                  align="center"
                  float-label="Unidade de medida"
                  :options="parsedUnidades(unidadesMedida)"
                  v-model="fixacao.unidadeMedidaPrecoId"
                />
              </div>
            </div>

          </div>
        </div>
      </q-step>

      &lt;!&ndash;PASSO 5 INFORMAR SE HAVERA DESCONTOS/ACRESCIMOS &ndash;&gt;
      <q-step title="Valor Líquido ou com desconto" name="descontos">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-10 col-md-6 col-lg-5">

            <div class="row justify-center">
              <div class="col-12 text-center q-title q-mb-sm">
                Este preço é
              </div>
              <div class="col-12">
                <q-list link no-border separator>
                  <q-item @click.native="selectDescontoAcrescimos(1)">
                    <q-item-side>
                      <q-btn v-if="selectedDescontoAcrescimoType == 1" icon="done" color="positive" size="8px" round dense/>
                    </q-item-side>
                    <q-item-main>
                      Líquido
                    </q-item-main>
                  </q-item>

                  <q-item @click.native="selectDescontoAcrescimos(2)">
                    <q-item-side>
                      <q-btn v-if="selectedDescontoAcrescimoType == 2" icon="done" color="positive" size="8px" round dense/>
                    </q-item-side>
                    <q-item-main>
                      Haverá descontos ou acréscimos e quero informar agora.
                    </q-item-main>
                  </q-item>

                  <q-item @click.native="selectDescontoAcrescimos(3)">
                    <q-item-side>
                      <q-btn v-if="selectedDescontoAcrescimoType == 3" icon="done" color="positive" size="8px" round dense/>
                    </q-item-side>
                    <q-item-main>
                      Haverá descontos ou acréscimos mas não sei os valores.
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      &lt;!&ndash;PASSO 6 INFORMAR DESCONTOS VALORES &ndash;&gt;
      <q-step title="Descontos e acréscimos" name="descontosAcrescimos" :disable="selectedDescontoAcrescimoType !== 2">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-9 col-md-7 col-lg-5">

            <div class="row justify-center" v-if="fixacao.moeda">
              <div class="col-12 text-center q-title q-mb-sm">
                Quais os valores de desconto/acréscimos?
              </div>

              <div class="col-3 self-center">Bruto:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.totalBruto" :disable="true" align="right" :prefix="fixacao.moeda.simbolo" />
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalBrutoUn).format('0,0.00') }} <span class="text-faded">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
              </div>

              <div class="col-3 self-center">Impostos:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.totalImpostos" align="right" :prefix="fixacao.moeda.simbolo"/>
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalImpostosUn).format('0,0.00') }}
                <span class="text-faded">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
              </div>

              <div class="col-3 self-center">Descontos:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.valorOutrosDescontos" align="right" :prefix="fixacao.moeda.simbolo"/>
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalDescontosUn).format('0,0.00') }}
                <span class="text-faded">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
              </div>

              <div class="col-3 self-center">Acrescimos:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.valorOutrosAcrescimos" align="right" :prefix="fixacao.moeda.simbolo" />
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalAcrescimosUn).format('0,0.00') }}
                <span class="text-faded">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
              </div>

              <div class="col-3 self-center">Total:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.totalLiquido" align="right" :disable="true" :prefix="fixacao.moeda.simbolo" />
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalLiquidoUn).format('0,0.00') }}
                <span class="text-faded">por {{getUnidadeMedidaById(fixacao.unidadeMedidaPrecoId).plural}}</span>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      &lt;!&ndash;PASSO 7 INFORMAR CONTA DE DEPOSITO &ndash;&gt;
      <q-step title="Contas" name="contaDeposito">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-10 col-md-6 col-lg-5">

            <div class="row justify-center">
              <div class="col-12 text-center q-title q-mb-sm">
                Em qual conta o valor será depositado?
              </div>
              <div class="col-12">
                <q-list link no-border separator>
                  <q-item v-for="conta in contasBancarias" @click.native="selectContaBancaria(conta)" :key="conta.id">
                    <q-item-side>
                      <q-btn v-if="isContaSelected(conta.id)" icon="done" color="positive" size="8px" round dense/>
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile>{{conta.banco.nome}}</q-item-tile>
                      <q-item-tile sublabel>{{conta.pessoa.nome}}</q-item-tile>
                      <q-item-tile sublabel>
                        <span class="text-faded">Agência:</span> {{conta.agencia}}-{{conta.agencia_digito}},
                        <span class="text-faded">Operação:</span> {{conta.operacao}},
                        <span class="text-faded">conta:</span> {{conta.numero}}
                      </q-item-tile>
                    </q-item-main>
                  </q-item>

                  <div v-if="contasBancarias.length === 0" class="list-empty">
                    <q-icon name="warning" />
                    <span>Nenhuma conta associada a essa pessoa. Cadastre uma para pode continuar</span>
                  </div>
                </q-list>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      &lt;!&ndash;PASSO 8 INFORMAR PARCELAS &ndash;&gt;
      <q-step title="Parcelas" name="parcelas">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

            <div class="row justify-center">
              <div class="col-12 text-center q-title q-mb-sm">
                Quantas Parcelas?
              </div>
              <div class="col-6" >
                <q-field>
                  <q-option-group type="radio" color="secondary" v-model="numParcelasFixacao"
                                  :options="[{ label: 'Uma', value: 1 },
                                               { label: 'Duas', value: 2},
                                               { label: 'Três', value: 3}
                                             ]"
                  />
                </q-field>
              </div>
              <div class="col-7">
                <q-input v-model="numParcelasFixacao" type="number" suffix="X" align="center"/>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      &lt;!&ndash;PASSO 9 INFORMAR VENCIMENTOS &ndash;&gt;
      <q-step title="Vencimentos" name="vencimentos">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-9 col-md-7 col-lg-5 text-center">
            <span class="q-title">Informe os vencimentos</span>

            <q-list no-border separator>
              <q-item v-for="(parcela, index) in fixacaoParcelas" :key="parcela.numero">
                <q-item-main>
                  <div class="row justify-center q-mt-md" >

                    <div class="col-xs-4 col-lg-2 self-center">
                      <span class="text-faded">Parcela</span> {{index + 1}}
                    </div>

                    <div class="col-xs-8 col-lg-3">
                      <q-datetime v-model="parcela.vencimento.value" type="date" :key="index"
                                  align="center" modal format="DD/MM/YYYY"/>
                    </div>

                    <div class="col-xs-6 col-lg-3 self-center text-center">
                      {{ numeral((moment(parcela.vencimento.value) - moment(dataAtual)) / (1000 * 3600 * 24)).format('0') }} Dias
                    </div>

                    <div class="col-xs-6 col-lg-4">
                      <q-input type="number" v-model="parcela.valor.value" :decimals="2" :prefix="fixacao.moeda.simbolo" align="right"/>
                    </div>
                  </div>

                </q-item-main>
              </q-item>
              <div class="row q-mt-md justify-end">
                <div class="col-xs-6 col-lg-4 self-center text-justify">
                  <span class="text-faded" v-if="fixacao.moeda">Total: {{fixacao.moeda.simbolo}}</span>&nbsp
                  <span :class="errorValueFixacao">{{numeral(fixacao.totalLiquido.value).format('0,0.00')}}</span>
                </div>
              </div>
            </q-list>

          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextFixacaoStep()" v-if="currentStep != 'vencimentos' "/>
      <q-btn label="salvar" color="primary" @click="saveAttachFixacao" :disable="isValidFixacaoParcelas" v-if="currentStep == 'vencimentos' "/>
    </q-page-sticky>
  </q-modal>-->
</template>

<script>
  import Fixacao from 'assets/js/model/negocio/Fixacao'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";
  import UnidadeMedidaService from "../../../../../assets/js/service/UnidadeMedidaService";
  import ContaBancariaService from "../../../../../assets/js/service/ContaBancariaService";
  import MoedaService from "../../../../../assets/js/service/MoedaService";
  import apModal from 'components/ApModal'

  export default {
    name: "NewFixacaoModal",
    components:{
      customInputText,
      customInputDatetime,
      apModal
    },
    data(){
      return{
        moedaService: new MoedaService(),
        contaBancariaService: new ContaBancariaService(),
        unidadeMedidaService: new UnidadeMedidaService(),
        negocioService: new NegocioService(),
        isModalOpened: false,
        currentStep: 0,

        fixacao: new Fixacao(),
        negocio: null,
        selectedNegocioCultura: null,
        maxQuantidade: 0,
        unidadesMedida: null,
        dataAtual: this.moment().format('YYYYMMDD'),
        fixacaoParcelas: null,
        errorValueFixacao: 'text-positive',
        isValidFixacaoParcelas: false,
        numParcelasFixacao: null,
        selectedDescontoAcrescimoType: null,
        moedas: null,
        negociosCulturas: null,
        contasBancarias: null,
      }
    },
    watch:{
      fixacaoParcelas: {
        handler: function (val, oldVal) {
          this.validateVerifyFixacaoParcelas()
        },
        deep: true
      },
      currentStep: function (val) {
        if(val === 'vencimentos'){
          this.generateFormFixacaoParcelas()
        }
        if(val !== 'vencimentos'){
          this.fixacaoParcelas = [];
        }
      }
    },
    computed: {
      totalBrutoUn: function () {
        if (this.fixacao.quantidade != 0) {
          this.fixacao.totalBruto.value = (this.fixacao.quantidade.value * this.fixacao.preco.value);
          return this.fixacao.totalBruto.value / this.fixacao.quantidade.value;
        }
        return null;
      },
      totalImpostosUn: function () {
        if (this.fixacao.quantidade.value != 0) {
          return this.fixacao.totalImpostos.value / this.fixacao.quantidade.value;
        }
        return null;
      },
      totalDescontosUn: function () {
        if (this.fixacao.quantidade.value != 0) {
          return this.fixacao.valorOutrosDescontos.value / this.fixacao.quantidade.value;
        }
        return null;
      },
      totalAcrescimosUn: function () {
        if (this.fixacao.quantidade.value != 0) {
          return this.fixacao.valorOutrosAcrescimos.value / this.fixacao.quantidade.value;
        }
        return null;
      },
      totalLiquidoUn: function () {
        if (this.fixacao.quantidade.value != 0) {
          this.fixacao.totalLiquido.value = (this.fixacao.totalBruto.value - (this.fixacao.valorOutrosDescontos.value + this.fixacao.totalImpostos.value)) + this.fixacao.valorOutrosAcrescimos.value;
          return this.fixacao.totalLiquido.value / this.fixacao.quantidade.value;
        }
        return null;
      }
    },
    methods:{
      openModal(negocio){
        this.isModalOpened = true;
        this.negocio = negocio;
        this.fixacao = new Fixacao();

        this.$refs.newFixacaoModal.showInnerProgress();

        Promise.all([
          this.listNegociosCulturas(negocio.id),
          this.listMoedas(),
          this.listContasBancarias(negocio.pessoa.id)
        ]).then(()=>{
          this.$refs.newFixacaoModal.hideInnerProgress();
        })

        /*this.listContasBancarias(negocio.pessoa.id)*/
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetModal();
        this.$emit('modal-closed')
      },
      resetModal(){
        this.$refs.stepperNovaFixacao.goToSlide(0);
        this.negociosCulturas = null;
        this.selectedNegocioCultura = null;
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      selectNegocioCultura(negocioCultura){
        this.selectedNegocioCultura = negocioCultura;
        this.maxQuantidade = negocioCultura.quantidade - negocioCultura.quantidade_ocupada;
        this.fixacao.quantidade.value = this.maxQuantidade;
        this.fixacao.unidadeMedidaPrecoId = negocioCultura.unidade_medida.id;
        this.fixacao.unidadeMedidaQuantidadeId = negocioCultura.safra_cultura.cultura.default_unidade_preco_id;

        this.getUnidadesMedida();
        this.goToNextStep();
      },
      isNegocioCulturaSelected(id) {
        if(!this.selectedNegocioCultura){
          return false;
        }
        return this.selectedNegocioCultura.id === id;
      },
      isNextFixacaoStep() {
        if(this.selectedNegocioCultura == null && this.currentStep === 0){
          return true;
        }
        if(this.currentStep === 1){
          if(this.fixacao.quantidade.value == null || this.fixacao.unidadeMedidaQuantidadeId == null){
            return true;
          }
        }
        if(this.fixacao.moeda == null && this.currentStep === 2){
          return true;
        }
        if(this.fixacao.preco.value == null && this.currentStep === 3){
          return true;
        }
        if(this.selectedDescontoAcrescimoType == null && this.currentStep === 4){
          return true;
        }
        if(this.fixacao.contaBancaria == null && this.currentStep === 6){
          return true;
        }
        if((this.numParcelasFixacao == null || this.numParcelasFixacao === 0) && this.currentStep === 7){
          return true
        }
        return false;
      },
      isSaveButtonVisible(){
        if(this.selectedDescontoAcrescimoType === 2 && this.currentStep === 7){
          return true;
        }else if(this.selectedDescontoAcrescimoType !== 2 && this.currentStep === 6){
          return true;
        }
        return false;
      },
      selectMoedaFixacao(moeda){
        this.fixacao.moeda = moeda;
        this.goToNextStep()
      },
      selectDescontoAcrescimos(type){
        this.selectedDescontoAcrescimoType = type;
        if(this.selectedDescontoAcrescimoType === 1){
          this.fixacao.isPrecoLiquido.value = true;
        }else if(this.selectedDescontoAcrescimoType === 2){
          this.fixacao.isPrecoLiquido.value = false;
        }else{
          this.fixacao.isPrecoLiquido.value = false;
        }
        this.goToNextStep();
      },
      validaQuantidade(){
        if(this.fixacao.quantidade.value > this.maxQuantidade){
          this.fixacao.quantidade.value = this.maxQuantidade
        }
      },
      selectContaBancaria(conta){
        this.fixacao.contaBancaria = conta;
        this.goToNextStep()
      },
      isContaSelected(id){
        if(!this.fixacao.contaBancaria){
          return false;
        }
        if(this.fixacao.contaBancaria.id === id){
          return true;
        }
      },
      generateFormFixacaoParcelas(){
        let total = 0;
        for (var parcela = 1; parcela <= this.numParcelasFixacao; parcela++) {
          let valorParcela = 0;
          if(parcela === this.numParcelasFixacao){
            valorParcela = parseFloat((this.fixacao.totalLiquido.value - total).toFixed(2));
          }else{
            valorParcela = Math.round((this.fixacao.totalLiquido.value * 100) / this.numParcelasFixacao)/100;
          }
          total += valorParcela;

          this.fixacaoParcelas.push({
            //numero: parcela,
            vencimento:{ value: this.moment().add(parcela * 30, 'days').format('YYYY-MM-DD')} ,
            valor: { value: valorParcela }
          });
        }
      },
      validateVerifyFixacaoParcelas(){
        let validaValorTotal = 0;
        this.fixacaoParcelas.forEach(function (valida) {
          validaValorTotal += parseFloat(valida.valor.value);
          if(valida.valor.value === ''){
            this.errorValueFixacao = 'text-negative';
            this.isValidFixacaoParcelas = true;
          }
          if(valida.vencimento.value == null){
            this.isValidFixacaoParcelas = true;
          }
        }, this);
        if(validaValorTotal > this.fixacao.totalLiquido.value || validaValorTotal < this.fixacao.totalLiquido.value){
          this.errorValueFixacao = 'text-negative';
          this.isValidFixacaoParcelas = true;
        }else{
          this.isValidFixacaoParcelas = false;
          this.errorValueFixacao = 'text-positive';
        }
      },
      saveAttachFixacao(){
        this.fixacao.parcelas = this.fixacaoParcelas;
        this.fixacao.dataFixacao.value = new Date();
        this.negocioService.saveAttachFixacao(this.selectedNegocioCultura.id, this.fixacao.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Fixação vinculada com sucesso'});
          this.closeModal();
          this.$root.$emit('refreshNegocio')
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      isMoedaSelected(id){
        if(!this.fixacao.moeda){
          return false;
        }
        if(this.fixacao.moeda.id === id){
          return true;
        }
      },
      goToNextStep(){
        this.$refs.stepperNovaFixacao.next();
      },
      goToPreviousStep(){
        this.$refs.stepperNovaFixacao.previous();
      },
      parsedUnidades(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome,
            value: unidade.id
          }
        })
      },
      getUnidadesMedida(){
        this.$refs.newFixacaoModal.showInnerProgress();
        this.unidadeMedidaService.listUnidadesMedida().then(unidades => {
          this.unidadesMedida = unidades;
          this.$refs.newFixacaoModal.hideInnerProgress();
        })
      },
      getUnidadeMedidaById(id){
        return this.unidadesMedida.filter(unidade => unidade.id === id)[0];
      },
      async listNegociosCulturas(negocioId){
        return this.negocioService.listNegociosCulturas(negocioId).then(negociosCulturas => {
          this.negociosCulturas = negociosCulturas;
        })
      },
      async listMoedas(){
        return this.moedaService.listMoedas().then(moedas => {
          this.moedas = moedas;
        })
      },
      async listContasBancarias(pessoaId){
        return this.contaBancariaService.listContasBancarias().then(contasBancarias => {
          this.contasBancarias = contasBancarias;
        });
      },
      negocioCulturaRestanteLabel(negocioCultura){
        if(negocioCultura.quantidade_ocupada > 0){
          return (negocioCultura.quantidade - negocioCultura.quantidade_ocupada)
            + " de " + negocioCultura.quantidade + ' ' + negocioCultura.unidade_medida.plural + ' disponíveis';
        }else{
          return negocioCultura.quantidade + ' ' + negocioCultura.unidade_medida.plural + ' disponíveis';
        }

      },
    },
  }
</script>

<style>
  .list-empty{
    height: 55px;
    text-align: center;
    padding-top: 15px;
  }
  .list-empty span{
    color: #8c8c8c;
    font-weight: 300;
    font-size: 15px;
  }
  .list-empty i{
    color: #ffb500;
    font-size: 20px;
    margin-right: 6px;
  }

  .moeda-card{
    text-align: center;
    margin: 8px;
  }
  .moeda-icon{
    background: #f3f1f1;
    display: inline-block;
    width: 60px;
    height: 60px;
    font-weight: 500;
    font-size: 20px;
    line-height: 60px;
    border-radius: 60px;
  }
  .moeda-icon-selected{
    background: #21ba45;
    color: white;
  }
  .moeda-nome{
    margin-top: 12px;
    font-size: 16px;
    color: #454545;
  }

  .custom-field .q-field-label-inner{
    color: #333333;
  }
</style>

<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Detalhes do Negocio" navigation_type="menu" >
    </toolbar>

    <!--CONTRATO VIEW-->
    <div class="row gutter-sm space-end q-ma-lg">

      <!--NEGOCIO-->
      <template>
        <div :class="direita">
          <div class="row gutter-xs">

            <div class="col-12">
              VENDA oQueVaiAqui? / oQueVaiAqui? - 20 dezembro 2018
            </div>

            <div class="col-12 text-faded ">
              Contrato de venda com ADM do Brasil Ltda emitido em 20 dezembro de 2018.
              Número do pedido 21695498 Número do contrato 65496665846
            </div>

            <div class="col-12">
              Observações
              <p class="text-faded ">so caso houver observaçoes o conteudo irá aqui</p>
            </div>

          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">
            <div class="col-12">
              <div class="row">
                <div class="col-9 self-center">ADM</div>
                <div class="col-3 self-center" align="end">
                  <q-btn icon="more_vert" color="primary" flat dense round></q-btn>
                </div>
              </div>
            </div>
            <div class="col-12 text-faded ">
              ADM do brasil Ltda, Rod BR 163 KM 855 - Camping club, Sinop-MT
            </div>
          </div>
        </div>
      </template>

      <!--NEGOCIO CULTURAS-->
      <template>
        <div :class="direita">
          <div class="row gutter-xs">
            <div class="col-12">SOJA 2018/2019</div>
            <div class="col-12 text-faded q-caption">
              Entrega
              <q-progress :percentage="progressModel + 10" height="6px" color="blue" animate stripe/>
            </div>
            <div class="col-12 text-faded q-caption">
              Fixações
              <q-progress :percentage="progressModel - 10" height="6px" color="blue" animate stripe/>
            </div>
            <div class="col-12 text-faded q-caption">
              Financeiro
              <q-progress :percentage="progressModel + 20" height="6px" color="blue" animate stripe/>
            </div>
            <div class="col-12">
              Observações
              <p class="text-faded ">so caso houver observaçoes o conteudo irá aqui</p>
            </div>
          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">
            <div class="col-12">
              <div class="row">
                <div class="col-9 self-center">DETALHES</div>
                <div class="col-3 self-center" align="end">
                  <q-btn icon="more_vert" color="primary" flat dense round></q-btn>
                </div>
              </div>
            </div>
            <div class="col-12">
              <span class="text-faded">Entregue</span> 3.500 <span class="text-faded">de</span> 5.000 SC/60
              <span class="text-faded">entre</span> 5 jan 2018 <span class="text-faded">e</span> 31 jan 2019.
              <span class="text-faded">Armazens</span> ADM Sinop, Bunge Sinop.
              <span class="text-faded">Tolerância de classificação</span> umidade 14%, impureza 1%, avariados 8%,
              verde 8%, quebrados 30%, mofados 6%, ardidos 4% e queimados 1%.
            </div>
          </div>

        </div>
      </template>

      <!--NEGOCIO FIXAÇOES-->
      <template>
        <div :class="direita">
          <div class="row">

            <div class="col-12 q-pb-xs">FINACEIRO</div>
            <div class="col-12 q-pb-xs">
              Recebido R$ 100.000,00
            </div>
            <div class="col-12  text-faded">
              R$ 20.000,00 em 15 fev 2019 na conta 22610-0
            </div>
            <div class="col-12  text-faded q-pb-xs">
              R$ 50.000,00 em (USD 12.88593 a taxa de 3,8802) em 01 fev na conta 22610-0
            </div>

            <div class="col-12 q-pb-xs">
              Para receber R$ 126.000,00
            </div>
            <div class="col-12  text-faded">
              R$ 30.000,00 em 01 mar 2019
            </div>
            <div class="col-12  text-faded">
              R$ 96.000,00 em 15 mar 2019
            </div>

          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">

            <div class="col-12">
              <div class="row">
                <div class="col-9 self-center">3000 SC60 EM 25 Jan 2018</div>
                <div class="col-3 self-center" align="end">
                  <q-btn icon="more_vert" color="primary" flat dense round></q-btn>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="row gutter-xs">
                <div class="col-4 q-pb-xs"></div>
                <div class="col-4 q-pb-xs ">SC60</div>
                <div class="col-4 q-pb-xs ">Total</div>

                <div class="col-4 text-faded"> Bruto </div>
                <div class="col-4 text-faded">R$ 68,00</div>
                <div class="col-4 text-faded">R$ 205.500,00</div>

                <div class="col-4 text-faded"> Impostos </div>
                <div class="col-4 text-faded">R$ 2,61</div>
                <div class="col-4 text-faded">R$ 7.816,50</div>

                <div class="col-4 text-faded"> Acréscimos </div>
                <div class="col-4 text-faded">R$ 0,50</div>
                <div class="col-4 text-faded">R$ 1.500,00</div>

                <div class="col-4 text-faded"> Descontos </div>
                <div class="col-4 text-faded">R$ 0,75</div>
                <div class="col-4 text-faded">R$ 2.250,00</div>

                <div class="col-4"> Líquido </div>
                <div class="col-4">R$ 65,64</div>
                <div class="col-4">R$ 196.933,50</div>

              </div>
            </div>

          </div>
        </div>
      </template>

      <!--TITULOS-->
      <template>
        <div :class="direita">
          <div class="row">

            <div class="col-12 q-pb-xs">FINACEIRO</div>
            <div class="col-12 q-pb-xs">
              Recebido R$ 100.000,00
            </div>
            <div class="col-12  text-faded">
              R$ 20.000,00 em 15 fev 2019 na conta 22610-0
            </div>
            <div class="col-12  text-faded q-pb-xs">
              R$ 50.000,00 em (USD 12.88593 a taxa de 3,8802) em 01 fev na conta 22610-0
            </div>

            <div class="col-12 q-pb-xs">
              Para receber R$ 126.000,00
            </div>
            <div class="col-12  text-faded">
              R$ 30.000,00 em 01 mar 2019
            </div>
            <div class="col-12  text-faded">
              R$ 96.000,00 em 15 mar 2019
            </div>

          </div>
        </div>
      </template>

      <!--NEGOCIO PRODUTOS-->
      <template>
        <div :class="direita">
          <div class="row">

            <div class="col-12 q-mb-xs">PRODUTOS</div>

            <div class="col-6 q-mb-xs">
              Produto
            </div>
            <div class="col-6 q-mb-xs">
              Quantidade
            </div>

            <div class="col-6 text-faded ">
              Adubo 08-40-00
            </div>
            <div class="col-6 text-faded ">
              350 Ton
            </div>

            <div class="col-6 text-faded ">
              KCL
            </div>
            <div class="col-6 text-faded ">
              256 Ton
            </div>

            <div class="col-6 text-faded ">
              Asist
            </div>
            <div class="col-6 text-faded ">
              1.400 L
            </div>

          </div>
        </div>

        <div :class="esquerda">
          <div class="row gutter-xs">
            <div class="col-5">Preço</div>
            <div class="col-5">Total</div>
            <div class="col-2">
              <q-btn icon="more_vert" color="primary" flat dense round></q-btn>
            </div>
            <div class="col-5 text-faded">R$ 36,69 SC60</div>
            <div class="col-5 text-faded">R$ 12.771,50 SC60</div>
            <div class="col-5 text-faded">R$ 29,10 SC60</div>
            <div class="col-5 text-faded">R$ 7.333,20 SC60</div>
            <div class="col-5 text-faded">R$ 0,22 SC60</div>
            <div class="col-5 text-faded">R$ 308,00 SC60</div>
            <div class="col-5"> Total</div>
            <div class="col-5">31.640,00 SC60</div>
          </div>

        </div>
      </template>

    </div>

    <!--EMPTY LIST-->
    <div class="column q-ma-xl items-center" v-if="!negocio">
      <div class="col-6">
        <img src="assets/images/sad_2.svg" class="responsive"/>
      </div>
      <div class="col-6 text-justify">
        <span>Nenhum resultado encontrado.</span>
      </div>
    </div>

    <!--PAGE STICKY BUTTOMS-->
    <q-page-sticky position="bottom-right" :offset="[35, 35]">
      <q-fab icon="add" direction="up" color="deep-orange" class="custom-fab" >
        <q-fab-action color="grey-1" text-color="grey-7" icon="add" @click="attachCultura()">
          <span class="shadow-2">Cultura</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachTitulo()" icon="add">
          <span class="shadow-2">Título</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachProduto()" icon="add">
          <span class="shadow-2">Produto</span>
        </q-fab-action>
        <q-fab-action color="grey-1" text-color="grey-7" @click="attachFixacao()" icon="add">
          <span class="shadow-2">Fixação</span>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <!--MODAL VINCULAR SAFRA CULTURA -->
    <q-modal key="safraCultura" v-model="modalAttachSafraCultura" maximized>

      <q-stepper key="safraCultura" ref="stepperSafraCultura" contractable color="positive" v-model="currentStepCultura" class="no-shadow" >

        <!--PASSO 1 ESCOLHER SAFRA-->
        <q-step default title="Safra" name="safra">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="safraCultura in 5" :key="safraCultura">
              <q-card @click.native="selectSafraCultura(safraCultura)">
                <q-card-media overlay-position="full">
                  <img src="assets/images/soja250x250.jpg"/>
                  <q-card-title slot="overlay" align="end" v-if="cultura.safraCulturaId.value == safraCultura">
                    <q-icon name="check_circle" size="30px" color="positive"/>
                  </q-card-title>
                </q-card-media>
                <q-card-main>
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">Soja</div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">2018-2019</div>
                  </div>
                </q-card-main>
              </q-card>
            </div>
          </div>
        </q-step>

        <!--PASSO 2 ESCOLHER PAGAR RECEBER -->
        <q-step title="Pagar/Receber" name="pagarReceber">

          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">

              <q-field helper=" " label="Você vai">
                <q-option-group type="radio" color="secondary" v-model="cultura.isPagar.value"
                                :options="[{ label: 'Pagar', value: true },
                                           { label: 'Receber', value: false}
                                          ]"
                />
              </q-field>

            </div>
          </div>

        </q-step>

        <!--PASSO 3 INFORMAR QUANTIDADE -->
        <q-step title="Quantidade" name="quantidade">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

              <div class="row justify-center">
                <div class="col-12" align="center">
                  Foi definida uma Quantidade? &nbsp
                  <q-btn-toggle
                    v-model="isQuantidade"
                    toggle-color="primary"
                    :options="[{label: 'Sim', value: true},{label: 'Não', value: false}]"
                  />
                </div>
                <div class="col-8">
                  <custom-input-text
                    type="number"
                    label="Quantidade"
                    :readonly="!isQuantidade"
                    :model="cultura.quantidade"
                  />
                  <q-select
                    :readonly="!isQuantidade"
                    float-label="Unidade de medida"
                    v-model="cultura.unidadeMedidaId.value"
                    :options="parsedUnidades(unidadesMedida)"
                  />
                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 4 INFORMAR PRAZO -->
        <q-step title="Prazo" name="prazo">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

              <div class="row justify-center">
                <div class="col-12" align="center">
                  Foi definida um prazo de entrega? &nbsp
                  <q-btn-toggle
                    v-model="isPrazo"
                    toggle-color="primary"
                    :options="[{label: 'Sim', value: true},{label: 'Não', value: false}]"
                  />
                </div>
                <div class="col-8">
                  <custom-input-datetime
                    type="date"
                    :disable="!isPrazo"
                    label="Prazo inicial"
                    :model="cultura.prazoEntregaInicial"
                  />
                  <custom-input-datetime
                    type="date"
                    :disable="!isPrazo"
                    label="Prazo final"
                    :model="cultura.prazoEntregaFinal"
                  />
                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 5 INFORMAR CLASSIFICACAO -->
        <q-step title="Classificação" name="classificacao">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

              <div class="row justify-center">
                <div class="col-12 q-mb-sm" align="center">
                  Qual foi o padrão de de classificação negociado?
                </div>
                <div class="col-8" v-for="(classificacao, index) in classificacoes" :key="classificacao.id">
                  <div class="row">
                    <div class="col-7 self-end">
                      {{classificacao.nome}}
                    </div>
                    <div class="col-4">
                      <q-input suffix="%" align="center" type="number" v-model="classificacao.tolerancia"/>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 6 INFORMAR LOCAIS DE ENTREGA -->
        <q-step title="Entrega" name="entrega">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

              <div class="row justify-center">
                <div class="col-12" align="center">
                  Quais os locais negociados para a entrega da produção?
                </div>
                <div class="col-12">
                  <q-list no-border separator link>
                    <q-item v-for="(armazem, index) in armazens" :key="armazem.id">
                      <q-item-main @click.native="toggleArmazem(armazem)" class="row">
                        <div class="col-2">
                          <q-btn icon="done" size="8px" color="positive" round v-if="isArmazemSelected(armazem)"/>
                        </div>
                        <div class="col-10">{{armazem.nome}}</div>
                        <div class="col-10 offset-2 q-caption text-faded">{{armazem.endereco}}</div>
                      </q-item-main>
                    </q-item>
                  </q-list>
                </div>
              </div>

            </div>
          </div>
        </q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepCulturaBtnEnable()" v-if="currentStepCultura != 'entrega' "/>
        <q-btn label="salvar" color="primary" @click="saveAttachCultura" :disable="selectedArmazens.length <= 0" v-if="currentStepCultura == 'entrega' "/>
      </q-page-sticky>
    </q-modal>

    <!--MODAL VINCULAR TITULO -->
    <q-modal v-model="modalAttachTitulo" maximized key="titulo">

      <q-stepper key="titulo" ref="stepperTitulo" contractable color="positive" v-model="currentStepTitulo" class="no-shadow">

        <!--PASSO 1 PAGAR OU RECEBER-->
        <q-step default title="Pagar/Receber" name="pagarReceber">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

              <div class="row justify-center">
                <div class="col-12 text-center q-title q-mb-sm">
                  Você vai
                </div>
                <div class="col-4" >
                  <q-field>
                    <q-option-group type="radio" color="secondary" v-model="titulo.isPagar.value"
                                    :options="[{ label: 'Pagar', value: true },
                                               { label: 'Receber', value: false }
                                             ]"
                    />
                  </q-field>
                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 2 INFORMAR MOEDA -->
        <q-step title="Moeda" name="moeda">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">

              <div class="row gutter-y-xs">
                <div class="col-12 q-title text-center">Qual a moeda?</div>
                <div class="col-12" v-for="moeda in moedas" :key="moeda.nome">
                  <q-btn class="full-width" @click.native="selectMoeda(moeda)" :color="isMoedaSelected(moeda.id)">
                    {{moeda.simbolo}}&nbsp{{moeda.nome}}
                  </q-btn>
                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 3 INFORMAR VALOR -->
        <q-step title="Valor" name="valor">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

              <div class="row justify-center">
                <div class="col-12 text-center q-title q-mb-sm">
                  Qual o valor?
                </div>
                <div class="col-12">
                  <custom-input-text key="valor" :prefix="prefixMoeda" type="number" :model="titulo.valor" align="center"/>
                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 4 INFORMAR PARCELAS -->
        <q-step title="Parcelas" name="parcelas">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

              <div class="row justify-center">
                <div class="col-12 text-center q-title q-mb-sm">
                  Quantas Parcelas?
                </div>
                <div class="col-6" >
                  <q-field>
                    <q-option-group type="radio" color="secondary" v-model="numParcelas"
                                    :options="[{ label: 'Uma', value: 1 },
                                               { label: 'Duas', value: 2},
                                               { label: 'Três', value: 3}
                                             ]"
                    />
                  </q-field>
                </div>
                <div class="col-7">
                  <q-input v-model="numParcelas" type="number" suffix="X" align="center"/>
                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 5 INFORMAR VENCIMENTOS -->
        <q-step title="Vencimentos" name="vencimentos">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-12 col-sm-9 col-md-7 col-lg-5 text-center">
              <span class="q-title">Informe as datas</span>

              <q-list no-border separator>
                <q-item v-for="parcela in verifyParcelas" :key="parcela.numero">
                  <q-item-main>
                    <div class="row justify-center q-mt-md" >

                      <div class="col-xs-4 col-lg-2 self-center">
                        <span class="text-faded">Parcela</span> {{parcela.numero}}
                      </div>

                      <div class="col-xs-8 col-lg-3">
                        <custom-input-datetime :key="parcela.numero" type="date" :model="parcela.vencimento"/>
                      </div>

                      <div class="col-xs-6 col-lg-3 self-center text-center">
                        {{ numeral((moment(parcela.vencimento.value) - moment(dataAtual)) / (1000 * 3600 * 24)).format('0') }} Dias
                      </div>

                      <div class="col-xs-6 col-lg-4">
                        <q-input type="number" v-model="parcela.valor.value" :decimals="2" :prefix="prefixMoeda" align="center"/>
                      </div>
                    </div>

                  </q-item-main>
                </q-item>
                <div class="row q-mt-md justify-end">
                  <div class="col-xs-6 col-lg-4 self-center text-justify">
                    <span class="text-faded">Total: {{prefixMoeda}}</span>&nbsp
                    <span :class="errorValue">{{numeral(titulo.valor.value).format('0,0.00')}}</span>
                  </div>
                </div>
              </q-list>

            </div>
          </div>
        </q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextTituloStep()" v-if="currentStepTitulo != 'vencimentos'"/>
        <q-btn label="salvar" color="primary" @click="saveAttachTitulo" :disable="isValid" v-if="currentStepTitulo  == 'vencimentos' "/>
      </q-page-sticky>
    </q-modal>

    <!--MODAL VINCULAR PRODUTO -->
    <q-modal key="produto" v-model="modalAttachProduto" maximized>

      <q-stepper key="produto" ref="stepperProduto" contractable color="positive" v-model="currentStepProduto" class="no-shadow" >

        <!--PASSO 1 ESCOLHER PRODUTO-->
        <q-step default title="Produto" name="produto">

          <div class="row text-center justify-center q-title">
            <div class="col-12">
              Escolher o produto
            </div>
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
              <q-input align="center" v-model="searchProdutos" :after="[{icon: 'search'}]"/>
            </div>
          </div>

          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">

              <div class="row justify-center">
                <div class="col-xs-12 col-sm-12 col-md-10 col-lg-6">
                  <q-list no-border link separator>
                    <q-item v-for="item in produtos" :key="item.id" @click.native="selectProduto(item)">
                      <q-item-side><q-btn icon="done" size="8px" round dense color="positive" v-if="item.id == produto.produtoId.value"/></q-item-side>
                      <q-item-main>
                        {{item.nome}}
                      </q-item-main>
                    </q-item>
                  </q-list>
                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 2 ESCOLHER INDEXADOR -->
        <q-step title="Indexador" name="indexador">

          <div class="row text-center justify-center q-title">
            <div class="col-12">
              Em qual indexador foi negociado?
            </div>
            <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
              <q-input align="center" v-model="searchProdutos" :after="[{icon: 'search'}]"/>
            </div>
          </div>

          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">

              <div class="row justify-center">
                <div class="col-xs-12 col-sm-12 col-md-10 col-lg-6">
                  <q-list no-border link separator>
                    <q-item v-for="item in indexadores" :key="item.id" @click.native="selectIndexador(item)">
                      <q-item-side>
                        <q-btn icon="done" size="8px" round dense color="positive" v-if="item.id == produto.indexadorId.value"/>
                      </q-item-side>
                      <q-item-main>
                        {{item.sigla}} {{item.nome}}
                      </q-item-main>
                    </q-item>
                  </q-list>
                </div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 3 INFORMAR DETALHES -->
        <q-step title="Informações" name="informacoes">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

              <custom-input-text type="number" :model="produto.quantidade" label="Toneladas"/>
              <custom-input-text type="number" :model="produto.preco" label="Preço por toneladas" prefix="SC60"/>
              <custom-input-text type="number" :model="produto.total" label="Valor Total"/>

            </div>
          </div>
        </q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextProdutoStep()" v-if="currentStepProduto != 'informacoes' "/>
        <q-btn label="salvar" color="primary" @click="saveAttachProduto" v-if="currentStepProduto == 'informacoes' "/>
      </q-page-sticky>
    </q-modal>

    <!--MODAL VINCULAR FIXACAO -->
    <q-modal key="fixacao" v-model="modalAttachFixacao" maximized>

      <q-stepper key="fixacao" ref="stepperFixacao" contractable color="positive" v-model="currentStepFixacao" class="no-shadow" >

        <!--PASSO 1 ESCOLHER NEGOCIANTE-->
        <q-step default title="fixacao" name="fixacao">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

              <div class="row justify-center">
                <div class="col-12 text-center q-title q-mb-sm"></div>
                <div class="col-4" ></div>
              </div>

            </div>
          </div>
        </q-step>

        <!--PASSO 2 INFORMAR DETALHES -->
        <q-step title="fixacao2" name="fixacao2">
          <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
            <div class="col-xs-8 col-sm-4 col-md-3 col-lg-2">

              <div class="row justify-center">
                <div class="col-12 text-center q-title q-mb-sm"></div>
                <div class="col-4" ></div>
              </div>

            </div>
          </div>
        </q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextProdutoStep()" v-if="currentStepFixacao"/>
        <q-btn label="salvar" color="primary" @click="saveAttachFixacao" v-if="currentStepFixacao"/>
      </q-page-sticky>
    </q-modal>

  </custom-page>
</template>
<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import Cultura from 'assets/js/model/negocio/Cultura'
  import Titulo from 'assets/js/model/negocio/Titulo'
  import Produto from 'assets/js/model/negocio/Produto'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  export default {
    name: "negocio-view",
    components: {
      toolbar,
      customPage,
      customInputText,
      customInputDatetime
    },
    data () {
      return {
        direita: 'col-xs-12 col-sm-12 col-md-7 col-lg-7',
        esquerda: 'col-xs-12 col-sm-12 col-md-5 col-lg-5',
        negocio: null,
        cultura: new Cultura(),
        progressModel: 50,
        isPrazo: false,
        isQuantidade: false,
        selectedArmazens: [],
        titulo: new Titulo(),
        prefixMoeda: null,
        numParcelas: null,
        verifyParcelas: [],
        isValid: false,
        errorValue: 'text-positive',
        dataAtual: this.moment().format('YYYYMMDD'),
        produto: new Produto(),
        searchProdutos: null,
        unidadesMedida: [],
        modalAttachSafraCultura: false,
        modalAttachTitulo: false,
        modalAttachProduto: false,
        modalAttachFixacao: false,
        currentStepCultura: 'safra',
        currentStepTitulo: 'pagarReceber',
        currentStepProduto: 'produto',
        currentStepFixacao: 'fixacao',

        classificacoes: [
          {
            id: 1,
            nome: 'Umidade',
            tolerancia: 14
          },
          {
            id: 2,
            nome: 'Impureza',
            tolerancia: 1
          },
          {
            id: 3,
            nome: 'Avariado',
            tolerancia: 1
          },
          {
            id: 4,
            nome: 'verde',
            tolerancia: 8
          },
          {
            id: 5,
            nome: 'quebrados',
            tolerancia: 30
          },

        ],
        armazens: [
          {
            id: 1,
            nome: 'Silo ADM',
            endereco: 'Rua sem nome, 2222 Bairro Camping Club Sinop-MT'
          },
          {
            id: 2,
            nome: 'Armazém Bunge',
            endereco: 'Rua sem nome, 2222 Bairro Camping Club Sinop-MT'
          },
          {
            id: 3,
            nome: 'Fiagril',
            endereco: 'Rua sem nome, 2222 Bairro Camping Club Sinop-MT'
          },
          {
            id: 4,
            nome: 'Na minha Casa',
            endereco: 'Rua sem nome, 2222 Bairro Camping Club Sinop-MT'
          }
        ],
        moedas:[
          {
            id: 1,
            nome: 'Real',
            plural: 'Reais',
            simbolo: 'R$'
          },
          {
            id: 2,
            nome: 'Dollar',
            plural: 'Dollars',
            simbolo: '$'
          }
        ],
        produtos: [
          {
            id: 1,
            nome: 'KCL',
            unidade_medida_id: 155
          },
          {
            id: 2,
            nome: 'AZOTO',
            unidade_medida_id: 155
          },
          {
            id: 3,
            nome: 'FÓSFORO',
            unidade_medida_id: 155
          },
          {
            id: 4,
            nome: 'POTÁSSIO',
            unidade_medida_id: 155
          }
        ],
        indexadores: [
          {
            id: 1,
            nome: 'Real',
            sigla: 'R$',
            moeda_id: 1,
            cultura_id: 1,
            unidade_media_id: 155
          },
          {
            id: 2,
            nome: 'Dollar',
            sigla: '$',
            moeda_id: 1,
            cultura_id: 1,
            unidade_media_id: 155
          },
          {
            id: 3,
            nome: 'Soja',
            sigla: 'SC',
            moeda_id: 1,
            cultura_id: 1,
            unidade_media_id: 155
          }
        ],
      }
    },
    watch: {
      verifyParcelas: {
        handler: function (val, oldVal) {
          this.validateVerifyParcelas()
        },
        deep: true
      },
      isQuantidade: function (val) {
        this.validaIsQuantidade()
      },
      isPrazo: function (val) {
        this.validaIsPrazo()
      },
      currentStepTitulo: function (val) {
        if(val == 'vencimentos'){
          this.generateFormParcelas()
        }
        if(val != 'vencimentos'){
          this.verifyParcelas = [];
        }
      }
    },
    methods: {
      attachCultura: function(){
        this.modalAttachSafraCultura = true;
      },
      selectSafraCultura: function(id){
        if(this.cultura.safraCulturaId.value == id){
          this.cultura.safraCulturaId.value = null;
        }else{
          this.cultura.safraCulturaId.value = id;
          this.goToNextStep()
        }
      },
      validaIsQuantidade: function(){
        if(this.isQuantidade == false){
          this.cultura.quantidade.value = null;
          this.cultura.unidadeMedidaId.value = null;
        }
      },
      validaIsPrazo: function(){
        if(!this.isPrazo){
          this.cultura.prazoEntregaInicial.value = null;
          this.cultura.prazoEntregaFinal.value = null;
        }
      },
      toggleArmazem: function(armazem){
        let existedArmazem = this.selectedArmazens.filter(function(item){
          return item.id === armazem.id;
        })[0];

        if(!existedArmazem){
          this.selectedArmazens.push(armazem);
          this.cultura.armazens = this.selectedArmazens;
        }else{
          let mappedList = this.selectedArmazens.map(function(item){return item.id;});
          let position = mappedList.indexOf(armazem.id);
          this.selectedArmazens.splice(position, 1);
          this.cultura.armazens = this.selectedArmazens;
        }
      },
      isArmazemSelected: function(armazem){
        let value = this.selectedArmazens.filter(function(item){return item.id === armazem.id;}) == 0;
        return !value
      },
      isNextStepCulturaBtnEnable: function(){
        if(this.cultura.safraCulturaId.value == null && this.currentStepCultura == 'safra'){
          return true
        }
        if(this.cultura.isPagar.value == null && this.currentStepCultura == 'pagarReceber'){
          return true
        }
        if(this.isQuantidade == true && this.currentStepCultura == 'quantidade'){
          if(this.cultura.quantidade.value == null || this.cultura.unidadeMedidaId.value == null){
            return true
          }
        }
        if(this.isPrazo == true && this.currentStepCultura == 'prazo'){
          if(this.cultura.prazoEntregaInicial.value == null || this.cultura.prazoEntregaFinal.value == null){
            return true;
          }
        }
        return false;
      },
      saveAttachCultura: function(id){
        negocioService.saveAttachCultura(this.cultura.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Safra cultura vinculada com sucesso'});
            this.closeModal();
            this.$router.go(-1);
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },

      attachTitulo: function(){
        this.modalAttachTitulo = true;
      },
      isNextTituloStep: function(){
        if(this.titulo.isPagar.value == null && this.currentStepTitulo == 'pagarReceber'){
         return true
        }
        if(this.titulo.moedaId.value == null && this.currentStepTitulo == 'moeda'){
          return true
        }
        if(this.titulo.valor.value == null && this.currentStepTitulo == 'valor'){
          return true
        }
        if((this.numParcelas == null || this.numParcelas == 0) && this.currentStepTitulo == 'parcelas'){
          return true
        }
        if(this.currentStepTitulo == 'vencimentos'){
          this.generateFormParcelas()
        }
        return false;
      },
      selectMoeda: function(moeda){
        if(this.titulo.moedaId.value == moeda.id){
          this.titulo.moedaId.value = null;
          this.prefixMoeda = null;
        }else{
          this.titulo.moedaId.value = moeda.id;
          this.prefixMoeda = moeda.simbolo;
          this.goToNextStep()
        }
      },
      isMoedaSelected: function(id){
        if(this.titulo.moedaId.value == id){
          return 'positive';
        }
      },
      generateFormParcelas: function(){
        let total = 0;
        for (var parcela = 1; parcela <= this.numParcelas; parcela++) {
          let valorParcela = 0;
          if(parcela === this.numParcelas){
            //valorParcela = this.titulo.valor.value - total;
            valorParcela = parseFloat((this.titulo.valor.value - total).toFixed(2));
          }else{
            valorParcela = Math.round((this.titulo.valor.value * 100) / this.numParcelas)/100;
          }
          total += valorParcela;

          this.verifyParcelas.push({
            numero: parcela,
            vencimento:{ value: this.moment().format('YYYY-MM-DD')} ,
            valor: { value: valorParcela }
          });
        }
      },
      validateVerifyParcelas: function(){
        let validaValorTotal = 0;
        this.verifyParcelas.forEach(function (valida) {
          validaValorTotal += parseFloat(valida.valor.value);
          if(valida.valor.value == ''){
            this.errorValue = 'text-negative'
            this.isValid = true;
          }
          if(valida.vencimento.value == null){
            this.isValid = true;
          }
        }, this);
        if(validaValorTotal > this.titulo.valor.value || validaValorTotal < this.titulo.valor.value){
          this.errorValue = 'text-negative';
          this.isValid = true;
        }else{
          this.isValid = false;
          this.errorValue = 'text-positive'
        }
      },
      saveAttachTitulo: function(){
        this.titulo.parcelas = this.verifyParcelas;
        negocioService.saveAttachTitulo(this.titulo.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Título vinculado com sucesso'});
            this.closeModal();
            this.$router.go(-1);
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },

      attachProduto: function(){
        this.modalAttachProduto = true;
      },
      selectProduto: function(produto){
        if(this.produto.produtoId.value == produto.id){
          this.produto.produtoId.value = null;
        }else{
          this.produto.produtoId.value = produto.id;
          this.goToNextStep()
        }
      },
      selectIndexador: function(idexador){
        if(this.produto.indexadorId.value == idexador.id){
          this.produto.indexadorId.value = null;
        }else{
          this.produto.indexadorId.value = idexador.id;
          this.goToNextStep()
        }
      },
      isNextProdutoStep: function(){
        if(this.produto.produtoId.value == null && this.currentStepProduto == 'produto'){
          return true
        }
        return false;
      },
      saveAttachProduto: function(){
        if(!this.negocio.isValid()){
          return;
        }
        negocioService.saveNegocio(this.negocio.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Negócio criado com sucesso'});
            this.listNegocios();
            this.closeModalNegocio();
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },

      attachFixacao: function(){
        this.modalAttachFixacao = true;
      },
      saveAttachFixacao: function(){
        if(!this.negocio.isValid()){
          return;
        }
        negocioService.saveNegocio(this.negocio.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Negócio criado com sucesso'});
            this.listNegocios();
            this.closeModalNegocio();
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },

      delete1: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.listCulturas()
          })
        }).catch(()=>{});
      },
      delete2: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.listCulturas()
          })
        }).catch(()=>{});
      },
      delete3: function(id){
        this.$q.dialog({
          title: 'Atenção',
          message: 'Realmente deseja apagar esta Negocio?',
          ok: 'Sim', cancel: 'Não',
          color: 'primary'
        }).then(data => {
          negocioService.deleteNegocio(id).then(response => {
            this.listCulturas()
          })
        }).catch(()=>{});
      },

      getUnidadesMedida:function(){
        unidadeMedidaService.listUnidadesMedida().then(response => {
          this.unidadesMedida = response.data;
        })
      },
      parsedUnidades: function(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome,
            value: unidade.id
          }
        })
      },
      closeModal: function(){
        this.cultura = new Cultura();
        this.titulo = new Titulo();
        this.currentStepCultura = 'safra';
        this.currentStepTitulo = 'pagarReceber';
        this.modalAttachSafraCultura = false;
        this.modalAttachTitulo = false;
        this.modalAttachProduto = false;
        this.modalAttachFixacao = false;
        // this.currentStep = 'negociante';
      },
      getNegocioById: function(){
        negocioService.getNegocioById(this.$route.params.id).then(response => {
          this.negocio = response.data;
        });
        this.negocio = 'ijijiijiji';
      },
      goToNextStep(){
        if(this.modalAttachSafraCultura){
          //Cultura
          if(this.currentStepCultura === 'classificacao'){
            this.cultura.classificacoes = this.classificacoes;
          }
        }
        this.$refs.stepperSafraCultura.next();
        this.$refs.stepperTitulo.next();
        this.$refs.stepperProduto.next();
      }
    },
    mounted () {
      this.getNegocioById();
      this.getUnidadesMedida();
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
  // this.$q.notify({type: 'negative', message: 'aqui'})

</script>
<style>
  .space-end{
    margin-bottom: 200px;
  }
  .custom-fab .q-fab-actions .q-btn  span{
    position: absolute;
    background: white;
    right: 46px;
    border-radius: 6px;
    /*border: 1px solid #d7d7d7;*/
    padding: 7px 10px;
  }
</style>

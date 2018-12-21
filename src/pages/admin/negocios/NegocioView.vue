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

    <!--MODAL VINCULAR CULTURA -->
    <q-modal v-model="modalAttachCultura" maximized>

      <q-stepper ref="stepper" contractable color="positive" v-model="currentStepCultura" class="no-shadow" >

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
              <q-radio v-model="cultura.isPagar.value" val="true" label="Entregar a sua colheita" class="q-mb-sm"/>
              <q-radio v-model="cultura.isPagar.value" val="false" label="Receber a colheita de outro produtor" />
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
        <q-btn label="salvar" color="primary" @click="saveAttachCultura" v-if="currentStepCultura == 'entrega' "/>
      </q-page-sticky>
    </q-modal>

    <!--MODAL VINCULAR PRODUTO -->
    <q-modal v-model="modalAttachProduto" maximized>

      <q-stepper ref="stepperProduto" contractable color="positive" v-model="currentStepProduto" class="no-shadow" >

        <!--PASSO 1 ESCOLHER NEGOCIANTE-->
        <q-step default title="Negociante" name="negociante"></q-step>

        <!--PASSO 2 INFORMAR DETALHES -->
        <q-step title="Informações" name="informacoes"></q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="!isNextButtomEnabled()" v-if="currentStepProduto"/>
        <q-btn label="salvar" color="primary" @click="saveAttachProduto" v-if="currentStepProduto"/>
      </q-page-sticky>
    </q-modal>

    <!--MODAL VINCULAR TITULO -->
    <q-modal v-model="modalAttachTitulo" maximized>

      <q-stepper ref="stepperTitulo" contractable color="positive" v-model="currentStepTitulo" class="no-shadow" >

        <!--PASSO 1 ESCOLHER NEGOCIANTE-->
        <q-step default title="Negociante" name="negociante"></q-step>

        <!--PASSO 2 INFORMAR DETALHES -->
        <q-step title="Informações" name="informacoes"></q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="!isNextButtomEnabled()" v-if="currentStepTitulo"/>
        <q-btn label="salvar" color="primary" @click="saveAttachTitulo" v-if="currentStepTitulo"/>
      </q-page-sticky>
    </q-modal>

    <!--MODAL VINCULAR FIXACAO -->
    <q-modal v-model="modalAttachTitulo" maximized>

      <q-stepper ref="stepperFixacao" contractable color="positive" v-model="currentStepFixacao" class="no-shadow" >

        <!--PASSO 1 ESCOLHER NEGOCIANTE-->
        <q-step default title="Negociante" name="negociante"></q-step>

        <!--PASSO 2 INFORMAR DETALHES -->
        <q-step title="Informações" name="informacoes"></q-step>

      </q-stepper>

      <q-page-sticky position="bottom-right" :offset="[30, 30]">
        <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
        <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="!isNextButtomEnabled()" v-if="currentStepFixacao"/>
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
        unidadesMedida: [],
        modalAttachCultura: false,
        modalAttachTitulo: false,
        modalAttachProduto: false,
        modalAttachFixacao: false,
        currentStepCultura: 'safra',
        currentStepFixacao: 'safra',
        currentStepTitulo: 'safra',
        currentStepProduto: 'safra',

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
        selectedArmazens: [],
      }
    },
    watch: {
      isQuantidade: function (val) {
        this.validaIsQuantidade()
      },
      isPrazo: function (val) {
        this.validaIsPrazo()
      }
    },
    methods: {
      attachCultura: function(){
        this.modalAttachCultura = true;
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
        }else{
          let mappedList = this.selectedArmazens.map(function(item){return item.id;});
          let position = mappedList.indexOf(armazem.id);
          this.selectedArmazens.splice(position, 1);
        }
      },
      isArmazemSelected: function(armazem){
        let value = this.selectedArmazens.filter(function(item){return item.id === armazem.id;}) == 0;
        return !value
      },
      isNextStepCulturaBtnEnable: function(){
        if(this.cultura.safraCulturaId.value != null && this.currentStepCultura == 'safra'){
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
            return true
          }
        }
        return false
        this.$q.notify({type: 'negative', message: 'aqui'})
      },
      saveAttachCultura: function(id){
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

      attachTitulo: function(){
        this.modalAttachTitulo = true;
      },
      saveAttachTitulo: function(){
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

      attachProduto: function(){
        this.modalAttachProduto = true;
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
        this.currentStepCultura = 'safra';
        this.modalAttachCultura = false;
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
      isNextButtomEnabled: function(){
        if(this.currentStepCultura){
          return true
        }
        return false
      },
      goToNextStep(){
        if(this.modalAttachCultura){
          //Cultura
          if(this.currentStepCultura === 'classificacao'){
            this.cultura.classificacoes = this.classificacoes;
          }
        }
        this.$refs.stepper.next();
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

<template>
  <ap-modal ref="newFixacaoModal" title="Nova Fixação" :visible="isModalOpened"
            :searchable="hasSearch" @search-input="search" @search-close="closeSearch" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperNovaFixacao" @slide-trigger="setStepperIndex">

      <!--PASSO 1 ESCOLHER NEGOCIO CULTURA-->
      <q-carousel-slide class="q-pa-none">
        <template v-if="negociosCulturas">
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione um negócio</span>
          </div>

          <div class="relative-position" >
            <q-scroll-area style="width: auto; height: 350px;">

              <div class="row gutter-sm space-end q-pa-md" >
                <div class="col-sm-6 col-xs-12" v-for="negocioCultura in negociosCulturasFiltered" :key="negocioCultura.id">

                  <q-card @click.native="selectNegocioCultura(negocioCultura)" class="cursor-pointer	full-height">

                    <q-card-title>
                      {{negocioCultura.negocio.pessoa}}
                      <q-btn v-if="isNegocioCulturaSelected(negocioCultura.id)" slot="right" icon="done" color="positive" size="8px" round/>
                      <span slot="subtitle" v-if="negocioCultura.negocio.numero_contrato != ''">
                    {{negocioCultura.negocio.numero_contrato}}
                  </span>
                    </q-card-title>
                    <q-card-separator />
                    <q-list dense>

                      <!-- Prazo -->
                      <q-item v-if="negocioCultura.prazo_entrega_final">
                        <q-item-side icon="mdi-calendar" />
                        <q-item-main>
                          <q-item-tile label>
                            {{moment(negocioCultura.prazo_entrega_final).format('DD/MMM/YYYY')}}
                          </q-item-tile>
                          <q-item-tile sublabel>
                            {{moment(negocioCultura.prazo_entrega_final).fromNow()}}
                          </q-item-tile>
                        </q-item-main>
                      </q-item>

                      <!-- Quantidade -->
                      <q-item>
                        <q-item-side icon="mdi-scale" />
                        <q-item-main>
                          <q-item-tile label>
                            {{numeral(negocioCultura.quantidade).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                          </q-item-tile>
                          <q-item-tile sublabel>
                            Quantidade Total
                          </q-item-tile>
                        </q-item-main>
                      </q-item>

                      <!-- entregue -->
                      <q-item>
                        <q-item-side icon="mdi-arrow-top-right" color="green" />
                        <q-item-main v-if="negocioCultura.quantidade_entregue">
                          <q-item-tile label>
                            {{numeral(negocioCultura.quantidade_entregue).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                          </q-item-tile>
                          <q-item-tile sublabel>
                            Já Entregue
                          </q-item-tile>
                        </q-item-main>
                        <q-item-main v-else>
                          Nada entregue
                        </q-item-main>

                      </q-item>

                      <!-- QUANTIDADE -->
                      <!--SE NAO FINALIZADO-->
                      <q-item v-if="negocioCultura.quantidade_entregue < negocioCultura.quantidade">
                        <q-item-side icon="mdi-arrow-bottom-left" color="red" />
                        <q-item-main>

                          <q-item-tile label>
                            {{numeral(negocioCultura.quantidade_restante).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                          </q-item-tile>

                          <q-item-tile sublabel>
                            Faltando
                          </q-item-tile>

                          <q-item-tile class="text-negative" v-if="negocioCultura.entregas_pendentes">
                            {{negocioCultura.entregas_pendentes}} Cargas aguardando no armazém
                          </q-item-tile>

                        </q-item-main>
                      </q-item>

                      <!--SE QUANTIDADE ENTREGUE MAIOR QUE O COMBINADO-->
                      <q-item v-if=" Math.floor(negocioCultura.quantidade_entregue) > negocioCultura.quantidade">
                        <q-item-side icon="arrow_upward" color="warning" />
                        <q-item-main>

                          <q-item-tile label>
                            {{numeral(negocioCultura.quantidade_restante).format('0,0')}} {{negocioCultura.unidade_medida_sigla}}
                          </q-item-tile>

                          <q-item-tile sublabel>
                            Passando
                          </q-item-tile>

                          <q-item-tile class="text-negative" v-if="negocioCultura.entregas_pendentes">
                            {{negocioCultura.entregas_pendentes}} Cargas aguardando no armazém
                          </q-item-tile>

                        </q-item-main>
                      </q-item>

                      <!--SE JA FINALIZADO-->
                      <q-item v-if="negocioCultura.quantidade == Math.floor(negocioCultura.quantidade_entregue)">
                        <q-item-side icon="thumb_up_alt" color="positive"/>
                        <q-item-main>
                          Finalizado
                        </q-item-main>
                      </q-item>

                    </q-list>


                  </q-card>
                </div>
              </div>

              <div v-if="negociosCulturasFiltered.length === 0" class="list-empty">
                <q-icon name="warning" />
                <span>Nenhum negócio encontrado!</span>
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


          <div class="q-px-lg q-py-sm">
            <div class="row justify-center q-mt-lg">
              <div class="col-xs-12 col-sm-6">
                <q-slider v-model="fixacao.quantidade.value" :min="0" :max="maxQuantidade" label  snap/>
              </div>
            </div>

            <div class="row justify-center q-mt-sm">
              <div class="col-xs-12 col-sm-6">
                <q-input stack-label="Quantidade" v-model="fixacao.quantidade.value" type="number" align="right" @blur="validaQuantidade"/>
              </div>
            </div>

            <div class="row justify-center q-mt-sm">
              <div class="col-xs-12 col-sm-6">
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
              <div class="col-xs-12 col-sm-6">
                <q-input v-money="money" :prefix="fixacao.moeda.simbolo" v-model="fixacao.preco.value" stack-label="Preço" align="right"/>
              </div>
            </div>
            <div class="row justify-center q-mt-sm">
              <div class="col-xs-12 col-sm-6" >
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
        <div class="q-px-lg q-py-sm text-center">
          <div class="counter-container">
            <q-btn icon="remove" class="counter-minus" round outline color="primary" @click="decreaseParcelaValue"/>
            <q-input type="number" class="counter-input" @blur="validParcelaValue"
                     v-model="numParcelasFixacao" hide-underline align="center"/>
            <q-btn icon="add" class="counter-plus" round outline color="primary" @click="increaseParcelaValue" />
          </div>
        </div>
        <!--<div class="row justify-center q-px-lg q-py-sm">
         <div class="col-6" >

           <!field>
             <q-option-group type="radio" color="secondary" v-model="numParcelasFixacao"
                             :options="[{ label: 'Uma', value: 1 },
                                              { label: 'Duas', value: 2},
                                              { label: 'Três', value: 3}
                                            ]"
             />
           </q-field>
           <q-input v-model="numParcelasFixacao" type="number" suffix="x" align="center"/>
          </div>
        </div>-->
      </q-carousel-slide>

      <!--PASSO 9 INFORMAR VENCIMENTOS-->
      <q-carousel-slide class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informe o vencimento das parcelas</span>
        </div>

        <q-scroll-area style="width: auto; height: 315px;">
          <q-list no-border inset-separator>
            <q-item v-for="(parcela, index) in fixacaoParcelas" :key="parcela.numero">
              <q-item-side class="q-item-letter bg-primary q-item-inverted flex flex-center">{{(index + 1) + 'ª'}}</q-item-side>
              <q-item-main>
                <div class="row" >

                  <div class="col-sm-6 col-xs-8">
                    <q-datetime v-model="parcela.vencimento.value" type="date" class="responsive-text-input"
                                :key="index" inverted color="primary"
                                align="center" modal format="DD/MM/YYYY"/>
                  </div>

                  <div class="col-sm-6 col-xs-4 self-center text-center text-faded">
                    <span class="q-body-1">{{ numeral((moment(parcela.vencimento.value) - moment(dataAtual)) / (1000 * 3600 * 24)).format('0') }} Dias</span>
                  </div>
                </div>

              </q-item-main>
              <q-item-side right style="width:100px">
                <q-input type="number" v-model="parcela.valor.value" inverted-light color="grey-1" width="100px"
                         :decimals="2" :prefix="fixacao.moeda.simbolo" align="right" class="responsive-text-input"/>
              </q-item-side>
            </q-item>
          </q-list>
        </q-scroll-area>
        <div class="row q-mx-md q-my-sm justify-end">
          <span class="text-faded" v-if="fixacao.moeda">Total: {{fixacao.moeda.simbolo}}</span>&nbsp
          <span :class="errorValueFixacao">{{numeral(fixacao.totalLiquido.value).format('0,0.00')}}</span>
        </div>

      </q-carousel-slide>

    </q-carousel>


    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep > 0"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" :disable="isNextFixacaoStep()" v-if="!isSaveButtonVisible()" />
        <q-btn @click="saveAttachFixacao" :disable="isValidFixacaoParcelas" flat label="Salvar" color="primary" v-if="isSaveButtonVisible()"/>
      </div>
    </div>
  </ap-modal>

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
  import {VMoney} from 'v-money'

  export default {
    name: "NewFixacaoModal",
    components:{
      customInputText,
      customInputDatetime,
      apModal,
    },
    directives: {money: VMoney},
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
        fixacaoParcelas: [],
        errorValueFixacao: 'text-positive',
        isValidFixacaoParcelas: false,
        numParcelasFixacao: 1,
        selectedDescontoAcrescimoType: null,
        moedas: null,
        negociosCulturas: null,
        negociosCulturasFiltered: null,
        contasBancarias: null,
        searchValueByStep: null,
        hasSearch: true,
        money: {
          decimal: ',',
          thousands: '.',
          precision: 2,
        },
      }
    },
    watch:{
      fixacaoParcelas: {
        handler: function (val, oldVal) {
          this.validateVerifyFixacaoParcelas()
        },
        deep: true
      },
      currentStep: function (value) {
        if(this.selectedDescontoAcrescimoType === 2 && value === 8){
         this.generateFormFixacaoParcelas()
       }else if(this.selectedDescontoAcrescimoType !== 2 && value === 7){
         this.generateFormFixacaoParcelas()
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
        this.searchValueByStep = new Map();

        this.$refs.newFixacaoModal.showInnerProgress();
        Promise.all([
          this.listNegociosCulturas(),
          this.listMoedas(),
          this.listContasBancarias(negocio.pessoa.id)
        ]).then(()=>{
          this.$refs.newFixacaoModal.hideInnerProgress();
        })
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetModal();
        this.$emit('modal-closed')
      },
      resetModal(){
        this.$refs.stepperNovaFixacao.goToSlide(0);
        this.negociosCulturas = null;
        this.negociosCulturasFiltered = null;
        this.numParcelasFixacao = 1;
        this.selectedNegocioCultura = null;
        this.selectedDescontoAcrescimoType = null;
        this.fixacaoParcelas = [];
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
        this.hasSearch = this.currentStep === 0;
      },
      search(value){
        if(value === ""){
          this.searchValueByStep.delete(this.currentStep);
        }else{
          this.searchValueByStep.set(this.currentStep, value);
        }

        value = value.toLowerCase().replace(" ", "");
        if(value === ""){
          this.negociosCulturasFiltered = this.negociosCulturas;
        }else{
          this.negociosCulturasFiltered = this.negociosCulturas.filter(item => {
            if(item.negocio.pessoa.toLowerCase().match(value) ||
              item.negocio.numero_contrato.toLowerCase().match(value) ||
              (item.negocio.numero_pedido != null && item.negocio.numero_pedido.toLowerCase().match(value))){
              return true;
            }else{
              return false;
            }
          })
        }
      },
      closeSearch(event){
        if(event === 'click'){
          this.search("");
        }
      },
      selectNegocioCultura(negocioCultura){
        this.selectedNegocioCultura = negocioCultura;
        this.maxQuantidade = negocioCultura.quantidade - negocioCultura.quantidade_entregue;
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
        if(this.selectedDescontoAcrescimoType === 2 && this.currentStep === 8){
          return true;
        }else if(this.selectedDescontoAcrescimoType !== 2 && this.currentStep === 7){
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
        if(this.selectedDescontoAcrescimoType === 1 || this.selectedDescontoAcrescimoType === 3){
          if(this.selectedDescontoAcrescimoType === 1){
            this.fixacao.isPrecoLiquido.value = true;
          }
          this.fixacao.totalBruto.value = this.fixacao.quantidade.value * this.fixacao.preco.value;
          this.fixacao.totalLiquido.value = this.fixacao.totalBruto.value;
        }else{
          this.fixacao.isPrecoLiquido.value = false;
        }
        this.goToNextStep();
      },
      validaQuantidade(){
        if(this.fixacao.quantidade.value > this.maxQuantidade){
          this.fixacao.quantidade.value = this.maxQuantidade;
        }else if(this.fixacao.quantidade.value < 0){
          this.fixacao.quantidade.value = 0;
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
        this.fixacaoParcelas = [];
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
      increaseParcelaValue(){
        this.numParcelasFixacao++;
      },
      decreaseParcelaValue(){
        if(this.numParcelasFixacao === 1){
          return;
        }
        this.numParcelasFixacao--;
      },
      validParcelaValue(){
        if(this.numParcelasFixacao < 1){
          this.numParcelasFixacao = 1;
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
        this.$refs.newFixacaoModal.showOuterProgress();
        this.fixacao.parcelas = this.fixacaoParcelas;
        this.fixacao.dataFixacao.value = new Date();
        this.negocioService.saveAttachFixacao(this.selectedNegocioCultura.id, this.fixacao.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Fixação vinculada com sucesso'});
          this.$refs.newFixacaoModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshNegocio')
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.newFixacaoModal.hideOuterProgress();
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
      async listNegociosCulturas(){
        return this.negocioService.listNegociosCulturas('filter=without_empty').then(negociosCulturas => {
          this.negociosCulturas = negociosCulturas;
          this.negociosCulturasFiltered = negociosCulturas;
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
    background: #005f5f;
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
  
  .counter-container{
    align-items: center;
    display: inline-flex;
    margin-top: 20px;
  }
  .counter-container .counter-input{
    width: 100px;
    height: 100px;
    border-radius: 50px;
    padding: 10px;
    margin: 0 12px;
    background: #fafafa;
    border: 1px solid #005f5f;
  }

  .counter-container .counter-input input{
    font-size: 30px;
    height: auto;
    color: #005f5f;
    font-weight: 500;
  }

  .responsive-text-input{
    background: #fafafa !important;
  }

  .q-if-focused:not(.q-if-readonly) .q-if-control,
  .responsive-text-input .q-if-control,
  .responsive-text-input .q-input-target{
    color: #000;
  }

  @media (max-width: 425px) {
    .responsive-text-input.q-datetime-input .q-if-control{
      display:none;
    }
    .responsive-text-input.q-datetime-input,
    .responsive-text-input span,
    .responsive-text-input input{
      font-size: 13px;
    }
  }

</style>

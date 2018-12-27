<template>
  <q-modal key="fixacao" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="fixacao" ref="stepperFixacao" contractable color="positive" v-model="currentStep" class="no-shadow" >

      <!--PASSO 1 ESCOLHER NEGOCIO CULTURA-->
      <q-step default title="Escolher a safra cultura" name="negocioCultura">
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
                      <q-btn v-if="selectedSafraId == negocioCultura.id" icon="done" color="positive" size="8px" round dense/>
                    </q-item-side>
                    <q-item-main class="row">
                      <div class="col-4">
                        {{negocioCultura.cultura}}&nbsp<span v-if="negocioCultura.is_safrinha">Safrinha</span>
                      </div>
                      <div class="col-4">
                        {{negocioCultura.ano_inicio}}/{{negocioCultura.ano_fim}}
                      </div>
                      <div class="col-4 text-faded q-caption">
                        {{numeral(negocioCultura.quantidade).format('0,0')}} {{negocioCultura.unidade_medida}}
                      </div>
                    </q-item-main>
                  </q-item>

                </q-list>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 2 INFORMAR QUANTIDADE -->
      <q-step title="Quantidade Fixada" name="quantidade">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-8 col-md-5 col-lg-3">

            <div class="row justify-center gutter-xs">
              <div class="col-12 text-center q-title q-mb-sm">
                Qual quantidade Foi fixada?
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
                  v-model="fixacao.unidadeMedidaQuantidadeId.value"
                />
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 3 INFORMAR MOEDA -->
      <q-step title="Escolher moeda" name="moeda">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">

            <div class="row gutter-y-xs">
              <div class="col-12 q-title text-center">Qual a moeda?</div>
              <div class="col-12" v-for="moeda in moedas" :key="moeda.nome">
                <q-btn class="full-width" @click.native="selectMoedaFixacao(moeda)" :color="isMoedaSelected(moeda.id)">
                  {{moeda.simbolo}}&nbsp{{moeda.nome}}
                </q-btn>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 4 INFORMAR PRECO -->
      <q-step title="Preço fixado" name="preco">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-8 col-md-5 col-lg-3">

            <div class="row justify-center gutter-xs">
              <div class="col-12 text-center q-title q-mb-sm">
                Qual Preço Foi fixado?
              </div>
              <div class="col-6">
                <custom-input-text :prefix="prefixMoeda" :model="fixacao.preco" type="number" label="Preço" align="center"/>
              </div>
              <div class="col-6" >
                <q-select
                  align="center"
                  float-label="Unidade de medida"
                  :options="parsedUnidades(unidadesMedida)"
                  v-model="fixacao.unidadeMedidaQuantidadeId.value"
                />
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 5 INFORMAR SE HAVERA DESCONTOS/ACRESCIMOS -->
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

      <!--PASSO 6 INFORMAR DESCONTOS VALORES -->
      <q-step title="Descontos e acréscimos" name="descontosAcrescimos" :disable="!fixacao.isPrecoLiquido.value">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-9 col-md-7 col-lg-5">

            <div class="row justify-center">
              <div class="col-12 text-center q-title q-mb-sm">
                Quais os valores de desconto/acréscimos?
              </div>

              <div class="col-3 self-center">Bruto:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.totalBruto" :disable="true" align="right" :prefix="prefixMoeda"/>
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalBrutoUn).format('0,0.00') }} <span class="text-faded">por Saca 60 kg</span>
              </div>

              <div class="col-3 self-center">Impostos:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.totalImpostos" align="right" :prefix="prefixMoeda"/>
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalImpostosUn).format('0,0.00') }}
                <span class="text-faded">por Saca 60 kg</span>
              </div>

              <div class="col-3 self-center">Descontos:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.valorOutrosDescontos" align="right" :prefix="prefixMoeda"/>
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalDescontosUn).format('0,0.00') }}
                <span class="text-faded">por Saca 60 kg</span>
              </div>

              <div class="col-3 self-center">Acrescimos:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.valorOutrosAcrescimos" align="right" :prefix="prefixMoeda" />
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalAcrescimosUn).format('0,0.00') }}
                <span class="text-faded">por Saca 60 kg</span>
              </div>

              <div class="col-3 self-center">Total:</div>
              <div class="col-4">
                <custom-input-text type="number" :model="fixacao.totalLiquido" align="right" :disable="true" :prefix="prefixMoeda"/>
              </div>
              <div class="col-5 self-center" align="end">
                {{ numeral(totalLiquidoUn).format('0,0.00') }}
                <span class="text-faded">por Saca 60 kg</span>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 7 INFORMAR CONTA DE DEPOSITO -->
      <q-step title="Conta para Depósito" name="contaDeposito">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-10 col-md-6 col-lg-5">

            <div class="row justify-center">
              <div class="col-12 text-center q-title q-mb-sm">
                Em qual conta o valor será depositado?
              </div>
              <div class="col-12">
                <q-list link no-border separator>
                  <q-item v-for="bancoConta in bancosContas" @click.native="selectBancoConta(bancoConta)" :key="bancoConta.id">
                    <q-item-side>
                      <q-btn v-if="selectedContaBancariaId == bancoConta.conta.id" icon="done" color="positive" size="8px" round dense/>
                    </q-item-side>
                    <q-item-main>
                      <q-item-tile>{{bancoConta.nome}}</q-item-tile>
                      <q-item-tile sublabel>{{bancoConta.pessoa.nome}}</q-item-tile>
                      <q-item-tile sublabel>
                        <span class="text-faded">Agência:</span> {{bancoConta.conta.agencia}},
                        <span class="text-faded">Operação:</span> {{bancoConta.conta.operacao}},
                        <span class="text-faded">conta:</span> {{bancoConta.conta.numero}}
                      </q-item-tile>
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 8 INFORMAR PARCELAS -->
      <q-step title="Número de parcelas" name="parcelas">
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

      <!--PASSO 9 INFORMAR VENCIMENTOS -->
      <q-step title="Vencimentos" name="vencimentos">
        <div class="row justify-center items-center gutter-xs" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-9 col-md-7 col-lg-5 text-center">
            <span class="q-title">Informe os vencimentos</span>

            <q-list no-border separator>
              <q-item v-for="parcela in fixacaoParcelas" :key="parcela.numero">
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
                      <q-input type="number" v-model="parcela.valor.value" :decimals="2" :prefix="prefixMoeda" align="right"/>
                    </div>
                  </div>

                </q-item-main>
              </q-item>
              <div class="row q-mt-md justify-end">
                <div class="col-xs-6 col-lg-4 self-center text-justify">
                  <span class="text-faded">Total: {{prefixMoeda}}</span>&nbsp
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
  </q-modal>
</template>

<script>
  import Fixacao from 'assets/js/model/negocio/Fixacao'
  import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'
  import negocioService from 'assets/js/service/negocio/NegocioService'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDatetime from 'components/CustomInputDateTime.vue'

  export default {
    name: "NewFixacaoModal",
    components:{
      customInputText,
      customInputDatetime,
    },
    data(){
      return{
        currentStep: 'negocioCultura',
        isModalOpened: false,
        selectedSafraId: null,
        maxQuantidade: 0,
        fixacao: new Fixacao(),
        unidadesMedida: [],
        prefixMoeda: null,
        dataAtual: this.moment().format('YYYYMMDD'),
        fixacaoParcelas: [],
        errorValueFixacao: 'text-positive',
        isValidFixacaoParcelas: false,
        numParcelasFixacao: null,
        selectedDescontoAcrescimoType: null,
        selectedContaBancariaId: 0,
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
        negociosCulturas: [
          {
            id: 1,
            cultura: 'Soja',
            ano_inicio: 2018,
            ano_fim: 2019,
            quantidade: 99000,
            unidade_medida_quantidade_id: 3195
          },
          {
            id: 2,
            cultura: 'Milho',
            is_safrinha: true,
            ano_inicio: 2018,
            ano_fim: 2018,
            quantidade: 50000,
            unidade_medida_quantidade_id: 3195
          },
          {
            id: 3,
            cultura: 'Algodão',
            ano_inicio: 2016,
            ano_fim: 2017,
            quantidade: 60000,
            unidade_medida_quantidade_id: 1584
          }
        ],
        bancosContas: [
          {
            id: 1,
            numero: '8485566',
            nome: 'Banco do Brasil',
            pessoa: {
              nome: 'Fulano de tal'
            },
            conta: {
              id: 1,
              agencia: '6654-6',
              numero: '96584752-6',
              operacao: '66'
            }
          },
          {
            id: 2,
            numero: '8485566',
            nome: 'Bradesco',
            pessoa: {
              nome: 'Cicrano de tal'
            },
            conta: {
              id: 2,
              agencia: '6654-6',
              numero: '96584752-6',
              operacao: '66'
            }
          },
          {
            id: 3,
            numero: '8485566',
            nome: 'Sicred',
            pessoa: {
              nome: 'No One Knows'
            },
            conta: {
              id: 3,
              agencia: '6654-6',
              numero: '96584752-6',
              operacao: '66'
            }
          }
        ],
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
        if(val == 'vencimentos'){
          this.generateFormFixacaoParcelas()
        }
        if(val != 'vencimentos'){
          this.fixacaoParcelas = [];
        }
      }
    },
    computed: {
      totalBrutoUn: function () {
        if (this.fixacao.quantidade.value != 0) {
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
          this.fixacao.totalLiquido.value = (this.fixacao.totalBruto.value - (
              this.fixacao.valorOutrosDescontos.value + this.fixacao.totalImpostos.value)
          ) + this.fixacao.valorOutrosAcrescimos.value;
          return this.fixacao.totalLiquido.value / this.fixacao.quantidade.value;
        }
        return null;
      }
    },
    methods:{
      openModal: function(){
        this.isModalOpened = true;
        this.getUnidadesMedida();
        this.fixacao = new Fixacao();
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.currentStep = 'negocioCultura';
        this.$emit('modal-closed')
      },
      selectNegocioCultura: function(negocioCultura){

        if(this.selectedSafraId == negocioCultura.id){
          this.maxQuantidade = null;
          this.selectedSafraId = null;
          this.fixacao.quantidade.value = null;
          this.fixacao.negocioCulturaId.value = null;
          this.fixacao.unidadeMedidaQuantidadeId.value = null;
        }else{
          this.selectedSafraId = negocioCultura.id;
          this.maxQuantidade = negocioCultura.quantidade;
          this.fixacao.negocioCulturaId.value = negocioCultura.id;
          this.fixacao.quantidade.value = negocioCultura.quantidade;
          this.fixacao.unidadeMedidaQuantidadeId.value = negocioCultura.unidade_medida_quantidade_id;
          this.goToNextStep();
        }
      },
      isNextFixacaoStep: function() {
        if(this.fixacao.negocioCulturaId.value == null && this.currentStep === 'negocioCultura'){
          return true;
        }
        if(this.currentStep === 'quantidade'){
          if(this.fixacao.quantidade.value == null || this.fixacao.unidadeMedidaQuantidadeId.value == null){
            return true;
          }
        }
        if(this.fixacao.moedaId.value == null && this.currentStep === 'moeda'){
          return true;
        }
        if(this.fixacao.preco.value == null && this.currentStep === 'preco'){
          return true;
        }
        if(this.selectedDescontoAcrescimoType == null && this.currentStep === 'descontos'){
          return true;
        }
        if(this.fixacao.contaBancariaId.value == null && this.currentStep === 'contaDeposito'){
          return true;
        }
        if((this.numParcelasFixacao == null || this.numParcelasFixacao === 0) && this.currentStep === 'parcelas'){
          return true
        }
        return false;
      },
      selectMoedaFixacao: function(moeda){
        if(this.fixacao.moedaId.value === moeda.id){
          this.fixacao.moedaId.value = null;
          this.prefixMoeda = null;
        }else{
          this.fixacao.moedaId.value = moeda.id;
          this.prefixMoeda = moeda.simbolo;
          this.goToNextStep()
        }
      },
      selectDescontoAcrescimos: function(type){
        if(this.selectedDescontoAcrescimoType === type){
          this.selectedDescontoAcrescimoType = null;
        }else{
          this.selectedDescontoAcrescimoType = type;
          if(this.selectedDescontoAcrescimoType === 2){
            this.fixacao.isPrecoLiquido.value = true;
            this.currentStepFixacao = 'descontosAcrescimos';
          }else{
            this.fixacao.isPrecoLiquido.value = false;
            this.currentStepFixacao = 'contaDeposito';
          }
        }

      },
      validaQuantidade: function(){
        if(this.fixacao.quantidade.value > this.maxQuantidade){
          this.fixacao.quantidade.value = this.maxQuantidade
        }
      },
      selectBancoConta: function(bancoConta){
        if(this.fixacao.contaBancariaId.value === bancoConta.conta.id){
          this.selectedContaBancariaId = null;
          this.fixacao.contaBancariaId.value = null;
        }else{
          this.selectedContaBancariaId = bancoConta.conta.id;
          this.fixacao.contaBancariaId.value = bancoConta.conta.id;
          this.goToNextStep()
        }
      },
      generateFormFixacaoParcelas: function(){
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
            numero: parcela,
            vencimento:{ value: this.moment().format('YYYY-MM-DD')} ,
            valor: { value: valorParcela }
          });
        }
      },
      validateVerifyFixacaoParcelas: function(){
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
      saveAttachFixacao: function(){
        this.fixacao.parcelas = this.fixacaoParcelas;
        negocioService.saveAttachFixacao(this.fixacao.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Fixação vinculada com sucesso'});
            this.closeModal();
            this.$router.go(-1);
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      isMoedaSelected: function(id){
        if(this.fixacao.moedaId.value == id){
          return 'positive';
        }
      },
      goToNextStep(){
        this.$refs.stepperFixacao.next();
      },
      parsedUnidades: function(unidades){
        return unidades.map(unidade => {
          return {
            label: unidade.nome,
            value: unidade.id
          }
        })
      },
      getUnidadesMedida:function(){
        unidadeMedidaService.listUnidadesMedida().then(response => {
          this.unidadesMedida = response.data;
        })
      },
    }
  }
</script>

<style scoped>

</style>

<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="sendCargo" ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow" v-if="entrega">

      <!--PASSO 1 DADOS DA ENTREGA-->
      <q-step default title="Dados da Entrega" name="dadosDaEntrega">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Dados da Entrega
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <custom-input-text type="number" :model="ticket.numeroTicket" align="right" label="Número do ticket"/>
            <custom-input-date-time type="datetime-local" label="Data descarga" :model="ticket.emissao"/>
            <custom-input-text type="number" :model="ticket.pesoBrutoTotal" align="right" label="Peso bruto total" suffix="KG"/>
            <custom-input-text type="number" :model="ticket.pesoTara" align="right" label="Peso tara" suffix="KG"/>
            <custom-input-text type="number" :model="ticket.pesoLiquido" align="right" label="Peso líquido" suffix="KG"/>
          </div>
        </div>
      </q-step>

      <!--PASSO 2 INFORMAR CALISSIFICACAO -->
      <q-step title="Informar Classificação" name="classificacao">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Classificação
          </div>

          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <div class="row justify-center">

              <div class="col-12 row q-mb-md">
                <div class="col-4 text-center text-faded q-caption">Classificação</div>
                <div class="col-2 text-center text-faded q-caption">Verificado</div>
                <div class="col-3 text-center text-faded q-caption">Tolerância</div>
                <div class="col-3 text-center text-faded q-caption">Desconto</div>
              </div>

              <div v-for="classificacao in ticket.entregaClassificacao" class="row q-mb-lg">

                <div class="col-4  self-center">
                  {{classificacao.nome}}
                </div>

                <div class="col-2" :key="classificacao.nome">
                  <!--<custom-input-text suffix="%" align="right" type="number":model="classificacao.verificado"/>-->
                  <q-input suffix="%" align="right" type="number"v-model="classificacao.verificado.value"/>
                </div>

                <div class="col-3 text-faded self-center text-center ">
                  {{classificacao.tolerancia}}%
                </div>

                <div class="col-3">
                  <!--<custom-input-text suffix="KG" align="right" type="number":model="classificacao.peso_desconto"/>-->
                  <q-input suffix="KG" align="right" type="number" v-model="classificacao.peso_desconto.value" />
                </div>

              </div>

              <div class="col-12 text-right">
                Total {{totalDesc}} kg
              </div>
            </div>
          </div>

        </div>
      </q-step>

      <!--PASSO 3 SELECIONAR O NEGOCIO -->
      <q-step title="Selecionar Negócio" :disable="!isDesdobrar" name="negocio">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            De qual negócio
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="negocio in entrega.negocios_entregas" :key="negocio.id">
            <q-card class="cursor-pointer" @click.native="toggleNegocio(negocio)">
              <q-card-title>
                {{negocio.tipo_negocio}} {{negocio.pessoa}}
                <q-btn slot="right" icon="done" round color="positive" size="8px" v-if="negocioisInArray(negocio)"/>
              </q-card-title>
              <q-card-separator/>

              <q-card-main>
                <p>Negociado {{numeral(50000).format('0,0')}}</p>
                <p>Entregue {{numeral(40000).format('0,0')}}</p>
                <p>Restante {{numeral(10000).format('0,0')}}</p>
              </q-card-main>
            </q-card>
          </div>

        </div>
      </q-step>

      <!--PASSO 4 INFORMAR AS QUANTIDADES DOS NEGOCIOS -->
      <q-step title="Quantidade dos Negócio" :disable="!isDesdobrar" name="negocioQuantidade">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Quantidade de cada neǵocio
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div class="row justify-center">

              <template v-for="negocio in ticket.negocioCulturas">

                <div class="col-6 self-center q-mt-lg" :key="negocio.id">
                  {{negocio.tipo_negocio}} {{negocio.pessoa}}
                </div>

                <div class="col-6">
                  <q-input type="number" v-model="negocio.negocio_produto_quantidade" suffix="KG" align="right"/>
                </div>

              </template>
              <div class="col-6 offset-6 text-right q-mt-sm">
                <span class="text-faded">Alocar</span>&nbsp
                <span :class="quantidadeAlocarErrorClass()"> {{numeral(quantidadeAlocar).format('0,0')}}</span>  KG
              </div>
              <div class="col-6 offset-6 text-right q-mt-sm">
                <span class="text-faded">total</span> {{numeral(ticket.pesoLiquido.value).format('0,0')}} KG
              </div>

            </div>
          </div>

        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="!isDesdobrar()"/>
      <q-btn label="salvar" color="primary" @click="saveNewTicket" :disable="isNextStepEnabled()" v-if="isDesdobrar()"/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import ticketService from 'assets/js/service/entrega/TicketService'
  import Ticket from 'assets/js/model/entrega/Ticket'
  import culturaClassificacaoService from 'assets/js/service/cultura/CulturaClassificacaoService'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDateTime from 'components/CustomInputDateTime.vue'
  import { debounce } from 'quasar'
  export default {
    name: "stepper-new-ticket",
    components:{
      customInputDateTime,
      customInputText,
    },
    data () {
      return {
        currentStep: 'dadosDaEntrega',
        ticket: new Ticket(),
        isModalOpened: false,
        entrega: null,
        errorValue: '',
        negocios:[
          {
            id: 1,
            negocio: 'ADM Troca',
            quantidade: null
          },
          {
            id: 2,
            negocio: 'ADM Balcão',
            quantidade: null
          }
        ],
      }
    },
    watch: {},
    computed: {
      totalDesc: function () {
        let soma = 0;
        this.ticket.entregaClassificacao.forEach(function (val) {
          soma += val.peso_desconto.value
        });
        return soma
      },
      quantidadeAlocar: function () {
        let soma = 0;
        this.ticket.negocioCulturas.forEach(function (quantidade) {
          soma += quantidade.negocio_produto_quantidade;
        });
        soma = this.ticket.pesoLiquido.value - soma;
        return soma
      }
    },
    methods: {
      openModal: function(entrega){
        this.isModalOpened = true;
        this.listClassificacoesByCultura(entrega.culturaId);
        this.entrega = entrega;
      },
      closeModal: function(){
        this.ticket = new Ticket();
        this.isModalOpened = false;
      },
      isNextStepEnabled: function(){
        if(!this.ticket.isValid()){
          return true
        }
        if(this.ticket.negocioCulturas.length <= 0  && this.currentStep == 'negocio'){
          return true
        }
        return false;
      },
      isFormEntregaClassificacaoValid: function(){
        let isValid = true;
        for(var classificacao of this.ticket.entregaClassificacao){
          if(classificacao.verificado.value === null || classificacao.peso_desconto.value === null){
            isValid = false;
          }
        }
        return isValid;
      },
      isFormNegocioCulturasValid: function(){
        let isValid = true;
        for(let val of this.ticket.negocioCulturas){
          if(val.negocio_produto_quantidade === null){
            isValid = false;
          }
        }
        return isValid;
      },
      quantidadeAlocarErrorClass: function(){
        let textColor = 'text-warning';
        if(this.quantidadeAlocar > this.ticket.pesoLiquido.value || this.quantidadeAlocar < 0 ){
          textColor = 'text-negative';
          return textColor
        }
        if(this.quantidadeAlocar === 0){
          textColor = 'text-positive';
          return textColor
        }
        return textColor
      },
      saveNewTicket: function(){
        if(this.currentStep === 'negocioQuantidade'){
          setTimeout(() => {
            if(!this.isFormNegocioCulturasValid()){
              this.$q.dialog({ title: 'Atenção', message: 'Preencha os campos corretamente.', ok: 'OK', color: 'primary' });
              return
            }else{
              if(this.quantidadeAlocar != 0){
                this.$q.dialog({ title: 'Atenção', message: 'Ainda há uma quantidade para alocar.', ok: 'OK', color: 'primary' });
                return
              }
              ticketService.saveNewTicket(this.ticket.getValues()).then(response => {
                if(response.status === 201) {
                  this.$q.notify({type: 'positive', message: 'Ticket criado com sucesso'});
                  this.closeModal();
                }
              }).catch(error => {
                this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
              });
            }
          }, 300 /*ms to wait*/)
        }
      },
      goToNextStep(){
        if(this.currentStep === 'classificacao'){
          setTimeout(() => {
            if(!this.isFormEntregaClassificacaoValid()){
              this.$q.dialog({
                title: 'Atenção',
                message: 'Preencha os campos corretamente.',
                ok: 'OK',
                color: 'primary'
              })
            }else{
              this.$refs.stepper.next();
            }
          }, 300 /*ms to wait*/)
        }else{
          this.$refs.stepper.next();
        }
      },
      listClassificacoesByCultura(cultura_id){
        culturaClassificacaoService.listClassificacoesByCultura(cultura_id).then(response => {
          // this.classificacoes = response.data;
         if(this.ticket.entregaClassificacao.length <= 0){
           response.data.forEach(function (classe) {
             this.ticket.entregaClassificacao.push(
               {
                 classificacao_id: classe.id,
                 verificado: {value: null},
                 peso_desconto: {value: null},
                 nome: classe.nome,
                 tolerancia: classe.tolerancia
               }
             )
           }, this)
         }
        })
      },
      isDesdobrar: function () {
        if(this.entrega){
          if(this.entrega.negocios_entregas.length == 1 && this.currentStep == 'classificacao'){
            return true
          }
          if(this.entrega.negocios_entregas.length > 1 && this.currentStep == 'negocioQuantidade'){
            return true
          }
        }
        return false
      },
      toggleNegocio: function(negocio){
        let index = this.ticket.existsNegocioCulturaById(negocio.id);
        if(index > -1){
          this.ticket.removeNegocioCultura(index)
        }else{
          this.ticket.addNegocioCultura(negocio)
        }
      },
      negocioisInArray: function(negocio){
        return this.ticket.existsNegocioCulturaById(negocio.id) > -1
      },
    },
    mounted () {
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
</script>
<style>
  .space-end{
    margin-bottom: 150px;
  }
</style>

<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper key="sendCargo" ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow">

      <!--PASSO 1 DADOS DA ENTREGA-->
      <q-step default title="Dados da Entrega" name="dadosDaEntrega">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Dados da Entrega
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"></div>
        </div>
      </q-step>

      <!--PASSO 2 INFORMAR CALISSIFICACAO -->
      <q-step title="Informar Classificação" name="classificacao">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-12 text-center q-title">
            Escolha o Armazém
          </div>

          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4" >
            <q-list no-border separator link>
              <q-item v-for="armazem in armazems" :key="armazem.id" @click.native="selectArmazem(armazem)">
                <q-item-side>
                  <q-btn v-if="sendCarga.armazemId.value == armazem.id" size="8px" icon="done" color="positive" round/>
                </q-item-side>
                <q-item-main>
                  <q-item-tile>
                    {{armazem.nome}}
                  </q-item-tile>
                  <q-item-tile sublabel>
                    {{armazem.localizacao}}
                  </q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
          </div>

        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="isNextStepEnabled()" v-if="currentStep != 'classificacao' "/>
      <q-btn label="salvar" color="primary" @click="saveNewTicket" :disable="isNextStepEnabled()" v-if="currentStep == 'classificacao' "/>
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import ticketService from 'assets/js/service/entrega/TicketService'
  import Ticket from 'assets/js/model/entrega/Ticket'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDateTime from 'components/CustomInputDateTime.vue'
  export default {
    name: "stepper-send-carga",
    components:{
      customInputDateTime,
      customInputText,
    },
    data () {
      return {
        currentStep: 'dadosDaEntrega',
        ticket: new Ticket(),
        isModalOpened: false,

      }
    },
    computed: {

    },
    methods: {
      openModal: function(){
        this.isModalOpened = true;
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      isNextStepEnabled: function(){
        if(this.ticket.negocioId.value == null && this.currentStep == 'dadosDaEntrega'){
          return true
        }
        if(!this.ticket.isValid()){
          return true
        }
        return false;
      },
      saveNewTicket: function(){
        ticketService.saveNewTicket(this.ticket.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Ticket criado com sucesso'});
            this.closeModal();
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      goToNextStep(){
        this.$refs.stepper.next();
      },
    },
    mounted () {
      this.listNegocio();
      this.getUnidadesMedida();
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

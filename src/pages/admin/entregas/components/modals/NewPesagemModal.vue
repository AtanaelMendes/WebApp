<template>
  <ap-modal ref="newPesagemModal" title="Informar Pesagem" :visible="isModalOpened" @hide="closeModal">

    <q-stepper slot="content" ref="stepper" color="positive" v-model="currentStep" class="custom-stepper" v-if="entrega">

      <!--PASSO 1 DADOS DA ENTREGA-->
      <q-step default title="Dados da Entrega" name="dadosDaEntrega" class="q-pa-none">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Dados da Entrega</span>
        </div>

        <div class="q-px-lg q-py-sm">
          <div class="row q-mb-sm">
            <div class="col-12">
              <q-input type="number" v-model="pesagem.numeroTicket.value" align="right" stack-label="Número do ticket" />
            </div>
          </div>

          <div class="row q-mb-sm">
            <div class="col-12">
              <q-datetime v-model="pesagem.emissao.value" type="datetime" stack-label="Data descarga"
                          align="center" modal format="DD/MM/YYYY HH:mm" :min="minDate" :max="new Date()" />
            </div>
          </div>

          <div class="row q-mb-sm">
            <div class="col-12">
              <q-input class="q-mb-none" type="number" v-model="pesoBrutoTotal" align="right"
                       stack-label="Peso bruto total" :suffix="entrega.safra_cultura.unidade_medida_pesagem.sigla"/>
            </div>
          </div>

          <div class="row q-mb-sm">
            <div class="col-12">
              <q-input class="q-mb-none" type="number" v-model="pesoTara" align="right"
                       stack-label="Peso tara" :suffix="entrega.safra_cultura.unidade_medida_pesagem.sigla"/>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <q-input class="q-mb-none" type="number" v-model="pesoBrutoProduto" align="right"
                       stack-label="Peso produto" :suffix="entrega.safra_cultura.unidade_medida_pesagem.sigla"/>
            </div>
          </div>
        </div>
      </q-step>

      <!--PASSO 2 INFORMAR CALISSIFICACAO -->
      <q-step title="Informar Classificação" name="classificacao">
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informe a classificação da pesagem</span>
        </div>

        <div class="q-px-lg q-py-sm">

          <div class="row q-mb-md q-mt-md">
            <div class="col-4 text-center text-faded q-caption">Classificação</div>
            <div class="col-3 text-center text-faded q-caption">Verificado</div>
            <div class="col-2 text-center text-faded q-caption">Tolerância</div>
            <div class="col-3 text-center text-faded q-caption">Desconto</div>
          </div>

          <div v-for="classificacao in pesagem.entregaClassificacao" class="row q-mb-lg">

            <div class="col-4 align-left">
              {{classificacao.nome}}
            </div>

            <div class="col-3" :key="classificacao.nome">
              <q-input suffix="%" align="right" type="number"v-model="classificacao.verificado.value"/>
            </div>

            <div class="col-2 text-faded self-center text-center ">
              {{classificacao.tolerancia}}%
            </div>

            <div class="col-3">
              <q-input align="right" type="number" v-model="classificacao.peso_desconto.value"
                       :suffix="entrega.safra_cultura.unidade_medida_pesagem.sigla" />
            </div>

          </div>

          <table style="float: right">
            <tr>
              <td class="q-pr-md">Descontos</td>
              <td style="text-align: right">{{totalDesc}} {{entrega.safra_cultura.unidade_medida_pesagem.sigla}}</td>
            </tr>
            <tr>
              <td class="q-pr-md">Líquido</td>
              <td style="text-align: right">{{totalLiquido}} {{entrega.safra_cultura.unidade_medida_pesagem.sigla}}</td>
            </tr>
          </table>

        </div>
      </q-step>

    </q-stepper>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep !== 'dadosDaEntrega'"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep === 'dadosDaEntrega'" :disable="isNextStepEnabled()"/>
        <q-btn @click="save" flat label="Salvar" color="primary" v-if="currentStep === 'classificacao'"/>
      </div>
    </div>
  </ap-modal>

</template>
<script>
  import Pesagem from 'assets/js/model/entrega/Pesagem'
  import customInputText from 'components/CustomInputText.vue'
  import customInputDateTime from 'components/CustomInputDateTime.vue'
  import CulturaClassificacaoService from "../../../../../assets/js/service/cultura/CulturaClassificacaoService";
  import PesagemService from "../../../../../assets/js/service/entrega/PesagemService";
  import apModal from 'components/ApModal'

  export default {
    name: "stepper-new-pesagem",
    components:{
      customInputDateTime,
      customInputText,
      apModal,
    },
    data () {
      return {
        pesagemService: new PesagemService(),
        culturaClassificacaoService: new CulturaClassificacaoService(),
        currentStep: 'dadosDaEntrega',
        pesagem: new Pesagem(),
        isModalOpened: false,
        entrega: null,
        errorValue: '',
        isEditMode: false,
        pesoBrutoTotal: null,
        pesoTara: null,
        pesoBrutoProduto: null,
      }
    },
    watch: {
      pesoBrutoTotal(value){
        this.pesoBrutoProduto = value - this.pesoTara;
        this.pesagem.pesoBrutoProduto.value = this.pesoBrutoProduto;
        this.pesagem.pesoTara.value = this.pesoTara;
      },
      pesoTara(value){
        this.pesoBrutoProduto = this.pesoBrutoTotal - value;
        this.pesagem.pesoBrutoProduto.value = this.pesoBrutoProduto;
        this.pesagem.pesoTara.value = value;
      },
      pesoBrutoProduto(value){
        this.pesoBrutoTotal = value + this.pesoTara
        this.pesagem.pesoBrutoTotal.value = this.pesoBrutoTotal;
      },
    },
    computed: {
      minDate(){
        return new Date(this.entrega.safra_cultura.safra.ano_inicio, 0, 1);
      },
      totalDesc: function () {
        let soma = 0;
        this.pesagem.entregaClassificacao.forEach(function (val) {
          soma += val.peso_desconto.value
        });
        return soma
      },
      totalLiquido: function () {
        let pesoLiquido = this.pesagem.pesoBrutoProduto.value - this.totalDesc;
        this.pesagem.pesoLiquido.value = pesoLiquido;
        return pesoLiquido;
      }
    },
    methods: {
      openModal(entrega){
        this.isModalOpened = true;
        this.currentStep = 'dadosDaEntrega';
        this.listClassificacoesByCultura(entrega.safra_cultura.cultura.id);
        this.entrega = entrega;
      },
      openModalInEditMode(id, entrega){
        this.isModalOpened = true;
        this.isEditMode = true;
        this.openModal(entrega);

        this.pesagemService.getPesagem(entrega.id, id).then(pesagem => {
          this.pesagem.id = pesagem.id;
          this.pesagem.numeroTicket.value = pesagem.numero_ticket;
          this.pesagem.emissao.value = pesagem.emissao;
          this.pesoBrutoTotal = this.pesagem.pesoBrutoTotal.value = pesagem.peso_bruto_total;
          this.pesoBrutoProduto = this.pesagem.pesoBrutoProduto.value = pesagem.peso_bruto_produto;
          this.pesoTara = this.pesagem.pesoTara.value = pesagem.peso_tara;
          this.pesagem.pesoLiquido.value = pesagem.peso_liquido;
          this.pesagem.entregaClassificacao = pesagem.entregas_classificacoes.map(entrega_classificacao => {
            return {
              id: entrega_classificacao.id,
              classificacao_id: entrega_classificacao.classificacao_id,
              peso_desconto: {
                value: entrega_classificacao.peso_desconto
              },
              verificado: {
                value: entrega_classificacao.verificado
              }
            }

          });
        })
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.pesagem = new Pesagem();
        this.pesoBrutoTotal = null;
        this.pesoTara = null;
        this.pesoBrutoProduto = null;
      },
      isNextStepEnabled: function(){
        if(!this.pesagem.isValid()){
          return true
        }
        return false;
      },
      isFormEntregaClassificacaoValid: function(){
        let isValid = true;
        for(var classificacao of this.pesagem.entregaClassificacao){
          if(classificacao.verificado.value === null || classificacao.peso_desconto.value === null){
            isValid = false;
          }
        }
        return isValid;
      },
      save(){
        if(!this.isEditMode){
          this.saveNewPesagem()
        }else{
          this.updatePesagem()
        }
      },
      saveNewPesagem(){
        setTimeout(() => {
          if(this.currentStep === 'classificacao'){
            if(!this.isFormEntregaClassificacaoValid()){
              this.$q.dialog({ title: 'Atenção', message: 'Preencha os campos corretamente.', ok: 'OK', color: 'primary' });
              return
            }
          }

          this.$q.loading.show();
          let entregaId = this.$route.params.id;
          this.pesagemService.savePesagem(entregaId, this.pesagem.getValues()).then(() => {
            this.$q.notify({type: 'positive', message: 'Pesagem criada com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregasList', 'no_armazem');
            this.$root.$emit('refreshEntregasList', 'entregue');
            this.$root.$emit('refreshEntregaView');
            this.$q.loading.hide();

            if(this.entrega.pesagens === null || this.entrega.pesagens === undefined){
              this.$router.back();
            }
          }).catch(error => {
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            this.$q.loading.hide();
          });
        }, 300);
      },
      updatePesagem(){
        setTimeout(() => {
          if(this.currentStep === 'classificacao'){
            if(!this.isFormEntregaClassificacaoValid()){
              this.$q.dialog({ title: 'Atenção', message: 'Preencha os campos corretamente.', ok: 'OK', color: 'primary' });
              return
            }
          }

          this.$q.loading.show();
          let entregaId = this.$route.params.id;
          console.log(this.pesagem.getValues())
          this.pesagemService.updatePesagem(this.pesagem.id, entregaId, this.pesagem.getValues()).then(() => {
            this.$q.notify({type: 'positive', message: 'Pesagem criada com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshEntregasList', 'no_armazem');
            this.$root.$emit('refreshEntregasList', 'entregue');
            this.$root.$emit('refreshEntregaView');
            this.$q.loading.hide();

            if(this.entrega.pesagens === null || this.entrega.pesagens === undefined){
              this.$router.back();
            }
          }).catch(error => {
            console.log(error)
            this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            this.$q.loading.hide();
          });
        }, 300);
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
      goToPreviousStep(){
        this.$refs.stepper.previous();
      },
      listClassificacoesByCultura(cultura_id){
        this.$q.loading.show();
        this.culturaClassificacaoService.listClassificacoesByCultura(cultura_id).then(classificacoes => {
         if(this.pesagem.entregaClassificacao.length <= 0){
           classificacoes.forEach(function (culturaClassificacao) {
             this.pesagem.entregaClassificacao.push(
               {
                 id: culturaClassificacao.id,
                 classificacao_id: culturaClassificacao.classificacao_id,
                 verificado: {value: null},
                 peso_desconto: {value: null},
                 nome: culturaClassificacao.nome,
                 tolerancia: culturaClassificacao.tolerancia
               }
             )
           }, this)
         }
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.loading.hide();
        })
      },
    },
  }
</script>
<style>
  .custom-stepper .q-stepper-header{
    display: none;
  }

  .custom-stepper .q-stepper-step-inner{
    padding: 0px !important;
  }
</style>

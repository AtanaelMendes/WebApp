<template>
  <q-modal v-model="isModalOpened" maximized @hide="closeModal">

    <q-stepper ref="stepper" contractable color="positive" v-model="currentStep" class="no-shadow" >

      <!--PASSO 1 ESCOLHER NEGOCIANTE-->
      <q-step default title="Negociante" name="negociante">

        <div class="row text-center justify-center q-title">
          <div class="col-12">
            Com quem está negociando?
          </div>

          <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <q-search align="center" v-model="searchPessoasQuery" placeholder="Busque por uma pessoa"/>
          </div>
        </div>

        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">
          <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">

            <div class="row" v-for="grupo in pessoas" :key="grupo.id">
              <div class="col-12">

                <div class="row bg-blue-grey-1 q-pa-sm">
                  <div class="col-12 q-title">
                    {{grupo.nome}}
                  </div>
                </div>

                <div class="row justify-center">
                  <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
                    <q-list no-border link separator>
                      <q-item class="row" @click.native="selectPesssoa(pessoa.id)" v-for="pessoa in grupo.pessoas" :key="pessoa.id">
                        <div class="col-1">
                          <q-btn icon="done" size="8px" round dense color="positive" v-if="pessoa.id == negocio.pessoaId.value"/>
                        </div>
                        <div class="col-11">
                          {{pessoa.nome}}
                        </div>
                        <div class="col-12 offset-1 q-caption text-faded">
                          {{pessoa.cpf ? pessoa.cpf : pessoa.cnpj}}
                        </div>
                        <div class="col-12 offset-1 q-caption text-faded">
                          {{pessoa.inscricao_estadual}} {{pessoa.inscricao_municipal}}
                        </div>
                      </q-item>
                    </q-list>
                  </div>
                </div>

              </div>
            </div>

            <div v-if="pessoas.length === 0" class="list-empty">
              <q-icon name="warning" />
              <span>Nenhum resultado encontrado</span>
            </div>

          </div>
        </div>
      </q-step>

      <!--PASSO 2 INFORMAR DETALHES -->
      <q-step title="Informações" name="informacoes">
        <div class="row justify-center items-center gutter-sm" style="min-height: 80vh">

          <div class="col-3">
            <q-datetime v-model="negocio.emissao.value" float-label="Emissão"
                        type="date" align="center" format="DD/MM/YYYY" modal/>
            <custom-input-text :model="negocio.numeroContrato" label="Número do contrato"/>
            <custom-input-text :model="negocio.numeroPedido" label="Número do Pedido"/>
          </div>
          <div class="col-3">
            <q-input v-model="negocio.observacoes.value" type="textarea" float-label="Observações"/>
          </div>
        </div>
      </q-step>

    </q-stepper>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="próximo" color="primary" @click="goToNextStep" :disable="!isNextButtomEnabled()" v-if="currentStep == 'negociante' "/>
      <q-btn label="salvar" color="primary" @click="saveNegocio" v-if="currentStep == 'informacoes' && !isEditMode"/>
      <q-btn label="atualizar" color="primary" @click="updateNegocio" v-if="currentStep == 'informacoes' && isEditMode"/>
    </q-page-sticky>
  </q-modal>
</template>

<script>
  import pessoaService from 'assets/js/service/PessoaService'
  import Negocio from 'assets/js/model/negocio/Negocio'
  import customInputDatetime from 'components/CustomInputDateTime.vue'
  import customInputText from 'components/CustomInputText.vue'
  import NegocioService from "../../assets/js/service/negocio/NegocioService";

  export default {
    name: "NegocioModal",
    components: {
      customInputDatetime,
      customInputText,
    },
    watch:{
      searchPessoasQuery: function(value){
        this.negocio.pessoaId.value = null;
        this.searchPessoas(value);
      }
    },
    data(){
      return {
        negocioService: new NegocioService(this.$account.produtor_id),
        isModalOpened: false,
        isEditMode: false,
        currentStep: 'negociante',
        searchPessoasQuery: '',
        pessoas: [],
        negocio: new Negocio(),
      }
    },
    methods: {
      openModal: function(tipo_negocio_id){
        this.isModalOpened = true;
        this.isEditMode = false;
        this.negocio = new Negocio();
        this.negocio.tipoNegocioId = tipo_negocio_id;
      },
      openModalEditMode: function(negocioId){
        this.isModalOpened = true;
        this.isEditMode = true;
        this.negocio = new Negocio();
        this.getNegocioById(negocioId)
      },
      closeModal: function(){
        this.isModalOpened = false;
        this.currentStep = 'negociante';
        this.$emit('modal-closed')
      },
      getNegocioById: function(negocioId){
        this.negocioService.getNegocioById(negocioId).then(response => {
          this.fillFormNegocio(response.data)
        });
      },
      saveNegocio: function(){
        if(!this.negocio.isValid()){
          return;
        }
        this.negocioService.saveNegocio(this.negocio.getValues()).then(response => {
          if(response.status === 201) {
            this.$q.notify({type: 'positive', message: 'Negócio criado com sucesso'});
            this.closeModal();
            this.$root.$emit('refreshNegocioList')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
      updateNegocio: function(){
        if (!this.negocio.isValid()) {
          return;
        }
        this.negocioService.updateNegocio(this.negocio.id, this.negocio.getValues()).then(response => {
          if (response.status === 200) {
            this.$q.notify({type: 'positive', message: 'Negócio atualizado com sucesso!'});
            this.closeModal();
            this.$root.$emit('refreshNegocioList')
          }
        })
      },
      fillFormNegocio: function(negocio){
        this.searchPessoas(negocio.pessoa.nome);
        this.negocio.id = negocio.id;
        this.negocio.tipoNegocioId = negocio.tipo_negocio_id;
        this.negocio.pessoaId.value = negocio.pessoa.id;
        this.negocio.emissao.value = this.moment(negocio.emissao).format('YYYY-MM-DD');
        this.negocio.numeroPedido.value = negocio.numero_pedido;
        this.negocio.numeroContrato.value = negocio.numero_contrato;
        this.negocio.observacoes.value = negocio.observacoes;
      },
      selectPesssoa: function(id){
        if(id === this.negocio.pessoaId.value){
          this.negocio.pessoaId.value = null;
        }else{
          this.negocio.pessoaId.value = id;
        }
      },
      searchPessoas: function (params) {
        pessoaService.searchPessoaGroupedByGrupoEconomico(params).then(response => {
          this.pessoas = response.data;
        });
      },
      isNextButtomEnabled: function(){
        if(this.currentStep === 'negociante' && this.negocio.pessoaId.value !== null){
          return true
        }
        return false
      },
      goToNextStep(){
        this.$refs.stepper.next();
      },
    },
  }
</script>

<style scoped>
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
</style>

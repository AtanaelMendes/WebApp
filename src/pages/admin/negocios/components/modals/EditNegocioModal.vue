<template>
  <ap-modal ref="editNegocioModal" :title="'Editar Negócio ('+ tipoNegocioNome +')' " :visible="isModalOpened" @hide="closeModal">
    <q-carousel slot="content" height="100%" no-swipe ref="stepperEditNegocio" @slide-trigger="setStepperIndex">

      <!--PASSO 1 ESCOLHER NEGOCIANTE-->
      <q-carousel-slide class="q-pa-none" style="padding-right: 1px">
        <template>
          <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
            <span class="q-subheading text-faded">Selecione a pessoa que você está negociando</span>
          </div>

          <div>
            <div class="row justify-center q-mb-md">
              <q-search inverted-light color="grey-2" v-model="searchPessoasQuery" placeholder="Busque por uma pessoa"/>
            </div>

            <div class="relative-position">
              <q-scroll-area style="width: auto; height: 350px;">
                <q-list no-border link separator>
                  <template v-for="grupo in pessoas">
                    <q-list-header :key="grupo.id" class="q-py-sm" style="min-height: unset; background: #f9f9f9; border-bottom: 1px solid #e2e2e2; border-top: 1px solid #e2e2e2;">
                      {{grupo.nome}}
                    </q-list-header>
                    <q-item @click.native="selectPesssoa(pessoa.id)" v-for="pessoa in grupo.pessoas" :key="pessoa.id">
                      <q-item-main>
                        <q-item-tile label>{{pessoa.nome}}</q-item-tile>
                        <q-item-tile sublabel>{{pessoa.cpf ? pessoa.cpf : pessoa.cnpj}}</q-item-tile>
                        <q-item-tile sublabel>{{pessoa.inscricao_estadual}} {{pessoa.inscricao_municipal}}</q-item-tile>
                      </q-item-main>

                      <q-item-side right>
                        <q-btn icon="done" size="8px" round dense color="positive" v-if="pessoa.id == negocio.pessoaId.value"/>
                      </q-item-side>
                    </q-item>
                  </template>
                </q-list>
                <div v-if="!pessoas" class="list-empty">
                  <q-icon name="warning" />
                  <span>Busque pela pessoa no campo acima.</span>
                </div>
                <div v-if="pessoas && pessoas.length === 0" class="list-empty">
                  <q-icon name="warning" />
                  <span>Nenhuma pessoa encontrada.</span>
                </div>

              </q-scroll-area>

              <q-inner-loading :visible="isSearching">
                <q-spinner size="60px"></q-spinner>
              </q-inner-loading>
            </div>
          </div>

        </template>
      </q-carousel-slide>

      <!--PASSO 2 INFORMAR DETALHES -->
      <q-carousel-slide>
        <div class="text-center" style="position: sticky; top: 0; z-index:1; background: white; padding: 8px">
          <span class="q-subheading text-faded">Informações</span>
        </div>

        <div class="row gutter-x-sm" >

          <div class="col-6">
            <q-datetime v-model="negocio.emissao.value" stack-label="Emissão"
                        type="date" format="DD/MM/YYYY" modal/>
          </div>
        </div>
        <div class="row gutter-x-sm q-mt-sm">
          <div class="col-6">
            <q-field orientation="vertical"
                     :error="negocio.numeroContrato.errorMessage !== null"
                     :error-label="negocio.numeroContrato.errorMessage">
              <q-input v-model="negocio.numeroContrato.value" stack-label="Número do Contrato"
                       @input="negocio.numeroContrato.errorMessage = null"/>
            </q-field>
          </div>

          <div class="col-6">
            <q-input v-model="negocio.numeroPedido.value" stack-label="Número do Pedido" />
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-12">
            <q-input v-model="negocio.observacoes.value" type="textarea" stack-label="Observações"/>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div slot="footer">
      <q-btn @click="closeModal()" flat label="Cancelar" color="primary" />
      <div class="float-right ">
        <q-btn @click="goToPreviousStep" flat label="voltar" color="primary" class="q-mr-sm" v-if="currentStep === 1"/>
        <q-btn @click="goToNextStep" flat label="próximo" color="primary" v-if="currentStep === 0" :disabled="!isNextButtomEnabled()"/>
        <q-btn @click="updateNegocio()" flat label="Salvar" color="primary" v-if="currentStep === 1"/>
      </div>
    </div>
  </ap-modal>
</template>

<script>
  import Negocio from 'assets/js/model/negocio/Negocio'
  import NegocioService from "../../../../../assets/js/service/negocio/NegocioService";
  import PessoaService from "../../../../../assets/js/service/PessoaService";
  import apModal from 'components/ApModal'

  export default {
    name: "EditNegocioModal",
    components: {
      apModal
    },
    watch:{
      searchPessoasQuery: function(value){
        this.negocio.pessoaId.value = null;
        if(value === ""){
          this.pessoas = null;
        }else{
          this.searchPessoas(value);
        }
      }
    },
    data() {
      return {
        pessoaService: new PessoaService(),
        negocioService: new NegocioService(),
        isModalOpened: false,
        currentStep: 0,
        searchPessoasQuery: '',
        pessoas: null,
        negocio: new Negocio(),
        isSearching: false,
        tipoNegocioNome: "",
      }
    },
    methods: {
      async openModal(negocio){
        this.isModalOpened = true;
        this.negocio = new Negocio();
        this.tipoNegocioNome = negocio.tipo;
        await this.getNegocioById(negocio.id);
      },
      closeModal(){
        this.isModalOpened = false;
        this.resetModal();
        //this.$emit('modal-closed')
      },
      resetModal(){
        this.$refs.stepperEditNegocio.goToSlide(0);
        this.pessoas = null;
        this.searchPessoasQuery = '';
      },
      setStepperIndex(oldIndex, newIndex, direction){
        this.currentStep = newIndex;
      },
      async getNegocioById(negocioId){
        this.$refs.editNegocioModal.showInnerProgress();
        return this.negocioService.getNegocioById(negocioId).then(negocio => {
          this.fillFormNegocio(negocio)
          this.$refs.editNegocioModal.hideInnerProgress();
        });
      },
      updateNegocio(){
        if (!this.negocio.isValid()) {
          return;
        }

        this.$refs.editNegocioModal.showOuterProgress();
        this.negocioService.updateNegocio(this.negocio.id, this.negocio.getValues()).then(() => {
          this.$q.notify({type: 'positive', message: 'Negócio atualizado com sucesso!'});
          this.$refs.editNegocioModal.hideOuterProgress();
          this.closeModal();
          this.$root.$emit('refreshNegocio')
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$refs.editNegocioModal.hideOuterProgress();
          this.closeModal();
        });
      },
      fillFormNegocio(negocio){
        this.searchPessoas(negocio.pessoa.nome);
        this.negocio.id = negocio.id;
        this.negocio.tipoNegocioId = negocio.tipo_negocio_id;
        this.negocio.pessoaId.value = negocio.pessoa.id;
        this.negocio.emissao.value = this.moment(negocio.emissao).format('YYYY-MM-DD');
        this.negocio.numeroPedido.value = negocio.numero_pedido;
        this.negocio.numeroContrato.value = negocio.numero_contrato;
        this.negocio.observacoes.value = negocio.observacoes;
      },
      selectPesssoa(id){
        this.negocio.pessoaId.value = id;
        this.goToNextStep();
      },
      searchPessoas(params) {
        this.isSearching = true;
        this.pessoaService.searchPessoaGroupedByGrupoEconomico(params).then(result => {
          this.pessoas = result;
          this.isSearching = false;
        });
      },
      isNextButtomEnabled(){
        if(this.currentStep === 0 && this.negocio.pessoaId.value !== null){
          return true
        }
        return false
      },
      goToNextStep(){
        this.$refs.stepperEditNegocio.next();
      },
      goToPreviousStep(){
        this.$refs.stepperEditNegocio.previous();
      },
    }
  }
</script>

<style scoped>

</style>

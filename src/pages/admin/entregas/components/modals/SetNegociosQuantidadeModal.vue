<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">
    <div class="row justify-center items-center q-pa-md" style="min-height: 80vh" v-if="entrega">

      <div class="col-12 q-title text-center">
        Definir Quantidade dos Negócios
      </div>

      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <div class="row q-mb-lg" v-for="negocio in negocios" :key="negocio.id">

          <div class="col-xs-6 col-lg-9 self-center" >
            {{negocio.negocio_cultura.negocio.pessoa}}
            <p class="q-body-1">{{negocio.negocio_cultura.negocio.tipo}} {{negocio.negocio_cultura.negocio.numero_contrato}}</p>
          </div>

          <!--<div class="col-xs-6 col-lg-3 self-center">-->
            <!--{{entregaTalhao.talhao}}-->
          <!--</div>-->

          <!--<div class="col-xs-6 col-lg-3 self-center">-->
            <!--{{entregaTalhao.cultivar}}-->
          <!--</div>-->

          <div class="col-xs-6 col-lg-3">
            <q-input type="number" v-model="negocio.quantidade" :suffix="negocio.negocio_cultura.unidade_medida_sigla" align="right"/>
          </div>

        </div>

        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

          <div class="row q-mb-lg">
            <div class="col-xs-6 col-lg-9 self-center" >
              Total
            </div>
            <div class="col-xs-6 col-lg-3 text-right">
              {{somaTotal}}
            </div>
          </div>

          <div class="row q-mb-lg">
            <div class="col-xs-6 col-lg-9 self-center" >
              Total dividido
            </div>
            <div class="col-xs-6 col-lg-3 text-right">
              <span :class="(totalDividido > somaTotal || totalDividido < somaTotal)?'text-red': 'text-green' ">
                {{totalDividido}}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="salvar" color="primary" @click="updateNegociosQuantidade" />
    </q-page-sticky>

  </q-modal>

</template>

<script>
  import EntregaService from 'assets/js/service/entrega/EntregaService'

  export default {
    name: "SetNegociosQuantidadeModal",
    data () {
      return {
        entregaService: new EntregaService(),
        isModalOpened: false,
        entrega: null,
        negocios: [],
      }
    },
    computed: {
      somaTotal(){
        let calculoTotal = 0;
        this.entrega.negocios.forEach(function (negocio) {
          calculoTotal += negocio.quantidade
        });
        return calculoTotal
      },
      totalDividido(){
        let totalDividido = 0;
        this.negocios.forEach(function (negocio) {
          if(negocio.quantidade != null){
            totalDividido += negocio.quantidade;
          }else{
            totalDividido += 0
          }
        });
        return totalDividido
      },
    },
    methods: {
      openModal(entrega){
        this.isModalOpened = true;
        this.entrega = entrega;
        this.negocios = this.parseNegocios(entrega.negocios);
      },
      closeModal(){
        this.isModalOpened = false;
      },
      isDivisaoValid(){
        if(this.totalDividido > this.somaTotal){
          this.$q.notify({type: 'negative', message: 'O total dividido é maior que o total disponível'});
          return false
        }
        if(this.totalDividido < this.somaTotal){
          this.$q.notify({type: 'negative', message: 'O total dividido é menor que o total disponível'});
          return false
        }
        return true
      },
      parseNegocios(negocios){
        return negocios.map(function (negocio) {
          return {
            id: negocio.id,
            quantidade: negocio.quantidade,
            negocio_cultura: {
              unidade_medida_sigla: negocio.negocio_cultura.unidade_medida_sigla,
              negocio: {
                pessoa: negocio.negocio_cultura.negocio.pessoa,
                tipo: negocio.negocio_cultura.negocio.tipo,
                numero_contrato: negocio.negocio_cultura.negocio.numero_contrato,
              }
            },
          }
        })
      },
      updateNegociosQuantidade(){

        if(!this.isDivisaoValid()){
          return
        }

        let body = this.negocios.map(function (negocio) {
          return {
            id: negocio.id,
            quantidade: negocio.quantidade,
          }
        });

        this.$q.loading.show();
        this.entregaService.updateNegociosQuantidade(this.entrega.id, {negocios: body}).then(response => {
          this.$q.notify({type: 'positive', message: 'Quantidades atualizadas com sucesso!'});
          this.closeModal();
          this.$root.$emit('refreshEntregaView');
          this.$q.loading.hide();
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
          this.$q.loading.hide();
        });
      },
    }
  }
</script>

<style scoped>

</style>

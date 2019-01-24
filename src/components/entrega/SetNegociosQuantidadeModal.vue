<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">
    <div class="row justify-center items-center q-pa-md" style="min-height: 80vh">
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

      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="salvar" color="primary" @click="updateNegociosQuantidade" />
    </q-page-sticky>

  </q-modal>

</template>

<script>
  import entregaService from 'assets/js/service/entrega/EntregaService'

  export default {
    name: "SetNegociosQuantidadeModal",
    data () {
      return {
        isModalOpened: false,
        entrega: null,
        negocios: [],
      }
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
        let body = this.negocios.map(function (negocio) {
          return {
            id: negocio.id,
            quantidade: negocio.quantidade,
          }
        });

        entregaService.updateNegociosQuantidade(this.entrega.id, {negocios: body}).then(response => {
          if(response.status === 200){
            this.$q.notify({type: 'positive', message: 'Quantidades atualizadas com sucesso!'});
            this.closeModal();
            this.$root.$emit('refreshEntregaView')
          }
        }).catch(error => {
          this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
        });
      },
    }
  }
</script>

<style scoped>

</style>

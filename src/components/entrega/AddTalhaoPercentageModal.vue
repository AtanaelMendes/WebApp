<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">
    <div class="row justify-center items-center q-pa-md" style="min-height: 80vh">
      <div class="col-12 q-title text-center">
        Definir Porcentagem dos talhões
      </div>
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

        <div class="row q-mb-lg" v-for="entregaTalhao in talhoes" :key="entregaTalhao.id">

          <div class="col-xs-6 col-lg-3 self-center" >
            {{entregaTalhao.area}}
          </div>

          <div class="col-xs-6 col-lg-3 self-center">
            {{entregaTalhao.talhao}}
          </div>

          <div class="col-xs-6 col-lg-3 self-center">
            {{entregaTalhao.cultivar}}
          </div>

          <div class="col-xs-6 col-lg-3">
            <q-input type="number" v-model="entregaTalhao.percentual" suffix="%" align="right"/>
          </div>

        </div>

      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn label="cancelar" color="primary" @click="closeModal" class="q-mr-sm"/>
      <q-btn label="salvar" color="primary" @click="saveTalhaoPercentage" />
    </q-page-sticky>

  </q-modal>
</template>
<script>
  import customInputText from 'components/CustomInputText.vue'
  import customInputDateTime from 'components/CustomInputDateTime.vue'
  import entregaService from 'assets/js/service/entrega/EntregaService'
  export default {
    name: "add-talhao-percentage",
    components:{
      customInputDateTime,
      customInputText,
    },
    data () {
      return {
        isModalOpened: false,
        entrega: null,
        talhoes: [],
      }
    },
    watch: {},
    computed: {
    },
    methods: {
      openModal: function(entrega){
        this.isModalOpened = true;
        this.entrega = entrega;
        this.listTalhaoes(entrega.id);
      },
      closeModal: function(){
        this.isModalOpened = false;
      },
      generateTalhaoPercentageForm: function(){
        this.area.safraCulturaTalhao.forEach(function (talhao) {
          this.talhaoForm.push(
            {
              id: talhao.id,
              area: this.area.nome,
              nome: talhao.nome,
              cultivar: talhao.cultivar,
              porcentagem: null,
            }
          )
        }, this);
        this.fillTalhaoForm();
      },
      fillTalhaoForm: function(){
        let porcentagem = 100 / this.talhaoForm.length;
        this.talhaoForm.forEach(function (form) {
          form.porcentagem = parseFloat(porcentagem.toFixed(2));
        });
      },
      talhaoformIsValid: function(){
        let isValid = true;
        this.talhoes.forEach(function (talhao) {
          if(talhao.percentual == null){
            isValid = false
          }
        });
        return isValid
      },
      talhaoformDivisaoIsValid: function(){
        let somaPorcentagem = 0;
        this.talhoes.forEach(function (talhao) {
          somaPorcentagem += talhao.percentual;
        });

        return somaPorcentagem === 100
      },
      saveTalhaoPercentage: function(){
        setTimeout(() => {
          if(!this.talhaoformIsValid()){
            this.$q.dialog({ title: 'Atenção', message: 'Preencha os campos corretamente.', ok: 'OK', color: 'primary' });
            return
          }else if(!this.talhaoformDivisaoIsValid()){
            this.$q.dialog({ title: 'Atenção', message: 'A soma dos percentuais é diferente de 100%', ok: 'OK', color: 'primary' });
          }else{

            let talhoesPost = this.talhoes.map(talhao => {
              return {
                id: talhao.id,
                percentual: talhao.percentual,
              }
            });

            this.$q.loading.show();
            entregaService.updateTalhoesPercentual(this.entrega.id, {talhoes: talhoesPost}).then(response => {
              if(response.status === 200) {
                this.$q.notify({type: 'positive', message: 'Percentuais atualizado com sucesso!'});
                this.closeModal();
                this.$root.$emit('refreshEntregaView')
              }
              this.$q.loading.hide();
            }).catch(error => {
              this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
              this.$q.loading.hide();
            });
          }
        }, 300 /*ms to wait*/)
      },
      listTalhaoes: function(entregaId){
        this.$q.loading.show();
        entregaService.listTalhoesFromEntrega(entregaId).then(response => {
          this.talhoes = response.data;
          this.$q.loading.hide();
        }).then(error => {
          this.$q.loading.hide();
        })
      },
    },
    created () {
      //this.generateTalhaoPercentageForm();
      // this.$root.$on('refreshSafraList', () => {
      //   this.listSafras();
      // });
    },
  }
</script>
<style>
</style>

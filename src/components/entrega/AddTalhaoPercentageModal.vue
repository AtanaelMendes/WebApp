<template>
  <q-modal key="safraCultura" v-model="isModalOpened" maximized @hide="closeModal">
    <div class="row justify-center items-center q-pa-md" style="min-height: 80vh">
      <div class="col-12 q-title text-center">
        Definir Porcentagem dos talhões
      </div>
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4">

        <div class="row q-mb-lg" v-for="talhao in talhaoForm" :key="talhao.id">

          <div class="col-xs-6 col-lg-3 self-center" >
            {{talhao.area}}
          </div>

          <div class="col-xs-6 col-lg-3 self-center">
            {{talhao.nome}}
          </div>

          <div class="col-xs-6 col-lg-3 self-center">
            {{talhao.cultivar}}
          </div>

          <div class="col-xs-6 col-lg-3">
            <q-input type="number" v-model="talhao.porcentagem" suffix="%" align="right"/>
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
        area: {
          id: 1,
          nome: 'Caroline',
          safraCulturaTalhao: [
            {
              id: 1,
              nome: 'Talhão fundo',
              cultivar: 'Y30',
            },
            {
              id: 2,
              nome: 'Talhão frente',
              cultivar: 'Y30',
            },
            {
              id: 3,
              nome: 'Talhão subida',
              cultivar: 'Y30',
            }
          ],
        },
        talhaoForm: [],
      }
    },
    watch: {},
    computed: {
    },
    methods: {
      openModal: function(){
        this.isModalOpened = true;
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
        this.talhaoForm.forEach(function (form) {
          if(form.porcentagem == null){
            isValid = false
          }
        });
        return isValid
      },
      talhaoformDivisaoIsValid: function(){
        let isValid = true;
        let somaPorcentagem = 0;
        this.talhaoForm.forEach(function (form) {
          somaPorcentagem += form.porcentagem;
        });
        if(somaPorcentagem > 100){
          isValid = false
        }
        if(somaPorcentagem < 99.99){
          isValid = false
        }
        console.log(somaPorcentagem)
        return isValid
      },
      saveTalhaoPercentage: function(){
        setTimeout(() => {
          if(!this.talhaoformIsValid()){
            this.$q.dialog({ title: 'Atenção', message: 'Preencha os campos corretamente.', ok: 'OK', color: 'primary' });
            return
          }else if(!this.talhaoformDivisaoIsValid()){
            this.$q.dialog({ title: 'Atenção', message: 'A divisão é diferente de 100%.', ok: 'OK', color: 'primary' });
          }else{
            this.$q.notify({message: 'descomentar a funcao de salvar'})
            // entregaService.saveTalhaoPercentage(this.talhaoForm).then(response => {
            //   if(response.status === 200) {
            //     this.$q.notify({type: 'positive', message: 'Salvo com sucesso'});
            //     this.closeModal();
            //   }
            // }).catch(error => {
            //   this.$q.notify({type: 'negative', message: 'http:' + error.status + error.response})
            // });
          }
        }, 300 /*ms to wait*/)
      },
    },
    created () {
      this.generateTalhaoPercentageForm();
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

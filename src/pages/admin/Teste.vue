<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Teste" navigation_type="menu"></toolbar>

    <q-input type="text" v-model="motorista" />
    <q-btn label="Salvar motorista" @click="adicionarMotorista" />
    <q-btn label="Registrar evento em sync" @click="registerEvent" />
    <q-btn label="Listar registros" @click="list" />
  </custom-page>
    
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import MotoristaQueue from 'assets/js/queue/MotoristaQueue'
  import motoristaService from 'assets/js/service/motorista/MotoristaService'
  import RequestQueueRepository from "../../assets/js/repository/RequestQueueRepository";

  export default {
    name: "Teste",
    components: {
      toolbar,
      customPage,
    },
    data(){
      return {
        count:1,
        motorista: null,
        motoristaQueue: new MotoristaQueue()
      }
    },
    methods:{
      adicionarMotorista(){
        //this.db.foo.put({count: this.count})
        // requestQueueRepository.save(this.count);
        // this.count++
        motoristaService.saveMotorista({nome: this.motorista}).then(response => {
          console.log('salvou')
          console.log(response)
          this.motorista = null
        }).catch(error => {
          console.log('não salvou')
          console.log(error.config)
          console.log('url: ' + error.config.url)
          console.log('data: ')
          console.log(error.config.data)
          this.motorista = null
          //this.registerEvent();

          this.motoristaQueue.add(error.config)
        });
      },
      list(){
        new RequestQueueRepository().getAll().toArray().then(itens => {
          console.log(itens)
        });

      },
      registerEvent(){
        console.log(navigator)
        if('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(function (swRegistration) {
            console.log('Sync registered');
            swRegistration.sync.register('queueSync').then(response => {
              console.log(response)
              console.log('yeah!')
              return response;
            }).catch(error => {
              console.log('oh no!')
              return error;
            })
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>

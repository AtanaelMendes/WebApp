<template>
  <custom-page widthInner="60%" isParent>
    <toolbar slot="toolbar" title="Teste" navigation_type="menu"></toolbar>

    <!--<q-input type="text" v-model="motorista" />
    <q-btn label="Salvar motorista" @click="adicionarMotorista" />
    <q-btn label="Registrar evento em sync" @click="registerEvent" />-->
    <q-btn label="Listar registros" @click="list" />
  </custom-page>
    
</template>

<script>
  import toolbar from 'components/Toolbar.vue'
  import customPage from 'components/CustomPage.vue'
  import MotoristaQueue from 'assets/js/queue/MotoristaQueue'
  import motoristaService from 'assets/js/service/motorista/MotoristaService'
  import RequestQueueRepository from "../../assets/js/repository/RequestQueueRepository";
  import EntregasQueue from "../../assets/js/queue/EntregasQueue";
  import EntregaCarregandoListItem from "../../assets/js/model/entrega/EntregaCarregandoListItem";
  import CaminhaoRepository from "../../assets/js/repository/reource/CaminhaoRepository";
  import SafraCulturaTalhaoRepository from "../../assets/js/repository/reource/SafraCulturaTalhaoRepository";

  export default {
    name: "Teste",
    components: {
      toolbar,
      customPage,
    },
    data(){
      return {
        caminhaoRepository: new CaminhaoRepository(),
        safraCulturaTalhaoRepository: new SafraCulturaTalhaoRepository(),
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
      async list(){
        let url = this.$axios.defaults.baseURL + 'produtor/1/entrega';
        console.log('url: ' + url)
        let queueItens = await new EntregasQueue().getByUrlAndMethod(url, 'post').toArray();

        let entregaItens = queueItens.map(async queueItem => {
          console.log(queueItem);

          let result = {};

          [result.caminhao, result.safraCulturaTalhao] = await Promise.all([
            this.caminhaoRepository.getById(queueItem.request.body.caminhao_id),
            this.safraCulturaTalhaoRepository.getById(queueItem.request.body.safra_cultura_talhao_id)
          ]);


          let entregaitem = new EntregaCarregandoListItem();
          entregaitem.caminhao.nome = result.caminhao.nome;
          entregaitem.caminhao.placa = result.caminhao.placa;
          entregaitem.inicio_carregamento = queueItem.date;
          entregaitem.safra_culturas_talhoes = result.safraCulturaTalhao;

          console.log(entregaitem);
          return entregaitem;
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

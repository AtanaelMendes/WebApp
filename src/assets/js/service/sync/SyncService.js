import Vue from 'vue'
import RequestQueueRepository from "../../repository/RequestQueueRepository";
import QueueApiIdRelationsRepository from "../../repository/QueueApiIdRelationsRepository";

let requestQueueRepository = null;
let queueApiIdRelationsRepository = null;
let queueItens = [];

export default class SyncService{

  constructor() {
    requestQueueRepository = new RequestQueueRepository();
    queueApiIdRelationsRepository = new QueueApiIdRelationsRepository();
  }

  doSync(){
    return new Promise((resolve, reject) => {
      requestQueueRepository.getAll().each(item => {
        queueItens.push(item);
      }).then(() => {
        processRequests(queueItens).then(() => {
          resolve();
        })
      }).catch(error => {
        reject();
      })
    });
  }

  getInitialContent(produtorId){
    /*console.log('getInitialContent: ' + produtorId)
    let urls = [
      'produtor/'+produtorId+'/entrega/filter_option',
      'produtor/'+produtorId+'/safra/safra_cultura',
      'produtor/'+produtorId+'/caminhao/free',
      'safra_cultura/1/safra_cultura_talhao?type=full',
    ];

    urls.forEach(url => {
      Vue.prototype.$axios.get(url)
    })*/
  }
}


function processRequests(itens){
  return new Promise((resolve, reject) => {
    sendRequest(itens[0]).then(response => {
      if(response.status === 200 || response.status === 201) {
        //TODO Salvar aqui o id da api e apagar depois
        queueApiIdRelationsRepository.save(itens[0].id, response.data.id).then(() => {

          requestQueueRepository.deleteById(itens[0].id).then(() => {
            queueItens.shift();
            if(queueItens.length > 0) {
              processRequests(queueItens)
            }else{
              console.log("terminou tudo os requests")
              resolve();
            }
          }).catch(error => {
            console.log("erro ao deletar")
            //TODO: Salva o id ou erro em algum array ou outra tabela do banco de dados E/OU adiciona um flag na mesma de que ja foi tentada
          })

        });

      }
    }).catch(error => {
      console.log("Erro no request:");
      console.log(error.response);
    });
  });


}

function sendRequest(queueItem){
  return Vue.prototype.$axios({
    method: queueItem.request.method,
    url: queueItem.request.url,
    data: queueItem.request.body,
  })
}

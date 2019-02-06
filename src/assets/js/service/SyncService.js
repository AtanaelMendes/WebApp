import Vue from 'vue'
import RequestQueueRepository from "../repository/RequestQueueRepository";

let requestQueueRepository = null;
let queueItens = [];

export default class SyncService{

  constructor() {
    requestQueueRepository = new RequestQueueRepository();
  }

  doSync(){
    requestQueueRepository.getAll().each(item => {
      queueItens.push(item);
    }).then(() => {
      processRequests(queueItens);
    });
  }
}


function processRequests(itens){
  return new Promise((resolve, reject) => {
    sendRequest(itens[0]).then(response => {
      if(response.status === 200 || response.status === 201) {
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

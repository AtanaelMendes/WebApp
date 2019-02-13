import Vue from 'vue'
import EntregaCarregandoListRepository from "../../repository/list/EntregaCarregandoListRepository";
import EntregaNoArmazemListRepository from "../../repository/list/EntregaNoArmazemListRepository";
import EntregaEntregueListRepository from "../../repository/list/EntregaEntregueListRepository";

let produtorId;
let entregaCarregandoListRepository;
let entregaNoArmazemListRepository;
let entregaEntregueListRepository;

export default class ListService{

  constructor(produtor_id) {
    produtorId = produtor_id;
    entregaCarregandoListRepository = new EntregaCarregandoListRepository();
    entregaNoArmazemListRepository = new EntregaNoArmazemListRepository();
    entregaEntregueListRepository = new EntregaEntregueListRepository();
  }

  download(){
    getEntregasCarregandoList();
    getEntregasNoArmazemList();
    getEntregasEntregueList();
  }
}

function getEntregasCarregandoList(){
  Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega?status=carregando').then(response => {
    response.data.forEach(entrega => {
      entregaCarregandoListRepository.update(entrega);
    })
  })
}

function getEntregasNoArmazemList(){
  Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega?status=no_armazem').then(response => {
    response.data.forEach(entrega => {
      entregaNoArmazemListRepository.update(entrega);
    })
  })
}


function getEntregasEntregueList(){
  Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega?status=entregue').then(response => {
    response.data.forEach(entrega => {
      entregaEntregueListRepository.update(entrega);
    })
  })
}

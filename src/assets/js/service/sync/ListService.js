import Vue from 'vue'
import EntregaCarregandoListRepository from "../../repository/list/EntregaCarregandoListRepository";
import EntregaNoArmazemListRepository from "../../repository/list/EntregaNoArmazemListRepository";
import EntregaEntregueListRepository from "../../repository/list/EntregaEntregueListRepository";
import EntregaAPI from "../../api/EntregaAPI";
import EntregaViewRepository from "../../repository/list/EntregaViewRepository";

let produtorId;
let entregaCarregandoListRepository;
let entregaNoArmazemListRepository;
let entregaEntregueListRepository;
let entregaViewRepository;

export default class ListService{

  constructor(produtor_id) {
    produtorId = produtor_id;
    entregaCarregandoListRepository = new EntregaCarregandoListRepository();
    entregaNoArmazemListRepository = new EntregaNoArmazemListRepository();
    entregaEntregueListRepository = new EntregaEntregueListRepository();
    entregaViewRepository = new EntregaViewRepository();
  }

  download(){
    getEntregasCarregandoList();
    getEntregasNoArmazemList();
    getEntregasEntregueList();
    getEntregasView();
  }
}

async function getEntregasView(){
  let entregasCarregando = await entregaCarregandoListRepository.getAll();
  let entregasNoArmazem = await entregaNoArmazemListRepository.getAll();
  let entregasEntregue = await entregaEntregueListRepository.getAll();

  let entregas = entregasCarregando.concat(entregasNoArmazem).concat(entregasEntregue);

  entregas.forEach(entrega => {
    console.log(entrega.id)
    EntregaAPI.getEntrega(entrega.id, produtorId).then(response => {
      entregaViewRepository.update(response.data);
    })
  })
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

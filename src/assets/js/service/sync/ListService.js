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
    return Promise.all([
      getEntregasCarregandoList(),
      getEntregasNoArmazemList(),
      getEntregasEntregueList(),
      getEntregasView()
    ]);
  }
}

function getEntregasView(){
  return new Promise(async(resolve, reject) => {
    let entregasCarregando = await entregaCarregandoListRepository.getAll();
    let entregasNoArmazem = await entregaNoArmazemListRepository.getAll();
    let entregasEntregue = await entregaEntregueListRepository.getAll();

    let entregas = entregasCarregando.concat(entregasNoArmazem).concat(entregasEntregue);

    entregaViewRepository.clearTable().then(() => {
      entregas.forEach((entrega, index, array) => {
        EntregaAPI.getEntrega(entrega.id, produtorId).then(response => {
          entregaViewRepository.update(response.data);

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  });
}

function getEntregasCarregandoList(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get('produtor/' + produtorId + '/entrega?status=carregando').then(response => {
      entregaCarregandoListRepository.clearTable().then(() => {
        response.data.forEach((entrega, index, array) => {
          entregaCarregandoListRepository.update(entrega);

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  })
}

function getEntregasNoArmazemList(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get('produtor/' + produtorId + '/entrega?status=no_armazem').then(response => {
      entregaNoArmazemListRepository.clearTable().then(() => {
        response.data.forEach((entrega, index, array) => {
          entregaNoArmazemListRepository.update(entrega);

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  })
}


function getEntregasEntregueList(){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get('produtor/' + produtorId + '/entrega?status=entregue').then(response => {
      entregaEntregueListRepository.clearTable().then(() => {
        response.data.forEach((entrega, index, array) => {
          entregaEntregueListRepository.update(entrega);

          if (index === (array.length - 1)) {
            return resolve();
          }
        })
      })
    })
  })
}

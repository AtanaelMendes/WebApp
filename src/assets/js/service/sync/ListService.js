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

  async download(){
    await getEntregasCarregandoList();
    await getEntregasNoArmazemList();
    await getEntregasEntregueList();
    await getEntregasView();

    return Promise.resolve();
  }
}

async function getEntregasView(){
  let entregasCarregando = await entregaCarregandoListRepository.getAll();
  let entregasNoArmazem = await entregaNoArmazemListRepository.getAll();
  let entregasEntregue = await entregaEntregueListRepository.getAll();

  let entregas = entregasCarregando.concat(entregasNoArmazem).concat(entregasEntregue);

  await entregaViewRepository.clearTable();

  let promises = entregas.map(entrega => getEntrega(entrega.id, produtorId));

  return Promise.all(promises).then(()=>{
    Promise.resolve();
  });
}

async function getEntrega(entregaId, produtorId){
  let response = await EntregaAPI.getEntrega(entregaId, produtorId);
  await entregaViewRepository.update(response.data);
}

async function getEntregasCarregandoList(){
  let response = await Vue.prototype.$axios.get('produtor/' + produtorId + '/entrega?status=carregando');
  await entregaCarregandoListRepository.clearTable();

  for(let entrega of response.data){
    await entregaCarregandoListRepository.update(entrega);
  }
}

async function getEntregasNoArmazemList(){
  let response = await Vue.prototype.$axios.get('produtor/' + produtorId + '/entrega?status=no_armazem');
  await entregaNoArmazemListRepository.clearTable();

  for(let entrega of response.data){
    await entregaNoArmazemListRepository.update(entrega);
  }
}

async function getEntregasEntregueList(){
  let response = await Vue.prototype.$axios.get('produtor/' + produtorId + '/entrega?status=entregue');
  await entregaEntregueListRepository.clearTable();

  for(let entrega of response.data){
    await entregaEntregueListRepository.update(entrega);
  }
}

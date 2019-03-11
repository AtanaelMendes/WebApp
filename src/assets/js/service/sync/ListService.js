import Vue from 'vue'
import EntregaCarregandoListRepository from "../../repository/list/EntregaCarregandoListRepository";
import EntregaNoArmazemListRepository from "../../repository/list/EntregaNoArmazemListRepository";
import EntregaEntregueListRepository from "../../repository/list/EntregaEntregueListRepository";
import EntregaAPI from "../../api/EntregaAPI";
import EntregaViewRepository from "../../repository/list/EntregaViewRepository";
import ResourceService from "./ResourceService";

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
  let entregasToUpdateIds = ResourceService.entregasToUpdate;

  for(let id of ResourceService.entregasToDelete){
    await entregaViewRepository.delete(id);
  }

  let promises = entregasToUpdateIds.map(id => getEntrega(id, produtorId));

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

  for(let id of ResourceService.entregasToDelete){
    await entregaCarregandoListRepository.delete(id);
  }

  for(let entrega of response.data){
    await entregaCarregandoListRepository.update(entrega);
  }
}

async function getEntregasNoArmazemList(){
  let response = await Vue.prototype.$axios.get('produtor/' + produtorId + '/entrega?status=no_armazem');

  for(let id of ResourceService.entregasToDelete){
    await entregaNoArmazemListRepository.delete(id);
  }

  for(let entrega of response.data){
    await entregaNoArmazemListRepository.update(entrega);
  }
}

async function getEntregasEntregueList(){
  let response = await Vue.prototype.$axios.get('produtor/' + produtorId + '/entrega?status=entregue');

  for(let id of ResourceService.entregasToDelete){
    await entregaEntregueListRepository.delete(id);
  }

  for(let entrega of response.data){
    await entregaEntregueListRepository.update(entrega);
  }
}

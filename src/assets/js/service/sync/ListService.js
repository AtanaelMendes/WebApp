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
    return new Promise(async (resolve, reject) => {
      await getEntregasCarregandoList();
      await getEntregasNoArmazemList();
      await getEntregasEntregueList();
      await getEntregasView();
      resolve();
    });
  }
}

async function getEntregasView(){
  let entregasCarregando = await entregaCarregandoListRepository.getAll();
  let entregasNoArmazem = await entregaNoArmazemListRepository.getAll();
  let entregasEntregue = await entregaEntregueListRepository.getAll();

  let entregas = entregasCarregando.concat(entregasNoArmazem).concat(entregasEntregue);

  await entregaViewRepository.clearTable();

  let promises = [];

  for(let entrega of entregas){
    promises.push(
      EntregaAPI.getEntrega(entrega.id, produtorId).then(response => {
        entregaViewRepository.update(response.data);
      })
    )
  }

  Promise.all(promises).then(()=>{
    resolve();
  });
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

import EntregaAPI from "../../api/EntregaAPI";
import EntregaViewRepository from "../../repository/list/EntregaViewRepository";
import ResourceService from "./ResourceService";

let entregaViewRepository;

export default class ListService{

  constructor() {
    entregaViewRepository = new EntregaViewRepository();
  }

  async download(){
    await getEntregasView();

    return Promise.resolve();
  }
}

async function getEntregasView(){
  let entregasToUpdateIds = ResourceService.entregasToUpdate;

  for(let id of ResourceService.entregasToDelete){
    await entregaViewRepository.delete(id);
  }

  let promises = entregasToUpdateIds.map(id => getEntrega(id));

  return Promise.all(promises).then(()=>{
    ResourceService.entregasToUpdate = [];
    ResourceService.entregasToDelete = [];
    Promise.resolve();
  });
}

async function getEntrega(entregaId){
  let response = await EntregaAPI.getEntrega(entregaId);
  entregaViewRepository.update(response.data);
}

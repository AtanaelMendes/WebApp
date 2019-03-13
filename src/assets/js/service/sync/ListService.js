import EntregaAPI from "../../api/EntregaAPI";
import EntregaViewRepository from "../../repository/list/EntregaViewRepository";
import ResourceService from "./ResourceService";

let produtorId;
let entregaViewRepository;

export default class ListService{

  constructor(produtor_id) {
    produtorId = produtor_id;
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

  let promises = entregasToUpdateIds.map(id => getEntrega(id, produtorId));

  return Promise.all(promises).then(()=>{
    ResourceService.entregasToUpdate = [];
    ResourceService.entregasToDelete = [];
    Promise.resolve();
  });
}

async function getEntrega(entregaId, produtorId){
  let response = await EntregaAPI.getEntrega(entregaId, produtorId);
  await entregaViewRepository.update(response.data);
}

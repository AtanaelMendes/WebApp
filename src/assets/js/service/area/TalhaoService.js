import UnidadeMedidaService from "../UnidadeMedidaService";
import TalhaoAPI from "../../api/TalhaoAPI";

export default class TalhaoService{

  constructor() {
  }

  listTalhoes(area_id){
    return new Promise((resolve, reject) => {
      TalhaoAPI.listTalhoesByArea(area_id).then( response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  saveTalhao(areaId, params){
    return new Promise((resolve, reject) => {
      TalhaoAPI.saveTalhao(params, areaId).then(response => {
        if(response.status === 201) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  getTalhaoById(areaId, talhaoId){
    return new Promise((resolve, reject) => {
      TalhaoAPI.getById(talhaoId, areaId).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  listUnidadesArea(){
    return new Promise((resolve, reject) => {
      new UnidadeMedidaService().listUnidadesArea().then(unidades => {
        let unidadeAreaOptions = unidades.map(unidade => {
          return {
            value: unidade.id,
            label: unidade.nome +(unidade.sigla ? (', '+ unidade.sigla) : ""),
            sublabel: unidade.descricao
          }
        });
        resolve(unidadeAreaOptions)
      }).catch(error => {
        reject(error)
      })
    })
  };

  updateTalhao(areaId, talhaoId, params){
    return new Promise((resolve, reject) => {
      TalhaoAPI.updateTalhao(params, talhaoId, areaId).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  deleteTalhao(areaId, talhaoId){
    return new Promise((resolve, reject) => {
      TalhaoAPI.deleteTalhao(talhaoId, areaId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  archiveTalhao(areaId, talhaoId){
    return new Promise((resolve, reject) => {
      TalhaoAPI.archiveTalhao(talhaoId, areaId).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  restoreTalhao(areaId, talhaoId){
    return new Promise((resolve, reject) => {
      TalhaoAPI.restoreTalhao(talhaoId, areaId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response);
      })
    });
  };

}

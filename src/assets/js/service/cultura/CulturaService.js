import CulturaAPI from "../../api/CulturaAPI";
import CultivarAPI from "../../api/CultivarAPI";

export default class CulturaService{

  constructor() {
  }

  // CULTURAS
  getCultura(id){
    return new Promise((resolve, reject) => {
      CulturaAPI.getCultura(id).then( response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  listCulturas(){
    return new Promise((resolve, reject) => {
      CulturaAPI.listCulturas().then( response => {
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

  searchCulturaByName(terms){
    return new Promise((resolve, reject) => {
      CulturaAPI.searchCulturaByName(terms).then( response => {
        if(response.status === 200){
          resolve(this.parseCulturas(response.data))
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
  parseCulturas(culturas) {
    return (culturas).map(cultura => {
      return {
        label: cultura.nome,
        id: cultura.id
      }
    })
  };

  saveCultura(params){
    return new Promise((resolve, reject) => {
      CulturaAPI.saveCultura(params).then(response => {
        if(response.status === 201) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  deleteCultura(id){
    return new Promise((resolve, reject) => {
      CulturaAPI.deleteCultura(id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  restoreCultura(id){
    return new Promise((resolve, reject) => {
      CulturaAPI.restoreCultura(id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  archiveCultura(id){
    return new Promise((resolve, reject) => {
      CulturaAPI.archiveCultura(id).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  updateCultura(id, cultura){
    return new Promise((resolve, reject) => {
      CulturaAPI.updateCultura(cultura, id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  // CULTIVARES
  saveCultivar(cultura_id, params){
    return new Promise((resolve, reject) => {
      CultivarAPI.saveCultivar(params, cultura_id).then(response => {
        if(response.status === 201) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  deleteCultivar(cultura_id, id){
    return new Promise((resolve, reject) => {
      CultivarAPI.deleteCultivar(id, cultura_id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  restoreCultivar(cultura_id, id){
    return new Promise((resolve, reject) => {
      CultivarAPI.restoreCultivar(id, cultura_id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  archiveCultivar(cultura_id, id){
    return new Promise((resolve, reject) => {
      CultivarAPI.archiveCultivar(id, cultura_id).then(response => {
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

  updateCultivar(cultura_id, id, params){
    return new Promise((resolve, reject) => {
      CultivarAPI.updateCultivar(params, id, cultura_id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  parseUnidades(unidades){
    return unidades.map(unidade => {
      return {
        value: unidade.id,
        label: unidade.nome
      }
    });
  }
}

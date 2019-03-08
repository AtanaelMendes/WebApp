import Vue from 'vue'
import CulturaAPI from "../../api/CulturaAPI";
import MarcaAPI from "../../api/MarcaAPI";
import CultivarAPI from "../../api/CultivarAPI";
import UnidadeAPI from "../../api/UnidadeAPI";

export default class CulturaService{
  #produtorId;

  constructor(produtorId) {
    this.produtorId = produtorId;
  }

  // CULTURAS
  listCulturas(){
    return new Promise((resolve, reject) => {
      CulturaAPI.listCulturas(this.produtorId).then( response => {
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

  saveCultura(params){
    return new Promise((resolve, reject) => {
      CulturaAPI.saveCultura(params, this.produtorId).then(response => {
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
      CulturaAPI.deleteCultura(id, this.produtorId).then(response => {
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
      CulturaAPI.restoreCultura(id, this.produtorId).then(response => {
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
      CulturaAPI.archiveCultura(id, this.produtorId).then(response => {
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

  updateCultura(id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/cultura/' + id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  // MARCAS
  listMarcas(){
    return new Promise((resolve, reject) => {
      MarcaAPI.listMarcas(null, this.produtorId).then( response => {
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

  listMarcasSemCultivares(){
    return new Promise((resolve, reject) => {
      MarcaAPI.listMarcas('has-no-cultivares', this.produtorId).then( response => {
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

  saveMarca(params){
    return new Promise((resolve, reject) => {
      MarcaAPI.saveMarca(params, this.produtorId).then(response => {
        if(response.status === 201) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  deleteMarca(id){
    return new Promise((resolve, reject) => {
      MarcaAPI.deleteMarca(id, this.produtorId).then(response => {
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

  restoreMarca(id){
    return new Promise((resolve, reject) => {
      MarcaAPI.restoreMarca(id, this.produtorId).then(response => {
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

  archiveMarca(id){
    return new Promise((resolve, reject) => {
      MarcaAPI.archiveMarca(id, this.produtorId).then(response => {
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

  updateMarca(id, params){
    return new Promise((resolve, reject) => {
      MarcaAPI.updateMarca(params, id, this.produtorId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response);
        }
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

  // OUTROS
  selectUnidadeArea(){
    return new Promise((resolve, reject) => {
      this.getUnidadeArea().then(response => {
        let unidadeAreaOptions = response.data.map(unit => {
          return {
            value: unit.id,
            label: unit.nome,
            sublabel: unit.descricao
          }
        });
        resolve(unidadeAreaOptions)
      }).catch(error => {
        reject(error)
      })
    })
  };

  getUnidadeArea(id){
    return new Promise((resolve, reject) => {
      UnidadeAPI.getUnidadesArea().then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };

  selectUnidadeMedida(){
    return new Promise((resolve, reject) => {
      this.getUnidadeMedida().then(response => {
        let unidadeMediaOptions = response.data.map(unit => {
          return {
            value: unit.id,
            label: unit.nome,
            sublabel: unit.descricao
          }
        });
        resolve(unidadeMediaOptions)
      }).catch(error => {
        reject(error)
      })
    })
  };

  getUnidadeMedida(){
    return new Promise((resolve, reject) => {
      UnidadeAPI.getUnidadesMedida().then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };
}

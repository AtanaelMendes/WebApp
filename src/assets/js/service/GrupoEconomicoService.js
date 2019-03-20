import GrupoEconomicoAPI from "../api/GrupoEconomicoAPI";

export default class GrupoEconomicoService{

  constructor() {
  }

  saveGrupoEconomico(grupoEconomico) {
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.saveGrupoEconomico(grupoEconomico).then(response => {
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

  searchGrupoEconomico(terms){
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.searchGrupoEconomico(terms).then(response => {
        if(response.status === 200){
          resolve(this.parseGruposEconomicos(response.data))
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  parseGruposEconomicos(gruposEconomicos) {
    return gruposEconomicos.map(grupoEconomico => {
      return {
        label: grupoEconomico.nome,
        id: grupoEconomico.id
      }
    })
  };

}

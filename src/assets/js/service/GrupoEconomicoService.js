import GrupoEconomicoAPI from "../api/GrupoEconomicoAPI";

export default class GrupoEconomicoService{
  #produtorId;

  constructor(produtorId) {
    this.produtorId = produtorId;
  }

  saveGrupoEconomico(grupoEconomico) {
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.saveGrupoEconomico(grupoEconomico, this.produtorId).then(response => {
        console.log('aqui')
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        console.log('no catch');
        console.log(error.response);
        if(error.response.status === 422){
          reject(new Error('Já existe um registro com esse nome'))
        }else{
          reject(error)
        }
      })
    });
  };

  searchGrupoEconomico(terms){
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.searchGrupoEconomico(terms, this.produtorId).then(response => {
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

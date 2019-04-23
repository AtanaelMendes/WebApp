import CultivarAPI from "../../api/CultivarAPI";

export default class CultivarService{
  constructor() {
  }

  listCultivares(culturaId){
    return new Promise((resolve, reject) => {
      CultivarAPI.listCultivares(null, culturaId).then( response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  listCultivaresByMarca(culturaId, marcaId){
    return new Promise((resolve, reject) => {
      CultivarAPI.listCultivares('marca_id='+ marcaId, culturaId).then( response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }
}

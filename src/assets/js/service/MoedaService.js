import MoedaAPI from "../api/MoedaAPI";

export default class MoedaService{

  constructor() {
  }

  listMoedas() {
    return new Promise((resolve, reject) => {
      MoedaAPI.listMoedas().then(response => {
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

}

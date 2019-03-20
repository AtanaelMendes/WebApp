import IndexadorAPI from "../api/IndexadorAPI";

export default class IndexadorService{

  constructor() {
  }

  listIndexadores() {
    return new Promise((resolve, reject) => {
      IndexadorAPI.listIndexadores().then(response => {
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

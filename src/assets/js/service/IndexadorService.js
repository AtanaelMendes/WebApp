import IndexadorAPI from "../api/IndexadorAPI";

export default class IndexadorService{
  #produtorId;

  constructor(produtorId) {
    this.produtorId = produtorId;
  }

  listIndexadores() {
    return new Promise((resolve, reject) => {
      IndexadorAPI.listIndexadores(this.produtorId).then(response => {
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

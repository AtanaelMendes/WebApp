import ContaBancariaAPI from "../api/ContaBancariaAPI";

export default class ContaBancariaService{
  #produtorId;

  constructor(produtorId) {
    this.produtorId = produtorId;
  }

  listContasBancarias() {
    return new Promise((resolve, reject) => {
      ContaBancariaAPI.listContasBancarias(this.produtorId).then(response => {
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

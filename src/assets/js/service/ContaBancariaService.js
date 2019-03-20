import ContaBancariaAPI from "../api/ContaBancariaAPI";

export default class ContaBancariaService{

  constructor() {
  }

  listContasBancarias() {
    return new Promise((resolve, reject) => {
      ContaBancariaAPI.listContasBancarias().then(response => {
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

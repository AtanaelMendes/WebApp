import ProdutoAPI from "../../api/ProdutoAPI";

export default class ProdutoService {

  constructor() {
  }

  searchProdutos(nome) {
    return new Promise((resolve, reject) => {
      ProdutoAPI.searchByName(nome).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

}

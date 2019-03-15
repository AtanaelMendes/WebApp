import ProdutoAPI from "../../api/ProdutoAPI";

export default class ProdutoService {
  #produtorId;

  constructor(produtorId) {
    this.produtorId = produtorId;
  }

  searchProdutos(nome) {
    return new Promise((resolve, reject) => {
      ProdutoAPI.searchByName(nome, this.produtorId).then(response => {
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

import CidadeAPI from "../../api/CidadeAPI";
export default class CidadeService{

  constructor() {
  }

  searchCidade(terms){
    return new Promise((resolve, reject) => {
      CidadeAPI.searchCidade(terms).then(response => {
        if(response.status === 200) {
          resolve(this.parseCidade(response.data))
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  parseCidade(cidades) {
    return (cidades).map(cidade => {
      return {
        label: cidade.nome,
        sublabel: cidade.uf + ', ' + cidade.pais,
        id: cidade.id
      }
    })
  };
}

import CidadeAPI from "../../api/CidadeAPI";
export default class CidadeService{

  constructor() {
  }

  searchCidade(terms){
    return new Promise((resolve, reject) => {
      CidadeAPI.searchCidade(terms).then(response => {
        resolve(this.parseCidade(response.data))
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

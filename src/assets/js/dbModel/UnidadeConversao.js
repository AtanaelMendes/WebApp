export default class UnidadeConversao {
  id = null;
  origem_id = null;
  destino_id = null;
  multiplicador = null;

  constructor(unidadeConversao) {
    this.id = unidadeConversao.id;
    this.origem_id = unidadeConversao.origem_id;
    this.destino_id = unidadeConversao.destino_id;
    this.multiplicador = unidadeConversao.multiplicador;
  }
}

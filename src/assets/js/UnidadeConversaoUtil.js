import UnidadeConversaoRepository from "./repository/resource/UnidadeConversaoRepository";

export default class UnidadeConversaoUtil{

  async convert(id_origem, id_destino, value){
    //console.log(id_origem, id_destino, value)
    if(id_origem === id_destino){
      return value;
    }

    let existedUnidadeConversao = await new UnidadeConversaoRepository().getByOrigemAndDestino(id_origem, id_destino);

    if(existedUnidadeConversao){
      return value * existedUnidadeConversao.multiplicador
    }

    existedUnidadeConversao = await new UnidadeConversaoRepository().getByOrigemAndDestino(id_destino, id_origem);

    if(existedUnidadeConversao){
      return value / existedUnidadeConversao.multiplicador
    }

    return new Error('Não existe conversão para a combinação informada.');
  }
}

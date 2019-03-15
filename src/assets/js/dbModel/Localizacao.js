export default class Localizacao {
  id = null;
  pessoa_id = null;
  cidade = null;
  endereco = null;
  numero = null;
  complemento = null;
  bairro = null;
  cep = null;
  is_cobranca = null;
  is_fiscal = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(localizacao) {
    this.id = localizacao.id;
    this.pessoa_id = localizacao.pessoa_id;
    this.cidade = {
      id: localizacao.cidade.id,
      codigo: localizacao.cidade.codigo,
      nome: localizacao.cidade.nome,
      estado: {
        id: localizacao.cidade.estado.id,
        codigo: localizacao.cidade.estado.codigo,
        nome: localizacao.cidade.estado.nome,
        sigla: localizacao.cidade.estado.sigla,
        pais: {
          id: localizacao.cidade.estado.pais.id,
          codigo: localizacao.cidade.estado.pais.codigo,
          nome: localizacao.cidade.estado.pais.nome,
          sigla: localizacao.cidade.estado.pais.sigla,
        }
      }
    };
    this.endereco = localizacao.endereco;
    this.numero = localizacao.numero;
    this.complemento = localizacao.complemento;
    this.bairro = localizacao.bairro;
    this.cep = localizacao.cep;
    this.is_cobranca = localizacao.is_cobranca;
    this.is_fiscal = localizacao.is_fiscal;
    this.created_at = localizacao.created_at;
    this.updated_at = localizacao.updated_at;
    this.deleted_at = localizacao.deleted_at;
  }

  getFullAddress(){
    return this.endereco + (this.numero ? ', ' + this.numero : '') + (this.bairro ? ' - ' + this.bairro : '') +
    ', ' + this.cidade.nome + '-' + this.cidade.estado.nome;
  }
}


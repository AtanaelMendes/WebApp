export default class CulturaClassificacao {
  id = null;
  cultura_id = null;
  classificacao_id = null;
  tolerancia = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(culturaClassificacao) {
    this.id = culturaClassificacao.id;
    this.cultura_id = culturaClassificacao.cultura_id;
    this.classificacao_id = culturaClassificacao.classificacao_id;
    this.tolerancia = culturaClassificacao.tolerancia;
    this.created_at = culturaClassificacao.created_at;
    this.updated_at = culturaClassificacao.updated_at;
    this.deleted_at = culturaClassificacao.deleted_at;
  }
}

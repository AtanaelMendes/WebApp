export default class Safra {
  id = null;
  ano_inicio = null;
  ano_fim = null;
  is_safrinha = null;
  is_favorite = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(safra) {
    this.id = safra.id;
    this.ano_inicio = safra.ano_inicio;
    this.ano_fim = safra.ano_fim;
    this.is_safrinha = safra.is_safrinha;
    this.is_favorite = safra.is_favorite;
    this.created_at = safra.created_at;
    this.updated_at = safra.updated_at;
    this.deleted_at = safra.deleted_at;
  }
}

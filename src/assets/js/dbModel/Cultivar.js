export default class Cultivar {
  id = null;
  cultura_id = null;
  marca_id = null;
  nome = null;
  ciclo = null;
  ciclo_dias = null;
  is_convencional = null;
  is_rr = null;
  is_inox = null;
  is_intacta = null;
  observacoes = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(cultivar) {
    this.id = cultivar.id;
    this.cultura_id = cultivar.cultura_id;
    this.marca_id = cultivar.marca_id;
    this.nome = cultivar.nome;
    this.ciclo = cultivar.ciclo;
    this.ciclo_dias = cultivar.ciclo_dias;
    this.is_convencional = cultivar.is_convencional;
    this.is_rr = cultivar.is_rr;
    this.is_inox = cultivar.is_inox;
    this.is_intacta = cultivar.is_intacta;
    this.observacoes = cultivar.observacoes;
    this.created_at = cultivar.created_at;
    this.updated_at = cultivar.updated_at;
    this.deleted_at = cultivar.deleted_at;
  }
}

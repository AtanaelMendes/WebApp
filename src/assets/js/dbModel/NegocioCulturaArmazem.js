export default class NegocioCulturaArmazem {
  id = null;
  negocio_cultura_id = null;
  armazem_id = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;

  constructor(negocioCulturaArmazem) {
    this.id = negocioCulturaArmazem.id;
    this.negocio_cultura_id = negocioCulturaArmazem.negocio_id;
    this.armazem_id = negocioCulturaArmazem.safra_cultura_id;
    this.created_at = negocioCulturaArmazem.created_at;
    this.updated_at = negocioCulturaArmazem.updated_at;
    this.deleted_at = negocioCulturaArmazem.deleted_at;
  }
}

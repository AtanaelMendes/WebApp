export default class SafraCultura {
  id = null;
  safra_id = null;
  cultura_id = null;
  view_unidade_medida_id = null;
  view_unidade_area_id = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(safraCultura) {
    this.id = safraCultura.id;
    this.safra_id = safraCultura.safra_id;
    this.cultura_id = safraCultura.cultura_id;
    this.view_unidade_medida_id = safraCultura.view_unidade_medida_id;
    this.view_unidade_area_id = safraCultura.view_unidade_area_id;
    this.created_at = safraCultura.created_at;
    this.updated_at = safraCultura.updated_at;
    this.deleted_at = safraCultura.deleted_at;
  }
}

import Dexie from 'dexie';

let db_primary = new Dexie('ap_primary');
let db_resources = new Dexie('ap_resources');
let db_lists = new Dexie('ap_lists');

db_primary.version(1).stores({
  account_info: '',
  request_queue: '++id, grouper, type, request.url, date',
  queue_api_id_relations: 'local_id, api_id',
});

db_resources.version(1).stores({
  caminhoes: 'id',
  safra_culturas: 'id',
  safra_culturas_talhoes: 'id, safra_cultura_id',
  safras: 'id',
  culturas: 'id',
  areas: 'id',
  talhoes: 'id',
  unidades: 'id',
  classificacoes: 'id',
  images: 'id',
  entregas: 'id, caminhao_id, status',
  cultivares: 'id',
  marcas: 'id',
  negocios: 'id',
  negocios_culturas: 'id',
  pessoas: 'id',
  negocios_culturas_armazens: 'id, negocio_cultura_id',
  localizacoes: 'id',
  armazens: 'id',
  entregas_negocios: 'id, negocio_cultura_id, entrega_id',
});

db_lists.version(1).stores({
  entregas_carregando: 'id',
  entregas_no_armazem: 'id',
  entregas_entregue: 'id',
  entrega_view: 'id',
});

export default ({ Vue }) => {
  Vue.prototype.db_resources = db_resources;
  Vue.prototype.db_lists = db_lists;
  Vue.prototype.db_primary = db_primary;
}

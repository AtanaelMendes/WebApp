import Dexie from 'dexie';

let db_resources = new Dexie('ap_resources');
let db_lists = new Dexie('ap_lists');
let db_queues = new Dexie('ap_queue');

db_resources.version(1).stores({
  caminhoes: 'id',
  safra_culturas: 'id',
  safra_culturas_talhoes: 'id',
  safras: 'id',
  culturas: 'id',
  areas: 'id',
  talhoes: 'id',
  unidades: 'id',
  classificacoes: 'id',
  images: 'id',
});

db_lists.version(1).stores({
  entregas_carregando: 'id',
});

db_queues.version(1).stores({
  request_queue: '++id, grouper, request.url, date',
});

export default ({ Vue }) => {
  Vue.prototype.db_resources = db_resources;
  Vue.prototype.db_lists = db_lists;
  Vue.prototype.db_queue = db_queues;
}

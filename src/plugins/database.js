import Dexie from 'dexie';

let db = new Dexie('agro_project');
db.version(1).stores({
  request_queue: '++id, grouper, request.url, date',
  caminhoes: 'id',
  safra_culturas: 'id',
  safras: 'id',
  culturas: 'id',
  areas: 'id',
  talhoes: 'id',
  unidades: 'id',
  classificacoes: 'id',
});

export default ({ Vue }) => {
  Vue.prototype.db = db
}

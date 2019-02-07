import Dexie from 'dexie';

let db = new Dexie('agro_project');
db.version(1).stores({
  request_queue: '++id, grouper, request.url, date',
});

export default ({ Vue }) => {
  Vue.prototype.db = db
}

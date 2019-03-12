export default class BaseRepository {
  #table;
  #modelType;

  constructor(table, modelType) {
    this.table = table;
    this.modelType = modelType;
  }

  getById(id){
    return this.table.get({id: id});
  };

  getAll(){
    return this.table.toArray()
  }

  first(){
    return this.table.toCollection().first();
  }

  update(model){
    if(!(model instanceof this.modelType)){
      throw new Error(`Objeto não é do tipo ${this.modelType.name}!`);
    }
    return this.table.put(model)
  }

  delete(id){
    return this.table.delete(id);
  }

  clearTable(){
    return this.table.clear();
  }
}

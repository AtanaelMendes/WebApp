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

  update(model){
    if(!(model instanceof this.modelType)){
      throw new Error(`Objeto não é do tipo ${this.modelType.name}!`);
    }
    return this.table.put(model)
  }

  clearTable(){
    return this.table.clear();
  }
}

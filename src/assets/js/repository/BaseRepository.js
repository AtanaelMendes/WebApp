import Area from "../dbModel/Area";

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

  update(model){
    if(!(model instanceof this.modelType)){
      throw new Error('Objeto não é do tipo ${this.modelType}!');
    }
    return this.table.put(model)
  }
}

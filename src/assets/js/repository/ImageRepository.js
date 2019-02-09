import Vue from 'vue';
import Image from "../dbModel/Image";

let table = Vue.prototype.db.images;

export default class ImageRepository {
  getById(id){
    return table.get({id: id});
  };

  update(image){
    if(!(image instanceof Image)){
      throw new Error('Objeto não é do tipo Image!');
    }
    return table.put(image)
  }
}

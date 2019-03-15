import Vue from 'vue';
import Image from "../../dbModel/Image";
import BaseRepository from "./BaseRepository";

export default class ImageRepository extends BaseRepository{

  constructor() {
    super(Vue.prototype.db_resources.images, Image);
  }
}

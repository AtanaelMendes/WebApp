export default class Image {
  id = null;
  file_name = null;
  created_at = null;
  updated_at = null;
  deleted_at = null;


  constructor(image) {
    this.id = image.id;
    this.file_name = image.file_name;
    this.created_at = image.created_at;
    this.updated_at = image.updated_at;
    this.deleted_at = image.deleted_at;
  }
}

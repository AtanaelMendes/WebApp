import TypesService from "../assets/js/service/utils/TypesService";

export default ({ Vue }) => {
  var ts = new TypesService ();
  Vue.prototype.$typesService = ts;
}

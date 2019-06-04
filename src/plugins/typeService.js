import TypeService from "../assets/js/service/utils/TypeService";

export default ({ Vue }) => {
  var ts = new TypeService ();
  Vue.prototype.$typeService = ts;
}

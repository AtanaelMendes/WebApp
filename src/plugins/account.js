// import something here

// leave the export, even if you don't use it


export default({ app, router, Vue }) => {
  // something to do
  /*Vue.prototype.db_primary.account_info.get(1).then(account => {
    Vue.prototype.$account = account;
  })*/

  Vue.prototype.$account = Vue.prototype.db_primary.account_info.get(1);
}

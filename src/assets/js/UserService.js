import { Dialog } from 'quasar'
import Vue from 'vue'
import { Loading } from 'quasar'

function parseRolesToItems(roles) {
  var items = [];
  roles.forEach(function (role) {
    var item = {};
    item['label'] = role.name;
    item['value'] = role.id;
    items.push(item)
  });
  return items
}

function getIdsByRoles(roles) {
  let rolesIds = [];
  roles.forEach(function (role) {
    rolesIds.push(role.id)
  });
  return rolesIds
}

function getRolesById(roles, ids) {
  let selectedRoles = [];
  for(let i = 0; i < ids.length; i++) {
    roles.forEach(function (role) {
      if(role.id === ids[i]){
        selectedRoles.push(role)
      }
    })
  }
  return selectedRoles;
}

const openRolesDialog = (selectedRoles, roles) => {
  return new Promise((resolve, reject) => {
    Dialog.create({
      title: 'Funções',
      message: 'Selecione as funções do usuário.',
      options: {
        type: 'checkbox',
        model: getIdsByRoles(selectedRoles),
        items: parseRolesToItems(roles)
      },
      cancel: true,
      preventClose: true,
      color: 'primary'
    }).then(data => {
      resolve(getRolesById(roles, data));
    }).catch(error => {
      reject(error)
    })
  });
};


const removeRole = (selectedRoles, role) => {
  return new Promise((resolve, reject) => {
    Dialog.create({
      title: 'Atenção',
      message: 'Realmente deseja apagar essa permissão?',
      ok: 'Sim',
      cancel: 'Não',
      preventClose: true,
      color: 'primary'
    }).then(data => {
      let id = selectedRoles.indexOf(role);
      selectedRoles.splice(id,1);
      resolve(data);
    }).catch(error => {
      reject(error)
    })
  });
};

const listRoles = () => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get( 'role' ).then( response => {
      resolve(response.data);
    })
  });
};


const saveAccount = (params) => {
  return new Promise((resolve, reject) => {
    Loading.show();

    Vue.prototype.$axios.post( 'account', params ).then( response => {
      if (response.status === 201){
        Loading.hide();

        resolve(response)

      }
    }).catch( error => {
      Loading.hide();
      reject(error)
    })

  });
};

const updateAccount = (params, accountId) => {
  return new Promise((resolve, reject) => {
    Loading.show();

    Vue.prototype.$axios.put( 'account/' + accountId, params ).then( response => {
      if (response.status === 200){
        Loading.hide();

        resolve(response)

      }
    }).catch( error => {
      Loading.hide();
      reject(error)
    })

  });
};

const getAccount = (accountId) => {
  return new Promise((resolve, reject) => {
    Loading.show();
    this.$axios.get( 'account/'+ accountId).then( response => {
      Loading.hide();
      resolve(response);

    }).catch( error => {
      Loading.hide();
      reject(error);
    })
  });
};

export default {parseRolesToItems, getIdsByRoles, getRolesById, openRolesDialog, removeRole, listRoles, saveAccount, updateAccount, getAccount}

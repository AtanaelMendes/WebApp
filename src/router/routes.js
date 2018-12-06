const routes = [
  { path: '/', component: () => import('pages/Index.vue') },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/admin', component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Dashboard.vue')},
      { name: 'users', path: 'usuarios', component: () => import('pages/admin/users/UserList.vue'),
        children: [
          { name: 'view_user', path: 'view/:id', component: () => import('pages/admin/users/UserView.vue') },
          { name: 'add_user', path: 'add', component: () => import('pages/admin/users/UserAdd.vue') },
          { name: 'edit_user', path: 'edit/:id', component: () => import('pages/admin/users/UserEdit.vue') },
        ]
      },
      { name: 'pessoas', path: 'pessoas', component: () => import('pages/admin/pessoas/PessoaList.vue'),
        children: [
          { name: 'view_pessoa', path: 'view/:id', component: () => import('pages/admin/pessoas/PessoaView.vue') },
          { name: 'add_pessoa', path: 'add', component: () => import('pages/admin/pessoas/PessoaAdd.vue') },
          { name: 'edit_pessoa', path: 'edit/:id', component: () => import('pages/admin/pessoas/PessoaEdit.vue') },

          { name: 'update_contact', path: ':id/contatos/:contatoId/update', component: () => import('pages/admin/pessoas/contatos/ContatoUpdate.vue') },
          { name: 'add_contact', path: ':id/contatos/add', component: () => import('pages/admin/pessoas/contatos/ContatoAdd.vue') },

          { name: 'update_localizacao', path: ':id/localizacao/:localizacaoId/update', component: () => import('pages/admin/pessoas/localizacoes/LocalizacaoUpdate.vue') },
          { name: 'add_localizacao', path: ':id/localizacao/add', component: () => import('pages/admin/pessoas/localizacoes/LocalizacaoAdd.vue') }
        ]
      },
      { name: 'notas-fiscais', path: 'notas-fiscais', component: () => import('pages/admin/notasFiscais/NotaList.vue'),
        children: [
          { name: 'view_nota', path: 'view/:id', component: () => import('pages/admin/notasFiscais/NotaView.vue') },
          { name: 'new_nota', path: 'new', component: () => import('pages/admin/notasFiscais/NotaGenerate.vue') }
          // { name: 'edit_area', path: 'edit/:id', component: () => import('pages/admin/notasFiscais/AreaEdit.vue') }
        ]
      },
      { name: 'areas', path: 'areas', component: () => import('pages/admin/areas/AreaList.vue'),
        children: [
          { name: 'view_area', path: 'view/:id', component: () => import('pages/admin/areas/AreaView.vue') },
          { name: 'add_area', path: 'add', component: () => import('pages/admin/areas/AreaAdd.vue') },
          { name: 'edit_area', path: 'edit/:id', component: () => import('pages/admin/areas/AreaEdit.vue') },
          // { name: 'list_talhao', path: 'list/:id', component: () => import('pages/admin/areas/TalhaoList.vue') },
          { name: 'add_talhao', path: 'add/:id', component: () => import('pages/admin/areas/talhao/TalhaoAdd.vue') },
          { name: 'edit_talhao', path: ':id/edit/:talhaoId', component: () => import('pages/admin/areas/talhao/TalhaoEdit.vue') }
        ]
      },
      { name: 'safras', path: 'safras', component: () => import('pages/admin/safras/SafraList.vue')},
      { name: 'add_safra', path: 'add', component: () => import('pages/admin/safras/SafraAdd.vue') },
      { name: 'view_cultura_safra', path: 'cultura/safra/view/:id', component: () => import('pages/admin/safras/safraCultura/SafraCulturaView.vue') },
      { name: 'add_cultura_safra', path: 'cultura/safra/:id/add', component: () => import('pages/admin/safras/safraCultura/SafraCulturaAdd.vue') },

        // children: [
        //   { name: 'cultura_safra', path: 'view/:id', component: () => import('pages/admin/safras/cultura/SafraCultura.vue') },
        //   { name: 'add_safra', path: 'add', component: () => import('pages/admin/safras/SafraAdd.vue') },
        //   { name: 'edit_safra', path: 'edit/:id', component: () => import('pages/admin/safras/SafraEdit.vue') }
        // ]
      // },
      { path: 'teste', component: () => import('pages/admin/TestFather.vue'),
        children: [
          { path: 'child', component: () => import('pages/admin/TestChild.vue') }
        ]
      },
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

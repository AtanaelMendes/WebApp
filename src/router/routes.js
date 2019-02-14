const routes = [
  { path: '/', component: () => import('pages/Index.vue') },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/admin', component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Dashboard.vue')},
      { name: 'users', path: 'usuarios', component: () => import('pages/admin/users/UserList.vue') },
      { name: 'view_user', path: 'view/:id', component: () => import('pages/admin/users/UserView.vue') },
      { name: 'add_user', path: 'add', component: () => import('pages/admin/users/UserAdd.vue') },
      { name: 'edit_user', path: 'edit/:id', component: () => import('pages/admin/users/UserEdit.vue') },

      { name: 'pessoas', path: 'pessoas', component: () => import('pages/admin/pessoas/PessoaList.vue')},
      { name: 'view_pessoa', path: 'view/:id', component: () => import('pages/admin/pessoas/PessoaView.vue') },
      { name: 'add_pessoa', path: 'add', component: () => import('pages/admin/pessoas/PessoaAdd.vue') },
      { name: 'edit_pessoa', path: 'edit/:id', component: () => import('pages/admin/pessoas/PessoaEdit.vue') },
      { name: 'update_contact', path: ':id/contatos/:contatoId/update', component: () => import('pages/admin/pessoas/contatos/ContatoUpdate.vue') },
      { name: 'add_contact', path: ':id/contatos/add', component: () => import('pages/admin/pessoas/contatos/ContatoAdd.vue') },
      { name: 'update_localizacao', path: ':id/localizacao/:localizacaoId/update', component: () => import('pages/admin/pessoas/localizacoes/LocalizacaoUpdate.vue') },
      { name: 'add_localizacao', path: ':id/localizacao/add', component: () => import('pages/admin/pessoas/localizacoes/LocalizacaoAdd.vue') },

      { name: 'notas-fiscais', path: 'notas-fiscais', component: () => import('pages/admin/notasFiscais/NotaList.vue') },
      { name: 'view_nota', path: 'view/:id', component: () => import('pages/admin/notasFiscais/NotaView.vue') },
      { name: 'new_nota', path: 'new', component: () => import('pages/admin/notasFiscais/NotaGenerate.vue') },
      // { name: 'edit_area', path: 'edit/:id', component: () => import('pages/admin/notasFiscais/AreaEdit.vue') }

      { name: 'areas', path: 'areas', component: () => import('pages/admin/areas/AreaList.vue')},
      { name: 'add_area', path: 'add', component: () => import('pages/admin/areas/AreaAdd.vue') },
      { name: 'view_area', path: 'view/:id', component: () => import('pages/admin/areas/AreaView.vue') },
      { name: 'edit_area', path: 'edit/:id', component: () => import('pages/admin/areas/AreaEdit.vue') },
      { name: 'add_talhao', path: 'add/:id', component: () => import('pages/admin/areas/talhao/TalhaoAdd.vue') },
      { name: 'edit_talhao', path: ':id/edit/:talhaoId', component: () => import('pages/admin/areas/talhao/TalhaoEdit.vue') },

      { name: 'safras', path: 'safras', component: () => import('pages/admin/safras/SafraList.vue')},
      { name: 'add_safra', path: 'safras/add', component: () => import('pages/admin/safras/SafraAdd.vue') },
      { name: 'view_safra_cultura', path: 'safras/:safra_id/safra_cultura/view/:id', component: () => import('pages/admin/safras/safraCultura/SafraCulturaView.vue') },

      { name: 'culturas', path: 'culturas', component: () => import('pages/admin/culturas/CulturaListView.vue')},

      { name: 'negocios', path: 'negocios', component: () => import('pages/admin/negocios/NegociosList.vue')},
      { name: 'negocio_view', path: 'negocios/:id/view', component: () => import('pages/admin/negocios/NegocioView.vue')},

      { name: 'entregas', path: 'entregas', component: () => import('pages/admin/entregas/EntregasList.vue')},
      { name: 'entrega_view', path: 'entregas/:id/view', component: () => import('pages/admin/entregas/EntregaView.vue')},

      { name: 'teste', path: 'teste', component: () => import('pages/admin/Teste.vue')},
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

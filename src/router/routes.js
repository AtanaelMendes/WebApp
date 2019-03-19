import EntregasList from 'pages/admin/entregas/EntregasList'
import EntregaView from 'pages/admin/entregas/EntregaView'

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
      { name: 'add_area', path: 'area/add', component: () => import('pages/admin/areas/AreaAdd.vue') },
      { name: 'view_area', path: 'area/view/:id', component: () => import('pages/admin/areas/AreaView.vue') },
      { name: 'edit_area', path: 'area/edit/:id', component: () => import('pages/admin/areas/AreaEdit.vue') },
      { name: 'add_talhao', path: 'talhao/add/:id', component: () => import('pages/admin/areas/talhao/TalhaoAdd.vue') },
      { name: 'edit_talhao', path: 'area/:id/talhao/edit/:talhaoId', component: () => import('pages/admin/areas/talhao/TalhaoEdit.vue') },

      { name: 'safras', path: 'safras', component: () => import('pages/admin/safras/SafraList.vue')},
      { name: 'add_safra', path: 'safras/add', component: () => import('pages/admin/safras/SafraAdd.vue') },
      { name: 'view_safra_cultura', path: 'safras/:safra_id/safra_cultura/view/:id', component: () => import('pages/admin/safras/safraCultura/SafraCulturaView.vue') },

      { name: 'culturas', path: 'culturas', component: () => import('pages/admin/culturas/CulturaListView.vue')},

      { name: 'negocios', path: 'negocios', component: () => import('pages/admin/negocios/NegociosList.vue')},
      { name: 'negocio_view', path: 'negocios/:id/view', component: () => import('pages/admin/negocios/NegocioView.vue')},

      { name: 'entregas', path: 'entregas', component: EntregasList},
      { name: 'entrega_view', path: 'entregas/:id/view', component: EntregaView},

      { name: 'caminhoes', path: 'caminhoes', component: () => import('pages/admin/caminhoes/CaminhoesList.vue')},
      { name: 'view_caminhao', path: 'caminhao/:id/view', component: () => import('pages/admin/caminhoes/CaminhaoView.vue')},
      { name: 'edit_caminhao', path: 'caminhao/:id/edit', component: () => import('pages/admin/caminhoes/CaminhaoEdit.vue')},
      { name: 'add_caminhao', path: 'caminhao/add', component: () => import('pages/admin/caminhoes/CaminhaoAdd.vue')},

      { name: 'motoristas', path: 'motoristas', component: () => import('pages/admin/motoristas/MotoristasList.vue')},
      { name: 'view_motorista', path: 'motorista/view/:id', component: () => import('pages/admin/motoristas/MotoristaView.vue') },
      { name: 'add_motorista', path: 'motorista/add', component: () => import('pages/admin/motoristas/MotoristaAdd.vue') },
      { name: 'edit_motorista', path: 'motorista/edit/:id', component: () => import('pages/admin/motoristas/MotoristaEdit.vue') },

      { name: 'armazens', path: 'armazens', component: () => import('pages/admin/armazens/ArmazensList.vue')},
      { name: 'view_armazem', path: 'armazem/view/:id', component: () => import('pages/admin/armazens/ArmazemView.vue') },
      { name: 'add_armazem', path: 'armazem/add', component: () => import('pages/admin/armazens/ArmazemAdd.vue') },
      { name: 'edit_armazem', path: 'armazem/edit/:id', component: () => import('pages/admin/armazens/ArmazemEdit.vue') },

      { name: 'classificacoes', path: 'classificacoes', component: () => import('pages/admin/classificacoes/ClassificacoesList.vue')},
      { name: 'view_classificacao', path: 'classificacao/view/:id', component: () => import('pages/admin/classificacoes/ClassificacaoView.vue') },
      { name: 'add_classificacao', path: 'classificacao/add', component: () => import('pages/admin/classificacoes/ClassificacaoAdd.vue') },
      { name: 'edit_classificacao', path: 'armazem/edit/:id', component: () => import('pages/admin/classificacoes/ClassificacaoEdit.vue') },

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

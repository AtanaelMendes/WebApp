import EntregasList from 'pages/admin/entregas/EntregasList'
import EntregaView from 'pages/admin/entregas/EntregaView'

const routes = [
  { path: '/', component: () => import('pages/Index.vue') },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/admin', component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Dashboard.vue')},
      { name: 'users', path: 'usuarios', component: () => import('pages/admin/users/UserList.vue') },
      { name: 'view_user', path: 'usuario/view/:id', component: () => import('pages/admin/users/UserView.vue') },
      { name: 'add_user', path: 'usuario/add', component: () => import('pages/admin/users/UserAdd.vue') },
      { name: 'edit_user', path: 'usuario/edit/:id', component: () => import('pages/admin/users/UserEdit.vue') },

      { name: 'pessoas', path: 'pessoas', component: () => import('pages/admin/pessoas/PessoaList.vue')},
      { name: 'view_pessoa', path: 'pessoa/view/:id', component: () => import('pages/admin/pessoas/PessoaView.vue') },
      { name: 'add_pessoa', path: 'pessoa/add', component: () => import('pages/admin/pessoas/PessoaAdd.vue') },
      { name: 'edit_pessoa', path: 'pessoa/edit/:id', component: () => import('pages/admin/pessoas/PessoaEdit.vue') },
      { name: 'update_contact', path: ':id/contatos/:contatoId/update', component: () => import('pages/admin/pessoas/contatos/ContatoUpdate.vue') },
      { name: 'add_contact', path: ':id/contatos/add', component: () => import('pages/admin/pessoas/contatos/ContatoAdd.vue') },
      { name: 'update_localizacao', path: ':id/localizacao/:localizacaoId/update', component: () => import('pages/admin/pessoas/localizacoes/LocalizacaoUpdate.vue') },
      { name: 'add_localizacao', path: ':id/localizacao/add', component: () => import('pages/admin/pessoas/localizacoes/LocalizacaoAdd.vue') },

      { name: 'areas', path: 'areas', component: () => import('pages/admin/areas/AreaList.vue')},
      { name: 'add_area', path: 'area/add', component: () => import('pages/admin/areas/AreaAdd.vue') },
      { name: 'view_area', path: 'area/:id/view', component: () => import('pages/admin/areas/AreaView.vue') },
      { name: 'edit_area', path: 'area/:id/edit', component: () => import('pages/admin/areas/AreaEdit.vue') },

      { name: 'add_talhao', path: 'talhao/add/:id', component: () => import('pages/admin/areas/talhao/TalhaoAdd.vue') },
      { name: 'edit_talhao', path: 'area/:id/talhao/edit/:talhaoId', component: () => import('pages/admin/areas/talhao/TalhaoEdit.vue') },

      { name: 'safras', path: 'safras', component: () => import('pages/admin/safras/SafraList.vue')},
      { name: 'add_safra', path: 'safras/add', component: () => import('pages/admin/safras/SafraAdd.vue') },
      { name: 'view_safra_cultura', path: 'safras/:safra_id/safra_cultura/view/:id/*', component: () => import('pages/admin/safras/SafraCulturaView.vue') },

      { name: 'culturas', path: 'culturas', component: () => import('pages/admin/culturas/CulturaList.vue')},
      { name: 'view_cultura', path: 'culturas/:id', component: () => import('pages/admin/culturas/CulturaView.vue')},

      { name: 'negocios', path: 'negocios', component: () => import('pages/admin/negocios/NegociosList.vue')},
      { name: 'negocio_view', path: 'negocios/:id', component: () => import('pages/admin/negocios/NegocioView.vue')},

      { name: 'entregas', path: 'entregas', component: EntregasList},
      { name: 'entrega_view', path: 'entregas/:id', component: EntregaView},

      { name: 'caminhoes', path: 'caminhoes', component: () => import('pages/admin/caminhoes/CaminhoesList.vue')},
      { name: 'view_caminhao', path: 'caminhao/:id', component: () => import('pages/admin/caminhoes/CaminhaoView.vue')},

      { name: 'motoristas', path: 'motoristas', component: () => import('pages/admin/motoristas/MotoristasList.vue')},
      { name: 'view_motorista', path: 'motorista/:id', component: () => import('pages/admin/motoristas/MotoristaView.vue') },

      { name: 'armazens', path: 'armazens', component: () => import('pages/admin/armazens/ArmazensList.vue')},
      { name: 'view_armazem', path: 'armazem/:id', component: () => import('pages/admin/armazens/ArmazemView.vue') },

      { name: 'classificacoes', path: 'classificacoes', component: () => import('pages/admin/classificacoes/ClassificacoesList.vue')},
      { name: 'view_classificacao', path: 'classificacao/:id', component: () => import('pages/admin/classificacoes/ClassificacaoView.vue') },

      { name: 'grupos_economicos', path: 'grupos-economicos', component: () => import('pages/admin/gruposEconomicos/GruposEconomicosList.vue')},
      { name: 'view_grupo_economico', path: 'grupos-economicos/:id', component: () => import('pages/admin/gruposEconomicos/GrupoEconomicoView.vue') },

      { name: 'notas_fiscais', path: 'notas_fiscais', component: () => import('pages/admin/notasFiscais/NotaList.vue') },
      { name: 'view_nota_fiscal', path: 'notas_fiscais/:id', component: () => import('pages/admin/notasFiscais/NotaView.vue') },


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

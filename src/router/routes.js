export default [

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
          { name: 'edit_user', path: 'edit/:id', component: () => import('pages/admin/users/UserEdit.vue') }
        ]
      },
      { name: 'pessoas', path: 'pessoas', component: () => import('pages/admin/pessoas/PessoaList.vue'),
        children: [
          { name: 'view_pessoa', path: 'view/:id', component: () => import('pages/admin/pessoas/PessoaView.vue') },
          { name: 'add_pessoa', path: 'add', component: () => import('pages/admin/pessoas/PessoaAdd.vue') },
          { name: 'edit_pessoa', path: 'edit/:id', component: () => import('pages/admin/pessoas/PessoaEdit.vue') }
        ]
      },
      { path: 'teste', component: () => import('pages/admin/TestFather.vue'),
        children: [
          { path: 'child', component: () => import('pages/admin/TestChild.vue') }
        ]
      },
    ]
  }
];

  // ROTAS DE USUARIO
  { path: '/usuario',  component: () => import('components/views/user/ListUser.vue') },
  { path: '/usuario/perfil/:id',  component: () => import('components/views/user/ProfileUser.vue') },
  { path: '/usuario/editar/:id',  component: () => import('components/views/user/EditUser.vue') },
  { path: '/usuario/cadastro',  component: () => import('components/views/user/CreateUser.vue') },

  // ROTAS DE PESSOAS
  { path: '/pessoas',  component: () => import('components/views/person/ListPerson.vue') },
  { path: '/pessoa/perfil',  component: () => import('components/views/person/ProfilePerson.vue') },
  { path: '/pessoa/editar/:id',  component: () => import('components/views/person/EditPerson.vue') },
  { path: '/pessoa/cadastro',  component: () => import('components/views/person/NewPerson.vue') },
  { path: '/pessoa/novo-contato/:id',  component: () => import('components/views/person/NewContact.vue') },
  { path: '/pessoa/editar-contato',  component: () => import('components/views/person/EditContact.vue') },
  { path: '/pessoa/novo-endereco/:id',  component: () => import('components/views/person/NewAddress.vue') },
  { path: '/pessoa/editar-endereco/:id',  component: () => import('components/views/person/EditAddress.vue') },

  // ROTAS DE AREA
  { path: '/areas',  component: () => import('components/views/area/ListArea.vue') },
  { path: '/area/nova-area',  component: () => import('components/views/area/NewArea.vue') },
  { path: '/area/editar-area',  component: () => import('components/views/area/EditArea.vue') },

  // rota de exemplo
  { path: '/exemplo',  component: () => import('components/views/example/InfinitScroll.vue') },

  { path: '*', component: () => import('components/Error404.vue') }
]

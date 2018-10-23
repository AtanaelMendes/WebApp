export default [

  { path: '/', component: () => import('components/Index.vue') },
  { path: '/Login',  component: () => import('components/Login.vue') },

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

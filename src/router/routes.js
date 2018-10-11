export default [

  { path: '/', component: () => import('components/Index.vue') },
  { path: '/Login',  component: () => import('components/Login.vue') },

  //rotas de usuarios
  { path: '/usuario',  component: () => import('components/views/user/ListUser.vue') },
  { path: '/usuario/perfil/:id',  component: () => import('components/views/user/ProfileUser.vue') },
  { path: '/usuario/editar/:id',  component: () => import('components/views/user/EditUser.vue') },
  { path: '/usuario/cadastro',  component: () => import('components/views/user/CreateUser.vue') },

  // rotas de pessoas
  { path: '/pessoas',  component: () => import('components/views/person/ListPerson.vue') },
  { path: '/pessoa/perfil',  component: () => import('components/views/person/ProfilePerson.vue') },
  { path: '/pessoa/editar/:id',  component: () => import('components/views/person/EditPerson.vue') },
  { path: '/pessoa/cadastro',  component: () => import('components/views/person/CreatePerson.vue') },
  { path: '/pessoa/novo-contato/:id',  component: () => import('components/views/person/NewContact.vue') },
  { path: '/pessoa/editar-contato',  component: () => import('components/views/person/EditContact.vue') },

  // rota de exemplo
  { path: '/exemplo',  component: () => import('components/views/example/InfinitScroll.vue') },

  { path: '*', component: () => import('components/Error404.vue') }
]

export default [

  { path: '/', component: () => import('components/Index.vue') },
  { path: '/Login',  component: () => import('components/Login.vue') },

  //rotas de usuario
  { path: '/usuario',  component: () => import('components/views/user/List.vue') },
  { path: '/usuario/editar/:id',  component: () => import('components/views/user/Edit.vue') },
  { path: '/usuario/cadastro',  component: () => import('components/views/user/Create.vue') },

  // rota de exemplo
  { path: '/exemplo',  component: () => import('components/views/example/InfinitScroll.vue') },

  { path: '*', component: () => import('components/Error404.vue') }
]

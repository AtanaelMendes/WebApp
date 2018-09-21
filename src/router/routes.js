export default [

  { path: '/', component: () => import('components/Index.vue') },
  { path: '/Login',  component: () => import('components/Login.vue') },
  { path: '*', component: () => import('components/Error404.vue') },

  // rota de exemplo
  { path: '/exemplo',  component: () => import('components/views/example/Index.vue') }
]

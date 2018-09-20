export default [

  { path: '/', component: () => import('components/Index.vue') },
  { path: '/Login',  component: () => import('components/Login.vue') },
  { path: '*', component: () => import('components/Error404') }

]

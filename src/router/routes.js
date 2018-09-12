
const routes = [
  {
    path: '/',
    // component: () => import('layouts/AgroLayout.vue'),
    component: () => import('components/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

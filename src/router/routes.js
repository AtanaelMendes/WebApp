
const routes = [

 //  // Marca
 // { path: '/marca', component: () => import('components/views/marca/Index') },
 // { path: '/marca/create', component: () => import('components/views/marca/Create') },
 // { path: '/marca/:id', component: () => import('components/views/marca/View') },
 // { path: '/marca/:id/foto', component: () => import('components/views/marca/Photo') },
 // { path: '/marca/:id/update', component: () => import('components/views/marca/Update') },

  {
    path: '/',
    // component: () => import('layouts/AgroLayout.vue'),
    component: () => import('components/Index.vue'),
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

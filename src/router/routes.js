
const routes = [
  { path: '/', component: () => import('pages/Index.vue') },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/admin', component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Dashboard.vue')},
      { path: 'usuarios', component: () => import('pages/admin/users/UserList.vue'),
        children: [
          { name: 'view_user', path: 'view/:id', component: () => import('pages/admin/users/UserView.vue') },
          { name: 'add_user', path: 'add', component: () => import('pages/admin/users/UserAdd.vue') },
          { name: 'edit_user', path: 'edit/:id', component: () => import('pages/admin/users/UserEdit.vue') }
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

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

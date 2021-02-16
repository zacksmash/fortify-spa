import { createRouter, createWebHistory } from 'vue-router'
import AuthRoutes from '@/router/routes/auth'
import store from '@/store'
import middlewarePipeline from '@/router/middleware/pipeline'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard'),
      name: 'Dashboard',
      meta: { auth: true }
    },
    {
      path: '/user/profile',
      component: () => import(/* webpackChunkName: "userProfile" */ '@/views/profile/ShowProfile'),
      name: 'UserProfile',
      meta: { auth: true },
    },
    ...AuthRoutes,
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () =>
        import(/* webpackChunkName: "not-found" */ "../views/errors/404"),
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router

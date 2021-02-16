const AuthRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login'),
    name: 'Login',
    meta: { auth: false }
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register'),
    name: 'Register',
    meta: { auth: false }
  },
  {
    path: '/password/forgot',
    component: () => import(/* webpackChunkName: "forgotPassword" */ '@/views/auth/ForgotPassword'),
    name: 'ForgotPassword',
    meta: { auth: false }
  },
  {
    path: '/password/reset/:token',
    component: () => import(/* webpackChunkName: "resetPassword" */ '@/views/auth/ResetPassword'),
    name: 'ResetPassword',
    meta: { auth: false }
  },
  {
    path: '/verify-email',
    component: () => import(/* webpackChunkName: "verifyEmail" */ '@/views/auth/VerifyEmail'),
    name: 'VerifyEmail',
    meta: { auth: true }
  },
]

export default AuthRoutes

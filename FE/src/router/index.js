import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import MfaVerifyPage from '../views/MfaVerifyPage.vue'
import OAuthCallbackPage from '../views/OAuthCallbackPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/register', name: 'register', component: RegisterPage },
    { path: '/dashboard', name: 'dashboard', component: DashboardPage },
    { path: '/mfa/verify', name: 'mfa-verify', component: MfaVerifyPage },
    { path: '/oauth/callback', name: 'oauth-callback', component: OAuthCallbackPage },
  ],
})

export default router
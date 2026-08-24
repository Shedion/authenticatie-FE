<script setup>
import LoginForm from '../components/LoginForm.vue'
import ConnectionStatus from '../components/ConnectionStatus.vue'
import '../styles/login.css'

const backendUrl = import.meta.env.VITE_API_URL.replace(/\/api$/, '')
const githubLoginUrl = `${backendUrl}/auth/github/redirect`
</script>

<template>
  <main class="auth-page">
    <div class="auth-shell">
      <ConnectionStatus />
      <h1>Inloggen</h1>
      <LoginForm />

      <div class="oauth-divider"><span>of</span></div>
      <a :href="githubLoginUrl" class="github-btn">Inloggen met GitHub</a>

      <p>
        Nog geen account?
        <router-link :to="{ name: 'register' }">Registreren</router-link>
      </p>
    </div>
  </main>
</template>
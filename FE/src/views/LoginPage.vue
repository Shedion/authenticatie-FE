<script setup>
import LoginForm from '../components/LoginForm.vue'
import ConnectionStatus from '../components/ConnectionStatus.vue'
import '../styles/login.css'
</script>

<template>
  <main class="auth-page">
    <div class="auth-shell">
      <ConnectionStatus />
      <h1>Welkom terug</h1>
      <LoginForm />
      <p>
        Nog geen account?
        <router-link :to="{ name: 'register' }">Registreren</router-link>
      </p>
    </div>
  </main>
</template>
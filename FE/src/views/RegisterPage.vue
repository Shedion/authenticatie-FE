<script setup>
import RegisterForm from '../components/RegisterForm.vue'
import '../styles/register.css'
</script>

<template>
  <main class="auth-page">
    <div class="auth-shell">
      <h1>Account aanmaken</h1>
      <RegisterForm />
      <p>
        Heb je al een account?
        <router-link :to="{ name: 'login' }">Inloggen</router-link>
      </p>
    </div>
  </main>
</template>
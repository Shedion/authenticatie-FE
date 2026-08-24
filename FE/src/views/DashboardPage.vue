<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api, { setAuthToken } from '../api/axios'
import '../styles/dashboard.css'

const router = useRouter()
const user = ref(null)
const error = ref('')
const loggingOut = ref(false)

onMounted(async () => {
  try {
    const response = await api.get('/me')
    user.value = response.data
  } catch (err) {
    // Geen geldig token (meer) — terug naar de loginpagina
    router.push({ name: 'login' })
  }
})

async function handleLogout() {
  loggingOut.value = true
  try {
    await api.post('/logout')
  } catch (err) {
    // Zelfs als het serververzoek faalt, loggen we lokaal toch uit
  } finally {
    setAuthToken(null)
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <main class="auth-page">
    <div class="auth-shell">
      <div class="auth-card">
        <template v-if="user">
          <h1>Welkom, {{ user.name }}</h1>
          <p class="dashboard-email">{{ user.email }}</p>
          <button class="logout-btn" :disabled="loggingOut" @click="handleLogout">
            {{ loggingOut ? 'Bezig...' : 'Uitloggen' }}
          </button>
        </template>
        <template v-else>
          <p>Laden...</p>
        </template>
      </div>
    </div>
  </main>
</template>
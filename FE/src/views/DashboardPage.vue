<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api, { setAuthToken } from '../api/axios'
import MfaSetup from '../components/MfaSetup.vue'
import '../styles/dashboard.css'

const router = useRouter()
const user = ref(null)
const loggingOut = ref(false)

onMounted(async () => {
  try {
    const response = await api.get('/me')
    user.value = response.data
  } catch (err) {
    router.push({ name: 'login' })
  }
})

function handleMfaUpdated(enabled) {
  if (user.value) {
    user.value.mfa_enabled = enabled
  }
}

async function handleLogout() {
  loggingOut.value = true
  try {
    await api.post('/logout')
  } catch (err) {
    // negeren, we loggen lokaal toch uit
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

          <MfaSetup :mfa-enabled="user.mfa_enabled" @updated="handleMfaUpdated" />

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
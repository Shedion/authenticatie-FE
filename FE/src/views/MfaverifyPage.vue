<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api, { setAuthToken } from '../api/axios'
import '../styles/login.css'

const route = useRoute()
const router = useRouter()

const code = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    const response = await api.post('/mfa/verify', {
      user_id: route.query.user_id,
      code: code.value,
    })

    setAuthToken(response.data.token)
    router.push({ name: 'dashboard' })
  } catch (err) {
    if (err.response?.status === 401) {
      error.value = err.response.data.message
    } else {
      error.value = 'Er ging iets mis. Probeer het opnieuw.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <div class="auth-shell">
      <h1>Verificatiecode</h1>
      <form class="auth-card" @submit.prevent="handleSubmit">
        <div class="field-row">
          <label for="code">Code</label>
          <input id="code" v-model="code" type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code" />
        </div>
        <p v-if="error" role="alert">{{ error }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Bezig...' : 'Bevestigen' }}
        </button>
      </form>
    </div>
  </main>
</template>
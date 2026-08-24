<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api, { setAuthToken } from '../api/axios'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Vul je e-mailadres en wachtwoord in.'
    return
  }

  loading.value = true
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    })

    if (response.data.mfa_required) {
      router.push({ name: 'mfa-verify', query: { user_id: response.data.user_id } })
      return
    }

    setAuthToken(response.data.token)
    router.push({ name: 'dashboard' })
  } catch (err) {
    if (err.response?.status === 401) {
      error.value = err.response.data.message
    } else if (err.response?.status === 422) {
      error.value = 'Controleer de ingevulde gegevens.'
    } else {
      error.value = 'Er ging iets mis. Probeer het opnieuw.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="auth-card" @submit.prevent="handleSubmit">
    <div class="field-row">
      <label for="email">E-mailadres</label>
      <input id="email" v-model="email" type="email" autocomplete="email" />
    </div>

    <div class="field-row">
      <label for="password">Wachtwoord</label>
      <input id="password" v-model="password" type="password" autocomplete="current-password" />
    </div>

    <p v-if="error" role="alert">{{ error }}</p>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Bezig...' : 'Inloggen' }}
    </button>
  </form>
</template>
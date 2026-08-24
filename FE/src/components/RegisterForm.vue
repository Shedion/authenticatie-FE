<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api, { setAuthToken } from '../api/axios'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const errors = ref({})
const loading = ref(false)

async function handleSubmit() {
  errors.value = {}
  loading.value = true

  try {
    const response = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })

    setAuthToken(response.data.token)
    router.push({ name: 'dashboard' })
  } catch (err) {
    if (err.response?.status === 422) {
      errors.value = err.response.data.errors
    } else {
      errors.value = { general: ['Er ging iets mis. Probeer het opnieuw.'] }
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="auth-card" @submit.prevent="handleSubmit">
    <div class="field-row">
      <label for="name">Naam</label>
      <input id="name" v-model="name" type="text" autocomplete="name" />
    </div>
    <p v-if="errors.name" role="alert">{{ errors.name[0] }}</p>

    <div class="field-row">
      <label for="email">E-mailadres</label>
      <input id="email" v-model="email" type="email" autocomplete="email" />
    </div>
    <p v-if="errors.email" role="alert">{{ errors.email[0] }}</p>

    <div class="field-row">
      <label for="password">Wachtwoord</label>
      <input id="password" v-model="password" type="password" autocomplete="new-password" />
    </div>
    <p v-if="errors.password" role="alert">{{ errors.password[0] }}</p>

    <div class="field-row">
      <label for="password_confirmation">Herhaal</label>
      <input id="password_confirmation" v-model="passwordConfirmation" type="password" autocomplete="new-password" />
    </div>

    <p v-if="errors.general" role="alert">{{ errors.general[0] }}</p>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Bezig...' : 'Account aanmaken' }}
    </button>
  </form>
</template>
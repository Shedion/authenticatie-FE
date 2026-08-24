<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setAuthToken } from '../api/axios'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const token = route.query.token
  if (token) {
    setAuthToken(token)
    router.push({ name: 'dashboard' })
  } else {
    router.push({ name: 'login' })
  }
})
</script>

<template>
  <main class="auth-page">
    <p>Bezig met inloggen...</p>
  </main>
</template>
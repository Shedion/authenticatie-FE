<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const status = ref('checking')

onMounted(async () => {
  try {
    await api.get('/ping')
    status.value = 'connected'
  } catch (err) {
    status.value = 'disconnected'
  }
})
</script>

<template>
  <div class="connection-status" :class="status">
    <span v-if="status === 'checking'">Backend controleren...</span>
    <span v-else-if="status === 'connected'">● Verbonden met backend</span>
    <span v-else>● Niet verbonden met backend</span>
  </div>
</template>

<style scoped>
.connection-status {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  display: inline-block;
}
.connection-status.checking {
  background: #f3f4f6;
  color: #374151;
}
.connection-status.connected {
  background: #d1fae5;
  color: #065f46;
}
.connection-status.disconnected {
  background: #fee2e2;
  color: #991b1b;
}
</style>
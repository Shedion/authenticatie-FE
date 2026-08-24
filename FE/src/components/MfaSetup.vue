<script setup>
import { ref } from 'vue'
import QRCode from 'qrcode'
import api from '../api/axios'

const props = defineProps(['mfaEnabled'])
const emit = defineEmits(['updated'])

const step = ref('idle') // 'idle' | 'setup' | 'done'
const qrImage = ref('')
const code = ref('')
const error = ref('')
const loading = ref(false)

async function startSetup() {
  error.value = ''
  loading.value = true
  try {
    const response = await api.post('/mfa/enable')
    qrImage.value = await QRCode.toDataURL(response.data.qr_code_url)
    step.value = 'setup'
  } catch (err) {
    error.value = 'Kon MFA niet starten.'
  } finally {
    loading.value = false
  }
}

async function confirmCode() {
  error.value = ''
  loading.value = true
  try {
    await api.post('/mfa/confirm', { code: code.value })
    step.value = 'idle'
    code.value = ''
    qrImage.value = ''
    emit('updated', true)
  } catch (err) {
    error.value = 'Ongeldige code, probeer opnieuw.'
  } finally {
    loading.value = false
  }
}

async function disableMfa() {
  loading.value = true
  try {
    await api.post('/mfa/disable')
    emit('updated', false)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mfa-box">
    <div v-if="props.mfaEnabled">
      <p>Tweestapsverificatie staat <strong>aan</strong>.</p>
      <button @click="disableMfa" :disabled="loading">Uitschakelen</button>
    </div>

    <div v-else-if="step === 'idle'">
      <p>Tweestapsverificatie staat <strong>uit</strong>.</p>
      <button @click="startSetup" :disabled="loading">Inschakelen</button>
    </div>

    <div v-else-if="step === 'setup'">
      <p>Scan deze QR-code met je authenticator-app:</p>
      <img :src="qrImage" alt="QR-code voor MFA" width="180" height="180" />
      <label for="mfa-code">Voer de 6-cijferige code in</label>
      <input id="mfa-code" v-model="code" type="text" inputmode="numeric" maxlength="6" />
      <p v-if="error" role="alert">{{ error }}</p>
      <button @click="confirmCode" :disabled="loading">Bevestigen</button>
    </div>
  </div>
</template>
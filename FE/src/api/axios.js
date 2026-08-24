import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

// Token wordt in memory bijgehouden (niet in localStorage) en op elk
// request meegestuurd zodra iemand is ingelogd.
let token = null

export function setAuthToken(newToken) {
  token = newToken
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export default api

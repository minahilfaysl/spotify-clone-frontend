// Saved login (user + tokens) in localStorage.
// Reads never throw: a missing, "undefined" or corrupted value counts as
// logged out instead of crashing the whole app on startup.

export const readStored = (key) => {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null || raw === 'undefined' || raw === 'null') return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const saveCredentials = (user, token) => {
  if (!user || !token?.access) {
    clearCredentials()
    return
  }
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', JSON.stringify(token))
}

export const clearCredentials = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

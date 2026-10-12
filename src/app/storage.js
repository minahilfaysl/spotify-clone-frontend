// Saved login (user + tokens) in localStorage.

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

// The saved login, if it's complete (a user and an access token), else null.
export const loadCredentials = () => {
  const user = readStored('user')
  const token = readStored('token')
  return user && token?.access ? { user, token } : null
}

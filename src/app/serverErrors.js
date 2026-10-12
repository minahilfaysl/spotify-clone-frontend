// Turn an API error into one readable sentence for the user.
// Django REST Framework sends validation errors as {field: ["message", ...]}.
export const describeServerError = (err, fallback) => {
  if (!err || err.status === 'FETCH_ERROR') {
    return 'Could not reach the server. Please try again in a moment.'
  }
  const data = err.data
  if (typeof data?.detail === 'string') return data.detail
  if (data && typeof data === 'object') {
    const messages = Object.values(data).flat().filter((m) => typeof m === 'string')
    if (messages.length) return messages.join(' ')
  }
  return fallback
}

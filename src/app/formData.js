// Build multipart form data for the API, leaving out fields with no value.
// (Appending null/undefined sends the text "null"/"undefined", which Django
// rejects for file fields, e.g. a playlist created without a cover photo.)
export const toFormData = (values) => {
  const data = new FormData()
  for (const [key, value] of Object.entries(values)) {
    if (value === null || value === undefined || value === '') continue
    data.append(key, value)
  }
  return data
}

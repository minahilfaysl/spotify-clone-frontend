// The deployed API (Vercel Functions) rejects request bodies over 4.5 MB,
// so files are capped a little lower to leave room for the other form fields.
export const MAX_UPLOAD_MB = 4;
export const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

// Returns an error message if the file is too large, otherwise null.
export const uploadSizeError = (file, kind = 'File') =>
  file && file.size > MAX_UPLOAD_BYTES
    ? `${kind} is ${(file.size / 1024 / 1024).toFixed(1)} MB. Please choose one under ${MAX_UPLOAD_MB} MB.`
    : null;

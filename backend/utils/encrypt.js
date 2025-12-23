import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const iv = Buffer.alloc(16, 0)

const getKey = () => {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY not set in environment variables')
  }
  return Buffer.from(process.env.ENCRYPTION_KEY)
}

export const encrypt = (text) => {
  const key = getKey()
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export const decrypt = (encryptedText) => {
  const key = getKey()
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

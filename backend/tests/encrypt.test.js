import dotenv from 'dotenv'
dotenv.config()

import { encrypt, decrypt } from '../utils/encrypt.js'

describe('Encryption & Decryption Tests', () => {
  const aadhaar = '123456789012'

  test('should encrypt aadhaar correctly', () => {
    const encrypted = encrypt(aadhaar)
    expect(encrypted).not.toBe(aadhaar)
  })

  test('should decrypt encrypted aadhaar correctly', () => {
    const encrypted = encrypt(aadhaar)
    const decrypted = decrypt(encrypted)
    expect(decrypted).toBe(aadhaar)
  })
})

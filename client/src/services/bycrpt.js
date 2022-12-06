const CryptoJS = require('crypto-js')
export default {
  encrypt (src) {
    const passphrase = '123456'
    return CryptoJS.AES.encrypt(src, passphrase).toString()
  },
  decrypt (src) {
    const passphrase = '123456'
    const bytes = CryptoJS.AES.decrypt(src, passphrase)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  }
}

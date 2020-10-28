export const isProduction = false

const openpayCredentialsDevelop = {
  clientId: 'mdfgbgphjz1yibtuuwxx',
  key: 'sk_69eb1f5909144909b1a0db6356dfb36a'
}

const openpayCredentialsPRoduction = {
  clientId: 'mdfgbgphjz1yibtuuwxx',
  key: 'sk_69eb1f5909144909b1a0db6356dfb36a'
}

export const openPayCredentials = ENV === 'production' ? openpayCredentialsPRoduction : openpayCredentialsDevelop

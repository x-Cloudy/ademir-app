import type { AuthLoginForm, AuthToken, AuthUser } from '../types'
import { api } from 'boot/axios'
import { isValidLoginToken } from 'src/utils/auth-helper'
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from 'src/stores/authStore'
import { LocalStorage } from 'quasar'
import notify from 'src/utils/Notify'
type ResponseAuthToken = {
  token: string;
}

export class AuthService {

  async register(payload: any) {
    try {
      const response = await api.post('/user', payload);
      return response.status
    } catch (error: any) {
      return error.status
    }
  }

  async login(credentials: AuthLoginForm) {
    const url = '/login'

    try {
      const response = await api.post<ResponseAuthToken>(url, credentials);
      const data = response.data

      this.setAuth({ token: data.token })
      return response
    } catch (error: any) {
      notify({
        type: 'negative',
        msg: 'Falha no login'
      })

      return error.data
    }
  }

  setAuth(token: AuthToken) {
    const headers = (api.defaults.headers || {})

    api.defaults.headers = {
      ...headers,
      Authorization: `Bearer ${token.token}`
    } as any
  }

  async updateProfile(data: AuthUser) {
    return await api.put('/user', data)
  }

  async getUserInfo(): Promise<AuthUser> {
    const url = '/me'
    try {
      const response = await api.get<AuthUser>(url)
      return response.data
    } catch (error) {
      this.clearAuth()
      return {} as AuthUser
    }
  }

  logout() {
    this.clearAuth()
  }

  async loadAuth() {
    const localToken = LocalStorage.getItem(TOKEN_STORAGE_KEY) as AuthToken
    const localUser = LocalStorage.getItem(USER_STORAGE_KEY)

    if (!isValidLoginToken(localToken)) {
      void this.clearAuth()
      return false
    }

    void this.setAuth(localToken)
    let user: AuthUser
    const token = localToken

    if (localUser) {
      user = localUser as AuthUser
    } else {
      user = await this.getUserInfo()
    }

    return { user, token }
  }

  async sendPasswordResetEmail(email: string) {
    const url = '/api/auth/send/code'
    return await api.post(url, { email })
  }

  async confirmationCode(code: string, token: string) {
    const url = '/api/auth/verify/code'
    return await api.post(url, { code, token })
  }

  async resetPassword(password: string, token: string, code: string) {
    const url = '/api/auth/reset/password-by-token'
    return await api.post(url, { password, token, code })
  }


  clearAuth() {
    return {}
  }
}

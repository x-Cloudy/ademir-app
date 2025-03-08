import { defineStore, acceptHMRUpdate } from 'pinia';
import type { AuthLoginForm, AuthToken, AuthUser, Role, UpdateAuthUser } from '../types'
import { AuthService } from '../services/auth.service'
import type { AxiosResponse } from 'axios';
import { api } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'

const authService = new AuthService()

export const TOKEN_STORAGE_KEY = 'token_services'
export const USER_STORAGE_KEY = 'user_services'
export const USER_TOKEN_RECOVERY_PASSWORD_KEY = 'user_token_recovery_password'
export const USER_CODE_RECOVERY_PASSWORD_KEY = 'user_code_recovery_password'
export const USER_EMAIL_RECOVERY_PASSWORD_KEY = 'user_email_recovery_password'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as AuthUser,
    token: {} as AuthToken,
    loading: false,
    emailsSent: false,
    successUpdatePassword: false,
    failUserPassword: false
  }),

  getters: {
    isLogged(): boolean {
      return !!this.user.id && !!this.token.token
    },

    getUser(): AuthUser {
      return this.user
    },

    roles(): Role[] {
      return this.user.roles ?? []
    },
    user_full_name(): string {
      return `${this.user.name} ${this.user.last_name}`
    }
  },

  actions: {
    async register(form: any) {
      const response = await authService.register(form)
      console.log('response store', response)
    },

    async login(data: AuthLoginForm): Promise<number> {
      this.loading = true
      this.failUserPassword = false
      try {
        const result = await authService.login(data);
        const payload = result.data
        const token = { token: payload.token }

        this.token = token
        LocalStorage.set(TOKEN_STORAGE_KEY, this.token)
        await this.getUserInfo()

        this.loading = false

        return result.status
      } catch (error) {
        this.failUserPassword = true
        this.loading = false
        return (error as AxiosResponse).status
      }
    },

    async auth(data: {
      access_token: string
      token_type: string
    }) {
      const payload = data
      const token = { token: payload.access_token, type: payload.token_type }
      authService.setAuth({ token: data.access_token })
      this.token = token
      LocalStorage.set(TOKEN_STORAGE_KEY, this.token)
      await this.getUserInfo()
    },

    async logout() {
      this.clearAuth()
      await authService.logout()
    },

    async me(): Promise<void> {
      authService.setAuth(this.token)
      this.user = await authService.getUserInfo()
      LocalStorage.set(USER_STORAGE_KEY, this.user)
      LocalStorage.set(TOKEN_STORAGE_KEY, this.token)
    },

    async getUserInfo(): Promise<void> {
      // if (!this.token) return
      // if (this.user && this.user.id) return

      const result = await authService.getUserInfo();
      this.user = result
      LocalStorage.set(USER_STORAGE_KEY, this.user)

      if (!result.id) {
        this.clearAuth()
      }
    },

    async loadAuth() {
      const data = await authService.loadAuth()

      if (data === false) return this.clearAuth()

      this.user = data.user
      this.token = data.token
    },

    async updateProfile(data: UpdateAuthUser): Promise<void> {
      authService.setAuth(this.token)
      await authService.updateProfile(data).then(() => {
        Notify.create({
          message: 'Perfil atualizado com sucesso',
          color: 'positive'
        })
      }).catch((error: any) => {

        let errorMessage = 'Erro ao atualizar perfil.'
        if (error.response?.data?.message) {
          errorMessage = error.response?.data?.message
        }

        if (error.response?.data?.error) {
          errorMessage = error.response?.data?.error
        }

        Notify.create({
          message: errorMessage,
          color: 'negative'
        })
      })
    },

    async sendPasswordResetEmail(email: string): Promise<void> {
      if (!email) return
      this.loading = true
      this.emailsSent = false

      await authService.sendPasswordResetEmail(email).then(({ data }) => {
        if (data?.token) {

          LocalStorage.set(USER_EMAIL_RECOVERY_PASSWORD_KEY, email)
          LocalStorage.set(USER_TOKEN_RECOVERY_PASSWORD_KEY, data?.token)
          // sessionStorage.setItem(TOKEN_STORAGE_KEY, data?.token)
          // sessionStorage.setItem(USER_TOKEN_RECOVERY_PASSWORD_KEY, email)
        }
        this.emailsSent = true

        if (data?.message) {
          Notify.create({
            message: data.message as string,
            color: 'success'
          })
        }

      })
        .catch((data: any) => {
          this.emailsSent = false

          if (data.response?.data?.message) {
            Notify.create({
              message: data.response?.data?.message as string,
              color: 'negative'
            })
          }

        })
        .finally(() => {
          this.loading = false
        })
    },

    async confirmationCode(code: string): Promise<void> {
      this.loading = true
      await authService.confirmationCode(code, LocalStorage.getItem(USER_TOKEN_RECOVERY_PASSWORD_KEY) as string).then(() => {
        LocalStorage.set(USER_CODE_RECOVERY_PASSWORD_KEY, code)
      }).catch((data: any) => {
        if (data.response?.data?.message) {
          Notify.create({
            message: data.response?.data?.message as string,
            color: 'negative'
          })
        }

      }).finally(() => {
        this.loading = false
      })
    },

    async resetPassword(password: string, token: string, code: string): Promise<void> {
      this.loading = true
      await authService.resetPassword(password, token, code).then(({ data }) => {
        this.successUpdatePassword = true
        if (data?.message) {
          Notify.create({
            message: data.message as string,
            color: 'success'
          })
        }

      }).catch((data: any) => {
        this.successUpdatePassword = false

        if (data.response?.data?.message) {
          Notify.create({
            message: data.response?.data?.message as string,
            color: 'negative'
          })
        }

      }).finally(() => {
        this.loading = false
      })
    },

    clearAuth() {
      LocalStorage.remove(TOKEN_STORAGE_KEY)
      LocalStorage.remove(USER_STORAGE_KEY)
      // LocalStorage.remove(USER_TOKEN_RECOVERY_PASSWORD_KEY)
      // LocalStorage.remove(USER_CODE_RECOVERY_PASSWORD_KEY)
      // LocalStorage.remove(USER_EMAIL_RECOVERY_PASSWORD_KEY)
      api.defaults.headers = authService.clearAuth() as any
      this.token = authService.clearAuth() as AuthToken
      this.user = {} as AuthUser
    },

    resetRecoveryPassword() {
      LocalStorage.remove(USER_TOKEN_RECOVERY_PASSWORD_KEY)
      LocalStorage.remove(USER_CODE_RECOVERY_PASSWORD_KEY)
      LocalStorage.remove(USER_EMAIL_RECOVERY_PASSWORD_KEY)
    },

    setToken(token: AuthToken) {
      this.token = token
      LocalStorage.set(TOKEN_STORAGE_KEY, this.token)
    },

    loadFromStorage() {

      if (!this.user) {
        this.token = LocalStorage.getItem(TOKEN_STORAGE_KEY) as AuthToken
      }

      if (!this.user) {
        this.user = LocalStorage.getItem(USER_STORAGE_KEY) as AuthUser
      }
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

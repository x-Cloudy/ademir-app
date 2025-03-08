export const roles = ['admin', 'company', 'colaborator'] as const

export type Role = typeof roles[number]

export interface AuthUser {
  id: number
  name: string
  last_name: string
  email: string
  avatar?: string
  avatar_url?: string
  roles?: Role[]
  collaborator_id?: number,
  client?: AuthClient
}

export interface UpdateAuthUser extends AuthUser {
  password?: string,
  password_confirmation?: string
}

export type AuthToken = {
  token: string
}

export type AuthLoginForm = {
  email: string
  password: string
}

export type LocalStorage = {
  token: AuthToken
  user: AuthUser
  tenant?: number
}

export type AuthClient = {
  id?: number
  birthday: string
  birth_city: string
  residence_city: string
  cpf: string
  phone: string
}

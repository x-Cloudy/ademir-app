type Roles = 'invistribe' | 'Cripto'


export interface UserRequest {
  name: string;
  email: string;
  password: string;
  wallet: string;
  whatsapp: string;
  indication?: string;
  roles: Roles[];
  code: string;
}
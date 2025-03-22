import type { AxiosInstance } from "axios";
import { api } from "src/boot/axios";

class PasswordRecovery {
  public api: AxiosInstance = api;
  private reset_route = "/password-reset";
  private verify_code_route = "/verify-code";
  private change_password_route = "/change-password";


  public async send_email_reset(payload: { email: string }): Promise<any> {
    return await this.handle_error(() =>
      api.post(this.reset_route, payload)
    );
  }

  public async verify_email_code(
    payload: { email: string, code: string }
  ): Promise<any> {
    return await this.handle_error(() =>
      api.post(this.verify_code_route, payload)
    );
  }

  public async change_password(
    payload: { userId: string, password: string }
  ): Promise<any> {
    return await this.handle_error(() =>
      api.post(this.change_password_route, payload)
    );
  }

  private async handle_error(callback: () => Promise<any>): Promise<any> {
    try {
      const responsne = await callback()
      return responsne
    } catch (error) {
      return error
    }
  }

}

const passwordService = new PasswordRecovery();

export default passwordService;

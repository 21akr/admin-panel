import joi from 'joi';

export class LoginParams {
  email?: string;
  password?: string;

  constructor(params: LoginParams) {
    this.email = params.email;
    this.password = params.password;
  }

  async validate() {
    return await LoginParamsSchema.validateAsync(this);
  }
}

export const LoginParamsSchema = joi.object<LoginParams>({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
});

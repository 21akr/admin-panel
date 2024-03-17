import joi from 'joi';

export class ResetPasswordParams {
  email?: string;

  constructor(params: ResetPasswordParams) {
    this.email = params.email;
  }

  async validate() {
    return await ResetPasswordParamsSchema.validateAsync(this);
  }
}

export const ResetPasswordParamsSchema = joi.object<ResetPasswordParams>({
  email: joi.string().trim().email().required(),
});

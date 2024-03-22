import joi from 'joi';

export class ChangePasswordParams {
  currentPassword?: string;
  newPassword?: string;

  constructor(params: ChangePasswordParams) {
    this.currentPassword = params.currentPassword;
    this.newPassword = params.newPassword;
  }

  async validate() {
    return await ChangePasswordParamsSchema.validateAsync(this);
  }
}

export const ChangePasswordParamsSchema = joi.object<ChangePasswordParams>({
  currentPassword: joi.string().trim().required(),
  newPassword: joi.string().trim().required(),
});

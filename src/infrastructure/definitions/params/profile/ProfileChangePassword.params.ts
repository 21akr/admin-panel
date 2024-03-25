import joi from 'joi';

export class ProfileChangePasswordParams {
  currentPassword?: string;
  newPassword?: string;

  constructor(params: ProfileChangePasswordParams) {
    this.currentPassword = params.currentPassword;
    this.newPassword = params.newPassword;
  }

  async validate() {
    return await ProfileChangePasswordParamsSchema.validateAsync(this);
  }
}

export const ProfileChangePasswordParamsSchema = joi.object<ProfileChangePasswordParams>({
  currentPassword: joi.string().trim().required(),
  newPassword: joi.string().trim().required(),
});

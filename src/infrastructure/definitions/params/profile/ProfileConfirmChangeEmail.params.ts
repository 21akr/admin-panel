import joi from 'joi';

export class ProfileConfirmChangeEmailParams {
  confirmationCode?: number;

  constructor(params: ProfileConfirmChangeEmailParams) {
    this.confirmationCode = params.confirmationCode;
  }

  async validate() {
    return await ProfileConfirmChangeEmailParamsSchema.validateAsync(this);
  }
}

export const ProfileConfirmChangeEmailParamsSchema = joi.object<ProfileConfirmChangeEmailParams>({
  confirmationCode: joi.number().min(6).required(),
});

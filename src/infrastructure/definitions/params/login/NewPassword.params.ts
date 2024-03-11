import joi from "joi";

export class NewPasswordParams {
  currentPassword?: string;
  newPassword?: string;

  constructor(params: NewPasswordParams) {
    this.currentPassword = params.currentPassword;
    this.newPassword = params.newPassword;
  }

  async validate() {
    return await NewPasswordParamsSchema.validateAsync(this);
  }
}

export const NewPasswordParamsSchema = joi.object<NewPasswordParams>({
  currentPassword: joi.string().trim().required(),
  newPassword: joi.string().trim().required(),
});

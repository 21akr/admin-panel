import joi from 'joi';

export class ProfileLoginParams {
  email?: string;
  password?: string;

  constructor(params: ProfileLoginParams) {
    this.email = params.email;
    this.password = params.password;
  }

  async validate() {
    return await ProfileLoginParamsSchema.validateAsync(this);
  }
}

export const ProfileLoginParamsSchema = joi.object<ProfileLoginParams>({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().required(),
});

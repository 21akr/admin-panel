import joi from 'joi';

export class BaseEmailParams {
  email?: string;

  constructor(params: BaseEmailParams) {
    this.email = params.email;
  }

  async validate() {
    return await BaseEmailParamsSchema.validateAsync(this);
  }
}

export const BaseEmailParamsSchema = joi.object<BaseEmailParams>({
  email: joi.string().trim().email().required(),
});

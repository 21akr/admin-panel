import joi from 'joi';

export class BaseIDParams {
  ID?: string;

  constructor(params: any) {
    if (params) {
      this.ID = params.id;
    }
  }

  async validate() {
    return await BaseIDParamsSchema.validateAsync(this);
  }
}

export const BaseIDParamsSchema = joi.object<BaseIDParams>({
  ID: joi.string().trim().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
});

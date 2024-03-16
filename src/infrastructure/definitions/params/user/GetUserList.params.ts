import joi from 'joi';

export class GetUserListParams {
  search?: string;

  constructor(params) {
    this.search = params.search;
  }

  async validate() {
    return await GetUserListParamsSchema.validateAsync(this);
  }
}

export const GetUserListParamsSchema = joi.object<GetUserListParams>({
  search: joi.string(),
});

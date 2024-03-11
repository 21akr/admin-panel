import joi from "joi";

export class CreateUserParams {
  fullName?: string;
  email?: string;

  constructor(params: CreateUserParams) {
    this.fullName = params.fullName;
    this.email = params.email;
  }

  async validate() {
    return await CreateUserParamsSchema.validateAsync(this);
  }
}

export const CreateUserParamsSchema = joi.object<CreateUserParams>({
  fullName: joi.string().trim().required(),
  email: joi.string().trim().required(),
});

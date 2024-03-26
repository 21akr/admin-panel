import joi from 'joi';
import { UpdateUserParams } from './UpdateUser.params';

export class CreateUserParams extends UpdateUserParams {
  email?: string;

  constructor(params: CreateUserParams) {
    super(params);
    this.email = params.email;
  }

  async validate() {
    return await CreateUserParamsSchema.validateAsync(this);
  }
}

export const CreateUserParamsSchema = joi.object<CreateUserParams>({
  email: joi.string().trim().required(),
});

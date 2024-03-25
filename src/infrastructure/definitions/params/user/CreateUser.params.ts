import joi from 'joi';
import { UserRoleEnum } from '../../../enums';

export class CreateUserParams {
  fullName?: string;
  email?: string;
  userRole?: UserRoleEnum;

  constructor(params: CreateUserParams) {
    this.fullName = params.fullName;
    this.email = params.email;
    this.userRole = params.userRole;
  }

  async validate() {
    return await CreateUserParamsSchema.validateAsync(this);
  }
}

export const CreateUserParamsSchema = joi.object<CreateUserParams>({
  fullName: joi.string().trim().required(),
  email: joi.string().trim().required(),
  userRole: joi
    .string()
    .valid(...Object.values(UserRoleEnum))
    .required(),
});

import joi from 'joi';
import { UserRoleEnum } from '../../../enums';

export class UpdateUserParams {
  fullName?: string;
  userRole?: UserRoleEnum;

  constructor(params: UpdateUserParams) {
    this.fullName = params.fullName;
    this.userRole = params.userRole;
  }

  async validate() {
    return await UpdateUserParamsSchema.validateAsync(this);
  }
}

export const UpdateUserParamsSchema = joi.object<UpdateUserParams>({
  fullName: joi.string().trim(),
  userRole: joi.string().valid(...Object.values(UserRoleEnum)),
});

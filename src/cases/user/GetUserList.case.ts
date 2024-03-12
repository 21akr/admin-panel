import { Repository, UserEntity } from '../../database';
import { BaseCaseInterface, BaseCaseParamsInterface, BaseListInterface, ListParams } from '../../infrastructure';

export class GetUserListCase implements BaseCaseInterface<ListParams, BaseListInterface<any>> {
  async execute(params: BaseCaseParamsInterface<ListParams>): Promise<BaseListInterface<any>> {
    const data: BaseListInterface<any> = {
      items: [],
      meta: {
        count: 0,
      },
    };

    data.meta.count = await Repository.User().countDocumentsByFilter(params.filter);
    data.items = await Repository.User().list(params.filter);
    return data;
  }
}

export const getUserListCase: BaseCaseInterface<ListParams, BaseListInterface<UserEntity>> = new GetUserListCase();

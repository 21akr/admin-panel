interface BaseRequestInterface {
  refId?: string;
  client?: any;
  baseLang?: 'en';
}

export type BaseCaseParamsInterface<T> = T & BaseRequestInterface;

export interface BaseCaseInterface<IRequest, IResponse> {
  execute(request?: BaseCaseParamsInterface<IRequest>): Promise<IResponse>;
}

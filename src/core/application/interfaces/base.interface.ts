export interface BaseUseCase {
  execute(id?: any, obj?: Object): Promise<any>;
}

export interface IUseCasesMethods {
  useCaseList: BaseUseCase;
  useCaseDelete: BaseUseCase;
  useCaseCreate: BaseUseCase;
  useCaseUpdate: BaseUseCase;
  useCaseGet: BaseUseCase;
}

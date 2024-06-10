import DTO from "./vacation-dto";

export type GetAllParams = {
  page?: number;
  userId?: string;

  // filters
  onlyUser?: boolean;
  notStarted?: boolean;
  onlyActive?: boolean;
};

export default interface Model {
  getAll(
    params?: GetAllParams
  ): Promise<{ vacations: DTO[]; total: number; limit: number }>;
  getOne(id: string): Promise<DTO>;
  // add(vacation: DTO): Promise<DTO>;
  add(vacation: DTO): Promise<DTO>;
  update(vacation: DTO): Promise<DTO>;
  // update(id: string, vacation: DTO): Promise<DTO>;
  delete(id: string): Promise<boolean>;
  count(vacation: DTO): Promise<DTO>;
  graph(params?: GetAllParams): Promise<DTO>;
}

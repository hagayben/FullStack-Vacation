import DTO from "./dto";

export default interface Model {
  getOne(userId: string): Promise<DTO>;
  follow(follow: DTO): Promise<DTO>;
  unfollow(userId: string, vacationId: string): Promise<boolean>;
}

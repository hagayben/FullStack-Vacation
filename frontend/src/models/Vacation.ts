class Vacation {
  public id?: string;
  public destination?: string;
  public description?: string;
  public startDate?: Date|string
  public endDate?: Date|string;
  public price?: string;
  public imageName?: string;
  public image?: File;
  public isFollowing?: number;
  public amountOfFollowers?: number;
}
export default Vacation;

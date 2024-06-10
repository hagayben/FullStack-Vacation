import Model from "./model";
import DTO from "./dto";
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import config from "config";
import { hashPassword } from "../../utils/crypto";
import mysql from "mysql2";

class Follow implements Model {
  public async getOne(userId: string): Promise<DTO> {
    const follow = await query(
      `
        SELECT userId,
              vacationId
        FROM followers
            WHERE   userId = ?
        `,
      [userId]
    );
    return follow[0];
  }

  public async follow(follow: DTO): Promise<DTO> {
    const { userId, vacationId } = follow;

    const result = await query(
      `
            INSERT INTO followers
            (userId, vacationId) 
            VALUES(?,?);
        `,
      [userId, vacationId]
    );

    return this.getOne(userId);
  }
  public async unfollow(userId: string, vacationId: string): Promise<boolean> {
    const result: OkPacketParams = await query(
      `
            DELETE FROM followers
            WHERE  userId = ? and vacationId = ?
        `,
      [userId, vacationId]
    );
    return Boolean(result.affectedRows);
  }
}

const follow = new Follow();
export default follow;

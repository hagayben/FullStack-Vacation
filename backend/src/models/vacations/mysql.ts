import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import Model, { GetAllParams } from "./model";
import DTO from "./vacation-dto";
import { v4 as uuidv4 } from "uuid";

// [1,2,3,4,5,6,7,8,9]
// limit 2
// page 0

// 0     1     2
// [1,2] [3,4] [5,6]

// /vacation?page=4
const LIMIT = 10;

class vacation implements Model {
  public async getAll(
    params?: GetAllParams
  ): Promise<{ vacations: DTO[]; total: number; limit: number }> {
    let sql = `
    SELECT id,
          destination,
          description,
          startDate,
          endDate,
          price, 
          imageName,
          CASE WHEN (followers.userId = '${params.userId}') THEN 1 ELSE 0 END AS isFollowing,
          COUNT(followers.vacationId) as amountOfFollowers
    FROM vacations
    LEFT JOIN followers ON followers.vacationId = vacations.id
    `;

    const where = [];
    if (params.onlyUser) {
      where.push(`followers.userId = '${params.userId}'`);
    }
    if (params.notStarted) {
      where.push(`startDate>now()`);
    }
    if (params.onlyActive) {
      where.push(`((startDate < now()) and (now() < endDate))`);
    }
    if (where.length > 0) {
      sql += `where ${where.join(" and ")}\n`;
    }

    sql += "GROUP BY vacations.id order by startDate asc\n";

    const allVacations = await query(sql);

    if ("page" in params) {
      sql += `limit ${LIMIT} offset ${LIMIT * params.page}`;
    }

    const vacations = await query(sql);
    return {
      vacations,
      total: allVacations.length,
      limit: LIMIT,
    };
  }

  public async getOne(id: string): Promise<DTO> {
    const vacations = await query(
      `
        SELECT id,
              destination,
              description,
              startDate,
              endDate,
              price, 
              imageName
        FROM vacations
            WHERE   id = ?
        `,
      [id]
    );
    return vacations[0];
  }

  public async add(vacation: DTO): Promise<DTO> {
    const { destination, description, startDate, endDate, price, imageName } =
      vacation;
    const id = uuidv4();
    const result = await query(
      `
            INSERT INTO vacations
            (id, destination, description, startDate, endDate, price, imageName) 
            VALUES(?,?,?,?,?,?,?);
        `,
      [id, destination, description, startDate, endDate, price, imageName]
    );

    return this.getOne(result.insertId);
  }

 
  public async update(vacation: DTO): Promise<DTO> {

        const originalVacation = await this.getOne(vacation.id);

    // merge with new values
    const newVacation = {
      ...originalVacation,
      ...vacation,
    };

    const {
      id,
      destination,
      description,
      startDate,
      endDate,
      price,
      imageName,
    } = newVacation;
    await query(
      `
            UPDATE  vacations
            SET     destination=?,
                    description=?,
                    startDate=?,
                    endDate=?,
                    price=?,
                    imageName=?
            WHERE   id = ?
        `,
      [destination, description, startDate, endDate, price, imageName, id]
    );
    return this.getOne(id);
  }

  public async delete(id: string): Promise<boolean> {
    const result: OkPacketParams = await query(
      `
            DELETE FROM vacations
            WHERE       id = ?
        `,
      [id]
    );
    return Boolean(result.affectedRows);
  }

  public async count(vacation: DTO): Promise<DTO> {
    const vacations = await query(`
    SELECT * ,
     COUNT(followers.vacationId)
    FROM vacations
    LEFT JOIN followers ON vacationId= vacations.id
    GROUP BY followers.vacationId;
    `);
    return vacations;
  }

  public async graph(): Promise<DTO> {
    const vacations = await query(`
    SELECT vacations.destination,
     COUNT(followers.vacationId) as amount
    FROM vacations
    LEFT JOIN followers ON vacationId= vacations.id
    GROUP BY followers.vacationId
    HAVING COUNT(followers.vacationId) > 0
    `);
    return vacations;
  }
}

const vacations = new vacation();
export default vacations;

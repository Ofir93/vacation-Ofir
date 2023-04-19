import db from '../db.js'

export default class Follow {
  constructor(userId, vacId) {
    this.userId = userId
    this.vacId = vacId
  }

 static async updateFollow() {
    const query = `UPDATE tripping.vacations AS v1,
    (SELECT vacation, COUNT(vacation) AS v2
    FROM likes
    GROUP BY vacation) v3
    SET v1.followers = v3.v2
    WHERE v1.id = v3.vacation;`
    return db.execute(query)
  }

  static async removeFollow(vacId){
    const query = `UPDATE tripping.vacations 
    SET followers = followers - 1 
    WHERE id = ${vacId};`
    return db.execute(query)
  }

  static async find(userId, vacId) {
    const query = `
    select * from likes where user = ${userId} ${vacId !== "0" ? `and vacation = ${vacId}` : ''}`

    return db.execute(query)
  }

  async addFollow() {
    const query = `insert into likes(user, vacation)
    value (${this.userId} ,${this.vacId})
    `
    return db.execute(query)
  }

  static async delete(userId, vacId) {
    const query = `
    delete from likes
    where user = ${userId} and vacation = ${vacId}
    `

    return await db.execute(query)
  }
}

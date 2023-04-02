import db from '../db.js'

export default class Follow {
  constructor(userId, vacId) {
    this.userId = userId
    this.vacId = vacId
  }

 static async userNameToId(userName){
    const query = `
    select id from users where user_name = '${userName}'`
    return db.execute(query)
  }

  static async find(userId, vacId) {
    const query = `
    select * from likes where ${
        userId ? `user = ${userId}` : `vacation = ${vacId}`
    } 
`
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

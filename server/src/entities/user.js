import db from '../db.js'

export default class User {
    constructor(id, firstName, lastName, userName, password) {
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.userName = userName,
        this.password = password
      }
    
  static async find(id){
    const query = `
        select * from users ${id ? `where id = ${id}` : ''}
    `
    return db.execute(query)
  }

  async update(id){
    const setStatement = `
        ${this.firstName ? `first_name = '${this.firstName}',` : ''}
        ${this.lastName ? `last_name = '${this.lastName}',` : ''}
        ${this.userName ? `user_name = '${this.userName}',` : ''}
        ${this.password ? `password = '${this.password}'` : ''}
    `
    .trim().replace(/,$/, '')

    const query = `update users set
    ${setStatement}
    where id = ${id}`

    return await db.execute(query)
  }

  static async delete(id){
    const query = `
    delete from users
    where id = ${id}
    `

    return await db.execute(query)
  }
}
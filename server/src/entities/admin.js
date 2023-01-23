import db from '../db'
import User from './user'

export default class Admin extends User {
  constructor(id, userName, password, isAdmin) {
    super(id, userName, password)
    this.isAdmin = isAdmin
  }


  async save(desc, destination, photo, dates, price){
    const query = `
        insert into vacations(description, destination, photo, dates, price)
        value ('${desc}', '${destination}', '${photo}', '${dates}', ${price})
    `

    return await db.execute(query)
  }

  async update(id){
    const setStatement = `
        ${this.firstName ? `first_name = '${this.firstName}',` : ''}
        ${this.lastName ? `last_name = '${this.lastName}',` : ''}
        ${this.email ? `email = '${this.email}',` : ''}
        ${this.points ? `points = '${this.points}'` : ''}
    `
    .trim().replace(/,$/, '')

    const query = `update vacations set
    ${setStatement}
    where id = ${id}`

    return await db.execute(query)
  }

  static async delete(id){
    const query = `
    delete from vacations
    where id = ${id}
    `

    return await db.execute(query)
  }
}
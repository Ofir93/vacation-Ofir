import db from '../db.js'

export default class User {
  constructor(id, userName, password, firstName, lastName) {
    this.id = id,
      this.userName = userName,
      this.firstName = firstName,
      this.lastName = lastName,
      this.password = password,
      this.role = 'user'
  }

  async exists(userName){
    const users = await db.execute(`select user_name from users`)
    // console.log(users[0].includes({"user_name": userName}));
    // console.log(users[0]);
    // console.log(userName);
    // const result = users[0].map((user) => {
    //   user === {"user_name": userName}
    //   return false
    // })
    const result = users[0].filter(word => word.user_name === userName)
    // console.log(result);
    if(result.length > 0){
      return undefined
    }
    return true
  }

  async find(id) {
    const query = `
    select * from users where id = ${id}
`
    return db.execute(query)
  }

  async registerUser() {
    const users = await db.execute(`select id from users`)
    const highestId = users[0].length + 1
    // console.log(users[0].length)
    const query = `insert into users(id, first_name, last_name, user_name, password)
    value (${highestId} ,'${this.firstName}', '${this.lastName}', '${this.userName}','${this.password}')
    `
    return db.execute(query)
  }

  async update(id) {
    const setStatement = `
        ${this.firstName ? `first_name = '${this.firstName}',` : ''}
        ${this.lastName ? `last_name = '${this.lastName}',` : ''}
        ${this.userName ? `user_name = '${this.userName}',` : ''}
        ${this.password ? `password = '${this.password}'` : ''}
    `
      .trim()
      .replace(/,$/, '')

    const query = `update users set
    ${setStatement}
    where id = ${id}`

    return await db.execute(query)
  }

  static async delete(id) {
    const query = `
    delete from users
    where id = ${id}
    `

    return await db.execute(query)
  }
}

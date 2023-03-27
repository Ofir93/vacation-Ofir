import db from '../db.js'

export default class Vacation {
  constructor(id, desc, destination, photo, dateStart, dateEnd, price, followers) {
      this.id = id
      this.desc = desc,
      this.destination = destination,
      this.photo = photo,
      this.dateStart  = dateStart,
      this.dateEnd  = dateEnd,
    this.price = price,
    this.followers = followers
  }

  async save() {
    // console.log('onSave');
    const query = `
        insert into vacations(id, description, destination, photo, date_start, date_end, price)
        value (${this.id}, '${this.desc}', '${this.destination}', '${this.photo}', '${this.dateStart}', '${this.dateEnd}', ${this.price})
    `

    return await db.execute(query)
  }

  async exists(vacName){
    const users = await db.execute(`select description from vacations`)
    // console.log(users[0].includes({"user_name": userName}));
    // console.log(users[0]);
    // console.log(userName);
    // const result = users[0].map((user) => {
    //   user === {"user_name": userName}
    //   return false
    // })
    const result = users[0].filter(word => word.description === vacName)
    // console.log(result);
    if(result.length > 0){
      return undefined
    }
    return true
  }


  static async find(id) {
    const query = `
        select * from vacations ${id ? `where id = ${id}` : ''}
    `
    return db.execute(query)
  }

  // async update(id) {
  //   const setStatement = `
  //       ${this.desc ? `description = '${this.desc}',` : ''}
  //       ${this.destination ? `destination = '${this.destination}',` : ''}
  //       ${this.photo ? `photo = '${this.photo}',` : ''}
  //       ${this.dateStart ? `date_start = '${this.dateStart}'` : ''}
  //       ${this.dateEnd ? `date_end = '${this.dateEnd}'` : ''}
  //       ${this.price ? `price = '${this.price}'` : ''}
  //       ${this.followers ? `followers = '${this.followers}'` : ''}
  //   `
  //     .trim()
  //     .replace(/,$/, '')

  //   const query = `update vacations set
  //   ${setStatement}
  //   where id = ${id}`

  //   return await db.execute(query)
  // }

  static async delete(id) {
    const query = `
    delete from vacations
    where id = ${id}
    `

    return await db.execute(query)
  }
}

import db from '../db'

export default class Vacation {
  constructor(vacationId, desc, destination, photo, dateStart, dateEnd, price, folowers) {
    this.vacationId = vacationId,
      this.desc = desc,
      this.destination = destination,
      this.photo = photo,
      this.dateStart  = dateStart,
      this.dateEnd  = dateEnd,
    this.price = price,
    this.folowers = folowers
  }

  // async save() {
  //   const query = `
  //       insert into vacations(description, destination, photo, date_start, date_end, price, followers)
  //       value ('${this.desc}', '${this.destination}', '${this.photo}', '${this.dateStart}', '${this.dateEnd}', ${this.price}, '${this.followers}')
  //   `

  //   return await db.execute(query)
  // }

  // static async find(id) {
  //   const query = `
  //       select * from vacations ${id ? `where id = ${id}` : ''}
  //   `
  //   return db.execute(query)
  // }

  // async update(id) {
  //   const setStatement = `
  //       ${this.desc ? `description = '${this.desc}',` : ''}
  //       ${this.destination ? `destination = '${this.destination}',` : ''}
  //       ${this.photo ? `photo = '${this.photo}',` : ''}
  //       ${this.dateStart ? `date_start = '${this.dateStart}'` : ''}
  //       ${this.dateEnd ? `date_end = '${this.dateEnd}'` : ''}
  //       ${this.price ? `price = '${this.price}'` : ''}
  //       ${this.folowers ? `folowers = '${this.folowers}'` : ''}
  //   `
  //     .trim()
  //     .replace(/,$/, '')

  //   const query = `update vacations set
  //   ${setStatement}
  //   where id = ${id}`

  //   return await db.execute(query)
  // }

  // static async delete(id) {
  //   const query = `
  //   delete from vacations
  //   where id = ${id}
  //   `

  //   return await db.execute(query)
  // }
}

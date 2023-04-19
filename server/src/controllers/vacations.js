import vacationModel from '../entities/vacation.js'

export const save = async (data) => {
  try {
    const { desc, destination, photo, dateStart, dateEnd, price, followers } =
      data

    const vacation = new vacationModel(
      desc,
      destination,
      photo,
      dateStart,
      dateEnd,
      price,
      followers
    )

    const existing = await vacation.exists(destination)
    if (existing === undefined) {
      return 'vacation name already exists'
    }
    const [res] = await vacation.save()
    return res.affectedRows ? 'Inserted successfully' : 'Nothing inserted'
  } catch (error) {
    console.log(error)
    console.log(data)
    return 'Nothing inserted'
  }
}

export const find = async (id) => {
  try {
    const [vacation] = await vacationModel.find(id)
    return vacation
  } catch (error) {
    console.log(error)
    return null
  }
}

export const update = async (id, data) => {
  const { desc, destination, photo, dateStart, dateEnd, price, followers } =
    data
  if (
    id === undefined &&
    desc === undefined &&
    destination === undefined &&
    photo === undefined &&
    dateStart === undefined &&
    dateEnd === undefined &&
    price === undefined
  )
    return false

  const vacation = new vacationModel(
    desc,
    destination,
    photo,
    dateStart,
    dateEnd,
    price,
    followers
  )

  const [res] = await vacation.update(id)
  return res.affectedRows ? true : false
}

export const deleteById = async (id) => {
  const [res] = await vacationModel.delete(id)
  await vacationModel.deleteFollow(id)
  return res.affectedRows ? true : false
}

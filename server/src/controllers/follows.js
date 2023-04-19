import followModel from '../entities/follow.js'

export const save = async (data) => {
  try {
    const { userId, vacId } = data
    const follow = new followModel(userId, vacId)
    const [res] = await follow.addFollow()
    return res.affectedRows ? (res.insertId = true) : null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateFollow = async () => {
  try {
    const hasUpdated = await followModel.updateFollow()
    return hasUpdated.affectedRows ? (hasUpdated.insertId = true) : null
  } catch (error) {
    console.log(error)
  }
}

export const removeFollow = async (vacId) => {
  try {
    const hasUpdated = await followModel.removeFollow(vacId)
    return hasUpdated.affectedRows ? (hasUpdated.insertId = true) : null
  } catch (error) {
    console.log(error)
  }
}

export const find = async (userId, vacId) => {
  try {
    const [follow] = await followModel.find(userId, vacId)
    return follow
  } catch (error) {
    console.log(error)
  }
}

export const deleteById = async (userId, vacId) => {
  const [res] = await followModel.delete(userId, vacId)
  return res.affectedRows ? true : false
}

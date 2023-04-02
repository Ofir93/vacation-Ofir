import followModel from '../entities/follow.js'


export const save = async (data) => {
    try {
        const {userId, VacId} = data
        const follow = new followModel(userId, VacId)
        const [ res ] = await follow.registerUser()
        return res.affectedRows ? res.insertId = true : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const find = async (userName, vacId) => {
    try {

        const [userId] = await followModel.userNameToId(userName)

        const [follow] = await followModel.find(userId[0].id, vacId)

        return follow
    
    } catch (error) {
        console.log(error);
    }
}


export const deleteById = async (userId, vacId) => {
    const [res] = await followModel.delete(userId, vacId)
    return res.affectedRows ? true : false
}
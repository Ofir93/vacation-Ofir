import followModel from '../entities/follow.js'


export const save = async (data) => {
    try {
        const {userId, vacId} = data
        const follow = new followModel(userId, vacId)
        const [ res ] = await follow.addFollow()
        return res.affectedRows ? res.insertId = true : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const find = async (userId, vacId) => {
    try {

        const [follow] = await followModel.find(userId, vacId)

        return follow
    
    } catch (error) {
        console.log(error);
    }
}

// export const update = async (id, data) => {
//     const {user} = data
//     if(id === undefined && desc === undefined && destination === undefined && photo === undefined && dateStart === undefined && dateEnd === undefined && price === undefined) return false

//     const vacation = new vacationModel(desc, destination, photo, dateStart, dateEnd, price, followers)

//     const [res] = await vacation.update(id)
//     return res.affectedRows ? true : false
// }



export const deleteById = async (userId, vacId) => {
    const [res] = await followModel.delete(userId, vacId)
    return res.affectedRows ? true : false
}
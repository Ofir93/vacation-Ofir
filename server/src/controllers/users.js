import userModel from '../entities/user.js'


export const save = async (data) => {
    try {
        const {firstName, lastName, userName, password} = data
        const user = new userModel(firstName, lastName, userName, password)
        // const user = new userModel(firstName, lastName, userName, password ? points : 0)
        const [ res ] = await user.save()
        return res.affectedRows ? res.insertId : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const find = async (id) => {
    const [user] = await userModel.find(id)
    return user
}

export const update = async (id, data) => {
    const {firstName, lastName, userName, password} = data
    if(firstName === undefined && lastName === undefined && userName === undefined && password === undefined) return false

    const user = new userModel(firstName, lastName, userName, password)

    const [res] = await user.update(id)
    return res.affectedRows ? true : false
}


export const deleteById = async (id) => {
    const [res] = await userModel.delete(id)
    return res.affectedRows ? true : false
}
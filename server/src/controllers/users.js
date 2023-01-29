import userModel from '../entities/user.js'


export const save = async (data) => {
    try {
        const {id, userName, password, firstName, lastName} = data
        const user = new userModel(id, userName, password, firstName, lastName)
        // const user = new userModel(firstName, lastName, userName, password ? points : 0)
        
        const existing = await user.exists(userName)
        console.log(existing);
        if(existing === undefined) {
            console.log('User name already exists');
          return null
        }
    
        const [ res ] = await user.registerUser()
        return res.affectedRows ? res.insertId = true : null
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
    const {userName, password, firstName, lastName} = data
    if(id === undefined && userName === undefined && password === undefined && firstName === undefined && lastName === undefined) return false

    const user = new userModel(userName, password, firstName, lastName)

    const [res] = await user.update(id)
    return res.affectedRows ? true : false
}


export const deleteById = async (id) => {
    const [res] = await userModel.delete(id)
    return res.affectedRows ? true : false
}
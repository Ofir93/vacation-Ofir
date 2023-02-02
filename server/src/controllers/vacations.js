import vacationModel from '../entities/vacation.js'


// export const save = async (data) => {
//     try {
//         const {id, desc, photo, dateStart, dateEnd, price, followers} = data
//         const vacation = new vacationModel(id, desc, photo, dateStart, dateEnd, price, followers)
        
//         const existing = await vacation.exists(desc)
//         // console.log(existing);
//         if(existing === undefined || desc === "admin") {
//             console.log('vacation name already exists');
//           return null
//         }
    
//         const [ res ] = await vacation.registervacation()
//         return res.affectedRows ? res.insertId = true : null
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }

export const find = async (id) => {
    try {
        const [vacation] = await vacationModel.find(id)
        return vacation    
    } catch (error) {
        console.log(error)
        return null
    }
}

// export const update = async (id, data) => {
//     const {desc, photo, dateStart, dateEnd} = data
//     if(id === undefined && desc === undefined && photo === undefined && dateStart === undefined && dateEnd === undefined) return false

//     const vacation = new vacationModel(desc, photo, dateStart, dateEnd)

//     const [res] = await vacation.update(id)
//     return res.affectedRows ? true : false
// }


// export const deleteById = async (id) => {
//     const [res] = await vacationModel.delete(id)
//     return res.affectedRows ? true : false
// }
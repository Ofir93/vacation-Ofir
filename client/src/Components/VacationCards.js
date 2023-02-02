import axios from 'axios'
import React, { useEffect, useState } from 'react'

function VacationCards(props) {
    
    const getVacations = () => axios.get(`http://localhost:4000/vacations${props.teamId ? `/${props.teamId}` : ''}`)
    .then((res) => {console.log(res)
        setVacationsByGroups(res.data)})
    .catch(function (error) {
        console.log(error)
    })

    const [vacationsByGroups, setVacationsByGroups] = useState([])

    useEffect(()=>{
        getVacations()
    }, [0])
  
    return (
    <div>
        <div className="card-container container">
        {vacationsByGroups.map((vacation, key) => {
            // const [date, time] = vacation.time_start.split('T')
            // const [dateNo, endTime] = vacation.time_end.split('T')
            return (
                <div className="card" key={key}>
                    <div className="card-body">
                    <h3 className="card-title">Destination{vacation.id}: {vacation.destination}</h3>
                    <p className='card-text'>From Date {vacation.date_start}</p>
                    <p className='card-text'>To Date {vacation.date_end}</p>
                    <img className='card-img-top' src={vacation.photo} alt="vacation image"></img>
                    <p className='card-text'>Price: {vacation.price}$</p>
                    <p className='card-text'>Description: {vacation.description}</p>
                    <p className='card-text'>Followers {vacation.followers}</p>
                    <button class="btn btn-primary"><i class="bi bi-star"></i>Follow</button>
                    </div>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default VacationCards


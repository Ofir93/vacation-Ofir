import axios from 'axios'
import React, { useEffect, useState } from 'react'

function VacationCards() {
    
    const getVacations = () => axios.get(`http://localhost:8008/vacation/${props.teamId}/`)
    .then((res) => {console.log(res)
        setVacationsByGroups(res.data)})
    .catch(function (error) {
        console.log(error)
    })

    const [vacationsByGroups, setVacationsByGroups] = useState([])

    useEffect(()=>{
        getVacations()
    }, [])
  
    return (
    <div>
        <div className="card-container container">
        {vacationsByGroups.map((vacation, key) => {
            const [date, time] = vacation.time_start.split('T')
            const [dateNo, endTime] = vacation.time_end.split('T')
            return (
                <div className="card" key={key}>
                    <div className="card-body">
                    <h3 className="card-title">Destination: {vacation.meet_room}</h3>
                    <p className='card-text'>From Date {date}</p>
                    <p className='card-text'>To Date {time.replace(/^Z+/, '').replace(/Z+$/, '')}</p>
                    <p className='card-text'>{endTime.replace(/^Z+/, '').replace(/Z+$/, '')}</p>
                    <p className='card-text'>Description: {vacation.meet_desc}</p>
                    <p className='card-text'>Price {vacation.meet_desc}</p>
                    </div>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default VacationCards


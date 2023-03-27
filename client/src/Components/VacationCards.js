import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../Contexts/userProvider'

function VacationCards(props) {
  const user = useUser()

  const [style, setStyle] = useState({ display: 'none', id: undefined })
  const [vacationsByGroups, setVacationsByGroups] = useState([])

  
  const getVacations = () =>
    axios
      .get(
        `http://localhost:4000/vacations${
          props.teamId ? `/${props.teamId}` : ''
        }`
      )
      .then((res) => {
        console.log(res)
        setVacationsByGroups(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })

    const deleteVacation = (id) => {
        const text = `Are you sure you want to delete vacation id ${id}??`
       let confirm = confirm(text)
        if (confirm == true) {
            console.log("yes");
          }
          return
        axios.delete(`http://localhost:4000/vacations/${id}`)
        .then((res) => {
            alert(res.data)
        })
        .catch(function (error) {
        console.log(error)
      })
    }


  useEffect(() => {
    getVacations()
  }, [0])

  return (
    <div>
      <div className="card-container container flex-wrap">
        {vacationsByGroups.map((vacation, key) => {
          // const [date, time] = vacation.time_start.split('T')
          // const [dateNo, endTime] = vacation.time_end.split('T')
          return (
            <div
              className="card"
              key={key}
              id={`card${key}`}
              onMouseEnter={(e) => {
                setStyle({ display: 'block', id: key })
              }}
              onMouseLeave={(e) => {
                setStyle({ display: 'none', id: key })
              }}
            >
              <div className="card-body">
                <div
                  id= {key}
                  className="z-3 position-absolute top-0 end-0 p-1"
                  style={style.id ===  key ? {display: style.display} : {display: 'none'} }
                >
                  <button type="button" className="btn btn-outline-info btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm m-1"
                    onClick={(e) => {
                        deleteVacation(e.currentTarget.parentNode.id)
                    }}
                  >
                    <i className="bi bi-file-earmark-x"></i>
                  </button>
                </div>
                <h3 className="card-title z-2">
                  Destination{vacation.id}: {vacation.destination}
                </h3>
                <p className="card-text">From Date {vacation.date_start}</p>
                <p className="card-text">To Date {vacation.date_end}</p>
                <img
                  className="card-img-top"
                  src={vacation.photo}
                  alt="vacation"
                ></img>
                <p className="card-text">Price: {vacation.price}$</p>
                <p className="card-text">Description: {vacation.description}</p>
                <p className="card-text">Followers {vacation.followers}</p>
                {user.role !== 'admin' ? (
                  <button className="btn btn-primary">
                    <i className="bi bi-star"></i>Follow
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VacationCards

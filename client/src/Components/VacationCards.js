import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../Contexts/userProvider'
import EditVacation from './EditVacation'
import Follow from './Follow'

function VacationCards() {
  const user = useUser()

  const [style, setStyle] = useState({ display: 'none', id: undefined })
  const [vacationsByGroups, setVacationsByGroups] = useState([])
  const [edit, setEdit] = useState({ edit: false, id: undefined })

  const getVacations = () =>
    axios
      .get(`http://localhost:4000/vacations`)
      .then((res) => {
        const vacation = res.data

        if(user.role !== 'admin'){
        axios.get(`http://localhost:4000/follow/${user.id}&0`).then((res) => {
          const follows = []
          if(res.data === 404){
            setVacationsByGroups(vacation)
            return
          }
          res.data.map((follow, i) => {
            follows[i] = follow.vacation
          })
          const sortVac = vacation.sort((a, b) => {
            const index1 = follows.indexOf(a.id)
            const index2 = follows.indexOf(b.id)
            return (
              (index1 > -1 ? index1 : Infinity) -
              (index2 > -1 ? index2 : Infinity)
            )
          })
          setVacationsByGroups(sortVac)
          return
        })
      }else{
        setVacationsByGroups(vacation)
      }

      })
      .catch(function (error) {
        console.log(error)
      })

  const deleteVacation = (id) => {
    axios
      .delete(`http://localhost:4000/vacations/${id}`)
      .then((res) => {
        alert(res.data)
        getVacations()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getVacations()
  }, [edit])

  return (
    <div>
      <div className="card-container container flex-wrap">
        {vacationsByGroups.map((vacation, key) => {
          return (
            <div
              className="card"
              key={key}
              id={`card${vacation.id}`}
              onMouseEnter={(e) => {
                setStyle({ display: 'block', id: vacation.id })
              }}
              onMouseLeave={(e) => {
                setStyle({ display: 'none', id: vacation.id })
              }}
            >
              {edit.id === vacation.id && edit.edit ? (
                <EditVacation
                  vacation={vacation}
                  setEdit={setEdit}
                ></EditVacation>
              ) : (
                <div className="card-body">
                  {user.role === 'admin' ? (
                    <div
                      id={vacation.id}
                      className="z-3 position-absolute top-0 end-0 p-1"
                      style={
                        style.id === vacation.id
                          ? { display: style.display }
                          : { display: 'none' }
                      }
                    >
                      <button
                        type="button"
                        className="btn btn-outline-info btn-sm"
                        onClick={(e) => {
                          setEdit({ edit: true, id: vacation.id })
                        }}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm m-1"
                        onClick={(e) => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete vacation id ${vacation.id}??`
                            )
                          )
                            deleteVacation(vacation.id)
                        }}
                      >
                        <i className="bi bi-file-earmark-x"></i>
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                  <h3 className="card-title z-2">
                    Destination: <br /> {vacation.destination}
                  </h3>
                  <p className="card-text">
                    From Date: {new Date(vacation.date_start).toDateString()}
                  </p>
                  <p className="card-text">
                    To Date: {new Date(vacation.date_end).toDateString()}
                  </p>
                  <img
                    className="card-img-top"
                    src={vacation.photo}
                    alt="vacation"
                  ></img>
                  <p className="card-text">Price: {vacation.price}$</p>
                  <p className="card-text">
                    Description: {vacation.description}
                    {user.id}
                  </p>
                  {user.role !== 'admin' ? (
                    <div>
                      <Follow vacation={vacation}></Follow>
                    </div>
                  ) : (
                    <p className="card-text">Followers {vacation.followers}</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VacationCards

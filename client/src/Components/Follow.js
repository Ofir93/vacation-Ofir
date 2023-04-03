import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useUser } from '../Contexts/userProvider'

function Follow({ vacation }) {
  const user = useUser()

  const [pressed, setPressed] = useState(false)
  const [userId, setUserId] = useState(user.id)
  const [vacId, setVacId] = useState(vacation.id)

  const buttonPressed = (
    <button
      className="btn btn-primary"
      onClick={(e) => {
        removeFollow(userId, vacId)
        setPressed(false)
        //הבעיה היא שברגע הריפרוש התוכן נמחק.
        //צריך כל פעם לקחת מהJWT
      }}
    >
      <i className="bi bi-star-fill"></i>UnFollow
    </button>
  )

  const buttonUnPressed = (
    <button
      className="btn btn-primary"
      onClick={(e) => {
        console.log(userId, vacId)
        addFollow(userId, vacId)
        setPressed(true)
      }}
    >
      <i className="bi bi-star"></i>Follow
    </button>
  )

  const addFollow = (userId, VacId) => {
    if (vacation.followers) {
      return alert('error')
      ///////////////////////////////////
    }
    axios.post(`http://localhost:4000/follow/`, {
        userId: userId,
        vacId: VacId
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error)
    })
  }

  const removeFollow = (userId, vacId) => {
    if (!vacation.followers) {
      return alert('error')
      ///////////////////////////////////
    }
    axios.delete(`http://localhost:4000/follow/${userId}&${vacId}`)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error)
    })
  }



  const getFollowers = () => {
    axios
      .get(`http://localhost:4000/follow/${userId}&${vacId}`)
      .then((res) => {
        console.log(res.data);
        // setUserId(user.id)
        // setVacId(vacation.id)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    getFollowers()
  }, [0])

  return (
    <div>
      <p className="card-text">Followers {vacation.followers}</p>
      {pressed ? buttonPressed : buttonUnPressed}
    </div>
  )
}

export default Follow

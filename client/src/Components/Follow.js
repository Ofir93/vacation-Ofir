import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useUser } from '../Contexts/userProvider'

function Follow({ vacation }) {
  const user = useUser()

  const [pressed, setPressed] = useState(false)
  const [userId, setUserId] = useState(0)
  const [vacId, setVacId] = useState(0)

  const buttonPressed = (
    <button className="btn btn-primary" onClick={(e) => {

        setPressed(false)
        //הבעיה היא שברגע הריפרוש התוכן נמחק.
        //צריך כל פעם לקחת מהJWT
    }}>
      <i className="bi bi-star-fill"></i>UnFollow
    </button>
  )

  const buttonUnPressed = (
    <button
      className="btn btn-primary"
      onClick={(e) => {
        console.log(userId, vacId)

        setPressed(true)
      }}
    >
      <i className="bi bi-star"></i>Follow
    </button>
  )

  const addFollow = () => {}

  const getFollowers = () => {
    axios
      .get(`http://localhost:4000/follow/${user.userName}&${vacation.id}`)
      .then((res) => {
        //   console.log(res);
        setUserId(user.id)
        setVacId(vacation.id)
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

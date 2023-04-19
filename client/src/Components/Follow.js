import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useUser } from '../Contexts/userProvider'

function Follow({ vacation }) {
  const user = useUser()

  const [pressed, setPressed] = useState(false)

  const buttonPressed = (
    <button
      className="btn btn-primary"
      onClick={(e) => {
        removeFollow(user.id, vacation.id)
      }}
    >
      UnFollow <i className="bi bi-star-fill"></i>
    </button>
  )

  const buttonUnPressed = (
    <button
      className="btn btn-primary"
      onClick={(e) => {
        addFollow(user.id, vacation.id)
      }}
    >
      Follow <i className="bi bi-star"></i>
    </button>
  )

  const addFollow = (userId, VacId) => {
    axios
      .post(`http://localhost:4000/follow/`, {
        userId: userId,
        vacId: VacId,
      })
      .then((res) => {
        vacation.followers++
        setPressed(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeFollow = (userId, vacId) => {
    if (!vacation.followers) {
      return alert('error')
    }
    const deleteFollow = {
      userId: userId,
      vacId: vacId,
    }
    axios
      .post(`http://localhost:4000/follow/delFol`, deleteFollow)
      .then((res) => {
        console.log(res.data)
        vacation.followers--
        setPressed(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getFollowers = () => {
    axios
      .get(`http://localhost:4000/follow/${user.id}&${vacation.id}`)
      .then((res) => {
        if (res.data === 404) {
          setPressed(false)
          return
        }
        setPressed(true)
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

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../Contexts/userProvider'

function Reports(props) {
  const user = useUser()

  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [check, setCheck] = useState(false)

  const Reportss = () =>
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

  const [vacationsByGroups, setVacationsByGroups] = useState([])

  //   useEffect(() => {
  //     getVacations()
  //   }, [0])

  return (
    <div>
      <div className="card-container container add">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="destination" className="form-label">
                  Destination
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="destination"
                  aria-describedby="destination"
                  onChange={(e) => setDestination(e.target.value)}
                ></input>
                {/* <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div> */}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="fromDate" className="form-label">
                  From Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fromDate"
                  onChange={(e) => setFromDate(e.target.value)}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="toDate" className="form-label">
                  To Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="toDate"
                  onChange={(e) => setToDate(e.target.value)}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price $
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="checkbox"
                  onChange={(e) => setCheck(e.target.checked)}
                ></input>
                <label className="form-check-label" htmlFor="exampleCheck1">
                Confirm
                </label>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => check ? console.log(destination, description, fromDate, toDate, price, image) : alert('Please confirm your new trip')}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports

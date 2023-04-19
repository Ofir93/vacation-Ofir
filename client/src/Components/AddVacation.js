import axios from 'axios'
import React, { useState } from 'react'
import { useHomeUpdate } from '../Contexts/InterfacesContext'

function AddVacation() {
  const interfacesChange = useHomeUpdate()

  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [check, setCheck] = useState(false)

  function TDate() {
    const ToDate = new Date()
    const FromDate = new Date(fromDate)

    if (
      FromDate.getTime() <= ToDate.getTime() ||
      new Date(toDate).getTime() <= FromDate.getTime()
    ) {
      alert('The Date must be a Future date')
      return false
    }
    return true
  }

  const addVacations = () => {
    // if(!destination || !description || !fromDate || !toDate || !price || !image){
    //     alert('Please fill all fields')
    //     return
    // }
    if (!TDate()) {
      return
    }
    // axios
    //   .get(`http://localhost:4000/vacations`)
    //   .then((res) => {
    //     const id = ++res.data.length
    axios
      .post(`http://localhost:4000/vacations`, {
        // id: id,
        destination: destination,
        desc: description,
        photo: image,
        dateStart: fromDate,
        dateEnd: toDate,
        price: price,
      })
      .then((res) => {
        alert(res.data)
        console.log(res)
        if (
          res.data === 'vacation name already exists' ||
          res.data === 'Nothing inserted'
        ) {
          return
        }
        interfacesChange(false, false, true)
      })
      .catch(function (error) {
        console.log(error)
      })
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }

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
                onClick={() =>
                  check ? addVacations() : alert('Please confirm your new trip')
                }
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

export default AddVacation

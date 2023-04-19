import axios from 'axios'
import React, { useState } from 'react'

function EditVacation({ vacation, setEdit }) {
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

  const editVacations = () => {
    if (!TDate()) {
      return
    }
    axios
      .patch(`http://localhost:4000/vacations/${vacation.id}`, {
        destination: destination,
        desc: description,
        photo: image,
        dateStart: fromDate,
        dateEnd: toDate,
        price: price,
      })
      .then((res) => {
        alert(res.data)
        if (res.data === 'Nothing inserted') {
          return
        }
        setEdit({ edit: false, id: undefined })
      })
      .catch(function (error) {
        alert(error.message)
        console.log(error)
        setEdit({ edit: false, id: undefined })
      })
  }

  return (
    <div>
      <div className="edit">
        <div className="card-body">
          <form>
            <div className="mb-1">
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <input
                type="text"
                className="form-control"
                id="destination"
                aria-describedby="destination"
                placeholder={vacation.destination}
                onChange={(e) => setDestination(e.target.value)}
              ></input>
            </div>
            <div className="mb-1">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder={vacation.description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div className="mb-1">
              <label htmlFor="fromDate" className="form-label">
                From Date
              </label>
              <input
                type="text"
                className="form-control"
                id="fromDate"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                placeholder={new Date(vacation.date_start)
                  .toJSON()
                  .slice(0, 10)}
                onChange={(e) => setFromDate(e.target.value)}
              ></input>
            </div>
            <div className="mb-1">
              <label htmlFor="toDate" className="form-label">
                To Date
              </label>
              <input
                type="text"
                className="form-control"
                id="toDate"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                placeholder={new Date(vacation.date_end).toJSON().slice(0, 10)}
                onChange={(e) => setToDate(e.target.value)}
              ></input>
            </div>
            <div className="mb-1">
              <label htmlFor="price" className="form-label">
                Price $
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder={vacation.price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div className="mb-1">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="url"
                className="form-control"
                id="image"
                placeholder={vacation.photo}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div className="mb-1 form-check">
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
                check ? editVacations() : alert('Please confirm your new trip')
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditVacation

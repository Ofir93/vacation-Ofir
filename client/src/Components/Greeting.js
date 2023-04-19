import React from 'react'
import { useHomeUpdate } from '../Contexts/InterfacesContext'

function Greeting() {
  const interfacesChange = useHomeUpdate()

  return (
    <div>
      <div className="greet">
        <div className="carouselAll">
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="5"
                aria-label="Slide 6"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Rave_in_the_Henge_2005.jpg/640px-Rave_in_the_Henge_2005.jpg"
                  className="w-50 carousel1"
                  alt="..."
                ></img>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img
                  src="https://krayot.com/wp-content/uploads/2021/01/%D7%9E%D7%A1%D7%99%D7%91%D7%AA-%D7%98%D7%91%D7%A2.jpg"
                  className="w-50 carousel2"
                  alt="..."
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.shopify.com/s/files/1/0982/0722/files/6-1-2016_5-49-53_PM_1024x1024.jpg?7174960393118038727"
                  className="w-50 carousel3"
                  alt="..."
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  src="https://www.mesibatube.com/wp-content/uploads/2016/04/moksha-project-trance-party-israel.jpg"
                  className="w-50 carousel4"
                  alt="..."
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  src="https://idanvip.co.il/images/files/FormatFactorymaxresdefault.jpg"
                  className="w-50 carousel5"
                  alt="..."
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  src="https://mixmag.net/assets/uploads/images/_fullX2/rave-rebels-inline-1.jpg"
                  className="w-50 carousel6"
                  alt="..."
                ></img>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="greetName">
            <h2>Welcom to "Tripping!</h2>
            <h3>
              please{' '}
              <button
                className="btn btn-primary"
                onClick={() => interfacesChange(false, true, false)}
              >
                Login
              </button>{' '}
              to tripp! :)
            </h3>
            <div className="aboutMe">
              <p>Ofir Ben Yacov</p>
            </div>
            <p>Open for work!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Greeting

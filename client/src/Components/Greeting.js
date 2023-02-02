import React from 'react'

function Greeting({showLogin}) {
  return (
    <div>
        <div class="greet">
    <div class="carouselAll">
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3"
                    aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4"
                    aria-label="Slide 5"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5"
                    aria-label="Slide 6"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                    <img src="https://img.mako.co.il/2020/07/09/asd3457h_i.jpg" class="w-50 carousel1" alt="..."></img>
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                    <img src="https://krayot.com/wp-content/uploads/2021/01/%D7%9E%D7%A1%D7%99%D7%91%D7%AA-%D7%98%D7%91%D7%A2.jpg" class="w-50 carousel2" alt="..."></img>
                </div>
                <div class="carousel-item">
                    <img src="https://www.ticketsi.co.il/uploads/events/aa0d430f45ea6926b4c1_395x296.jpg" class="w-50 carousel3" alt="..."></img>
                </div>
                <div class="carousel-item">
                    <img src="https://www.mesibatube.com/wp-content/uploads/2016/04/moksha-project-trance-party-israel.jpg" class="w-50 carousel4" alt="..."></img>
                </div>
                <div class="carousel-item">
                    <img src="https://idanvip.co.il/images/files/FormatFactorymaxresdefault.jpg" class="w-50 carousel5" alt="..."></img>
                </div>
                <div class="carousel-item">
                    <img src="https://lh3.googleusercontent.com/pw/AM-JKLWELXAsCrJpoRFgc3uWivh4iSP_910K0ApTtKuQUU5USBMd9u-RDuQCEQJwVwG3ppzrx658kCy6SED-QFgC9kr92OSZGCdeqe_Ft8UTOqoDvngi2KFlrk8uhhoJpfOY4miOV6ZTBmMoH_zkqX2Q2vzwkA=w859-h506-no?authuser=1" class="w-50 carousel6" alt="..."></img>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

<div className='greetName'>
        <h2>Welcom to "Tripping!</h2>
        <h3>please <button className='btn btn-primary' onClick={()=> showLogin(true)}>Login</button> to tripp! :)</h3>
        <div class="aboutMe">
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
import React, { useState } from 'react'
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { useHomeUpdate } from '../Contexts/InterfacesContext'
import { useUserUpdate } from '../Contexts/userProvider'

const Login = () => {
  const [justifyActive, setJustifyActive] = useState('tab1')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const interfacesChange = useHomeUpdate()
  const userChangeChange = useUserUpdate()

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return
    }

    setJustifyActive(value)
  }
  let agree = false
  const handleAgree = (e) => {
    const { checked } = e.target
    agree = checked
  }

  const signIn = () => {
    window.localStorage.removeItem('jwt')
    axios
      .post('http://localhost:4000/auth/login', {
        userName: username,
        password: password,
      })
      .then((response) => {
        const { accessToken } = response.data
        window.localStorage.setItem('jwt', accessToken)
        const { role, id } = jwt.decode(accessToken)
        userChangeChange(username, role, accessToken, id)
        interfacesChange(false, false, true)
      })
      .catch(function (error) {
        alert(error.response.data)
      })
  }

  const singUp = () => {
    if (!agree) {
      return alert('Please agree to the terms before registering.')
    }
    //if
    axios
      .post('http://localhost:4000/auth/register', {
        userName: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) => {
        console.log(response.data)
        if (response.data === 'Nothing inserted User name already exists') {
          return alert('User name already exists please try again')
        }
        const { accessToken } = response.data
        window.localStorage.setItem('jwt', accessToken)
        const { role, id } = jwt.decode(accessToken)
        userChangeChange(username, role, accessToken, id)
        interfacesChange(false, false, true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div id="loginC">
      <MDBContainer
        className="p-3 my-3 d-flex flex-column w-50 container-fluid"
        id="loginContainer"
      >
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick('tab1')}
              active={justifyActive === 'tab1'}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick('tab2')}
              active={justifyActive === 'tab2'}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === 'tab1'}>
            <div className="text-center mb-5"></div>

            <MDBInput
              wrapperClass="mb-4 text-white"
              label="User Name"
              id="userLogin"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4 text-white"
              label="Password"
              id="passwordLogin"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                wrapperClass="text-white"
                checked
                readOnly
                id="flexCheckDefault"
                label="Remember me :)"
              />
              <a
                href="!#"
                // onClick={}///////////////////////////////////////////////////////////////////////////////////////
              >
                Forgot password?
              </a>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              onClick={() => signIn()}
            >
              Sign in
            </MDBBtn>
            <p className="text-center text-white">
              Not a member?{' '}
              <a
                href="#!"
                onClick={() => handleJustifyClick('tab2')}
                active={(justifyActive === 'tab2').toString()}
              >
                Register
              </a>
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === 'tab2'}>
            <div className="text-center mb-3"></div>

            <MDBInput
              wrapperClass="mb-4 text-white"
              label="First Name"
              id="regFirstName"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4 text-white"
              label="Last Name"
              id="regLastName"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4 text-white"
              label="User Name"
              id="regUserName"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4 text-white"
              label="Password"
              id="regPassword"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-center mb-4 text-white">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I have read and agree to the terms"
                onChange={handleAgree}
              />
            </div>

            <MDBBtn className="mb-4 w-100" onClick={() => singUp()}>
              Sign up
            </MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </div>
  )
}

export default Login

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const Login = () => {
//   const getGroups = () =>
//     axios
//       .get('http://localhost:8008/groups/')
//       .then((response) => {
//         setDbTeams(response.data)
//       })
//       .catch(function(error) {
//         console.log(error)
//       })

//   const [selects, setSelects] = useState('')
//   const [dbTeams, setDbTeams] = useState([])
//   const [desc, setDesc] = useState('')
//   const [date, setDate] = useState('')
//   const [startHour, setStartHour] = useState('')
//   const [endHour, setEndHour] = useState('')
//   const [room, setRoom] = useState('')

//   const submit = () => {
//     if (!selects || !date || !startHour || !endHour || !desc || !room) {
//       return
//     }
//     axios
//       .post('http://localhost:8008/meetings', {
//         groupId: selects,
//         timeStart: `${date} ${startHour}`,
//         timeEnd: `${date} ${endHour}`,
//         meetDesc: desc,
//         meetRoom: room,
//       })
//       .then(function(response) {
//         console.log(response.data)
//         setDesc('')
//         setDate('')
//         setStartHour('')
//         setEndHour('')
//         setRoom('')
//         setSelects('')
//       })
//   .catch(function(error) {
//     console.log(error)
//   })
//   }

//   useEffect(() => {
//     getGroups()
//     submit()
//   }, [])

//   return (
//     <div>
//       <div id="mainAdd" className="form-group">
//         <select
//           className="form-control mb-3"
//           value={selects}
//           onChange={(e) => {
//             setSelects(e.target.value)
//           }}
//           required
//         >
//           {dbTeams.map((group) => {
//             return (
//               <option
//                 id={group.group_id}
//                 key={group.group_id}
//                 value={group.group_id}
//               >
//                 {group.group_name}
//               </option>
//             )
//           })}
//         </select>
//         <div id="input" className="form-group">
//           <div id="dateTime">
//             <input
//               className="form-control"
//               id="date"
//               type="date"
//               value={date}
//               required
//               onChange={(e) => setDate(e.target.value)}
//             ></input>
//             <label className="form-label">From</label>
//             <input
//               className="form-control"
//               id="from"
//               type="time"
//               value={startHour}
//               onChange={(e) => setStartHour(e.target.value)}
//               required
//             ></input>
//             <label className="form-label">Until</label>
//             <input
//               className="form-control"
//               id="until"
//               value={endHour}
//               onChange={(e) => setEndHour(e.target.value)}
//               type="time"
//               required
//             ></input>
//           </div>
//           <div className="form-group">
//             <label className="form-label">Meeting room : </label>
//             <select
//               className="form-control"
//               value={room}
//               onChange={(e) => setRoom(e.target.value)}
//               placeholder="Meeting room"
//               required
//             >
//               <option>Blue Room</option>
//               <option>New York Room</option>
//               <option>New York Room2</option>
//               <option>Large Board Room</option>
//             </select>
//             <label className="form-label">Description</label>
//             <input
//               className="form-control"
//               id="desc"
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//               type="text"
//               required
//             ></input>
//           </div>
//           <button
//             id="button"
//             className="btn btn-primary"
// onClick={(e) => {
//   submit()
// }}
//           >
//             Submit new meeting
//           </button>
//         </div>
//       </div>
//       <div id="mettings">
//         {/* <MeetingCards teamId={selects ? selects : 1} /> */}
//       </div>
//     </div>
//   )
// }

// export default Login

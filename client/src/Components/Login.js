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
  const [checked, setChecked] = useState(false)

  const interfacesChange = useHomeUpdate()
  const userChangeChange = useUserUpdate()

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return
    }

    setJustifyActive(value)
  }
  const handleAgree = (e) => {
    const { checked } = e.target
    setChecked(checked)
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
        error.response.data.errors ? alert(error.response.data.errors) : alert(error.response.data)
        
      })
  }

  const singUp = () => {
    if (!checked) {
      return alert('Please agree to the terms before registering.')
    }

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
        const err = error.response.data.errors
          .map((item) => {
            return item['message'] || item['msg']
          })
          .join('\n')
        error.response.data.where
          ? alert(error.response.data.where + '\n' + err)
          : alert(err)
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
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" onClick={() => signIn()}>
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
                onClick={handleAgree}
                value={checked}
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

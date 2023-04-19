import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useUser, useUserUpdate } from '../Contexts/userProvider'
import { useHomeUpdate } from '../Contexts/InterfacesContext'

const NavbarTop = () => {
  const user = useUser()
  const userModelChange = useUserUpdate()
  const interfacesChange = useHomeUpdate()

  const logOut = () => {
    userModelChange('', '', '')
    interfacesChange(true, false, false)
    window.localStorage.removeItem('jwt')
  }

  return (
    <div id="navbarC">
      <Navbar bg="success" expand="lg">
        <Container>
          <Navbar.Brand>
            Tripping :) {user.userName ? `Hello ${user.userName}` : ''}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#"
                onClick={() => {
                  user.userName
                    ? interfacesChange(false, false, true)
                    : interfacesChange(true, false, false)
                }}
              >
                Home
              </Nav.Link>
              {user.userName ? (
                <Nav.Link
                  href="#"
                  className="bg-warning text-dark"
                  onClick={() => {
                    logOut()
                  }}
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link
                  href="#"
                  onClick={() => interfacesChange(false, true, false)}
                >
                  Login
                </Nav.Link>
              )}
              {user.role === 'admin' ? (
                <NavDropdown title="Admin Options" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    href="#action/3.1"
                    onClick={() =>
                      interfacesChange(false, false, false, true, false)
                    }
                  >
                    Add Vacation
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#action/3.2"
                    onClick={() =>
                      interfacesChange(false, false, false, false, true)
                    }
                  >
                    Reports
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                ''
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavbarTop

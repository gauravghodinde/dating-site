import React from 'react'
import { Navbar,Container } from 'react-bootstrap'
import  heart from '../assests/images/heart.svg' 
export const MyNavbar = () => {
  return (
    <Navbar className="bg-body-tertiary ">
        <Container className='d-flex justify-content-center'>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src = {heart}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Crushed
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default MyNavbar

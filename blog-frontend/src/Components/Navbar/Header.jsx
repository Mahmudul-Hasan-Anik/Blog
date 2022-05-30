import React from 'react'
import TopHeader from './TopHeader'
import { Container,Navbar,Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div>
    <TopHeader/>
    <Navbar className='header' expand="lg">
    <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link >
                <Link to='/'>HOME</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to='/about'>ABOUT</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to='/blog'>BLOG</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to='/contact'>CONTACT</Link>
            </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
            <Nav.Link >
                <Link to='/login'>SIGN IN</Link>
            </Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    </div>
  )
}

export default Header
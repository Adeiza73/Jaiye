import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'

const Header2 = () => {
    return <header><Navbar bg="info" variant="" expand="lg" collapseOnSelect>
        <Container> 
    <Navbar.Brand ><span style={{color:'black'}}>Filter by</span></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <LinkContainer to='/category'><NavDropdown.Item><span style={{color:'black'}}>Category</span></NavDropdown.Item></LinkContainer> 
        <LinkContainer to='/location'><NavDropdown.Item><span style={{color:'black'}}>Location</span></NavDropdown.Item></LinkContainer>
        <LinkContainer to='/date'><NavDropdown.Item><span style={{color:'black'}}>Date</span></NavDropdown.Item></LinkContainer> 
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  </header>

}

export default Header2

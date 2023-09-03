import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Modal } from 'react-bootstrap' 
import { BsCart3 } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useState } from 'react';

const NavBar = () => {
    const [smShow, setSmShow] = useState(false);
    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <img src="logo.png" alt="Logo" height="45px" className='custom-nav'/>       
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto custom-nav">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            </Nav>
            

            
            <Navbar.Brand>
              <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
              </Navbar.Brand>

              <Navbar.Brand href="#home">
                  <BsCart3 className="nav-icon me-2" onClick={() => setSmShow(true)} />
                  <Modal
                    size="sm"
                    show={smShow}
                    onHide={() => setSmShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                  >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      Carrito
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Registrate o inicia sesion para ver o modificar el carrito !</Modal.Body>
                  </Modal>
                </Navbar.Brand>

              <Navbar.Brand>
                <FiLogIn className="nav-icon"/>
              </Navbar.Brand>

              </Navbar.Collapse>
        </Container>
      </Navbar>
        </div>
    );
};

export default NavBar;


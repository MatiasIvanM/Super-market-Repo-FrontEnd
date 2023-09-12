import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Modal, Alert } from 'react-bootstrap'
import { BsCart3, BsWrenchAdjustable } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useState } from 'react';
import Button from "react-bootstrap/Button";
// import { useAuth0 } from "@auth0/auth0-react"

import { useSelector } from 'react-redux'


const NavBar = (props) => {
  const [smShow, setSmShow] = useState(false);
  const [name, setName] = useState("");
  // const { logout, isAuthenticated } = useAuth0()

  const cart = useSelector((state) => state.productsSC);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  }


  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <img src="logo.png" alt="Logo" height="45px" className='custom-nav' />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto custom-nav">
              <Nav.Link as={Link} to="/home">INICIO</Nav.Link>
              <Nav.Link as={Link} to="/form">AGREGAR PRODUCTO</Nav.Link>
              
            </Nav>



            <Navbar.Brand>
              <div className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" onChange={handleChange} value={name} />
                {/* <button className="btn btn-outline-success" onClick={()=>{props.searchByName(name)}} >Buscar</button> */}
                <Button variant="primary" style={{ width: "100px" }} onClick={() => { props.searchByName(name) }} >
                  Buscar
                </Button>
              </div>
            </Navbar.Brand>

            <Navbar.Brand
              as={Link}
              to={cart.length > 0 ? "/cartshopping" : "#"}
              onClick={() => {
                if (cart.length === 0) {
                  setShowEmptyCartAlert(true);
                } else {
                  setSmShow(true);
                }
              }}
            >
              <BsCart3 className="nav-icon me-2" onClick={() => setSmShow(true)} />
              <Modal
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                dialogClassName="modal-90w"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                    El carrito esta vacío
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Alert variant="warning" >
                  Agrega productos al carrito y vuelve a intentarlo
                </Alert>
                  </Modal.Body>
              </Modal>
            </Navbar.Brand>

            <Navbar.Brand>
              <Nav.Link as={Link} to={JSON.parse(localStorage.getItem('customer'))?.email ? '/profile' : '/register'}>
                <FiLogIn className="nav-icon" />
              </Nav.Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to='/admin'>
                <BsWrenchAdjustable className="nav-icon" />
              </Link>
            </Navbar.Brand>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
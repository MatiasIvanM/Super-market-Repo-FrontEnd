import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Modal, Alert } from 'react-bootstrap'
import { BsCart3, BsWrenchAdjustable } from 'react-icons/bs'
import { FiLogIn, FiUser } from 'react-icons/fi'
import { useState } from 'react';
import Button from "react-bootstrap/Button";
// import { useAuth0 } from "@auth0/auth0-react"

import { useSelector } from 'react-redux'
import Banned from "../../View/Login/Banned";
import style from './NavBar.module.css';
import CartShopping from "../../View/CartShopping/CartShopping";


const NavBar = (props) => {
  const [smShow, setSmShow] = useState(false);
  const [name, setName] = useState("");
  // const { logout, isAuthenticated } = useAuth0()
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  
  const cart = useSelector((state) => state.productsSC);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);
  const [showCS, setShowCS] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  }
  const usuario = JSON.parse(localStorage.getItem('customer'));
  let role = null;

  if (usuario) {
    role = usuario.role
  }

  const handleShow = () => {
    if(show){
      setShow(false)
    } else {
      setShow(true)
    }
  }


  return (
    <div className={style.navBarContainer}>
      <Navbar bg="dark" expand="lg" variant="dark" className={style.contentWithMargin}>
        <Container>
          <Link to='/'>
            <img src="logo.png" alt="Logo" height="45px" className='custom-nav' />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto custom-nav">
              <Nav.Link as={Link} to="/home">Ir a comprar</Nav.Link>

            </Nav>

            {isHomePage && (
            <Navbar.Brand>
                <div className="d-flex">
                  <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" onChange={handleChange} value={name} />
                  <Button variant="primary" className={style.search_button} onClick={() => { props.searchByName(name) }}>
                    Buscar
                  </Button>
                </div>
              </Navbar.Brand>
            )}

            {/* <Navbar.Brand>
              <div className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" onChange={handleChange} value={name} />
              
                <Button variant="primary" className={style.search_button} onClick={() => { props.searchByName(name) }} >
                  Buscar
                </Button>
              </div>
            </Navbar.Brand> */}

            <Navbar.Brand
            // as={Link}
            // to={cart.length > 0 ? "/cartshopping" : "#"}
            // onClick={() => {
            //   if (cart.length === 0) {
            //     setSmShow(true);
            //   } else {
            //     console.log("Productos: ",cart.length);
            //     // setShowEmptyCartAlert(true);
            //   }
            // }}
            >
              <BsCart3 style={{ marginRight: '0.5rem', cursor: 'pointer' }} onClick={() => cart.length === 0 ? setSmShow(true) : setShow(true)} />
              <span className={style.circulo} >{cart.length}</span>
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
              {JSON.parse(localStorage.getItem('customer'))
                ?
                <Nav.Link as={Link} to={'/profile'}>
                  <FiUser className="nav-icon" />
                </Nav.Link>
                :
                <Nav.Link as={Link} to={'/login'}>
                  <FiLogIn className="nav-icon" />

                  <p className={style.loginText}> Inicia Sesion o Registrate</p>

                </Nav.Link>
              }
            </Navbar.Brand>

            {JSON.parse(localStorage.getItem('customer')) && role === 'admin'
              ? (<Navbar.Brand>
                <Link to='/admin'>
                  <BsWrenchAdjustable className="nav-icon" />
                </Link>
              </Navbar.Brand>)
              : null}

          </Navbar.Collapse>
        </Container>
      </Navbar>
      {JSON.parse(localStorage.getItem('customer')) && role === 'BAN'
        ? <Banned />
        : null}

      <CartShopping show={show} handleShow={handleShow}></CartShopping>

    </div>
  );
};

export default NavBar;
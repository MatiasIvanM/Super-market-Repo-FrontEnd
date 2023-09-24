import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { Container, Nav, Navbar, Modal } from 'react-bootstrap' 
import { BsCart3 } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { BiSolidDashboard } from "react-icons/bi";
=======
import { Container, Nav, Navbar, Modal, Alert } from 'react-bootstrap'
import { BsCart3, BsWrenchAdjustable } from 'react-icons/bs'
import { FiLogIn, FiUser } from 'react-icons/fi'
>>>>>>> 31f2d69718a257250885598e10595e6ca7e6f995
import { useState } from 'react';
import Button from "react-bootstrap/Button";
// import { useAuth0 } from "@auth0/auth0-react"

import { useSelector } from 'react-redux'
import Banned from "../../View/Login/Banned";
import style from './NavBar.module.css';


const NavBar = (props) => {
  const [smShow, setSmShow] = useState(false);
  const [name, setName] = useState("");
  // const { logout, isAuthenticated } = useAuth0()

  const cart = useSelector((state) => state.productsSC);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  }
  const usuario = JSON.parse(localStorage.getItem('customer'));
  let role=null;

  if (usuario){
    role = usuario.role
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
              <Nav.Link as={Link} to="/home">INICIO</Nav.Link>

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
                  console.log("Productos: ",cart.length);
                  setSmShow(true);
                }
              }}
            >
              <BsCart3 className="nav-icon me-2" onClick={() => setSmShow(true)} />
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

<<<<<<< HEAD
              <Navbar.Brand>
                <FiLogIn className="nav-icon"/>
                <Link to="/admin"> 
                  <BiSolidDashboard className="nav-icon"/>
                </Link>
              </Navbar.Brand>
              
=======
            <Navbar.Brand>
              {JSON.parse(localStorage.getItem('customer'))
                ?
                <Nav.Link as={Link} to={'/profile'}>
                  <FiUser className="nav-icon" />
                </Nav.Link>
                :
                <Nav.Link as={Link} to={'/register'}>
                  <FiLogIn className="nav-icon" />
                  <p>Inicia Sesion o Registrate</p>
                </Nav.Link>
              }
            </Navbar.Brand>
>>>>>>> 31f2d69718a257250885598e10595e6ca7e6f995

             {JSON.parse(localStorage.getItem('customer')) && role==='admin' 
             ? (<Navbar.Brand>
              <Link to='/admin'>
                <BsWrenchAdjustable className="nav-icon" />
              </Link>
              </Navbar.Brand>)
             : null}

          </Navbar.Collapse>
        </Container>
      </Navbar>
      {JSON.parse(localStorage.getItem('customer')) && role==='BAN' 
             ? <Banned />
             : null}
        
    </div>
  );
};

export default NavBar;
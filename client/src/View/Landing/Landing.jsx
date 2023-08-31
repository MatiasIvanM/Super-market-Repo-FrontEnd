import { Container, Nav, Navbar, NavDropdown, Col, Image, Row, Modal } from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'
import './Landing.css';
import { BsCart3 } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useState } from 'react';

function Landing(){

    const [smShow, setSmShow] = useState(false);
    return(
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <img src="logo.png" alt="Logo" height="45px" className='custom-nav'/>       
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto custom-nav">
              <Nav.Link href="#home">Home</Nav.Link>

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

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
      <Row className='offer-image'>
        <Col xs={6} md={4} lg={4}>
          <Image src="oferta1.jpg" className='offer-image' thumbnail />
        </Col>
        <Col xs={6} md={4} lg={4}>
          <Image src="oferta4.png" className='image' thumbnail />
        </Col>
        <Col xs={6} md={4} lg={4}>
          <Image src="oferta5.jpeg" className='image' thumbnail />
        </Col>
      </Row>
      
      <Row className='offer-image'>
        <Col xs={9} lg={12}>
            <Image src="oferta3.jpg" className='image' thumbnail />
        </Col>
      </Row>

      <Row className='offer-image'>
        <Col xs={6} md={4} lg={4}> 
            <Image src="oferta6.jpg" className='image' thumbnail />
        </Col>
        <Col xs={6} md={4} lg={4}>
            <Image src="oferta6.jpg" className='image' thumbnail />
        </Col>
        <Col xs={6} md={4} lg={4}>
            <Image width="320px" src="oferta5.jpeg" className='image' thumbnail />
            <Image width="320px" src="oferta4.png" className='image' thumbnail />
        </Col>
      </Row>
    </Container>
            <Nav className="justify-content-center custom-footer" activeKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-1" href='/about'>About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Preguntas frecuentes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Como comprar ?</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4">Contactanos !</Nav.Link>
        </Nav.Item>
      </Nav>
        </div>
    )
}

export default Landing

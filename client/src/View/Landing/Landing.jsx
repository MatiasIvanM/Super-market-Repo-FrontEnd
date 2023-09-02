import { Container, Nav, Col, Image, Row } from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'
import './Landing.css';
import  NavBar  from '../../components/NavBar/NavBar';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Landing(){
    
    return(
    <div>
      <NavBar/>
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

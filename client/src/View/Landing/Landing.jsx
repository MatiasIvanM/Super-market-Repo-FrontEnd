import { Container, Nav, Col, Image, Row } from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'
import './Landing.css';

import  NavBar  from '../../components/NavBar/NavBar';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getProducts,getProductsByName} from '../../redux/Actions/actionsProducts'
import { Link, useHistory  } from 'react-router-dom';
import {Footer} from '../../components/Footer/Footer';

function Landing(){
  const dispatch = useDispatch();
  const history = useHistory();

  const searchByName = (name) => {
    dispatch(getProductsByName(name));
    history.push('/home');
};

  useEffect(() => {
    dispatch(getProducts());
  }, []);

    return(
    <div>
      <NavBar
      searchByName={searchByName}
      />
      <Container>
      <Row className='offer-image'>
        <Col xs={6} md={4} lg={4}>
          <Image src="OfertaSMH.jpg" className='image' thumbnail />
        </Col>
        <Col xs={6} md={4} lg={4}>
          <Image src="OfertaSMH.jpg" className='image' thumbnail />
        </Col>
        <Col xs={6} md={4} lg={4}>
          <Image src="OfertaSMH.jpg" className='image' thumbnail />
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
    <Footer/>
        </div>
    )
}

export default Landing

<<<<<<< HEAD
// eslint-disable-next-line
import { Container, Nav, Col, Image, Row } from 'react-bootstrap' 
=======
import { Container, Col, Image, Row } from 'react-bootstrap' 
>>>>>>> 0e8c718ede66db3c8253d1065d62213dd9c17007
import 'bootstrap/dist/css/bootstrap.min.css'
import './Landing.css';

import  NavBar  from '../../components/NavBar/NavBar';
<<<<<<< HEAD
// eslint-disable-next-line 
import { useEffect, useState } from "react";
// eslint-disable-next-line 
import { useDispatch, useSelector } from "react-redux";
import {getProducts,getProductsByName} from '../../redux/Actions/actionsProducts'
// eslint-disable-next-line 
import { Link, useHistory  } from 'react-router-dom';
=======
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getProducts,getProductsByName} from '../../redux/Actions/actionsProducts'
import { useHistory  } from 'react-router-dom';
>>>>>>> 0e8c718ede66db3c8253d1065d62213dd9c17007
import {Footer} from '../../components/Footer/Footer';

function Landing(){
  const dispatch = useDispatch();
  const history = useHistory();

  const searchByName = (name) => {
    dispatch(getProductsByName(name));
    history.push('/home');
};

  useEffect(() => {
<<<<<<< HEAD
    dispatch(getProducts());
    // eslint-disable-next-line
=======
    dispatch(getProducts());// eslint-disable-next-line
>>>>>>> 0e8c718ede66db3c8253d1065d62213dd9c17007
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

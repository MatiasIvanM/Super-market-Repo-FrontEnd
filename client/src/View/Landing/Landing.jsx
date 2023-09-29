import { Container, Col, Image, Row, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Landing.css';

import NavBar from '../../components/NavBar/NavBar';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts, getProductsByName } from '../../redux/Actions/actionsProducts'
import { useHistory } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { selectCategory } from '../../redux/Actions/actionsCategory';
import CarouselOfertas from '../../components/CarouselOfertas/CarouselOfertas';
import Overlay from '../../components/Overlay/Overlay';

function Landing() {
  const dispatch = useDispatch();
  const history = useHistory();
  dispatch(selectCategory());

  const searchByName = (name) => {
    dispatch(getProductsByName(name));
    history.push('/home');
  };


  useEffect(() => {
    dispatch(getProducts());// eslint-disable-next-line
  }, []);
  // =======
  // useEffect(() => {
  //   dispatch(getProducts());// eslint-disable-next-line
  // }, []);
  // >>>>>>> 31f2d69718a257250885598e10595e6ca7e6f995

  return (
    <div className='landing' style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar
        searchByName={searchByName}
      />
      <CarouselOfertas></CarouselOfertas>
      <br />
      <Button onClick={() => history.push('/home')} className='button'>{`Ir a comprar ➔`}</Button>
      <Container>
        {/* <Row className='offer-image'>
        <Col xs={6} md={4} lg={4}>
          <Image src="OfertaSMH.jpg" className='image' thumbnail />
        </Col>
        <Col xs={6} md={4} lg={4}>
          <Image src="OfertaSMH.jpg" className='image' thumbnail />
        </Col>
        <Col xs={6} md={4} lg={4}>
          <Image src="OfertaSMH.jpg" className='image' thumbnail />
        </Col>
      </Row> */}

        {/* <Row className='offer-image'>
        <Col xs={9} lg={12}>
            <Image src="oferta3.jpg" className='image' thumbnail />
        </Col>
      </Row> */}

        <Row className='offer-image'>
          <Col className='image_container' xs={6} md={4} lg={4}>
            <Image src="oferta1.png" className='image' thumbnail />
          </Col>
          <Col className='image_container' xs={6} md={4} lg={4}>
            <Image src="oferta2.png" className='image' thumbnail />
          </Col>
          <Col className='image_container' xs={6} md={4} lg={4}>
            <Image src="oferta3.png" className='image' thumbnail />
          </Col>
        </Row>
      </Container>
      <Overlay />
      <Footer />
    </div>
  )
}

export default Landing

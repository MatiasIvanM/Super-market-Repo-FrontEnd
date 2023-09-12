// import CardFooter from 'react-bootstrap/CardFooter'

import { Nav } from 'react-bootstrap' 

//Footer con el about, preguntas frecuentes, como comprar?  contactanos (mail),
const Footer = () => {
  return (
    <div className='Footer'>
       <Nav className="justify-content-center custom-footer" activeKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-1" href='/about'>Sobre Nosotros</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" href='/'>Preguntas frecuentes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" href='/'>Cómo comprar?</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4" href='/'>Contactanos!</Nav.Link>
        </Nav.Item>
      </Nav>
      <div>
        <p>© 2023 Copyright: PF-SuperMarket-Shop</p> 
      </div>
    </div>
  )
}

export {Footer};


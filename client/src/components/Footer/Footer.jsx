// import CardFooter from 'react-bootstrap/CardFooter'

import { Nav } from 'react-bootstrap' 
import style from './Footer.module.css'

//Footer con el about, preguntas frecuentes, como comprar?  contactanos (mail),
const Footer = () => {
  return (
    <div /* className='Footer' */ className={style.custom_footer}>
       <Nav className="justify-content-center custom-footer" activeKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-1" href='/about'>Sobre Nosotros</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" href='/FaQ'>Preguntas frecuentes</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link eventKey="link-3" href='/'>Cómo comprar?</Nav.Link>
        </Nav.Item> */}
        {/* <Nav.Item>
          <Nav.Link eventKey="link-4" href='/'>Contactanos!</Nav.Link>
        </Nav.Item> */}
      </Nav>
      <div className={style.subFooter}>
        <p>© 2023 Copyright: PF-SuperMarket-Shop</p> 
        </div>
    </div>
  )
}

export {Footer};
import { Container, Nav, Navbar, Modal, Alert } from 'react-bootstrap'
import style from './NavBar.module.css';

const BarBanned = () => {
  return (
    <Navbar className={style.barBanned}>
        {/* <h7>  */}
            Su cuenta ha sido suspendida temporalmente debido a alguna actividad sospechosa. Si consideras que esto es un error escribenos a{": _"}  <a href="mailto:_quejas@supermarket.com" className={style.link}>quejas@supermarket.com</a>
        {/* </h7> */}
        
    </Navbar>
  )
}

export default BarBanned
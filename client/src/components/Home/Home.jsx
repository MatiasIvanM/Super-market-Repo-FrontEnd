import Nav from 'react-bootstrap/Nav';
import styles from './Home.module.css'
import CardProducto from '../CardProducto/CardProducto'
import products from '../../data'
import NavBar from '../NavBar/NavBar';

export default function Home() {

    return (
        <div className='Home'>
        <NavBar/>
        <div className={styles.container}>

            <Nav className={styles.side_bar}>
                <Nav.Item>
                    Filtrado
                </Nav.Item>
                <Nav.Item>
                    Ordenamientos
                </Nav.Item>
                <Nav.Item>
                    {/* <input type="number" placeholder='Min' style={{ width: '30%' }} />
                    <span> - </span>
                    <input type="number" placeholder='Max' style={{ width: '30%' }} /> */}
                </Nav.Item>
            </Nav>

            <div className={styles.card_container}>
                {products.map(p => (
                    <CardProducto
                        id = {p.id}
                        name = {p.name}
                        image = {p.image}
                        description={p.description}
                        price = {p.price}
                        rating='5'
                    >
                    </CardProducto>
                ))}
            </div>

        </div >
        </div>
    )
}
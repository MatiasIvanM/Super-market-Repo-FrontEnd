import Nav from 'react-bootstrap/Nav';
import styles from './Home.module.css'
import CardProducto from '../CardProducto/CardProducto'

const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

export default function Home() {
    return (
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
                        name='Ginger Dog'
                        image='https://tn.com.ar/resizer/y7Fcx0So5EmMClVjrGtd4ry-BGQ=/1440x0/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/artear/7KN3BQZPQNEBZGRAFJJ43NO6IE.jpg'
                        description='This amazing dog will keep the rich people away of the wetlands'
                        price='666,66'
                        rating='5'
                    >
                    </CardProducto>
                ))}
            </div>

        </div >
    )
}
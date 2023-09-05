import Nav from 'react-bootstrap/Nav';
import styles from './Home.module.css'
import CardProducto from '../CardProducto/CardProducto'
//import products from '../../data'
import NavBar from '../NavBar/NavBar';
import {Footer} from '../Footer/Footer';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getProductsByName} from '../../redux/Actions/actionsProducts'


export default function Home() {
    const dispatch = useDispatch();
    let products = useSelector((state) => state.products);
    let productsByName=useSelector((state)=>state.productsByName);

    const [productsMod, setProductsMod] = useState([]);

    const searchByName = (name) => {
        if (name.length === 0) {
            setProductsMod([...products]);
        } else {
          dispatch(getProductsByName(name));
        }
      };

    useEffect(() => {
        setProductsMod(products);
      }, [products]);

      useEffect(() => {
        if (productsByName.length > 0) {
            setProductsMod([...productsByName]);
        }
      }, [productsByName]);

      if (products.length === 0) {
        return <div>
           <h2>Cargando...</h2>
        </div>;
      }

    return (

        <div className='Home'>
        <NavBar
        searchByName={searchByName}
        />
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
                {productsMod.map(p => (
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
        </div>
        <Footer/>
        </div>
    )
}
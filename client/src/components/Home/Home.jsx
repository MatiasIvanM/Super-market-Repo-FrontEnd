import Nav from 'react-bootstrap/Nav';
import styles from './Home.module.css'
import CardProducto from '../CardProducto/CardProducto'
//import products from '../../data'
import NavBar from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, getProducts } from '../../redux/Actions/actionsProducts';


export default function Home() {
    const dispatch = useDispatch();
    let products = useSelector((state) => state.productsFiltered);

    const [productsCont, setProductsCon] = useState([]);
    const [aux, setAux] = useState(false);


    useEffect(() => {
        setProductsCon(products);
    }, [products]);

    if (products.length === 0) {
        return <div>
            <h2>Cargando...</h2>
        </div>;
    }

    const handleFilterByCategory = (event) => {
        dispatch(filterByCategory(event.target.value)); //Santi esta |action no ha sido creada, pero si esta en el reducer
        if (aux) setAux(true);
        else setAux(false);
    };

    return (

        <div className='Home'>
            <NavBar />
            <div className={styles.container}>

                <Nav className={styles.side_bar}>
                    <Nav.Item>
                        <select name='category' id='category' onChange={handleFilterByCategory}>
                            <option value="Todas">Todas</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Aceites y Aderezos">Aceites y Aderezos</option>
                            <option value="Arroz y Legumbres">Arroz y Legumbres</option>
                            <option value="Frutas y Verduras">Frutas y Verduras</option>
                            <option value="Panadería">Panadería</option>
                        </select>
                    </Nav.Item>
                    <Nav.Item>
                        {/* <input type="number" placeholder='Min' style={{ width: '30%' }} />
                    <span> - </span>
                    <input type="number" placeholder='Max' style={{ width: '30%' }} /> */}
                    </Nav.Item>
                </Nav>

                <div className={styles.card_container}>
                    {productsCont.map(p => (
                        <CardProducto
                            id={p.id}
                            name={p.name}
                            image={p.image}
                            description={p.description}
                            price={p.price}
                            rating='5'
                        >
                        </CardProducto>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

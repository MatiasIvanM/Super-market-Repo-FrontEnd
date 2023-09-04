import Nav from 'react-bootstrap/Nav';
import styles from './Home.module.css'
import CardProducto from '../CardProducto/CardProducto'
//import products from '../../data'
import NavBar from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, orderPrecio, getProductsByName } from '../../redux/Actions/actionsProducts';


export default function Home() {
    const dispatch = useDispatch();
    let products = useSelector((state) => state.productsFiltered);
    let productsByName = useSelector((state) => state.productsByName);
    const [productsMod, setProductsMod] = useState([]);
    const [filters, setFilters] = useState({
        category: false,
        price: false,
    });

    const searchByName = (name) => {
        if (name.length === 0) {
            setProductsMod([...products]);
        } else {
            dispatch(getProductsByName(name));
        }
    };

    const handleChange = (event) => {
        const property = event.target.name
        const value = event.target.value
        setFilters({ ...filters, [property]: value })
    }

    const applyFilters = () => {
        filters.category && dispatch(filterByCategory(filters.category));
        filters.price && dispatch(orderPrecio(filters.price));
    }

    useEffect(() => {
        setProductsMod(products);
    }, [products]);

    useEffect(() => {
        if (productsByName.length > 0) {
            setProductsMod([...productsByName]);
        }
    }, [productsByName]);

    useEffect(() => {
        applyFilters()
    }, [filters]);

    if (products.length === 0) {
        return <div>
            <h2>Cargando...</h2>
        </div>;
    }

    return (

        <div className={styles.home}>
            <NavBar
                searchByName={searchByName}
            />
            <div className={styles.container}>

                <Nav className={styles.side_bar}>
                    <Nav.Item>
                        <select name='category' id='category' onChange={handleChange}>
                            <option value="Todas">Todas</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Aceites y Aderezos">Aceites y Aderezos</option>
                            <option value="Arroz y Legumbres">Arroz y Legumbres</option>
                            <option value="Frutas y Verduras">Frutas y Verduras</option>
                            <option value="Panadería">Panadería</option>
                        </select>
                    </Nav.Item>
                    <Nav.Item>
                        <select name='price' id='price' onChange={handleChange}>
                            <option value="None"></option>
                            <option value="MIN-max">MIN-max</option>
                            <option value="MAX-min">MAX-min</option>
                        </select>
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
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            image={p.image}
                            description={p.description}
                            price={p.price}
                            rating='5'
                        >
                        </CardProducto>
                    ))}
                </div >
            </div >
            <Footer />
        </div>
    )
}

import Nav from 'react-bootstrap/Nav';
import styles from './Home.module.css'
import CardProducto from '../../components/CardProducto/CardProducto'
//import products from '../../data'
import NavBar from '../../components/NavBar/NavBar';
import { Footer } from '../../components/Footer/Footer';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, orderPrecio, getProductsByName, rangoPrecios } from '../../redux/Actions/actionsProducts';


export default function Home() {
    const dispatch = useDispatch();
    let products = useSelector((state) => state.productsFiltered);
    let productsByName = useSelector((state) => state.productsByName);
    const defaultFilters = { category: 'Todas', price: false, priceRange: { min: 0, max: 0 }, }
    const [productsMod, setProductsMod] = useState([]);
    const [filters, setFilters] = useState(defaultFilters);

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

    const setPriceRange = (event) => {
        const property = event.target.name
        let value = Number(event.target.value)
        if (!value || value < 0) value = 0;
        setFilters({ ...filters, priceRange: { ...filters.priceRange, [property]: value } })
    }

    const applyFilters = () => {
        if (filters.category) dispatch(filterByCategory(filters.category));
        if (filters.price) dispatch(orderPrecio(filters.price));
        if (filters.priceRange.min >= 0 && filters.priceRange.max > 0) {
            dispatch(rangoPrecios(filters.priceRange))
        }
    }

    const clearFilters = () => {
        setFilters(defaultFilters)
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

    // if (products.length === 0) {
    //     return <div>
    //         <h2>Cargando...</h2>
    //     </div>;
    // }

    return (

        <div className={styles.home}>
            <NavBar
                searchByName={searchByName}
            />
            <div className={styles.container}>

                <Nav className={styles.side_bar}>
                    <Nav.Item>
                        Categorías
                        <select name='category' id='category' value={filters.category} onChange={handleChange}>
                            <option value="Todas">Todas</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Aceites y Aderezos">Aceites y Aderezos</option>
                            <option value="Arroz y Legumbres">Arroz y Legumbres</option>
                            <option value="Frutas y Verduras">Frutas y Verduras</option>
                            <option value="Panadería">Panadería</option>
                        </select>
                    </Nav.Item>
                    <Nav.Item>
                        Ordenar por Precio
                        <select name='price' id='price' value={filters.price} onChange={handleChange}>
                            <option value="None"></option>
                            <option value="MIN-max">min-MAX</option>
                            <option value="MAX-min">MAX-min</option>
                        </select>
                    </Nav.Item>
                    <Nav.Item>
                        Rango de Precios
                        <input
                            onChange={setPriceRange}
                            name='min' type="number"
                            value={filters.priceRange.min}
                            style={{ width: '30%' }} />
                        <span> Hasta </span>
                        <input
                            onChange={setPriceRange}
                            name='max' type="number"
                            value={filters.priceRange.max}
                            style={{ width: '30%' }} />
                    </Nav.Item>
                    <Nav.Item>
                        <button onClick={clearFilters}>Limpiar Filtros</button>
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
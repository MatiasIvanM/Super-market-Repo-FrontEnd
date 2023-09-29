import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";
import styles from './Home.module.css'
import CardProducto from '../../components/CardProducto/CardProducto'
//import products from '../../data'
import NavBar from '../../components/NavBar/NavBar';
import { Footer } from '../../components/Footer/Footer';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, orderPrecio, getProductsByName, rangoPrecios, getProducts } from '../../redux/Actions/actionsProducts';
import { selectCategory } from '../../redux/Actions/actionsCategory';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadGif from '../../components/Loading/shopping-cart-shopping.gif'
import Overlay from '../../components/Overlay/Overlay';
import ScrollTop from '../../components/ScrollTop/ScrollTop';


export default function Home() {
    const dispatch = useDispatch();
    let products = useSelector((state) => state.productsFiltered);
    let productsByName = useSelector((state) => state.productsByName);
    const ITEMS_PER_PAGE = 15;
    const defaultFilters = { category: 'Todas', price: "seleccionar", priceRange: { min: 0, max: 0 }, }
    const [productsMod, setProductsMod] = useState([]);
    const [filters, setFilters] = useState(defaultFilters);
    const [currentPage, setCurrentPage] = useState(0);
    const [items, setItems] = useState([]);
    const [customer, setCustomer] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    let customerById = useSelector((state) => state.customerId)
    let categories = useSelector((state) => state.category)
    useEffect(() => {
        setCustomer(customerById.id)
    }, [customer]);

    // useEffect(() => {
    //     console.log(customer, "Customer22222");
    //   }, [customer]);
    const nextHandler = () => {
        setShowLoader(true);

        setTimeout(() => {
            const totalElements = productsMod.length;
            const nextPage = currentPage + 1;
            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (firstIndex >= totalElements) {
                setShowLoader(false);
                return;
            }

            setItems(items.concat([...productsMod].splice(firstIndex, ITEMS_PER_PAGE)));
            setCurrentPage(nextPage);
            setShowLoader(false);
        }, 2000);
    };

    // const prevHandler = () => {
    //     const prevPage = currentPage - 1;
    //     if (prevPage < 0) return;
    //     const firstIndex = prevPage * ITEMS_PER_PAGE;

    //     setItems([...productsMod].splice(firstIndex, ITEMS_PER_PAGE));
    //     setCurrentPage(prevPage);
    // };


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
        setCurrentPage(0)
    }

    const clearFilters = () => {
        setFilters(defaultFilters)
        setCurrentPage(0)
    }


    useEffect(() => {
        setItems([...productsMod].splice(0, ITEMS_PER_PAGE));
    }, [productsMod]);


    useEffect(() => {
        setProductsMod(products);
    }, [products]);

    useEffect(() => {
        if (productsByName.length > 0) {
            setProductsMod([...productsByName]);
        }
    }, [productsByName]);

    useEffect(() => {
        applyFilters()// eslint-disable-next-line
    }, [filters]);

    useEffect(() => {
        dispatch(getProducts());// eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(selectCategory());// eslint-disable-next-line
    }, []);

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
            {/* <div className={styles.pageButton}>
                <Button variant="primary" style={{ width: '110px' }} onClick={prevHandler}> {"< Anterior"} </Button>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<h5>{currentPage + 1}</h5> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="primary" style={{ width: '110px' }} onClick={nextHandler}> {"Siguiente >"} </Button>
            </div> */}

            <div className={styles.container}>

                <Nav className={styles.side_bar}>
                    <div className={styles.filters_group}>
                        <Nav.Item className={styles.filter_container}>
                            <p className={styles.filter}>Categorías </p>
                            <select className={styles.select} name='category' value={filters.category} onChange={handleChange}>
                                <option value="Todas">Todas</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </Nav.Item>
                        <Nav.Item className={styles.filter_container}>
                            <p className={styles.filter}>Ordenar por</p>
                            <select className={styles.select} name='price' id='price' value={filters.price} onChange={handleChange}>
                                <option selected disabled style={{ fontStyle: 'italic' }} value='seleccionar'>...seleccionar</option>
                                <option value="ofertas">Mejores ofertas</option>
                                <option value="MIN-max">Menor precio</option>
                                <option value="MAX-min">Mayor pecio</option>
                            </select>
                        </Nav.Item >
                        <Nav.Item className={styles.filter_container}>
                            <p className={styles.filter}>Rango de Precios </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    onChange={setPriceRange}
                                    name='min' type="text"
                                    value={filters.priceRange.min > 0 ? filters.priceRange.min : ''}
                                    placeholder='min'
                                    className={styles.input} />
                                <input
                                    onChange={setPriceRange}
                                    name='max' type="text"
                                    placeholder='max'
                                    value={filters.priceRange.max > 0 ? filters.priceRange.max : ''}
                                    className={styles.input} />
                            </div>
                        </Nav.Item>
                    </div>
                    <Nav.Item>
                        {/* <button onClick={clearFilters}>Limpiar Filtros</button> */}
                        <Button size='sm' className={styles.clear_button} onClick={clearFilters}> Limpiar Filtros </Button>
                    </Nav.Item>
                </Nav>
                {/*<div className={styles.card_container}>
</div >*/}

                <InfiniteScroll
                    dataLength={items.length} // Tamaño actual de la lista de productos
                    next={nextHandler} // Función a ejecutar cuando se necesita cargar más productos
                    hasMore={true} // Indica si hay más productos por cargar (puede cambiarlo según tu lógica)
                    loader={showLoader ? <img className={styles.load_gif} src={LoadGif} alt="Cargando..." /> : null}
                    className={styles.card_container}
                >
                    {items.map(p => (
                        <CardProducto
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            image={p.image}
                            description={p.description}
                            price={p.price}
                            stock={p.stock}
                            discount={p.discount}
                            available={p.available}
                        >
                        </CardProducto>
                    ))}
                </InfiniteScroll>
                <ScrollTop></ScrollTop>
                <Overlay></Overlay>
            </div >
            <Footer />
        </div>
    )
}
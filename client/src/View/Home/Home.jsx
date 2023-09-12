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
import { Container, Dropdown, DropdownButton, FormControl, Navbar, } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Home() {
    const dispatch = useDispatch();
    let products = useSelector((state) => state.productsFiltered);
    let productsByName = useSelector((state) => state.productsByName);
    const ITEMS_PER_PAGE = 10;
    const defaultFilters = { category: 'Todas', price: false, priceRange: { min: 0, max: 0 }, }
    const [productsMod, setProductsMod] = useState([]);
    const [filters, setFilters] = useState(defaultFilters);
    const [currentPage, setCurrentPage] = useState(0);
    const [items, setItems] = useState([]);

    const nextHandler = () => {
        const totalElements = productsMod.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * ITEMS_PER_PAGE;

        if (firstIndex >= totalElements) return;

        setItems([...productsMod].splice(firstIndex, ITEMS_PER_PAGE));
        setCurrentPage(nextPage);
    };

    const prevHandler = () => {
        const prevPage = currentPage - 1;
        if (prevPage < 0) return;
        const firstIndex = prevPage * ITEMS_PER_PAGE;

        setItems([...productsMod].splice(firstIndex, ITEMS_PER_PAGE));
        setCurrentPage(prevPage);
    };


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
            <div className={styles.pageButton}>
                <Button variant="primary" style={{ width: '110px' }} onClick={prevHandler}> {"< Anterior"} </Button>
                {/* <button  onClick={prevHandler}>
            {"<-Prev"}
        </button> */}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<h5>{currentPage + 1}</h5> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="primary" style={{ width: '110px' }} onClick={nextHandler}> {"Siguiente >"} </Button>
                {/* <button  onClick={nextHandler}>
            {"Next->"}
          </button> */}
            </div>

            <div className={styles.container}>

                <Navbar bg='white' className='h-100 rounded-1 d-flex flex-column gap-2' style={{ maxWidth: '20rem' }}>
                    <Container>
                        <Dropdown>
                            <DropdownButton variant='outline-secondary' title={`Categorías`} onSelect={handleChange}>
                                <Dropdown.Item eventKey="category-Todas">Todas las Categorías</Dropdown.Item>
                                <Dropdown.Divider></Dropdown.Divider>
                                <Dropdown.Item eventKey="category-Bebidas">Bebidas</Dropdown.Item>
                                <Dropdown.Item eventKey="category-Aceites y Aderezos">Aceites y Aderezos</Dropdown.Item>
                                <Dropdown.Item eventKey="category-Arroz y Legumbres">Arroz y Legumbres</Dropdown.Item>
                                <Dropdown.Item eventKey="category-Frutas y Verduras">Frutas y  Verduras</Dropdown.Item>
                                <Dropdown.Item eventKey="category-Panadería">Panadería</Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </Container>
                    <Container>
                        <Dropdown>
                            <DropdownButton variant='outline-secondary' title={`Ordenar por precios`} onSelect={handleChange}>
                                <Dropdown.Item eventKey="price-Ninguno">Ninguno</Dropdown.Item>
                                <Dropdown.Divider></Dropdown.Divider>
                                <Dropdown.Item eventKey="price-Menor Precio">Menor precio</Dropdown.Item>
                                <Dropdown.Item eventKey="price-Mayor Precio">Mayor precio</Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </Container>
                    <Container>
                        <InputGroup>
                            <InputGroup.Text className='text-secondary'>$</InputGroup.Text>
                            <FormControl
                                className=''
                                value={filters.priceRange.min}
                                name='min'
                                onChange={setPriceRange}
                                style={{ maxWidth: '3rem', }}
                                size='sm'
                                placeholder='min'
                            />
                            <FormControl
                                value={filters.priceRange.max}
                                name='max'
                                onChange={setPriceRange}
                                style={{ maxWidth: '3rem', }}
                                size='sm'
                                placeholder='max'
                            />
                            <Button variant='outline-secondary'>{'>'}</Button>
                        </InputGroup>
                    </Container>
                    <Container>
                        <Button variant='outline-secondary' size='sm' onClick={clearFilters}>Limpiar Filtros</Button>
                    </Container>
                </Navbar>

                <div className={styles.card_container}>

                    {items.map(p => (
                        <CardProducto
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            image={p.image}
                            description={p.description}
                            price={p.price}
                            stock={p.stock}
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

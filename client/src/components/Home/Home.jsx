import Nav from 'react-bootstrap/Nav';
import styles from './Home.module.css'
import CardProducto from '../CardProducto/CardProducto'
import products from '../../data'
import NavBar from '../NavBar/NavBar';
import {Footer} from '../Footer/Footer'


import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
// import { filterByCategory } from '../../redux/actionsType'


export default function Home() {

    const dispatch = useDispatch();
    const [aux, setAux] = useState(false);

    const handleFilterByCategory = (event) => {
        // dispatch(filterByCategory(event.target.value)); //Santi esta |action no ha sido creada, pero si esta en el reducer
        if (aux) setAux(true);
        else setAux(false);
      };

    return (
        <div className='Home'>
        <NavBar/>
        <div className={styles.container}>
            
            <Nav className={styles.side_bar}>
                <h5>FILTRAR & ORDENAR</h5>
                <Nav.Item>
                    <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home">Filtrar </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Categoria" id="basic-nav-dropdown" onChange={handleFilterByCategory}>
                                <NavDropdown.Item href="Todas">Todas</NavDropdown.Item>
                                {   products.map((produc)=>{
                                        // console.log(produc.categories);
                                        return <NavDropdown.Item href={produc.categories} key = {produc.id}>{produc.categories}</NavDropdown.Item>
                                    })
                                }
                                <NavDropdown.Item href="ult">ult</NavDropdown.Item>
                            {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
                </Nav.Item>
                <Nav.Item>
                    <h6>Precio</h6>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">MIN</InputGroup.Text>
                            <Form.Control
                            aria-label="MIN"
                            aria-describedby="inputGroup-sizing-sm"
                            />
                            {" "}
                            <InputGroup.Text id="inputGroup-sizing-sm">MAX</InputGroup.Text>
                            <Form.Control
                            aria-label="MAX"
                            aria-describedby="inputGroup-sizing-sm"
                            />
                        </InputGroup>
                    </Nav.Item>
                <hr />
                    <h5>Ordenar</h5>
                    <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home">Precio </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Selecciona" id="basic-nav-dropdown">
                                <NavDropdown.Item href="minPrecio">MIN</NavDropdown.Item>
                                <NavDropdown.Item href="maxPecio">max</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
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
        </div>
        <Footer/>
        </div>
    )
}

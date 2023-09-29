import Button from 'react-bootstrap/Button';
import { InputGroup, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// eslint-disable-next-line
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerByEmail, getCustomerById, loginCustomer, addCustomer } from '../../redux/Actions/actionsCustomers';
import { addShoppingCart } from '../../redux/Actions/actionsSC';
import { useAuth0 } from "@auth0/auth0-react";
import * as validate from './validations';
import { PiWarning } from 'react-icons/pi'
import styles from './Register.module.css'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Overlay from '../../components/Overlay/Overlay';
import { Footer } from '../../components/Footer/Footer';


export default function Register() {
    const { loginWithPopup, isAuthenticated, user, getIdTokenClaims, logout } = useAuth0()
    const dispatch = useDispatch()
    const history = useHistory()
    let customerById = useSelector((state) => state.customerId)

    const defaultCustomer = {
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        role: "user",
        provider: "local"
    }
    const [customer, setCustomer] = useState(defaultCustomer)
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
    })
    const [modal, setModal] = useState({
        show: false,
        header: "",
        body: "",
        button: ""
    })

    function handleChange(event) {
        const property = event.target.name
        const value = event.target.value
        setCustomer({ ...customer, [property]: value })
        setErrors(validate[property](value))
    }

    function checkErrors() {
        for (const err in errors) {
            if (errors[err] !== '') {
                return true
            }
        }
        return false
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const provider = event.target.name
        if (provider === 'local') {
            if (Object.values(customer).every(d => d !== '') === false && checkErrors() === false) {
                setModal({
                    show: true,
                    header: 'Ups!',
                    body: 'Datos Incorrectos',
                    button: 'danger',
                })
            } else {
                dispatchCustomer()
            }
        }
        if (provider === 'google') {
            loginWithPopup()
        }
    }

    function handleModalButton() {
        setModal({ ...modal, show: false })
        if (JSON.parse(localStorage.getItem('customer'))) {
            history.push('/home')
        } else {
            localStorage.clear()
            if (isAuthenticated) logout({ logoutParams: { returnTo: window.location } })
        }
    }

    async function dispatchCustomer() {
        if (customer.name && customer.email) {
            const response = await dispatch(addCustomer(customer))
            if (response?.payload) {

                if (response.payload.error) {
                    setModal({
                        show: true,
                        header: 'Ups!',
                        body: 'El email ya está registrado',
                        button: 'danger',
                    })
                } else {
                    if (customer.provider === 'local') {
                        const loggedCustomer = await dispatch(loginCustomer({ email: customer.email, password: customer.password }))
                        if (loggedCustomer?.payload) {
                            if (loggedCustomer.payload.error) {
                                setModal({
                                    show: true,
                                    header: 'Ups!',
                                    body: 'Email o contraseña incorrecta',
                                    button: 'danger',
                                })
                            } else {
                                localStorage.setItem('customer', JSON.stringify({
                                    id: response.payload.id,
                                    name: loggedCustomer.payload.name,
                                    email: loggedCustomer.payload.email,
                                    role: loggedCustomer.payload.role,
                                }))

                                ////Crea Carrito////
                                // await dispatch(getCustomerById(response.payload.id))
                                const carrito = await dispatch(addShoppingCart({ ProductName: [], PriceTotal: 0.0, customerId: response.payload.id }))
                                console.log(carrito);
                                ///////////////////

                                localStorage.setItem('token', JSON.stringify(loggedCustomer.payload.token))
                                await dispatch(getCustomerById(response.payload.id))
                                setModal({
                                    show: true,
                                    header: 'Bienvenido',
                                    body: 'Usuario Registrado',
                                    button: 'success',
                                })
                            }
                        }
                    }
                    if (customer.provider === 'google') {
                        const claims = await getIdTokenClaims()
                        localStorage.setItem('token', JSON.stringify(claims.__raw))
                        const dbCustomer = await dispatch(getCustomerByEmail(claims.email))
                        if (dbCustomer) {
                            localStorage.setItem('customer', JSON.stringify({
                                id: dbCustomer.payload[0].id,
                                name: dbCustomer.payload[0].name,
                                email: dbCustomer.payload[0].email,
                                role: dbCustomer.payload[0].role,
                            }))

                            ////Crea Carrito////
                            // await dispatch(getCustomerById(dbCustomer.payload[0].id))
                            const carrito = await dispatch(addShoppingCart({ ProductName: [], PriceTotal: 0.0, customerId: dbCustomer.payload[0].id }))
                            console.log(carrito)
                            ///////////////////

                            setModal({
                                show: true,
                                header: 'Bienvenido',
                                body: 'Usuario Registrado',
                                button: 'success',
                            })
                        } else {
                            setModal({
                                show: true,
                                header: 'Error!',
                                body: 'Algo salió mal',
                                button: 'danger',
                            })
                        }
                    }
                    //creacion del carrito 
                    console.log(customerById)
                    console.log(response)

                }
            } else {
                setModal({
                    show: true,
                    header: 'Error!',
                    body: 'Algo salió mal',
                    button: 'danger',
                })
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            setCustomer({
                name: user.name,
                email: user.email,
                address: "sin definir",
                phone: "sin definir",
                password: "sin definir",
                role: "user",
                provider: "google"
            })
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (isAuthenticated) {
            dispatchCustomer()
        }
    }, [customer.provider])

    useEffect(() => {
        localStorage.getItem('customer') && history.push('/home')
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'space-between'
        }}>
            <div style={{ alignSelf: 'center' }}>
                <Form style={{
                    width: 'fit-content',
                    alignSelf: 'center',
                    border: '0.1rem grey solid',
                    borderRadius: '10px',
                    padding: '1rem',
                    margin: '2rem 0rem 1rem 0rem',
                    boxShadow: '4px 4px 8px 1px grey',
                    background: 'linear-gradient(60deg, rgb(200,200,200), rgb(255,255,255))'
                }}>
                    <div>
                        <img style={{
                            width: '10rem',
                            marginBottom: '0.6rem',
                            filter: 'drop-shadow(1px 1px 1px grey)'
                        }}
                            src="logo.png"
                            alt="logo"
                        />
                    </div>
                    {errors?.name && <span className={styles.errorMessage}><PiWarning /><span>{errors.name}</span></span>}
                    <InputGroup className="mb-3" id="formBasicEmail">
                        <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
                        <Form.Control name='name' type="text" placeholder="Ingresa tu nombre" onChange={handleChange} />
                    </InputGroup>
                    {errors?.email && <span className={styles.errorMessage}><PiWarning /><span>{errors.email}</span></span>}
                    <InputGroup className="mb-3" id="formBasicPassword">
                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        <Form.Control name='email' type="email" placeholder="Ingresa tu email" onChange={handleChange} />
                    </InputGroup>
                    {errors?.address && <span className={styles.errorMessage}><PiWarning /><span>{errors.address}</span></span>}
                    <InputGroup className="mb-3" id="formBasicPassword">
                        <InputGroup.Text id="basic-addon1">Dirección</InputGroup.Text>
                        <Form.Control name='address' type="text" placeholder="Ingresa tu dirección" onChange={handleChange} />
                    </InputGroup>
                    {errors?.phone && <span className={styles.errorMessage}><PiWarning /><span>{errors.phone}</span></span>}
                    <InputGroup className="mb-3" id="formBasicPassword">
                        <InputGroup.Text id="basic-addon1">Teléfono</InputGroup.Text>
                        <Form.Control name='phone' type="text" placeholder="Ingresa tu teléfono" onChange={handleChange} />
                    </InputGroup>
                    {errors?.password && <span className={styles.errorMessage}><PiWarning /><span>{errors.password}</span></span>}
                    <InputGroup className="mb-3" id="formBasicPassword">
                        <InputGroup.Text id="basic-addon1">Contraseña</InputGroup.Text>
                        <Form.Control name='password' type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} />
                    </InputGroup>
                    <Button style={{ width: '100%' }} name='local' variant="primary" type="submit" onClick={handleSubmit}>
                        Crear cuenta nueva
                    </Button>
                    <hr width='100%' />
                    <Button name='google' variant="success" type="submit" onClick={handleSubmit}>
                        Usar mi cuenta de Google
                    </Button>
                </Form>
                <p>Ya tenés cuenta? <a href='/login' style={{ cursor: 'pointer', textDecoration: 'none' }}>Iniciar sesión</a></p>
                <Button style={{ width: 'fit-content', alignSelf: 'center' }} as={Link} to='/home' variant='secondary' size='sm'>Volver al inicio</Button>
            </div>
            <br />
            {/* <Footer /> */}
            <Modal show={modal.show}>
                <Modal.Body className={styles.modal}>
                    <Modal.Header>
                        <Modal.Title style={{
                            color: modal.button === 'danger'
                                ?
                                '#dc3545'
                                :
                                '#198754'
                            ,
                            fontSize: '4rem',
                            fontStyle: 'italic'
                        }}
                        >
                            {modal.header}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modal.body}</Modal.Body>
                    <Modal.Footer>
                        <Button variant={modal.button} onClick={handleModalButton}>
                            Aceptar
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
            <Overlay />
            <Footer></Footer>
        </div>
    )
}
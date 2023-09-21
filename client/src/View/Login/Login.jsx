import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { InputGroup } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from 'react-router-dom'
import { PiWarning } from 'react-icons/pi'
import * as validate from './validations';
import styles from './Login.module.css'
import { getCustomerByEmail, getCustomerById, loginCustomer } from '../../redux/Actions/actionsCustomers';
import { useHistory } from 'react-router-dom'
import Overlay from '../../components/Overlay/Overlay';
import {getSC} from "../../redux/Actions/actionsSC"


export default function Register() {
    const { loginWithPopup, isAuthenticated, user, getIdTokenClaims } = useAuth0()
    const dispatch = useDispatch()
    const history = useHistory()
    let customerById = useSelector((state)=>state.customerId)

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
        email: "",
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

    async function handleSubmit(event) {
        event.preventDefault()
        const provider = event.target.name
        setErrors(validate['email'](customer.email))
        setErrors(validate['password'](customer.password))
        if (provider === "local") {
            if (customer.email === '' || customer.password === '' || checkErrors()) {
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
        }
    }

    function checkErrors() {
        for (const err in errors) {
            if (errors[err] !== '') {
                return true
            }
        }
        return false
    }

    async function dispatchCustomer() {
        if (customer.provider === 'local') {
            const response = await dispatch(loginCustomer({ email: customer.email, password: customer.password }))
            if (response?.payload) {
                if (response.payload.error) {
                    setModal({
                        show: true,
                        header: 'Ups!',
                        body: 'Email o contraseña incorrecta',
                        button: 'danger',
                    })
                } else {
                    localStorage.setItem('customer', JSON.stringify(response.payload))
                    await dispatch(getCustomerById(response.payload.id))
                    setModal({
                        show: true,
                        header: 'Sesión iniciada',
                        body: 'Bienvenido',
                        button: 'success',
                    })
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
        if (customer.provider === 'google') {
            const claims = await getIdTokenClaims()
            const dbCustomer = await dispatch(getCustomerByEmail(claims.email))
            localStorage.setItem('customer', JSON.stringify({ ...dbCustomer.payload[0], token: claims.__raw }))
            await dispatch(getCustomerById(dbCustomer.payload[0].id))
            setModal({
                show: true,
                header: 'Sesión iniciada',
                body: 'Bienvenido',
                button: 'success',
            })
        }
        // get del carrito
        if(customerById){
           await dispatch(getSC(customerById))
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
                    padding: '0.8rem',
                    margin: '5rem 0rem 1rem 0rem',
                    boxShadow: '4px 4px 8px 1px grey',
                    backgroundColor: 'white',
                    background: 'linear-gradient(60deg, rgb(200,200,200), rgb(255,255,255))'
                }}>

                    {errors?.email && <span className={styles.errorMessage}><PiWarning /><span>{errors.email}</span></span>}
                    <InputGroup className="mb-3" id="formBasicPassword">
                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        <Form.Control name='email' type="email" placeholder="Ingresa tu email" onChange={handleChange} />
                    </InputGroup>
                    {errors?.password && <span className={styles.errorMessage}><PiWarning /><span>{errors.password}</span></span>}
                    <InputGroup className="mb-3" id="formBasicPassword">
                        <InputGroup.Text id="basic-addon1">Contraseña</InputGroup.Text>
                        <Form.Control name='password' type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} />
                    </InputGroup>
                    <Button style={{ width: '100%' }} name="local" variant="primary" type="submit" onClick={handleSubmit}>
                        Iniciar sesión
                    </Button>
                    <hr width='100%' />
                    <Button name="google" variant="success" type="submit" onClick={handleSubmit}>
                        Continuar con Google
                    </Button>
                </Form>
                <p>No tenés cuenta? <a href='/register' style={{ cursor: 'pointer', textDecoration: 'none' }}>Crear cuenta nueva</a></p>
                <Button style={{ width: 'fit-content', alignSelf: 'center' }} as={Link} to='/home' variant='secondary' size='sm'>Volver al inicio</Button>
            </div>

            <br />
            {/* <Footer /> */}
            <Modal show={modal.show}>
                <Modal.Header>
                    <Modal.Title>{modal.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modal.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant={modal.button} onClick={handleModalButton}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Overlay />
        </div>
    )
}
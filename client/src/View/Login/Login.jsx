import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { InputGroup } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from 'react-router-dom'
import { PiWarning } from 'react-icons/pi'
import validate from './validations';
import styles from './Login.module.css'
import { getCustomerByEmail } from '../../redux/Actions/actionsCustomers';

export default function Register() {
    const { loginWithPopup, logout, isAuthenticated, user } = useAuth0()
    const dispatch = useDispatch()

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
        setErrors(validate({ ...customer, [property]: value }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const provider = event.target.name
        setErrors(validate({ ...customer }))
        if (provider === "local") {
            if (checkErrors()) {
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
    }

    function handleLogout() {
        isAuthenticated && logout()
        localStorage.clear()
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
        if (customer.email) {
            const response = await dispatch(getCustomerByEmail(customer.email))
            if (response?.payload) {
                if (response.payload[0].provider === 'local') {
                    if (response.payload[0].password === customer.password) {
                        localStorage.setItem('customer', JSON.stringify(response.payload[0]))
                        setModal({
                            show: true,
                            header: 'Usuario Logueado',
                            body: 'Bienvenido',
                            button: 'success',
                        })
                    } else {
                        setModal({
                            show: true,
                            header: 'Ups!',
                            body: 'Usuario o contraseña incorrectas',
                            button: 'danger',
                        })
                    }
                }
                if (response.payload[0].provider === 'google') {
                    localStorage.setItem('customer', JSON.stringify(response.payload[0]))
                    setModal({
                        show: true,
                        header: 'Usuario Logueado',
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
        setErrors(validate({ ...customer }))
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '335px',
            // border: '1px grey solid',
            borderRadius: '10px',
            // margin: '1rem 20rem 1rem 20rem',
            padding: '1rem 0rem 1rem 0rem',
        }}>
            <Form style={{
                border: '0.1rem grey solid',
                borderRadius: '10px',
                padding: '1rem',
                margin: '1rem 0rem 1rem 0rem'
            }}>
                <div>LOGUEATE</div>
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
                <Button name="local" variant="primary" type="submit" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
            <Button name="google" variant="primary" type="submit" onClick={handleSubmit}>
                Continuar con Google
            </Button>
            <br />
            <Button variant="success" type="submit" as={Link} to='/register'>
                Registrate
            </Button>
            <Modal show={modal.show}>
                <Modal.Header>
                    <Modal.Title>{modal.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modal.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant={modal.button} onClick={handleModalButton}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
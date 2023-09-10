import Button from 'react-bootstrap/Button';
import { InputGroup, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../../redux/Actions/actionsCustomers';
import { useAuth0 } from "@auth0/auth0-react";
import validate from './validations';
import { PiWarning } from 'react-icons/pi'
import styles from './Register.module.css'

export default function Register() {
    const { loginWithPopup, isAuthenticated, user } = useAuth0()
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
        setErrors(validate({ ...customer, [property]: value }))
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
        setErrors(validate({ ...customer }))
        if (provider === 'local') {
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

    async function dispatchCustomer() {
        if (customer.name && customer.email) {
            const response = await dispatch(addCustomer(customer))
            if (response?.payload) {
                localStorage.setItem('customer', JSON.stringify(response.payload))
                setModal({
                    show: true,
                    header: 'Usuario Registrado',
                    body: 'Bienvenido',
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
            border: '1px grey solid',
            borderRadius: '10px',
            margin: '1rem 20rem 1rem 20rem',
            padding: '1rem 0rem 1rem 0rem',
        }}>
            <Form style={{ width: '30rem' }}>
                <Form.Group>
                    <h1>REGISTRATE</h1>
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
                </Form.Group>
                <Button name='local' variant="primary" type="submit" onClick={handleSubmit}>
                    Registrar
                </Button>
                <span> O </span>
                <Button name='google' variant="success" type="submit" onClick={handleSubmit}>
                    Registrar con Google
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
            </Form>
        </div >
    )
}
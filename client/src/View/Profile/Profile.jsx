import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Overlay from '../../components/Overlay/Overlay';
import { getCustomerByEmail, getCustomerById, modCustomer } from '../../redux/Actions/actionsCustomers';
import * as validate from '../Register/validations'
import { PiWarning } from 'react-icons/pi'
import styles from './Profile.module.css'

export default function Profile() {
    const { logout, isAuthenticated } = useAuth0()
    const dispatch = useDispatch()
    const history = useHistory()
    const [edit, setEdit] = useState(true)
    const [customer, setCustomer] = useState()
    const [modal, setModal] = useState({
        show: false,
        header: "",
        body: "",
        button: ""
    })
    const [errors, setErrors] = useState({
        name: "",
        address: "",
        phone: "",
    })

    async function getCustomer() {
        const lsCustomer = JSON.parse(localStorage.getItem('customer'))
        const user = await dispatch(getCustomerByEmail(lsCustomer.email))
        localStorage.setItem('customer', JSON.stringify({
            id: user.payload[0].id,
            name: user.payload[0].name,
            email: user.payload[0].email,
            role: user.payload[0].role,
        }))
        setCustomer({ ...user.payload[0] })
    }

    function handleLogout() {
        localStorage.clear()
        if (isAuthenticated) {
            logout({ logoutParams: { returnTo: window.location.origin } })
        }
        else {
            history.push('/')
        }
    }

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

    async function handleEdit(event) {
        const button = event.target.name
        if (button === 'edit') {
            if (edit) {
                setEdit(false)
                event.target.className = 'btn btn-success btn-sm btn btn-primary'
            } else {
                getCustomer()
                setErrors({})
                setEdit(true)
                event.target.className = 'btn btn-secondary btn-sm btn btn-primary'
            }
        }
        if (button === 'save' && !edit) {
            if (checkErrors()) {
                setModal({
                    show: true,
                    header: 'Ups!',
                    body: 'Datos Incorrectos',
                    button: 'danger',
                })
            } else {
                const response = await dispatch(modCustomer(customer))
                if (response?.payload) {
                    getCustomer()
                    setModal({
                        show: true,
                        header: "Guardado",
                        body: "La información se guardó correctamente",
                        button: "success"
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
    }

    function handleModalButton() {
        setModal({ ...modal, show: false })
    }

    useEffect(() => {
        localStorage.getItem('customer') && getCustomer()
    }, [])

    useEffect(() => {
        !localStorage.getItem('customer') && history.push('/home')
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Card style={{
                margin: '3rem 0rem 2rem 0rem',
                background: 'linear-gradient(60deg, rgb(200,200,200), rgb(255,255,255))',
                boxShadow: '4px 4px 8px 1px grey',
                width: '30vw',
                minWidth: '370px',
            }}>
                <Card.Body>
                    <Card.Title>
                        <div className={styles.name}>{customer?.name}</div>
                    </Card.Title>
                    <Card.Subtitle>
                        <div>{customer?.email}</div>
                    </Card.Subtitle>
                    <hr with='100%' />
                    <Form style={{
                        padding: '0.8rem',
                        margin: '1rem 0rem 0rem 0rem'
                    }}
                        onChange={handleChange}
                    >
                        {errors?.name && !edit ? <span className={styles.errorMessage}><PiWarning /><span>{errors.name}</span></span> : <></>}
                        <p style={{ fontWeight: 'bold', fontSize: '0.8rem', margin: '0' }}>Nombre</p>
                        <InputGroup style={{ margin: '0rem 0rem 1rem 0rem' }}>
                            <Form.Control name='name' className='text-center' disabled={edit} value={customer?.name}></Form.Control>
                        </InputGroup>
                        {errors?.phone && !edit ? <span className={styles.errorMessage}><PiWarning /><span>{errors.phone}</span></span> : <></>}
                        <p style={{ fontWeight: 'bold', fontSize: '0.8rem', margin: '0' }}>Teléfono</p>
                        <InputGroup style={{ margin: '0rem 0rem 1rem 0rem' }}>
                            <Form.Control name='phone' className='text-center' disabled={edit} value={customer?.phone}></Form.Control>
                        </InputGroup>
                        {errors?.address && !edit ? <span className={styles.errorMessage}><PiWarning /><span>{errors.address}</span></span> : <></>}
                        <p style={{ fontWeight: 'bold', fontSize: '0.8rem', margin: '0' }}>Dirección</p>
                        <InputGroup style={{ margin: '0rem 0rem 0.5rem 0rem' }}>
                            <Form.Control name='address' className='text-center' disabled={edit} value={customer?.address}></Form.Control>
                        </InputGroup>
                        <Button name='edit' onClick={handleEdit} className='btn btn-secondary btn-sm btn btn-primary'>Editar</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <InputGroup>
                        <Button name='save' disabled={edit} style={{ margin: '0rem 0rem 0.3rem 0rem', width: '100%' }} variant='primary' onClick={handleEdit}>Guardar cambios</Button>
                    </InputGroup>
                    <Button style={{ width: '100%' }} variant='success' onClick={handleLogout}>Cerrar Sesión</Button>
                </Card.Footer>
            </Card>
            <Button as={Link} to='/home' variant='secondary' size='sm'>Volver al inicio</Button>
            <br />
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
        </div >
    )
}
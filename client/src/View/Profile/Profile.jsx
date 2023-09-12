import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Overlay from '../../components/Overlay/Overlay';
import { getCustomerByEmail } from '../../redux/Actions/actionsCustomers';

export default function Profile() {
    const { logout, isAuthenticated } = useAuth0()
    const dispatch = useDispatch()
    const history = useHistory()
    // const user = getCustomerById(JSON.parse(localStorage.getItem('customer').id))
    const [edit, setEdit] = useState(true)
    const [customer, setCustomer] = useState()
    const [modal, setModal] = useState({
        show: false,
        header: "",
        body: "",
        button: ""
    })

    async function getCustomer() {
        const email = JSON.parse(localStorage.getItem('customer')).email
        const user = await dispatch(getCustomerByEmail(email))
        setCustomer({
            name: user.payload[0].name,
            email: user.payload[0].email,
            phone: user.payload[0].phone,
            address: user.payload[0].address,
        })
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
    }

    function handleEdit(event) {
        const button = event.target.name
        if (button === 'edit') {
            if (edit) {
                setEdit(false)
                event.target.className = 'btn btn-success btn-sm btn btn-primary'
            } else {
                setEdit(true)
                event.target.className = 'btn btn-secondary btn-sm btn btn-primary'
            }
        }
        if (button === 'save' && !edit) {
            setModal({ ...modal, show: true })
        }
    }

    function handleModalButton() {
        setModal({ ...modal, show: false })
    }

    useEffect(() => {
        getCustomer()
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Card style={{
                margin: '5rem 0rem 2rem 0rem',
                background: 'linear-gradient(60deg, rgb(200,200,200), rgb(255,255,255))',
                boxShadow: '4px 4px 8px 1px grey',
            }}>
                <Card.Body>
                    <Card.Title>
                        <div>{customer?.name}</div>
                    </Card.Title>
                    <Card.Subtitle>
                        <div>{customer?.email}</div>
                    </Card.Subtitle>
                    <hr with='100%' />
                    <Form style={{
                        padding: '0.8rem',
                        margin: '1rem 0rem 0rem 0rem'
                    }}>
                        <InputGroup size='sm' style={{ margin: '0rem 0rem 1rem 0rem' }}>
                            <InputGroup.Text>Nombre</InputGroup.Text>
                            <Form.Control disabled={edit} placeholder={customer?.name}></Form.Control>
                        </InputGroup>
                        <InputGroup size='sm' style={{ margin: '0rem 0rem 1rem 0rem' }}>
                            <InputGroup.Text>Teléfono</InputGroup.Text>
                            <Form.Control disabled={edit} placeholder={customer?.phone}></Form.Control>
                        </InputGroup>
                        <InputGroup size='sm' style={{ margin: '0rem 0rem 0.5rem 0rem' }}>
                            <InputGroup.Text>Dirección</InputGroup.Text>
                            <Form.Control disabled={edit} placeholder={customer?.address}></Form.Control>
                        </InputGroup>
                        <Button name='edit' onClick={handleEdit} className='btn btn-secondary btn-sm btn btn-primary'>Editar</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <InputGroup>
                        <Button name='save' disabled={edit} style={{ margin: '0rem 0rem 0.3rem 0rem', width: '100%' }} variant='primary' onClick={handleEdit}>Guardar cambios</Button>
                    </InputGroup>
                    <Button style={{ width: '100%' }} variant='success' onClick={handleLogout}>Salir</Button>
                </Card.Footer>
            </Card>
            <Button as={Link} to='/home' variant='secondary' size='sm'>Volver al inicio</Button>
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
            <Overlay />
        </div >
    )
}
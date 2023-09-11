import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useState } from 'react';

export default function Profile() {
    const { logout, isAuthenticated } = useAuth0()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('customer'))
    const [edit, setEdit] = useState(true)

    function handleLogout() {
        localStorage.clear()
        if (isAuthenticated) {
            logout()
        } else {
            history.push('/home')
        }
    }

    function handleEdit(event) {
        if (edit) {
            setEdit(false)
            event.target.className = 'btn btn-success btn-sm btn btn-primary'
        } else {
            setEdit(true)
            event.target.className = 'btn btn-secondary btn-sm btn btn-primary'
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Card style={{
                margin: '5rem 0rem 1rem 0rem'
            }}>
                <Card.Body>
                    <Card.Title>
                        <div>{user.name}</div>
                    </Card.Title>
                    <Card.Subtitle>
                        <div>{user.email}</div>
                    </Card.Subtitle>
                    <Form style={{
                        padding: '0.8rem',
                        margin: '2rem 0rem 0rem 0rem'
                    }}>
                        <InputGroup style={{ margin: '0rem 0rem 1rem 0rem' }}>
                            <InputGroup.Text>Teléfono</InputGroup.Text>
                            <Form.Control disabled={edit} placeholder={user.phone}></Form.Control>
                        </InputGroup>
                        <InputGroup style={{ margin: '0rem 0rem 0.5rem 0rem' }}>
                            <InputGroup.Text>Dirección</InputGroup.Text>
                            <Form.Control disabled={edit} placeholder={user.address}></Form.Control>
                        </InputGroup>
                        <Button onClick={handleEdit} className='btn btn-secondary btn-sm btn btn-primary'>Editar</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button style={{ margin: '0rem 1rem 0rem 0rem' }} variant='primary' onClick={console.log("Guardo los cambios")}>Guardar cambios</Button>
                    <Button style={{ width: '0rem 0rem 0rem 1rem' }} variant='success' onClick={handleLogout}>Salir</Button>
                </Card.Footer>
            </Card>
            <Button as={Link} to='/home' variant='secondary' size='sm'>Volver al inicio</Button>
        </div >
    )
}
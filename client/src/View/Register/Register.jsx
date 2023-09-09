import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../../redux/Actions/actionsCustomers';
// import { useAuth0 } from "@auth0/auth0-react";

export default function Register() {
    // const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
    const defaultUser = {
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        role: "user",
        provider: "local"
    }
    const [user, setUser] = useState(defaultUser)

    const dispatch = useDispatch()

    function handleChange(event) {
        const property = event.target.name
        const value = event.target.value
        setUser({ ...user, [property]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        dispatch(addCustomer(user))
    }

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
                <h1>REGISTRATE</h1>
                <InputGroup className="mb-3" id="formBasicEmail">
                    <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
                    <Form.Control name='name' type="text" placeholder="Ingresa tu email" onChange={handleChange} />
                </InputGroup>
                <InputGroup className="mb-3" id="formBasicPassword">
                    <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                    <Form.Control name='email' type="email" placeholder="Ingresa tu email" onChange={handleChange} />
                </InputGroup>
                <InputGroup className="mb-3" id="formBasicPassword">
                    <InputGroup.Text id="basic-addon1">Dirección</InputGroup.Text>
                    <Form.Control name='address' type="text" placeholder="Ingresa tu dirección" onChange={handleChange} />
                </InputGroup>
                <InputGroup className="mb-3" id="formBasicPassword">
                    <InputGroup.Text id="basic-addon1">Teléfono</InputGroup.Text>
                    <Form.Control name='phone' type="text" placeholder="Ingresa tu teléfono" onChange={handleChange} />
                </InputGroup>
                <InputGroup className="mb-3" id="formBasicPassword">
                    <InputGroup.Text id="basic-addon1">Contraseña</InputGroup.Text>
                    <Form.Control name='password' type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} />
                </InputGroup>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Registrar
                </Button>
            </Form>
        </div>
    )
}
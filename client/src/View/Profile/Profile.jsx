import {Button, Card, Form, InputGroup, Modal, Accordion, DropdownButton, Row, Col} from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react"
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Overlay from '../../components/Overlay/Overlay';
import { getCustomerByEmail, getCustomerById, modCustomer } from '../../redux/Actions/actionsCustomers';
import * as validate from '../Register/validations'
import { PiWarning } from 'react-icons/pi'
import { VscTasklist } from 'react-icons/vsc'
import styles from './Profile.module.css'
import {clearSC,clearCustomerId} from "../../redux/Actions/actionsSC"
import { getBuy } from "../../redux/Actions/actionsBuy"
import  Comments  from "../../components/Comments/AddComments"

import { Footer } from '../../components/Footer/Footer';

export default function Profile() {
    const { logout, isAuthenticated } = useAuth0()
    const dispatch = useDispatch()
    const history = useHistory()
    const [edit, setEdit] = useState(true)
    const [customer, setCustomer] = useState()
    const [customerData, setCustomerData] = useState()
    const [profilePurchase, setProfilePurchase] = useState([]);
    const [buyShow, setBuyShow] = useState(false);

    const handleClose = () => setBuyShow(false);

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
        const lsCustomer = JSON.parse(localStorage.getItem('customer'));

        if (lsCustomer) {
          const user = await dispatch(getCustomerByEmail(lsCustomer.email));
          if (user.payload && user.payload.length > 0) {
            localStorage.setItem('customer', JSON.stringify({
              id: user.payload[0].id,
              name: user.payload[0].name,
              email: user.payload[0].email,
              role: user.payload[0].role,
            }));
            setCustomer({ ...user.payload[0] });
            setCustomerData(lsCustomer)

          } else {
            console.error('No se encontró un usuario con el correo electrónico proporcionado');
          }
        } else {
          console.error('No hay un cliente en el almacenamiento local');
        }
      }

    const purchaseHistory = async () => {
        setBuyShow(true);
        const res = await dispatch(getBuy());
        const buy = res.payload;
        const profileId = customerData.id;

        const filteredPurchases = buy.filter((buy) => buy.CustomerId === profileId);

        if (filteredPurchases.length > 0) {
          console.log('Compras del perfil:', filteredPurchases);
          setProfilePurchase(filteredPurchases);
        } else {
          console.log('No se encontraron compras que coincidan con el perfil.');
        }
      }
      function formatDate(dateTimeString) {
        const date = new Date(dateTimeString);
        
        const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const dayOfWeek = daysOfWeek[date.getDay()];
        
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        
        return `${dayOfWeek} ${day}/${month}/${year} a las ${hours}:${minutes}`;
    }

    function getPaymentMethodLabel(paymentMethod) {
        switch (paymentMethod) {
            case "master":
                return "Tarjeta Master Card";
            case "visa":
                return "Tarjeta Visa";
            case "amex":
                return "Tarjeta American Express";
            case "account_money":
                return "Dinero en cuenta";
            default:
                return paymentMethod;
        }
    }
    
    function getStatusLabel(status) {
        switch (status) {
            case "approved":
                return "Aprobado";
            case "rejected":
                return "Rechazado";
            case "pending":
                return "Pendiente";
            default:
                return status;
        }
    }


    function handleLogout() {
        localStorage.clear()
        if (isAuthenticated) {
            logout({ logoutParams: { returnTo: window.location.origin } })
        }
        else {
            history.push('/')
        }
        dispatch(clearSC())
        dispatch(clearCustomerId())
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
                        <Button onClick={purchaseHistory} variant="outline-dark"><VscTasklist/> Mis Compras</Button>
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

            <Modal
                size="lg"
                show={buyShow}
                onHide={() => setBuyShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Tus compras
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {profilePurchase.length > 0 ? (
                    profilePurchase.map((purchase) => (
                     <Accordion defaultActiveKey="0" flush>
                          <Accordion.Item >
                          <Accordion.Header key={purchase.id}> Compra realizada el {formatDate(purchase.fechapago)}</Accordion.Header>
                          <Accordion.Body>
                        {purchase.cart.map((product) => (
                            <div key={product.id} className={styles.productItem}>
                            <div className={styles.productContainer}>
                              <img src={product.picture_url} alt={product.title} className={styles.productImage} />
                              <div className={styles.productInfo}>
                                <h5 className={styles.title}>{product.title}</h5>
                                <p className={styles.productDescription}>{product.description}</p>
                                <p className={styles.productDescription}>{product.quantity} Unidades</p>
                                <p className={styles.productDescription}>Precio unitario: ${product.unit_price}</p>
                              </div>
                            </div>

                              <div className={styles.commentContainer}>
                                <DropdownButton id="dropdown-item-button" title="Opina sobre este producto !">
                                  <div className={styles.comments}>
                                    <Comments
                                        productId={product.id}
                                        customerId={customerData.id}
                                    />
                                  </div>
                                </DropdownButton>
                              </div>

                          </div>

                        ))}
                            <Row className={styles.customRow}>
                            <Col>
                                Método de pago :
                            </Col>
                            <Col className={styles.customCol}>
                                {getPaymentMethodLabel(purchase.card.payment_method.id)}
                            </Col>
                            <Col> Total pagado: ${purchase.total}</Col>
                            <Col>
                                Estado: {getStatusLabel(purchase.estado)}
                            </Col>
                          </Row>
                        </Accordion.Body>
                        
                         </Accordion.Item>
                   </Accordion>
                    ))
                ):(
                    <p>Todavia no hay compras asociadas a esta cuenta.</p>
                )}
                </Modal.Body>
            </Modal>

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
        </div >
    )
}
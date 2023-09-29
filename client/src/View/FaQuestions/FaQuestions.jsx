import { Footer } from "../../components/Footer/Footer"
import NavBar from "../../components/NavBar/NavBar";
import { Accordion, Button, Form } from 'react-bootstrap/';
import style from './FaQuestions.module.css'
import { Link } from "react-router-dom";
import Overlay from "../../components/Overlay/Overlay";

const FaQuestions =()=>{


    return(
        <div className={style.container}>
            <NavBar/>
            <div className={style.faqContainer}>
                <div className={style.headerContainer}>
                    <h1>Preguntas Frecuentes</h1>
                    <Button variant="primary" as={Link} to='/home'>Volver al inicio</Button>
                </div>
            <Accordion >
                <Accordion.Item eventKey="0">
                    <Accordion.Header><span className={style.question}>01</span>Registro y compra</Accordion.Header>
                    <Accordion.Body >
                        <ul className={style.faqList}>
                            <li className={style.faqItem}>
                                <span className={style.question}>Necesito estar registrado para realizar un pedido?</span>
                                <span className={style.answer}>
                                Sí, es necesario estar registrado. Si todavía no te has registrado, puedes hacerlo haciendo clic{' '}
                                <a href="/register">aquí</a>.
                                </span>
                            </li>
                            <hr />
                            <li className={style.faqItem}>
                                <span className={style.question}>Recibo alguna confirmación cuando hago un pedido?</span>
                                <span className={style.answer}>
                                Sí, recibirás un email de confirmación una vez que hayas realizado tu pedido.
                                </span>
                            </li>
                            <hr />
                            <li className={style.faqItem}>
                                <span className={style.question}>Si abandono el sitio sin confirmar el pedido pierdo los productos cargados en el carrito?</span>
                                <span className={style.answer}>
                                No. Todas las acciones que realices en el sitio habiendo ingresado como usuario registrado quedarán guardadas.
                                </span>
                            </li>
                            <hr />
                            <li className={style.faqItem}>
                                <span className={style.question}>De qué formas puedo agregar, modificar o quitar un producto del carrito de compras?</span>
                                <span className={style.answer}>
                                Podrás agregar o modificar cantidades de productos al carrito durante todo el proceso de compra, seleccionando los botones y - para sumar o disminuir unidades y en caso de querer eliminar un producto podrás seleccionar 'x'.
                                Además, tenes la posibilidad de eliminar todos los productos del carrito.
                                </span>
                            </li>
                            <hr />
                            <li className={style.faqItem}>
                                <span className={style.question}>Cómo busco productos ?</span>
                                <span className={style.answer}>
                                Tenés diferentes formas de buscar tus productos :
                                <br />
                                1 - Búsqueda por categorías: En el menú, podrás encontrar las principales categorías de nuestros productos.
                                <br />
                                2 -  Búsqueda por producto: En el buscador, a través de una palabra clave, vas a poder encontrar un producto específico. 
                                Como resultado, el sistema arrojará una lista de productos correspondientes a la palabra que ingresaste.
                                </span>
                            </li>
                            <hr />
                            <li className={style.faqItem}>
                                <span className={style.question}>Por qué hay productos que se muestran pero que no puedo agregar a mi carrito?</span>
                                <span className={style.answer}>
                                El hecho de que no lo puedas agregar a tu carrito, significa que el producto momentáneamente se encuentra sin stock. 
                                El stock es dinámico, por lo que seguramente estará disponible para agregar al carrito en tu próxima compra.
                                </span>
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><span className={style.question}>02</span>Pago</Accordion.Header>
                    <Accordion.Body>
                    <ul className={style.faqList}>
                            <li className={style.faqItem}>
                                <span className={style.question}>Cómo pago mi pedido ?</span>
                                <span className={style.answer}>
                                Puedes pagar tu pedido de forma segura y conveniente utilizando MercadoPago, nuestra plataforma de pagos en línea. 
                                Con MercadoPago, tienes varias opciones de pago disponibles, como tarjeta de debito, crédito, efectivo y transferencia bancaria.
                                </span>
                            </li>
                            <hr />
                            <li className={style.faqItem}>
                                <span className={style.question}>¿Puedo consultar un pedido que realicé para repetirlo en próximas compras?</span>
                                <span className={style.answer}>
                                Sí, podrás repetir pedidos en la sección 'Mis pedidos' e incluso armarte listas favoritas, las cuales podrás armar con los productos que vos selecciones.
                                </span>
                            </li>
                            <hr />
                            <li className={style.faqItem}>
                                <span className={style.question}>Tengo que ingresar los datos de mi tarjeta en el sitio?</span>
                                <span className={style.answer}>
                                Si decidiste abonar con medio de pago "tarjeta de crédito/debito" deberás ingresar los datos de la tarjeta.
                                No te preocupes, ¡tus datos están protegidos!
                                </span>
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><span className={style.question}>03</span>Datos Personales</Accordion.Header>
                    <Accordion.Body>
                    <ul className={style.faqList}>
                            <li className={style.faqItem}>
                                <span className={style.question}>Puedo modificar mis datos personales?</span>
                                <span className={style.answer}>
                                Podés modificar tus datos personales ingresando en “Mi cuenta”.
                                </span>
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Tienes alguna pregunta ?</Accordion.Header>
                    <Accordion.Body>
                    <ul className={style.faqList}>
                            <li className={style.faqItem}>
                                <span className={style.question}>Cúal es tu pregunta ?</span>
                                <span className={style.answer}>
                                Déjanos tu correo con tu consulta y te responderemos lo antes posible !
                                </span>
                            </li>
                        </ul>
                        <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Correo :</Form.Label>
                            <Form.Control type="email" placeholder="correo@ejemplo.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Escribe aqui tu duda/consulta :</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="success">Enviar</Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
            <div className={style.footerContainer}>
              <Footer/>
            </div>
            <Overlay />
        </div>
    )
}

export default FaQuestions


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/Actions/actionsProducts";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { useHistory } from "react-router-dom";
import { Alert } from 'react-bootstrap';

function ProductsDetail() {
    const { id } = useParams();
    const navigate = useHistory();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsId);
    const [showMessage, setShowMessage] = useState(false); // Estado para mostrar/ocultar el mensaje
    const [quantity, setQuantity] = useState(1); // Estado para controlar la cantidad

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id]);

    function handleClick() {
        navigate.push("/home");
    }

    function handleAddToCart() {
        // Una vez que el producto se ha agregado al carrito, mostramos la alerta
        setShowMessage(true);
        // Ocultamos la alerta después de un cierto tiempo (por ejemplo, 3 segundos)
        setTimeout(() => {
            setShowMessage(false);
        }, 3000); // 3000 milisegundos = 3 segundos
    }

    function handleIncrement() {
        // Incrementar la cantidad
        setQuantity(quantity + 1);
    }

    function handleDecrement() {
        // Decrementar la cantidad, asegurándonos de que nunca sea menor que 1
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial', width: "80%" }}
        >
            <Modal.Dialog>
                <div className="row">
                    <div className="col-4">
                        {/* Columna izquierda para la imagen */}
                        <Image style={{ width: "100%" }} src={products.image} rounded />
                    </div>
                    <div className="col-8">
                        {/* Columna central para el contenido */}
                        <Modal.Header style={{ alignSelf: "center" }}>
                            <Modal.Title >{products.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{products.description}</p>
                            Precio Normal
                            <Modal.Title>$ {products.price}</Modal.Title>
                            <p><strong>Marca:</strong> {products.brand}</p>
                            <Modal.Title>Disponible: {products.stock}</Modal.Title>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClick}>Back</Button>
                            <Button variant="primary" onClick={handleAddToCart}>Agregar al carrito</Button>
                        </Modal.Footer>
                    </div>
                    <div className="col-12 col-md-4">
                        {/* Columna derecha para los botones de cantidad */}
                        <div className="d-flex flex-column align-items-center">
                            <p>Cantidad: {quantity}</p>
                            <div className="d-inline"> {/* Esta div envuelve los botones */}
                                <Button variant="outline-primary" onClick={handleIncrement}>+</Button>
                                <Button variant="outline-primary" onClick={handleDecrement}>-</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Alert show={showMessage} variant="success">
                    ¡Producto agregado al carrito!
                </Alert>
            </Modal.Dialog>
        </div>
    )
}

export default ProductsDetail;

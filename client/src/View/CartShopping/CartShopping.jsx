import React, { useState, useEffect } from "react";
import { Modal, Button, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const CartShopping = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const history = useHistory();
  const cart = useSelector((state) => state.productsSC);

  // Variable para almacenar el valor total
  let totalValue = 0;

  const handlePayment = () => {
    history.push('/mercadopago');
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.map((product) => {
            // Calcula el valor total por producto
            const productTotal = product.quantity * product.productDetails.price;
            // Suma el valor total al valor total general
            totalValue += productTotal;

            return (
              <Card key={product.id}>
                <Card.Img
                  variant="top"
                  src={product.productDetails.image}
                  style={{ maxWidth: "30%" }} // Establece el ancho máximo
                />
                <Card.Body>
                  <Card.Title>{product.productDetails.name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Cantidad:</strong> {product.quantity}</ListGroup.Item>
                    <ListGroup.Item><strong>Valor:</strong> ${product.productDetails.price.toFixed(2)}</ListGroup.Item>
                    <ListGroup.Item><strong>Valor Total Producto:</strong> ${productTotal.toFixed(2)}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            );
          })}
          {/* Muestra el valor total general */}
          <p className="mt-4"><strong>Valor Total de la Compra:</strong> ${totalValue.toFixed(2)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Pagar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CartShopping;

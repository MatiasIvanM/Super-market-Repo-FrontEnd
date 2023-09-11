import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'; // Importa useHistory



function CartShopping() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const cart = useSelector((state) => state.productsSC); //ojo !
  console.log("Estado:",cart)
  const history = useHistory(); // Obtiene la instancia de history

  const handlePayment = () => {
    // Redirige al usuario a la página de pago cuando se hace clic en "Pagar"
    history.push('/mercadopago');
  };

  return (
    <div>
      {/* <button onClick={handleShow}>Ver Detalle</button> */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Id:</strong> 994939e39e39</p>
          <p><strong>Nombre:</strong> Gaseosa</p>
          <p><strong>Cantidad:</strong> 2</p>
          <p><strong>Valor:</strong> 10.99</p>
          <p><strong>Total:</strong> 21.98</p>
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

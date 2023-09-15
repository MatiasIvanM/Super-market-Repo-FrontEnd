import React, { useState } from "react";
import { Modal, Button, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom/";
import { clearSC, removeProductSC, updateProductQuantitySC } from "../../redux/Actions/actionsSC"
import { useDispatch } from "react-redux";

const CartShopping = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const history = useHistory();
  const cart = useSelector((state) => state.productsSC);
  const dispatch = useDispatch();

  const clearCart = () => {
    const shouldClear = window.confirm("¿Estás seguro de que deseas limpiar el carrito?");
    if (shouldClear) {
      dispatch(clearSC());
    }
  }
  const handleRemoveProduct = (productId) => {
    const shouldRemove = window.confirm("¿Estás seguro de que deseas eliminar este producto del carrito?");
    if (shouldRemove) {
      dispatch(removeProductSC(productId));
    }
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(updateProductQuantitySC(productId, 1)); // Incrementa la cantidad en 1
  };

  const handleDecrementQuantity = (productId, product) => {
    if (product.quantity > 1) {
      dispatch(updateProductQuantitySC(productId, -1)); // Decrementa la cantidad en 1 si es mayor que 1
    } else {
      // Si la cantidad es 1 o menos, elimina el producto del carrito
      const shouldRemove = window.confirm("¿Estás seguro de que deseas eliminar este producto del carrito?");
      if (shouldRemove) {
        dispatch(removeProductSC(productId));
      }
    }
  };
  // Variable para almacenar el valor total
  let totalValue = 0;

  const handlePayment = () => {
    history.push('/mercadopago'); // Redirige en la misma página
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Detalles del carrito</Modal.Title>
          <Button variant="outline-danger" onClick={clearCart}>
            Limpiar Carrito
          </Button>{" "}
        </Modal.Header>
        <Modal.Body>
          {cart.map((product) => {
            // Calcula el valor total por producto
            const productTotal = product.quantity * product.productDetails.price;
            // Suma el valor total al valor total general
            totalValue += productTotal;

            return (
              <Card key={product.id}>
                <button onClick={() => handleRemoveProduct(product.productDetails.id)}>
                  Eliminar {product.productDetails.name}
                </button>
                <Card.Img
                  variant="top"
                  src={product.productDetails.image}
                  style={{ maxWidth: "30%" }} // Establece el ancho máximo
                />
                <Card.Body>
                  <Card.Title>{product.productDetails.name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Cantidad:</strong>
                      {product.quantity}
                      <Button onClick={() => handleDecrementQuantity(product.productDetails.id, product)}>-</Button>
                      <Button onClick={() => handleIncrementQuantity(product.productDetails.id)}>+</Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Valor:</strong> $ {product.productDetails.price.toFixed(0)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Valor Total Producto:</strong> $ {productTotal.toFixed(0)}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            );
          })}
          {/* Muestra el valor total general */}
          <p className="mt-4">
            <strong>Valor Total de la Compra:</strong> $ {totalValue.toFixed(0)}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button as={Link} to="/home" variant="secondary" onClick={handleClose}>
            Seguir comprando
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

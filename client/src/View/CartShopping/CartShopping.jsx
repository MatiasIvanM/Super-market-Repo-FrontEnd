import React, { useState, useEffect } from "react";
import { Modal, Button, Card, ListGroup,Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom/";
import { clearSC, removeProductSC, updateProductQuantitySC } from "../../redux/Actions/actionsSC"
import { useDispatch } from "react-redux";

const CartShopping = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [errors,setErrors]=useState([])
  const [showMessageWarning, setShowMessageWarning] = useState(false);
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
    const productFind = cart.find(product => product.productDetails.id === productId);
    if(productFind.quantity+1>productFind.productDetails.stock){
      return
    }else{
    dispatch(updateProductQuantitySC(productId, 1)); // Incrementa la cantidad en 1
    }
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
    const errorsL=[];
    for (let i = 0; i < cart.length; i++) {
      if(cart[i].productDetails.stock<cart[i].quantity){
        const err=`El producto: ${cart[i].productDetails.name} no tiene suficiennte stock`;
        errorsL.push(err);
      }
    }
    setErrors(errorsL);
    if(errorsL.length!==0){
      setShowMessageWarning(true)
      setTimeout(() => {
        setShowMessageWarning(false);
      }, 5000);
    }else{
    history.push('/mercadopago'); // Redirige en la misma página
    }
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
            const productTotal = product.quantity * (product.discountPrice || product.productDetails.price);
              totalValue += productTotal;

            return (
              <Card key={product.id}>
                <Button 
                  key={`remove-button-${product.id}`}
                  variant="outline-danger" 
                  onClick={() => handleRemoveProduct(product.productDetails.id)}>
                  Eliminar {product.productDetails.name}
                </Button>
                <Card.Img
                  variant="top"
                  src={product.productDetails.image}
                  style={{ maxWidth: "30%" }} // Establece el ancho máximo
                />
                <Card.Body>
                  <Card.Title>{product.productDetails.name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Cantidad: </strong>
                      {product.quantity}
                      <Button variant="outline-primary" onClick={() => handleDecrementQuantity(product.productDetails.id, product)}>-</Button>
                      <Button variant="outline-primary" onClick={() => handleIncrementQuantity(product.productDetails.id)}>+</Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {product.discountPrice !== product.productDetails.price ? (
                        <>
                          <strong>Precio:</strong> 
                          <span style={{
                                  marginLeft: '5px',
                                  color: "gray",
                                  textAlign: "left",
                                  textDecoration: "line-through", 
                                }}>
                            ${product.productDetails.price.toFixed(0)}
                          </span>
                          <span style={{
                                  marginLeft: '7px',
                                  textAlign: "left",
                                  fontWeight:'bold'
                                }}>
                            ${product.discountPrice}
                          </span>
                        </>
                      ) : (
                        <>
                        <strong>Precio:</strong> ${product.productDetails.price.toFixed(0)}                    
                        </>
                      )}
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
          <Alert show={showMessageWarning} variant="warning" >
          <div>
            Verificar:
            {errors.map(e=>(
              <p>{e}</p>
            ))}
          </div>
        </Alert>
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

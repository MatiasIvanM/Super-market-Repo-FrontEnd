import React, { useState, useEffect } from "react";
import { Modal, Button, Card, ListGroup, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom/";
import { clearSC, removeProductSC, updateProductQuantitySC } from "../../redux/Actions/actionsSC"
import { useDispatch } from "react-redux";
import { putShoppingCart, updateTotal } from "../../redux/Actions/actionsSC";
import styles from './CartShopping.module.css'

const CartShopping = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const handleClose = () => setShow(false);
  const [showMessageWarning, setShowMessageWarning] = useState(false);
  const [errors, setErrors] = useState([])
  // const [show, setShow] = useState(true);
  const [total, setTotal] = useState(0)
  const cart = useSelector((state) => state.productsSC);
  const shoppingCart = useSelector((state) => state.shoppingCart)



  useEffect(() => {
    // Calcula el total antes de renderizar los elementos mapeados
    let newTotalValue = 0;
    cart.forEach((product) => {
      const productTotal = product.quantity * (product.discountPrice || product.productDetails.price);
      newTotalValue += productTotal;
    });
    // Actualiza el estado total con el nuevo valor
    setTotal(newTotalValue);
    dispatch(updateTotal(newTotalValue));
  }, [cart]); // Observa cambios en el carrito



  useEffect(() => {
    console.log("EJECUTANDO PUT CART", shoppingCart.id)
    dispatch(putShoppingCart({ shoppinId: shoppingCart.id, ProductName: cart, PriceTotal: total }));
  }, [total]);

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
    if (productFind.quantity + 1 > productFind.productDetails.stock) {
      return
    } else {
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


  const handlePayment = () => {
    const errorsL = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productDetails.stock < cart[i].quantity) {
        const err = `El producto: ${cart[i].productDetails.name} no tiene suficiennte stock`;
        errorsL.push(err);
      }
    }
    setErrors(errorsL);
    if (errorsL.length !== 0) {
      setShowMessageWarning(true)
      setTimeout(() => {
        setShowMessageWarning(false);
      }, 5000);
    } else {
      history.push('/mercadopago'); // Redirige en la misma página
    }
  };


  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Detalles del carrito</Modal.Title>
          <Button variant="outline-danger" onClick={clearCart}>
            Limpiar Carrito
          </Button>{" "}
        </Modal.Header>
        <Modal.Body>
          {cart.map((product) => {
            const productTotal = product.quantity * (product.discountPrice || product.productDetails.price);
            return (
              <Card className={styles.producto_container} key={product.id}>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Card.Img src={product.productDetails.image} className={styles.image} />
                  <span style={{ fontSize: '1rem' }}>{product.productDetails.name}</span>
                  <strong style={{ marginLeft: '5px', fontSize: '1rem' }}> x </strong>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bolder' }}>{product.quantity}</span>
                  {product.productDetails.discount ? <span style={{ marginLeft: '3px', fontWeight: 'bolder', color: '#198754' }}> {`-${product.productDetails.discount}%`}</span> : <></>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button className={styles.qButton} onClick={() => handleDecrementQuantity(product.productDetails.id, product)}>-</Button>
                  <Button className={styles.qButton} onClick={() => handleIncrementQuantity(product.productDetails.id)}>+</Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bolder', marginLeft: '0.6rem', color: '#6c757d' }}>{`$${product.productDetails.price - (product.productDetails.price / 100) * product.productDetails.discount}`}</span>
                  <Button
                    key={`remove-button-${product.id}`}
                    className={styles.closeButton}
                    onClick={() => handleRemoveProduct(product.productDetails.id)}>
                    {/* Eliminar {product.productDetails.name} */}
                    x
                  </Button>
                </div>

                {/* <Card.Body> */}
                {/* <ListGroup variant="flush">
                    
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
                            fontWeight: 'bold'
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
                  </ListGroup> */}
                {/* </Card.Body> */}
              </Card>
            );
          })}

          {/* Muestra el valor total general */}
          <p className="mt-4">
            <strong>Valor Total de la Compra:</strong> $ {total.toFixed(0)}
          </p>
          <Alert show={showMessageWarning} variant="warning" >
            <div>
              Verificar:
              {errors.map(e => (
                <p>{e}</p>
              ))}
            </div>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleShow}>
            Seguir comprando
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Pagar
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default CartShopping;
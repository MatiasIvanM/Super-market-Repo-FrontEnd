import React, { useState, useEffect } from "react";
import { Modal, Button, Card, ListGroup, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom/";
import { clearSC, removeProductSC, updateProductQuantitySC } from "../../redux/Actions/actionsSC"
import { useDispatch } from "react-redux";
import { putShoppingCart, updateTotal } from "../../redux/Actions/actionsSC";
import styles from './CartShopping.module.css'
import { BsCart3 } from 'react-icons/bs'
import Swal from 'sweetalert2';



const CartShopping = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const handleClose = () => setShow(false);
  const [showMessageWarning, setShowMessageWarning] = useState(false);
  const [errors, setErrors] = useState([])
  // const [show, setShow] = useState(true);
  const [total, setTotal] = useState(0)
  const [showTotalWarning,setShowTotalWarning]=useState(false);
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
    if(newTotalValue<=1000){
      setShowTotalWarning(true);
    }else{
      setShowTotalWarning(false);
    }
    dispatch(updateTotal(newTotalValue));
  }, [cart]); // Observa cambios en el carrito



  useEffect(() => {
    console.log("EJECUTANDO PUT CART", shoppingCart.id)
    dispatch(putShoppingCart({ shoppinId: shoppingCart.id, ProductName: cart, PriceTotal: total }));
  }, [total]);

  // const clearCart = () => {
  //   const shouldClear = window.confirm("¿Estás seguro de que deseas limpiar el carrito?");
  //   if (shouldClear) {
  //     dispatch(clearSC());
  //   }
  // }

  const clearCart = () => {
    Swal.fire({
      title: '¿Estás seguro de que deseas limpiar el carrito?',
      text: 'Esta acción eliminará todos los elementos del carrito.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearSC());
      }
    });
  };


  // const handleRemoveProduct = (productId) => {
  //   const shouldRemove = window.confirm("¿Estás seguro de que deseas eliminar este producto del carrito?");
  //   if (shouldRemove) {
  //     dispatch(removeProductSC(productId));
  //   }
  // };
  
const handleRemoveProduct = (productId) => {
  Swal.fire({
    title: '¿Estás seguro de que deseas eliminar este producto del carrito?',
    text: 'Esta acción eliminará el producto del carrito.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(removeProductSC(productId));
    }
  });
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
        const err = `El producto: ${cart[i].productDetails.name} no tiene suficiente stock`;
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
          <Modal.Title style={{ color: '#0d6efd' }}><BsCart3 /> Mi carrito</Modal.Title>
          <Button size="sm" variant="outline-danger" onClick={clearCart}>
            Limpiar
          </Button>{" "}
        </Modal.Header>
        <Modal.Body>
          {cart.map((product) => {
            const productTotal = product.quantity * (product.discountPrice || product.productDetails.price);
            return (
              <Card className={styles.producto_container} key={product.id}>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                  <Card.Img src={product.productDetails.image} className={styles.image} />
                  <span style={{ fontSize: '1rem', marginLeft: '0.3rem' }}>{product.productDetails.name}</span>
                  <strong style={{ marginLeft: '5px', fontSize: '1rem' }}> x </strong>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bolder' }}>{product.quantity}</span>
                  {product.productDetails.discount ? <span style={{ marginLeft: '3px', fontWeight: 'bolder', color: '#198754' }}> {`-${product.productDetails.discount}%`}</span> : <></>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', width: '20%', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button className={styles.qButton} onClick={() => handleDecrementQuantity(product.productDetails.id, product)}>-</Button>
                    <Button className={styles.qButton} onClick={() => handleIncrementQuantity(product.productDetails.id)}>+</Button>
                  </div>
                  <span style={{ fontWeight: 'bolder', marginLeft: '0.6rem', color: '#6c757d' }}>
                    {`$${((product.productDetails.price - (product.productDetails.price / 100) * product.productDetails.discount) * product.quantity).toFixed(2)}`}
                  </span>
                </div>

                <Button
                  key={`remove-button-${product.id}`}
                  className={styles.closeButton}
                  onClick={() => handleRemoveProduct(product.productDetails.id)}>
                  {/* Eliminar {product.productDetails.name} */}
                  x
                </Button>
              </Card>
            );
          })}
          <p className="mt-4">
            <span>Valor total de la compra:</span>
            <strong
              style={{ fontSize: '1.2rem' }}> $ {total.toFixed(0)}
            </strong>
          </p>
          <Alert show={showMessageWarning} variant="warning" >
            <div>
              Verificar:
              {errors.map(e => (
                <p>{e}</p>
              ))}
            </div>
          </Alert>
          <Alert show={showTotalWarning} variant="warning" >
            <div>
              El valor de la compra debe superar los $1000
            </div>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleShow}>
            Seguir comprando
          </Button>
          <Button variant="primary" onClick={handlePayment} disabled={showTotalWarning}>
            Pagar
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default CartShopping;
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, clearProductDetails } from "../../redux/Actions/actionsProducts";
import { addProductSC, putShoppingCart,getSC } from "../../redux/Actions/actionsSC"
import { getComment } from '../../redux/Actions/actionsComments'
import AddComments from '../../components/Comments/AddComments'
import ViewComments from "../../components/Comments/ViewComments";
import { Button, Modal, Card, Alert, Spinner } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import style from './Detail.module.css'
import { AiOutlineStar } from 'react-icons/ai'



function ProductsDetail(props) {
  
  const dispatch = useDispatch();
  const { id, discountPrice } = props
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageWarning, setShowMessageWarning] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState({});
  const [product, setProduct] = useState([])
  let ProductName = useSelector((state) => state.productsSC)
  let customerById = useSelector((state) => state.customerId)
  const shoppingCart = useSelector((state) => state.shoppingCart)
  
  useEffect(() => {
    setProduct(ProductName)
  }, [ProductName]);

  useEffect(() => {
    if (id) {
      dispatch(getComment())
      dispatch(getProductById(id))
        .then((data) => {
          setProductDetails(data);
        })
        .catch((error) => {
          console.error('An error occurred:', error.message);
        });
    }
  }, [dispatch, id]);
  
  
  
 async function handleAddToCart() {
   
      // El usuario no ha iniciado sesión, muestra el alert.
      console.log(customerById)
      if (Object.keys(customerById).length === 0) {
        setShowLoginAlert(true);
        setTimeout(() => {
          setShowLoginAlert(false);
        }, 3000);
        return;
      }

      let stockAvalible=0;
      let productExistsInCart =false;
      for (let i = 0; i < shoppingCart.ProductName.length; i++) {
        const p=shoppingCart.ProductName[i];
        if(p.productDetails.id===productDetails.id){
          stockAvalible = Number(productDetails.stock - p.quantity);
          console.log("🚀 ~ file: Detail.jsx:56 ~ handleAddToCart ~ stockAvalible:", stockAvalible)
          productExistsInCart=true;
        }
      }
    if(productExistsInCart){
    if (stockAvalible < quantity) {
      setShowMessageWarning(true);
      setTimeout(() => {
        setShowMessageWarning(false);
        props.onHide();
      }, 2000);
    } else {
      setShowMessage(true);
     
        
      const newQuantity = Math.min(quantity, productDetails.stock);
  
      dispatch(addProductSC({ productDetails, quantity: quantity, discountPrice }));
  
      setProductDetails(prevDetails => ({
        ...prevDetails,
        stock: prevDetails.stock - newQuantity
      }));
  
      // Verificar si shoppingCart.ProductName existe y es un array
      if (!shoppingCart.ProductName || !Array.isArray(shoppingCart.ProductName)) {
        shoppingCart.ProductName = [];
      } //SE AGREGA PARA QUE NO ROMPA NO SE VERIFICA AUN FUNCIONALIDAD DEL CAMBIO
  
      const combinedProducts = [...shoppingCart.ProductName, { productDetails, quantity: newQuantity }];
      const response = await dispatch(putShoppingCart({ shoppinId: shoppingCart.id, ProductName: combinedProducts }));
      console.log("🚀 ~ file: Detail.jsx:102 ~ handleAddToCart ~ response: PRIMER RESPONSE", response)
      setTimeout(() => {
        setShowMessage(false);
        props.onHide();
      }, 2000);
    }
  }else {
    if (productDetails.stock < quantity) {
      setShowMessageWarning(true);
      setTimeout(() => {
        setShowMessageWarning(false);
        props.onHide();
      }, 2000);
    }else{
      setShowMessage(true);
     

      const newQuantity = Math.min(quantity, productDetails.stock);
  
      dispatch(addProductSC({ productDetails, quantity: quantity, discountPrice }));
  
      setProductDetails(prevDetails => ({
        ...prevDetails,
        stock: prevDetails.stock - newQuantity
      }));
  
      // Verificar si shoppingCart.ProductName existe y es un array
      if (!shoppingCart.ProductName || !Array.isArray(shoppingCart.ProductName)) {
        shoppingCart.ProductName = [];
      } //SE AGREGA PARA QUE NO ROMPA NO SE VERIFICA AUN FUNCIONALIDAD DEL CAMBIO
  
      const combinedProducts = [...shoppingCart.ProductName, { productDetails, quantity: newQuantity }];
      const response = await dispatch(putShoppingCart({ shoppinId: shoppingCart.id, ProductName: combinedProducts }));
      console.log("🚀 ~ file: Detail.jsx:132 ~ handleAddToCart ~ response: SEGUNDO DISTPACH", response )
      setTimeout(() => {
        setShowMessage(false);
        props.onHide();
      }, 2000);
    }
  }
  }

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleModalClose() {
    dispatch(clearProductDetails());
    props.onHide();
  }

  return (
    <>
      {props.show && (
        <Modal
          show={props.show}
          onHide={props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Detalle del producto
            </Modal.Title>
          </Modal.Header>
          {productDetails ? (
            <Modal.Body>
              <div className={style.productDetails}>
                <div className={style.productImage}>
                  <Image src={productDetails && productDetails.image} thumbnail />
                </div>
                <div className={style.productInfo}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{productDetails && productDetails.brand}</Card.Title>
                      <Card.Title>{productDetails && productDetails.name}</Card.Title>
                      {discountPrice !== productDetails.price ? (
                        <>
                          <Card.Title>Antes:
                            <span className={style.oldPrice}>
                              ${productDetails && productDetails.price}
                            </span>
                          </Card.Title>
                          <Card.Title>Ahora:
                            <span className={style.newPrice}>
                              ${discountPrice}
                            </span>
                          </Card.Title>
                        </>
                      ) : (
                        <>
                          <Card.Title>Precio: ${productDetails && productDetails.price}</Card.Title>
                        </>
                      )}
                      <Card.Title>{productDetails && productDetails.rating}<AiOutlineStar /></Card.Title>
                      {/* <Card.Title>stock: {productDetails && productDetails.stock}</Card.Title> */}
                      <Card.Text>{productDetails && productDetails.description}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={handleAddToCart}
                        disabled={!productDetails || !productDetails.available} // Deshabilitar el botón si available es false
                        style={{ backgroundColor: !productDetails || !productDetails.available ? 'gray' : '' }}
                      >
                        {productDetails && productDetails.available ? 'Agregar al carrito' : 'Agotado'}
                      </Button>
                      <div className="d-inline">
                        <Button className={style.buttonStyle} variant="outline-primary" onClick={handleDecrement}>-</Button>
                        <Button className={style.buttonStyle} variant="outline-primary" onClick={handleIncrement}>+</Button>
                        <Card.Text>Cantidad: {quantity}</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////// */}

              <ViewComments productId={productDetails.id} />


{/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
            </Modal.Body>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
          <Modal.Footer>
            <Alert show={showMessage} variant="success" className={style.customAlert}>
              <div className={style.alertContent}>
                ¡Producto agregado al carrito!
              </div>
            </Alert>
            <Alert show={showLoginAlert} variant="danger">
                          Debe iniciar sesión para agregar productos al carrito.
                      </Alert>
            <Alert show={showMessageWarning} variant="warning" className={style.customAlert}>
              <div className={style.alertContent}>
                ¡No hay suficiente inventario!
              </div>
            </Alert>
            <Button onClick={handleModalClose}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default ProductsDetail;
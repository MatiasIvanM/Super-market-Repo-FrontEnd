import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductById, clearProductDetails } from "../../redux/Actions/actionsProducts";
import { Button, Modal, Card, Alert, Spinner } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import style from './Detail.module.css'
import { AiOutlineStar } from 'react-icons/ai'
import {addProductSC} from "../../redux/Actions/actionsSC"


function ProductsDetail(props) {
    
    const { id } = props
    const dispatch = useDispatch();
    const [showMessage, setShowMessage] = useState(false);
    const [showMessageWarning, setShowMessageWarning] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [productDetails, setProductDetails] = useState(null);
    
    useEffect(() => {
      if (id) {
        dispatch(getProductById(id))
          .then((data) => {
            setProductDetails(data); 
          })
          .catch((error) => {
            console.error('An error occurred:', error.message);
          });
      }
    }, [dispatch, id]);

    function handleAddToCart() {
      if(productDetails.stock<quantity){
        const newStock=productDetails.stock-quantity

        setShowMessageWarning(true)
        setTimeout(() => {
          setShowMessageWarning(false);
        }, 2000);
      }else{
      setShowMessage(true);
      dispatch(addProductSC({ productDetails, quantity }))
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
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
                <Card.Title>Precio: ${productDetails && productDetails.price}</Card.Title>

                <Card.Title>{productDetails && productDetails.rating}<AiOutlineStar/></Card.Title>
                {/* <Card.Title>stock: {productDetails && productDetails.stock}</Card.Title> */}
                <Card.Text>{productDetails && productDetails.description}</Card.Text>
                <Button variant="primary" onClick={handleAddToCart}>Agregar al carrito</Button>
                <br />
                     <div className="d-inline">
                        <Button className={style.buttonStyle} variant="outline-primary" onClick={handleDecrement}>-</Button>
                        <Button className={style.buttonStyle} variant="outline-primary" onClick={handleIncrement}>+</Button>
                        <Card.Text>Cantidad: {quantity}</Card.Text>
                    </div>
              </Card.Body>
            </Card>
          </div>
        </div>

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

import { Modal } from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import style from "./shoppingCart.css"
import { getProductById } from "../../redux/Actions/actionsProducts";


function ShoppingCart() {
  const productsSC = useSelector((state) => state.shoppingCart)

  return (
    <>
    <Modal
    size="sm"
    aria-labelledby="example-modal-sizes-title-sm"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-sm">
        Small Modal
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>...</Modal.Body>
  </Modal>
  <Modal
    size="lg"
    onHide={() => (false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Large Modal
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>...</Modal.Body>
  </Modal>
</>
);

  



}


export default ShoppingCart;

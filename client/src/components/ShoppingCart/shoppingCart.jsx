import { Modal } from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import style from "./shoppingCart.css"
import { getProductById } from "../../redux/Actions/actionsProducts";


function shoppingCart(){
    const productsSC = useSelector((state) => state.productsSC)

     productsSC = [
        {
          id: "740a391c-1305-4832-b8f3-cac6258eeb02",
          quantity: 7,
          // ...otras propiedades
        },
        // Otros objetos...
      ];
      
      // Creamos un objeto para acumular las cantidades por ID único
      const uniqueIds = {};
      
      // Iteramos sobre el array de productos
      products.forEach((product) => {
        const { id, quantity } = product;
      
        // Si el ID ya existe en el objeto uniqueIds, sumamos la cantidad
        if (uniqueIds[id]) {
          uniqueIds[id].quantity += quantity;
        } else {
          // Si no existe, creamos una nueva entrada en el objeto
          uniqueIds[id] = { id, quantity };
        }
      });





}


export default shoppingCart;
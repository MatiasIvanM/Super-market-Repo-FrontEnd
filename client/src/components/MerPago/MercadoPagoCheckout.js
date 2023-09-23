import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function MercadoPagoCheckout() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPreferenceGenerated, setIsPreferenceGenerated] = useState(false);
  const history = useHistory();

  const cart = useSelector((state) => state.productsSC);
  // const shoppingCart = useSelector ((state)=>state.shoppingCart)
  console.log('cart:::', cart)
  // console.log('shopping:::',shoppingCart)
  const logueado = JSON.parse(localStorage.getItem('customer'))
  console.log("SESION::", logueado);

  const totalCartPrice = cart.reduce((total, product) => {
    return total + product.productDetails.price * product.quantity;
  }, 0);

  // Mover la función createPreference dentro del componente
  const createPreference = async () => {
    try {
      const items = cart.map((item) => ({
        title: `${item.productDetails.name}`,
        id: `${item.productDetails.id}`,
        picture_url: `${item.productDetails.image}`,
        description: `${item.productDetails.description}`,
        unit_price: item.productDetails.price,
        quantity: item.quantity,
        currency_id: 'COP',
      }));

      const response = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        {
          items,
          back_urls: {
            success: "https://supermarket-git-producarrito-matiasivanm.vercel.app/home",
            failure: "https://supermarket-git-producarrito-matiasivanm.vercel.app/home",
            pending: ""
          },
          notification_url: "https://super-market-shop-preview.up.railway.app/mercadoPago/webhook",
          // notification_url: "https://391d-161-10-101-39.ngrok-free.app/mercadoPago/webhook",
          auto_return: "approved",
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer APP_USR-8203424602930700-091210-b1e878bf3417669e6bf645b353c2a858-1477554798`,
          },
        }
      );

      setPreferenceId(response.data.id);
      setIsPreferenceGenerated(true);
      setSuccessMessage('');
    } catch (error) {
      console.error('Error al crear la preferencia: ', error);
    }
  };


  useEffect(() => {
    // Llamar a createPreference solo una vez cuando el componente se monta
    createPreference();// eslint-disable-next-line
  }, []); // Asegurarse de que esto se ejecute solo una vez

  const handlePayment = () => {
    if (preferenceId) {
      window.location.href = (`https://www.mercadopago.com/mco/checkout/start?pref_id=${preferenceId}`);
    }
  };

  const handleCancel = () => {
    history.push('/home');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Pagar Productos</h2>
      <p className="fs-5"><strong>Valor a pagar:</strong> <span className="text-success">$ {totalCartPrice}</span></p>
      {successMessage && <p className="alert alert-success">{successMessage}</p>}
      <button className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
      <button
        className="btn btn-primary ms-2"
        onClick={handlePayment}
        disabled={!isPreferenceGenerated}
      >
        Iniciar Pago
      </button>
    </div>
  );
}



export default MercadoPagoCheckout;

import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function MercadoPagoCheckout() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  const cart = useSelector((state) => state.productsSC);

  // Esta función crea una preferencia en Mercado Pago y recibe el ID de la preferencia
  const totalCartPrice = cart.reduce((total, product) => {
    return total + product.productDetails.price * product.quantity;
  }, 0);

  const createPreference = async () => {
    try {
      const response = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        {
          items: [
            {
              title: 'Pago Supermarket shop',
              unit_price: totalCartPrice, // El precio en centavos
              quantity: 1,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer TEST-7448806304476546-090112-310996ac27e0fcc280c6453e355e53f9-1465680871`,
          },
        }
      );
      
      setPreferenceId(response.data.id);
      setSuccessMessage('Preferencia creada con éxito');
    } catch (error) {
      console.error('Error al crear la preferencia: ', error);
    }
  };

  // Función para iniciar el proceso de pago
  const handlePayment = () => {
    if (preferenceId) {
      window.open(`https://www.mercadopago.com/mla/checkout/start?pref_id=${preferenceId}`);
    }
  };

  // Función para cancelar y regresar al home
  const handleCancel = () => {
    history.push('/home');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Pagar Productos</h2>
      <p className="fs-5"><strong>Valor a pagar:</strong> <span className="text-success">${totalCartPrice.toFixed(2)}</span></p>
      {successMessage && <p className="alert alert-success">{successMessage}</p>}
      <button className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
      <button className="btn btn-primary ms-2" onClick={createPreference}>Crear referencia de Pago</button>
      <button className="btn btn-success ms-2" onClick={handlePayment}>Iniciar Pago</button>
    </div>
  );
}

export default MercadoPagoCheckout;

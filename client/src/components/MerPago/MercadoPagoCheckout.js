import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from "react-redux";

function MercadoPagoCheckout() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const cart = useSelector((state) => {
    console.log(state); // Verifica el estado completo
    return state.products; // Accede al estado específico
  });

  // Esta función crea una preferencia en Mercado Pago y recibe el ID de la preferencia
  const createPreference = async () => {
    try {
      const response = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        {
          items: [
            {
              title: 'Producto de ejemplo',
              unit_price: 1000, // El precio en centavos
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
      
      console.log("ID:::", response.data.id);
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
    console.log("preferencia::", preferenceId);
  };

  return (
    <div>
      <h1>Pagar Productos</h1>
      {successMessage && <p>{successMessage}</p>}
      <button onClick={createPreference}>Crear Preferencia de Pago</button>
      <button onClick={handlePayment}>Iniciar Pago</button>
    </div>
  );
}

export default MercadoPagoCheckout;

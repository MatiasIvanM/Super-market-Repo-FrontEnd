import axios from 'axios';
import React, { useState, useEffect } from 'react';

function MercadoPagoCheckout() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isCreatingPreference, setIsCreatingPreference] = useState(false);

  // Esta función crea una preferencia en Mercado Pago y recibe el ID de la preferencia
  const createPreference = async () => {
    setIsCreatingPreference(true); // Deshabilita el botón mientras se crea la preferencia
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
    } finally {
      setIsCreatingPreference(false); // Habilita el botón nuevamente después de la acción
    }
  };

  // Función para iniciar el proceso de pago
  const handlePayment = () => {
    if (preferenceId) {
      window.open(`https://www.mercadopago.com/mla/checkout/start?pref_id=${preferenceId}`);
    }
    console.log("preferencia::", preferenceId);
  };

  // Función que llama a ambas funciones al mismo tiempo
  const handleCreatePreferenceAndPayment = async () => {
    await createPreference();
    handlePayment();
  };

  return (
    <div>
      <h1>Pagar Productos</h1>
      {successMessage && <p>{successMessage}</p>}
      <button onClick={handleCreatePreferenceAndPayment} disabled={isCreatingPreference}>
        {isCreatingPreference ? 'Creando Preferencia...' : 'Crear Preferencia de Pago e Iniciar Pago'}
      </button>
    </div>
  );
}

export default MercadoPagoCheckout;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getBuy } from '../../redux/Actions/actionsBuy';
import { putShoppingCart } from '../../redux/Actions/actionsSC';


function MercadoPagoCheckout() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPreferenceGenerated, setIsPreferenceGenerated] = useState(false);
  const history = useHistory();
  const shoppingCart = useSelector((state) => state.shoppingCart)

  const cart = useSelector((state) => state.productsSC);
  const buy = useSelector((state) => state.buycart);
  console.log("Dios::", buy)

  const dispatch = useDispatch(); // Obtén la función "dispatch" del store Redux

  const totalCartPrice = cart.reduce((total, product) => {
    const priceToUse = product.discountPrice !== undefined ? product.discountPrice : product.productDetails.price;
    return total + priceToUse * product.quantity;
  }, 0);

  // Mover la función createPreference dentro del componente
  const createPreference = async () => {
    try {
      const items = cart.map((item) => ({
        title: `${item.productDetails.name}`,
        id: `${item.productDetails.id}`,
        picture_url: `${item.productDetails.image}`,
        description: `${item.productDetails.description}`,
        unit_price: item.discountPrice !== undefined ? item.discountPrice : item.productDetails.price,
        quantity: item.quantity,
        currency_id: 'COP',
      }));

      const user = JSON.parse(localStorage.getItem('customer'));
      console.log("USUARRIOFRONT::", user)

      const response = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        {
          items,
          payer: {
            name: user.id,
          },
          back_urls: {
            success: "https://supermarketpreview.vercel.app/home",
            // success: "http://localhost:3000/home",
            failure: "https://supermarketpreview.vercel.app/home",
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
    dispatch(getBuy());// eslint-disable-next-line
  }, [dispatch]); // Asegurarse de que esto se ejecute solo una vez

  const handlePayment = () => {
    if (preferenceId) {
      dispatch(putShoppingCart({ shoppinId: shoppingCart.id, ProductName: [] }));
      window.location.href = (`https://www.mercadopago.com/mco/checkout/start?pref_id=${preferenceId}`);
    }
  };

  const handleModifyOrder = () => {
    history.push('/cartshopping');
  };

  const handleContinueShopping = () => {
    history.push('/home');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Resumen de Compra</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Valor</th> {/* Nueva columna de Valor */}
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productDetails.name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        $
                        {item.discountPrice !== undefined
                          ? item.discountPrice
                          : item.productDetails.price}
                      </td>
                      <td> {/* Renderizar el Valor */}
                        $
                        {(
                          (item.discountPrice !== undefined
                            ? item.discountPrice
                            : item.productDetails.price) * item.quantity
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="fs-5">
                <strong>Total a Pagar:</strong>{' '}
                <span className="text-success">$ {totalCartPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger btn-block mb-2"
              onClick={handleModifyOrder}
            >
              Modificar Pedido
            </button>
            <button
              className="btn btn-primary btn-block mb-2"
              onClick={handlePayment}
              disabled={!isPreferenceGenerated}
            >
              Iniciar Pago($$)
            </button>
            <button
              className="btn btn-secondary btn-block"
              onClick={handleContinueShopping}
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default MercadoPagoCheckout;

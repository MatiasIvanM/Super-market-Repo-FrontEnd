import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './View/Landing/Landing';
import Home from './View/Home/Home.jsx'
import ProductsDetail from '../src/View/Detail/Detail'
import FormProduct from "./View/FormProduct/formProduct"
import MercadoPagoCheckout from "./components/MerPago/MercadoPagoCheckout"
import Register from './View/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import About from './View/About/About'
import CartShopping from './View/CartShopping/CartShopping.jsx'
import Profile from './View/Profile/Profile';
import Login from './View/Login/Login'
import FaQuestions from './View/FaQuestions/FaQuestions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCustomerById } from './redux/Actions/actionsCustomers';
import { getSC } from "./redux/Actions/actionsSC"
import { Footer } from './components/Footer/Footer';

function App() {
  const dispatch = useDispatch()
  async function reloadId() {
    try {
      const customer = JSON.parse(localStorage.getItem('customer'));
      console.log("🚀 ~ file: App.js:25 ~ reloadId ~ customer:", customer);

      if (customer) {
        const response = await dispatch(getCustomerById(customer.id));

        if (response.payload && response.payload.id) {
          const cart = await dispatch(getSC(response.payload.id));
          console.log(cart, "CARRITO APP");
        } else {
          console.error('No se encontró un cliente con el ID proporcionado');
        }
      } else {
        console.error('No hay un cliente en el almacenamiento local');
      }
    } catch (error) {
      console.error('Ocurrió un error al recargar el ID:', error);
    }
  }
  useEffect(() => {
    reloadId()
  }, [])
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/mercadopago" component={MercadoPagoCheckout} />
          <Route path="/product/:id" component={ProductsDetail} />
          <Route path="/form" component={FormProduct} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Dashboard} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          {/* <Route path="/cartshopping" component={CartShopping} /> */}
          <Route path='/FaQ' component={FaQuestions} />
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

//Se esta renderizando doble el footer y el navbar, por el render desde landing
export default App;


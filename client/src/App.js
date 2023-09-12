import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';        
import Landing from './View/Landing/Landing';
import Home from './View/Home/Home.jsx'
import ProductsDetail from '../src/View/Detail/Detail'
import FormProduct from "./View/FormProduct/formProduct"
import MercadoPagoCheckout from "./components/MerPago/MercadoPagoCheckout"
import Register from './View/Register/Register';
<<<<<<< HEAD
import Dashboard from './components/Dashboard/Dashboard';
import About from './View/About/About'
=======
import Login from './View/Login/Login'
import Profile from './View/Profile/Profile';
import CartShopping from './View/CartShopping/CartShopping.jsx'

>>>>>>> 84366fe34374b9e14fc37f42a26b87ed3c83c8c3


function App() {
  return (
    <div className="App">

      <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/mercadopago" component={MercadoPagoCheckout}/>
        <Route path="/product/:id" component={ProductsDetail} />
        <Route path="/form" component={FormProduct} />
        <Route path="/register" component={Register} />
<<<<<<< HEAD
        <Route path="/admin" component={Dashboard} />
        <Route path="/about" component={About} />

=======
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/cartshopping" component={CartShopping} />
>>>>>>> 84366fe34374b9e14fc37f42a26b87ed3c83c8c3
      </Switch>
    </Router>
    </div>
  );
}
//Se esta renderizando doble el footer y el navbar, por el render desde landing
export default App;

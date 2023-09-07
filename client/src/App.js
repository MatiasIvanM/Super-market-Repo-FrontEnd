import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';        
import Landing from './View/Landing/Landing';
import Home from './View/Home/Home.jsx'
import ProductsDetail from '../src/View/Detail/Detail'
import FormProduct from "./View/FormProduct/formProduct"
import MercadoPagoCheckout from "./components/MerPago/MercadoPagoCheckout"




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
      </Switch>
    </Router>
    </div>
  );
}
//Se esta renderizando doble el footer y el navbar, por el render desde landing
export default App;

import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';        
import Landing from './View/Landing/Landing';
import Home from './View/Home/Home'
import ProductsDetail from '../src/View/Detail/Detail'
import Form from "./View/FormProduct/formProduct"



function App() {
  return (
    <div className="App">

      <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/product/:id" component={ProductsDetail} />
        <Route path="/form" component={Form} />
      </Switch>
    </Router>
    </div>
  );
}
//Se esta renderizando doble el footer y el navbar, por el render desde landing
export default App;

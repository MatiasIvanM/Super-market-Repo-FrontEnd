import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Landing from './View/Landing/Landing';
import Home from './components/Home/Home'
import Detail from '../src/View/Detail/Detail'



function App() {
  return (
    <div className="App">

      {/* <NavBar/>
      <Landing/>
      <Home/>
      <Footer/> */}
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/detail/:id" />
        </Switch>
      </Router>
    </div>
  );
}
//Se esta renderizando doble el footer y el navbar, por el render desde landing
export default App;
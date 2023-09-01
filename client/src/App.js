import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Landing from './View/Landing/Landing';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Detail from '../src/View/Detail/Detail'


function App() {
  return (
    <div className="App">
      <NavBar />
      <Landing />
      <Footer />

      <Route path="/detail/:id">
        <Detail />
      </Route>

    </div>
  );
}
//Se esta renderizando doble el footer y el navbar, por el render desde landing
export default App;

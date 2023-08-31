import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer/Footer';
import Landing from './View/Landing/Landing';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Landing/>
      <Footer/>
    </div>
  );
}
//Se esta renderizando doble el footer y el navbar, por el render desde landing
export default App;

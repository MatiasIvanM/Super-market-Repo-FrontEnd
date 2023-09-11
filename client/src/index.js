import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);

const reactRoot = createRoot(root);
reactRoot.render(app);

// Si deseas medir el rendimiento en tu aplicación, pasa una función para registrar los resultados (por ejemplo, reportWebVitals(console.log)).
// Para obtener más información, visita: https://bit.ly/CRA-vitals
//reportWebVitals();

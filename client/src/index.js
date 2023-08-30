import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< .merge_file_9Dcth5
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
=======
import { Auth0Provider } from '@auth0/auth0-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
>>>>>>> .merge_file_Qab7M3

ReactDOM.render(
  <React.StrictMode>
<<<<<<< .merge_file_9Dcth5
    <BrowserRouter>
    <App />
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
=======
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
>>>>>>> .merge_file_Qab7M3
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

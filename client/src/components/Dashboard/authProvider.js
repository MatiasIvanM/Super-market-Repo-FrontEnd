import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import _ from 'lodash';

const validUsers = [
    { username: 'admin', password: 'password22' },
    { username: 'user', password: 'password' },
    // Agrega más usuarios si lo deseas
  ];

const authProvider = (type, params) => {
  switch (type) {

    case AUTH_LOGIN:
      const { username, password } = params;

      // Busca el usuario en el array de usuarios válidos
      const user = _.find(validUsers, { username, password });

      if (user) {
        // Usuario encontrado, guarda los datos en el almacenamiento local
        localStorage.setItem('username', username);
        console.log("Entro");

        return Promise.resolve();
      } else {
        // Usuario no válido, devuelve una promesa rechazada
        return Promise.reject('Nombre de usuario o contraseña incorrectos');
      }
      
      
          case AUTH_LOGOUT:
            // Elimina los datos del usuario del almacenamiento local
            localStorage.removeItem('username');
            return Promise.resolve();
      
          case AUTH_ERROR:
            // Maneja los errores de autenticación
            // (puedes personalizar este comportamiento según tus necesidades)
            return Promise.resolve();
      
          case AUTH_CHECK:
            // Verifica si el usuario está autenticado o no
            return localStorage.getItem('username')
              ? Promise.resolve()
              : Promise.reject();
      
          default:
            return Promise.reject('Acción desconocida');
        

    // case AUTH_LOGIN:
    //   const { username, password } = params;

    //     // return ( 
    //     //     <>
    //     //     localStorage.setItem('password', '123')
    //     //     localStorage.setItem('username', 'admin');
    //     //     </>
    //     //   )
    //   // Envía una solicitud al servidor para verificar las credenciales
    //   return axios.post('/api/login', { username, password })
    //     .then(response => {
    //       // Guarda los datos del usuario en el almacenamiento local
    //       localStorage.setItem('token', response.data.token);
    //       localStorage.setItem('username', response.data.username);
    //     //   console.log(response.data.username);
    //     })
    //     .catch(error => {
    //       // Maneja el error de autenticación
    //       throw new Error(error.response.data.message);
    //     });

    // case AUTH_LOGOUT:
    //   // Elimina los datos del usuario del almacenamiento local
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('username');
    //   return Promise.resolve();

    // case AUTH_ERROR:
    //   // Maneja los errores de autenticación
    //   const status = params.status;
    //   if (status === 401 || status === 403) {
    //     // Realiza una acción específica para los errores de autenticación
    //     // por ejemplo, redirigir a la página de inicio de sesión
    //   }
    //   return Promise.resolve();

    // case AUTH_CHECK:
    //   // Verifica si el usuario está autenticado o no
    //   return localStorage.getItem('token')
    //     ? Promise.resolve()
    //     : Promise.reject();

    // default:
    //   return Promise.reject('Acción desconocida');
  }
};

export default authProvider;


// // const authProvider = {
// //     // send username and password to the auth server and get back credentials
// //     login: params => Promise.resolve(),
// //     // when the dataProvider returns an error, check if this is an authentication error
// //     checkError: error => Promise.resolve(),
// //     // when the user navigates, make sure that their credentials are still valid
// //     checkAuth: params => Promise.resolve(),
// //     // remove local credentials and notify the auth server that the user logged out
// //     logout: () => Promise.resolve(),
// //     // get the user's profile
// //     getIdentity: () => Promise.resolve(),
// //     // get the user permissions (optional)
// //     getPermissions: () => Promise.resolve(),
// //   };

// //   export default authProvider


//   import {
//     AUTH_GET_PERMISSIONS,
//     AUTH_LOGIN,
//     AUTH_LOGOUT,
//     AUTH_ERROR,
//     AUTH_CHECK,
//   } from 'react-admin'; 
//   import { createBrowserHistory } from "history";
//   const history = createBrowserHistory();
  
//    const homepage=()=> {
    
//    history.push('/'); // redirect function to /
//   }
//   export default (type, params, props) => {
    
  
//     if (type === AUTH_LOGIN) {
//         const { username, password } = params;
        
//   // simple user username password, redirect funtion
//         if (username === 'user' && password === 'password') {
//             localStorage.setItem('role', 'user');
//             localStorage.removeItem('not_authenticated');
//             homepage();
//             return Promise.resolve();
//           }
//    //admin  role   username and password
//         if (username === 'admin' && password === 'password') {
//             localStorage.setItem('role', 'admin');
//             localStorage.removeItem('not_authenticated');
//             return Promise.resolve();
//         }
//         localStorage.setItem('not_authenticated', true);
//         return Promise.reject();
//     }
//     if (type === AUTH_LOGOUT) {
//         localStorage.setItem('not_authenticated', true);
//         localStorage.removeItem('role');
//         return Promise.resolve();
//     }
//     if (type === AUTH_ERROR) {
//         const { status } = params;
//         return status === 401 || status === 403
//             ? Promise.reject()
//             : Promise.resolve();
//     }
//     if (type === AUTH_CHECK) {
//         return localStorage.getItem('not_authenticated')
//             ? Promise.reject()
//             : Promise.resolve();
//     }
//     if (type === AUTH_GET_PERMISSIONS) {
//         const role = localStorage.getItem('role');
//         return Promise.resolve(role);
//     }
  
////     return Promise.reject('Unknown method');
//   };
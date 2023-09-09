import React from 'react';
import { Admin, Resource, 
  // defaultTheme, 
  // AppBar 
} from 'react-admin';
// import indigo from '@mui/material/colors/indigo';
// import pink from '@mui/material/colors/pink';
// import red from '@mui/material/colors/red';
// import UserIcon from '@mui/icons-material/People';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import simpleRestProvider from 'ra-data-simple-rest';
import ProductsList from './product/ProductsList';
import ProductCreate from './product/ProductCreate';
import ProductEdit from './product/ProductEdit';

const dataProvider = simpleRestProvider('http://localhost:3001');

// const myTheme = {
//   ...defaultTheme,
//   palette: {
//       mode: "dark",
//       primary: indigo,
//       secondary: pink,
//       error: red,
//   },
//   typography: {
//       // Use the system font instead of the default Roboto font.
//       fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Arial", "sans-serif"].join(","),
//   },
//   components: {
//       ...defaultTheme.components,
//       MuiTextField: {
//           defaultProps: {
//               variant: "outlined",
//           },
//       },
//       MuiFormControl: {
//           defaultProps: {
//               variant: "outlined",
//           },
//       },
//   },
// };

const Dashboard = () => {
  return (
    // <Admin dataProvider={dataProvider}>theme={myTheme} theme={lightTheme darkTheme={darkTheme}}
    //Si borras theme queda en blanco con azul
     <Admin dataProvider={dataProvider}>
      {/* Agrega tus recursos aquí */}
      {/* <Resource name="users" list={ProductList} icon={UserIcon} /> */}
      <Resource name="product" list={ProductsList} create={ProductCreate} edit={ProductEdit} icon={AddShoppingCartIcon} />
      {/* <Resource name="activities" list={ActivitiesList}  create={PostActivities} /> */}

    </Admin>
    
  );
};

export default Dashboard
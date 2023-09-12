import React from 'react';
import { Admin, Resource, 
  // defaultTheme, 
  // AppBar 
} from 'react-admin';

import { BsFillPeopleFill, BsReceiptCutoff, BsBoxSeamFill } from "react-icons/bs";
import authProvider from './authProvider';
import PanelAdmin from './PanelAdmin';
//? Products
import ProductsList from './product/ProductsList';
import ProductCreate from './product/ProductCreate';
import ProductEdit from './product/ProductEdit';

//? Orders
import OrderList from './orders/OrderList';

import dataProvider from './dataProvider';

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
     <Admin dashboard={PanelAdmin} dataProvider={dataProvider} authProvider={authProvider} >
      <Resource name="product" list={ProductsList} icon={BsBoxSeamFill} />
      <Resource name="users"  icon={BsFillPeopleFill} />
      <Resource name="orders"  list={OrderList} icon={BsReceiptCutoff} />
    </Admin>
  );
};

export default Dashboard
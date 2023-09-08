import React from 'react';
import indigo from '@mui/material/colors/indigo';
import pink from '@mui/material/colors/pink';
import red from '@mui/material/colors/red';
import { Admin, Resource, defaultTheme, AppBar } from 'react-admin';
import UserList2 from './users2';
import PostList from './posts';
import {ActivitiesList, PostActivities} from './activities';
import UserIcon from '@mui/icons-material/People';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// export const PostIcon = BookIcon;

import simpleRestProvider from 'ra-data-simple-rest';
import { ProductList, EditProduct } from './products';
const dataProvider = simpleRestProvider('http://localhost:3001');

const myTheme = {
  ...defaultTheme,
  palette: {
      mode: "dark",
      primary: indigo,
      secondary: pink,
      error: red,
  },
  typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Arial", "sans-serif"].join(","),
  },
  components: {
      ...defaultTheme.components,
      MuiTextField: {
          defaultProps: {
              variant: "outlined",
          },
      },
      MuiFormControl: {
          defaultProps: {
              variant: "outlined",
          },
      },
  },
};

const Dashboard = () => {
  return (
    // <Admin dataProvider={dataProvider}>theme={myTheme} theme={lightTheme darkTheme={darkTheme}}
    //Si borras theme queda en blanco con azul
     <Admin dataProvider={dataProvider} theme={myTheme}>
      {/* Agrega tus recursos aquí */}
      <Resource name="users" list={ProductList} icon={UserIcon} />
      <Resource name="product" list={ProductList} edit={EditProduct} icon={AddShoppingCartIcon} />
      {/* <Resource name="activities" list={ActivitiesList}  create={PostActivities} /> */}

    </Admin>
    
  );
};

export default Dashboard;



{/* <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} show={PostShow} /> */}
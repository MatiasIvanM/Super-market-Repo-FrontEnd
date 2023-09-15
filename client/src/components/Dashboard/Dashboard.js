import React from 'react';
import { Admin, Resource } from 'react-admin';

import { BsFillPeopleFill, BsReceiptCutoff, BsBoxSeamFill } from "react-icons/bs";
import authProvider from './authProvider';
import PanelAdmin from './PanelAdmin';
//? Products
import {ProductsList, DetailShow} from './product/ProductsList';
// import ProductCreate from './product/ProductCreate';
import ProductEdit from './product/ProductEdit';
import formProduct from '../../View/FormProduct/formProduct';

//? Orders
import OrderList from './orders/OrderList';

import dataProvider from './dataProvider';

// //? Users
import UsersList from './users/UsersList';
import UserEdit from './users/UserEdit';
import UserCreate from './users/UserCreate';


const Dashboard = () => {
  return (
     <Admin dashboard={PanelAdmin} dataProvider={dataProvider} authProvider={authProvider} >
      <Resource 
        name="product" 
        list={ProductsList} 
        edit={ProductEdit} 
        // create={ProductCreate}
        create={formProduct}
        icon={BsBoxSeamFill}
        show={DetailShow} 
      />
       <Resource 
        name="customer" 
        list={UsersList} 
        create={UserCreate} 
        edit={UserEdit} 
        icon={BsFillPeopleFill}
      />

       {/* <Resource name="users"  list={UsersList} create={UserCreate} edit={UserEdit} icon={BsFillPeopleFill} />  */}

      <Resource 
        name="orders"  
        list={OrderList} 
        icon={BsReceiptCutoff} 
      />
    </Admin>
  );
};

export default Dashboard

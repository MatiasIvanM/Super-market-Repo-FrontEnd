import React from "react";
import { Admin, Resource, Layout } from "react-admin";
import {
  BsFillPeopleFill,
  BsReceiptCutoff,
  BsBoxSeamFill,
  BsFillGearFill
} from "react-icons/bs";
import Bar from "./Bar";

import PanelAdmin from "./PanelAdmin";
//? Products
import { ProductsList, DetailShow } from "./product/ProductsList";
import ProductEdit from "./product/ProductEdit";
import formProduct from "../../View/FormProduct/formProduct";

//? Orders
import OrderList from "./orders/OrderList";

import dataProvider from "./dataProvider";
// import i18nProvider from "./i18nProvider";

// //? Users
// import UsersList from './users/UsersList';
import UserEdit from "./users/UserEdit";
import UserCreate from "./users/UserCreate";

import formCarrousel from "./carrousel/formCarrousel";

// ? Settings
const Setting = React.lazy(() => import("./Setting"));
const UsersList = React.lazy(() => import("./users/UsersList"));

const MyLayout = (props) => <Layout {...props} appBar={Bar} />;

const Dashboard = () => {
  let usuario = JSON.parse(localStorage.getItem('customer'));

  // console.log("Dashboard", localStorage.customer);
  console.log(usuario.name);
  return (
    <Admin
      dashboard={PanelAdmin}
      dataProvider={dataProvider}
      layout={MyLayout}
      darkTheme={{ palette: { mode: "dark" } }}
      // i18nProvider={i18nProvider}
      title="{usuario.name}"
    >
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
        name="customer/"
        list={UsersList}
        create={UserCreate}
        edit={UserEdit}
        icon={BsFillPeopleFill}
      />

      <Resource name="orders" list={OrderList} icon={BsReceiptCutoff} />

      <Resource
        name="settings"
        list={Setting}
        icon={BsFillGearFill}
      />
    </Admin>
  );
};

export default Dashboard;

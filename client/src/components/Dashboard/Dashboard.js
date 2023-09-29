import React from "react";
import { Admin, Resource, Layout } from "react-admin";
import {
  BsFillGrid3X3GapFill,
  BsFillPeopleFill,
  BsReceiptCutoff,
  BsBoxSeamFill,
  BsFillGearFill,
} from "react-icons/bs";

import Bar from "./Bar";
import PanelAdmin from "./PanelAdmin";
import dataProvider from "./dataProvider";

//? Products
import { ProductsList, DetailShow } from "./product/ProductsList";
import ProductEdit from "./product/ProductEdit";
import formProduct from "../../View/FormProduct/formProduct";

//? Orders
import { OrderList, DetailBuy } from "./orders/OrderList";

// //? Users
// import UsersList from './users/UsersList';
import UserEdit from "./users/UserEdit";
import UserCreate from "./users/UserCreate";
import UserDetail from "./users/UserDetail";

//? Category
import FormCategory from "./categories/FormCategory";
import CategoryList from './categories/CategoryList';
import formCarrousel from "./carrousel/formCarrousel";

// ? Settings
const Setting = React.lazy(() => import("./Setting"));
const UsersList = React.lazy(() => import("./users/UsersList"));

const MyLayout = (props) => <Layout {...props} appBar={Bar} />;

const Dashboard = () => {

  return (
    <Admin
      options={{ label: "Panel" }}
      dashboard={PanelAdmin}
      dataProvider={dataProvider}
      layout={MyLayout}
      darkTheme={{ palette: { mode: "dark" } }}
      // i18nProvider={i18nProvider}
      // title="{usuario.name}"
    >
      <Resource
      options={{ label: "Productos" }}
        name="product"
        list={ProductsList}
        edit={ProductEdit}
        // create={ProductCreate}
        create={formProduct}
        icon={BsBoxSeamFill}
        show={DetailShow}
      />
      <Resource
        options={{ label: "Usuarios" }}
        name="customer"
        list={UsersList}
        show={UserDetail}
        create={UserCreate}
        edit={UserEdit}
        icon={BsFillPeopleFill}
        />

      <Resource
        options={{ label: "Compras" }}
        name="buy"
        list={OrderList}
        show={DetailBuy}
        icon={BsReceiptCutoff}
        />

      {/* <Resource name="settings" list={Setting} icon={BsFillGearFill} /> */}

      <Resource
        options={{ label: "Categorias" }}
        name="category"
        list={CategoryList}
        icon={BsFillGrid3X3GapFill}
        create={FormCategory}
      />
      
    </Admin>
  );
};

export default Dashboard;

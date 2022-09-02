import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//client
import Layout from "./comps/general/Layout";
import CreateStore from "./pages/createStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./comps/general/Logout";
import Signup from "./pages/Signup";
import UpdateAccount from "./pages/UpdateAccount";
import Page404 from "./pages/page404";
import AllStores from "./pages/Stores";
import About from "./pages/about";
import StoreHome from "./pages/StoreHome";
import MyStores from "./pages/myStores";
import ApplyForCourier from "./pages/applyForCourier";
import FavsProducts from "./pages/favsProducts";
import Checkout from "./pages/checkout";
import OldOrders from "./pages/oldOrders";
import OrdersListStore from "./storeAdmin/ordersListStore";
import Chat from "./chat/Chat";
// store Admin imports
import LayoutStore from "./storeAdmin/layoutStore";
import EditStoreAdmin from "./storeAdmin/editStoreAdmin";
import ProductsStoreAdmin from "./storeAdmin/productsStoreAdmin";
import EditProductAdminStore from "./storeAdmin/editProductAdminStore";
import AddProductStoreAdmin from "./storeAdmin/addProductStoreAdmin";
import OpenOrders from "./storeAdmin/openOrders";
import HomeStore from "./storeAdmin/HomeStore";
import CategoriesStoreAdmin from "./storeAdmin/categoriesStoreAdmin";
//courier import
import LayoutCourier from "./courier/layoutCourier";
import HomeCourier from "./courier/homeCourier";
import OpenOrdersMap from "./courier/openOrdersMap";
import MapRouting from "./courier/mapRouting";
// import DeliveryInfo from "./courier/deliveryInfo";
// new login admin
import MyOrders from "./courier/myOrders";
import List from "./admin-dashboard/pages/list/List";
import New from "./admin-dashboard/pages/new/New";
import { productInputs, userInputs } from "./admin-dashboard/formSource";
import AdminHome from "./admin-dashboard/pages/home/AdminHome";
import { DarkModeContext } from "./admin-dashboard/context/darkModeContext";
import "./admin-dashboard/style/dark.scss";
import SingleUser from "./admin-dashboard/pages/single/SingleUser";
import SingleStore from "./admin-dashboard/pages/single/singleStore";
function AppRouts() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* client */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="signup" element={<Signup />} />
            <Route path="uptateAccount" element={<UpdateAccount />} />
            <Route path="about" element={<About />} />
            <Route path="favorites" element={<FavsProducts />} />
            <Route path="stores" element={<AllStores />} />
            <Route path="store/:id" element={<StoreHome />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="oldOrders" element={<OldOrders />} />
            {/* footer */}
            <Route path="createStore" element={<CreateStore />} />
            <Route path="myStores" element={<MyStores />} />
            <Route path="forums" element={<Chat />} />
            <Route path="ApplyForCourier" element={<ApplyForCourier />} />
            {/* <Route path="/searchStore/:searchQ" element={<SearchStore />} /> */}
          </Route>
          {/*store admin*/}
          <Route path="/storeAdmin/:id" element={<LayoutStore />}>
            <Route index element={<HomeStore />} />
            <Route path="editStore" element={<EditStoreAdmin />} />
            <Route path="categories" element={<CategoriesStoreAdmin />} />
            <Route path="products" element={<ProductsStoreAdmin />} />
            <Route path="orders" element={<OrdersListStore />} />
            <Route path="openOrders" element={<OpenOrders />} />
            <Route path="products/edit/:prodId" element={<EditProductAdminStore />} />
            <Route path="products/addProduct" element={<AddProductStoreAdmin />} />
          </Route>
          {/* Courier routes */}
          <Route path="/courier" element={<LayoutCourier />}>
            <Route index element={<HomeCourier />} />
            <Route path="mapOrders" element={<OpenOrdersMap />} />
            <Route path="takeDelivery" element={<MapRouting />} />
            <Route path="/courier/ordersHistory" element={<MyOrders />} />
          </Route>
          <Route path="/admin-dashboard">
            <Route index element={<AdminHome />} />
            <Route path="login" element={<LoginAdmin />} />
            <Route path="users">
              <Route index element={<List data="users" />} />
              <Route path="single" element={<SingleUser />} />
              {/* <Route path="new" element={<New  title="Add New User" />} /> */}
            </Route>
            <Route path="stores">
              <Route index element={<List data="stores" />} />
              <Route path=":storeId" element={<SingleStore />} />
              {/* <Route path="new" element={<New inputs={productInputs} title="Add New Product" />} /> */}
            </Route>
            <Route path="products">
              <Route index element={<List data="products" />} />
              {/* <Route path=":productId" element={<Single />} /> */}
              {/* <Route path="new" element={<New inputs={productInputs} title="Add New Product" />} /> */}
            </Route>
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouts;

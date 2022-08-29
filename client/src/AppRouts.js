import React from "react";
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
import SearchStore from "./comps/store/searchStore";
import About from "./pages/about";
import StoreHome from "./pages/StoreHome";
import MyStores from "./pages/myStores";
import ApplyForCourier from "./pages/applyForCourier";
// store Admin imports
import LayoutStore from "./storeAdmin/layoutStore";
import EditStoreAdmin from "./storeAdmin/editStoreAdmin";
import ProductsStoreAdmin from "./storeAdmin/productsStoreAdmin";
import EditProductAdminStore from "./storeAdmin/editProductAdminStore";
import AddProductStoreAdmin from "./storeAdmin/addProductStoreAdmin";
import OpenOrders from "./storeAdmin/openOrders";
// admin imports
import LayoutAdmin from "./admin/layoutAdmin";
import HomeAdmin from "./admin/HomeAdmin";
import UsersList from "./admin/usersList";
import OrdersAdmin from "./admin/orders/ordersAdmin";
import OrderInfoAdmin from "./admin/orders/orderInfoAdmin";
import StoresAdmin from "./admin/storesAdmin";
import ProductsAdmin from "./admin/productsAdmin";
import HomeStore from "./storeAdmin/HomeStore";
import FavsProducts from "./pages/favsProducts";
import Checkout from "./pages/checkout";
import OldOrders from "./pages/oldOrders";
import OrdersListStore from "./storeAdmin/ordersListStore";
import Chat from "./chat/Chat";
import ChatAdmin from "./admin/chat/ChatAdmin";
import CategoriesStoreAdmin from "./storeAdmin/categoriesStoreAdmin";
//courier import
import LayoutCourier from "./courier/layoutCourier";
import HomeCourier from "./courier/homeCourier";
import OpenOrdersMap from "./courier/openOrdersMap";
import MapRouting from "./courier/mapRouting";
import MyOrders from "./courier/myOrders";
// import DeliveryInfo from "./courier/deliveryInfo";

function AppRouts() {
  return (
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
          <Route path="searchStore/:searchQ" element={<SearchStore />} />
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
          <Route
            path="products/edit/:prodId"
            element={<EditProductAdminStore />}
          />
          <Route
            path="products/addProduct"
            element={<AddProductStoreAdmin />}
          />
        </Route>
        {/*admin*/}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="home" element={<HomeAdmin />} />
          <Route path="users" element={<UsersList />} />
          <Route path="stores" element={<StoresAdmin />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="orders" element={<OrdersAdmin />} />
          <Route path="orders/:id" element={<OrderInfoAdmin />} />
          <Route path="chat" element={<ChatAdmin />} />
        </Route>
        {/* Courier routes */}
        <Route path="/courier" element={<LayoutCourier />}>
          <Route index element={<HomeCourier />} />
          <Route path="mapOrders" element={<OpenOrdersMap />} />
          <Route path="takeDelivery" element={<MapRouting />} />
          <Route path="/courier/ordersHistory" element={<MyOrders />} />
          {/* <Route path="/courier/deliveryInfo/:id" element={<DeliveryInfo />} /> */}
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouts;

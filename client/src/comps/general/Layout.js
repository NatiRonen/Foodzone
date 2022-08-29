import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Cart from "../store/cart";
import Navigation from "./Navigation";
import { AppContext } from "../../context/appContext";
import { toast } from "react-toastify";
import { API_URL, doApiGet } from "../../services/apiService";
// import Cart from "./store/cart";

function Layout() {
  const { socket, displayFooter } = useContext(AppContext);

  useEffect(() => {
    listenToOrders();
  }, []);

  const listenToOrders = async () => {
    let url = API_URL + "/orders/userOrder";
    let resp = await doApiGet(url);
    resp.data.forEach((order) => {
      socket.emit("join-room-orders", order.short_id);
    });
  };
  socket.off("status-changed").on("status-changed", (_status) => {
    // toast.info(`Your order is  ${_status}`);
    toast.info(`Your order is ${_status.replaceAll("_", " ")}`);
  });
  return (
    <div className="page-container">
      {" "}
      <Navigation />
      <Cart />
      <Outlet className="content-wrap" />
      {displayFooter && <Footer />}
    </div>
  );
}

export default Layout;

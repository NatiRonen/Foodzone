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
  socket.off("status-changed-msg").on("status-changed-msg", (_room, _status, _duration) => {
    let msg = `Order ${_room} is ${_status.replaceAll("_", " ")}`;
    if (_duration) {
      msg = msg + ". Estimated delivery time:" + _duration;
    }
    toast.info(msg);
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

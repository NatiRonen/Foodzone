import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../services/apiService";
import LottieAnimation from "../comps/misc/lottieAnimation";
import Ticket from "./ticket";
import "./css/ordersPanel.css";

function OpenOrders(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + `/orders/sotreOrders/` + params.id;
    try {
      let respOrders = await doApiGet(url);
      // console.log(respOrders.data);
      let filterPending = respOrders.data.filter(
        (order) =>
          order.status === "paid" ||
          order.status === "on_the_way" ||
          order.status === "ready_for_shipment"
      );
      console.log(filterPending);
      setOrders(filterPending);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  if (!loading && orders.length === 0)
    return <h2 className="display-4 text-center mt-5 text-danger">No orders found</h2>;

  return (
    <div className="container-fluid bg_color">
      <section className="container">
        <h1 className="orders_titel">Orders To Make</h1>
        <div className="container row justify-content-between">
          {/* start Ticket */}
          {orders.map((item, i) => {
            return <Ticket key={item._id} item={item} i={i} doApi={doApi} />;
          })}
          {/* end Ticket */}
        </div>

        {loading && <LottieAnimation />}
      </section>
    </div>
  );
}

export default OpenOrders;

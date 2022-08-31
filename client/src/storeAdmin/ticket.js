import React, { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { API_URL, doApiMethod } from "../services/apiService";

function Ticket(props) {
  const item = props.item;
  const i = props.i;
  let params = useParams();

  const { socket } = useContext(AppContext);

  useEffect(() => {
    socket.emit("join-room-orders", item.short_id);
  }, []);

  socket.off("status-changed").on("status-changed", () => {
    props.doApi();
  });

  const changeStatus = async (_status) => {
    console.log(item._id);
    console.log("_status", _status);
    let url = API_URL + `/orders/` + item._id + `?status=` + _status;
    try {
      let resp = await doApiMethod(url, "PATCH", {});

      if (resp.data.modifiedCount === 1) {
        socket.emit("status-changed", params.id, _status);
        socket.emit("status-changed", item.short_id, _status);
        socket.emit("status-changed-msg", item.short_id, _status);
        props.doApi();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="order_card col-lg-6 mb-4">
      <section className="order_number p-3">
        <div className="container mt-4">
          <span>x {i + 1}</span>
          <div className="order_text">
            <span>{item.short_id}</span>
            <span>Order Number</span>
          </div>
        </div>
        {/* {item.status === "on_the_way" && (
          <button className="btn btn-outline-success mt-4">Order Takend</button>
        )} */}
        {item.status === "paid" && (
          <button
            onClick={() => {
              changeStatus("ready_for_shipment");
            }}
            className="btn btn-outline-success mt-4"
          >
            Ready for shipment
          </button>
        )}
        {item.status === "on_the_way" && (
          <button
            onClick={() => {
              changeStatus("shipped");
            }}
            className="btn btn-outline-success mt-4"
          >
            Shipped
          </button>
        )}
      </section>
      <section className="card-cont px-2">
        <span
          className={
            item.status === "on_the_way"
              ? "badge bg-info float-end"
              : item.status === "paid"
              ? "badge bg-warning float-end"
              : "badge bg-success float-end"
          }
          style={{ fontSize: "0.8em" }}
        >
          {item.status === "on_the_way" ? "Courier on his way" : item?.status?.replaceAll("_", " ")}
        </span>
        <small>Total</small>
        <h3>₪ {item.total_price}</h3>
        <div className="even-date">
          <time>
            {/* <span>{item.date_created.replace(/T/, " ").substr(0, 16)}</span> */}
            <span>{item.date_created}</span>
          </time>
        </div>
        <div className="even-info">
          <p>List of Products</p>
          {item.products_ar.map((prod) => {
            return (
              <div key={prod._id} className="d-flex flex-row">
                {prod.img_url && <img src={prod.img_url} className="prod_img me-2" />}
                <p>
                  {prod.name} <span className="h6">x{prod.qty}</span>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Ticket;

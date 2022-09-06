import React, { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { API_URL, doApiMethod } from "../services/apiService";
import { getTimeAndDateFormat } from "../utils/dateRormated";
import ListGroup from "react-bootstrap/ListGroup";

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
    <div className="order_card col-lg-6">
      <section className="order_number p-3">
        <span
          className={
            item.status === "on_the_way"
              ? "badge bg-info float-end"
              : item.status === "paid"
              ? "badge bg-warning float-end"
              : "badge bg-success float-end"
          }
          style={{ fontSize: "0.9em" }}
        >
          {item.status === "on_the_way" ? "Courier on his way" : item?.status?.replaceAll("_", " ")}
        </span>
        <div className="container mt-4">
          <span>x {i + 1}</span>
          <div className="order_text">
            <span>{item.short_id}</span>
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
        <div className="even-date mt-3">
          <span className="fs-6">{getTimeAndDateFormat(item.date_created)}</span>
          <time></time>
        </div>
      </section>
      <div className="card-cont px-2 py-0 m-0">
        <ListGroup variant="flush">
          {item.products_ar.map((prod) => {
            return (
              <ListGroup.Item key={prod._id} className="fs-6">
                {/* {prod.imgUrl && <img src={prod.imgUrl} className="prod_img me-2" />} */}
                {prod.name} <span className="h6">x{prod.qty}</span>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
}

export default Ticket;

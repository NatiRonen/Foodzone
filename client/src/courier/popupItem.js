import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Modal, Row, ListGroup } from "react-bootstrap";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { API_URL, doApiMethod } from "../services/apiService";
import { ON_THE_WAY_ORDER_STATUS } from "../services/consts";
import { saveOpenShipmentLocal } from "../services/localService";
import { calculateRoute, getCurrentAddress, handleRouteDetails } from "../services/mapServices";

function PopupItem(props) {
  let order = props.order;
  let storeAddress = props.storeAddress;
  let currentPosition = props.currentPosition;
  // let currentPosition = { lat: 31.9461538, lng: 34.881139 };
  const nav = useNavigate();
  const [routeDetails, setRouteDetails] = useState({});
  const { socket, setOpenShipment } = useContext(AppContext);

  useEffect(() => {
    setRoute();
  }, []);

  const setRoute = async () => {
    let currAddress = await getCurrentAddress(currentPosition);
    const { routeDetails } = await calculateRoute(currAddress, storeAddress, order.destination);
    setRouteDetails(routeDetails);
  };

  const takeOrder = async () => {
    let url = API_URL + "/orders/" + order._id + "?status=" + ON_THE_WAY_ORDER_STATUS;
    let resp = await doApiMethod(url, "PATCH", {});
    if (resp.data.modifiedCount === 1) {
      socket.off("status-changed-msg", order.short_id);
      socket.emit("status-changed", order.short_id, ON_THE_WAY_ORDER_STATUS, routeDetails.duration);
      saveOpenShipmentLocal({ currentPosition, orderId: order._id });
      setOpenShipment(true);
      nav("../takeDelivery");
    }
  };

  return (
    <ListGroup.Item key={order._id}>
      <Row className="align-items-center justify-content-between">
        <Col xs={1}>
          <MdOutlineDeliveryDining color="green" size="1.5em" />
        </Col>
        <Col xs={7}>
          <div>
            <span className="text-secondary">Destination: </span>
            <span className="text-primary"> {order.destination} </span>
          </div>
          <div>
            <span className="text-secondary">Distance: </span>
            <span className="text-primary"> {routeDetails.distance}</span>
          </div>
          <div>
            <span className="text-secondary">Estimate tiem: </span>
            <span className="text-primary"> {routeDetails.duration}</span>
          </div>
          <div className="small"></div>
        </Col>
        <Col className="p-0" xs={3}>
          <button onClick={takeOrder} className="btn btn-outline-primary float-end">
            Take order
          </button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default PopupItem;

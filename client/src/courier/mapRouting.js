import React, { useContext, useEffect, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import RoutingCard from "./routingCard";
import { toast } from "react-toastify";
import io from "socket.io-client";
import "./css_courier/courier.css";
import LottieAnimation from "../comps/misc/lottieAnimation";

import { useJsApiLoader, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { calculateRoute, getCurrentAddress, MAPS_KEY } from "../services/mapServices";
import { Button, Card, Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
import OrderInfo from "../comps/orders/OrderInfo";
import { DELIVERED_ORDER_STATUS, READY_FOR_SHIPMENT_ORDER_STATUS } from "../services/consts";
import { AppContext } from "../context/appContext";
import { checkOpenShipmentLocal, removeOpenShipmentLocal } from "../services/localService";
import AuthCourierComp from "../comps/auth/authCourierComp";

function MapRouting(props) {
  const params = useParams();
  const nav = useNavigate();

  const [map, setMap] = useState(/**@type google.maps.map*/ (null));
  const [orderData, setOrderData] = useState(null);
  const [routeDetails, setRouteDetails] = useState({});
  const [directionResponse, setDirectionResponse] = useState(null);

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const { socket, setOpenShipment } = useContext(AppContext);

  let openShipment = checkOpenShipmentLocal();
  let orderId = openShipment.orderId;
  let currentPosition = openShipment.currentPosition;

  console.log(currentPosition);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (openShipment) {
      doApi();
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + "/orders/deliveryInfo/" + orderId;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setOrderData(resp.data);
      setRoutes(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const setRoutes = async (_data) => {
    let currentAddress = await getCurrentAddress(currentPosition);
    const { results, routeDetails } = await calculateRoute(
      currentAddress,
      _data.store.address,
      _data.order.destination
    );
    console.log(results);
    setRouteDetails(routeDetails);
    setDirectionResponse(results);
  };

  const orderDelivered = async () => {
    let url = API_URL + "/orders/" + orderData.order._id + "?status=" + DELIVERED_ORDER_STATUS;
    let resp = await doApiMethod(url, "PATCH", {});
    if (resp.data.modifiedCount === 1) {
      socket.emit("status-changed", orderData.order.short_id, DELIVERED_ORDER_STATUS);
      toast.success("order completed successfully");
      removeOpenShipmentLocal();
      setOpenShipment(false);
      nav("../ordersHistory");
    }
  };

  if (!isLoaded || !orderData) return <LottieAnimation />;
  return (
    <>
      <AuthCourierComp />
      <Row className="p-4 g-3">
        <Col md={3}>
          <Card style={{ width: "100%" }}>
            <Card.Header>Route</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="text-secondary">Store address: </span>
                <span className="text-primary"> {orderData.store.address} </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="text-secondary">Destination: </span>
                <span className="text-primary"> {orderData.order.destination} </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="text-secondary">Distance: </span>
                <span className="text-primary"> {routeDetails.distance}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <span className="text-secondary">Estimate tiem: </span>
                <span className="text-primary"> {routeDetails.duration}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className="mt-3" style={{ width: "100%" }}>
            <Card.Header>Client details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="text-secondary">name: </span>
                <span className="text-primary"> {orderData.user.name} </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="text-secondary">phone: </span>
                <span className="text-primary"> {orderData.user.phone} </span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <div className="text-center w-100 d-flex align-center mt-3">
            <button onClick={handleToggle} className="btn btn-outline-primary float-end m-auto">
              Order details
            </button>
          </div>
          <div className="text-center w-100 d-flex align-center mt-3">
            <button onClick={orderDelivered} className="btn btn-outline-success float-end m-auto">
              Order delivered successfully
            </button>
          </div>
        </Col>
        <Col md={9}>
          <div className="container map-container">
            <GoogleMap
              center={currentPosition}
              zoom={18}
              mapContainerStyle={{ width: "100%", height: "80vh" }}
              onLoad={(map) => setMap(map)}
            >
              {directionResponse && <DirectionsRenderer directions={directionResponse} />}
            </GoogleMap>
          </div>
        </Col>
      </Row>

      <OrderInfo item={orderData.order} show={show} handleToggle={handleToggle} />
    </>
  );
}

export default MapRouting;

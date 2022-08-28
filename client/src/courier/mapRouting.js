import React, { useContext, useEffect, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import RoutingCard from "./routingCard";
import { toast } from "react-toastify";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { BsChevronRight } from "react-icons/bs";
import io from "socket.io-client";
import "./css_courier/courier.css";
import LottieAnimation from "../comps/misc/lottieAnimation";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { calculateRoute, getCurrentAddress, MAPS_KEY } from "../services/mapServices";
import { Button, Card, Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
import OrderInfo from "../comps/orders/OrderInfo";
import { DELIVERED_ORDER_STATUS } from "../services/consts";
import { AppContext } from "../context/appContext";
import { checkOpenShipmentLocal, remonveOpenShipment } from "../services/localService";

function MapRouting(props) {
  const params = useParams();
  const nav = useNavigate();

  const [map, setMap] = useState(/**@type google.maps.map*/ (null));
  const [orderData, setOrderData] = useState(null);
  const [routeDetails, setRouteDetails] = useState({});
  const [directionResponse, setDirectionResponse] = useState(null);

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

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
      remonveOpenShipment();
      toast.success("order completed successfully");
      nav("../ordersHistory");
    }
  };

  if (!isLoaded || !orderData) return <LottieAnimation />;
  return (
    <>
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
// const takeDelivery = async (_orderId, _orderShortId) => {
//   console.log(_orderId);
//   let url = API_URL + "/orders/shipping/takingOrder";
//   try {
//     let resp = await doApiMethod(url, "PATCH", { orderId: _orderId });
//     // console.log(resp.data);
//     if (resp.data.modifiedCount === 1) {
//       const socket = io.connect(API_URL);
//       socket.emit("taking_order", _orderShortId);
//       toast.info("You took the shipment");
//       nav("/courier/myOrders");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// <div className="container my-5">
//   <div className="text-center">
//     <h2 className="display-4 mb-4 animaLinkSM"> Order Details </h2>
//     <button
//       style={{ background: "none" }}
//       className="position-absolute top-0 end-0 animaLinkSM "
//       onClick={() => {
//         nav(-1);
//       }}
//     >
//       Back <BsChevronRight className="mx-2" />
//     </button>
//   </div>
//   {loading && <LottieAnimation />}
//   {!loading && orderInfo.order.status === "shipped" && (
//     <h2 className="text-center display-4 text-danger">
//       The shipment has already been taken... <MdOutlineDeliveryDining className="me-2" />
//     </h2>
//   )}
//   {!loading (
//     <React.Fragment>
//       <div className="container text-center">
//         <button
//           onClick={() => {
//             takeDelivery(orderInfo.order._id, orderInfo.order.short_id);
//           }}
//           className="btn btn-outline-primary rounded-pill col-6 my-4"
//         >
//           Take the delivery <MdOutlineDeliveryDining size="1.5em" className="me-2" />
//         </button>
//       </div>
//     </React.Fragment>
//   )}
// </div>

export default MapRouting;

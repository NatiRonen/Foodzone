import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import RoutingMachine from './routingMachine';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import RoutingCard from './routingCard';
import LottieAnimation from '../comps/general_comps/lottieAnimation';
import { toast } from 'react-toastify';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { BsChevronRight } from 'react-icons/bs';
import io from 'socket.io-client';
import './css_courier/courier.css';

function MapRouting(props) {
  const [myLocation, setMyLocation] = useState([0, 0]);
  const [storeStop, setStoreStop] = useState([0, 0]);
  const [clientEnd, setClientEnd] = useState([0, 0]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [routingTime, setRoutingTime] = useState('');
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const nav = useNavigate();

  // const socket = io.connect(API_URL);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let locate = [pos.coords.latitude, pos.coords.longitude];
        setMyLocation(locate);
      },
      (err) => {
        console.log(err);
        if (err.code === 1) {
          toast.error('User denied Geolocation');
        }
        console.log('Something went wrong');
      }
    );
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + '/orders/deliveryInfo/' + params.id;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setOrderInfo(resp.data);
      setStoreStop([resp.data.store.address.y, resp.data.store.address.x]);
      setClientEnd([resp.data.order.destination.y, resp.data.order.destination.x]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const takeDelivery = async (_orderId, _orderShortId) => {
    console.log(_orderId);
    let url = API_URL + '/orders/shipping/takingOrder';
    try {
      let resp = await doApiMethod(url, 'PATCH', { orderId: _orderId });
      // console.log(resp.data);
      if (resp.data.modifiedCount === 1) {
        const socket = io.connect(API_URL);
        socket.emit('taking_order', _orderShortId);
        toast.info('You took the shipment');
        nav('/courier/myOrders');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center">
        <h2 className="display-4 mb-4 animaLinkSM"> Order Details </h2>
        <button
          style={{ background: 'none' }}
          className="position-absolute top-0 end-0 animaLinkSM "
          onClick={() => {
            nav(-1);
          }}>
          Back <BsChevronRight className="mx-2" />
        </button>
      </div>
      {loading && <LottieAnimation />}
      {!loading && orderInfo.order.status === 'shipped' && (
        <h2 className="text-center display-4 text-danger">
          The shipment has already been taken... <MdOutlineDeliveryDining className="me-2" />
        </h2>
      )}
      {!loading && orderInfo.order.status === 'paid' && (
        <RoutingCard orderInfo={orderInfo} routingTime={routingTime} />
      )}
      {!loading && orderInfo.order.status === 'paid' && (
        <React.Fragment>
          <MapContainer className="map" center={myLocation} zoom={10} scrollWheelZoom={true}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="ShipMarket"
            />
            {/* comp for Routing */}
            <RoutingMachine
              start={myLocation}
              stop={storeStop}
              end={clientEnd}
              setRoutingTime={setRoutingTime}
            />
          </MapContainer>
          <div className="container text-center">
            <button
              onClick={() => {
                takeDelivery(orderInfo.order._id, orderInfo.order.short_id);
              }}
              className="btn btn-outline-primary rounded-pill col-6 my-4">
              Take the delivery <MdOutlineDeliveryDining size="1.5em" className="me-2" />
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default MapRouting;

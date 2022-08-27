import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import RoutingMachine from './routingMachine';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RoutingCard from './routingCard';
import LottieAnimation from '../comps/general_comps/lottieAnimation';
import { toast } from 'react-toastify';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { BsChevronRight } from 'react-icons/bs';
import { BiLike } from 'react-icons/bi';
import io from 'socket.io-client';
import './css_courier/courier.css';
import OrderItemsInfo from './orderItemsInfo';

function DeliveryInfo(props) {
  const [myLocation, setMyLocation] = useState([0, 0]);
  const [storeStop, setStoreStop] = useState([0, 0]);
  const [clientEnd, setClientEnd] = useState([0, 0]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [routingTime, setRoutingTime] = useState('');
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const nav = useNavigate();
  const location = useLocation();

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
    console.log('Deliver id: ', location.state ? location.state : 'No Id');
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

  const checkDelivery = (_CourierId) => {
    if (_CourierId === location.state) {
      return true;
    }
    return false;
  };

  const orderComplete = async (_orderId, _orderShortId) => {
    toast.success('Order completed');
    console.log(_orderId);
    let url = API_URL + '/orders/shipping/orderStatus';
    try {
      let resp = await doApiMethod(url, 'PATCH', { orderId: _orderId, status: 'complete' });
      console.log(resp.data);
      if (resp.data.modifiedCount === 1) {
        const socket = io.connect(API_URL);
        socket.emit('order_completed', _orderShortId);
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
      {!loading &&
        orderInfo.order.status === 'shipped' &&
        !checkDelivery(orderInfo.order.driver_id) && (
          <h2 className="text-center display-4 text-danger">
            The shipment has already been taken... <MdOutlineDeliveryDining className="me-2" />
          </h2>
        )}
      {!loading && orderInfo.order.status === 'complete' && (
        <h2 className="text-center display-4 text-success">
          The shipment is Complete ... <MdOutlineDeliveryDining className="me-2" />
        </h2>
      )}
      {!loading && checkDelivery(orderInfo.order.driver_id) && (
        <React.Fragment>
          <RoutingCard orderInfo={orderInfo} routingTime={routingTime} />
          <MapContainer className="map mb-5" center={myLocation} zoom={10} scrollWheelZoom={true}>
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
          {/* show orders item + info */}
          <OrderItemsInfo orderInfo={orderInfo} />
          {orderInfo.order.status !== 'complete' && (
            <div className="container text-center">
              <button
                onClick={() => {
                  orderComplete(orderInfo.order._id, orderInfo.order.short_id);
                }}
                className="btn btn-outline-success rounded-pill col-6 my-4">
                Order Complete <BiLike size="1.5em" className="me-2" />
              </button>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default DeliveryInfo;

import React, { useEffect, useRef, useState } from "react";
import { API_URL, doApiGet } from "../services/apiService";
import PopupMap from "./popupMap";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { getCurrentLocation, getGeoCodings, MAPS_KEY } from "../services/mapServices";
import "./css_courier/courier.css";

const STORE_ICON =
  "https://cdn4.iconfinder.com/data/icons/map-pins-7/64/map_pin_pointer_location_navigation_parcel_package_box_delivery-64.png";

function OpenOrdersMap(props) {
  const [map, setMap] = useState(/**@type google.maps.map*/ (null));
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [storeswithOrders, setStoresWithOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [popupInfo, setPopupInfo] = useState([]);

  const handleToggle = () => setShow(!show);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    doApi();
  }, []);

  useEffect(() => {
    getCurrentLocation(setCurrentPosition);
  }, [map]);

  const doApi = async () => {
    let ordersUrl = API_URL + "/orders/storesWithOrders";
    try {
      let resp = await doApiGet(ordersUrl);
      let storesOrdersArray = resp.data.data;
      for (let item of storesOrdersArray) {
        item.store.coordinates = await getGeoCodings(item.store.address);
      }
      console.log(storesOrdersArray);
      setStoresWithOrders(storesOrdersArray);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div style={{ width: "100%", height: "100vh" }} className="container map-container">
      {show && (
        <PopupMap
          popupInfo={popupInfo}
          show={show}
          handleToggle={handleToggle}
          currentPosition={currentPosition}
        />
      )}
      <GoogleMap
        center={currentPosition}
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={(map) => setMap(map)}
      >
        {storeswithOrders.map((item, idx) => {
          return (
            <Marker
              key={idx}
              position={item.store.coordinates}
              icon={STORE_ICON}
              title={item.store.name}
              onClick={() => {
                handleToggle();
                setPopupInfo(item);
              }}
            ></Marker>
          );
        })}
        <Marker position={currentPosition} title="You are here" />
      </GoogleMap>
    </div>
  );
}

export default OpenOrdersMap;

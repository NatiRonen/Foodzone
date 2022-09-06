import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Modal, Row, ListGroup } from "react-bootstrap";
import PopupItem from "./popupItem";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { getGeoCodings, MAPS_KEY } from "../services/mapServices";
import { AppContext } from "../context/appContext";

function PopupMap(props) {
  const [storeGeoCode, setStroeGeoCode] = useState();
  const [map, setMap] = useState(/**@type google.maps.map*/ (null));
  let show = props.show;
  let handleToggle = props.handleToggle;
  const item = props.popupInfo;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    getPos();
  }, []);

  const getPos = async () => {
    let pos = await getGeoCodings(item.store.address);
    console.log(pos);
    setStroeGeoCode(pos);
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Modal
      show={show}
      onHide={handleToggle}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-3 text-muted" id="contained-modal-title-vcenter">
          {item.store.name} - <span className="fs-5">{item.store.address}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "calc(100vh - 210px)",
          overflowY: "auto",
        }}
      >
        <div className="container map-container">
          <GoogleMap
            center={{ lat: 32.089717, lng: 34.8502956 }}
            zoom={16}
            mapContainerStyle={{ width: "100%", height: "30vh" }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={{ lat: 32.089717, lng: 34.8502956 }} />
          </GoogleMap>
        </div>
        <ListGroup variant="flush">
          {item.orders.map((order) => {
            return (
              <PopupItem
                order={order}
                storeAddress={item.store.address}
                currentPosition={props.currentPosition}
              />
            );
          })}
        </ListGroup>
        <hr className="mt-0" />
        <div className="small">{item.orders.length} open orders</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleToggle}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopupMap;

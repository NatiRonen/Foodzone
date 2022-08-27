import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, ListGroup } from "react-bootstrap";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function PopupItem(props) {
  let order = props.order;
  let storeAddress = props.storeAddress;
  let currentPosition = props.currentPosition;
  const nav = useNavigate();
  const [distance, setDistance] = useState("");
  const [duration, setDutation] = useState("");
  const [currentAddress, setCurrentAddress] = useState({});

  useEffect(() => {
    getCurrentAddress(currentPosition);
  }, []);

  useEffect(() => {
    calculateRoute(currentAddress, storeAddress, order.destination);
  }, [currentAddress]);

  const getCurrentAddress = async (_pos) => {
    let url =
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${_pos.lat},${_pos.lng}&key=` +
      process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    let resp = await axios(url);
    setCurrentAddress(resp.data.results[0].formatted_address);
  };

  const calculateRoute = async (_origin, _stopPoint, _destination) => {
    if (_origin == "" || _destination == "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: _origin,
      destination: _destination,
      waypoints: [
        {
          location: _stopPoint,
          stopover: true,
        },
      ],
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    // setDirectionResponse(results);
    let totalDistance =
      results.routes[0].legs[0].distance.value + results.routes[0].legs[1].distance.value;
    let totalDuration =
      results.routes[0].legs[0].duration.value + results.routes[0].legs[1].duration.value;
    let routeDetails = handleRouteDetails(totalDistance, totalDuration);
    setDistance(routeDetails.distanceSting);
    setDutation(routeDetails.durationSting);
  };

  const handleRouteDetails = (_distance, _duration) => {
    let distanceSting = "";
    let durationSting = "";

    let distanceValue = (_distance / 1000).toFixed(1);
    distanceSting = `${distanceValue} km`;

    let durationValue = (_duration / 60).toFixed(0);
    if (durationValue > 99) {
      let durationMinutes = durationValue % 60;
      let durationHours = (durationValue / 60).toFixed(0);
      durationSting = `${durationHours} h, ${durationMinutes} m`;
    } else {
      durationSting = `${durationValue} m`;
    }
    return { distanceSting, durationSting };
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
            <span className="text-primary"> {distance}</span>
          </div>
          <div>
            <span className="text-secondary">Estimate tiem: </span>
            <span className="text-primary"> {duration}</span>
          </div>
          <div className="small"></div>
        </Col>
        <Col className="p-0" xs={3}>
          <button
            onClick={() => {
              nav("/courier/takeDelivery/" + order._id);
            }}
            className="btn btn-outline-primary float-end"
          >
            Show route
          </button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default PopupItem;

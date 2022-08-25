import React, { useRef, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Form } from "react-bootstrap";

function GetAddress(props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC8zU9_yw3KHYx1p4ZEqsVPQWF8jKEoK00",
    libraries: ["places"],
  });
  const setAddress = props.setAddress;
  const currentAddress = props.currentAddress;
  const addressRef = useRef();
  const onPlaceChanged = (e) => {
    console.log(addressRef.current.value);
    setAddress(addressRef.current.value);
  };
  const onLoad = () => {
    addressRef.current.value = currentAddress;
    setAddress(currentAddress);
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Autocomplete
      //  onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      types={["address"]}
      // types={["geocode"]}
      onLoad={onLoad}
    >
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="address" ref={addressRef} placeholder="Enter Your Address" required />
      </Form.Group>
    </Autocomplete>
  );
}

export default GetAddress;

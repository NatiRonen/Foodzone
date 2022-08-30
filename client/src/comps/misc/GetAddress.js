import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Form } from "react-bootstrap";

function GetAddress(props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });
  const setAddress = props.setAddress;
  const addressRef = useRef();

  useEffect(() => {
    if (props.currentAddress) {
      addressRef.current.value = props.currentAddress;
    }
  }, [props.currentAddress]);

  const onPlaceChanged = (e) => {
    setAddress(addressRef.current.value);
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Autocomplete
      onPlaceChanged={onPlaceChanged}
      types={["address"]}
      options={{ componentRestrictions: { country: "il" } }}
    >
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="address" ref={addressRef} placeholder="Enter Your Address" required />
      </Form.Group>
    </Autocomplete>
  );
}

export default GetAddress;

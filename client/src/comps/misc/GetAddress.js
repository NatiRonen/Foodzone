import React, { useRef, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Form } from "react-bootstrap";

function GetAddress(props) {
  const [address, setAddress] = useState({});

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC8zU9_yw3KHYx1p4ZEqsVPQWF8jKEoK00",
    libraries: ["places"],
  });

  const addressRef = useRef();

  // onLoad (e) {
  //   console.log('autocomplete: ', e.target.value);
  // }

  const onPlaceChanged = (e) => {
    // if (autocomplete !== null) {
    //   console.log(autocomplete.getPlace())
    // } else {
    //   console.log('Autocomplete is not loaded yet!')
    // }
    console.log(addressRef.current.value);
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Autocomplete
      //  onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      types={address}
    >
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="address" ref={addressRef} placeholder="Enter Your Address" required />
      </Form.Group>
    </Autocomplete>
  );
}

export default GetAddress;

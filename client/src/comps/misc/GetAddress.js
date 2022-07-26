import React, { useState } from "react";
import { authC, Autocomplete } from "@react-google-maps/api";
import { Button, Col, Modal, Row, Form, FloatingLabel } from "react-bootstrap";
import { MapContainer } from "./GoogleMap";

function GetAddress(props) {
  const [loading, setLoading] = useState(false);
  let show = props.show;
  let handleToggle = props.handleToggle;

  return (
    <Modal
      show={show}
      onHide={handleToggle}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
          <Form.Control as="textarea" placeholder="Leave a comment here" />
        </FloatingLabel>
        {/* <Autocomplete>
          <input type="text" />
        </Autocomplete> */}
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleToggle}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GetAddress;

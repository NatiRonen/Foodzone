import React, { useEffect, useState } from "react";
import { Form, Spinner, Button } from "react-bootstrap";
import GetAddress from "../misc/GetAddress";
import ImagesSearch from "../misc/imagesSearch";

function StoreForm(props) {
  const doApi = props.doApi;
  const isLoading = props.isLoading;
  const item = props.item;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [info, setInfo] = useState("");

  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  useEffect(() => {
    setName(item?.name);
    setEmail(item?.email);
    setAddress(item?.address);
    setPhone(item?.phone);
    setImgUrl(item?.imgUrl);
    setInfo(item?.info);
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { name, email, address, phone, imgUrl, info };
    doApi(data);
  };

  return (
    <Form
      style={{ width: "80%", maxWidth: 500 }}
      onSubmit={handleSubmit}
      // className="shadow"
    >
      <h1 className="text-center display-4 mb-5">Store Details</h1>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Store Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          minLength={2}
        />
      </Form.Group>

      <Form.Group className="mb-3 ">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 ">
        <GetAddress setAddress={setAddress} address={address} />
      </Form.Group>

      <Form.Group className="mb-3 ">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Phone nuber"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3 ">
        <Form.Label>Info</Form.Label>
        <Form.Control
          type="text"
          placeholder="Store Info"
          onChange={(e) => setInfo(e.target.value)}
          value={info}
          minLength={10}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 ">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          placeholder="Get image "
          onChange={(e) => setImgUrl(e.target.value)}
          value={imgUrl}
          required
          readOnly
          onClick={handleToggle}
        ></Form.Control>
      </Form.Group>

      <ImagesSearch show={show} handleToggle={handleToggle} setImgUrl={setImgUrl} />
      <Button variant="primary" type="submit">
        {isLoading ? <Spinner animation="grow" /> : "Submit"}
      </Button>
    </Form>
  );
}

export default StoreForm;

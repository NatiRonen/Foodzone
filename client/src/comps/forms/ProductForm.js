import React, { useEffect, useState } from "react";
import { Container, Form, Spinner, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/apiService";
import ImagesSearch from "../misc/imagesSearch";

function ProductForm({ item, doApi, isLoading }) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const params = useParams();

  useEffect(() => {
    setName(item?.name);
    setImgUrl(item?.imgUrl);
    setInfo(item?.info);
    setPrice(item?.price);
    setCategory(item?.category);
    getCategories();
  }, [item]);

  const getCategories = async () => {
    let url = API_URL + "/categories/" + params.id;
    let resp = await doApiGet(url);
    setCategories(resp.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { name, info, price, imgUrl, category };
    doApi(data);
  };

  return (
    <Container>
      <ImagesSearch show={show} handleToggle={handleToggle} setImgUrl={setImgUrl} />
      <Form
        style={{ width: "80%", maxWidth: 500 }}
        onSubmit={handleSubmit}
        // className="shadow"
      >
        <h1 className=" display-5">Product Details</h1>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            minLength={2}
          />
        </Form.Group>

        <Form.Group className="mb-3 ">
          <Form.Label>Info</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product description"
            onChange={(e) => setInfo(e.target.value)}
            value={info}
            minLength={10}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 ">
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option>Select category</option>
            {categories.map((category, idx) => {
              return (
                <option key={idx} value={category}>
                  {category}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 ">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Get image"
            onChange={(e) => setImgUrl(e.target.value)}
            value={imgUrl}
            required
            readOnly
            onClick={handleToggle}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 ">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ptoduct price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          ></Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          {isLoading ? <Spinner animation="grow" /> : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default ProductForm;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Row, Collapse, FloatingLabel, Form, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import LottieAnimation from "../comps/misc/lottieAnimation";
import { BsEraser } from "react-icons/bs";

function CategoriesStoreAdmin() {
  const [loading, setloading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);
  const params = useParams();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    let url = API_URL + "/categories/" + params.id;
    let resp = await doApiGet(url);
    console.log(resp.data);
    setCategories(resp.data);
    setloading(false);
  };

  const addCategory = async () => {
    if (categories.includes(newCategory)) {
      toast.warning("Category already exists");
      return;
    }
    await addRemoveCat(newCategory);
  };

  const addRemoveCat = async (_cat) => {
    let url = API_URL + "/categories/" + params.id + "/" + _cat;
    let resp = await doApiMethod(url, "PATCH", {});
    if (resp.data.modifiedCount === 1) {
      getCategories();
    }
  };

  return (
    <div className="container">
      <h1 className="display-4 mb-5">Categories</h1>
      <Row className="g-4 ">
        <Col md={4}>
          <ListGroup variant="flush" className="shadow">
            {categories.map((category, idx) => {
              return (
                <ListGroup.Item
                  key={idx}
                  className="d-flex flex-direction-column align-items-center justify-content-between"
                >
                  <div>{category}</div>
                  <button
                    onClick={() => {
                      addRemoveCat(category);
                    }}
                    className="btn btn-outline-danger"
                    title="Delete"
                  >
                    <BsEraser />
                  </button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col md={6}>
          <div className="mb-3">
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              variant="outline-success"
              className="mb-2"
            >
              Add New Category
            </Button>
            <Collapse in={open}>
              <Row id="example-collapse-text d-flex align-items-center ">
                <Col xs={8}>
                  <FloatingLabel controlId="floatingPassword" label="Category name">
                    <Form.Control
                      type="text"
                      placeholder="Category name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="success"
                    onClick={() => {
                      setOpen(false);
                      addCategory();
                      setNewCategory("");
                    }}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Collapse>
          </div>
        </Col>
      </Row>
      {loading ? <LottieAnimation /> : ""}
      {!loading && categories.length === 0 ? (
        <h2 className="text-center display-2">No categories found</h2>
      ) : (
        ""
      )}
    </div>
  );
}

export default CategoriesStoreAdmin;

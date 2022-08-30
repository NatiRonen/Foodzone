import React, { useState } from "react";
import { API_URL, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import ProductForm from "../comps/forms/ProductForm";

function AddProductStoreAdmin(props) {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  let nav = useNavigate();

  const doFormApi = async (formData) => {
    setIsLoading(true);
    let url = API_URL + "/products/" + params.id;
    try {
      let resp = await doApiMethod(url, "POST", formData, params.id);
      if (resp.data._id) {
        toast.success("Product Created");
        nav(-1);
      }
    } catch (err) {
      console.log(err.response);
      alert("failed to create product");
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <Container>
        <Row className="justify-content-between align-items-center" style={{ minHeight: "87vh" }}>
          <Col
            md={5}
            className="d-flex shadow flex-direction-column align-items-center justify-content-center py-5"
          >
            <ProductForm doApi={doFormApi} isLoading={isLoading} />
          </Col>
          <Col md={6} className="productForm__bg d-none d-md-block"></Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default AddProductStoreAdmin;

import React, { useEffect, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { useForm } from "react-hook-form";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsCardImage } from "react-icons/bs";
import { Col, Container, Form, Row, Spinner, Button } from "react-bootstrap";
import { motion } from "framer-motion";

import ProductForm from "../comps/forms/ProductForm";

function AddProductStoreAdmin(props) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  let nav = useNavigate();

  const doFormApi = async (formData) => {
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
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="register-photo"
    >
      <Container>
        <Row className="justify-content-between">
          <Col
            md={5}
            className="d-flex shadow flex-direction-column align-items-center justify-content-center"
          >
            <ProductForm doApi={doFormApi} isLoading={isLoading} />
          </Col>
          <Col md={6} className="productForm__bg"></Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default AddProductStoreAdmin;

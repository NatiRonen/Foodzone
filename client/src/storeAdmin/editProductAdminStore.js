import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { Col, Container, Row } from "react-bootstrap";
import ProductForm from "../comps/forms/ProductForm";
import { motion } from "framer-motion";
import AuthStoreAdminComp from "../comps/auth/authStoreAdminComp";

function EditProductAdminStore(props) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let params = useParams();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    setIsLoading(true);
    let urlProduct = API_URL + "/products/single/" + params.id;
    try {
      let resp2 = await doApiGet(urlProduct);
      setProduct(resp2.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + "/products/" + product._id;

    try {
      let resp = await doApiMethod(url, "PUT", formData, params.id);
      if (resp.data.modifiedCount) {
        toast.success("Product Updated");
        nav(-1);
      } else {
        toast.warning("Nothing to update");
      }
    } catch (err) {
      console.log(err.response);
      alert("Failed to update the product, please try again");
      nav("/storeAdmin");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <Container>
        <AuthStoreAdminComp />

        <Row className="justify-content-between align-items-center" style={{ height: "87vh" }}>
          <Col
            md={5}
            className="d-flex py-5 shadow flex-direction-column align-items-center justify-content-center"
          >
            <ProductForm item={product} doApi={doFormApi} isLoading={isLoading} />
          </Col>
          <Col
            md={6}
            className="productForm__bg d-none d-md-block"
            style={{ backgroundImage: `url(${product?.imgUrl})` }}
          ></Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default EditProductAdminStore;

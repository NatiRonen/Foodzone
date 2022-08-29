import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row, Spinner, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";
import StoreForm from "../comps/forms/StoreForm";

function CreateStore(props) {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const doApi = async (_dataBody) => {
    let url = API_URL + "/stores/";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data._id) {
        nav("/");
        toast.success(
          "Store creating requests has been sent successfully. Please whait for admin approval"
        );
        nav("/myStores");
      }
    } catch (err) {
      if (err.response.data.code == 11000) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.response.data.err);
        console.log(err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <Container>
        <Row className="justify-content-between" style={{ minHeight: "87vh" }}>
          <Col
            md={5}
            className="d-flex shadow flex-direction-column align-items-center justify-content-center"
          >
            <StoreForm doApi={doApi} isLoading={isLoading} />
          </Col>
          <Col md={6} className="createStore__bg d-none d-md-block"></Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default CreateStore;

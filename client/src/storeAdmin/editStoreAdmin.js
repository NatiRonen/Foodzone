import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
// import "../admin/css/formStore.css";
import { motion } from "framer-motion";
import { Col, Container, Form, Row, Spinner, Button } from "react-bootstrap";
import StoreForm from "../comps/forms/StoreForm";
import AuthStoreAdminComp from "../comps/auth/authStoreAdminComp";

function EditStoreAdmin(props) {
  let params = useParams();
  let nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [store, setStore] = useState(null);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    setIsLoading(true);
    let urlStore = API_URL + "/stores/single/" + params.id;
    try {
      let resp2 = await doApiGet(urlStore);
      setStore(resp2.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + "/stores/" + store._id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      //
      if (resp.data.modifiedCount) {
        toast.success("Store Updated");
        // back to the list of stores
        nav("../");
      } else {
        toast.warning("Nothing to apdate");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
      nav("/storeAdmin/" + params.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <AuthStoreAdminComp />

      <Container>
        <Row className="justify-content-between" style={{ height: "90.7vh" }}>
          <Col
            md={5}
            className="d-flex shadow flex-direction-column align-items-center justify-content-center"
          >
            {store?.address && <StoreForm item={store} doApi={doFormApi} isLoading={isLoading} />}
          </Col>
          <Col
            md={6}
            className="createStore__bg d-none d-md-block"
            style={{ backgroundImage: `url(${store?.imgUrl})` }}
          ></Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default EditStoreAdmin;

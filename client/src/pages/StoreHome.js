import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../services/apiService";
import { BsInfoCircleFill } from "react-icons/bs";
import { HiTemplate } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "./css/storeHome.css";
import Product from "../comps/store/product";
import LottieAnimation from "../comps/misc/lottieAnimation";
import { resetCart } from "../redux/cartSlice";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

function StoreHome(props) {
  const [store, setstore] = useState({});
  const [products, setProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [category, setCategory] = useState("");
  let params = useParams();
  const dispatch = useDispatch();
  const { cart_ar } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(resetCart()); // reset cart
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/stores/single/" + params.id;
    let resp = await doApiGet(url);

    setstore(resp.data);
    console.table(resp.data);

    let urlProducts = API_URL + "/products/storeProducts/" + params.id;
    let resp2 = await doApiGet(urlProducts);
    setProducts(resp2.data);
    setProductsByCategory(resp2.data);
  };

  const sortCat = (_catName = null) => {
    if (!_catName) {
      setProductsByCategory(products);
      return;
    }
    let temp = products.filter((prod) => prod.category === _catName);
    if (temp.length === 0) toast.warning(`No ${_catName} found`);
    else setProductsByCategory(temp);
  };
  return (
    <React.Fragment>
      {!store ? (
        <LottieAnimation />
      ) : (
        <React.Fragment>
          <div
            style={{
              backgroundImage: `url(${store.imgUrl || "/images/no_image.png"})`,
            }}
            className="strip container-fluid d-flex align-items-center"
          >
            <div className="container stripText_bg text-center">
              <h2 className="store_name mb-0">{store.name}</h2>
              <p className="store_info">{store.info}</p>
            </div>
          </div>
          {/* strip end*/}
          <Container className="mt-4">
            <Row>
              <Col lg={2}>
                <p className="animaLink">
                  Categories <HiTemplate className="mx-2" />
                </p>
                <br />
                <ListGroup variant="flush" className="overflow-visible">
                  <ListGroup.Item
                    active={category === ""}
                    onClick={() => {
                      setCategory("");
                      sortCat();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    All Products
                  </ListGroup.Item>
                  {store.categories?.map((item, idx) => {
                    return (
                      <ListGroup.Item
                        key={idx}
                        active={category === item}
                        onClick={() => {
                          setCategory(item);
                          sortCat(item);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {item}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>

              <Col lg={8}>
                <div className="text-center">
                  <p className="animaLink">
                    Products <HiTemplate className="mx-2" />
                  </p>
                  {productsByCategory == 0 ? (
                    <div>
                      <small>No products found</small>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <motion.div layout className="mb-5">
                  <AnimatePresence>
                    {productsByCategory.map((item) => {
                      return <Product key={item._id} item={item} />;
                    })}
                  </AnimatePresence>
                </motion.div>
              </Col>
              <Col lg={2}>
                <p className="animaLink">
                  Details
                  <BsInfoCircleFill className="mx-2" />
                </p>
                <ListGroup variant="flush" className="overflow-visible">
                  <ListGroup.Item>
                    <span className="text-primary">Address: </span>
                    <br />
                    <span className="text-secondary">{store.address} </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="text-primary">Mail: </span>
                    <br />
                    <span className="text-secondary">{store.email} </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="text-primary">Phone: </span>
                    <br />
                    <span className="text-secondary">{store.phone} </span>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default StoreHome;

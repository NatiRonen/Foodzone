import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/apiService";
import { ImInfo } from "react-icons/im";
import { Modal } from "react-bootstrap";
import LottieAnimation from "../misc/lottieAnimation";
import { Row, Col } from "react-bootstrap";
import { getTimeAndDateFormat } from "../../utils/dateRormated";
import Timer from "../misc/timer";

function OrderInfo({ show, handleToggle, item, timer }) {
  const [loading, setLoading] = useState(false);
  const [productsAr, setProductsAr] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    setLoading(true);
    if (item) {
      doApi();
    }
  }, [item]);

  const doApi = async () => {
    let url = API_URL + "/orders/productsInfo/" + item._id;
    let resp = await doApiGet(url);
    setOrderInfo(resp.data);
    setProductsAr(resp.data.products_ar);
    setLoading(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleToggle}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Order details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <LottieAnimation />
        ) : (
          <section className="shopping-cart">
            <Timer time={timer} />
            <div className="container">
              <div className="content">
                <div className="row">
                  <div className=" col-xl-7">
                    <div className="items">
                      {/* start product */}
                      {productsAr.map((item, i) => {
                        return (
                          <div
                            key={1}
                            className="row justify-content-between align-items-center p-2"
                          >
                            <div className="col-1">
                              <div className="mt-2 text-center fw-bold">{i + 1}</div>
                            </div>
                            <div className="col-5 info">
                              <p className="fw-bold mb-3">{item.name}</p>
                              <p className="mb-1"> {item.price} ₪</p>
                              <p>x {item.qty} </p>
                            </div>

                            <div className="col-6">
                              <img className="img-fluid mx-auto d-block" src={item.imgUrl} />
                            </div>
                          </div>
                        );
                      })}
                      {/* end product */}
                    </div>
                  </div>
                  {/* start Orders Info */}
                  <div className=" col-xl-5">
                    <div className="summary">
                      <React.Fragment>
                        <h3>
                          Order details <ImInfo className="mx-2" />
                        </h3>
                        <div className="summary-item">
                          <span className="text">Order Number</span>
                          <span className="price">{orderInfo?.short_id}</span>
                        </div>
                        <div className="summary-item">
                          <Row className="justify-content-between">
                            <Col xs={3}>
                              <span className="text">Destination</span>
                            </Col>
                            <Col className="text-end" xs={9}>
                              {orderInfo?.destination}
                            </Col>
                          </Row>
                        </div>
                        <div className="summary-item">
                          <span className="text">Status</span>
                          <span className="price">{orderInfo.status?.replaceAll("_", " ")}</span>
                        </div>
                        <div className="summary-item">
                          <span className="text">Date</span>
                          <span className="price">
                            {orderInfo.date_created && getTimeAndDateFormat(orderInfo.date_created)}
                          </span>
                        </div>
                        <div className="summary-item">
                          <span className="text">Items</span>
                          <span className="price">{productsAr.length}</span>
                        </div>
                        <div className="summary-item">
                          <span className="text">Total price</span>
                          <span className="price">₪ {orderInfo.total_price}</span>
                        </div>
                      </React.Fragment>
                    </div>
                  </div>
                  {/* end Orders Info */}
                </div>
              </div>
            </div>
          </section>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default OrderInfo;

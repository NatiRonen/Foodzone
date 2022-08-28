import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/apiService";
import { BsInfoCircle, BsChevronRight } from "react-icons/bs";
import OldOrderInfoItem from "../../comps/orders/OrderInfoItem";
import "../css/formStore.css";
import LottieAnimation from "../../comps/misc/lottieAnimation";

function OrderInfoAdmin(props) {
  let [order, setOrder] = useState({});
  let params = useParams();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/orders/productsInfo/" + params.id;
    try {
      let resp = await doApiGet(url);
      // console.log(resp.data);
      setOrder(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-3 display-5">Order Info</h1>
      <button
        style={{ background: "none" }}
        className="position-absolute top-0 end-0 m-5 animaLinkSM "
        onClick={() => {
          nav(-1);
        }}
      >
        Back <BsChevronRight className="mx-2" />
      </button>
      <div className="store-form">
        {order._id ? (
          <React.Fragment>
            <form className="mb-5">
              <div className="form-icon edit_img">
                <span>
                  <BsInfoCircle />
                </span>
              </div>
              <div className="form-group">
                <p className="small">Driver Id</p>
                <input
                  disabled
                  defaultValue={order.driver_id || "The shipment has not been taken yet"}
                  type="text"
                  className="form-control item"
                  placeholder="driver_id"
                />
              </div>
              <div className="form-group">
                <p className="small">User Id</p>
                <input
                  disabled
                  defaultValue={order.user_id}
                  type="text"
                  className="form-control item"
                  placeholder="user_id"
                />
              </div>
            </form>
            <section className="shopping-cart">
              <div className="container">
                <div className="content">
                  <div className="row">
                    <div className=" col-lg-8">
                      <div className="items">
                        {/* start product */}
                        {order.products_ar.map((item, i) => {
                          return <OldOrderInfoItem key={item._id} item={item} i={i} />;
                        })}
                        {/* end product */}
                      </div>
                    </div>
                    {/* start Orders Info */}
                    <div className=" col-lg-4">
                      <div className="summary">
                        <React.Fragment>
                          <h3>
                            Order Info <BsInfoCircle className="mx-2" />
                          </h3>
                          <div className="summary-item">
                            <span className="text">Order Number</span>
                            <span className="price">{order.short_id}</span>
                          </div>
                          <div className="summary-item">
                            <span className="text">Status</span>
                            <span className="price">{order.status?.replaceAll("_", " ")}</span>
                          </div>
                          <div className="summary-item">
                            <span className="text">Date</span>
                            <span className="price">
                              {order.date_created.replace(/T/, " ").substr(0, 16)}
                            </span>
                          </div>
                          <div className="summary-item">
                            <span className="text">Items</span>
                            <span className="price">{order.products_ar.length}</span>
                          </div>
                          <div className="summary-item">
                            <span className="text">Total price</span>
                            <span className="price">₪ {order.total_price}</span>
                          </div>
                          {/* <div className="summary-item">
                            <span className="text">Address</span>
                            <span className="price"> {order.destination.label}</span>
                          </div> */}
                        </React.Fragment>
                      </div>
                    </div>
                    {/* end Orders Info */}
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        ) : (
          <LottieAnimation />
        )}
      </div>
    </div>
  );
}

export default OrderInfoAdmin;

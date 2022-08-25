import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_URL, doApiGet } from "../services/apiService";
import { GrDeliver } from "react-icons/gr";
import "./css/checkout.css";
import OldOrderItem from "../comps/orders/oldOrderItem";
import AuthClientComp from "../comps/auth/authClientComp";
import OrderInfo from "../comps/orders/OrderInfo";

function OldOrders(props) {
  const [ar, setAr] = useState([]);
  const [allTotal, setAllTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const handleToggle = () => setShow(!show);

  useEffect(() => {
    doApi();
  }, []);

  useEffect(() => {
    totalAllOrders();
  }, [ar]);

  const doApi = async () => {
    let url = API_URL + "/orders/userOrder";
    let resp = await doApiGet(url);
    console.log(resp.data);
    let temp_ar = resp.data.filter((item) => item.status != "pending");
    // console.log(temp_ar);
    setAr(temp_ar);
  };

  const totalAllOrders = () => {
    let num = 0;
    if (ar.length > 0) {
      ar.forEach((item) => (num += item.total_price));
      setAllTotal(num);
    }
  };

  return (
    <>
      <OrderInfo handleToggle={handleToggle} show={show} item={orderInfo} />;
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="container mt-5"
        style={{ minHeight: "85vh" }}
      >
        <AuthClientComp />
        <section className="shopping-cart">
          <div className="container">
            <div className="">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="items">
                    {/* start product */}
                    {ar.length == 0 ? (
                      <h2 className="text-center mt-5">
                        You have not ordered yet
                        <GrDeliver className="mx-2" />
                      </h2>
                    ) : (
                      ""
                    )}
                    {ar.map((item, i) => {
                      // let date = item.date_created.replace("T", " ");
                      // date = date.substring(0, date.indexOf(":") + 3);

                      return (
                        <OldOrderItem
                          key={item._id}
                          item={item}
                          i={i}
                          handleToggle={handleToggle}
                          setOrderInfo={setOrderInfo}
                        />
                      );
                    })}
                    {/* end product */}
                  </div>
                </div>
                {/* start Orders Info */}
                <div className="col-md-12 col-lg-4">
                  <div className="summary">
                    <h3>All orders</h3>
                    <div className="summary-item">
                      <span className="text">Orders</span>
                      <span className="price">{ar.length}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Total price</span>
                      <span className="price">₪ {allTotal}</span>
                    </div>
                  </div>
                </div>
                {/* end Orders Info */}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}

export default OldOrders;

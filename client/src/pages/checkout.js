import React, { useContext, useEffect, useState } from "react";
import { API_URL, doApiMethod } from "../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import CheckoutItem from "../comps/orders/checkoutItem";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { PayPalButton } from "react-paypal-button-v2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetCart } from "../redux/cartSlice";
import AuthClientComp from "../comps/auth/authClientComp";
import GetAddress from "../comps/misc/GetAddress";
import { AppContext } from "../context/appContext";
import "./css/checkout.css";

function Checkout(props) {
  const { cart_ar, totalPrice, store_short_id } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [destination, setDestination] = useState("");
  const [orderShortId, setOrderShortId] = useState("");

  const { socket } = useContext(AppContext);

  const disabledBtn = () => {
    //  disable paypal btns
    if (cart_ar.length === 0 || !destination) {
      return {
        opacity: "0.6",
        pointerEvents: "none",
      };
    }
    return {};
  };

  useEffect(() => {
    if (cart_ar.length && destination) {
      doApiAddToCheckout();
    }
  }, [cart_ar, destination]);

  const dellAll = () => {
    if (window.confirm("Are you sure you want to delete all ?")) {
      dispatch(resetCart());
    }
  };

  const doApiAddToCheckout = async () => {
    let url = API_URL + "/orders";
    let body = {
      total_price: totalPrice,
      products_ar: cart_ar,
      store_short_id: store_short_id,
      destination: destination,
    };
    console.log(body);
    let resp = await doApiMethod(url, "POST", body);
    console.log(resp.data);
    setOrderShortId(resp.data.short_id);
  };

  // paypal pay
  const onCommit = async (_data) => {
    console.log(_data);
    let url = API_URL + "/orders/orderPaid/";
    let paypalObject = {
      tokenId: _data.facilitatorAccessToken,
      orderId: _data.orderID,
      realPay: "sandbox", //if yes is real
    };
    let resp = await doApiMethod(url, "PATCH", paypalObject);
    if (resp.data.modifiedCount == 1) {
      socket.emit("join-room-orders", store_short_id);
      socket.emit("join-room-orders", orderShortId);
      socket.emit("new-order", store_short_id);
      toast.success("Your order completed successfully");
      dispatch(resetCart());
      nav("/oldOrders");
    }
  };
  const devOrder = () => {
    socket.emit("join-room-orders", store_short_id);
    socket.emit("new-order", store_short_id);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.5,
        duration: 0.7,
      }}
      className="container mt-5"
      style={{
        minHeight: "85vh",
      }}
    >
      <AuthClientComp />
      <section className="shopping-cart">
        <div className="container">
          <div className="row g-2" data-masonry='{"percentPosition": true }'>
            <div className="col-lg-8">
              <div className="items">
                {/* start product */}
                {cart_ar.length == 0 ? (
                  <h2 className="text-center mt-5">
                    Cart is empty <MdOutlineRemoveShoppingCart className="mx-2" />
                  </h2>
                ) : (
                  ""
                )}
                {cart_ar.map((item) => {
                  return <CheckoutItem key={item._id} item={item} />;
                })}
                {/* end product */}
              </div>
            </div>
            {/* start Checkout */}
            <div className="col-lg-4 summary shadow card">
              <h3> Destination </h3>
              <GetAddress currentAddress={user.address} setAddress={setDestination} />

              <h3> Payment </h3>
              <div className="summary-item">
                <span className="text"> Tip </span>
                <span className="price"> Up to you</span>
              </div>
              <div className="summary-item">
                <span className="text"> Delivery </span>
                <span className="price"> ₪{cart_ar.length == 0 ? 0 : 20} </span>
              </div>
              <div className="summary-item">
                <span className="text"> Total </span>
                <span className="price"> ₪{totalPrice} </span>
              </div>
              {cart_ar.length > 0 ? (
                <button onClick={dellAll} className="btn btn-outline-danger col-12 my-5">
                  Delete all Products
                </button>
              ) : (
                ""
              )}
              <div style={disabledBtn()}>
                <PayPalButton
                  amount={totalPrice}
                  options={{
                    clientId: process.env.REACT_APP_PAYPAL_API_KEY,
                    currency: "ILS",
                  }}
                  onSuccess={(details, data) => {
                    // data - have info of pay token to check in nodejs
                    // details have info about the buyer
                    // if payment success ,
                    if (data.orderID) {
                      onCommit(data);
                    }
                  }}
                  onCancel={(err) => {
                    toast.error("Process end before payment. Please try again");
                  }}
                />
              </div>
            </div>
            {/* end Checkout */}
          </div>
        </div>
        {/* <button onClick={devOrder}>socket</button> */}
      </section>
    </motion.div>
  );
}

export default Checkout;

import React, { useEffect, useRef } from "react";
import "./css/register.css";
import { API_URL, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";

import "./css/page404.css";
import Lottie from "lottie-web";
import AuthClientComp from "../comps/auth/authClientComp";

function ApplyForCourier(props) {
  let animaRef = useRef(); // for lottie-web animation

  useEffect(() => {
    Lottie.loadAnimation({
      container: animaRef.current,
      loop: true,
      autoplay: true,
      path: "https://assets8.lottiefiles.com/packages/lf20_6sxyjyjj.json",
    });
  }, []);

  const onClickApply = async () => {
    let url = API_URL + "/users/applyingForCourier";
    try {
      let resp = await doApiMethod(url, "PATCH", {});
      console.log(resp);
      if (resp.data.modifiedCount === 1) {
        toast.success("Application sent successfully");
      } else {
        toast.error("You had already applied");
      }
    } catch (error) {
      console.log(error);
      toast.error("It's not you, it's us. Please try again");
    }
  };
  return (
    <React.Fragment>
      <AuthClientComp />
      <div style={{ minHeight: "70vh" }} className="container">
        <div className="mt-4 animation_courier">
          <div ref={animaRef}></div>
        </div>
        <div className="text-center">
          <h3 className="mb-3 display-5">Become a Shipmarket driver partner</h3>
          <h6>Ready to become a Shipmarket driver and get started? apply in a few clicks.</h6>
          <botton className="btn btn-outline-info mt-2" onClick={onClickApply}>
            Apply
          </botton>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ApplyForCourier;

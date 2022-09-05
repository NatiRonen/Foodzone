import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AuthCourierComp from "../comps/auth/authCourierComp";
import HeaderCourier from "./headerCourier";

function LayoutCourier(props) {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <React.Fragment>
        <AuthCourierComp />
        {user && <HeaderCourier />}
        <Outlet />
      </React.Fragment>
    </div>
  );
}

export default LayoutCourier;

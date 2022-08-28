import React from "react";
import { Outlet } from "react-router-dom";
import HeaderCourier from "./headerCourier";

function LayoutCourier(props) {
  return (
    <div>
      <React.Fragment>
        <HeaderCourier />
        <Outlet />
      </React.Fragment>
    </div>
  );
}

export default LayoutCourier;

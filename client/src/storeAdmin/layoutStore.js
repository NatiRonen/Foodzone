import React from "react";
import { Outlet } from "react-router-dom";
import AuthClientComp from "../comps/auth/authClientComp";
import HeaderStore from "./headerStore";

function LayoutStore(props) {
  return (
    <React.Fragment>
      <AuthClientComp />
      <HeaderStore />
      <Outlet />
    </React.Fragment>
  );
}

export default LayoutStore;

import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AuthStoreAdminComp from "../comps/auth/authStoreAdminComp";
import HeaderStore from "./headerStore";

function LayoutStore(props) {
  const user = useSelector((state) => state.user);
  return (
    <React.Fragment>
      <AuthStoreAdminComp />
      {user && <HeaderStore />}
      <Outlet />
    </React.Fragment>
  );
}

export default LayoutStore;

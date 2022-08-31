import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "./headerAdmin";

function LayoutAdmin(props) {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
    </>
  );
}

export default LayoutAdmin;

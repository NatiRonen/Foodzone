import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UsersData from "./UsersData";
import StoresData from "./StoresData";

const Datatable = (props) => {
  let data = props.data;
  switch (data) {
    case "users":
      return <UsersData />;
    case "stores":
      return <StoresData />;
      break;

    default:
      break;
  }
};

export default Datatable;

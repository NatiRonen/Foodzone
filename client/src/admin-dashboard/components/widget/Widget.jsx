import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, doApiGet } from "../../../services/apiService";

const Widget = ({ type, amount }) => {
  const [userAmount, setUserAmount] = useState();
  const [sotreAmount, setStoreAmount] = useState();
  // const [data, setData] = useState();
  let data = null;
  //dataorary

  useEffect(() => {
    getUsersAmount();
    getStoresAmount();
  }, []);

  const getUsersAmount = async () => {
    let url = API_URL + "/users/amount";
    let { data } = await doApiGet(url);
    setUserAmount(data.amount);
  };
  const getStoresAmount = async () => {
    let url = API_URL + "/stores/amount";
    let { data } = await doApiGet(url);
    setStoreAmount(data.amount);
  };

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        path: "./users",
        amount: userAmount,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "sotre":
      data = {
        title: "STORES",
        isMoney: false,
        link: "View all stores",
        path: "./stores",
        amount: sotreAmount,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View net orders",
        path: "./orders",
        amount: amount,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "sale":
      data = {
        title: "TOTAL SALSE",
        isMoney: true,
        link: "",
        path: "./",
        amount: amount,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  if (!data) return "";
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "₪"} {data.amount}
        </span>
        <Link to={data.path} className="link text-decoration-none">
          {data.link}
        </Link>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;

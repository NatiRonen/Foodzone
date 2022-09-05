import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/userSlice";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const user = useSelector((state) => state.user);
  const dispatchlogout = useDispatch();
  const LOCATION = "/admin-dashboard";
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="./" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr className="m-0" />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={LOCATION + "/"} style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to={LOCATION + "/users"} style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to={LOCATION + "/stores"} style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Stores</span>
            </li>
          </Link>
          <Link to={LOCATION + "/products"} style={{ textDecoration: "none" }}>
            <li>
              <FastfoodIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to={LOCATION + "/orders"} style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          <p className="title">SERVICE</p>
          <Link to="/admin-dashboard/chat" style={{ textDecoration: "none" }}>
            <li>
              <SupportAgentIcon className="icon" />
              <span>Customers services</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link
            to="/admin-dashboard/users/single"
            state={{ user: user }}
            style={{ textDecoration: "none" }}
          >
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link
            to="/admin-dashboard/login"
            onClick={(e) => dispatchlogout(logout())}
            style={{ textDecoration: "none" }}
          >
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
      </div>
    </div>
  );
};

export default Sidebar;

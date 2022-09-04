import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [notifications, setNotifications] = useState();
  const { dispatch } = useContext(DarkModeContext);
  const { picture, name } = useSelector((state) => state.user);
  const { newMessages } = useSelector((state) => state.user);
  useEffect(() => {
    if (Object.keys(newMessages).length !== 0) {
      sumNotifications();
    } else setNotifications("");
  }, [newMessages]);

  const sumNotifications = () => {
    if (Object.keys(newMessages).length !== 0) {
      const sumValues = (obj) => Object.values(newMessages).reduce((a, b) => a + b);
      setNotifications(sumValues);
    }
  };

  return (
    <div className="navbar-admin ">
      <div className="wrapper py-0 justify-content-end ">
        <div className="items ">
          <div className="item">
            <DarkModeOutlinedIcon className="icon" onClick={() => dispatch({ type: "TOGGLE" })} />
          </div>

          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div> */}
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            {notifications && <div className="counter">{notifications}</div>}
          </div>
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <img src={picture} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../redux/userSlice";
import { deleteToken } from "../../services/localService";

function Logout() {
  const dispatch = useDispatch();
  let nav = useNavigate();

  useEffect(() => {
    dispatch(logout());
    deleteToken();
    toast.info("You logged out");
    nav("/");
  }, []);

  return <React.Fragment></React.Fragment>;
}

export default Logout;

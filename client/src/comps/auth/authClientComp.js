import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../../redux/appApi";
import Cookies from "js-cookie";

function AuthClientComp(props) {
  let nav = useNavigate();
  let session = Cookies.get("FOODSHIP_MARKET_SESSION");
  const [logoutUser, { isLoading, error }] = useLogoutUserMutation();

  useEffect(() => {
    if (!session) {
      toast.error("Please log in first");
      logoutUser();
      nav("../login");
    }
  }, []);

  return <React.Fragment></React.Fragment>;
}

export default AuthClientComp;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet } from "../../services/apiService";
import Cookies from "js-cookie";
import { useLogoutUserMutation } from "../../redux/appApi";

function AuthAdminComp(props) {
  let nav = useNavigate();
  let session = Cookies.get("SHIP_MARKET_SESSION");
  const [logoutUser, { isLoading, error }] = useLogoutUserMutation();

  useEffect(() => {
    if (session) {
      doApi();
    } else {
      toast.error("Please log in first");
      logoutUser();
      nav("/login");
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let resp = await doApiGet(url);
      if (resp.data.role != "admin") {
        toast.error("Unathorized user");
        nav("../");
      } else {
        if (props.setAuthorized) {
          props.setAuthorized(true);
        } else return;
      }
    } catch (err) {
      //
      console.log(err.response);
      toast.error("Something went wrong...");
      nav("/");
      // if token invalid for super_admin
    }
  };
  return <React.Fragment></React.Fragment>;
}

export default AuthAdminComp;

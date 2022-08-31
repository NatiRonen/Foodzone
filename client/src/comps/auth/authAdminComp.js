import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet } from "../../services/apiService";
import { checkTokenLocal } from "../../services/localService";

function AuthAdminComp(props) {
  let nav = useNavigate();

  useEffect(() => {
    if (checkTokenLocal()) {
      doApi();
    } else {
      // nav to login
      // nav("/logout");
      nav("./login");
      // show toast message in yellow that the user must be connected
      // toast.warning("Please login first");
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

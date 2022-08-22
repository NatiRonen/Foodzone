import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet } from "../../services/apiService";
import { checkTokenLocal } from "../../services/localService";

function AuthStoreAdminComp(props) {
  let nav = useNavigate();

  useEffect(() => {
    if (checkTokenLocal()) {
      doApi();
    } else {
      // nav to login
      nav("/logout");
      // show toast message in yellow that the user must be connected
      toast.warning("Please login first");
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let resp = await doApiGet(url);
      if (resp.data.role === "store_admin" || resp.data.role === "admin") {
        props.setAuthorized(true);
        return;
      } else {
        toast.error("Plase Wait for admin approval");
        nav("../");
        return;
      }
    } catch (err) {
      //
      console.log(err.response);
      toast.error("Something went wrong...");
      nav("../");
    }
  };

  return <React.Fragment></React.Fragment>;
}

export default AuthStoreAdminComp;

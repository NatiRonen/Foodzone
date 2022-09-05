import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet } from "../../services/apiService";
import { checkTokenLocal } from "../../services/localService";
import { ADMIN_ROLE, COURIER_ROLE } from "../../services/consts";

function AuthCourierComp(props) {
  let nav = useNavigate();

  useEffect(() => {
    // check if there token in the browser
    if (checkTokenLocal()) {
      doApi();
    } else {
      nav("/courier/login");
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let resp = await doApiGet(url);
      if (resp.data.role !== COURIER_ROLE) {
        toast.error("Unathorized user");
        nav("/");
      }
    } catch (err) {
      // if there not token at all
      console.log(err.response);
      toast.error("Something went wrong. Please log in and try again.");
      nav("/logout");
      // if token invalid for super_admin
    }
  };
  return <React.Fragment></React.Fragment>;
}

export default AuthCourierComp;

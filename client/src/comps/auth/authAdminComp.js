import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet } from "../../services/apiService";
import { checkTokenLocal } from "../../services/localService";

function AuthAdminComp({ setAuth }) {
  let nav = useNavigate();

  useEffect(() => {
    console.log("from login");
    if (checkTokenLocal()) {
      doApi();
    } else {
      nav("./login");
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let resp = await doApiGet(url);
      if (resp.data.role != "admin") {
        toast.error("Unathorized user");
      } else {
        setAuth(true);
        nav("../");
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

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API_URL, doApiGet } from "../../services/apiService";
import { checkTokenLocal } from "../../services/localService";

function AuthClientComp(props) {
  let nav = useNavigate();

  useEffect(() => {
    if (checkTokenLocal()) {
      doApiAuth();
    } else {
      // nav to login
      nav("/logout");
      // show toast message in yellow that the user must be connected
      toast.warning("Please login first");
    }
  }, []);

  // check the token of user
  const doApiAuth = async () => {
    let url = API_URL + "/users/checkUserToken";
    try {
      let data = await doApiGet(url);
    } catch (err) {
      toast.warning("You need to log in again.");
      nav("/logout");
    }
  };

  return <React.Fragment></React.Fragment>;
}

export default AuthClientComp;

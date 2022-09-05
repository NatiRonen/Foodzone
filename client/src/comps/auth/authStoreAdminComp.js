import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet } from "../../services/apiService";
import { ADMIN_ROLE, STOER_ADMIN_ROLE } from "../../services/consts";
import { checkTokenLocal } from "../../services/localService";

function AuthStoreAdminComp(props) {
  let nav = useNavigate();
  const params = useParams();
  const LOCATION = "/storeAdmin/" + params.id;

  useEffect(() => {
    if (checkTokenLocal()) {
      doApi();
    } else {
      // nav to login
      nav(LOCATION + "/login");
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let resp = await doApiGet(url);
      if (resp.data.role === ADMIN_ROLE) {
        return;
      } else if (resp.data.role === STOER_ADMIN_ROLE) {
        let url = API_URL + "/stores/userStores?storeShortId=" + params.id;
        let resp = await doApiGet(url);
        console.log(resp.data.length > 0);
        if (resp.data.length > 0) return;
        else {
          toast.error("You are not the owner of this store");
          nav("/");
          return;
        }
      } else {
        toast.error("Plase Wait for admin approval");
        nav("/");
        return;
      }
    } catch (err) {
      //
      console.log(err.response);
      toast.error("Something went wrong...");
      nav("/");
    }
  };

  return <React.Fragment></React.Fragment>;
}

export default AuthStoreAdminComp;

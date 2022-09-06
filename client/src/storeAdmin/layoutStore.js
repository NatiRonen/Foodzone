import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import AuthStoreAdminComp from "../comps/auth/authStoreAdminComp";
import { API_URL, doApiGet } from "../services/apiService";
import { saveStoreLocal } from "../services/localService";
import HeaderStore from "./headerStore";

function LayoutStore(props) {
  const params = useParams();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getStore();
  }, [params.id]);

  const getStore = async () => {
    try {
      let url = API_URL + "/stores/storeInfo/" + params.id;
      let resp = await doApiGet(url);
      if (resp.data) {
        saveStoreLocal(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <AuthStoreAdminComp />
      {user && <HeaderStore />}
      <Outlet />
    </React.Fragment>
  );
}

export default LayoutStore;

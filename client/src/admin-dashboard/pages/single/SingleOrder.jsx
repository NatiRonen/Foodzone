import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../../../services/apiService";
import { toast } from "react-toastify";
import ChangeRoleModal from "./ChangeRoleModal";
import Button from "@mui/material/Button";
import StoreChart from "../../components/chart/StoreCart";
import { Link, useNavigate } from "react-router-dom";
import ProductChart from "../../components/chart/ProductChart";
import ListProductsOrder from "../../components/table/ListProductsOrder";

const SingleOrder = () => {
  const { state } = useLocation();
  const [store, setStore] = useState();
  const [client, setClient] = useState();
  const [courier, setcourier] = useState();
  let item = state.item;

  useEffect(() => {
    getStore();
    getClient();
    getCourier();
  }, []);

  const getStore = async () => {
    let url = API_URL + "/stores/storeInfo/" + item.store_short_id;
    let resp = await doApiGet(url);
    setStore(resp.data);
  };
  const getClient = async () => {
    let url = API_URL + "/users/userInfo/" + item.client_short_id;
    let resp = await doApiGet(url);
    setClient(resp.data);
  };
  const getCourier = async () => {
    let url = API_URL + "/users/userInfo/" + item.courier_short_id;
    let resp = await doApiGet(url);
    setcourier(resp.data);
  };

  return (
    <>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <h1 className="title">Information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{item.short_id}</h1>

                  <div className="detailItem">
                    <span className="itemKey">Total price:</span>
                    <span className="itemValue">{item.total_price}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">status:</span>
                    <span className="itemValue">{item.status}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">destination</span>
                    <span className="itemValue">{item.destination}</span>
                  </div>

                  <Link
                    className="detailItem text-decoration-none"
                    to="../../stores/single"
                    state={{ item: store }}
                  >
                    <span className="itemKey text-primary">Show store</span>
                  </Link>
                  <Link
                    className="detailItem text-decoration-none ms-3"
                    to="../../users/single"
                    state={{ user: client }}
                  >
                    <span className="itemKey text-primary">Show client</span>
                  </Link>
                  {courier && (
                    <Link
                      className="detailItem text-decoration-none ms-3"
                      to="../../users/single"
                      state={{ user: courier }}
                    >
                      <span className="itemKey text-primary">Show courier</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="right"></div>
          </div>
          <div className="bottom">
            <h1 className="title">Products in order</h1>
            <ListProductsOrder ar={item.products_ar} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOrder;

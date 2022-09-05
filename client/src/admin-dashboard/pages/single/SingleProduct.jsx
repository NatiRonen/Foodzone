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

const SingleProduct = () => {
  const { state } = useLocation();
  const [store, setStore] = useState();
  let item = state.item;
  const [status, setStatus] = useState(item.status);

  useEffect(() => {
    getStore();
  }, []);

  const getStore = async () => {
    let url = API_URL + "/stores/storeInfo/" + item.store_short_id;
    let resp = await doApiGet(url);
    setStore(resp.data);
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
                <img src={item.imgUrl} alt="" className="itemImg" />
                <div className="details">
                  <h1 className="itemTitle">{item.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">info:</span>
                    <span className="itemValue">{item.info}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Category:</span>
                    <span className="itemValue">{item.categoty}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{item.price}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">id:</span>
                    <span className="itemValue">{item.short_id}</span>
                  </div>
                  <Link
                    className="detailItem text-decoration-none"
                    to="../../stores/single"
                    state={{ item: store }}
                  >
                    <span className="itemKey text-primary">Show store</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="right">
              <ProductChart
                aspect={3 / 1}
                title="item Spending"
                short_id={item.short_id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

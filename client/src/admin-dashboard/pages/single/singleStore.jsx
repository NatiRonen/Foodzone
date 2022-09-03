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
import ListProductsStore from "../../components/table/ListProductsStore";

const SingleStore = () => {
  const { state } = useLocation();
  const [owner, setOwner] = useState();
  let item = state.item;
  const [status, setStatus] = useState(item.status);
  const [products, setproducts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getStoreOwner();
    getProducts();
  }, []);

  const statusTottle = () => {
    if (status === "pending") setStatus("active");
    else {
      setStatus("pending");
    }
  };

  const getProducts = async () => {
    let url = API_URL + "/products/storeProducts/" + item.short_id;
    let resp = await doApiGet(url);
    setproducts(resp.data);
  };

  const updateStatus = async () => {
    let url = API_URL + "/stores/updateStatus/" + item._id;
    let resp = await doApiMethod(url, "PATCH", {});
    if (resp.data.emailStatus === "ok") {
      toast.success(
        "Store " +
          item.name +
          " is " +
          resp.data.data.status +
          ". Email sent to the store owner"
      );
      statusTottle();
    } else {
      toast.error("Email failed to reach the store owner");
    }
  };

  const getStoreOwner = async () => {
    let url = API_URL + "/users/userInfo/" + item.admin_short_id;
    let resp = await doApiGet(url);
    console.log(resp.data);
    setOwner(resp.data);
  };

  return (
    <>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <div className="editButton p-0">
                <Button
                  variant="secondary"
                  className="p-2"
                  onClick={updateStatus}
                >
                  Change status
                </Button>
              </div>
              <h1 className="title">Information</h1>
              <div className="item">
                <img src={item.imgUrl} alt="" className="itemImg" />
                <div className="details">
                  <h1 className="itemTitle">{item.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">id:</span>
                    <span className="itemValue">{item.short_id}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{item.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{item.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{item.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Status:</span>
                    <span className="itemValue">{status}</span>
                  </div>
                  <Link
                    className="detailItem text-decoration-none"
                    to="../../users/single"
                    state={{ user: owner }}
                  >
                    <span className="itemKey text-primary">Show owner</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="right">
              <StoreChart
                aspect={3 / 1}
                title="item Spending"
                short_id={item.short_id}
              />
            </div>
          </div>
          <div className="bottom">
            <h1 className="title">Store's products</h1>
            <ListProductsStore ar={products} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleStore;

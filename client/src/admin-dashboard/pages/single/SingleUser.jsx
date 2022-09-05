import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { API_URL, doApiMethod } from "../../../services/apiService";
import { toast } from "react-toastify";
import ChangeRoleModal from "./ChangeRoleModal";
import UserChart from "../../components/chart/UserChart";
import ListOrdersUser from "../../components/table/ListOrdersUser";

const SingleUser = () => {
  const { state } = useLocation();
  let user = state.user;
  const [role, setRole] = useState(user.role);
  const [userOrders, setUserOrders] = useState([]);
  const selectRef = useRef();

  const changeRole = async (e) => {
    let newRole = e.target.value;
    if (
      window.confirm(
        `${user.name} role's will be changed to ${newRole.replaceAll("_", " ")}`
      )
    ) {
      let url = API_URL + `/users/changeRole/${user._id}/${newRole}`;
      try {
        let resp = await doApiMethod(url, "PATCH", {});
        console.log(resp.data);
        if (resp.data) {
          // doApi();
          toast.info(
            `${user.name} role's was changed to ${newRole.replaceAll("_", " ")}`
          );
          setRole(newRole);
        }
      } catch (err) {
        alert("Something went wrong");
        if (err.response) {
          console.log(err.response.data);
        }
      }
    } else {
      e.target.value = user.role;
    }
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
                <ChangeRoleModal role={user.role} changeRole={changeRole} />
              </div>
              <h1 className="title">Information</h1>
              <div className="item">
                <img src={user.picture} alt="" className="itemImg" />
                <div className="details">
                  <h1 className="itemTitle">{user.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{user.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{user.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{user.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Role:</span>
                    <span className="itemValue">
                      {role.replaceAll("_", " ")}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">id:</span>
                    <span className="itemValue">{user.short_id}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <UserChart
                short_id={user.short_id}
                setUserOrders={setUserOrders}
              />
            </div>
          </div>
          <div className="bottom">
            <h1 className="title">Last Transactions</h1>
            <ListOrdersUser ar={userOrders} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;

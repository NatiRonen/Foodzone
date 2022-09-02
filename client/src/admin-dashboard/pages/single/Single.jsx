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

const Single = () => {
  const { state } = useLocation();
  let user = state.user;
  const selectRef = useRef();

  // const changeRole = async (e, _user) => {
  //   let newRole = e.target.value;
  //   if (window.confirm(`${_user.name} role's will be changed to ${newRole.replaceAll("_", " ")}`)) {
  //     let url = API_URL + `/users/changeRole/${_user._id}/${newRole}`;
  //     try {
  //       let resp = await doApiMethod(url, "PATCH", {});
  //       console.log(resp.data);
  //       if (resp.data) {
  //         // doApi();
  //         toast.info(`${_user.name} role's was changed to ${newRole.replaceAll("_", " ")}`);
  //       }
  //     } catch (err) {
  //       alert("Something went wrong");
  //       if (err.response) {
  //         console.log(err.response.data);
  //       }
  //     }
  //   } else {
  //     e.target.value = _user.role;
  //   }
  // };
  // const onSelectOption = () => {
  //   let role = selectRef.current.value;
  //   setRole(role);
  // };

  console.log(state);
  return (
    <>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <div className="editButton">
                <ChangeRoleModal />
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
                    <span className="itemValue">{user.role.replaceAll("_", " ")}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">id:</span>
                    <span className="itemValue">{user.short_id}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
            </div>
          </div>
          <div className="bottom">
            <h1 className="title">Last Transactions</h1>
            <List />
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;

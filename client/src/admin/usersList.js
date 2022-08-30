import React, { useEffect, useState, useRef } from "react";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { BsEraser } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import LottieAnimation from "../comps/misc/lottieAnimation";
import PageLinks from "../comps/misc/pageLinks";
import AuthAdminComp from "../comps/auth/authAdminComp";
import { Table } from "react-bootstrap";
import {
  ADMIN_ROLE,
  APPLY_FOR_COURIER_ROLE,
  CLIENT_ROLE,
  COURIER_ROLE,
  STOER_ADMIN_ROLE,
} from "../services/consts";
import { toast } from "react-toastify";

function UsersList(props) {
  const [ar, setAr] = useState([]);
  const [numPage, setPageNum] = useState(1);
  const location = useLocation();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const selectRef = useRef();

  useEffect(() => {
    doApi();
  }, [location, role]);

  //fetch users list
  const doApi = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery);
    let url = API_URL + `/users/usersList?page=${pageQuery}&role=${role}`;
    setLoading(true);
    try {
      let resp = await doApiGet(url);
      setAr(resp.data);
      setLoading(false);
    } catch (err) {
      alert("Something went wrong");
      if (err.response) {
        console.log(err.response.data);
      }
    }
    setLoading(false);
  };

  // delete user
  const delUser = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      let url = API_URL + `/users/delete/${_idDel}`;
      try {
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          doApi();
        }
      } catch (err) {
        alert("There was a problem with deleting the user ");
        if (err.response) {
          console.log(err.response.data);
        }
      }
    }
  };

  // change user's role
  const changeRole = async (e, _user) => {
    let newRole = e.target.value;
    if (window.confirm(`${_user.name} role's will be changed to ${newRole.replaceAll("_", " ")}`)) {
      let url = API_URL + `/users/changeRole/${_user._id}/${newRole}`;
      try {
        let resp = await doApiMethod(url, "PATCH", {});
        console.log(resp.data);
        if (resp.data) {
          // doApi();
          toast.info(`${_user.name} role's was changed to ${newRole.replaceAll("_", " ")}`);
        }
      } catch (err) {
        alert("Something went wrong");
        if (err.response) {
          console.log(err.response.data);
        }
      }
    } else {
      e.target.value = _user.role;
    }
  };

  const onSelectOption = () => {
    let role = selectRef.current.value;
    setRole(role);
  };

  return (
    <div className="container">
      <AuthAdminComp />
      <h1 className="display-4">Users list</h1>
      {/* filter users list by role */}
      <div className="col-md-3 position-absolute top-0 end-0 mt-3">
        <select
          ref={selectRef}
          onSelect={() => alert("sdfkj")}
          onChange={onSelectOption}
          className="form-select"
        >
          <option value="">All users</option>
          <option value={ADMIN_ROLE}>Admin</option>
          <option value={STOER_ADMIN_ROLE}>Store admins</option>
          <option value={CLIENT_ROLE}>Client</option>
          <option value={COURIER_ROLE}>Courier</option>
          <option value={APPLY_FOR_COURIER_ROLE}>Apply for Courier</option>
        </select>
      </div>
      {ar.length > 0 ? (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>email</th>
              <th>address</th>
              <th>role</th>
              <th>del</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i + 1 + 10 * (numPage - 1)}</td>
                  <td>{" " + item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td className="d-flex justify-content-center">
                    <select
                      defaultValue={item.role}
                      onChange={(e) => {
                        changeRole(e, item);
                      }}
                      className="form-select"
                    >
                      <option value={ADMIN_ROLE}>Admin</option>
                      <option value={STOER_ADMIN_ROLE}>Store admin</option>
                      <option value={CLIENT_ROLE}>User</option>
                      <option value={COURIER_ROLE}>Courier</option>
                      <option value={APPLY_FOR_COURIER_ROLE}>Apply for Courier</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        delUser(item._id);
                      }}
                      className="btn btn-outline-danger mx-2"
                      title="Delete"
                    >
                      <BsEraser />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        ""
      )}
      {loading ? <LottieAnimation /> : ""}
      {!loading && ar.length === 0 ? (
        <h2 className="display-4 text-danger text-center mt-5">No users found</h2>
      ) : (
        <PageLinks
          perPage="10"
          apiUrlAmount={API_URL + "/users/amount"}
          urlLinkTo={"/admin/users"}
          clsCss="btn me-2 mt-4 pageLinks"
        />
      )}
    </div>
  );
}

export default UsersList;

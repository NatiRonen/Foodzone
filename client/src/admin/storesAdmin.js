import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { BsEraser } from "react-icons/bs";

import { toast } from "react-toastify";
import { Table } from "react-bootstrap";

import LottieAnimation from "../comps/misc/lottieAnimation";
import PageLinks from "../comps/misc/pageLinks";
import AuthAdminComp from "../comps/auth/authAdminComp";

function StoresAdmin(props) {
  const [ar, setAr] = useState([]);
  const [ownerAr, setOwnerAr] = useState([]);
  const [numPage, setPageNum] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();
  const location = useLocation();
  let selectRef = useRef();

  useEffect(() => {
    doApi();
  }, [location, status]);

  useEffect(() => {
    nav("/admin/stores");
  }, [status]);

  const doApi = async () => {
    // get stores page number
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery);
    let url = API_URL + "/stores?page=" + pageQuery + "&status=" + status;
    try {
      let resp = await doApiGet(url);
      setAr(resp.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }

    // get owner name
    let ownerUrl = API_URL + "/users/usersList";
    try {
      let resp = await doApiGet(ownerUrl);
      let temp_ar = resp.data.map((item) => {
        return { _id: item._id, name: item.name, email: item.email };
      });
      setOwnerAr(temp_ar);
    } catch (err) {
      alert("Something went wrong");
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const delStore = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/stores/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("Stores deleted !");
        }
        // to show the new list without the Store that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        toast.error(err.response.data.err);
      }
    }
  };

  const updateStatus = async (_id, _name) => {
    let url = API_URL + "/stores/updateStatus/" + _id;
    let resp = await doApiMethod(url, "PATCH", {});
    if (resp.data.emailStatus === "ok") {
      toast.success(
        "Store " +
          _name +
          " is " +
          resp.data.data.status +
          ". Email sent to the store owner"
      );
    } else {
      toast.error("Email failed to reach the store owner");
    }
    doApi();
  };

  const onSelectOption = () => {
    let storeStatus = selectRef.current.value;
    setStatus(storeStatus);
  };

  return (
    <div className="container">
      <AuthAdminComp />
      <h1 className="display-4">Stores list</h1>
      <div className=" col-md-3 position-absolute top-0 end-0 mt-3">
        <select
          ref={selectRef}
          onChange={onSelectOption}
          className="form-select"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Short_id</th>
            <th>status</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1 + 5 * (numPage - 1)}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={item.imgUrl || "/images/no_image.png"}
                    alt={item.name + " image"}
                    height="50"
                    width="90"
                  />
                </td>
                <td>{item.short_id}</td>
                <td>
                  <button
                    onClick={() => updateStatus(item._id, item.name)}
                    className={
                      item.status == "active"
                        ? "btn btn-primary"
                        : "btn btn-danger"
                    }
                  >
                    {item.status}
                  </button>
                </td>
                <td>{item.admin_short_id}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    onClick={() => {
                      delStore(item._id);
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
      {ar.length === 0 && !loading ? (
        <h2 className="text-center my-5">No Stores found</h2>
      ) : (
        ""
      )}
      {loading ? <LottieAnimation /> : ""}
      <PageLinks
        perPage="5"
        apiUrlAmount={API_URL + "/stores/amount?status=" + status}
        urlLinkTo={"/admin/stores"}
        clsCss="btn me-2 mt-4 pageLinks"
      />
    </div>
  );
}

export default StoresAdmin;

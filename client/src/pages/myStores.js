import React, { useEffect, useRef, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AuthClientComp from "../comps/auth/authClientComp";
import MyStoreItem from "../comps/store/myStoreItem";
import "./css/myStores.css";

function MyStores(props) {
  const [ar, setAr] = useState([]);
  const [arSort, setArSort] = useState([]);
  const nav = useNavigate();
  let selectRef = useRef();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/stores/userStores";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
      setArSort(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const delStore = async (_idDel, _short_id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/stores/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {}, _short_id);
        // console.log(resp.data);
        if (resp.data.deletedCount) {
          toast.info("Stores deleted");
        }
        // to show the new list without the Store that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        alert("there problem , try again later");
      }
    }
  };

  const onSelectOption = () => {
    let storeStatus = selectRef.current.value;
    console.log(storeStatus);
    if (storeStatus != "all") {
      let temp = ar.filter((store) => store.status == storeStatus);
      console.log(temp);
      setArSort(temp);
    } else {
      console.log(ar);
      setArSort(ar);
    }
  };

  return (
    <main className="main-content">
      <AuthClientComp />
      <div className="container">
        <h1 className="text-uppercase display-4 text-center mb-4">My Stores</h1>
        <div className="mb-5 col-md-3">
          <select
            ref={selectRef}
            onChange={onSelectOption}
            className="form-select"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <motion.div layout className="row">
          <AnimatePresence>
            {arSort.map((item) => {
              return (
                <MyStoreItem key={item._id} item={item} delStore={delStore} />
              );
            })}
          </AnimatePresence>

          <motion.div
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="col-md-4 col-sm-6 mb-4"
          >
            <div
              onClick={() => {
                nav("/createStore");
              }}
              className="add-payment rounded-lg shadow d-flex justify-content-center align-items-center h-100 border"
            >
              <BsPlusLg size="3em" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

export default MyStores;

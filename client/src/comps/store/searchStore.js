import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BsSearch } from "react-icons/bs";
import { API_URL, doApiGet } from "../../services/apiService";
import LottieAnimation from "../misc/lottieAnimation";
import StoreCard from "./storeCard";
import Search from "../general/search";

function SearchStore(props) {
  const [searchStore, setSearchStore] = useState([]);
  let paramsSearch = useParams();
  let search = paramsSearch.searchQ;
  let nav = useNavigate();

  useEffect(() => {
    doApi(search);
  }, [search]);

  const doApi = async (_Search) => {
    let url = API_URL + "/stores/search?s=" + _Search + "&perPage=1000";
    try {
      let resp = await doApiGet(url);
      {
        resp.data != 0 ? setSearchStore(resp.data) : searchNotFound();
      }
    } catch (err) {
      toast.error(err.response.data.err);
    }
  };

  const searchNotFound = () => {
    toast.info(`${search}  Not fund `);
    nav(-1);
  };

  return (
    <main className="container my-5">
      <div className="d-flex justify-content-center">
        <div className="col-lg-5 col-md-8 col-sm-12">
          <Search text="What store are you searching for?" to="searchStore" />
        </div>
      </div>
      <p className="animaLink mb-3">
        <BsSearch className="me-2" /> You Search For [ {search} ]
      </p>
      <div className="row">
        {searchStore.map((item) => {
          return <StoreCard key={item._id} item={item} />;
        })}
      </div>
      {searchStore.length === 0 ? <LottieAnimation /> : ""}
    </main>
  );
}

export default SearchStore;

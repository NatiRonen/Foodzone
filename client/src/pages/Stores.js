import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_URL, doApiGet } from "../services/apiService";
import { BiStore } from "react-icons/bi";
import PageLinks from "../comps/misc/pageLinks";
import Search from "../comps/general/search";
import StoreCard from "../comps/store/storeCard";
import LottieAnimation from "../comps/misc/lottieAnimation";
import { motion } from "framer-motion";

function AllStores(props) {
  const [shops_ar, setShops_ar] = useState([]);
  const [shops_temp, setShops_temp] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    doApi();
  }, [location]);

  const doApi = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    let url = API_URL + "/stores?&status=active&perPage=6&page=" + pageQuery;
    let resp = await doApiGet(url);
    console.log(resp.data);
    setShops_ar(resp.data);
    setShops_temp(resp.data);
    setLoading(false);
  };

  return (
    <main className="container my-5" style={{ minHeight: "90.7vh" }}>
      <div className="d-flex justify-content-center">
        <div className="col-lg-5 col-md-8 col-sm-12">
          <Search
            text="What store are you searching for?"
            shops_ar={shops_ar}
            setShops_temp={setShops_temp}
          />
        </div>
      </div>
      <p className="animaLink mb-3">
        <BiStore className="me-2" />
        All stores
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="row"
      >
        {shops_temp.map((item) => {
          return <StoreCard key={item._id} item={item} />;
        })}
      </motion.div>
      {loading ? <LottieAnimation /> : ""}
      {shops_ar.length === 0 && !loading && (
        <h1 className="text-center text-muted display-2">No store found</h1>
      )}
      <PageLinks
        perPage="6"
        apiUrlAmount={API_URL + "/stores/amount?status=active"}
        urlLinkTo={"/stores"}
        clsCss="btn me-2 mt-4 pageLinks"
      />
    </main>
  );
}

export default AllStores;

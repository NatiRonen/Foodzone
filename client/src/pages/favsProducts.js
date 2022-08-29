import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../services/apiService";
import { motion } from "framer-motion";
import { BsStar } from "react-icons/bs";
import { BiConfused } from "react-icons/bi";
import { useSelector } from "react-redux";
import LottieAnimation from "../comps/misc/lottieAnimation";
import AuthClientComp from "../comps/auth/authClientComp";
import Product from "../comps/store/product";
import { useAddRemoveFavsMutation } from "../redux/appApi";

function FavsProducts(props) {
  let [ar, setAr] = useState([]);
  let [loading, setLoading] = useState(true);
  const favs = useSelector((state) => state.favs);

  useEffect(() => {
    doApiListFav();
  }, [favs]);

  const doApiListFav = async () => {
    let url = API_URL + "/favs/productsInfo";
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
    setLoading(false);
  };

  return (
    <div className="container-fluid" style={{ maxWidth: "900px", minHeight: "85vh" }}>
      <div className="container">
        <AuthClientComp />
        {!loading && ar.length === 0 ? (
          <div className="text-center display-2 mt-5">
            no favorites found <BiConfused />
          </div>
        ) : (
          <motion.div
            initial={{ y: "-100vw" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-center my-5"
          >
            <h3 className="display-4 mt-5">
              Favorites products <BsStar />
            </h3>
            <h6>Click on star to remove them from the list</h6>
          </motion.div>
        )}

        {loading ? <LottieAnimation /> : ""}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {ar.map((item) => {
            return <Product key={item._id} item={item} />;
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default FavsProducts;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeStrip from "../comps/general/homeStrip";
import StoreCard from "../comps/store/storeCard";
import { API_URL, doApiGet } from "../services/apiService";
import Info from "./info";

function Home(props) {
  const [shops_ar, setShops_ar] = useState([]);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {
      let url = API_URL + "/stores?perPage=6&status=active";
      let resp = await doApiGet(url);
      if (resp.data) {
        console.log(resp.data);
        setShops_ar(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <HomeStrip image="/images/slider.jpg" />
      <main className="container">
        <Info />
        {/* <div className="row">
          {shops_ar.length > 0 &&
            shops_ar.map((item) => {
              return <StoreCard key={item._id} item={item} />;
            })}
        </div>
        <div className="text-center">
          <Link className="animaLink" to="/stores">
            Get All Stores
          </Link>
        </div> */}
      </main>
    </React.Fragment>
  );
}

export default Home;

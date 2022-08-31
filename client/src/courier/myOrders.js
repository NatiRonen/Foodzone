import React, { useEffect, useState } from "react";
import AuthCourierComp from "../comps/auth/authCourierComp";
import LottieAnimation from "../comps/misc/lottieAnimation";
import { BsInfoCircle } from "react-icons/bs";
import { API_URL, doApiGet } from "../services/apiService";
import { useSelector } from "react-redux";

function MyOrders(props) {
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/orders/allOrders?status=delivered&courier=" + user.short_id;

    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <AuthCourierComp />
      <h2 className="display-4">Orders history</h2>
      {ar.length === 0 && !loading ? (
        <h2 className="display-4 text-center mt-5 text-danger">You don't have Orders</h2>
      ) : (
        <table className="table table-striped table-scrollbar">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Code</th>
              <th>Date & Time</th>
              <th>Destination</th>
              <th>Total price</th>
              <th>Products</th>
              {/* <th>More Info</th> */}
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <span
                      className={item.status === "shipped" ? "badge bg-info" : "badge bg-success"}
                    >
                      {item?.status?.replaceAll("_", " ")}
                    </span>
                  </td>
                  <td>{item.short_id}</td>
                  <td>{item.date_created}</td>
                  <td>{item.destination}</td>
                  <td>₪ {item.total_price}</td>
                  <td>{item.products_ar.length}</td>
                  {/* <td>
                    <button
                      onClick={() => {
                        // nav("/courier/deliveryInfo/" + item._id, { state: item.driver_id });
                      }}
                      className="btn btn-outline-info"
                      title="Info"
                    >
                      <BsInfoCircle />
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {loading && <LottieAnimation />}
    </div>
  );
}

export default MyOrders;

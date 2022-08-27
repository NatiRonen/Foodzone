import React, { useEffect, useState } from 'react';
import LottieAnimation from '../comps/general_comps/lottieAnimation';
import AuthCourierComp from '../misc_comps/authCourierComp';
import { API_URL, doApiGet } from '../services/apiService';
import CourierOrderItem from './courierOrderItem';

function MyOrders(props) {
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let userUrl = API_URL + '/users/myInfo';
    let ordersUrl = API_URL + '/orders/allOrders?perPage=9999';

    try {
      let respUser = await doApiGet(userUrl);
      // console.log(respUser.data);

      let respOrders = await doApiGet(ordersUrl);
      // console.log(respOrders.data);

      const myOrders = respOrders.data.filter((oredr) => oredr.driver_id === respUser.data._id);
      // console.log('myOrders', myOrders);

      setAr(myOrders);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <AuthCourierComp />
      <h2>All my orders</h2>
      {ar.length === 0 && !loading ? (
        <h2 className="display-4 text-center mt-5">You don't have Orders</h2>
      ) : (
        <table className="table table-striped table-scrollbar">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Date & Time</th>
              <th>Address</th>
              <th>Total price</th>
              <th>Products</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              return <CourierOrderItem key={item._id} item={item} index={i} />;
            })}
          </tbody>
        </table>
      )}
      {loading && <LottieAnimation />}
    </div>
  );
}

export default MyOrders;

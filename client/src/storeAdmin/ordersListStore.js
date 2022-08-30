import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import Table from "react-bootstrap/Table";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsEraser, BsInfoCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import LottieAnimation from "../comps/misc/lottieAnimation";
import OrderInfo from "../comps/orders/OrderInfo";

function OrdersListStore() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const params = useParams();
  let nav = useNavigate();

  const handleToggle = () => setShow(!show);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    setLoading(true);
    let url = API_URL + "/orders/sotreOrders/" + params.id;
    try {
      let resp = await doApiGet(url);
      setOrders(resp.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const delProduct = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/products/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {}, params.id);
        //
        if (resp.data.deletedCount) {
          toast.info("Product deleted successfully");
        }
        // to show the new list without the product that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        alert("there problem , try again later");
      }
    }
  };
  if (!loading && orders.length === 0)
    return <h2 className="display-4 text-center mt-5 text-danger">No orders found</h2>;

  return (
    <>
      <OrderInfo handleToggle={handleToggle} show={show} item={orderInfo} />;
      <div className="container">
        <h1 className="display-4">Orders</h1>
        <button
          onClick={() => {
            nav("../");
          }}
          className="btn btn-outline-dark me-2"
        >
          Back <IoMdArrowRoundBack />
        </button>

        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Time and date</th>
              <th>Order Number</th>
              <th>client id</th>
              <th>Total price</th>
              <th>Status</th>
              <th>info</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.date_created}</td>
                  <td>{item.short_id}</td>
                  <td>{item.client_short_id}</td>
                  <td>{item.total_price}</td>
                  <td>{item?.status?.replaceAll("_", " ")}</td>
                  <td>
                    <button
                      className="btn btn-outline-info"
                      title="info"
                      onClick={() => {
                        setOrderInfo(item);
                        handleToggle();
                      }}
                    >
                      <BsInfoCircle />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        delProduct(item._id);
                      }}
                      className="btn btn-outline-danger"
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

        {loading ? <LottieAnimation /> : ""}
      </div>
    </>
  );
}

export default OrdersListStore;

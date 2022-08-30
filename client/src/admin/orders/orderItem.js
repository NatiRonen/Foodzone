import React from "react";
import { BsInfoCircle, BsEraser } from "react-icons/bs";
import { toast } from "react-toastify";
import { API_URL, doApiMethod } from "../../services/apiService";

function OrderItem(props) {
  const item = props.item;
  const handleToggle = props.handleToggle;
  const setOrderInfo = props.setOrderInfo;

  const delOrder = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete the order?")) {
      try {
        let url = API_URL + "/orders/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("Order deleted");
        }
        // to show the new list without the order that we deleted
        props.doApi();
      } catch (err) {
        console.log(err.response);
        toast.error("It's not you, it's us. Please try again");
      }
    }
  };

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <span
          className={
            item.status === "shipped"
              ? "badge bg-info"
              : item.status === "paid"
              ? "badge bg-warning"
              : "badge bg-success"
          }
        >
          {item?.status?.replaceAll("_", " ")}
        </span>
      </td>
      <td>{item.date_created}</td>
      {/* <td>{item.destination.label}</td> */}
      <td>{item.store_short_id}</td>
      <td>₪ {item.total_price}</td>
      <td>{item.products_ar.length}</td>
      <td>
        <button
          onClick={() => {
            setOrderInfo(item);
            handleToggle();
          }}
          className="btn btn-outline-info"
          title="Info"
        >
          <BsInfoCircle />
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            delOrder(item._id);
          }}
          className="btn btn-outline-danger mx-2"
          title="Delete"
        >
          <BsEraser />
        </button>
      </td>
    </tr>
  );
}

export default OrderItem;

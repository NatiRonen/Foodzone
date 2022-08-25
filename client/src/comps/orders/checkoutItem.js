import React from "react";
import { useDispatch } from "react-redux";
import { addCart, removeItemCart, reduceOneCart } from "../../redux/cartSlice";
import { BsEraser } from "react-icons/bs";

function CheckoutItem(props) {
  const dispatch = useDispatch();
  let item = props.item;

  const dellItem = (_name) => {
    if (window.confirm(`Are you sure you want to delete ${_name} ?`)) {
      dispatch(removeItemCart(item._id));
    }
  };

  return (
    <div className="border d-flex justify-content-between">
      <div className="col-5 col-lg-6 p-3">
        <p className="fw-bold mb-1">{item.name}</p>
        <p>₪ {item.price}</p>
        <div>
          <button
            className="btn btn-outline-success  px-2 py-0"
            onClick={() => dispatch(addCart(item))}
          >
            +
          </button>
          <span className="px-2">x {item.qty}</span>
          {/* reduce button */}
          <button
            className="btn btn-outline-danger px-2 py-0"
            onClick={() => dispatch(reduceOneCart(item._id))}
          >
            -
          </button>

          <button
            onClick={() => {
              dellItem(item.name);
            }}
            className="btn btn-outline-danger ms-3 px-2 py-1"
          >
            <BsEraser />
          </button>
        </div>
      </div>
      <div className="col-7 col-md-6 ">
        <img className="img-fluid mx-auto d-block image" src={item.imgUrl} />
      </div>
    </div>
  );
}

export default CheckoutItem;

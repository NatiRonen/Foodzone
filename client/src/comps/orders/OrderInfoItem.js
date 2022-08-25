import React from "react";

function OrderInfoItem(props) {
  let item = props.item;
  let i = props.i;
  console.log(item);

  return (
    <div className="row justify-content-between align-items-center">
      <div className="col-2">
        <div className="mt-2 text-center fw-bold">{i + 1}</div>
      </div>
      <div className="col-5 info">
        <p className="fw-bold mb-3">{item.name}</p>
        <p className="mb-1"> {item.price} ₪</p>
        <p>x {item.qty} </p>
      </div>

      <div className="col-5">
        <img
          // style={{ height: "120px", width: "200px" }}
          className="img-fluid mx-auto d-block"
          src={item.imgUrl}
        />
      </div>
    </div>
  );
}

export default OrderInfoItem;

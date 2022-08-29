import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/productCard.css";

function StoreCard(props) {
  let item = props.item;
  let nav = useNavigate();

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 p-2">
      <div
        onClick={() => {
          nav("/store/" + item.short_id);
        }}
        className="product-card bg-white mb-4 overflow-hidden d-lg-flex flex-column rounded-lg position-relative border store"
      >
        <div className="product-image overflow-hidden">
          <img
            src={item.imgUrl || "/images/no_image.png"}
            alt={item.name}
            className="product-thumbnail rounded-lg"
          />
        </div>
        <div className="p-4 product-details">
          <div className="display-5 fs-1">{item.name}</div>
          <div className="display-5 fs-5">{item.info}</div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;

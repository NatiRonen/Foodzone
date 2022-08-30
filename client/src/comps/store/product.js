import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdAddShoppingCart } from "react-icons/md";
import { BsStar, BsStarFill } from "react-icons/bs";
import "./css/product.css";
import { toast } from "react-toastify";
import { useAddRemoveFavsMutation } from "../../redux/appApi";
import { addCart } from "../../redux/cartSlice";

function Product(props) {
  let item = props.item;
  const user = useSelector((state) => state.user);
  const favs = useSelector((state) => state.favs);
  const [addRemoveFavs, { isLoading, error }] = useAddRemoveFavsMutation();
  const dispatch = useDispatch();

  const starColor = {
    background: "#ffefc1",
    color: "#fabb00",
  };

  const toggleFavs = async () => {
    await addRemoveFavs(item.short_id);
    if (!inFavs()) {
      toast.success("Product added to favorites");
    } else {
      toast.warning("Product removed from favorites");
    }
  };

  const inFavs = () => {
    return favs?.includes(item.short_id);
  };

  return (
    <div className="row">
      <div className="blog-card bg-white mb-4 overflow-hidden d-lg-flex rounded position-relative hover ps-0 ">
        <div className="blog-image overflow-hidden d-flex align-items-center ">
          <img
            src={item.imgUrl || "/images/no_image.png"}
            alt={item.name}
            className="blog-thumbnail"
          />
        </div>
        <div className="p-4 blog-container text-start">
          <small
            style={{
              color: item.category ? "#28a745" : "#f47373",
              background: item.category ? "rgba(40, 167, 69, 0.1)" : "rgba(167, 40, 40, 0.1)",
            }}
            className="font_bold blog-category text-uppercase py-1 px-2 float-left rounded"
          >
            {item.category || "no category"}
          </small>
          {user && (
            <button
              onClick={toggleFavs}
              className="font_bold text-uppercase py-1 px-2 float-end rounded"
              style={!inFavs() ? {} : starColor}
            >
              {!inFavs() ? <BsStar /> : <BsStarFill />}
            </button>
          )}
          <h4 className="mt-2 font_bold text-dark">{item.name}</h4>
          <p className="text-muted">{item.info}</p>
          <div className="blog-footer d-flex justify-content-between align-items-center border-top">
            <h2 className="mr-2">₪ {item.price}</h2>
            {user && (
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  dispatch(addCart(item));
                  toast.success(item.name + " added to cart");
                }}
              >
                Add to cart <MdAddShoppingCart className="me-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;

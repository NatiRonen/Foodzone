import React from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { saveStoreLocal } from "../../services/localService";

function MyStoreItem(props) {
  let nav = useNavigate();
  let item = props.item;
  let statusColor = {
    color: "white",
    background: "#F1948A",
  };

  const onClickStore = () => {
    if (item.status === "active") {
      saveStoreLocal(item);
      nav("/storeAdmin/" + item.short_id);
    }
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="col-md-6 col-lg-4  mb-4"
    >
      <div
        className={`payment-card rounded-lg shadow bg-white text-center h-100 ${
          item.status == "pending" ? "cursor_no" : "cursor_pointer"
        }`}
        disabled={true}
        onClick={onClickStore}
      >
        <div className="payment-card__type px-4 py-5 d-flex justify-content-center align-items-center">
          <div
            style={item.status == "pending" ? statusColor : {}}
            className="status_tag text-uppercase text-center"
          >
            {item.status}
          </div>
          <img src={item.imgUrl || "/images/no_image.png"} alt={item.name + " image"} />
        </div>
        <div className="payment-card__info p-4">
          <h4>{item.name}</h4>
          {/* <p className="text-muted">address : {item.address}</p> */}
          <hr />
          <div className="d-flex justify-content-between">
            {/* <button
              onClick={() => {
                nav("/storeAdmin/more/" + item.short_id);
              }}
              className="mx-2"
              style={{ background: "none" }}
              title="Info"
            >
              Info <BsFillInfoCircleFill size="1.5em" color="#34495E" />
            </button> */}
            <div>
              {/* <Link
                to={"/storeAdmin/editStore/" + item.short_id}
                className="mx-2"
                state={{ item }}
                style={{ background: "none" }}
                title="Edit"
              >
                <MdEdit size="1.5em" color="#3498DB" />
              </Link> */}
              <button
                onClick={() => {
                  props.delStore(item._id, item.short_id);
                }}
                style={{ background: "none" }}
                title="Delete"
              >
                <MdDelete size="1.5em" color="#E74C3C" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MyStoreItem;

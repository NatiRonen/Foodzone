import React from "react";
import { ImInfo } from "react-icons/im";

import { getTimeAndDateFormat } from "../../utils/dateRormated";

function oldOrderItem(props) {
  let item = props.item;
  let i = props.i;
  let handleToggle = props.handleToggle;
  let setOrderInfo = props.setOrderInfo;

  return (
    <div className="product order">
      <div className="row align-items-center">
        <div className="col-1">
          <div className="text-center">{i + 1}</div>
        </div>
        <div className="col-6 ">
          <div>
            <span className="fw-bold">Status:</span> {item?.status?.replaceAll("_", " ")}
          </div>
          <div>
            <span className="fw-bold">Total Price:</span> ₪ {item.total_price}
          </div>
          <div>
            <span className="fw-bold">Time and date: </span>
            {getTimeAndDateFormat(item.date_created)}
            {/* {item.date_created} */}
          </div>
        </div>

        <div className="col-5 text-center">
          <button
            className="animaLinkSM text-black"
            onClick={() => {
              setOrderInfo(item);
              handleToggle();
            }}
          >
            More info <ImInfo className="mx-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default oldOrderItem;

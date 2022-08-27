import React from 'react';
import { FcLibrary, FcAlarmClock, FcBusinessman } from 'react-icons/fc';
import { FaLocationArrow } from 'react-icons/fa';

function RoutingCard(props) {
  const item = props.orderInfo;

  function shortString(text, count) {
    return (text.length > count ? '...' : '') + text.slice(0, count);
  }

  return (
    <div className="row my-4">
      {/* start card */}
      <div className="col-xl-3 col-sm-6 col-12 mb-3">
        <div className="card shadow-sm border-0">
          <div className="card-content">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="mt-2">
                  <FcLibrary size="3em" />
                </div>
                <div className="text-end">
                  <h3 className="fst-italic fs-3">{item.store.name}</h3>
                  <span className="fst-italic fs-6">
                    Products : {item.order.products_ar.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end card */}
      {/* start card */}
      <div className="col-xl-3 col-sm-6 col-12 mb-3">
        <div className="card shadow-sm border-0">
          <div className="card-content">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="mt-2">
                  <FcAlarmClock size="3em" />
                </div>
                <div className="text-end">
                  <h3 className="fst-italic fs-3">Delivery Time</h3>
                  <span className="fst-italic fs-6">
                    {props.routingTime || 'No Routing Time Detected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end card */}
      {/* start card */}
      <div className="col-xl-3 col-sm-6 col-12 mb-3">
        <div className="card shadow-sm border-0">
          <div className="card-content">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="mt-2">
                  <FcBusinessman size="3em" />
                </div>
                <div className="text-end">
                  <h3 className="fst-italic fs-3">{item.user.name}</h3>
                  <span className="fst-italic fs-6">{item.user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end card */}
      {/* start card */}
      <div className="col-xl-3 col-sm-6 col-12 mb-3">
        <div className="card shadow-sm border-0">
          <div className="card-content">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="mt-3">
                  <FaLocationArrow color="#82E0AA" size="2em" />
                </div>
                <div className="text-end">
                  <h3 className="fst-italic fs-3">Clitent Destination</h3>
                  <span className="fst-italic fs-6">
                    {shortString(String(item.order.destination.label), 30)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end card */}
    </div>
  );
}

export default RoutingCard;

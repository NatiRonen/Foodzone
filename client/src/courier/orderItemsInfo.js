import React, { useEffect } from 'react';
import OldOrderInfoItem from '../comps/orders_comps/oldOrderInfoItem';
import { ImInfo } from 'react-icons/im';

function OrderItemsInfo(props) {
  const item = props.orderInfo;
  useEffect(() => {
    console.log(item);
  }, []);

  return (
    <section className="shopping-cart">
      <div className="container">
        <div className="content">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                {/* start product */}
                {item.order.products_ar.map((item, i) => {
                  return <OldOrderInfoItem key={item._id} item={item} i={i} />;
                })}
                {/* end product */}
              </div>
            </div>
            {/* start Orders Info */}
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <React.Fragment>
                  <h3>
                    Order Info <ImInfo className="mx-2" />
                  </h3>
                  <div className="summary-item">
                    <span className="text">Order Number</span>
                    <span className="price">{item.order.short_id}</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Status</span>
                    <span className="price">{item.order.status}</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Date</span>
                    <span className="price">
                      {item.order.date_created.replace(/T/, ' ').substr(0, 16)}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Items</span>
                    <span className="price">{item.order.products_ar.length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Total price</span>
                    <span className="price">₪ {item.order.total_price}</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Address</span>
                    <span className="price"> {item.order.destination.label}</span>
                  </div>
                </React.Fragment>
              </div>
            </div>
            {/* end Orders Info */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderItemsInfo;

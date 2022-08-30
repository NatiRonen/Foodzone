import React from "react";
import { FaHamburger } from "react-icons/fa";
import { MdSecurity, MdDeliveryDining } from "react-icons/md";
import "./css/info.css";

function Info(props) {
  return (
    <section className="main-content">
      <div className="container">
        <div className="service-box shadow bg-white p-4">
          <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-4">
              <div className="card border-0">
                <div className="card-body text-center">
                  <div className="icon-box icon-box--success">
                    <MdDeliveryDining className="icon" />
                  </div>
                  <h3>Delivery</h3>
                  <p className="text-muted">
                    You can count on us to always get to you with delicious, hot food fast.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-12 col-lg-4">
              <div className="card border-top-0 border-bottom-0 border-left-0 border-right">
                <div className="card-body text-center">
                  <div className="icon-box icon-box--primary">
                    <FaHamburger className="icon" />
                  </div>
                  <h3>Food</h3>
                  <p className="text-muted">Great variety of restaurants throughout the country</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-12 col-lg-4">
              <div className="card border-0">
                <div className="card-body text-center">
                  <div className="icon-box icon-box--warning">
                    <MdSecurity className="icon" />
                  </div>
                  <h3>Security</h3>
                  <p className="text-muted">
                    You don't have to worry about your details. You can eat quietly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Info;

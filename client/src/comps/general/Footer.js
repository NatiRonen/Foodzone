import React from "react";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { ADMIN_ROLE, CLIENT_ROLE, COURIER_ROLE } from "../../services/consts";
import { FaShippingFast } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";
import { BsChatLeftText } from "react-icons/bs";
import { MdAdminPanelSettings } from "react-icons/md";
import { GoPackage } from "react-icons/go";

function Footer(props) {
  const dt = new Date();
  const user = useSelector((state) => state.user);

  return (
    <div className="footer">
      <Nav className="justify-content-center mt-4" activeKey="/home">
        {user && (
          <>
            <Nav.Item>
              <Nav.Link className="text-secondary" href="/myStores">
                My stores
                <IoStorefrontOutline className="ms-1" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-secondary" href="/Forums">
                Forums & Customers service
                <BsChatLeftText className="ms-1" />
              </Nav.Link>
            </Nav.Item>
            {user.role === CLIENT_ROLE && (
              <Nav.Link className="text-secondary" href="/ApplyForCourier">
                Jouin to our couriers program
                <FaShippingFast className="ms-1" />
              </Nav.Link>
            )}
            {user.role === COURIER_ROLE && (
              <Nav.Link className="text-secondary" href="/courier">
                Couriers section
                <GoPackage className="ms-1" />
              </Nav.Link>
            )}
            {user.role === ADMIN_ROLE && (
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/admin-dashboard">
                  Admin section
                  <MdAdminPanelSettings className="ms-1" />
                </Nav.Link>
              </Nav.Item>
            )}
          </>
        )}
      </Nav>
      <p className="text-center py-3">ShipMarket © {dt.getFullYear()}</p>
    </div>
  );
}

export default Footer;

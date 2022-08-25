import React from "react";
import { BsFacebook, BsTwitter, BsSnapchat, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";

function Footer(props) {
  const dt = new Date();
  const user = useSelector((state) => state.user);

  return (
    <div className="footer">
      <Nav className="justify-content-center mt-4" activeKey="/home">
        {user && (
          <>
            <Nav.Item>
              <Nav.Link className="text-secondary" href="/createStore">
                Create store
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-secondary" href="/myStores">
                My stores
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-secondary" href="/Forums">
                Forums & Customers service
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
      <p className="text-center py-3">ShipMarket © {dt.getFullYear()}</p>
    </div>
  );
}

export default Footer;

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkOpenShipmentLocal, checkTokenLocal } from "../services/localService";
// react icons
import { BiHomeAlt } from "react-icons/bi";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "../context/appContext";

function HeaderCourier(props) {
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = (e) => {
    e.preventDefault();
    nav("/logout");
  };
  return (
    <Navbar key={"lg"} bg="light" expand={"lg"}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={`${process.env.REACT_APP_CLIENT_URL}/images/shipMarket_icon.png`}
              style={{ width: 70, height: 60 }}
            />
          </Navbar.Brand>
        </LinkContainer>{" "}
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>ShipMarket</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" href="/">
                Home
              </Nav.Link>
              {!checkOpenShipmentLocal() && (
                <Nav.Link as={Link} to="./mapOrders" href="./mapOrders">
                  Take new order
                </Nav.Link>
              )}
              {checkOpenShipmentLocal() && (
                <Nav.Link as={Link} to="./takeDelivery" href="./takeDelivery">
                  Opne shipment
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="./ordersHistory" href="./ordersHistory">
                Orders history
              </Nav.Link>
            </Nav>
            <Nav>
              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
              {user && (
                <NavDropdown
                  title={
                    <>
                      <img
                        src={user.picture}
                        style={{
                          width: 30,
                          height: 30,
                          marginRadius: 10,
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginRight: "8px",
                        }}
                      />
                      {user.name}
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Button variant="danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default HeaderCourier;

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkOpenShipmentLocal, checkTokenLocal } from "../services/localService";
// react icons
import { BiHomeAlt } from "react-icons/bi";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "../context/appContext";
import { logout } from "../redux/userSlice";

function HeaderCourier(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
        </LinkContainer>
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
            {user && (
              <>
                <Nav className="mx-auto">
                  <Nav.Link as={Link} to="./" href="./">
                    Home
                    <BiHomeAlt className="ms-1" />
                  </Nav.Link>
                  {!checkOpenShipmentLocal() && (
                    <Nav.Link as={Link} to="./mapOrders" href="./mapOrders">
                      Take new order
                      <FaMapMarkedAlt className="ms-1" />
                    </Nav.Link>
                  )}
                  {checkOpenShipmentLocal() && (
                    <Nav.Link as={Link} to="./takeDelivery" href="./takeDelivery">
                      Opne shipment
                      <MdOutlineDeliveryDining className="ms-1" />
                    </Nav.Link>
                  )}
                  <Nav.Link as={Link} to="./ordersHistory" href="./ordersHistory">
                    Orders history
                    <GoListUnordered className="ms-1" />
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
                        <LinkContainer
                          to="/courier/login"
                          onClick={(e) => dispatch(logout())}
                          className="text-danger"
                        >
                          <Nav.Link>
                            Logout
                            <FiLogOut className="ms-1" />
                          </Nav.Link>
                        </LinkContainer>
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default HeaderCourier;

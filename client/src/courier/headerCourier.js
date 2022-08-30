import React from "react";
import { Link } from "react-router-dom";
import { checkOpenShipmentLocal } from "../services/localService";
// react icons
import { BiHomeAlt, BiTime } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function HeaderCourier(props) {
  const user = useSelector((state) => state.user);

  return (
    <Navbar key={"lg"} bg="light" expand={"lg"} sticky={"top"} collapseOnSelect>
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
              <Nav.Link as={Link} to="./" href="./">
                Home
                <BiHomeAlt className="ms-1" />
              </Nav.Link>
              {!checkOpenShipmentLocal() && (
                <Nav.Link as={Link} to="./mapOrders" href="./mapOrders">
                  New shipment
                  <MdLocalShipping className="ms-1" />
                </Nav.Link>
              )}
              {checkOpenShipmentLocal() && (
                <Nav.Link as={Link} to="./takeDelivery" href="./takeDelivery">
                  Opned shipment
                  <FaShippingFast className="ms-1" />
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="./OrdersHistory" href="./OrdersHistory">
                Orders history
                <BiTime className="ms-1" />
              </Nav.Link>
            </Nav>
            <Nav>
              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    Login
                    <FiLogIn className="ms-1" />
                  </Nav.Link>
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
                    <LinkContainer to="/logout" className="text-danger">
                      <Nav.Link>
                        Logout
                        <FiLogOut className="ms-1" />
                      </Nav.Link>
                    </LinkContainer>
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

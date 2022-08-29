import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { toggleCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { BiHomeAlt, BiTime, BiUserCircle } from "react-icons/bi";
import { BsInfoCircle, BsCartCheck } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";

function Navigation() {
  const user = useSelector((state) => state.user);
  let nav = useNavigate();
  const dispatch = useDispatch();
  const { cart_ar } = useSelector((state) => state.cart);
  const favs = useSelector((state) => state.favs);

  return (
    <>
      <Navbar
        key={"lg"}
        bg="light"
        expand={"lg"}
        sticky={"top"}
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={`${process.env.REACT_APP_CLIENT_URL}/images/shipMarket_icon.png`}
                style={{ width: 70, height: 60 }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                ShipMarket
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="mx-auto  text-muted">
                <Nav.Link as={Link} to="/" href="/">
                  Home
                  <BiHomeAlt className="ms-1" />
                </Nav.Link>
                <Nav.Link as={Link} to="/about" href="/about">
                  About
                  <BsInfoCircle className="ms-1" />
                </Nav.Link>
                <Nav.Link as={Link} to="/stores" href="/stores">
                  Stores
                  <IoStorefrontOutline className="ms-1" />
                </Nav.Link>
              </Nav>

              <Nav>
                {!user && (
                  <LinkContainer to="/login" className="text-primary">
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

                    {favs.length > 0 && (
                      <NavDropdown.Item as={Link} to="/favorites" href="/favorites">
                        Favorites
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item as={Link} to="/oldOrders" href="/oldOrders">

                      Orders
                      <BiTime className="ms-1" />
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => dispatch(toggleCart())}>
                      Cart
                      <HiOutlineShoppingCart className="ms-1" />
                    </NavDropdown.Item>
                    {cart_ar.length > 0 && (

                      <>
                        <NavDropdown.Item onClick={() => dispatch(toggleCart())}>
                          Cart
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/checkout" href="/checkout">
                          Checkout
                        </NavDropdown.Item>
                      </>

                    )}
                    <NavDropdown.Item
                      as={Link}
                      to="/uptateAccount"
                      href="/uptateAccount"
                    >
                      Account
                      <BiUserCircle className="ms-1" />
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

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
    </>
  );
}

export default Navigation;

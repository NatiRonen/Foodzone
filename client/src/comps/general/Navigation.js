import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { toggleCart } from "../../redux/cartSlice";

function Navigation() {
  const user = useSelector((state) => state.user);
  let nav = useNavigate();
  const dispatch = useDispatch();
  const { cart_ar } = useSelector((state) => state.cart);

  const handleLogout = (e) => {
    e.preventDefault();

    nav("/logout");
  };

  return (
    <>
      <Navbar key={"lg"} bg="light" expand={"lg"}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                // src={`${process.env.REACT_APP_CLIENT_URL}/images/shipMarket_icon.png`}
                src={`/images/logo.png`}
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
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                ShipMarket
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="mx-auto  text-muted">
                <Nav.Link
                  onClick={() => {
                    nav("./");
                  }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    nav("./about");
                  }}
                >
                  About
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    nav("./stores");
                  }}
                >
                  Stores
                </Nav.Link>
                {/* <Nav.Link href="./admin">Admin</Nav.Link> */}
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
                    <NavDropdown.Item href="/favorites">
                      Favorites
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/oldOrders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => dispatch(toggleCart())}>
                      Cart
                    </NavDropdown.Item>
                    {cart_ar.length > 0 && (
                      <NavDropdown.Item href="/checkout">
                        Checkout
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item href="/uptateAccount">
                      Account
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

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
    </>
  );
}

export default Navigation;

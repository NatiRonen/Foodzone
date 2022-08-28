import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

function HeaderStore(props) {
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
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              ShipMarket
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="mx-auto">
              <Nav.Link
                onClick={() => {
                  nav("./");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  nav("./openOrders");
                }}
              >
                Open Orders
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  nav("./categories");
                }}
              >
                Categories
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  nav("./products");
                }}
              >
                Products
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  nav("./orders");
                }}
              >
                Orders
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  nav("./editStore");
                }}
              >
                Edit Store details
              </Nav.Link>
              {/* <Nav.Link href={baseUrl + "/products"}>Delete store</Nav.Link> */}
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
                  {/* <NavDropdown.Item href="#action/3.1">Favorites</NavDropdown.Item> */}

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

export default HeaderStore;

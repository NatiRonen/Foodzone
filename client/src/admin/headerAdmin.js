import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function HeaderAdmin(props) {
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = (e) => {
    e.preventDefault();
    nav("/logout");
  };
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
          id={`offcanvasNavbar-expand-md`}
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
              </Nav.Link>
              <Nav.Link as={Link} to="./users" href="./users">
                Users
              </Nav.Link>
              <Nav.Link as={Link} to="./stores" href="./sotres">
                Stores
              </Nav.Link>
              <Nav.Link as={Link} to="./products" href="./products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="./orders" href="./orders">
                Orders
              </Nav.Link>
              <Nav.Link as={Link} to="./chat" href="./chat">
                Forums & customers services
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

export default HeaderAdmin;

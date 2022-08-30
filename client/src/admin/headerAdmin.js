import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { BsChatLeftText } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";
import { FiLogIn, FiLogOut, FiUsers } from "react-icons/fi";
import { HiTemplate, HiOutlineClipboardList } from "react-icons/hi";

function HeaderAdmin(props) {
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
                <BiHomeAlt className="ms-1" />
              </Nav.Link>
              <Nav.Link as={Link} to="./users" href="./users">
                Users
                <FiUsers className="ms-1" />
              </Nav.Link>
              <Nav.Link as={Link} to="./stores" href="./sotres">
                Stores
                <IoStorefrontOutline className="ms-1" />
              </Nav.Link>
              <Nav.Link as={Link} to="./products" href="./products">
                Products
                <HiTemplate className="ms-1" />
              </Nav.Link>
              <Nav.Link as={Link} to="./orders" href="./orders">
                Orders
                <HiOutlineClipboardList className="ms-1" />
              </Nav.Link>
              <Nav.Link as={Link} to="./chat" href="./chat">
                Forums & customers services
                <BsChatLeftText className="ms-1" />
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

export default HeaderAdmin;

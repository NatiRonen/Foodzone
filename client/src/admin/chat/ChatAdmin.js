import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthAdminComp from "../../comps/auth/authAdminComp";
import MessageForm from "../../chat/MessageForm";
import SideBarAdmin from "./SideBarAdmin";
import "../../chat/css/newChat.css";

function ChatAdmin() {
  return (
    <>
      <div className="container-fluid p-4">
        <AuthAdminComp />
        <Container className="my-5 shadow_chat">
          <Row className="p-0">
            <Col md={4} className="border-end p-0">
              <SideBarAdmin />
            </Col>
            <Col md={8} className="p-0">
              <MessageForm />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ChatAdmin;
